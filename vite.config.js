import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { quoteServices } from './src/data/quoteServices.js'

const confirmationPaths = new Set(['/thank-you', ...quoteServices.map(({ slug }) => `/thank-you/${slug}`)]);

// Node built-ins + backend-only packages that must stay external in SSR
const SSR_EXTERNAL = [
  'fs', 'fs/promises', 'path', 'os', 'crypto', 'http', 'https',
  'url', 'stream', 'child_process', 'util', 'events', 'buffer',
  'net', 'tls', 'zlib', 'dns', 'readline', 'vm', 'querystring',
  'assert', 'module', 'perf_hooks', 'worker_threads', 'inspector',
  // backend npm packages
  'express', 'mongoose', 'cors', 'openai', 'node-fetch', 'axios',
  'dotenv', 'fast-levenshtein', 'sitemap-generator', 'puppeteer',
  'mongodb', 'bson',
]

export default defineConfig(({ command, mode }) => ({
  base: '/',
  plugins: [react(), {
    name: 'confirmation-page-preview-routes',
    configurePreviewServer(server) {
      // Vite preview ignores public/_redirects. Match the explicit host rules
      // so slashless confirmation URLs serve their own generated HTML locally.
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url || '/', 'http://localhost');
        const path = url.pathname.replace(/\/+$/, '');
        if (['GET', 'HEAD'].includes(request.method) && confirmationPaths.has(path)) {
          request.url = `${path}/index.html${url.search}`;
        }
        next();
      });
    },
  }, ...(command === 'serve' && mode === 'quote-test' ? [{
    name: 'local-quote-test-no-google-tags',
    transformIndexHtml(html) {
      // The simulation must never load production GTM, including noscript.
      return html
        .replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/g, '')
        .replace(/<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->/g, '');
    },
  }] : [])],
  build: {
    // Merge all CSS into the single entry stylesheet so SSR-prerendered markup
    // is never briefly unstyled — component CSS files would otherwise only load
    // when their lazy JS chunk fires, causing a FOUC.
    cssCodeSplit: false,
    // Target ES2020 — removes legacy polyfills (~12 KiB) while still covering
    // all browsers that support native ES modules (Chrome 80+, Safari 14+).
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — tiny, cached aggressively
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // MUI + Emotion — large, but shared across all pages
          'vendor-mui': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
            '@emotion/cache',
          ],
          // Three.js ecosystem — only loaded on simulator pages
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Animation
          'vendor-motion': ['framer-motion'],
          // Carousel / slider lib
          'vendor-carousel': ['swiper'],
          // Icon packs
          'vendor-icons': ['react-icons', 'lucide-react'],
        },
      },
    },
  },
  ssr: {
    // Bundle all frontend npm packages so CJS/ESM named-export issues
    // and directory imports are resolved by Vite rather than Node.js.
    noExternal: /^(?!node:)/,
    // These always stay external (Node built-ins + server-only packages).
    external: SSR_EXTERNAL,
  },
}))
