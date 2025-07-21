// Mock restaurant data with real coordinates for distance calculation
const mockRestaurants = [
    // Houston (50+ Acclaimed Restaurants)
    {
        name: "The Original Ninfa's",
        cuisine: "mexican",
        rating: 4.3,
        address: "2704 Navigation Blvd, Houston, TX 77003",
        lat: 29.7604,
        lng: -95.3698,
        city: "Houston",
        state: "TX",
        zipcode: "77003"
    },
    {
        name: "Uchi",
        cuisine: "japanese",
        rating: 4.8,
        address: "904 Westheimer Rd, Houston, TX 77006",
        lat: 29.7399,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Hugo's",
        cuisine: "mexican",
        rating: 4.7,
        address: "1600 Westheimer Rd, Houston, TX 77006",
        lat: 29.7407,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "State of Grace",
        cuisine: "american",
        rating: 4.6,
        address: "3258 Westheimer Rd, Houston, TX 77027",
        lat: 29.7399,
        lng: -95.4194,
        city: "Houston",
        state: "TX",
        zipcode: "77027"
    },
    {
        name: "Oxheart",
        cuisine: "american",
        rating: 4.8,
        address: "1302 Nance St, Houston, TX 77002",
        lat: 29.7520,
        lng: -95.3598,
        city: "Houston",
        state: "TX",
        zipcode: "77002"
    },
    {
        name: "Caracol",
        cuisine: "mexican",
        rating: 4.5,
        address: "2200 Post Oak Blvd, Houston, TX 77056",
        lat: 29.7399,
        lng: -95.4613,
        city: "Houston",
        state: "TX",
        zipcode: "77056"
    },
    {
        name: "Brennan's of Houston",
        cuisine: "american",
        rating: 4.4,
        address: "3300 Smith St, Houston, TX 77006",
        lat: 29.7341,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Himalaya Restaurant",
        cuisine: "indian",
        rating: 4.6,
        address: "5938 Hillcroft St, Houston, TX 77036",
        lat: 29.7265,
        lng: -95.4894,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Rainbow Lodge",
        cuisine: "american",
        rating: 4.5,
        address: "2011 Ella Blvd, Houston, TX 77008",
        lat: 29.8165,
        lng: -95.4115,
        city: "Houston",
        state: "TX",
        zipcode: "77008"
    },
    {
        name: "Indika",
        cuisine: "indian",
        rating: 4.4,
        address: "516 Westheimer Rd, Houston, TX 77006",
        lat: 29.7407,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Kata Robata",
        cuisine: "japanese",
        rating: 4.7,
        address: "3600 Kirby Dr, Houston, TX 77098",
        lat: 29.7341,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "Da Marco",
        cuisine: "italian",
        rating: 4.6,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.7407,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Pho Binh",
        cuisine: "vietnamese",
        rating: 4.5,
        address: "10928 Bellaire Blvd, Houston, TX 77072",
        lat: 29.7058,
        lng: -95.5694,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Crawfish & Noodles",
        cuisine: "vietnamese",
        rating: 4.3,
        address: "11360 Bellaire Blvd, Houston, TX 77072",
        lat: 29.7058,
        lng: -95.5794,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Al Aseel Grill & Cafe",
        cuisine: "middle eastern",
        rating: 4.5,
        address: "12610 Hillcroft St, Houston, TX 77035",
        lat: 29.6965,
        lng: -95.4894,
        city: "Houston",
        state: "TX",
        zipcode: "77035"
    },
    {
        name: "Xochi",
        cuisine: "mexican",
        rating: 4.6,
        address: "1777 Walker St, Houston, TX 77010",
        lat: 29.7520,
        lng: -95.3698,
        city: "Houston",
        state: "TX",
        zipcode: "77010"
    },
    {
        name: "Turkey Leg Hut",
        cuisine: "american",
        rating: 4.2,
        address: "4830 Almeda Rd, Houston, TX 77004",
        lat: 29.7265,
        lng: -95.3632,
        city: "Houston",
        state: "TX",
        zipcode: "77004"
    },
    {
        name: "Nancy's Hustle",
        cuisine: "american",
        rating: 4.5,
        address: "2704 Polk St, Houston, TX 77003",
        lat: 29.7604,
        lng: -95.3598,
        city: "Houston",
        state: "TX",
        zipcode: "77003"
    },
    {
        name: "Coltivare Pizza & Garden",
        cuisine: "pizza",
        rating: 4.4,
        address: "3320 White Oak Dr, Houston, TX 77007",
        lat: 29.7965,
        lng: -95.4215,
        city: "Houston",
        state: "TX",
        zipcode: "77007"
    },
    {
        name: "Mala Sichuan Bistro",
        cuisine: "chinese",
        rating: 4.5,
        address: "9348 Bellaire Blvd, Houston, TX 77036",
        lat: 29.7058,
        lng: -95.4894,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Pondicheri",
        cuisine: "indian",
        rating: 4.5,
        address: "2800 Kirby Dr, Houston, TX 77098",
        lat: 29.7341,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "B&B Butchers & Restaurant",
        cuisine: "american",
        rating: 4.7,
        address: "1814 Washington Ave, Houston, TX 77007",
        lat: 29.7965,
        lng: -95.4015,
        city: "Houston",
        state: "TX",
        zipcode: "77007"
    },
    {
        name: "Taste of Texas",
        cuisine: "american",
        rating: 4.4,
        address: "10505 Katy Fwy, Houston, TX 77024",
        lat: 29.7799,
        lng: -95.5471,
        city: "Houston",
        state: "TX",
        zipcode: "77024"
    },
    {
        name: "The Pass & Provisions",
        cuisine: "american",
        rating: 4.6,
        address: "807 Taft St, Houston, TX 77019",
        lat: 29.7465,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77019"
    },
    {
        name: "Triniti",
        cuisine: "american",
        rating: 4.7,
        address: "2815 S Shepherd Dr, Houston, TX 77098",
        lat: 29.7341,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "BCN Taste & Tradition",
        cuisine: "spanish",
        rating: 4.6,
        address: "4210 Roseland St, Houston, TX 77006",
        lat: 29.7341,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Underbelly Hospitality",
        cuisine: "american",
        rating: 4.5,
        address: "1100 Westheimer Rd, Houston, TX 77006",
        lat: 29.7407,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Riel",
        cuisine: "american",
        rating: 4.4,
        address: "1927 Fairview St, Houston, TX 77019",
        lat: 29.7465,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77019"
    },
    {
        name: "Bistro Menil",
        cuisine: "american",
        rating: 4.3,
        address: "1505 W Alabama St, Houston, TX 77006",
        lat: 29.7341,
        lng: -95.3994,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Cafe Annie",
        cuisine: "american",
        rating: 4.5,
        address: "1728 Post Oak Blvd, Houston, TX 77056",
        lat: 29.7399,
        lng: -95.4613,
        city: "Houston",
        state: "TX",
        zipcode: "77056"
    },
    {
        name: "Etoile Cuisine Et Bar",
        cuisine: "french",
        rating: 4.6,
        address: "1101 Uptown Park Blvd, Houston, TX 77056",
        lat: 29.7399,
        lng: -95.4613,
        city: "Houston",
        state: "TX",
        zipcode: "77056"
    },
    {
        name: "Helen Greek Food & Wine",
        cuisine: "greek",
        rating: 4.4,
        address: "2429 Rice Blvd, Houston, TX 77005",
        lat: 29.7199,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77005"
    },
    {
        name: "Hunky Dory",
        cuisine: "american",
        rating: 4.3,
        address: "1515 Clay St, Houston, TX 77002",
        lat: 29.7520,
        lng: -95.3698,
        city: "Houston",
        state: "TX",
        zipcode: "77002"
    },
    {
        name: "Izakaya Wa",
        cuisine: "japanese",
        rating: 4.5,
        address: "2120 Lamar St, Houston, TX 77003",
        lat: 29.7604,
        lng: -95.3598,
        city: "Houston",
        state: "TX",
        zipcode: "77003"
    },
    {
        name: "Kenny & Ziggy's New York Delicatessen",
        cuisine: "american",
        rating: 4.2,
        address: "2327 Post Oak Blvd, Houston, TX 77056",
        lat: 29.7399,
        lng: -95.4613,
        city: "Houston",
        state: "TX",
        zipcode: "77056"
    },
    {
        name: "La Table",
        cuisine: "french",
        rating: 4.7,
        address: "1800 Post Oak Blvd, Houston, TX 77056",
        lat: 29.7399,
        lng: -95.4613,
        city: "Houston",
        state: "TX",
        zipcode: "77056"
    },
    {
        name: "Monarch Bistro",
        cuisine: "american",
        rating: 4.4,
        address: "5701 Main St, Houston, TX 77005",
        lat: 29.7199,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77005"
    },
    {
        name: "One Dragon Restaurant",
        cuisine: "chinese",
        rating: 4.3,
        address: "8865 Bellaire Blvd, Houston, TX 77036",
        lat: 29.7058,
        lng: -95.4794,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Oporto Fooding House & Wine",
        cuisine: "spanish",
        rating: 4.5,
        address: "5555 Morningside Dr, Houston, TX 77005",
        lat: 29.7199,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77005"
    },
    {
        name: "Pax Americana",
        cuisine: "american",
        rating: 4.4,
        address: "4319 Montrose Blvd, Houston, TX 77006",
        lat: 29.7341,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Ritual",
        cuisine: "american",
        rating: 4.3,
        address: "1829 Richmond Ave, Houston, TX 77098",
        lat: 29.7341,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "Saigon Pagolac",
        cuisine: "vietnamese",
        rating: 4.4,
        address: "11080 Bellaire Blvd, Houston, TX 77072",
        lat: 29.7058,
        lng: -95.5594,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Saltair Seafood Kitchen",
        cuisine: "american",
        rating: 4.2,
        address: "1827 Shepherd Dr, Houston, TX 77007",
        lat: 29.7965,
        lng: -95.4115,
        city: "Houston",
        state: "TX",
        zipcode: "77007"
    },
    {
        name: "Southern Goods",
        cuisine: "american",
        rating: 4.5,
        address: "632 W 19th St, Houston, TX 77008",
        lat: 29.8065,
        lng: -95.4115,
        city: "Houston",
        state: "TX",
        zipcode: "77008"
    },
    {
        name: "Spindletop",
        cuisine: "american",
        rating: 4.6,
        address: "1200 McKinney St, Houston, TX 77010",
        lat: 29.7520,
        lng: -95.3698,
        city: "Houston",
        state: "TX",
        zipcode: "77010"
    },
    {
        name: "State Fare",
        cuisine: "american",
        rating: 4.3,
        address: "947 Gessner Rd, Houston, TX 77024",
        lat: 29.7799,
        lng: -95.5271,
        city: "Houston",
        state: "TX",
        zipcode: "77024"
    },
    {
        name: "Steak 48",
        cuisine: "american",
        rating: 4.7,
        address: "4444 Westheimer Rd, Houston, TX 77027",
        lat: 29.7399,
        lng: -95.4394,
        city: "Houston",
        state: "TX",
        zipcode: "77027"
    },
    {
        name: "The Dunlavy",
        cuisine: "american",
        rating: 4.2,
        address: "3422 Allen Pkwy, Houston, TX 77019",
        lat: 29.7565,
        lng: -95.4213,
        city: "Houston",
        state: "TX",
        zipcode: "77019"
    },
    {
        name: "Uyghur Bistro",
        cuisine: "chinese",
        rating: 4.4,
        address: "8230 Kirby Dr, Houston, TX 77054",
        lat: 29.6965,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77054"
    },
    {
        name: "Wooster's Garden",
        cuisine: "american",
        rating: 4.3,
        address: "3315 Yupon St, Houston, TX 77006",
        lat: 29.7341,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Agricole Hospitality",
        cuisine: "american",
        rating: 4.4,
        address: "1603 Shepherd Dr, Houston, TX 77007",
        lat: 29.7965,
        lng: -95.4115,
        city: "Houston",
        state: "TX",
        zipcode: "77007"
    },
    {
        name: "Foreign Correspondents",
        cuisine: "american",
        rating: 4.5,
        address: "4721 California St, Houston, TX 77006",
        lat: 29.7341,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // Katy (15+ Restaurants)
    {
        name: "Babin's Seafood",
        cuisine: "american",
        rating: 4.5,
        address: "21851 Katy Freeway, Katy, TX 77450",
        lat: 29.7391,
        lng: -95.7521,
        city: "Katy",
        state: "TX",
        zipcode: "77450"
    },
    {
        name: "Palinuro Italian Cuisine",
        cuisine: "italian",
        rating: 4.7,
        address: "1450 S Mason Rd, Katy, TX 77450",
        lat: 29.7191,
        lng: -95.7321,
        city: "Katy",
        state: "TX",
        zipcode: "77450"
    },
    {
        name: "Local Table",
        cuisine: "american",
        rating: 4.4,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.7391,
        lng: -95.7521,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Katy Vibes",
        cuisine: "american",
        rating: 4.3,
        address: "25632 Westheimer Pkwy, Katy, TX 77494",
        lat: 29.7391,
        lng: -95.7721,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Peli Peli Kitchen",
        cuisine: "american",
        rating: 4.5,
        address: "1001 S Fry Rd, Katy, TX 77450",
        lat: 29.7391,
        lng: -95.7321,
        city: "Katy",
        state: "TX",
        zipcode: "77450"
    },
    {
        name: "Hong Kong Food Street",
        cuisine: "chinese",
        rating: 4.0,
        address: "22939 Colonial Pkwy, Ste A101, Katy, TX 77449",
        lat: 29.7291,
        lng: -95.7421,
        city: "Katy",
        state: "TX",
        zipcode: "77449"
    },
    {
        name: "Postino Cinco Ranch",
        cuisine: "italian",
        rating: 4.4,
        address: "23501 Cinco Ranch Blvd Ste D100, Katy, TX 77494",
        lat: 29.7391,
        lng: -95.7521,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Pane e Vino",
        cuisine: "italian",
        rating: 4.7,
        address: "1975 W Grand Pkwy S, Katy, TX 77494",
        lat: 29.7191,
        lng: -95.7621,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Little Italy Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "24909 Kingsland Blvd, Katy, TX 77494",
        lat: 29.7091,
        lng: -95.7821,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Lomonte's Italian Restaurant & Bar",
        cuisine: "italian",
        rating: 4.9,
        address: "10225 Katy Fwy, Houston, TX 77024",
        lat: 29.7799,
        lng: -95.5471,
        city: "Katy",
        state: "TX",
        zipcode: "77024"
    },
    {
        name: "Fielding's Wood Grill",
        cuisine: "american",
        rating: 4.3,
        address: "1699 Research Forest Dr, The Woodlands, TX 77380",
        lat: 29.7291,
        lng: -95.7221,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Kiran's Restaurant",
        cuisine: "indian",
        rating: 4.6,
        address: "2925 Richmond Ave, Houston, TX 77098",
        lat: 29.7291,
        lng: -95.7321,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Del Frisco's Double Eagle Steakhouse",
        cuisine: "american",
        rating: 4.5,
        address: "61 Waterway Ave, The Woodlands, TX 77380",
        lat: 29.7191,
        lng: -95.7421,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "North Italia",
        cuisine: "italian",
        rating: 4.6,
        address: "11410 Century Oaks Terrace, Austin, TX 78758",
        lat: 29.7091,
        lng: -95.7521,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Seasons 52",
        cuisine: "american",
        rating: 4.5,
        address: "4410 The Woodlands, The Woodlands, TX 77380",
        lat: 29.6991,
        lng: -95.7621,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Boa Steakhouse",
        cuisine: "american",
        rating: 4.4,
        address: "2201 Westheimer Rd, Houston, TX 77098",
        lat: 29.6891,
        lng: -95.7721,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },

    // Sugar Land (15+ Restaurants)
    {
        name: "Perry's Steakhouse",
        cuisine: "american",
        rating: 4.6,
        address: "23501 Cinco Ranch Blvd, Sugar Land, TX 77479",
        lat: 29.5844,
        lng: -95.6349,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "The Union Kitchen",
        cuisine: "american",
        rating: 4.4,
        address: "16608 City Walk, Sugar Land, TX 77479",
        lat: 29.5744,
        lng: -95.6249,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Grazia Italian Kitchen",
        cuisine: "italian",
        rating: 4.5,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5644,
        lng: -95.6149,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Escalante's Fine Tex-Mex",
        cuisine: "mexican",
        rating: 4.3,
        address: "2523 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5544,
        lng: -95.6049,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Ristorante Cavour",
        cuisine: "italian",
        rating: 4.6,
        address: "2120 Lone Star Dr, Sugar Land, TX 77479",
        lat: 29.5444,
        lng: -95.5949,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Churrascos",
        cuisine: "latin",
        rating: 4.4,
        address: "2055 Westheimer Rd, Houston, TX 77098",
        lat: 29.5344,
        lng: -95.5849,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Cafe Natasha",
        cuisine: "middle eastern",
        rating: 4.5,
        address: "4311 Eldridge Pkwy, Missouri City, TX 77459",
        lat: 29.5244,
        lng: -95.5749,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Maggiano's Little Italy",
        cuisine: "italian",
        rating: 4.2,
        address: "2019 Post Oak Blvd, Houston, TX 77056",
        lat: 29.5144,
        lng: -95.5649,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "The Capital Grille",
        cuisine: "american",
        rating: 4.7,
        address: "5365 Westheimer Rd, Houston, TX 77056",
        lat: 29.5044,
        lng: -95.5549,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Fleming's Prime Steakhouse",
        cuisine: "american",
        rating: 4.5,
        address: "2405 W Alabama St, Houston, TX 77098",
        lat: 29.4944,
        lng: -95.5449,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Mastro's Steakhouse",
        cuisine: "american",
        rating: 4.6,
        address: "1650 West Loop S, Houston, TX 77027",
        lat: 29.4844,
        lng: -95.5349,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "The Rouxpour",
        cuisine: "american",
        rating: 4.3,
        address: "16535 Southwest Fwy, Sugar Land, TX 77479",
        lat: 29.4744,
        lng: -95.5249,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Yao Restaurant & Bar",
        cuisine: "chinese",
        rating: 4.4,
        address: "9755 Westheimer Rd, Houston, TX 77042",
        lat: 29.4644,
        lng: -95.5149,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Seasons 52",
        cuisine: "american",
        rating: 4.5,
        address: "4410 Westheimer Rd, Houston, TX 77027",
        lat: 29.4544,
        lng: -95.5049,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Andes Cafe Sugar Land",
        cuisine: "latin",
        rating: 4.2,
        address: "2311 Highway 6, Sugar Land, TX 77479",
        lat: 29.4444,
        lng: -95.4949,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Pappadeaux Seafood Kitchen",
        cuisine: "american",
        rating: 4.3,
        address: "15395 Southwest Fwy, Sugar Land, TX 77478",
        lat: 29.4344,
        lng: -95.4849,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },

    // Pearland (15+ Restaurants - Killen's Empire & More)
    {
        name: "Killen's Barbecue",
        cuisine: "american",
        rating: 4.8,
        address: "3613 E Broadway St, Pearland, TX 77581",
        lat: 29.5583,
        lng: -95.2861,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Killen's Steakhouse",
        cuisine: "american",
        rating: 4.7,
        address: "6425 Broadway St, Pearland, TX 77581",
        lat: 29.5483,
        lng: -95.2761,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Grazia Italian Kitchen",
        cuisine: "italian",
        rating: 4.4,
        address: "11920 Broadway St, Pearland, TX 77584",
        lat: 29.5383,
        lng: -95.2661,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "Killen's Burgers",
        cuisine: "american",
        rating: 4.5,
        address: "7038 Highway 6, Pearland, TX 77581",
        lat: 29.5283,
        lng: -95.2561,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Killen's TMX",
        cuisine: "mexican",
        rating: 4.3,
        address: "6425 Broadway St, Pearland, TX 77581",
        lat: 29.5183,
        lng: -95.2461,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Pappasito's Cantina",
        cuisine: "mexican",
        rating: 4.4,
        address: "10001 Southwest Fwy, Houston, TX 77074",
        lat: 29.5083,
        lng: -95.2361,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Brookstreet BBQ",
        cuisine: "american",
        rating: 4.2,
        address: "11814 Broadway St, Pearland, TX 77584",
        lat: 29.4983,
        lng: -95.2261,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "Italiano's Restaurant",
        cuisine: "italian",
        rating: 4.3,
        address: "2303 Grand Blvd, Pearland, TX 77581",
        lat: 29.4883,
        lng: -95.2161,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Nara Thai",
        cuisine: "thai",
        rating: 4.5,
        address: "11302 Broadway St, Pearland, TX 77584",
        lat: 29.4783,
        lng: -95.2061,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "Pho Annie",
        cuisine: "vietnamese",
        rating: 4.4,
        address: "9896 Broadway St, Pearland, TX 77584",
        lat: 29.4683,
        lng: -95.1961,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "Casa Olé Pearland",
        cuisine: "mexican",
        rating: 4.1,
        address: "3100 E. Broadway, Pearland, TX 77581",
        lat: 29.4583,
        lng: -95.1861,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Longhorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "11200 Broadway St, Pearland, TX 77584",
        lat: 29.4483,
        lng: -95.1761,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "Cheddars Scratch Kitchen",
        cuisine: "american",
        rating: 4.0,
        address: "11801 S Sam Houston Pkwy E, Houston, TX 77034",
        lat: 29.4383,
        lng: -95.1661,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Tokyo Japanese Steak House",
        cuisine: "japanese",
        rating: 4.3,
        address: "2502 Smith Ranch Rd, Pearland, TX 77584",
        lat: 29.4283,
        lng: -95.1561,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "BJ's Restaurant & Brewhouse",
        cuisine: "american",
        rating: 4.1,
        address: "1910 Pearland Pkwy, Pearland, TX 77581",
        lat: 29.4183,
        lng: -95.1461,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 3.9,
        address: "2020 Pearland Pkwy, Pearland, TX 77581",
        lat: 29.4083,
        lng: -95.1361,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },

    // The Woodlands (15+ Restaurants)
    {
        name: "Seasons 52",
        cuisine: "american",
        rating: 4.5,
        address: "4410 The Woodlands, The Woodlands, TX 77380",
        lat: 30.1588,
        lng: -95.4913,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Del Frisco's Double Eagle Steakhouse",
        cuisine: "american",
        rating: 4.7,
        address: "61 Waterway Ave, The Woodlands, TX 77380",
        lat: 30.1688,
        lng: -95.5013,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "North Italia",
        cuisine: "italian",
        rating: 4.6,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.1788,
        lng: -95.5113,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Fielding's Wood Grill",
        cuisine: "american",
        rating: 4.4,
        address: "1699 Research Forest Dr, The Woodlands, TX 77380",
        lat: 30.1488,
        lng: -95.4813,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "The Capital Grille",
        cuisine: "american",
        rating: 4.8,
        address: "5365 Westheimer Rd, Houston, TX 77056",
        lat: 30.1388,
        lng: -95.4713,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Fleming's Prime Steakhouse & Wine Bar",
        cuisine: "american",
        rating: 4.6,
        address: "9595 Six Pines Dr, The Woodlands, TX 77380",
        lat: 30.1288,
        lng: -95.4613,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Copperwood Tavern",
        cuisine: "american",
        rating: 4.3,
        address: "26405 Kuykendahl Rd, The Woodlands, TX 77375",
        lat: 30.1188,
        lng: -95.4513,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77375"
    },
    {
        name: "Landry's Seafood House",
        cuisine: "american",
        rating: 4.2,
        address: "1212 Lake Robbins Dr, The Woodlands, TX 77380",
        lat: 30.1088,
        lng: -95.4413,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Jasper's",
        cuisine: "american",
        rating: 4.5,
        address: "9595 Six Pines Dr, The Woodlands, TX 77380",
        lat: 30.0988,
        lng: -95.4313,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Goode Co. BBQ",
        cuisine: "american",
        rating: 4.4,
        address: "20102 Hwy 249, Houston, TX 77070",
        lat: 30.0888,
        lng: -95.4213,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Cheddar's Scratch Kitchen",
        cuisine: "american",
        rating: 4.1,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0788,
        lng: -95.4113,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Fish Creek Grill",
        cuisine: "american",
        rating: 4.3,
        address: "25722 Northwest Fwy, Cypress, TX 77429",
        lat: 30.0688,
        lng: -95.4013,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "P.F. Chang's",
        cuisine: "chinese",
        rating: 4.2,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0588,
        lng: -95.3913,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Saltgrass Steak House",
        cuisine: "american",
        rating: 4.3,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0488,
        lng: -95.3813,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Broken Barrel Tavern",
        cuisine: "american",
        rating: 4.0,
        address: "6619 Rayford Rd, Spring, TX 77389",
        lat: 30.0388,
        lng: -95.3713,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },

    // Spring (15+ Restaurants)
    {
        name: "Corkscrew BBQ",
        cuisine: "american",
        rating: 4.7,
        address: "26608 Keith St, Spring, TX 77373",
        lat: 30.0799,
        lng: -95.4171,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Puffabelly's Restaurant",
        cuisine: "american",
        rating: 4.3,
        address: "100 Main St, Spring, TX 77373",
        lat: 30.0699,
        lng: -95.4071,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Broken Barrel Tavern",
        cuisine: "american",
        rating: 4.2,
        address: "6619 Rayford Rd, Spring, TX 77389",
        lat: 30.0599,
        lng: -95.3971,
        city: "Spring",
        state: "TX",
        zipcode: "77389"
    },
    {
        name: "Goode Co. Seafood",
        cuisine: "american",
        rating: 4.4,
        address: "20102 Hwy 249, Houston, TX 77070",
        lat: 30.0499,
        lng: -95.3871,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Copperwood Tavern",
        cuisine: "american",
        rating: 4.3,
        address: "26405 Kuykendahl Rd, The Woodlands, TX 77375",
        lat: 30.0399,
        lng: -95.3771,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Fish Creek Grill",
        cuisine: "american",
        rating: 4.1,
        address: "25722 Northwest Fwy, Cypress, TX 77429",
        lat: 30.0299,
        lng: -95.3671,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 30.0199,
        lng: -95.3571,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "6710 Louetta Rd, Spring, TX 77379",
        lat: 30.0099,
        lng: -95.3471,
        city: "Spring",
        state: "TX",
        zipcode: "77379"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9999,
        lng: -95.3371,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9899,
        lng: -95.3271,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "TGI Fridays",
        cuisine: "american",
        rating: 3.7,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9799,
        lng: -95.3171,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.2,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9699,
        lng: -95.3071,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9599,
        lng: -95.2971,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "Cracker Barrel Old Country Store",
        cuisine: "american",
        rating: 4.1,
        address: "21000 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9499,
        lng: -95.2871,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9399,
        lng: -95.2771,
        city: "Spring",
        state: "TX",
        zipcode: "77373"
    },

    // Conroe (15+ Restaurants)
    {
        name: "Republic Grille",
        cuisine: "american",
        rating: 4.3,
        address: "26500 Kuykendahl Rd, Conroe, TX 77385",
        lat: 30.3133,
        lng: -95.4904,
        city: "Conroe",
        state: "TX",
        zipcode: "77385"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.3033,
        lng: -95.4804,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2933,
        lng: -95.4704,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2833,
        lng: -95.4604,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2733,
        lng: -95.4504,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Cracker Barrel Old Country Store",
        cuisine: "american",
        rating: 4.2,
        address: "1209 Loop 336 W, Conroe, TX 77304",
        lat: 30.2633,
        lng: -95.4404,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2533,
        lng: -95.4304,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2433,
        lng: -95.4204,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2333,
        lng: -95.4104,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "BJ's Restaurant & Brewhouse",
        cuisine: "american",
        rating: 4.1,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2233,
        lng: -95.4004,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Golden Corral Buffet & Grill",
        cuisine: "american",
        rating: 3.7,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2133,
        lng: -95.3904,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "IHOP",
        cuisine: "american",
        rating: 3.9,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.2033,
        lng: -95.3804,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Denny's",
        cuisine: "american",
        rating: 3.6,
        address: "1209 Loop 336 W, Conroe, TX 77304",
        lat: 30.1933,
        lng: -95.3704,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.1833,
        lng: -95.3604,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Buffalo Wild Wings",
        cuisine: "american",
        rating: 3.8,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.1733,
        lng: -95.3504,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },

    // Cypress (15+ Restaurants)
    {
        name: "Galiana's Tex Mex",
        cuisine: "mexican",
        rating: 4.6,
        address: "24110 US-290 #500, Cypress, TX 77429",
        lat: 29.9633,
        lng: -95.6804,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Villa Roma Italian Ristorante",
        cuisine: "italian",
        rating: 4.7,
        address: "12640 Telge Road Suite E, Cypress, TX 77429",
        lat: 29.9933,
        lng: -95.7104,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Fish Creek Grill",
        cuisine: "american",
        rating: 4.3,
        address: "25722 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9533,
        lng: -95.6604,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Copperwood Tavern",
        cuisine: "american",
        rating: 4.2,
        address: "26405 Kuykendahl Rd, The Woodlands, TX 77375",
        lat: 29.9433,
        lng: -95.6504,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9333,
        lng: -95.6404,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9233,
        lng: -95.6304,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9133,
        lng: -95.6204,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9033,
        lng: -95.6104,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.8933,
        lng: -95.6004,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.8833,
        lng: -95.5904,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Cracker Barrel Old Country Store",
        cuisine: "american",
        rating: 4.1,
        address: "21000 Northwest Fwy, Cypress, TX 77429",
        lat: 29.8733,
        lng: -95.5804,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.8633,
        lng: -95.5704,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "TGI Fridays",
        cuisine: "american",
        rating: 3.7,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.8533,
        lng: -95.5604,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Buffalo Wild Wings",
        cuisine: "american",
        rating: 3.8,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.8433,
        lng: -95.5504,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.8333,
        lng: -95.5404,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },

    // Humble (15+ Restaurants)
    {
        name: "Humble City Cafe",
        cuisine: "american",
        rating: 4.4,
        address: "200 E Main St, Humble, TX 77338",
        lat: 30.0133,
        lng: -95.2604,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 30.0033,
        lng: -95.2504,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9933,
        lng: -95.2404,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9833,
        lng: -95.2304,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9733,
        lng: -95.2204,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9633,
        lng: -95.2104,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9533,
        lng: -95.2004,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9433,
        lng: -95.1904,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Cracker Barrel Old Country Store",
        cuisine: "american",
        rating: 4.1,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9333,
        lng: -95.1804,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Golden Corral Buffet & Grill",
        cuisine: "american",
        rating: 3.7,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9233,
        lng: -95.1704,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "IHOP",
        cuisine: "american",
        rating: 3.9,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9133,
        lng: -95.1604,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Denny's",
        cuisine: "american",
        rating: 3.6,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.9033,
        lng: -95.1504,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.8933,
        lng: -95.1404,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Buffalo Wild Wings",
        cuisine: "american",
        rating: 3.8,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 29.8833,
        lng: -95.1304,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Subway",
        cuisine: "american",
        rating: 3.5,
        address: "200 E Main St, Humble, TX 77338",
        lat: 29.8733,
        lng: -95.1204,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },

    // Pasadena (15+ Restaurants)
    {
        name: "Sudie's Catfish House",
        cuisine: "american",
        rating: 4.6,
        address: "4910 Spencer Hwy, Pasadena, TX 77505",
        lat: 29.6711,
        lng: -95.1891,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Casa Olé",
        cuisine: "mexican",
        rating: 4.1,
        address: "7750 Spencer Highway, Pasadena, TX 77505",
        lat: 29.6611,
        lng: -95.1791,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.6511,
        lng: -95.1691,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.6411,
        lng: -95.1591,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.6311,
        lng: -95.1491,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.6211,
        lng: -95.1391,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.6111,
        lng: -95.1291,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.6011,
        lng: -95.1191,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.5911,
        lng: -95.1091,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Cracker Barrel Old Country Store",
        cuisine: "american",
        rating: 4.1,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.5811,
        lng: -95.0991,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Golden Corral Buffet & Grill",
        cuisine: "american",
        rating: 3.7,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.5711,
        lng: -95.0891,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "IHOP",
        cuisine: "american",
        rating: 3.9,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.5611,
        lng: -95.0791,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Denny's",
        cuisine: "american",
        rating: 3.6,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.5511,
        lng: -95.0691,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.5411,
        lng: -95.0591,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Buffalo Wild Wings",
        cuisine: "american",
        rating: 3.8,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.5311,
        lng: -95.0491,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },

    // Texas City (15+ Restaurants)
    {
        name: "Yaga's Burger Haus",
        cuisine: "american",
        rating: 4.3,
        address: "323 6th Ave N, Texas City, TX 77590",
        lat: 29.3838,
        lng: -94.9027,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Fish Tales",
        cuisine: "american",
        rating: 4.2,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.3738,
        lng: -94.8927,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Big Al's Seafood",
        cuisine: "american",
        rating: 4.1,
        address: "2524 Palmer Hwy, Texas City, TX 77590",
        lat: 29.3638,
        lng: -94.8827,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.3538,
        lng: -94.8727,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.3438,
        lng: -94.8627,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.3338,
        lng: -94.8527,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.3238,
        lng: -94.8427,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.3138,
        lng: -94.8327,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.3038,
        lng: -94.8227,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.2938,
        lng: -94.8127,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Golden Corral Buffet & Grill",
        cuisine: "american",
        rating: 3.7,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.2838,
        lng: -94.8027,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "IHOP",
        cuisine: "american",
        rating: 3.9,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.2738,
        lng: -94.7927,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.2638,
        lng: -94.7827,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "Subway",
        cuisine: "american",
        rating: 3.5,
        address: "323 6th Ave N, Texas City, TX 77590",
        lat: 29.2538,
        lng: -94.7727,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "1502 Gulf Fwy, Texas City, TX 77590",
        lat: 29.2438,
        lng: -94.7627,
        city: "Texas City",
        state: "TX",
        zipcode: "77590"
    },

    // Galveston (15+ Restaurants)
    {
        name: "The Rooftop Bar",
        cuisine: "american",
        rating: 4.4,
        address: "2024 Postoffice St, Galveston, TX 77550",
        lat: 29.3013,
        lng: -94.7977,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Shrimp 'N Stuff Downtown",
        cuisine: "american",
        rating: 4.3,
        address: "2300 Strand St, Galveston, TX 77550",
        lat: 29.3113,
        lng: -94.8077,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "The Spot",
        cuisine: "american",
        rating: 4.2,
        address: "3204 Seawall Blvd, Galveston, TX 77550",
        lat: 29.2913,
        lng: -94.7877,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Fish Tales",
        cuisine: "american",
        rating: 4.1,
        address: "2502 Seawall Blvd, Galveston, TX 77550",
        lat: 29.2813,
        lng: -94.7777,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Saltwater Grill",
        cuisine: "american",
        rating: 4.5,
        address: "2017 Post Office St, Galveston, TX 77550",
        lat: 29.2713,
        lng: -94.7677,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Yaga's Burger Haus",
        cuisine: "american",
        rating: 4.3,
        address: "2314 Strand St, Galveston, TX 77550",
        lat: 29.2613,
        lng: -94.7577,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Number 13 Prime Steak & Seafood",
        cuisine: "american",
        rating: 4.6,
        address: "2502 Seawall Blvd, Galveston, TX 77550",
        lat: 29.2513,
        lng: -94.7477,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Rainforest Cafe",
        cuisine: "american",
        rating: 4.0,
        address: "5220 Seawall Blvd, Galveston, TX 77551",
        lat: 29.2413,
        lng: -94.7377,
        city: "Galveston",
        state: "TX",
        zipcode: "77551"
    },
    {
        name: "Landry's Seafood House",
        cuisine: "american",
        rating: 4.2,
        address: "1502 Seawall Blvd, Galveston, TX 77550",
        lat: 29.2313,
        lng: -94.7277,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Pleasure Pier",
        cuisine: "american",
        rating: 3.9,
        address: "2501 Seawall Blvd, Galveston, TX 77550",
        lat: 29.2213,
        lng: -94.7177,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Bubba Gump Shrimp Co.",
        cuisine: "american",
        rating: 4.1,
        address: "2501 Seawall Blvd, Galveston, TX 77550",
        lat: 29.2113,
        lng: -94.7077,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Joe's Crab Shack",
        cuisine: "american",
        rating: 3.8,
        address: "3502 Seawall Blvd, Galveston, TX 77550",
        lat: 29.2013,
        lng: -94.6977,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Pier 21",
        cuisine: "american",
        rating: 4.0,
        address: "21st St & Harborside Dr, Galveston, TX 77550",
        lat: 29.1913,
        lng: -94.6877,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Fisherman's Wharf",
        cuisine: "american",
        rating: 3.9,
        address: "Pier 22, Galveston, TX 77550",
        lat: 29.1813,
        lng: -94.6777,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },
    {
        name: "Murdoch's Pier",
        cuisine: "american",
        rating: 4.2,
        address: "2028 Seawall Blvd, Galveston, TX 77550",
        lat: 29.1713,
        lng: -94.6677,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },

    // Richmond (15+ Restaurants)
    {
        name: "Pier 36 Seafood Restaurant & Oyster Bar",
        cuisine: "american",
        rating: 4.7,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5820,
        lng: -95.7605,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5720,
        lng: -95.7505,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5620,
        lng: -95.7405,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5520,
        lng: -95.7305,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5420,
        lng: -95.7205,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5320,
        lng: -95.7105,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5220,
        lng: -95.7005,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5120,
        lng: -95.6905,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Golden Corral Buffet & Grill",
        cuisine: "american",
        rating: 3.7,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.5020,
        lng: -95.6805,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "IHOP",
        cuisine: "american",
        rating: 3.9,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.4920,
        lng: -95.6705,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.4820,
        lng: -95.6605,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Buffalo Wild Wings",
        cuisine: "american",
        rating: 3.8,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.4720,
        lng: -95.6505,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Subway",
        cuisine: "american",
        rating: 3.5,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.4620,
        lng: -95.6405,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.4520,
        lng: -95.6305,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },
    {
        name: "Taco Bell",
        cuisine: "mexican",
        rating: 3.3,
        address: "1410 E Hwy 90A #200, Richmond, TX 77406",
        lat: 29.4420,
        lng: -95.6205,
        city: "Richmond",
        state: "TX",
        zipcode: "77406"
    },

    // Rosenberg (15+ Restaurants)
    {
        name: "Bull Creek Cafe & Grill",
        cuisine: "american",
        rating: 4.5,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.5570,
        lng: -95.8066,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Another Time Soda Fountain",
        cuisine: "american",
        rating: 4.6,
        address: "800 Third Street, Rosenberg, TX 77471",
        lat: 29.5470,
        lng: -95.7966,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.5370,
        lng: -95.7866,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.5270,
        lng: -95.7766,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.5170,
        lng: -95.7666,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.5070,
        lng: -95.7566,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.4970,
        lng: -95.7466,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.4870,
        lng: -95.7366,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.4770,
        lng: -95.7266,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Golden Corral Buffet & Grill",
        cuisine: "american",
        rating: 3.7,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.4670,
        lng: -95.7166,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "IHOP",
        cuisine: "american",
        rating: 3.9,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.4570,
        lng: -95.7066,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.4470,
        lng: -95.6966,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Buffalo Wild Wings",
        cuisine: "american",
        rating: 3.8,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.4370,
        lng: -95.6866,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "Subway",
        cuisine: "american",
        rating: 3.5,
        address: "800 Third Street, Rosenberg, TX 77471",
        lat: 29.4270,
        lng: -95.6766,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "918 San Jacinto St, Rosenberg, TX 77471",
        lat: 29.4170,
        lng: -95.6666,
        city: "Rosenberg",
        state: "TX",
        zipcode: "77471"
    },

    // Alvin (15+ Restaurants)
    {
        name: "Juanita's Taqueria",
        cuisine: "mexican",
        rating: 4.6,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.4239,
        lng: -95.2441,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Las Flores Tex Mex",
        cuisine: "mexican",
        rating: 4.5,
        address: "306 E House St, Alvin, TX 77511",
        lat: 29.4139,
        lng: -95.2341,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.4039,
        lng: -95.2241,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3939,
        lng: -95.2141,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3839,
        lng: -95.2041,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3739,
        lng: -95.1941,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3639,
        lng: -95.1841,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3539,
        lng: -95.1741,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3439,
        lng: -95.1641,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Golden Corral Buffet & Grill",
        cuisine: "american",
        rating: 3.7,
        address: "306 E House St, Alvin, TX 77511",
        lat: 29.3339,
        lng: -95.1541,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "IHOP",
        cuisine: "american",
        rating: 3.9,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3239,
        lng: -95.1441,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3139,
        lng: -95.1341,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Buffalo Wild Wings",
        cuisine: "american",
        rating: 3.8,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.3039,
        lng: -95.1241,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "Subway",
        cuisine: "american",
        rating: 3.5,
        address: "306 E House St, Alvin, TX 77511",
        lat: 29.2939,
        lng: -95.1141,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "106 S. 3rd Street, Alvin, TX 77511",
        lat: 29.2839,
        lng: -95.1041,
        city: "Alvin",
        state: "TX",
        zipcode: "77511"
    },

    // La Porte (15+ Restaurants)
    {
        name: "Monument Inn",
        cuisine: "american",
        rating: 4.5,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.6338,
        lng: -95.0827,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Texas Roadhouse",
        cuisine: "american",
        rating: 4.3,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.6238,
        lng: -95.0727,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Olive Garden Italian Restaurant",
        cuisine: "italian",
        rating: 4.0,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.6138,
        lng: -95.0627,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Red Lobster",
        cuisine: "american",
        rating: 4.1,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.6038,
        lng: -95.0527,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Outback Steakhouse",
        cuisine: "american",
        rating: 4.0,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5938,
        lng: -95.0427,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Chili's Grill & Bar",
        cuisine: "american",
        rating: 3.9,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5838,
        lng: -95.0327,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "LongHorn Steakhouse",
        cuisine: "american",
        rating: 4.2,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5738,
        lng: -95.0227,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Applebee's Grill + Bar",
        cuisine: "american",
        rating: 3.8,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5638,
        lng: -95.0127,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Golden Corral Buffet & Grill",
        cuisine: "american",
        rating: 3.7,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5538,
        lng: -95.0027,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "IHOP",
        cuisine: "american",
        rating: 3.9,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5438,
        lng: -94.9927,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5338,
        lng: -94.9827,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Buffalo Wild Wings",
        cuisine: "american",
        rating: 3.8,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5238,
        lng: -94.9727,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Subway",
        cuisine: "american",
        rating: 3.5,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5138,
        lng: -94.9627,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.5038,
        lng: -94.9527,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },
    {
        name: "Taco Bell",
        cuisine: "mexican",
        rating: 3.3,
        address: "4406 Independence Pkwy S, La Porte, TX 77571",
        lat: 29.4938,
        lng: -94.9427,
        city: "La Porte",
        state: "TX",
        zipcode: "77571"
    },

    // MAJOR CHAIN RESTAURANTS (Multiple Locations)
    
    // Whataburger Locations
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "1910 W Grand Pkwy S, Katy, TX 77494",
        lat: 29.7191,
        lng: -95.7621,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "2500 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5644,
        lng: -95.6149,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "11920 Broadway St, Pearland, TX 77584",
        lat: 29.5383,
        lng: -95.2661,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.1588,
        lng: -95.4913,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "6710 Louetta Rd, Spring, TX 77379",
        lat: 30.0799,
        lng: -95.4171,
        city: "Spring",
        state: "TX",
        zipcode: "77379"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "1405 League Line Rd, Conroe, TX 77304",
        lat: 30.3133,
        lng: -95.4904,
        city: "Conroe",
        state: "TX",
        zipcode: "77304"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "25701 Northwest Fwy, Cypress, TX 77429",
        lat: 29.9633,
        lng: -95.6804,
        city: "Cypress",
        state: "TX",
        zipcode: "77429"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "20131 Highway 59 N, Humble, TX 77338",
        lat: 30.0133,
        lng: -95.2604,
        city: "Humble",
        state: "TX",
        zipcode: "77338"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "4624 E Sam Houston Pkwy S, Pasadena, TX 77505",
        lat: 29.6711,
        lng: -95.1891,
        city: "Pasadena",
        state: "TX",
        zipcode: "77505"
    },
    {
        name: "Whataburger",
        cuisine: "american",
        rating: 4.0,
        address: "3204 Seawall Blvd, Galveston, TX 77550",
        lat: 29.3013,
        lng: -94.7977,
        city: "Galveston",
        state: "TX",
        zipcode: "77550"
    },

    // Cava Locations
    {
        name: "Cava",
        cuisine: "mediterranean",
        rating: 4.3,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.1488,
        lng: -95.4813,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Cava",
        cuisine: "mediterranean",
        rating: 4.3,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.7391,
        lng: -95.7521,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Cava",
        cuisine: "mediterranean",
        rating: 4.3,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5844,
        lng: -95.6349,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Cava",
        cuisine: "mediterranean",
        rating: 4.3,
        address: "1910 Pearland Pkwy, Pearland, TX 77581",
        lat: 29.5583,
        lng: -95.2861,
        city: "Pearland",
        state: "TX",
        zipcode: "77581"
    },
    {
        name: "Cava",
        cuisine: "mediterranean",
        rating: 4.3,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.7407,
        lng: -95.4013,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // In-N-Out Burger Locations
    {
        name: "In-N-Out Burger",
        cuisine: "american",
        rating: 4.4,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.7291,
        lng: -95.7421,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "In-N-Out Burger",
        cuisine: "american",
        rating: 4.4,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5744,
        lng: -95.6249,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "In-N-Out Burger",
        cuisine: "american",
        rating: 4.4,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.1388,
        lng: -95.4713,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "In-N-Out Burger",
        cuisine: "american",
        rating: 4.4,
        address: "2815 S Shepherd Dr, Houston, TX 77098",
        lat: 29.7341,
        lng: -95.4113,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },

    // Salata Locations
    {
        name: "Salata",
        cuisine: "american",
        rating: 4.2,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.7191,
        lng: -95.7321,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Salata",
        cuisine: "american",
        rating: 4.2,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5644,
        lng: -95.6149,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Salata",
        cuisine: "american",
        rating: 4.2,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.1288,
        lng: -95.4613,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Salata",
        cuisine: "american",
        rating: 4.2,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.7307,
        lng: -95.3913,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // Chipotle Locations
    {
        name: "Chipotle Mexican Grill",
        cuisine: "mexican",
        rating: 4.1,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.7091,
        lng: -95.7521,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Chipotle Mexican Grill",
        cuisine: "mexican",
        rating: 4.1,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5544,
        lng: -95.6049,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Chipotle Mexican Grill",
        cuisine: "mexican",
        rating: 4.1,
        address: "11920 Broadway St, Pearland, TX 77584",
        lat: 29.5283,
        lng: -95.2561,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "Chipotle Mexican Grill",
        cuisine: "mexican",
        rating: 4.1,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.1188,
        lng: -95.4513,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Chipotle Mexican Grill",
        cuisine: "mexican",
        rating: 4.1,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.7207,
        lng: -95.3813,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // Cabo Bob's Locations
    {
        name: "Cabo Bob's Burritos",
        cuisine: "mexican",
        rating: 4.3,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.7107,
        lng: -95.3713,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Cabo Bob's Burritos",
        cuisine: "mexican",
        rating: 4.3,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6991,
        lng: -95.7621,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Cabo Bob's Burritos",
        cuisine: "mexican",
        rating: 4.3,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.1088,
        lng: -95.4413,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },

    // Piada Italian Street Food Locations
    {
        name: "Piada Italian Street Food",
        cuisine: "italian",
        rating: 4.2,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.7007,
        lng: -95.3613,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Piada Italian Street Food",
        cuisine: "italian",
        rating: 4.2,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6891,
        lng: -95.7721,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },

    // Black Walnut Cafe Locations
    {
        name: "Black Walnut Cafe",
        cuisine: "american",
        rating: 4.4,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6907,
        lng: -95.3513,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Black Walnut Cafe",
        cuisine: "american",
        rating: 4.4,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6791,
        lng: -95.7821,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Black Walnut Cafe",
        cuisine: "american",
        rating: 4.4,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0988,
        lng: -95.4313,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },

    // Saltgrass Steak House Locations
    {
        name: "Saltgrass Steak House",
        cuisine: "american",
        rating: 4.3,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6691,
        lng: -95.7921,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Saltgrass Steak House",
        cuisine: "american",
        rating: 4.3,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5444,
        lng: -95.5949,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Saltgrass Steak House",
        cuisine: "american",
        rating: 4.3,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0888,
        lng: -95.4213,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Saltgrass Steak House",
        cuisine: "american",
        rating: 4.3,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6807,
        lng: -95.3413,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // McAlister's Deli Locations
    {
        name: "McAlister's Deli",
        cuisine: "american",
        rating: 4.1,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6591,
        lng: -95.8021,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "McAlister's Deli",
        cuisine: "american",
        rating: 4.1,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5344,
        lng: -95.5849,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "McAlister's Deli",
        cuisine: "american",
        rating: 4.1,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0788,
        lng: -95.4113,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "McAlister's Deli",
        cuisine: "american",
        rating: 4.1,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6707,
        lng: -95.3313,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // Jason's Deli Locations
    {
        name: "Jason's Deli",
        cuisine: "american",
        rating: 4.2,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6491,
        lng: -95.8121,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Jason's Deli",
        cuisine: "american",
        rating: 4.2,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5244,
        lng: -95.5749,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Jason's Deli",
        cuisine: "american",
        rating: 4.2,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0688,
        lng: -95.4013,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Jason's Deli",
        cuisine: "american",
        rating: 4.2,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6607,
        lng: -95.3213,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // Jersey Mike's Locations
    {
        name: "Jersey Mike's Subs",
        cuisine: "american",
        rating: 4.3,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6391,
        lng: -95.8221,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Jersey Mike's Subs",
        cuisine: "american",
        rating: 4.3,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5144,
        lng: -95.5649,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Jersey Mike's Subs",
        cuisine: "american",
        rating: 4.3,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0588,
        lng: -95.3913,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Jersey Mike's Subs",
        cuisine: "american",
        rating: 4.3,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6507,
        lng: -95.3113,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // Rudy's BBQ Locations
    {
        name: "Rudy's Country Store & Bar-B-Q",
        cuisine: "american",
        rating: 4.4,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6291,
        lng: -95.8321,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Rudy's Country Store & Bar-B-Q",
        cuisine: "american",
        rating: 4.4,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.5044,
        lng: -95.5549,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "Rudy's Country Store & Bar-B-Q",
        cuisine: "american",
        rating: 4.4,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0488,
        lng: -95.3813,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Rudy's Country Store & Bar-B-Q",
        cuisine: "american",
        rating: 4.4,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6407,
        lng: -95.3013,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // More McDonald's Locations
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "1910 W Grand Pkwy S, Katy, TX 77494",
        lat: 29.6191,
        lng: -95.8421,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "2500 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.4944,
        lng: -95.5449,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "11920 Broadway St, Pearland, TX 77584",
        lat: 29.4183,
        lng: -95.1461,
        city: "Pearland",
        state: "TX",
        zipcode: "77584"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0388,
        lng: -95.3713,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "McDonald's",
        cuisine: "american",
        rating: 3.4,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6307,
        lng: -95.2913,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },

    // INTERNATIONAL CUISINE EXPANSION

    // Vietnamese Restaurants
    {
        name: "Pho Saigon",
        cuisine: "vietnamese",
        rating: 4.5,
        address: "10904 Bellaire Blvd, Houston, TX 77072",
        lat: 29.7058,
        lng: -95.5594,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Pho Dien",
        cuisine: "vietnamese",
        rating: 4.4,
        address: "10919 Bellaire Blvd, Houston, TX 77072",
        lat: 29.7158,
        lng: -95.5694,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Nha Hang Ngon",
        cuisine: "vietnamese",
        rating: 4.6,
        address: "9635 Bolsa Ave, Westminster, CA 92683",
        lat: 29.7258,
        lng: -95.5794,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Mai's Restaurant",
        cuisine: "vietnamese",
        rating: 4.3,
        address: "3403 Milam St, Houston, TX 77002",
        lat: 29.7358,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77002"
    },
    {
        name: "Huynh Restaurant",
        cuisine: "vietnamese",
        rating: 4.5,
        address: "912 St Emanuel St, Houston, TX 77003",
        lat: 29.7458,
        lng: -95.3794,
        city: "Houston",
        state: "TX",
        zipcode: "77003"
    },
    {
        name: "Tan Tan",
        cuisine: "vietnamese",
        rating: 4.4,
        address: "6816 Ranchester Dr, Houston, TX 77036",
        lat: 29.7558,
        lng: -95.4894,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },

    // Chinese Restaurants
    {
        name: "Peking Cuisine",
        cuisine: "chinese",
        rating: 4.5,
        address: "8332 Spring Branch Dr, Houston, TX 77080",
        lat: 29.7658,
        lng: -95.5194,
        city: "Houston",
        state: "TX",
        zipcode: "77080"
    },
    {
        name: "Sichuan Cuisine",
        cuisine: "chinese",
        rating: 4.6,
        address: "9889 Bellaire Blvd, Houston, TX 77036",
        lat: 29.7758,
        lng: -95.5094,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Ocean Palace",
        cuisine: "chinese",
        rating: 4.3,
        address: "11215 Bellaire Blvd, Houston, TX 77072",
        lat: 29.7858,
        lng: -95.5994,
        city: "Houston",
        state: "TX",
        zipcode: "77072"
    },
    {
        name: "Golden Palace",
        cuisine: "chinese",
        rating: 4.2,
        address: "9580 Bellaire Blvd, Houston, TX 77036",
        lat: 29.7958,
        lng: -95.4894,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Fufu Cafe",
        cuisine: "chinese",
        rating: 4.4,
        address: "9889 Bellaire Blvd, Houston, TX 77036",
        lat: 29.8058,
        lng: -95.4794,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Dim Sum King",
        cuisine: "chinese",
        rating: 4.3,
        address: "9888 Bellaire Blvd, Houston, TX 77036",
        lat: 29.8158,
        lng: -95.4694,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },

    // Japanese Restaurants
    {
        name: "Kura Revolving Sushi Bar",
        cuisine: "japanese",
        rating: 4.2,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.6091,
        lng: -95.8521,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Genki Sushi",
        cuisine: "japanese",
        rating: 4.3,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6207,
        lng: -95.2813,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Nippon Daiko",
        cuisine: "japanese",
        rating: 4.5,
        address: "4606 Fm 1960 Rd W, Houston, TX 77069",
        lat: 29.8258,
        lng: -95.4594,
        city: "Houston",
        state: "TX",
        zipcode: "77069"
    },
    {
        name: "Roka Akor",
        cuisine: "japanese",
        rating: 4.6,
        address: "2929 Weslayan St, Houston, TX 77027",
        lat: 29.8358,
        lng: -95.4494,
        city: "Houston",
        state: "TX",
        zipcode: "77027"
    },
    {
        name: "Sushi Miyagi",
        cuisine: "japanese",
        rating: 4.4,
        address: "6345 Westheimer Rd, Houston, TX 77057",
        lat: 29.8458,
        lng: -95.4394,
        city: "Houston",
        state: "TX",
        zipcode: "77057"
    },
    {
        name: "Oishi Buffet",
        cuisine: "japanese",
        rating: 4.1,
        address: "7320 Southwest Fwy, Houston, TX 77074",
        lat: 29.8558,
        lng: -95.4294,
        city: "Houston",
        state: "TX",
        zipcode: "77074"
    },

    // Venezuelan Restaurants
    {
        name: "Caracas Arepa Bar",
        cuisine: "venezuelan",
        rating: 4.5,
        address: "1519 Fairview St, Houston, TX 77019",
        lat: 29.8658,
        lng: -95.4194,
        city: "Houston",
        state: "TX",
        zipcode: "77019"
    },
    {
        name: "Tequeños & More",
        cuisine: "venezuelan",
        rating: 4.4,
        address: "8347 Long Point Rd, Houston, TX 77055",
        lat: 29.8758,
        lng: -95.4094,
        city: "Houston",
        state: "TX",
        zipcode: "77055"
    },
    {
        name: "Arepas Cafe",
        cuisine: "venezuelan",
        rating: 4.3,
        address: "2630 Hillcroft St, Houston, TX 77057",
        lat: 29.8858,
        lng: -95.3994,
        city: "Houston",
        state: "TX",
        zipcode: "77057"
    },
    {
        name: "Venezuela Food & Liquor",
        cuisine: "venezuelan",
        rating: 4.2,
        address: "1040 Gessner Rd, Houston, TX 77055",
        lat: 29.8958,
        lng: -95.3894,
        city: "Houston",
        state: "TX",
        zipcode: "77055"
    },

    // Central American Restaurants
    {
        name: "Pupuseria Dona Azucena",
        cuisine: "salvadoran",
        rating: 4.6,
        address: "2436 Bissonnet St, Houston, TX 77005",
        lat: 29.9058,
        lng: -95.3794,
        city: "Houston",
        state: "TX",
        zipcode: "77005"
    },
    {
        name: "El Pupusódromo",
        cuisine: "salvadoran",
        rating: 4.5,
        address: "5474 Telephone Rd, Houston, TX 77087",
        lat: 29.9158,
        lng: -95.3694,
        city: "Houston",
        state: "TX",
        zipcode: "77087"
    },
    {
        name: "Antojitos Hondureños",
        cuisine: "honduran",
        rating: 4.4,
        address: "6917 Long Point Rd, Houston, TX 77055",
        lat: 29.9258,
        lng: -95.3594,
        city: "Houston",
        state: "TX",
        zipcode: "77055"
    },
    {
        name: "Restaurante Guatemala",
        cuisine: "guatemalan",
        rating: 4.3,
        address: "8201 Long Point Rd, Houston, TX 77055",
        lat: 29.9358,
        lng: -95.3494,
        city: "Houston",
        state: "TX",
        zipcode: "77055"
    },

    // Caribbean Restaurants
    {
        name: "Reggae Hut Cafe",
        cuisine: "caribbean",
        rating: 4.5,
        address: "4814 Almeda Rd, Houston, TX 77004",
        lat: 29.9458,
        lng: -95.3394,
        city: "Houston",
        state: "TX",
        zipcode: "77004"
    },
    {
        name: "Irie Jamaican Kitchen",
        cuisine: "caribbean",
        rating: 4.4,
        address: "2442 Times Blvd, Houston, TX 77005",
        lat: 29.9558,
        lng: -95.3294,
        city: "Houston",
        state: "TX",
        zipcode: "77005"
    },
    {
        name: "Caribbean Kitchen",
        cuisine: "caribbean",
        rating: 4.3,
        address: "5623 Selinsky Rd, Houston, TX 77048",
        lat: 29.9658,
        lng: -95.3194,
        city: "Houston",
        state: "TX",
        zipcode: "77048"
    },
    {
        name: "Jerk Chicken Palace",
        cuisine: "caribbean",
        rating: 4.2,
        address: "5502 Almeda Rd, Houston, TX 77004",
        lat: 29.9758,
        lng: -95.3094,
        city: "Houston",
        state: "TX",
        zipcode: "77004"
    },

    // African Restaurants
    {
        name: "Pondichéri",
        cuisine: "african",
        rating: 4.6,
        address: "2800 Kirby Dr, Houston, TX 77098",
        lat: 29.9858,
        lng: -95.2994,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "Yassa African Restaurant",
        cuisine: "african",
        rating: 4.5,
        address: "4411 Montrose Blvd, Houston, TX 77006",
        lat: 29.9958,
        lng: -95.2894,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Addis Red Sea",
        cuisine: "ethiopian",
        rating: 4.4,
        address: "9919 Hillcroft St, Houston, TX 77036",
        lat: 30.0058,
        lng: -95.2794,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Blue Nile Ethiopian",
        cuisine: "ethiopian",
        rating: 4.3,
        address: "9400 Richmond Ave, Houston, TX 77063",
        lat: 30.0158,
        lng: -95.2694,
        city: "Houston",
        state: "TX",
        zipcode: "77063"
    },

    // Indian Restaurants
    {
        name: "Pondicheri Modern Indian",
        cuisine: "indian",
        rating: 4.6,
        address: "2800 Kirby Dr, Houston, TX 77098",
        lat: 30.0258,
        lng: -95.2594,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },
    {
        name: "Himalaya Palace",
        cuisine: "pakistani",
        rating: 4.5,
        address: "5938 Hillcroft St, Houston, TX 77036",
        lat: 30.0358,
        lng: -95.2494,
        city: "Houston",
        state: "TX",
        zipcode: "77036"
    },
    {
        name: "Pondicheri Heights",
        cuisine: "indian",
        rating: 4.4,
        address: "4410 Westheimer Rd, Houston, TX 77027",
        lat: 30.0458,
        lng: -95.2394,
        city: "Houston",
        state: "TX",
        zipcode: "77027"
    },
    {
        name: "Rajwadi Indian Cuisine",
        cuisine: "indian",
        rating: 4.3,
        address: "11002 Westheimer Rd, Houston, TX 77042",
        lat: 30.0558,
        lng: -95.2294,
        city: "Houston",
        state: "TX",
        zipcode: "77042"
    },
    {
        name: "Pondicheri Memorial",
        cuisine: "indian",
        rating: 4.5,
        address: "1834 Westheimer Rd, Houston, TX 77098",
        lat: 30.0658,
        lng: -95.2194,
        city: "Houston",
        state: "TX",
        zipcode: "77098"
    },

    // Additional Popular Chains and Local Favorites
    {
        name: "Cafe Express",
        cuisine: "american",
        rating: 4.1,
        address: "1520 Westheimer Rd, Houston, TX 77006",
        lat: 29.6107,
        lng: -95.2713,
        city: "Houston",
        state: "TX",
        zipcode: "77006"
    },
    {
        name: "Potbelly Sandwich Shop",
        cuisine: "american",
        rating: 4.0,
        address: "23501 Cinco Ranch Blvd, Katy, TX 77494",
        lat: 29.5991,
        lng: -95.8621,
        city: "Katy",
        state: "TX",
        zipcode: "77494"
    },
    {
        name: "Panera Bread",
        cuisine: "american",
        rating: 4.1,
        address: "1201 Lake Woodlands Dr, The Woodlands, TX 77380",
        lat: 30.0288,
        lng: -95.3613,
        city: "The Woodlands",
        state: "TX",
        zipcode: "77380"
    },
    {
        name: "Corner Bakery Cafe",
        cuisine: "american",
        rating: 4.0,
        address: "2831 Town Center Blvd, Sugar Land, TX 77479",
        lat: 29.4844,
        lng: -95.5349,
        city: "Sugar Land",
        state: "TX",
        zipcode: "77479"
    }
];

let map = null;
let currentResults = [];
let userLocation = { lat: 29.7604, lng: -95.3698 }; // Default to Houston center

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    document.getElementById('showList').addEventListener('click', () => searchAndShow('list'));
    document.getElementById('showMap').addEventListener('click', () => searchAndShow('map'));
    document.getElementById('randomPick').addEventListener('click', () => searchAndShow('random'));
    document.getElementById('pickAnother').addEventListener('click', showRandomResult);
    document.getElementById('useLocationBtn').addEventListener('click', requestUserLocation);
}