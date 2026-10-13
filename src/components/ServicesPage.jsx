import InViewMount from "./InViewMount";
// src/components/ServicePage.jsx
// NOTE: Wrap your app once with <HelmetProvider> in main.jsx/App.jsx.

import React, {
  useEffect,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  GlobalStyles,
} from "@mui/material";
import Link from "@mui/material/Link";
import SEO from "./SEO";
import { motion } from "framer-motion";

// Keep light, above-the-fold pieces eagerly loaded
import Topbar from "./key-components/Topbar";
import Footer from "./key-components/Footer";
import BusinessInfo from "./hero/BusinessInfo";

// Above-the-fold CTAs — must be eager to avoid LCP delay and above-fold CLS
import TeslaCTA from "./TeslaCTA";
import VideoCTA from "./VideoCTA";

// Lazy-load heavier below-fold blocks
import PricingComponent from "./Pricing";
const Contact = lazy(() => import("./SubContact"));
import HowItWorks from "./HowItWorks";
import ServicesOffered from "./ServicesOffered";
const CallToAction = lazy(() => import("./SubCTA"));
const TintingSimulator = lazy(() => import("./TintingSimulator"));
const PPFSelector = lazy(() => import("./PPFSelector"));
import FAQSection from "./FAQSection";
import TintPackages from "./TintPackages";
const TeslaTintingSimulator = lazy(() => import("./TeslaTintingSimulator"));
const QuickLinks = lazy(() => import("./SubQuickLinks"));
import TeslaTintPackages from "./TeslaTintPackages";
import BenefitsGrid from "./BenefitsGrid";
const ImageCTA = lazy(() => import("./ImageCTA"));
import PaintCorrectionServices from "./PaintCorrectionServices";
import HeadlightPackages from "./HeadlightPackages";
const BlogCTA = lazy(() => import("./BlogCTA"));
const PPFVision = lazy(() => import("./PPF-Vision"));
const ImageCarousel = lazy(() => import("./ImageCarousel"));
const F1Banner = lazy(() => import("./f1-banner"));

// ---- SITE SETTINGS ----
const SITE = "https://tinttekplus.com";
const SERVICES_BASE = "/services";

// Null fallback for below-fold lazy components — a height placeholder causes
// CLS when real content is a different size; null avoids the mismatch.
const Fallback = null;

// Service copy
const serviceDetails = {
  "vehicle-window-tinting": {
    title: "Vehicle Window Tinting",
    description:
      "Enhance privacy, reduce glare, and protect your vehicle’s interior.",
  },
  "tesla-window-tinting": {
    title: "Tesla Window Tinting",
    description:
      "Specialized tinting for Tesla models, ensuring perfect heat rejection and premium clarity.",
  },
  "commercial-window-tinting": {
    title: "Commercial Window Tinting",
    description:
      "Protect your building's windows from UV rays, reduce glare, and improve energy efficiency.",
  },
  "residential-window-tinting": {
    title: "Residential Window Tinting",
    description:
      "Long-lasting protection for your home’s windows against dirt, heat, and UV rays.",
  },
  "vehicle-paint-correction": {
    title: "Vehicle Paint Correction",
    description:
      "Restore your vehicle’s original shine and remove imperfections with our professional paint correction services.",
  },
  "vehicle-paint-protection": {
    title: "Vehicle Paint Protection",
    description:
      "Customize and protect your vehicle’s paint with high-quality Paint Protection Film.",
  },
  "headlight-services": {
    title: "Headlight & Taillight Services",
    description:
      "Protect and customize your vehicle’s headlights and taillights with professional tint film and Stek Light Protection Film.",
  },
  "windshield-protection-film": {
    title: "Windshield Protection Film",
    description:
      "Guard your windshield against rock chips and road debris with ExoShield GT3 — a clear, optically perfect protective film.",
  },
  "ceramic-coating": {
    title: "Ceramic Coating",
    description:
      "Elevate Your Vehicle's Protection With Unrivaled Ceramic Coating",
  },
};

