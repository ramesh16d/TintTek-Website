import React from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import Footer from "./key-components/Footer";
import Contact from "./SubContact";
import CallToAction from "./SubCTA";
import QuickLinks from "./SubQuickLinks";
import SEO from "./SEO";

const PrivacyPolicy = () => {
  // ✅ Updated Privacy Policy Data Structure
  const policySections = [
    {
      title: "Online Privacy Policy Agreement",
      content: [
        "At Tint Tek +, we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect any information you provide while using our website.",
        [
          "1. What personally identifiable information is collected from you through our website;",
          "2. Why we collect personally identifiable information and the legal basis for such collection;",
          "3. How we use the collected information and with whom it may be shared;",
          "4. What choices are available to you regarding the use of your data; and",
          "5. The security procedures in place to protect the misuse of your information.",
        ],
      ],
    },
    {
      title: "Information We Collect",
      content: [
        "It is always up to you whether to disclose personally identifiable information to us, although if you elect not to do so, we reserve the right not to register you as a user or provide you with any products or services.",
        [
          "1. Name",
          "2. Contact Information (email, and phone number)",
          "3. City Location",
          "4. Website usage data",
        ]
      ],
    },
    {
      title: "Why We Collect Information",
      content: [
        "We use the information you provide to:",
        [
          "Respond to inquiries and schedule appointments",
          "Send updates or important service-related messages",
          "Understand and improve our website and services",
        ],
      ],
    },
    {
      title: "Use of Collected Information",
      content: [
        "Tint Tek Plus LLC does not now, nor will it in the future, sell, rent or lease any of its customer lists and/or names to any third parties.",
        "Tint Tek Plus LLC may collect and may make use of personal information to assist in the operation of our website and to ensure delivery of the services you need and request. At times, we may find it necessary to use personally identifiable information as a means to keep you informed of other possible products and/or services that may be available to you from www.tinttekplus.com",
        "Tint Tek Plus LLC may also be in contact with you with regards to completing surveys and/or research questionnaires related to your opinion of current or potential future services that may be offered.",
      ],
    },
    {
      title: "Disclosure of Information",
      content: [
        "Tint Tek Plus LLC may not use or disclose the information provided by you except under the following circumstances:",
        [
          "As necessary to provide services or products you have ordered",
          "In other ways described in this Policy or to which you have otherwise consented",
          "In the aggregate with other information in such a way so that your identity cannot reasonably be determined",
          "As required by law, or in response to a subpoena or search warrant",
          "To outside auditors who have agreed to keep the information confidential",
          "As necessary to enforce the Terms of Service",
          "As necessary to maintain, safeguard and preserve all the rights and property of Tint Tek Plus LLC.",
          "SMS Consent will not be shared, sold, or disclosed with any third party or any other individual."
        ]
      ]
    },
    {
      title: "Non-Marketing Purposes",
      content: [
        "Tint Tek Plus LLC greatly respects your privacy. We do maintain and reserve the right to contact you if needed for non-marketing purposes (such as bug alerts, security breaches, account issues, and/or changes in Tint Tek Plus LLC products and services). In certain circumstances, we may use our website, newspapers, or other public means to post a notice.",
      ],
    },
    {
      title: "Children Under The Age of 13",
      content: [
        "Tint Tek Plus LLC's website is not directed to, and does not knowingly collect personal identifiable information from, children under the age of thirteen (13). If it is determined that such information has been inadvertently collected on anyone under the age of thirteen (13), we shall immediately take the necessary steps to ensure that such information is deleted from our system's database, or in the alternative, that verifiable parental consent is obtained for the use and storage of such information. Anyone under the age of thirteen (13) must seek and obtain parent or guardian permission to use this website.",
      ],
    },
    {
      title: "Unsubscribe or Opt-Out",
      content: [
        "All users and visitors to our website have the option to discontinue receiving communications from us by way of email or newsletters. To discontinue or unsubscribe from our website please send an email that you wish to unsubscribe to info@tinttekplus.com. If you wish to unsubscribe or opt-out from any third-party websites, you must go to that specific website to unsubscribe or opt-out. Tint Tek Plus LLC will continue to adhere to this Policy with respect to any personal information previously collected.",
      ],
    },
    {
      title: "Links to Other Websites",
      content: [
        "Our website does contain links to affiliate and other websites. Tint Tek Plus LLC does not claim nor accept responsibility for any privacy policies, practices and/or procedures of other such websites. Therefore, we encourage all users and visitors to be aware when they leave our website and to read the privacy statements of every website that collects personally identifiable information. This Privacy Policy Agreement applies only and solely to the information collected by our website.",
      ],
    },
    {
      title: "Notice to European Union Users",
      content: [
        "Tint Tek Plus LLC's operations are located primarily in the United States. If you provide information to us, the information will be transferred out of the European Union (EU) and sent to the United States. (The adequacy decision on the EU-US Privacy became operational on August 1, 2016. This framework protects the fundamental rights of anyone in the EU whose personal data is transferred to the United States for commercial purposes. It allows the free transfer of data to companies that are certified in the US under the Privacy Shield.) By providing personal information to us, you are consenting to its storage and use as described in this Policy.",
      ],
    },
    {
      title: "Security",
      content: [
        'Tint Tek Plus LLC takes precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline. Wherever we collect sensitive information (e.g. credit card information), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https" at the beginning of the address of the webpage.',
        "While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers and servers in which we store personally identifiable information are kept in a secure environment. This is all done to prevent any loss, misuse, unauthorized access, disclosure or modification of the user's personal information under our control."
      ],
    },
    {
      title: "Acceptance of Terms",
      content: [
        "Our website does contain links to affiliate and other websites. Tint Tek Plus LLC does not claim nor accept responsibility for any privacy policies, practices and/or procedures of other such websites. Therefore, we encourage all users and visitors to be aware when they leave our website and to read the privacy statements of every website that collects personally identifiable information. This Privacy Policy Agreement applies only and solely to the information collected by our website.",
      ],
    },
    {
      title: "How to Contact Us",
      content: [
        "If you have any questions or concerns regarding the Privacy Policy Agreement related to our website, please feel free to contact us at the following email, telephone number or mailing address.",
        [
          "Email: info@tinttekplus.com",
          "Telephone Number: +1 (972) 362-8468",
          "Mailing Address: Tint Tek Plus 2518 West Kingsley Rd, Garland, TX 75041",
        ]
      ]
    },
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
          background: `
          radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
          radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
          linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white", // White text throughout
      }}
    >
      <SEO
        title="Privacy Policy | Tint Tek Plus"
        description="Read the Tint Tek Plus privacy policy, including how information is collected, used, and protected."
        canonical="https://tinttekplus.com/privacy-policy"
      />
       {/* Hero */}
           <Box
              sx={{
               position: "relative",
               width: "100%",
               height: { xs: "50vh", md: "60vh" },
               overflow: "hidden",
               background: "transparent",
             }}
             aria-label="Tint Tek Plus project gallery"
           >
             {/* Background Pattern */}
             {/* <Box
               sx={{
                 position: "absolute",
                 inset: 0,
                 opacity: 0.1,
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               }}
             /> */}
             {/* Animated Gradient Overlay */}
             {/* <Box
               sx={{
                 position: "absolute",
                 inset: 0,
                 background:
                   "linear-gradient(135deg, rgba(39, 148, 210, 0.2) 0%, rgba(35, 10, 89, 0.2) 100%)",
                 animation: "gradientShift 10s ease infinite",
                 "@keyframes gradientShift": {
                   "0%": { opacity: 0.4 },
                   "50%": { opacity: 0.7 },
                   "100%": { opacity: 0.4 },
                 },
               }}
             /> */}
     
             {/* Content */}
             <Container
               maxWidth="lg"
               sx={{
                 position: "relative",
                 height: "100%",
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center",
                 zIndex: 2,
               }}
             >
               <Box
                 sx={{
                   maxWidth: { xs: "100%", md: "70%" },
                   animation: "fadeInUp 1s ease-out",
                   "@keyframes fadeInUp": {
                     "0%": { opacity: 0, transform: "translateY(20px)" },
                     "100%": { opacity: 1, transform: "translateY(0)" },
                   },
                 }}
               >
                 <Typography
                   variant="overline"
                   sx={{
                     color: "#2794d2",
                     fontWeight: 600,
                     letterSpacing: 2,
                     mb: 1,
                     display: "block",
                   }}
                 >
                   TINT TEK + PRIVACY
                 </Typography>
     
                 <Typography
                   variant="h2"
                   component="h1"
                   sx={{
                     fontWeight: 800,
                     color: "#fff",
                     mb: 2,
                     fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3.5rem" },
                     lineHeight: 1.1,
                   }}
                 >
                   Privacy Policy
                 </Typography>
                      <Box
                     sx={{
                       mt: 5,
                       width: { xs: 120, sm: 120 },
                       height: 5,
                       borderRadius: 999,
                       background:
                         "linear-gradient(90deg, #1e90ff 0%, #2794d2 50%, #1e90ff 100%)",
                       boxShadow: "0 0 16px rgba(39,148,210,0.35)",
                     }}
                   />
               </Box>
             </Container>
           </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingY: "40px",
          color: "#fff",
          overflowY: "auto",
        }}
      >
        <Typography variant="subtitle1" sx={{ opacity: 0.7, marginBottom: 2 }}>
          Last Updated: September 4, 2024
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: "white" }} />

        {/* ✅ Map Through Sections */}
        {policySections.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            {/* Section Title */}
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
              {section.title}
            </Typography>

            {/* ✅ Iterate over content: Paragraphs & Lists */}
            {section.content.map((item, pIndex) =>
              Array.isArray(item) ? (
                // ✅ Render Numbered List
                <Box key={pIndex} component="ul" sx={{ pl: 3, mt: 1 }}>
                  {item.map((listItem, listIndex) => (
                    <Typography
                      key={listIndex}
                      component="li"
                      sx={{ lineHeight: 1.6, opacity: 0.9 }}
                    >
                      {listItem}
                    </Typography>
                  ))}
                </Box>
              ) : (
                // ✅ Render Normal Paragraph
                <Typography
                  key={pIndex}
                  paragraph
                  sx={{ lineHeight: 1.6, opacity: 0.9 }}
                >
                  {item}
                </Typography>
              )
            )}
          </Box>
        ))}
      </Container>

      <Box sx={{ width: "100%" }}>
        <CallToAction />
      </Box>

      <Contact />
      <QuickLinks />

      <Box sx={{ width: "100%" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
