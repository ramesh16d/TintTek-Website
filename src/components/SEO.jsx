import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({
    title,
    description,
    keywords,
    canonical,
    robots,
    type = 'website',
    image,
    jsonLd
}) => {
    const location = useLocation();
    const siteUrl = 'https://tinttekplus.com';

    // Construct dynamic canonical URL if not provided.
    // Pass canonical={false} to omit it (e.g. the 404 page, which has no URL of its own).
    const omitCanonical = canonical === false;
    const currentUrl = canonical || `${siteUrl}${location.pathname}`.replace(/\/+$/, "");

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {!omitCanonical && <link rel="canonical" href={currentUrl} />}
            <meta name="robots" content={robots || "index, follow"} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {!omitCanonical && <meta property="og:url" content={currentUrl} />}
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Structured Data — supports single object or array of schemas */}
            {jsonLd && (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((schema, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