// Meta overrides
const metaByService = {
  "vehicle-window-tinting": {
    title: "Vehicle Window Tinting Garland & Dallas, TX | Tint Tek Plus",
    description:
      "Professional vehicle window tinting in Garland & Dallas, TX. Tint Tek Plus installs LLumar nano-ceramic films for superior heat rejection, UV protection, and privacy. Book today!",
    keywords: "vehicle window tinting garland, window tinting garland, window tint garland tx, car window tinting garland, auto tinting dallas, car window tint near me, ceramic window tint garland"
  },
  "tesla-window-tinting": {
    title: "Tesla Window Tinting Garland, TX | Tint Tek Plus",
    description:
      "Searching for Tesla window tinting Garland? Get professional heat reduction, UV protection, and sleek EV tint services at Tint Tek Plus. Book your Tesla tint today!",
    keywords: "tesla window tinting garland, window tinting garland, Model 3 window tint Garland, Model Y window tint Garland, Tesla heat rejection tint TX, EV window tinting Garland"
  },
  "commercial-window-tinting": {
    title: "Commercial Window Tinting Garland, TX | Tint Tek Plus",
    description:
      "Professional commercial window tinting in Garland, Texas to improve energy efficiency, privacy & comfort for offices and storefronts. Trusted service at Tint Tek Plus.",
    keywords: "commercial window tinting garland, window tinting garland, office window tint garland, storefront window tinting TX, commercial building tinting Garland, privacy window film Garland"
  },
  "residential-window-tinting": {
    title: "Residential Window Tinting Garland, TX | Tint Tek Plus",
    description:
      "Top residential window tinting in Garland, Texas to reduce heat, glare & UV while enhancing privacy and comfort. Trusted home tint experts at Tint Tek Plus.",
    keywords: "residential window tinting garland, window tinting garland, home window tint garland, house window tinting TX, privacy tint for homes Garland, residential UV window film"
  },
  "vehicle-paint-correction": {
    title: "Vehicle Paint Correction Services in Dallas, TX | Tint Tek Plus",
    description:
      "Professional vehicle paint correction services in Dallas, Texas. Restore shine, remove swirls & protect your car’s paint. Book Tint Tek Plus experts today!",
    keywords: "vehicle paint correction Dallas, car paint correction TX, auto paint restoration, swirl mark removal, scratch removal auto paint, professional paint correction DFW, car polish and buff Dallas"
  },
  "vehicle-paint-protection": {
    title: "Vehicle Paint Protection Services in Dallas, TX | Tint Tek Plus",
    description:
      "Protect your vehicle's paint with professional services from Tint Tek Plus. Keep your car looking brand new with our high-quality paint protection solutions.",
    keywords: "vehicle paint protection Dallas, PPF installation TX, paint protection film DFW, clear bra Dallas, auto paint protection, protect car paint, car wrap protection Dallas"
  },
  "headlight-services": {
    title: "Tinted Headlights & Taillights Services in Dallas, TX | Tint Tek Plus",
    description:
      "Get premium tinted headlights in Dallas, Texas for style and protection. Quality headlight & taillight tint services at Tint Tek Plus. Book your appointment today!",
    keywords: "tinted headlights Dallas, taillight tinting TX, custom headlight tint, auto light tinting DFW, smoked headlights Dallas, smoked taillights, light tint shop near me"
  },
  "windshield-protection-film": {
    title: "Windshield Protection Film Services in Dallas, TX | Tint Tek Plus",
    description:
      "Protect your car with windshield protection film in Dallas, Texas. Tint Tek Plus offers premium film to prevent cracks, chips & UV damage. Book today!",
    keywords: "windshield protection film Dallas, windshield rock chip protection, clear windshield film TX, auto windshield tint, safety windshield film DFW, exact fit windshield protection"
  },
  "ceramic-coating": {
    title: "Ceramic Coating Services in Dallas, TX | Tint Tek Plus",
    description:
      "Get professional ceramic coating in Dallas, Texas for long-lasting paint protection and deep shine. Trusted experts at Tint Tek Plus.",
    keywords: "ceramic coating Dallas, ceramic car coating TX, auto ceramic coating DFW, best ceramic coating near me, ceramic paint protection, long lasting ceramic coat Dallas, permanent car shine"
  },
};

const serviceOgImages = {
  "vehicle-window-tinting": "https://tinttekplus.com/v-window-tint/vehicle-window-tint.webp",
  "tesla-window-tinting": "https://tinttekplus.com/tesla-tint-model/tesla-20.webp",
  "commercial-window-tinting": "https://tinttekplus.com/commercial/Tint%20Tek-116.webp",
  "residential-window-tinting": "https://tinttekplus.com/residential/residential-service.webp",
  "vehicle-paint-correction": "https://tinttekplus.com/paint-correction/paint-correction1.webp",
  "vehicle-paint-protection": "https://tinttekplus.com/ppf/ppf-service.webp",
  "headlight-services": "https://tinttekplus.com/headlight/headlight.webp",
  "windshield-protection-film": "https://tinttekplus.com/windshield/windshield-protection.webp",
  "ceramic-coating": "https://tinttekplus.com/ceramic/Tint%20Tek-111.webp",
};

