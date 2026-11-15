// src/components/sub-pages/FAQ.jsx  (/support)
// Apple Support-style page: big hero with a live search field, "Browse by
// Service" topic tiles that jump to each topic, and every topic's questions on
// the page in hairline lists with "+" disclosures (native <details>, so every
// answer is in the HTML — required for the FAQPage schema — and works without
// JS). No framer-motion, no JS media queries, no tab/dropdown switching.
import { useDeferredValue, useMemo, useState } from "react";
import PropTypes from "prop-types";
import SEO from "../SEO";
import { Box, Container, Typography } from "@mui/material";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Footer from "../key-components/Footer";
import CallToAction from "../SubCTA";
import Contact from "../SubContact";
import QuickLinks from "../SubQuickLinks";

/* --------------------------------- DATA --------------------------------- */
const faqConfig = {
  "window-tint": [
    {
      question: "What makes Llumar window film superior to other brands?",
      answer: `<ul>
          <li>At Tint Tek Plus, we exclusively offer LLumar window films! American made and manufactured, known for their exceptional quality and performance. Unlike many competitors, LLumar films are rigorously third-party tested to ensure they meet the highest standards in heat rejection, UV protection, and durability. Many companies claim high-performance numbers, but without proper third-party validation, those claims can’t be trusted. With LLumar, you get verified, proven results backed by independent testing.</li>
          <li>LLumar films effectively block infrared heat, keeping your vehicle cooler without requiring overly dark tints. Plus, they block 99% of harmful UV rays, protecting you from skin cancer, premature aging, and skin cell damage. When you choose LLumar at Tint Tek Plus, you're choosing products that offer real, reliable protection and comfort for your vehicle.</li>
        </ul>`,
    },
    {
      question: "How is Window Film installed? ",
      answer:
        "At Tint Tek Plus, we use a precise installation process for our window tint. The tint film is first carefully shrunk to fit on the exterior of your vehicle's windows, allowing it to conform to the natural curves of the glass. Once perfectly shaped, the film is then installed on the inside of the glass using its own specialized adhesive. This ensures a seamless, smooth finish that not only looks great but also provides long-lasting durability",
    },
    {
      question: "Do you remove anything when tinting a car? ",
      answer:
        "At Tint Tek Plus, we use a precise installation process for our window tint. The tint film is first carefully shrunk to fit on the exterior of your vehicle's windows, allowing it to conform to the natural curves of the glass. Once perfectly shaped, the film is then installed on the inside of the glass using its own specialized adhesive. This ensures a seamless, smooth finish that not only looks great but also provides long-lasting durability.",
    },
    {
      question:
        "Will window tinting affect the clarity of my windows or impair visibility, especially at night?",
      answer:
        "While window tinting reduces glare and improves comfort, darker tints can make it harder to see at night. We offer a range of tint options to ensure a balance between privacy, UV protection, and clear visibility, even in low-light conditions.",
    },
    {
      question: "How to clean windows once tinted?",
      answer: `
      <ul>
        <li><strong>Wait 3-5 days</strong> for the tint to cure before cleaning. </li>
        <li><strong>Use a soft microfiber cloth </strong> to avoid scratching</li>
        <li><strong> Use a mild, non-ammonia cleaner</strong> or a vinegar-water solution.</li>
        <li><strong> Wipe gently in circular motions</strong> to avoid damaging the tint.</li>
        <li><strong> Dry with a clean cloth</strong> to prevent water spots.</li>
      </ul>`,
    },
  ],
  "paint-correction": [
    {
      question: "What is Paint Correction?",
      answer:
        "Paint correction is a process used to restore the appearance of a vehicle’s paint by removing imperfections such as swirl marks, scratches, oxidation, water spots, and other imperfections that can make the paint look dull or damaged. It’s a highly effective way to bring back the original shine and depth of your vehicle's paint, ensuring it looks as good as new.",
    },
    {
      question: "How Long Does Paint Correction Last?",
      answer:
        "The results of paint correction can last for a long time, but they depend on how well the vehicle is maintained. The process removes imperfections in the paint, but it doesn’t protect against future scratches or damage. Applying a protective layer, like ceramic coating or wax, will help maintain the corrected finish longer.",
    },
    {
      question: "How Do You Fix Swirl Marks and Scratches on Car Paint?",
      answer:
        "Swirl marks and light scratches can be removed through the paint correction process. A combination of specialized polishing compounds and a machine polisher are used to gently remove the damaged layer of paint, restoring the surface to its original smoothness and gloss.",
    },
    {
      question: "Can Paint Correction Remove Deep Scratches?",
      answer:
        "Paint correction is effective at removing light to moderate imperfections, but deep scratches that penetrate the clear coat may require additional repair or touch-up painting. In some cases, the scratch may only be minimized, not fully eliminated.",
    },
    {
      question: "How Can I Maintain My Vehicle After Paint Correction?",
      answer:
        "To maintain your vehicle’s appearance after paint correction, regular washing with pH-neutral car shampoo and a microfiber towel is essential. Additionally, applying a ceramic coating or wax will help protect the paint and keep it looking pristine for longer.",
    },
    {
      question: "Can Paint Correction Be Done on New Cars?",
      answer:
        "Absolutely! Even new cars can benefit from paint correction to remove any imperfections caused during the manufacturing process or from transportation. In fact, many car owners opt for paint correction shortly after purchasing their vehicle to ensure it looks its best from day one.",
    },
  ],
  "paint-protection": [
    {
      question: "What is Paint Protection Film (PPF)?",
      answer:
        "PPF is made from a durable, clear urethane material. This advanced polymer film is engineered to protect a vehicle’s paint from scratches, stone chips, UV damage, and contaminants. The film is designed to be both flexible and tough, allowing it to conform seamlessly to the contours of the vehicle. The key feature of STEk PPF is its self-healing technology, which allows light scratches or swirl marks to disappear when exposed to heat, either from sunlight or a warm surface. This unique ability helps maintain the film’s smooth, flawless appearance over time.",
    },
    {
      question: "How much coverage do I receive with Paint Protection Film?",
      answer: `
      While we aim for 99%+ coverage with our Paint Protection Films and it's important to note that these materials are not paint, and achieving 100% perfect coverage is not always possible. Minor imperfections such as slight lifting on sharp curves, rivets, seams, or edges—even on flat surfaces—can occasionally occur. These are natural characteristics of the material, and some flaws are to be expected. </br>
      </br> We carefully place seams in the material to reduce issues like bubbling or lifting as much as possible, but some areas may still show minor signs. To ensure you're comfortable with the final result, we encourage you to ask a Tint Tek Plus team member to give you a better understanding of how your vehicle will look once PPF is applied.
      `,
    },
    {
      question: "Does PPF Damage Paint?",
      answer:
        "Paint Protection Film (PPF)  should not cause damage to your vehicle's factory paint or repainted surfaces. However, if your paint is already chipped or the panels have been repainted, there’s a chance that the film may lift the paint or clear coat during installation or removal. Since we cannot control the condition or quality of your vehicle's paint—whether it’s original or repainted—we are not liable for any peeling or damage that might occur during the process. We recommend ensuring that your paint is in good condition before applying PPF or vinyl wrap to avoid any potential issues.",
    },
    {
      question: "Will Paint Protection Film (PPF) look perfect?",
      answer: `
      Our goal is to always provide you with the highest-quality installation, and we are continuously evolving to be the best in the industry. However, achieving a perfectly flawless look can be challenging due to PPF being an 8mm film, not paint. Common irregularities, such as tack marks, stretch marks, or seams, are normal and necessary to ensure proper adhesion and a secure, long-lasting installation. </br>
      </br> Even with our skilled installation team, small imperfections may still occur, especially on sharp corners or concave areas of your vehicle. While we are always working to minimize these issues and improve our techniques, it's important to understand that eliminating every wrinkle or bubble completely can be difficult. </br>
      </br>In short, while we strive for perfection and are constantly evolving to reduce these imperfections, the nature of working with PPF means that some slight irregularities may still be present. Rest assured, you will still receive a top-quality result that significantly enhances and protects your vehicle. </br>
      `,
    },
    {
      question: "Do you remove any parts from my vehicle?",
      answer:
        "In some cases, yes, it may be necessary to remove certain parts of your vehicle to ensure a clean and seamless installation. Parts like mirrors, badges, or trim pieces are sometimes taken off to achieve a perfect wrap or film application. This step helps us ensure that the film fits precisely and avoids any potential lifting or wrinkles. Our goal is to ensure your vehicle looks flawless, and part of that process can involve removing parts to provide a more thorough and professional finish",
    },
    {
      question: "Do you do any corrections before installing PPF?",
      answer: `
      Yes, we perform a light polish on the vehicle before applying the Paint Protection Film (PPF). This is important because PPF encapsulates the condition of the paint, meaning any imperfections in the paint will be visible once the film is applied. Ensuring that the paint is in the best possible condition is key to achieving the highest-quality result. </br>
      </br> Once the vehicle arrives, we carefully inspect the condition of the paint. If any additional corrections, such as deeper polishing or paint repair, are needed to optimize the surface for PPF application, we will recommend those before proceeding. Our goal is to make sure the paint is in top condition so that the PPF adheres properly and looks flawless once applied.
      `,
    },
    {
      question: "Do you check the PPF after installation?",
      answer:
        "Yes, we schedule a post-installation check-up to ensure everything is perfect. After the PPF is applied, we carefully inspect the entire vehicle to make sure the film is properly adhered and that any bubbles, wrinkles, or imperfections are minimized. If any adjustments are needed, we take care of them promptly. We also provide guidance on proper care and maintenance, ensuring your PPF continues to protect and enhance your vehicle for years to come. Your satisfaction is our pr",
    },
    {
      question: "Can I PPF my car after a collision or having it repainted? ",
      answer:`
      While we always strive for perfection and take every precaution during installation, it’s important to understand that Paint Protection Film (PPF) can potentially cause damage to certain surfaces, especially if the vehicle has had previous aftermarket repairs, such as repainting, Bondo, dent repair, or work involving carbon fiber or fiberglass. During installation, the film is often aligned multiple times on the painted panel, and the strong adhesive on the back of the film can sometimes lift paint or clear coat—this can happen even with factory paint. </br>
      </br> We make every effort to avoid this, but if your vehicle has been repainted or has existing damage like chips, there’s a chance that the film could pull up the paint or clear coat during installation or removal, particularly in areas where the paint or clear coat is not well bonded or has been poorly applied. </br>
      </br> As a result, Tint Tek Plus cannot be held responsible for any damage caused to repainted surfaces or factory paint during installation or when the film is removed later. This includes any peeling of paint, removal of existing clear bra, emblems, or vinyl that might be necessary for the installation. By proceeding with the service, you agree to release us from all liability related to peeling paint or clear coat damage.</br>
      </br> To minimize any risks, we highly recommend ensuring your paint is in good condition before applying PPF or vinyl wrap. If your vehicle has been repainted, it’s best to check the quality of the paint job and confirm it’s fully cured and bonded to avoid any potential issues.</br>
      `
    },
  ],
  "windshield-protection": [
    {
      question: "What is ExoShield GT3 Windshield Protection Film?",
      answer:
        "ExoShield GT3 is a high-performance windshield protection film designed to protect your vehicle's windshield from chips, cracks, and other road debris damage. Made from a durable, optically clear polyurethane material, ExoShield is applied directly to the windshield to provide an extra layer of defense while maintaining clarity and functionality.",
    },
    {
      question: "Can I Wash My Car Normally After Installing ExoShield?",
      answer:
        "Yes! ExoShield is designed to withstand regular car washes. You can wash your car as usual, but it's recommended to avoid harsh chemicals or abrasive scrubbing materials that could damage the protective film. Hand washing or touchless car washes are ideal for maintaining the integrity of the film.",
    },
    {
      question: "Does ExoShield GT3 Change the Look of My Windshield?",
      answer:
        "ExoShield is clear and nearly invisible once applied, so it won't alter the appearance of your windshield. It offers protection without changing the look of your vehicle or obstructing your view in any way.",
    },
    {
      question: "Is ExoShield GT3 Easy to Maintain?",
      answer:
        "Yes, ExoShield is low-maintenance. Regular cleaning with a soft microfiber towel and pH-neutral cleaner is all that’s needed to keep the film looking great. The film is also self-healing, which means minor scratches can disappear over time when exposed to heat, such as sunlight.",
    },
    {
      question: "Can an ExoShield GT3 Be Removed?",
      answer:
        "ExoShield GT3 is designed to be permanent, but if it ever needs to be removed (e.g., when replacing a damaged windshield), the film can be safely removed by a professional without damaging the glass underneath.",
    },
    {
      question: "Does ExoShield GT3 protect against all types of damage?",
      answer:
        "ExoShield GT3 significantly reduces the risk of damage from road debris, such as rocks, gravel, and other hazards. However, it is not a guarantee against all types of damage, such as large impacts or severe accidents. It provides additional protection but doesn't replace the need for careful driving.",
    },
    {
      question: "Can Windshield Wipers Damage My Windshield?",
      answer: `Yes, windshield wipers can damage your windshield in several ways:
       <ul>
        <li><strong> Scratches from debris:</strong> Wipers can drag dirt or road debris across the glass, causing micro-scratches.</li>
        <li><strong> Wiper blade wear:</strong> Damaged or old wiper blades can cause friction and scratching on the windshield.</li>
        <li><strong> Dry windshield use:</strong> Wiping a dry windshield can cause excessive friction, leading to scratches.</li>
      </ul>`,
    },
  ],
  "ceramic-coating": [
    {
      question: "What is Ceramic Coating? ",
      answer:
        "Ceramic coating is a liquid polymer applied to the exterior surfaces of a vehicle, such as the paint, glass, wheels, and trim, that creates a hydrophobic (water-repellent) surface. This coating bonds chemically with the vehicle's surface, forming a protective layer that provides several benefits.",
    },
    {
      question: "How Do I Maintain My Ceramic Coating?",
      answer: `Ceramic coatings require annual maintenance to keep the hydrophobic properties refreshed. Over time, the coating's sacrificial layer will wear down, so we recommend bringing your vehicle in for its annual checkup after one year.
      <ul>
       <li><strong>Cost of Annual Maintenance: </strong> Starting at $225</li>
     </ul>`,
    },
    {
      question: "Can I Wash My Car Normally After a Ceramic Coating?",
      answer:`
        Yes! But never use an automated car wash. The harsh chemicals, brushes, or cloths used in automated car washes can degrade the coating and cause micro-scratching. </br>
        </br> <strong>Best Practice: </strong>Always hand wash your vehicle using pH-neutral car shampoo and soft microfiber towels or a wash mitt to gently remove dirt. Avoid using any abrasive materials that could damage the coating.        `,
    },
    {
      question: "How Should I Protect My Vehicle from Contaminants?",
      answer: `Though ceramic coatings create a strong protective layer, contaminants like tree sap, bird droppings, or road tar can still affect the surface.
      <ul>
       <li><strong> Quick Action: </strong> If you notice contaminants, clean them off as soon as possible to avoid damaging the coating.</li>
       <li><strong> Use Detail Spray: </strong>  A ceramic-safe quick detail spray can be used to help remove contaminants gently without harming the coating.</li>
     </ul>`,
    },
    {
      question: "Can I Use My Vehicle in the Rain After Getting Ceramic Coating?",
      answer: `
      Yes! In fact, rain will actually showcase the benefits of your ceramic coating, as the water will bead up and roll off the surface.
      <ul>
        <li><strong>Note: </strong> The hydrophobic effect is at its best when the coating has had time to cure fully (typically 24-48 hours after application).</li>
      </ul>`,
    },
    {
      question: "Does the Ceramic Coating Protect Against Scratches?",
      answer: `
        While the ceramic coating offers excellent protection against minor scratches and swirl marks, it is not entirely scratch-proof. It helps prevent surface damage from contaminants and environmental factors, but rough or heavy impacts can still harm the paint.
        <ul>
          <li><strong>Tip: </strong> Always avoid contact with harsh or abrasive materials on the surface, and regularly clean your vehicle to prevent damage from debris.</li>
        </ul>`,
    },
  ],
  "paint-disclosure": [
    {
      question: "What is the policy on paint damage?",
      answer: `Tint Tek Plus is not liable for any paint-related issues, including but not limited to peeling, lifting, or damage, that may occur during the installation of film or when the film is removed at a later time.
       <ul>
        <li><strong>Paint Condition: </strong>  We are not the manufacturer or previous repairer of your vehicle, and therefore, we cannot assess any potential underlying paint issues that may exist.</li>
        <li><strong>Inherent Risks: </strong>  Installing any type of film or vinyl on a vehicle involves inherent risks to the paint, such as potential damage, especially if the paint is already compromised, previously repaired, or aged.</li>
        <li><strong>Customer Responsibility: </strong>  By proceeding with the installation, you fully accept responsibility for any risks associated with the application of the film, including any damage that may occur to the paint during or after the installation.</li>
      </ul>`,
    },
  ],
  "warrany-for-services": [
    {
      question: "Automotive Window Tint Warranty",
      answer: `<strong> Warranty Duration: </strong> LLumar window films come with a lifetime warranty for the original owner of the vehicle, covering defects in materials and craftsmanship. Coverage: The warranty includes protection against: </br>
     </br><strong>Coverage: </strong> The warranty covers defects in materials or workmanship, including:
      <ul>
        <li>Peeling</li>
        <li>Cracking</li>
        <li>Blistering</li>
        <li>Discoloration</li>
      </ul>

      <strong>Exclusions: </strong> The warranty does not cover:
      <ul>
        <li>Damage caused by improper care or cleaning, including the use of abrasive materials or harsh chemicals.</li>
        <li>Damage from accidents or or external impacts (e.g., Animals,chips, scratches, or punctures).</li>
      </ul>
      `,
    },
    {
      question: "Residential Window Tint Warranty",
      answer: `<strong> Warranty Duration: </strong> LLumar offers a lifetime warranty for residential window tinting, which is valid for the original purchaser and applies as long as you reside in the same home.</br>
      </br><strong>Coverage: </strong> The warranty covers defects in materials or workmanship, including:
      <ul>
        <li>Peeling</li>
        <li>Cracking</li>
        <li>Blistering</li>
        <li>Discoloration</li>
      </ul>

      <strong>Exclusions: </strong> The warranty does not cover:
      <ul>
        <li>Damage from improper care, such as the use of harsh chemicals, abrasive cleaning tools, or automated cleaning systems.</li>
        <li>Damage from external impacts, including scratches, abrasions, or punctures from accidents or physical force.</li>
        <li>Issues caused by environmental factors, such as extreme weather conditions, improper window preparation, or improper installation of the film.</li>
      </ul>
      <strong>Proper Care: </strong> To keep the warranty active, follow the manufacturer’s recommendations for cleaning and maintenance. Avoid harsh chemicals, abrasive tools, and automated window cleaning systems to prevent film damage.
      `,
    },
    {
      question: "Commercial Window Tint Warranty",
      answer: `<strong> Warranty Duration: </strong> LLumar offers a limited warranty for commercial window tinting, which is valid for up to 15-years.</br>
      </br><strong>Coverage: </strong> The warranty covers defects in materials or workmanship, including:
      <ul>
        <li>Peeling</li>
        <li>Cracking</li>
        <li>Blistering</li>
        <li>Discoloration</li>
      </ul>

      <strong>Exclusions: </strong> The warranty does not cover:
      <ul>
        <li>Damage caused by improper cleaning methods, including the use of abrasive tools, harsh chemicals, or automated cleaning systems.</li>
        <li>Damage from physical impact, such as scratches, abrasions, or punctures caused by accidents or external factors.</li>
      </ul>
      `,
    },
    {
      question: "Paint Protection Film (STEK PPF) Warranty & Care Guidelines",
      answer: `<strong> Warranty Duration: </strong> The STEK Paint Protection Film (PPF) applied to your vehicle is covered by a 10-year limited warranty against defects in material and workmanship, including delamination, bubbling, and peeling under normal use.</br>
      </br><strong>Coverage: </strong> The warranty covers defects in materials or workmanship, including:
      <ul>
        <li>Peeling</li>
        <li>Cracking</li>
        <li>Blistering</li>
        <li>Discoloration</li>
      </ul>
      <strong>Hydrophobic Properties: </strong> Over time, the hydrophobic properties of the PPF may diminish. 
      <strong>Exclusions: </strong> The warranty does not cover:
      <ul>
        <li>Damage from improper cleaning, including using abrasive materials or harsh chemicals.</li>
        <li>Scratches, chips, or abrasions caused by road debris, impacts, or other external factors.</li>
        <li>Damage from pre-existing conditions on the vehicle's paint, such as cracks, imperfections, or other surface issues.</li>
      </ul>
       <strong>Proper Care: </strong>  To maintain your warranty, it's important to properly care for the PPF. Automated car washes should be avoided, as the harsh chemicals and brushes used in these systems can damage the film and cause micro-abrasions. We highly recommend hand washing your vehicle using mild, pH-balanced products to preserve the film’s integrity.
      `,
    },
    {
      question: "Ceramic Coating Warranty & Care Guidelines",
      answer: `<strong> Warranty Duration: </strong> The warranty for our ceramic coatings is valid for the entire lifespan of the coating you choose, provided proper care is followed.</br>
      </br><strong>Proper Care: </strong> To maintain your warranty, it is crucial to properly maintain the coating. Automated car washes should never be used, as the harsh chemicals and machines can damage the coating and cause micro-scratching, especially if brushes or abrasive materials are involved. We recommend hand washing your vehicle with appropriate products to preserve the coating.</br>
      </br><strong>Hydrophobic Properties: </strong> Over time, the hydrophobic properties of the coating may decrease. This doesn’t mean the coating is no longer effective; it’s simply a sign that the pores of the coating may be clogged. A decontamination wash will restore the coating’s performance and hydrophobic qualities.</br>
      </br><strong>Decontamination Wash: </strong> We offer a decontamination wash for $225, which we recommend every 12-24 months to keep the coating performing optimally.
      `,
    },
    {
      question: "Darken PPF Headlights/Taillights Warranty",
      answer: `<strong> Warranty Coverage: </strong> The STEK Paint Protection Film (PPF) applied to your taillights is covered by a 7-year limited warranty against defects in material and workmanship. This warranty includes protection against delamination, bubbling, or peeling of the film under normal conditions.</br>
      `,
    },
    {
      question: "Windshield Protection Warranty",
      answer: `
        ExoShield GT3 Windshield Protection comes with a 36-month manufacturer's warranty covering defects related to film delamination. This warranty does not cover issues such as pitting, chipping, cracking, or scratches caused by washing or windshield wipers. For optimal performance, the film should be removed if it becomes hazy or difficult to see through. </br>\
        </br> Any warranty claims or issues must be addressed at our location. If you notice any defects or concerns with the film, please contact Tint Tek Plus by phone or email within 7 days of discovery, so we can promptly work to resolve the issue.</br>
        </br>Additionally, for $150, you can opt for an additional insurance policy that provides up to $1,000 toward the cost of windshield replacement if necessary during the coverage period</br>
      `,
    },
  ],
  "videography/Photography": [
    {
      question: "Videography/Photography Policy",
      answer: `
        At Tint Tek Plus, we take detailed photos of your vehicle before, during, and after the installation/Service. This helps us document the condition of your vehicle, the steps of the installation, and the final result. Throughout the process, we may showcase your vehicle on our social media platforms, such as Instagram, Facebook, and others, to highlight our work and promote our services.</br>
        </br>At Tint Tek Plus, we take detailed photos of your vehicle before, during, and after the installation/Service. This helps us document the condition of your vehicle, the steps of the installation, and the final result. Throughout the process, we may showcase your vehicle on our social media platforms, such as Instagram, Facebook, and others, to highlight our work and promote our services.</br>
      `,
    },
  ],
  "customer-satisfaction": [
    {
      question: "Customer Satisfaction",
      answer:
        "At Tint Tek Plus, customer satisfaction is the cornerstone of our success. We strive to not only meet but exceed your expectations with every service. If any issue arises or something doesn’t meet your expectations, we ask that you reach out to us directly so we can address your concerns and resolve the situation. We believe most issues are simply misunderstandings that can be easily fixed. Please give us the opportunity to make things right before leaving feedback on platforms like Facebook, Google, Reddit, etc. We truly appreciate your understanding and the chance to resolve any concerns before negative comments are posted.",
    },
  ],
};

