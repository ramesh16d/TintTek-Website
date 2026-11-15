// src/data/citySeoContent.js
// Unique long-form SEO copy for each city landing page, rendered directly
// under the hero by <CitySEOContent />. Keyed by the same slug as cityData.js.
//
// Inline links: write [anchor text](/internal/path) inside a paragraph and it
// renders as a client-side link. Only use internal paths that exist in App.jsx.

export const citySeoContent = {
  plano: {
    eyebrow: "Plano Window Tint, PPF & Ceramic Coating",
    heading: "Professional Car Window Tinting for Plano Commuters and Corporate Campuses",
    paragraphs: [
      "Plano is home to some of North Texas's largest corporate campuses, and that means a lot of vehicles spending eight-plus hours a day in exposed surface lots around Legacy West, the Granite Park area, and the offices along the Dallas North Tollway. A car parked in direct Texas sun can see cabin temperatures climb well past 140°F by mid-afternoon. Our [vehicle window tinting](/services/vehicle-window-tinting) service uses LLumar nano-ceramic film that rejects infrared heat at the glass, so your steering wheel, leather seats, and dashboard stay noticeably cooler when you walk out of the office.",
      "Many Plano drivers also own a Tesla or another EV, where panoramic glass roofs let in a huge amount of solar load. We tint every model in the lineup — see our [Tesla window tinting](/services/tesla-window-tinting) options — using non-metallic films that won't interfere with cameras, keyless entry, or cellular connectivity. For newer luxury vehicles we often pair tint with [STEK paint protection film](/services/vehicle-paint-protection) on the front end, since the stop-and-go merges on US-75 and the President George Bush Turnpike throw a steady stream of gravel at bumpers and hoods.",
      "Every Plano installation is cut to Texas law, which requires at least 25% visible light transmission on the front side windows. Not sure what shade to pick? Our guide to [Texas window tint laws](/texas-window-tint-laws) explains every window, or we can walk you through samples at the shop. Most Plano customers drop off in the morning and have their vehicle back the same day.",
    ],
    highlights: [
      {
        title: "Office-Lot Heat Control",
        body: "Nano-ceramic film keeps cabins cooler for cars parked all day at Legacy West and Plano's corporate campuses.",
        to: "/brands/llumar",
        linkLabel: "Explore LLumar films",
      },
      {
        title: "EV & Tesla Specialists",
        body: "Signal-safe tint for panoramic roofs, Model Y rear glass, and ADAS camera zones.",
        to: "/tesla/model-y",
        linkLabel: "See Model Y tint",
      },
      {
        title: "Front-End PPF for US-75",
        body: "Self-healing STEK film absorbs rock chips from Plano's busiest highway merges.",
        to: "/services/vehicle-paint-protection",
        linkLabel: "View PPF packages",
      },
    ],
  },

  frisco: {
    eyebrow: "Frisco New-Vehicle & New-Home Protection",
    heading: "Paint Protection Film and Ceramic Tint Built for Frisco's New Construction Zones",
    paragraphs: [
      "Frisco keeps building — new roads, new master-planned communities, and new retail around The Star and the PGA District. For drivers, that growth comes with a cost: gravel trucks, unfinished lanes, and loose debris on Eldorado Parkway, Panther Creek Parkway, and the Sam Rayburn Tollway. If you just drove a new car off the lot, [paint protection film](/services/vehicle-paint-protection) is the single best way to keep that factory finish chip-free. We install STEK DynoShield, a self-healing urethane film that makes light swirls and scuffs disappear with heat from the sun.",
      "Frisco's newer neighborhoods also tend to have large, west-facing windows that turn living rooms and home offices into greenhouses by late afternoon. Our [residential window tinting](/services/residential-window-tinting) reduces glare on TVs and monitors, blocks 99% of UV rays that fade hardwood floors and furniture, and lowers the load on your AC — without changing how your home looks from the street.",
      "For the vehicles themselves, we recommend LLumar ceramic tint paired with a [Gtechniq ceramic coating](/services/ceramic-coating) on top of PPF for full protection. It's a popular combination for Frisco owners of performance cars and SUVs who want their vehicles to look new for years, not months.",
    ],
    highlights: [
      {
        title: "New-Car PPF Packages",
        body: "Protect bumpers, hoods, and mirrors from Frisco's construction-zone gravel from day one.",
        to: "/brands/stek",
        linkLabel: "About STEK PPF",
      },
      {
        title: "Home Window Film",
        body: "Cut heat and glare in new-build homes with big west-facing windows.",
        to: "/services/residential-window-tinting",
        linkLabel: "Residential tinting",
      },
      {
        title: "Ceramic Coating Over PPF",
        body: "Gtechniq adds gloss, water beading, and easier washes on top of your film.",
        to: "/brands/gtechniq",
        linkLabel: "About Gtechniq",
      },
    ],
  },

  richardson: {
    eyebrow: "Signal-Safe Tint for Richardson",
    heading: "Non-Metallic Ceramic Window Film for Richardson's Tech Corridor and Established Neighborhoods",
    paragraphs: [
      "Richardson's Telecom Corridor, CityLine, and the area around UT Dallas are full of drivers who depend on their phones, navigation, and driver-assistance systems working perfectly. Older metallic tints can weaken cellular, GPS, and toll-tag signals. That's why our [vehicle window tinting](/services/vehicle-window-tinting) in Richardson uses only non-metallic LLumar ceramic films — they reject heat with ceramic particles instead of metal, so nothing gets blocked.",
      "Richardson also has many established neighborhoods like Canyon Creek and Cottonwood Heights, where homes often have original single-pane or large picture windows. Adding [residential window film](/services/residential-window-tinting) is a cost-effective way to cut summer heat gain and UV fading without replacing the windows. For businesses along Campbell Road and the Central Expressway frontage, we also offer [commercial window tinting](/services/commercial-window-tinting) for offices and storefronts.",
      "Because we're only about 10 miles from central Richardson, many customers drop their vehicle off on the way to work and pick it up the same afternoon. If your headlights have yellowed from years in the Texas sun, ask about [headlight restoration and protection](/services/headlight-services) while your car is in the shop.",
    ],
    highlights: [
      {
        title: "No Signal Interference",
        body: "Ceramic, not metal — your phone, GPS, TxTag, and ADAS sensors keep working perfectly.",
        to: "/brands/llumar",
        linkLabel: "Why LLumar ceramic",
      },
      {
        title: "Film for Older Homes",
        body: "Reduce heat through the original windows in Canyon Creek and Cottonwood Heights homes.",
        to: "/services/residential-window-tinting",
        linkLabel: "Home window film",
      },
      {
        title: "Office & Storefront Film",
        body: "Solar control and privacy for Richardson businesses and tech offices.",
        to: "/services/commercial-window-tinting",
        linkLabel: "Commercial tinting",
      },
    ],
  },

  mesquite: {
    eyebrow: "Truck & SUV Tinting Near Mesquite",
    heading: "Affordable Ceramic Tint for Mesquite Trucks, SUVs, and Daily Drivers",
    paragraphs: [
      "Mesquite drivers put a lot of miles on trucks and full-size SUVs, and those vehicles have more glass — and more interior to bake — than a typical sedan. Our [vehicle window tinting](/services/vehicle-window-tinting) for Mesquite customers covers everything from crew-cab pickups to three-row SUVs, with LLumar ceramic film that keeps the cabin cooler on long, sun-exposed stretches of US-80, I-30, and Gus Thomasson Road.",
      "Because many Mesquite vehicles are daily workhorses, we also see a lot of cloudy, yellowed headlights that reduce nighttime visibility. Our [headlight restoration service](/services/headlight-services) brings the lenses back to clear and seals them with protective film so they don't oxidize again. For anyone driving through the I-635 and I-30 construction zones every day, a front-end [paint protection film](/services/vehicle-paint-protection) kit is a smart way to stop rock chips before they turn into rust spots.",
      "Our Garland shop is only about 8 miles from Town East and central Mesquite, so it's an easy trip for a same-day appointment. Every tint job is installed to Texas legal limits — read our [Texas tint law guide](/texas-window-tint-laws) if you're deciding between shades for your front windows.",
    ],
    highlights: [
      {
        title: "Built for Big Glass",
        body: "Full tint packages for pickups, work trucks, and three-row SUVs.",
        to: "/services/vehicle-window-tinting",
        linkLabel: "Vehicle tint options",
      },
      {
        title: "Headlight Restoration",
        body: "Restore cloudy lenses and protect them from the Texas sun.",
        to: "/services/headlight-services",
        linkLabel: "Headlight services",
      },
      {
        title: "Chip Protection for I-635",
        body: "PPF on the bumper and hood shields paint in the LBJ and I-30 work zones.",
        to: "/services/vehicle-paint-protection",
        linkLabel: "Paint protection film",
      },
    ],
  },

  rowlett: {
    eyebrow: "Lakeside Glare & UV Protection in Rowlett",
    heading: "Window Tinting for Rowlett Drivers and Homes Along Lake Ray Hubbard",
    paragraphs: [
      "Living near Lake Ray Hubbard means beautiful views — and a lot of reflected sunlight. Glare off the water hits drivers crossing the I-30 bridge and heading down Lakeview Parkway at sunrise and sunset, and that reflected light also adds to UV exposure inside your vehicle. LLumar ceramic [car window tint](/services/vehicle-window-tinting) cuts glare, blocks 99% of UV rays, and keeps your cabin comfortable whether you're commuting or towing a boat to the marina.",
      "Rowlett waterfront and lake-view homes face the same problem through their windows. Large rear windows facing the lake can heat up a room quickly and fade furniture and flooring. Our [residential window tinting](/services/residential-window-tinting) keeps the view clear while reducing heat, glare, and UV damage — an easy upgrade for Rowlett homeowners who want to enjoy the lake without the afternoon heat.",
      "For trucks and SUVs that do double duty as tow vehicles, we recommend adding [paint protection film](/services/vehicle-paint-protection) to the front end and a [Gtechniq ceramic coating](/services/ceramic-coating) to make washing off lake grime and road film much easier. Our Garland shop is about 12 miles from Rowlett via I-30 or the George Bush Turnpike.",
    ],
    highlights: [
      {
        title: "Lake Glare Reduction",
        body: "Ceramic tint softens reflected glare on the I-30 bridge and Lakeview Parkway.",
        to: "/services/vehicle-window-tinting",
        linkLabel: "Car window tinting",
      },
      {
        title: "Lake-View Home Film",
        body: "Keep the view and lose the heat on large, lake-facing windows.",
        to: "/services/residential-window-tinting",
        linkLabel: "Residential film",
      },
      {
        title: "Tow-Vehicle Protection",
        body: "Ceramic coating and PPF for trucks that haul boats and see heavy road grime.",
        to: "/services/ceramic-coating",
        linkLabel: "Ceramic coating",
      },
    ],
  },

  sachse: {
    eyebrow: "Family Vehicle Tinting in Sachse",
    heading: "UV-Blocking Window Tint for Sachse Families, Carpools, and School Runs",
    paragraphs: [
      "Sachse is a family town, and a lot of driving here happens with kids in the back seat — school drop-offs, practices, and weekend trips down SH-78 or the George Bush Turnpike. Rear passengers often sit in direct sun with no way to escape it. Our [vehicle window tinting](/services/vehicle-window-tinting) uses LLumar films that block 99% of UV rays and reject much of the sun's infrared heat, so car seats and buckles don't get dangerously hot and kids stay more comfortable on the ride home.",
      "Texas law allows any darkness on rear side windows and the back glass (with two outside mirrors), so many Sachse families choose a darker rear shade for privacy and heat and a legal 25% or lighter on the front doors. Our [Texas window tint laws](/texas-window-tint-laws) page breaks it all down. Minivans and three-row SUVs are some of our most common Sachse installs.",
      "Sachse homes with west-facing back yards and large windows can benefit from [residential window film](/services/residential-window-tinting) too, especially in kids' rooms and play areas that heat up in the afternoon. We're about 8 miles from Sachse, making us one of the closest premium tint shops for same-day service.",
    ],
    highlights: [
      {
        title: "Back-Seat UV Protection",
        body: "99% UV blocking where kids sit, plus cooler car seats and buckles.",
        to: "/services/vehicle-window-tinting",
        linkLabel: "Family car tinting",
      },
      {
        title: "Legal Shade Guidance",
        body: "Darker in the back, 25% or lighter in the front — we'll help you choose.",
        to: "/texas-window-tint-laws",
        linkLabel: "Texas tint laws",
      },
      {
        title: "Kids' Rooms & Play Areas",
        body: "Home window film to cool down west-facing rooms in Sachse homes.",
        to: "/services/residential-window-tinting",
        linkLabel: "Residential tinting",
      },
    ],
  },

  wylie: {
    eyebrow: "Windshield & Paint Protection for Wylie Roads",
    heading: "Protecting Wylie Vehicles on FM 544, SH-78, and the Roads Around Lake Lavon",
    paragraphs: [
      "Wylie sits where suburban growth meets open Collin County roads. Drivers heading out on FM 544, SH-78, FM 1378, or toward Lake Lavon share the road with gravel trucks, farm equipment, and construction traffic — the perfect conditions for cracked windshields and chipped paint. That's why many Wylie customers pair window tint with [windshield protection film](/services/windshield-protection-film). ExoShield is a clear film that absorbs rock impacts before they turn into chips and cracks, helping you avoid an expensive windshield replacement.",
      "For paint, a front-end [paint protection film](/services/vehicle-paint-protection) package covers the bumper, hood, fenders, and mirrors — the areas that take the most hits on FM roads. Inside the vehicle, LLumar ceramic [window tinting](/services/vehicle-window-tinting) keeps the cabin cool through long Wylie summers and protects the interior from sun damage.",
      "Wylie is about 18 miles from our Garland shop by SH-78. We know that's a drive, so we schedule Wylie appointments to minimize your wait. Most tint jobs are done within a few hours, and combined packages can often be completed in a single visit.",
    ],
    highlights: [
      {
        title: "ExoShield Windshield Film",
        body: "Clear protection against the rock strikes common on Wylie's FM roads.",
        to: "/brands/exoshield",
        linkLabel: "About ExoShield",
      },
      {
        title: "Full-Front PPF",
        body: "Bumper, hood, fenders, and mirrors covered against gravel and debris.",
        to: "/services/vehicle-paint-protection",
        linkLabel: "PPF coverage",
      },
      {
        title: "One-Visit Packages",
        body: "Tint, windshield film, and PPF scheduled together to save you trips.",
        to: "/services/windshield-protection-film",
        linkLabel: "Windshield film",
      },
    ],
  },

  murphy: {
    eyebrow: "Complete Vehicle Protection in Murphy",
    heading: "Ceramic Tint, PPF, and Ceramic Coating Packages for Murphy, TX Drivers",
    paragraphs: [
      "Murphy is a small city with a lot of well-kept vehicles in the driveways of neighborhoods like Maxwell Creek and Heritage Ranch. Owners here usually aren't looking for the cheapest tint — they want protection that lasts. Our most popular Murphy package combines three layers: LLumar ceramic [window tinting](/services/vehicle-window-tinting) on the glass, STEK [paint protection film](/services/vehicle-paint-protection) on high-impact panels, and a [Gtechniq ceramic coating](/services/ceramic-coating) over the whole exterior.",
      "Each layer does a different job. Tint controls heat and UV inside the cabin. PPF physically absorbs rock chips and scratches. Ceramic coating adds deep gloss and makes dirt, pollen, and bird droppings rinse off easily — helpful during North Texas spring pollen season. If your paint already has swirls or light scratches, we recommend [paint correction](/services/vehicle-paint-correction) first so the coating locks in a clean, glossy finish.",
      "Murphy residents can reach our Garland shop in about 20 minutes via SH-78 or FM 544 to the George Bush Turnpike. Every LLumar tint installation includes a lifetime warranty against bubbling, peeling, and fading.",
    ],
    highlights: [
      {
        title: "Three-Layer Protection",
        body: "Tint on the glass, PPF on the paint, and ceramic coating over everything.",
        to: "/services/ceramic-coating",
        linkLabel: "Ceramic coating",
      },
      {
        title: "Paint Correction First",
        body: "Remove swirls and light scratches before sealing the finish.",
        to: "/services/vehicle-paint-correction",
        linkLabel: "Paint correction",
      },
      {
        title: "Lifetime Tint Warranty",
        body: "LLumar installs are covered against bubbling, peeling, and fading.",
        to: "/brands/llumar",
        linkLabel: "LLumar warranty",
      },
    ],
  },

  allen: {
    eyebrow: "Allen Luxury & EV Window Tinting",
    heading: "Precision Window Tint and Paint Protection for Allen's Luxury Cars and EVs",
    paragraphs: [
      "Allen drivers spend plenty of time in open parking lots at Allen Premium Outlets, Watters Creek, and the Credit Union of Texas Event Center, then face the US-75 commute in full sun. LLumar ceramic [window tinting](/services/vehicle-window-tinting) is the most effective way to keep those cabins cool and protect leather and screens from UV damage. We use nano-ceramic films that look clean and factory-like, never purple or mirrored.",
      "Allen also has a large number of Teslas and other EVs, which have tricky glass — large rear windows, glass roofs, and camera zones that need careful work. We cover every model, including the [Model 3](/tesla/model-3) and [Model Y](/tesla/model-y), with signal-safe ceramic film. For newer luxury vehicles, we often recommend [paint correction](/services/vehicle-paint-correction) followed by [ceramic coating](/services/ceramic-coating) to bring out a deep, mirror-like finish that's easier to keep clean.",
      "Allen is about 20 miles north of our Garland shop via US-75. Most full-vehicle tint jobs take 2–4 hours, so you can drop off in the morning and be back on the road by early afternoon.",
    ],
    highlights: [
      {
        title: "Factory-Look Ceramic Tint",
        body: "Clean, neutral shades — no purple fading or mirror finish.",
        to: "/brands/llumar",
        linkLabel: "LLumar films",
      },
      {
        title: "Tesla Model 3 & Y",
        body: "Glass roof, rear window, and camera-zone tint done the right way.",
        to: "/services/tesla-window-tinting",
        linkLabel: "Tesla tinting",
      },
      {
        title: "Correction + Coating",
        body: "Restore and seal your paint for a deep, easy-to-clean shine.",
        to: "/services/vehicle-paint-correction",
        linkLabel: "Paint correction",
      },
    ],
  },

  mckinney: {
    eyebrow: "McKinney Window Tinting Worth the Drive",
    heading: "Premium Tint, Windshield Film, and Home Window Film for McKinney, TX",
    paragraphs: [
      "McKinney drivers who commute south on US-75 or across SH-121 and SH-380 log a lot of highway miles, and every one of them is a chance for a rock to hit the windshield. Replacing modern windshields — especially ones with lane-keeping cameras that need recalibration — can be expensive. That's why ExoShield [windshield protection film](/services/windshield-protection-film) is one of our most requested services for McKinney customers, often installed alongside LLumar ceramic [window tinting](/services/vehicle-window-tinting).",
      "McKinney also has a wide range of homes, from historic houses near the downtown square to newer builds in Craig Ranch, Stonebridge Ranch, and Trinity Falls. Older homes often have original windows that let in a lot of heat, while new builds tend to have large, unshaded glass. In both cases, [residential window tinting](/services/residential-window-tinting) reduces heat, glare, and UV fading while keeping the look of your home unchanged.",
      "At about 30 miles away, McKinney is one of our longer trips, so we make it worth it: we can usually combine tint, windshield film, and [paint protection film](/services/vehicle-paint-protection) in a single visit. Call ahead and we'll plan the day so your vehicle is ready when you return.",
    ],
    highlights: [
      {
        title: "Windshield Chip Prevention",
        body: "ExoShield protects camera-equipped windshields on long US-75 commutes.",
        to: "/services/windshield-protection-film",
        linkLabel: "Windshield film",
      },
      {
        title: "Historic & New Homes",
        body: "Home window film for downtown homes and new Craig Ranch builds alike.",
        to: "/services/residential-window-tinting",
        linkLabel: "Residential film",
      },
      {
        title: "Single-Visit Scheduling",
        body: "Tint, windshield film, and PPF combined to make the trip worth it.",
        to: "/services/vehicle-paint-protection",
        linkLabel: "PPF packages",
      },
    ],
  },

  carrollton: {
    eyebrow: "Commercial & Fleet Tinting for Carrollton",
    heading: "Window Tinting for Carrollton Businesses, Fleet Vehicles, and I-35E Commuters",
    paragraphs: [
      "Carrollton is one of the most business-dense cities in the northern suburbs, with warehouses, showrooms, and small businesses along I-35E, Belt Line Road, and Old Denton Road. Sunlight through storefront glass can heat up a showroom, fade merchandise, and create glare on screens. Our [commercial window tinting](/services/commercial-window-tinting) provides solar control, privacy, and a cleaner look for Carrollton offices, retail stores, and restaurants — with free on-site estimates.",
      "Many Carrollton businesses also run service vans, pickups, or company cars. Tinting fleet vehicles keeps drivers cooler, protects tools and equipment from view, and reduces interior wear. We tint everything from single vehicles to multi-vehicle fleets using LLumar ceramic [vehicle window film](/services/vehicle-window-tinting), installed to Texas legal limits.",
      "For personal vehicles, Carrollton's location where I-35E, I-635, and the Dallas North Tollway meet means a lot of high-speed debris. A front-end [paint protection film](/services/vehicle-paint-protection) package keeps the bumper and hood free of chips. Our Garland shop is about 25 miles away via I-635 East.",
    ],
    highlights: [
      {
        title: "Storefront & Office Film",
        body: "Cut heat, glare, and fading in Carrollton showrooms and offices.",
        to: "/services/commercial-window-tinting",
        linkLabel: "Commercial tinting",
      },
      {
        title: "Fleet Vehicle Tinting",
        body: "Cooler cabins and hidden equipment for vans, trucks, and company cars.",
        to: "/services/vehicle-window-tinting",
        linkLabel: "Vehicle tint",
      },
      {
        title: "Highway Chip Protection",
        body: "PPF for drivers on I-35E, I-635, and the Dallas North Tollway.",
        to: "/services/vehicle-paint-protection",
        linkLabel: "Paint protection",
      },
    ],
  },

  addison: {
    eyebrow: "Addison Restaurant, Office & Vehicle Tinting",
    heading: "Commercial Window Film and Car Tint for Addison's Restaurants, Offices, and Residents",
    paragraphs: [
      "Addison packs a remarkable number of restaurants, offices, and apartments into a small area — from Addison Circle and Vitruvian Park to the restaurant row along Belt Line Road. Many of these buildings have floor-to-ceiling glass facing the afternoon sun. [Commercial window tinting](/services/commercial-window-tinting) reduces heat gain and glare for diners and office workers, cuts cooling costs, and protects interiors from UV fading, all while keeping the view outside.",
      "Addison residents and workers also tend to park in open lots or uncovered garage levels for long stretches. LLumar ceramic [car window tinting](/services/vehicle-window-tinting) blocks 99% of UV rays and much of the sun's heat, so your interior doesn't bake while you're at work or out to dinner. A [ceramic coating](/services/ceramic-coating) adds another layer of protection to paint that sits in the sun all day.",
      "If you live in an Addison apartment or townhome with large, sun-facing windows, ask us about [residential window film](/services/residential-window-tinting) as well. Our Garland shop is about 22 miles from Addison via the George Bush Turnpike or LBJ Freeway, and we offer free estimates for commercial projects throughout the Addison area.",
    ],
    highlights: [
      {
        title: "Restaurant & Office Glass",
        body: "Solar film for Belt Line restaurants and Addison office buildings.",
        to: "/services/commercial-window-tinting",
        linkLabel: "Commercial tinting",
      },
      {
        title: "All-Day Parking Protection",
        body: "Ceramic tint and coating for cars parked in open lots for hours.",
        to: "/services/vehicle-window-tinting",
        linkLabel: "Car window tint",
      },
      {
        title: "Apartment & Townhome Film",
        body: "Reduce heat and glare on large Addison residential windows.",
        to: "/services/residential-window-tinting",
        linkLabel: "Residential film",
      },
    ],
  },
};