// 500+ word unique body copy per service for on-page SEO
const serviceBodyContent = {
  "vehicle-window-tinting": `
    <p>Dallas-Fort Worth summers are among the most brutal in the country, with temperatures regularly exceeding 100°F and UV index readings that rank among the highest in Texas. Every time you park your car in the sun, the interior is subjected to heat that can exceed 170°F on the dashboard — cracking leather, warping plastics, and fading fabric over time. Vehicle window tinting from Tint Tek Plus is the single most effective upgrade you can make to address all of these issues at once.</p>
    <p>We install LLumar nano-ceramic window films, which are engineered by Eastman Chemical Company and independently certified by the National Fenestration Rating Council (NFRC). Unlike brands that publish self-reported performance figures, LLumar’s heat rejection and UV blockage data is third-party verified — so when we say a film blocks 88% of infrared heat and 99% of UV rays, that number means something. You’ll feel the difference within the first week of driving.</p>
    <p>Beyond the dramatic comfort improvement, tinting protects your investment. Your vehicle’s interior — leather seats, dashboard, door panels, and carpeting — degrades significantly faster when exposed to UV radiation and intense heat. Tinting preserves these surfaces, maintaining your vehicle’s resale value over time. Tinted vehicles consistently appraise higher than equivalent untinted counterparts in DFW’s used car market.</p>
    <p>Safety is another often-overlooked benefit. Window tint dramatically reduces the blinding glare that occurs during the low-angle sun of morning and evening commutes on Garland’s major corridors — I-635, US-75, and the George Bush Tollway. Reduced glare means reduced eye fatigue and faster hazard reaction times, which is a genuine safety improvement, not just a comfort one.</p>
    <p>Our certified installation technicians are trained specifically on the LLumar installation system, using heat guns and precision cutting patterns to achieve factory-quality results. The film is applied to the inside of the glass in a single, seamless piece — no seams, no bubbles, no lifting edges. Our LLumar films are non-metallic, meaning they will never interfere with GPS, Bluetooth, toll transponders, or any wireless system in your vehicle. Every installation is backed by a nationwide, transferable lifetime warranty.</p>
    <p>Texas law permits window tint with a minimum VLT (visible light transmittance) of 25% on front side windows and any darkness on rear side and rear windows. Our technicians are knowledgeable about Texas tint laws and will ensure your installation keeps you fully compliant while maximizing the privacy and heat rejection you’re looking for. Call us at (972) 362-8468 to schedule your installation at our Garland, TX shop, conveniently located for drivers across Plano, Richardson, Mesquite, and all of DFW.</p>
  `,
  "tesla-window-tinting": `
    <p>Tesla vehicles have a fundamentally different relationship with sunlight than conventional cars. The Model 3’s large rear glass, the Model Y’s panoramic glass roof, and the Model S and X’s full glass roofs create an enormous solar load that conventional climate control systems struggle to manage. In DFW’s extreme summer heat, this translates directly to reduced battery range, increased cabin temperature, and a climate control system that runs near-constantly to compensate. Professional ceramic window tinting is one of the most impactful modifications Tesla owners can make.</p>
    <p>Tint Tek Plus specializes in Tesla window tinting and uses only non-metallic ceramic films — specifically LLumar CTX and IRX series — for every Tesla installation. This is non-negotiable for Tesla vehicles. Metallic window films can and do interfere with GPS antennas, key fob reception, cellular over-the-air update signals, and — critically — the radar and camera sensors that power Autopilot and Full Self-Driving capabilities. Our non-metallic ceramic films eliminate this risk entirely while delivering superior heat rejection compared to older metallic film technology.</p>
    <p>The panoramic roof glass on the Model Y is one of the highest-solar-load installations we perform. Without tinting, this glass surface can raise interior temperatures by 20–30°F compared to the ambient air. LLumar IRX ceramic film, which achieves up to 88% infrared rejection in a thinner, optically clear construction, is purpose-made for this application. Owners who tint their Model Y panoramic roof routinely report that their climate control works less aggressively and that battery consumption on hot days is measurably reduced.</p>
    <p>Tesla’s glass geometries are unique and require installers with specific experience. The Model 3 rear window, for example, has an unusually large and curved profile that many general tint shops struggle to cover without seams or distortion. Our technicians have performed dozens of Tesla installations across every current model including the Cybertruck, and we use precision-cut patterns matched to each specific vehicle configuration. The result is a seamless, factory-appearing installation with no visible edges or gaps.</p>
    <p>We offer multiple film options for Tesla owners depending on their priorities. LLumar CTX at 20% VLT provides maximum privacy and excellent heat rejection — the most popular choice for Dallas-area Tesla owners. LLumar IRX at 30–35% is ideal for owners who want maximum heat rejection with a lighter appearance on the already-dark panoramic glass. LLumar AIR 80, nearly clear at 80% VLT, is an excellent option for the windshield where Texas law requires higher visible light transmission.</p>
    <p>Every Tesla tint installation at Tint Tek Plus comes with a nationwide, transferable lifetime warranty against bubbling, peeling, color change, and delamination. We are located at 2518 W Kingsley Rd in Garland, TX and serve Tesla owners from Plano, Frisco, Allen, McKinney, Richardson, and across the DFW metroplex. Call (972) 362-8468 to schedule — most Tesla installations are completed in a single day.</p>
  `,
  "commercial-window-tinting": `
    <p>Commercial buildings in the Dallas-Fort Worth area are subject to some of the highest solar heat gain conditions in the country. South and west-facing facades in particular can generate interior heat loads that overwhelm HVAC systems, creating hot spots that make employees uncomfortable and force thermostats to work at maximum capacity during peak afternoon hours. Professional commercial window tinting is one of the most cost-effective energy efficiency upgrades a DFW business owner can make, with documented payback periods typically measured in months, not years.</p>
    <p>Tint Tek Plus installs commercial-grade LLumar window films designed specifically for architectural applications. These solar control films work by reflecting and absorbing infrared radiation before it penetrates the glass, reducing the heat load entering your building by up to 79%. The result is a dramatically more comfortable interior environment, lower air conditioning load, reduced energy bills, and extended HVAC equipment lifespan. For large commercial spaces with significant glass area, the energy savings alone often justify the investment within the first 18 months.</p>
    <p>Glare is one of the most common complaints in modern office environments. Open-plan workspaces with floor-to-ceiling glass look impressive but often create impossible working conditions — computer screens washed out by direct sun, meeting rooms too bright for presentations, and employees repositioning desks and chairs to avoid blinding afternoon light. Our spectrally selective commercial films reduce glare by up to 85% while preserving natural daylight and outward views. Your workspace looks bright and open without the functional problems that unprotected glass creates.</p>
    <p>UV protection is critical for any commercial space with merchandise, artwork, flooring, or furnishings exposed to sunlight. UV radiation is the primary cause of fading and degradation in retail displays, furniture fabric, hardwood floors, and office carpeting. Our commercial films block 99% of UV rays, dramatically extending the lifespan of your interior investments. For retail businesses in particular, this protection directly reduces the cost of replacing faded merchandise and store fixtures.</p>
    <p>Privacy and security are additional considerations for many commercial applications. Ground-floor offices, medical practices, financial services firms, and retail locations often benefit from daytime one-way privacy films that prevent observation from the exterior while maintaining full outward visibility for employees. For higher-security requirements, we offer safety and security films that hold shattered glass in place in the event of breakage — a meaningful deterrent and injury prevention measure for storefronts facing high-traffic areas.</p>
    <p>Our commercial installations are engineered to minimize business disruption. We work with your schedule to complete installations during off-hours or weekends when possible, and our experienced commercial installation team can work across large glass areas efficiently. LLumar architectural films come with a 15-year manufacturer warranty, and our installations are backed by our workmanship guarantee. Contact Tint Tek Plus at (972) 362-8468 to schedule a site assessment and receive a customized quote for your Garland, Dallas, or DFW commercial property.</p>
  `,
  "residential-window-tinting": `
    <p>Texas homes are designed for year-round living, but the summer sun makes that a real challenge. Single-pane and even standard double-pane windows allow enormous amounts of solar heat and UV radiation to enter living spaces, driving air conditioning costs up and making sun-facing rooms genuinely uncomfortable during the afternoon. Residential window tinting from Tint Tek Plus provides a solution that improves comfort, reduces energy consumption, and protects your home’s interior — without changing the appearance of your home from the outside.</p>
    <p>We install LLumar Vista residential window films, engineered for home and architectural applications. These films intercept infrared heat before it passes through the glass, reducing the solar heat gain in treated rooms by up to 79%. For rooms that face south or west — typically the most uncomfortable rooms in Garland-area homes during summer afternoons — the temperature difference is immediately noticeable. Air conditioning runs less frequently, your thermostat reaches set temperature more quickly, and your system operates under lower peak load, which extends compressor lifespan.</p>
    <p>UV protection is one of the most compelling long-term benefits of residential window tinting. Sunlight bleaches and degrades virtually everything it touches over time — hardwood floors, area rugs, fabric furniture, artwork, and photographs. In Texas, where sun exposure is intense and nearly year-round, UV damage accumulates rapidly. Our residential films block 99% of UV radiation, effectively stopping the primary cause of interior fading. For homeowners who have invested significantly in flooring, furniture, or window treatments, this protection translates directly to dollars saved on premature replacement.</p>
    <p>Privacy is another important benefit, particularly for homes in neighborhoods where houses are closely spaced or where windows face heavily trafficked areas. Our daytime privacy films allow you to see out clearly while preventing observation from the exterior during daylight hours. Unlike frosted films that obscure your view in both directions, our solar control films function as one-way mirrors during the day — you maintain your view of the yard and street while gaining meaningful privacy from passers-by and neighbors.</p>
    <p>Glare reduction improves daily quality of life in ways homeowners often don’t anticipate until they experience it. Watching television, working from home, or simply relaxing in a sun-facing living room becomes dramatically more comfortable when harsh glare is eliminated. Our films reduce glare by up to 87% while maintaining the bright, natural feel that makes large windows desirable in the first place. You get the light without the discomfort.</p>
    <p>Residential window film installation is non-invasive and typically completed in a single visit with no disruption to your daily routine. Film is applied to the interior of existing glass, which means there’s no exterior scaffolding or work. Most homes in the Garland, Plano, Richardson, and Rowlett area can be completed within a day. LLumar residential films come with a manufacturer warranty of up to 15 years, and our workmanship is guaranteed. Call (972) 362-8468 to schedule a free consultation and quote.</p>
  `,
  "vehicle-paint-correction": `
    <p>Modern automotive clear coat is a remarkable material — a transparent, hardened protective layer applied over base coat that gives your paint its gloss and protects the color underneath from environmental contamination. But clear coat is also the first victim of poor wash technique, automatic car washes, parking lot encounters, and years of UV exposure. The swirl marks, fine scratches, water spots, and oxidation that dull your vehicle’s finish are almost always in or on the clear coat, not the paint itself — which means they can be removed. That’s what professional paint correction does.</p>
    <p>At Tint Tek Plus, paint correction is a meticulous, multi-step process performed by experienced detailers using professional-grade rotary and dual-action polishers. We begin with a thorough decontamination wash using pH-neutral soap, clay bar treatment to remove bonded surface contamination, and iron fallout removal. This ensures we’re working on a truly clean surface and reveals the full extent of defects that need to be addressed. We then assess the paint thickness with a digital gauge to ensure we have enough clear coat to work with safely.</p>
    <p>The correction itself involves progressively finer compounds and polishes applied with machine polishers and cutting pads matched to the specific defect type and paint hardness. European vehicles with hard, thin clear coats require a completely different approach than Japanese vehicles with softer, more workable clear coats. American factory paint has its own characteristics. Our technicians understand these differences and select the right combination of abrasives and machine settings to safely remove defects without burning through the clear coat or leaving micro-scratches from the correction process itself.</p>
    <p>A true single-stage correction removes approximately 70–80% of swirl marks and light scratches. For vehicles with deeper defects or for clients who want truly show-car results, we offer two-stage and three-stage correction that progressively increases the perfection level. We document our work with pre- and post-correction photos under proper lighting so you can see exactly what was achieved. The transformation on a well-corrected vehicle — particularly on dark colors that show every swirl — is dramatic and immediate.</p>
    <p>Paint correction is also the essential prerequisite for any long-term paint protection. Ceramic coating bonds chemically to the clear coat surface, and Paint Protection Film adheres to it physically. If those surfaces contain swirl marks and scratches, the protection layer seals those defects in permanently — and amplifies their visibility under certain lighting conditions. Correcting the paint first ensures that whatever protective layer you apply next is protecting a surface that’s in peak condition, maximizing both the protection and the aesthetic result.</p>
    <p>Our paint correction services are available for all vehicle types at our Garland, TX facility. We serve clients from across the DFW metroplex including Dallas, Plano, Richardson, McKinney, and Frisco. After correction, we typically recommend following up with a Gtechniq ceramic coating application to lock in the results and protect the corrected surface for years. Call (972) 362-8468 to discuss your vehicle’s needs and receive a quote based on its current condition.</p>
  `,
  "vehicle-paint-protection": `
    <p>Your vehicle’s paint is exposed to a relentless assault every time you drive. Rock chips from highway debris, bug impacts that etch the clear coat if left untreated, bird droppings and tree sap that chemically attack the paint surface, door dings from parking lots, and subtle abrasion from improper washing — all of these accumulate over time and result in a vehicle that looks worn, chipped, and faded long before its mechanical life is over. Paint Protection Film (PPF) is the only product that provides genuine physical protection against all of these threats simultaneously.</p>
    <p>Tint Tek Plus installs STEK DynoShield PPF, one of the most advanced paint protection films available to automotive installers. DynoShield is an 8-mil-thick thermoplastic urethane film with a unique self-healing topcoat. When the surface of the film is scratched or marked by light contact — car wash brushes, fingernail scratches, light key marks — the topcoat’s polymer chains relax back into alignment when exposed to heat. In Dallas’s climate, a car parked in the sun for 20–30 minutes will often heal light surface marks on its own. The underlying film continues to protect your paint regardless.</p>
    <p>The optical clarity of modern PPF has advanced dramatically. STEK DynoShield is engineered to be virtually invisible on most paint colors, with no orange peel texture, no haze, and no yellowing over the life of the product. Many of our clients have had DynoShield installed on their vehicles for months before friends or family notice — the protection is invisible to the eye but very real in its effect. On darker colors and high-gloss finishes, quality PPF actually enhances the paint’s depth and wetness compared to unprotected surfaces.</p>
    <p>PPF installation requires significantly more skill than window tinting or even ceramic coating application. The film must be stretched, repositioned, and tucked into edges and curves without leaving bubbles, lifting edges, or distortion in the optical surface. Tint Tek Plus uses computer-generated cutting patterns matched to your exact vehicle year, make, model, and trim level to pre-cut the film before installation. This eliminates the risk of blade marks and ensures precise coverage with clean edges that follow the body lines of your vehicle. Coverage options range from a front-end protection package (bumper, hood, fenders, mirrors) to full-vehicle coverage.</p>
    <p>STEK’s hydrophobic surface technology means that DynoShield-protected surfaces repel water, road grime, and contaminants with exceptional effectiveness. Vehicles with PPF are dramatically easier to wash and maintain — dirt doesn’t bond to the film the way it does to unprotected paint, and a simple rinse removes the vast majority of contamination. This also means that bug splatter and bird droppings — which can etch clear coat if left to sit — are less likely to cause damage because they’re sitting on a hydrophobic surface that doesn’t let them bond before you notice and rinse them off.</p>
    <p>STEK DynoShield carries a 10-year manufacturer warranty against yellowing, cracking, bubbling, and delamination when installed by an authorized dealer. Tint Tek Plus is an authorized STEK installation facility serving clients across Garland, Dallas, Plano, Frisco, Allen, and all of DFW. Call (972) 362-8468 for a consultation and quote — we’ll assess your vehicle, discuss your priorities, and recommend the coverage package that delivers the best protection for your specific situation.</p>
  `,
  "headlight-services": `
    <p>Modern vehicle headlights represent a significant investment that most owners don’t fully appreciate until replacement becomes necessary. OEM halogen headlight assemblies on mid-range vehicles often run $200–$500 per side. LED and adaptive headlight systems on newer vehicles and luxury models can cost $800–$2,000 per assembly or more, plus labor. These expensive components are mounted at the very front of the vehicle, directly in the path of highway rock chips, road debris, UV radiation, and bug impacts. Professional headlight protection is one of the most cost-effective services we offer.</p>
    <p>We install STEK Light Protection Film on headlight and taillight assemblies. This specialized film is designed from the ground up for lens applications — it has optical clarity specifications that standard PPF doesn’t meet, adhesive chemistry optimized for polycarbonate lens surfaces, and a UV-resistant topcoat that prevents the lens yellowing that typically develops on unprotected assemblies over 3–5 years. Like STEK’s automotive PPF, the Light Protection Film features self-healing technology that automatically repairs light surface scratches. The film is virtually invisible and maintains full light output without any perceptible change in beam pattern or intensity.</p>
    <p>For owners looking to customize their vehicle’s appearance, we offer premium headlight and taillight tinting using high-quality smoked vinyl film. The smoked aesthetic — ranging from a subtle charcoal tint to a nearly blacked-out finish — is enormously popular on virtually every vehicle type, from performance cars and trucks to SUVs and luxury vehicles. A properly tinted headlight gives any vehicle a stealthy, aggressive, custom appearance that commands attention without requiring expensive aftermarket headlight replacements.</p>
    <p>There’s an important distinction between headlight tinting for style and improper darkening that reduces safety. Our technicians understand this balance and can help you select a tint level that achieves the appearance you want while maintaining appropriate light output for night driving safety. Texas law requires headlights to be visible from a specified distance, and our installers apply tint film in compliance with these requirements. We do not install tint so dark that it materially compromises your headlight output at night — that’s not a service we’re willing to perform regardless of what a client requests.</p>
    <p>Taillight tinting is equally popular and carries its own benefits beyond aesthetics. Tinted taillights create a distinctive smoked appearance that makes virtually any vehicle look more aggressive and intentional. The film also adds a layer of protection against rock chips and minor impacts that can crack or shatter taillight lenses — an often-expensive repair. Our tinted taillight installations maintain full brake light and turn signal visibility, ensuring your vehicle remains safe and legal.</p>
    <p>All headlight and taillight services are performed at our Garland, TX shop using professional installation techniques and high-quality materials. We cut film patterns specifically for your vehicle’s lens geometry, ensuring seamless edge-to-edge coverage without gaps or lifting edges. Most headlight and taillight installations are completed within a few hours, allowing same-day turnaround in most cases. Call (972) 362-8468 to schedule your headlight protection or tinting service and discuss the look you want to achieve.</p>
  `,
  "windshield-protection-film": `
    <p>The Dallas-Fort Worth highway system is notoriously hard on windshields. The I-635 LBJ Freeway, US-75 Central Expressway, I-30, and the George Bush Tollway carry enormous volumes of commercial truck traffic that kicks up gravel, debris, and road material at highway speeds. A single rock strike from a passing truck can turn into a chip instantly, and in Texas heat, chips turn into cracks at a rate that surprises most drivers. For owners of modern vehicles with expensive advanced driver assistance systems (ADAS) embedded in the windshield, this isn’t just an inconvenience — it’s a potentially very expensive problem.</p>
    <p>Modern ADAS-equipped windshields contain forward-facing cameras, rain sensors, lane departure detection sensors, and sometimes even HUD projection elements integrated directly into the glass. These systems cannot be simply swapped out with an aftermarket windshield — they require OEM glass and professional ADAS recalibration after replacement. The total cost of replacing a windshield on a camera-equipped vehicle in DFW, including ADAS recalibration, regularly runs $1,200–$2,500. On some luxury and exotic vehicles, it’s higher. ExoShield GT3 windshield protection film, installed by Tint Tek Plus, can prevent that cost from ever occurring.</p>
    <p>ExoShield GT3 is not a repurposed paint protection film applied to glass — it’s engineered specifically for windshield applications from a fundamentally different set of specifications. The adhesive chemistry is designed for laminated safety glass rather than automotive paint. The optical specifications require zero distortion at any speed or angle — a standard that automotive PPF doesn’t meet. And the film’s impact absorption characteristics are tuned specifically to the fracture propagation physics of laminated windshield glass. When a rock strikes ExoShield, the film absorbs and disperses the energy, containing the fracture rather than allowing it to initiate a chip in the glass beneath.</p>
    <p>Optical clarity is the non-negotiable requirement for any windshield product. ExoShield GT3 is certified to maintain perfect optical transparency with no haze, no color shift, and no distortion at any viewing angle or speed. Most drivers and passengers cannot detect that the film is present. Critically, the film does not interfere with any ADAS sensors, cameras, or rain detection systems — it’s verified compatible with all major ADAS technology platforms including those used by Tesla, Mercedes, BMW, Ford, and Toyota.</p>
    <p>The return on investment calculation for ExoShield is straightforward. A single chip-free windshield on an ADAS-equipped vehicle saves $1,200–$2,500. ExoShield GT3 installation typically costs $300–$500. One avoided windshield replacement more than covers the cost of the film. For drivers who regularly commute on DFW’s major highways — particularly those who follow commercial trucks frequently — the film can prevent multiple chip events over its service life. ExoShield GT3 carries a 3-year manufacturer warranty, and most real-world installations perform well beyond the warranty period.</p>
    <p>Tint Tek Plus installs ExoShield GT3 at our Garland, TX facility for clients from across the DFW metroplex. We cut film patterns specific to your vehicle’s windshield geometry, ensuring full coverage of the driver’s sight line with clean, professional edges. Most installations are completed in under two hours. Call (972) 362-8468 to schedule your ExoShield installation and protect your windshield before the next highway rock makes that decision for you.</p>
  `,
  "ceramic-coating": `
    <p>Automotive paint is under constant attack from environmental forces that most vehicle owners don’t think about until the damage is already visible. UV radiation breaks down the polymers in clear coat over time, causing oxidation that dulls the finish. Industrial fallout — iron particles from brake dust and rail dust — bonds to painted surfaces and causes rust spots if not removed. Acid rain, bird droppings, tree sap, and road chemicals all contain compounds that chemically etch clear coat on contact if left untreated. Traditional wax and sealant products provide a degree of protection but require frequent reapplication and offer no resistance to chemical attack or significant hardness against physical abrasion. Ceramic coating fundamentally changes this equation.</p>
    <p>Tint Tek Plus is an accredited Gtechniq installer, applying Crystal Serum Ultra — one of the most advanced ceramic coating formulations available to professional installers. Crystal Serum Ultra works differently from entry-level coatings that simply add a hydrophobic topcoat. It uses a dual-layer system: a softer, flexible inner layer that bonds chemically to the clear coat at the molecular level and absorbs impact stress, topped by a harder outer layer rated at 9H on the pencil hardness scale that resists scratches, marring, and chemical contamination. The result is protection that is genuinely superior to any wax or sealant — and it lasts for years, not weeks.</p>
    <p>The hydrophobic properties of a properly applied Gtechniq coating are immediately and durably impressive. Water doesn’t sheet on the surface — it beads into tight spheres and rolls off even at low speeds, carrying surface contaminants with it. Dirt, road grime, and dust don’t bond to the coated surface the way they do to untreated paint, dramatically reducing wash time and the frequency with which thorough washing is needed. Bird droppings and bug splatter — which can etch unprotected clear coat within hours in Texas heat — sit on the surface of the coating and are far less likely to cause damage before they can be rinsed off.</p>
    <p>UV protection is a critical long-term benefit of ceramic coating in Texas’s intense sun environment. The coating acts as a UV barrier that dramatically slows the oxidation and color fading that make unprotected vehicles look old well before their mechanical life is over. Paint that was corrected and coated before significant UV damage accumulates retains its color depth and gloss for years longer than equivalent unprotected paint. For Dallas-area vehicle owners, where sun exposure is intense for 9+ months of the year, this represents meaningful real-world preservation of vehicle appearance and resale value.</p>
    <p>The aesthetic result of a Gtechniq Crystal Serum Ultra application is a deep, wet, mirror-like gloss that waxes simply cannot replicate. This is particularly pronounced on dark colors — black, dark blue, dark gray — where the coating creates a reflective depth that makes the paint look three-dimensional. The coating also enhances the visual contrast and saturation of metallic and pearl finishes. Combined with paint correction performed prior to the coating application, the visual transformation is dramatic — vehicles routinely look better after professional correction and coating than they did when new.</p>
    <p>Gtechniq Crystal Serum Ultra carries a 9-year warranty when applied by an accredited installer — one of the longest manufacturer warranties available for any automotive coating product. Tint Tek Plus holds Gtechniq accredited installer status, which is required to apply Crystal Serum Ultra and honor the extended warranty. We serve clients from across Garland, Dallas, Plano, McKinney, Frisco, and all of DFW. Call (972) 362-8468 to schedule a consultation — we’ll assess your vehicle’s current condition, discuss whether paint correction is recommended first, and provide a detailed quote for ceramic coating application.</p>
  `,
};