// Display names + icons per topic. Titles used to be generated from the keys,
// which showed the "warrany" typo to customers.
const TOPIC_META = {
  "window-tint": { title: "Window Tint", Icon: DirectionsCarOutlinedIcon },
  "paint-correction": { title: "Paint Correction", Icon: AutoFixHighOutlinedIcon },
  "paint-protection": { title: "Paint Protection", Icon: ShieldOutlinedIcon },
  "windshield-protection": { title: "Windshield Protection", Icon: WindowOutlinedIcon },
  "ceramic-coating": { title: "Ceramic Coating", Icon: WaterDropOutlinedIcon },
  "paint-disclosure": { title: "Paint Disclosure", Icon: GppMaybeOutlinedIcon },
  "warrany-for-services": { title: "Warranty for Services", Icon: VerifiedUserOutlinedIcon },
  "videography/Photography": { title: "Videography/\u200BPhotography" /* allow a break after the slash */, Icon: PhotoCameraOutlinedIcon },
  "customer-satisfaction": { title: "Customer Satisfaction", Icon: SentimentSatisfiedAltOutlinedIcon },
};

// The answers were hand-written with "</br>" (invalid HTML) and template-literal
// line continuations. Normalise them once so both the page and the FAQPage
// JSON-LD get clean, valid markup.
const cleanHtml = (html = "") =>
  html
    .replace(/<\/br>|<br\s*\/?>/gi, "<br>")
    .replace(/\\\s*$/gm, "")
    .replace(/\s+/g, " ")
    .trim();

