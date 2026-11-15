// src/data/brandSeoContent.js
// Landing-page content for each /brands/:brand page that sits alongside the
// core brand data in brandData.js. Keyed by the same slug.
//
// Inline links: write [anchor text](/internal/path) inside a paragraph and it
// renders as a client-side link. Only use internal paths that exist in App.jsx.

export const brandSeoContent = {
  llumar: {
    manufacturerUrl: "https://www.llumar.com",
    showBadge: true,
    image: "/gallery/Tint Tek-85.webp",
    imageAlt: "LLumar nano-ceramic window film being installed at Tint Tek Plus in Garland, TX",
    warranty: {
      title: "Lifetime LLumar warranty",
      body: "Nationwide, transferable coverage against bubbling, peeling, and fading when installed by a certified dealer.",
    },
    heroPoints: [
      {
        title: "NFRC-Verified Heat Rejection",
        body: "Performance numbers backed by independent third-party testing — not marketing claims.",
      },
      {
        title: "Signal-Safe Nano-Ceramic",
        body: "No metal in the film, so GPS, phones, toll tags, and ADAS cameras keep working.",
      },
      {
        title: "Transferable Lifetime Warranty",
        body: "Coverage that stays with the vehicle if you sell it.",
      },
    ],
    seo: {
      eyebrow: "LLumar Certified Installer · Dallas–Fort Worth",
      heading: "Why DFW Drivers Choose LLumar Ceramic Window Tint",
      paragraphs: [
        "Window tint brands love to publish big heat-rejection numbers. LLumar is different because its performance data is verified by the independent National Fenestration Rating Council (NFRC), so the specs you compare are real. As a LLumar Certified Installer, Tint Tek Plus installs the full lineup for [vehicle window tinting](/services/vehicle-window-tinting), from CTX and IRX nano-ceramic films for daily drivers to nearly clear AIR 80 for windshield strips.",
        "Tesla and EV owners are some of our most frequent LLumar customers. Large glass roofs and rear windows let in a huge amount of heat, and LLumar's non-metallic films keep cabins cooler without interfering with cameras, Autopilot, or keyless entry. See how we tint the [Model Y](/tesla/model-y) and [Model 3](/tesla/model-3), or browse our full [Tesla window tinting](/services/tesla-window-tinting) service.",
        "LLumar isn't only for cars. The LLumar Vista line is what we use for [residential window tinting](/services/residential-window-tinting) and [commercial window film](/services/commercial-window-tinting) across DFW. Every automotive install is cut to Texas law — our [Texas window tint law guide](/texas-window-tint-laws) explains the legal limits for each window.",
      ],
      highlights: [
        {
          title: "Car & Truck Tint",
          body: "CTX and IRX nano-ceramic films for sedans, trucks, and SUVs.",
          to: "/services/vehicle-window-tinting",
          linkLabel: "Vehicle window tinting",
        },
        {
          title: "Tesla Glass Roofs",
          body: "IRX film for panoramic roofs where solar load is highest.",
          to: "/services/tesla-window-tinting",
          linkLabel: "Tesla tinting",
        },
        {
          title: "Homes & Offices",
          body: "LLumar Vista film for heat, glare, and UV control on buildings.",
          to: "/services/residential-window-tinting",
          linkLabel: "Residential film",
        },
      ],
    },
  },

  stek: {
    manufacturerUrl: "https://www.stek-usa.com",
    showBadge: false,
    image: "/ppf/ppf-service.webp",
    imageAlt: "STEK DynoShield paint protection film installed on a vehicle at Tint Tek Plus in Garland, TX",
    warranty: {
      title: "10-year STEK warranty",
      body: "Manufacturer coverage against yellowing, cracking, bubbling, and delamination when installed by an authorized dealer.",
    },
    heroPoints: [
      {
        title: "Self-Healing Topcoat",
        body: "Light scratches and swirl marks disappear with heat from the sun or warm water.",
      },
      {
        title: "Gloss or Matte Finishes",
        body: "DynoShield for gloss paint, DynoMatte for matte and satin finishes.",
      },
      {
        title: "10-Year Manufacturer Warranty",
        body: "One of the strongest paint protection film warranties in the industry.",
      },
    ],
    seo: {
      eyebrow: "Authorized STEK Installer · Dallas–Fort Worth",
      heading: "STEK Paint Protection Film for DFW Highways and New Vehicles",
      paragraphs: [
        "Every DFW driver knows the sound of a rock hitting the front of the car. Highways like US-75, I-635, and the Dallas North Tollway see constant construction and truck traffic, and the result is chipped bumpers, hoods, and mirrors. STEK [paint protection film](/services/vehicle-paint-protection) is a clear urethane layer that absorbs those impacts before they reach your paint — and its self-healing topcoat makes light swirls and scratches disappear with heat.",
        "We install STEK DynoShield on gloss paint and DynoMatte on matte and satin finishes, with coverage from a front-end package (bumper, hood, fenders, mirrors) up to full-body protection. Drivers who commute through construction-heavy areas like [Frisco](/locations/frisco) and [Plano](/locations/plano) often start with a front-end kit. For headlights, STEK's light protection film helps prevent lens yellowing — see our [headlight services](/services/headlight-services).",
        "For the best result, many customers pair STEK PPF with a [Gtechniq ceramic coating](/brands/gtechniq) on top for extra gloss and easier washing, and add [ExoShield windshield film](/brands/exoshield) to protect the glass. If your paint already has swirl marks, [paint correction](/services/vehicle-paint-correction) before PPF makes sure the film seals in a flawless finish.",
      ],
      highlights: [
        {
          title: "Front-End PPF",
          body: "Bumper, hood, fenders, and mirrors protected from highway rock chips.",
          to: "/services/vehicle-paint-protection",
          linkLabel: "PPF packages",
        },
        {
          title: "Paint Correction First",
          body: "Remove swirls before sealing your paint under film.",
          to: "/services/vehicle-paint-correction",
          linkLabel: "Paint correction",
        },
        {
          title: "Coating Over PPF",
          body: "Gtechniq on top of STEK for gloss and easy cleaning.",
          to: "/brands/gtechniq",
          linkLabel: "About Gtechniq",
        },
      ],
    },
  },

  gtechniq: {
    manufacturerUrl: "https://gtechniq.com",
    showBadge: false,
    image: "/ceramic/Tint Tek-111.webp",
    imageAlt: "Gtechniq ceramic coating being applied to a vehicle at Tint Tek Plus in Garland, TX",
    warranty: {
      title: "Up to 9-year Gtechniq warranty",
      body: "Crystal Serum Ultra carries a 9-year warranty when applied by an accredited installer.",
    },
    heroPoints: [
      {
        title: "Accredited Gtechniq Installer",
        body: "Trained and certified to apply Crystal Serum Ultra and honor extended warranties.",
      },
      {
        title: "Up to 9 Years of Protection",
        body: "Dual-layer chemistry that bonds to your paint for long-term gloss and UV resistance.",
      },
      {
        title: "Paint Correction Available",
        body: "We perfect the paint first so the coating locks in a flawless finish.",
      },
    ],
    seo: {
      eyebrow: "Accredited Gtechniq Installer · Dallas–Fort Worth",
      heading: "Professional Gtechniq Ceramic Coating for Texas Sun, Pollen, and Road Grime",
      paragraphs: [
        "North Texas is hard on paint. Intense summer UV fades and oxidizes clear coat, spring pollen and bird droppings etch the surface, and hard water leaves spots after every wash. A professional [ceramic coating](/services/ceramic-coating) creates a hard, slick layer that bonds to your paint and makes all of that easier to deal with. As an accredited Gtechniq installer, we apply Crystal Serum Ultra — the coating Gtechniq reserves for accredited installers — with EXO as a hydrophobic topcoat.",
        "A coating seals in whatever condition your paint is in, so preparation matters more than the coating itself. Most of our Gtechniq jobs start with [paint correction](/services/vehicle-paint-correction) to remove swirl marks and light scratches, followed by a full decontamination and panel wipe so the coating bonds properly. We can also apply Gtechniq C5 to your glass, so rain beads and rolls off the windshield at speed.",
        "Gtechniq works beautifully on its own or on top of [STEK paint protection film](/brands/stek), giving film-protected panels the same gloss and water beading as the rest of the car. It's a popular finishing step for owners of new vehicles and Teslas in [Allen](/locations/allen), [Murphy](/locations/murphy), and across DFW who want their car to stay showroom-clean with less effort.",
      ],
      highlights: [
        {
          title: "Crystal Serum Ultra",
          body: "Gtechniq's flagship professional coating with up to 9 years of protection.",
          to: "/services/ceramic-coating",
          linkLabel: "Ceramic coating",
        },
        {
          title: "Paint Correction",
          body: "Machine polishing to remove swirls before the coating goes on.",
          to: "/services/vehicle-paint-correction",
          linkLabel: "Paint correction",
        },
        {
          title: "Coating + PPF",
          body: "Combine with STEK film for impact protection and gloss.",
          to: "/brands/stek",
          linkLabel: "About STEK PPF",
        },
      ],
    },
  },

  exoshield: {
    manufacturerUrl: "https://exoshield.com",
    showBadge: false,
    image: "/windshield/windshield-service.webp",
    imageAlt: "ExoShield GT3 windshield protection film installed on a vehicle at Tint Tek Plus in Garland, TX",
    warranty: {
      title: "3-year ExoShield warranty",
      body: "Coverage against crazing, hazing, and delamination, with easy removal and replacement afterward.",
    },
    heroPoints: [
      {
        title: "Helps Prevent Rock Chips",
        body: "A clear film that absorbs highway rock strikes before they chip the glass.",
      },
      {
        title: "Optically Clear & ADAS-Safe",
        body: "No tint or distortion, and compatible with cameras, rain sensors, and radar.",
      },
      {
        title: "Costs Less Than a Replacement",
        body: "Far cheaper than replacing and recalibrating a modern sensor-equipped windshield.",
      },
    ],
    seo: {
      eyebrow: "ExoShield GT3 Installer · Dallas–Fort Worth",
      heading: "ExoShield Windshield Protection Film for DFW's Rock-Chip Highways",
      paragraphs: [
        "A cracked windshield used to be an inconvenience. Today, most windshields hold cameras and sensors for lane keeping and automatic braking, and replacing one often means recalibrating those systems too. ExoShield GT3 [windshield protection film](/services/windshield-protection-film) is an optically clear layer engineered specifically for laminated glass. It absorbs the impact energy from typical highway rock strikes and dramatically reduces the chance of a chip starting.",
        "It's especially popular with drivers who spend a lot of time behind trucks on long DFW commutes — think US-75 from [McKinney](/locations/mckinney) or the FM roads around [Wylie](/locations/wylie). Tesla owners love it too, since it's compatible with Autopilot cameras; see our [Tesla window tinting](/services/tesla-window-tinting) service to bundle it with tint.",
        "ExoShield pairs naturally with a full protection package: [STEK PPF](/brands/stek) on the front-end paint, [LLumar ceramic tint](/brands/llumar) on the side and rear glass, and ExoShield on the windshield. We can usually install all three in a single visit to our Garland shop.",
      ],
      highlights: [
        {
          title: "Windshield Film",
          body: "ExoShield GT3 for daily drivers, trucks, and EVs.",
          to: "/services/windshield-protection-film",
          linkLabel: "Windshield protection",
        },
        {
          title: "Tesla Windshields",
          body: "Camera-friendly protection for Model 3, Y, S, X, and Cybertruck.",
          to: "/tesla/cybertruck",
          linkLabel: "Cybertruck protection",
        },
        {
          title: "Full Front Protection",
          body: "Add STEK PPF to protect the paint around the glass.",
          to: "/services/vehicle-paint-protection",
          linkLabel: "Paint protection film",
        },
      ],
    },
  },
};