const GRADIENT = `radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
   radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
   linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)`;

const parseParagraphs = (htmlStr) => {
  if (!htmlStr) return [];
  return htmlStr
    .split(/<\/?p>/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
};

const SEOContentSection = ({ paragraphs, service }) => {
  if (!paragraphs || paragraphs.length === 0 || !service) return null;

  return (
    <Box sx={{ width: "100%", py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 6, md: 8 }
        }}
      >
        {/* Left Column: Sticky Header */}
        <Box sx={{ flex: { md: "0 0 35%" }, position: "relative" }}>
          <Box sx={{ position: "sticky", top: "140px" }}>
            <Typography
              component={motion.h3}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "3rem" },
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                mb: 2
              }}
            >
              About <br sx={{ display: { xs: "none", md: "block" } }} />
              <Box component="span" sx={{ color: "#2794d2" }}>{service.title}</Box>
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", mb: 4 }}>
              Everything you need to know about this service before booking your appointment.
            </Typography>

            <Box
              component={motion.div}
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              sx={{
                height: "4px",
                background: "linear-gradient(90deg, #2794d2, transparent)",
                borderRadius: "2px",
                mb: { xs: 4, md: 0 }
              }}
            />
          </Box>
        </Box>

        {/* Right Column: Numbered Glass Cards */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {paragraphs.map((text, index) => {
            const num = (index + 1).toString().padStart(2, '0');
            return (
              <Box
                key={index}
                component={motion.div}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 4 },
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "saturate(180%) blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  p: { xs: 3, md: 4 },
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease, background 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(39, 148, 210, 0.3)",
                  }
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: { xs: 1, md: 0.8 },
                    color: "rgba(39, 148, 210, 0.25)",
                    fontFamily: "monospace",
                    flexShrink: 0
                  }}
                >
                  {num}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: { xs: "1.05rem", md: "1.15rem" },
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  {text}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  );
};