const stripHtml = (html = "") => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const faqSections = Object.entries(faqConfig).map(([key, questions]) => {
  const anchor = `topic-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return {
    id: key,
    anchor,
    ...(TOPIC_META[key] || { title: key, Icon: DirectionsCarOutlinedIcon }),
    questions: questions.map((q, index) => ({
      id: `${anchor}-q${index + 1}`,
      question: q.question.trim(),
      answer: cleanHtml(q.answer),
      searchText: `${q.question} ${stripHtml(q.answer)}`.toLowerCase(),
    })),
  };
});

const SITE = "https://tinttekplus.com";
const META = {
  title: "Window Tinting FAQ – Garland & Dallas, TX | Tint Tek Plus",
  description:
    "Get answers to your window tinting, paint correction, ceramic coating, and PPF questions. Tint Tek Plus serves Garland, Dallas, and all of DFW.",
  keywords:
    "window tint faq, window tint warranty, llumar warranty, ppf warranty, ceramic coating faq, paint correction faq, windshield protection film, tint tek plus support, garland tx, dallas tx",
  image: `${SITE}/v-window-tint/vehicle-window-tint.webp`,
};
const ACCENT = "#4db8f0";
const EASE = "cubic-bezier(.25,.1,.25,1)";
const BG = `
  radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
  radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
  linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)
`;

/* ------------------------------ Pieces ------------------------------ */
function QuestionRow({ q, forceOpen }) {
  return (
    <Box
      component="details"
      // Remount when a search starts/ends so matches open and close cleanly
      key={forceOpen ? "open" : "closed"}
      open={forceOpen || undefined}
      sx={{
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        "&[open] .faq-plus": { transform: "rotate(45deg)", backgroundColor: "rgba(77,184,240,0.16)", color: ACCENT },
        "&[open] summary": { color: "#fff" },
      }}
    >
      <Box
        component="summary"
        sx={{
          listStyle: "none",
          "&::-webkit-details-marker": { display: "none" },
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          py: { xs: 2.25, md: 2.75 },
          color: "rgba(245,245,247,0.92)",
          fontWeight: 600,
          fontSize: { xs: "1.05rem", md: "1.2rem" },
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
          transition: `color .2s ${EASE}`,
          "&:hover": { color: "#fff" },
          "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 4, borderRadius: 1 },
        }}
      >
        <Box component="span" id={q.id}>
          {q.question}
        </Box>
        <Box
          className="faq-plus"
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "#f5f5f7",
            transition: `transform .3s ${EASE}, background-color .3s ${EASE}, color .3s ${EASE}`,
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 22 }} />
        </Box>
      </Box>
      <Typography
        component="div"
        sx={{
          pb: { xs: 3, md: 3.5 },
          pr: { md: 8 },
          color: "rgba(245,245,247,0.7)",
          fontSize: { xs: "1rem", md: "1.05rem" },
          lineHeight: 1.7,
          "& ul": { pl: 2.5, my: 1.5 },
          "& li": { mb: 1.25 },
          "& strong": { color: "#f5f5f7", fontWeight: 600 },
        }}
        dangerouslySetInnerHTML={{ __html: q.answer }}
      />
    </Box>
  );
}

QuestionRow.propTypes = {
  q: PropTypes.shape({ id: PropTypes.string, question: PropTypes.string, answer: PropTypes.string }).isRequired,
  forceOpen: PropTypes.bool,
};

/* --------------------------------- Page --------------------------------- */
const FAQ = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const q = deferredQuery.trim().toLowerCase();

  // Structured data: FAQPage (every Q&A — all of which are rendered on the
  // page, as Google requires), BreadcrumbList and WebPage.
  const jsonLd = useMemo(() => {
    const url = `${SITE}/support`;
    return [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        mainEntity: faqSections.flatMap((section) =>
          section.questions.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          }))
        ),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Support", item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: META.title,
        description: META.description,
        inLanguage: "en-US",
        primaryImageOfPage: META.image,
        isPartOf: { "@type": "WebSite", name: "Tint Tek Plus", url: SITE },
        about: { "@type": "LocalBusiness", "@id": `${SITE}/#business`, name: "Tint Tek Plus" },
      },
    ];
  }, []);

  // Live search across every topic
  const visibleSections = useMemo(() => {
    if (!q) return faqSections;
    const words = q.split(/\s+/).filter(Boolean);
    return faqSections
      .map((s) => ({
        ...s,
        questions: s.questions.filter((item) => words.every((w) => item.searchText.includes(w))),
      }))
      .filter((s) => s.questions.length > 0);
  }, [q]);
  const resultCount = visibleSections.reduce((n, s) => n + s.questions.length, 0);

  return (
    <>
      <SEO
        title={META.title}
        description={META.description}
        keywords={META.keywords}
        canonical={`${SITE}/support`}
        image={META.image}
        jsonLd={jsonLd}
      />
      <Box sx={{ background: BG, color: "#fff", minHeight: "100vh" }}>
        {/* Hero + search */}
        <Box component="header" sx={{ pt: { xs: 14, md: 20 }, pb: { xs: 6, md: 9 }, textAlign: "center" }}>
          <Container maxWidth="md">
            <Typography
              sx={{
                color: ACCENT,
                fontWeight: 600,
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                letterSpacing: "0.08em",
                mb: 1.5,
              }}
            >
              TINT TEK + INSIGHTS
            </Typography>
            <Typography
              component="h1"
              sx={{
                color: "#f5f5f7",
                fontWeight: 700,
                fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.75rem" },
                lineHeight: 1.03,
                letterSpacing: "-0.035em",
                mb: { xs: 2, md: 2.5 },
              }}
            >
              User Essentials
            </Typography>
            <Typography
              sx={{
                color: "rgba(245,245,247,0.62)",
                fontWeight: 500,
                fontSize: { xs: "1.15rem", md: "1.45rem" },
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                maxWidth: 620,
                mx: "auto",
                mb: { xs: 4, md: 5 },
              }}
            >
              Everything you need to know about our services & warranties
            </Typography>

            {/* Search field */}
            <Box
              component="form"
              role="search"
              onSubmit={(e) => e.preventDefault()}
              sx={{
                position: "relative",
                maxWidth: 640,
                mx: "auto",
              }}
            >
              <SearchRoundedIcon
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(245,245,247,0.55)",
                  fontSize: 24,
                  pointerEvents: "none",
                }}
              />
              <Box
                component="input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search support"
                aria-label="Search support questions"
                sx={{
                  width: "100%",
                  height: { xs: 54, md: 60 },
                  pl: 7,
                  pr: query ? 7 : 3,
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 999,
                  outline: "none",
                  fontFamily: "inherit",
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                  color: "#f5f5f7",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  transition: `border-color .25s ${EASE}, background-color .25s ${EASE}`,
                  "&::placeholder": { color: "rgba(245,245,247,0.45)" },
                  "&::-webkit-search-cancel-button": { display: "none" },
                  "&:focus": { borderColor: "#2794d2", backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              />
              {query && (
                <Box
                  component="button"
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 32,
                    height: 32,
                    border: 0,
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    color: "#f5f5f7",
                    backgroundColor: "rgba(255,255,255,0.14)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.24)" },
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 18 }} />
                </Box>
              )}
            </Box>
            {q && (
              <Typography aria-live="polite" sx={{ mt: 2, color: "rgba(245,245,247,0.55)", fontSize: "0.95rem" }}>
                {resultCount === 0
                  ? "No results"
                  : `${resultCount} result${resultCount === 1 ? "" : "s"}`}
              </Typography>
            )}
          </Container>
        </Box>

        {/* Browse by Service (hidden while searching) */}
        {!q && (
          <Box component="section" aria-labelledby="browse-heading" sx={{ pb: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
              <Typography
                id="browse-heading"
                component="h2"
                sx={{
                  color: "#f5f5f7",
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                  letterSpacing: "-0.025em",
                  textAlign: "center",
                  mb: { xs: 3, md: 5 },
                }}
              >
                Browse by Service
              </Typography>
              <Box
                component="nav"
                aria-label="Support topics"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))", // 9 topics → exact 3×3 at every size
                  gap: { xs: 1.25, md: 2 },
                }}
              >
                {faqSections.map(({ anchor, title, Icon, questions }) => (
                  <Box
                    key={anchor}
                    component="a"
                    href={`#${anchor}`}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      gap: 1.25,
                      minHeight: { xs: 118, md: 150 },
                      px: { xs: 1, md: 2 },
                      py: { xs: 2, md: 2.5 },
                      borderRadius: { xs: "20px", md: "24px" },
                      textDecoration: "none",
                      color: "#f5f5f7",
                      backgroundColor: "rgba(255,255,255,0.045)",
                      transition: `background-color .3s ${EASE}`,
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                      "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 3 },
                    }}
                  >
                    <Icon aria-hidden="true" sx={{ fontSize: { xs: 28, md: 36 }, color: ACCENT }} />
                    <Box component="span" sx={{ fontWeight: 600, fontSize: { xs: "0.82rem", sm: "0.95rem", md: "1.05rem" }, lineHeight: 1.25, overflowWrap: "anywhere" }}>
                      {title}
                    </Box>
                    <Box component="span" sx={{ color: "rgba(245,245,247,0.5)", fontSize: { xs: "0.72rem", md: "0.82rem" } }}>
                      {questions.length} {questions.length === 1 ? "article" : "articles"}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>
        )}

        {/* Frequently Asked Questions — every topic on the page */}
        <Box component="section" aria-labelledby="faq-heading" sx={{ pb: { xs: 10, md: 14 } }}>
          <Container maxWidth="md">
            {!q && (
              <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
                <Typography
                  id="faq-heading"
                  component="h2"
                  sx={{
                    color: "#f5f5f7",
                    fontWeight: 700,
                    fontSize: { xs: "1.8rem", md: "2.4rem" },
                    letterSpacing: "-0.025em",
                    mb: 1.5,
                  }}
                >
                  Frequently Asked Questions
                </Typography>
                <Typography sx={{ color: "rgba(245,245,247,0.62)", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.6 }}>
                  Find answers to common questions about our services. Can&apos;t find what you&apos;re looking
                  for? Contact our support team.
                </Typography>
              </Box>
            )}
            {q && <Box component="h2" id="faq-heading" sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Search results</Box>}

            {visibleSections.length === 0 && (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography sx={{ color: "#f5f5f7", fontWeight: 600, fontSize: "1.3rem", mb: 1 }}>
                  No matching questions
                </Typography>
                <Typography sx={{ color: "rgba(245,245,247,0.62)" }}>
                  Try different words, or contact our support team — we&apos;re happy to help.
                </Typography>
              </Box>
            )}

            {visibleSections.map((section) => (
              <Box
                key={section.anchor}
                component="section"
                id={section.anchor}
                aria-labelledby={`${section.anchor}-title`}
                // Leave room for the fixed top bar when jumping from a topic tile
                sx={{ scrollMarginTop: { xs: 88, md: 104 }, mb: { xs: 6, md: 8 } }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                  <section.Icon aria-hidden="true" sx={{ color: ACCENT, fontSize: 28 }} />
                  <Typography
                    id={`${section.anchor}-title`}
                    component="h3"
                    sx={{ color: "#f5f5f7", fontWeight: 700, fontSize: { xs: "1.4rem", md: "1.6rem" }, letterSpacing: "-0.02em" }}
                  >
                    {section.title}
                  </Typography>
                </Box>
                <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  {section.questions.map((item) => (
                    <QuestionRow key={item.id} q={item} forceOpen={Boolean(q)} />
                  ))}
                </Box>
              </Box>
            ))}
          </Container>
        </Box>

        <CallToAction />
        <Contact />
        <QuickLinks />
        <Footer />
      </Box>
    </>
  );
};

export default FAQ;