const ServicePage = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const service = serviceDetails[serviceId];

  const seoParagraphs = useMemo(() => {
    return parseParagraphs(serviceBodyContent[serviceId]);
  }, [serviceId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO
  const { title, description, keywords, canonical, robots, jsonLd, image } = useMemo(() => {
    const path = serviceId
      ? `${SERVICES_BASE}/${serviceId}`
      : location.pathname;
    const url = `${SITE}${path}`.replace(/\/+$/, "");

    if (!service) {
      return {
        title: "Page Not Found | Tint Tek Plus",
        description: "The page you’re looking for doesn’t exist.",
        canonical: `${SITE}${location.pathname}`,
        robots: "noindex, nofollow",
        jsonLd: null,
      };
    }

    const meta = metaByService[serviceId] || {
      title: `${service.title} | Tint Tek Plus`,
      description: service.description,
    };

    const jsonLdObj = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: meta.description,
        url,
        areaServed: [
          { "@type": "City", name: "Garland" },
          { "@type": "City", name: "Dallas" },
          { "@type": "AdministrativeArea", name: "Dallas–Fort Worth, TX" },
        ],
        provider: {
          "@type": "LocalBusiness",
          name: "Tint Tek Plus",
          url: SITE,
          telephone: "+1-972-362-8468",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2518 West Kingsley Rd",
            addressLocality: "Garland",
            addressRegion: "TX",
            postalCode: "75040",
            addressCountry: "US",
          },
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          areaServed: "Dallas–Fort Worth, TX",
          seller: {
            "@type": "LocalBusiness",
            name: "Tint Tek Plus",
          },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: url,
          },
        ],
      },
    ];

    return {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      canonical: url,
      robots: "index, follow",
      jsonLd: jsonLdObj,
      image: serviceOgImages[serviceId] || null,
    };
  }, [serviceId, service, location.pathname]);

  // ---------- 404 ----------
  if (!service) {
    return (
      <Box
        className="ServicePageRoot"
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: GRADIENT }}
      >
        {/* Lightweight background layer */}
        <GlobalStyles
          styles={{
            ".ServicePageRoot": { position: "relative" },
            ".ServicePageRoot::before": {
              content: '""',
              position: "fixed",
              inset: 0,
              zIndex: -1,
              background: GRADIENT,
            },
            ".glass-section": {
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              backdropFilter: "blur(6px)",
            },
          }}
        />

        <SEO
          title={title}
          description={description}
          canonical={canonical}
          type="website"
        />

        <Topbar notFound />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            padding: { xs: 4, md: 8 },
            mt: { xs: "56px", md: "64px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "center", md: "left" },
                mb: { xs: 4, md: 0 },
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#FF6F61", fontWeight: "bold", mb: 1 }}
              >
                404
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
              >
                Oops! I may have chewed up the power cord.
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "rgba(255,255,255,0.8)" }}
              >
                Go back to our main page to continue your visit.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.5,
                  "&:hover": { backgroundColor: "#333" },
                }}
                href="/"
              >
                Back to main page
              </Button>
            </Box>

            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <img
                src="/dog.webp"
                alt="Dog"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                loading="lazy"
                decoding="async"
              />
            </Box>
          </Box>
        </Box>

        <Suspense fallback={Fallback}>
          <CallToAction />
          <Box>
            <Contact />
          </Box>
          <Footer />
        </Suspense>
      </Box>
    );
  }

  // ---------- NORMAL PAGE ----------
  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        jsonLd={jsonLd}
        image={image}
        type="website"
      />

      {/* Route-scoped wrapper with a fixed, GPU-friendly gradient layer */}
      <Box
        className="ServicePageRoot"
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: GRADIENT }}
      >
        <GlobalStyles
          styles={{
            ".ServicePageRoot": { position: "relative" },
            ".ServicePageRoot::before": {
              content: '""',
              position: "fixed",
              inset: 0,
              zIndex: -1,
              background: GRADIENT,
            },
            ".glass-section": {
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              backdropFilter: "blur(6px)",
            },
            ".bg-clear, .bg-clear *": {
              background: "transparent !important",
              backgroundImage: "none !important",
            },
            ".ServicePageRoot img, .ServicePageRoot video": {
              backgroundColor: "transparent",
            },
            "@media (max-width:900px)": {
              ".glass-section": { backdropFilter: "none" },
            },
          }}
        />

        {/* Hero */}
        <Box
          style={{ color: "white" }}
          sx={{
            position: "relative",
            width: "100%", // avoid 100vw layout jank
            pt: 10,
            minHeight: "clamp(280px, 40vh, 420px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: { xs: 1, sm: 2, md: 2 },
          }}
        >
          <BusinessInfo />
          <Typography
            variant="h1"
            style={{ color: "#fff" }}
            sx={{
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem", lg: "3.5rem" },
            }}
          >
            {service.title}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: "rgba(255,255,255,0.9)" }}
            sx={{
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1rem", md: "1.3rem", lg: "1.5rem" },
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                display: "block",
                width: "80px",
                height: "5px",
                backgroundColor: "#2794d2",
                margin: "6px auto 0",
                borderRadius: "2px",
                boxShadow:
                  "0 0 8px rgba(39,148,210,0.7), 0 0 16px rgba(39,148,210,0.6)",
                mt: 4,
              },
            }}
          >
            {service.description}
          </Typography>
        </Box>

        {/* Above-the-fold CTA variants — eagerly imported, no Suspense needed */}
        {(serviceId === "commercial-window-tinting" ||
          serviceId === "ceramic-coating" ||
          serviceId === "headlight-services" ||
          serviceId === "windshield-protection-film") && <VideoCTA />}

        {(serviceId === "tesla-window-tinting" ||
          serviceId === "vehicle-paint-protection" ||
          serviceId === "residential-window-tinting" ||
          serviceId === "vehicle-window-tinting") && <TeslaCTA />}


        {/* Per-service specialty sections (lazy + often below the fold) */}
        <Suspense fallback={Fallback}>
          {serviceId === "vehicle-paint-correction" && <ImageCTA />}
          {serviceId === "vehicle-paint-correction" && (
            <PaintCorrectionServices />
          )}

          <SEOContentSection paragraphs={seoParagraphs} service={service} />

          {serviceId === "tesla-window-tinting" && (
            <InViewMount rootMargin="200px">
              <TeslaTintingSimulator />
            </InViewMount>
          )}
          {serviceId === "vehicle-window-tinting" && (
            <InViewMount rootMargin="200px">
              <TintingSimulator />
            </InViewMount>
          )}
          {serviceId === "vehicle-paint-protection" && (
            <InViewMount rootMargin="200px">
              <PPFSelector />
            </InViewMount>
          )}
        </Suspense>



        {/* Pricing (exclude certain services) */}
        <Suspense fallback={Fallback}>
          {serviceId !== "vehicle-paint-correction" &&
            serviceId !== "commercial-window-tinting" &&
            serviceId !== "residential-window-tinting" &&
            serviceId !== "windshield-protection-film" &&
            serviceId !== "ceramic-coating" &&
            serviceId !== "headlight-services" &&
            serviceId !== "vehicle-paint-protection" && (
              <Box sx={{ width: "100%" }}>
                <PricingComponent />
              </Box>
            )}
        </Suspense>



        <Suspense fallback={Fallback}>
          {serviceId === "vehicle-window-tinting" && (
            <TintPackages />
          )}
          {serviceId === "tesla-window-tinting" && (
            <TeslaTintPackages />
          )}
          {serviceId === "headlight-services" && (
            <HeadlightPackages />
          )}
        </Suspense>

        {/* Optional banner */}
        {/* <Suspense fallback={null}><F1Banner /></Suspense> */}

        <Suspense fallback={Fallback}>
          {serviceId !== "vehicle-paint-correction" &&
            serviceId !== "ceramic-coating" && (
              <ServicesOffered serviceId={serviceId} />
            )}
        </Suspense>



        <Suspense fallback={Fallback}>
          {(serviceId === "commercial-window-tinting" ||
            serviceId === "tesla-window-tinting" ||
            serviceId === "residential-window-tinting") && (
              <InViewMount rootMargin="200px">
                <ImageCarousel />
              </InViewMount>
            )}
        </Suspense>

        <Suspense fallback={Fallback}>
          {serviceId !== "commercial-window-tinting" &&
            serviceId !== "residential-window-tinting" && (
              <HowItWorks serviceId={serviceId} />
            )}
        </Suspense>



        <Suspense fallback={Fallback}>
          {(serviceId === "vehicle-window-tinting" ||
            serviceId === "tesla-window-tinting" ||
            serviceId === "commercial-window-tinting" ||
            serviceId === "windshield-protection-film" ||
            serviceId === "vehicle-paint-correction" ||
            serviceId === "vehicle-paint-protection" ||
            serviceId === "ceramic-coating" ||
            serviceId === "headlight-services" ||
            serviceId === "residential-window-tinting") && (
              <BenefitsGrid />
            )}
        </Suspense>

        <Suspense fallback={Fallback}>
          <BlogCTA />
        </Suspense>

        <Suspense fallback={Fallback}>
          <FAQSection />
          <CallToAction />
        </Suspense>

        <Suspense fallback={Fallback}>
          {/* Keep wrappers minimal to let the gradient show through */}
          <Box>
            <Contact />
          </Box>
          <QuickLinks />
          <Footer />
        </Suspense>
      </Box>
    </>
  );
};

export default ServicePage;
