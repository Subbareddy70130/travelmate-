export const destinations = [
    {
        id: 1,
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
        rating: 4.9,
        reviews: 2450,
        description: "Tropical paradise with lush jungles, pristine beaches, and ancient temples. Bali offers a spiritual and adventurous experience like no other destination.",
        bestTimeToVisit: "April to October",
        priceEstimate: "₹45,000 onwards",
        category: "Tropical",
        popularFoods: ["Babi Guling", "Nasi Goreng", "Sate Lilit", "Lawar"],
        visitingPlaces: ["Uluwatu Temple", "Tegallalang Rice Terrace", "Sacred Monkey Forest Sanctuary", "Mount Batur"],
        itinerary: [
            { day: 1, morning: "Visit Uluwatu Temple", afternoon: "Relax at Jimbaran Beach", evening: "Seafood dinner by the coast" },
            { day: 2, morning: "Explore Tegallalang Rice Terrace", afternoon: "Sacred Monkey Forest", evening: "Ubud Art Market" },
            { day: 3, morning: "Spiritual visit to Tirta Empul", afternoon: "Tegenungan Waterfall", evening: "Traditional Kecak Dance" }
        ]
    },
    {
        id: 2,
        name: "Paris, France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop",
        rating: 4.8,
        reviews: 3120,
        description: "The city of light, romance, and world-class art. Home to iconic landmarks, charming cafes, and high-end fashion boutiques.",
        bestTimeToVisit: "June to August",
        priceEstimate: "₹85,000 onwards",
        category: "City",
        popularFoods: ["Croissants", "Escargot", "Macarons", "Coq au Vin"],
        visitingPlaces: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre"],
        itinerary: [
            { day: 1, morning: "Louvre Museum tour", afternoon: "Walk through Tuileries Garden", evening: "Seine River Cruise" },
            { day: 2, morning: "Eiffel Tower climb", afternoon: "Champ de Mars picnic", evening: "Dinner in Le Marais" },
            { day: 3, morning: "Montmartre artist quarter", afternoon: "Sacré-Cœur Basilica", evening: "Cabaret show at Moulin Rouge" }
        ]
    },
    {
        id: 3,
        name: "Goa, India",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop",
        rating: 4.7,
        reviews: 1840,
        description: "Vibrant nightlife, serene beaches on the Arabian Sea, and Portuguese-influenced architecture. Goa is India's ultimate beach retreat.",
        bestTimeToVisit: "November to February",
        priceEstimate: "₹12,000 onwards",
        category: "Beach",
        popularFoods: ["Fish Curry", "Bebinca", "Feni", "Pork Vindaloo"],
        visitingPlaces: ["Baga Beach", "Basilica of Bom Jesus", "Dudhsagar Falls", "Aguada Fort"],
        itinerary: [
            { day: 1, morning: "North Goa beach hopping", afternoon: "Water sports at Baga", evening: "Beach shack party" },
            { day: 2, morning: "Old Goa heritage tour", afternoon: "Basilica of Bom Jesus", evening: "Sunset at Chapora Fort" },
            { day: 3, morning: "Dudhsagar Falls excursion", afternoon: "Spice plantation tour", evening: "Mandovi River cruise" }
        ]
    },
    {
        id: 4,
        name: "Switzerland",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop",
        rating: 4.9,
        reviews: 1560,
        description: "Breathtaking Alps, crystal clear mountain lakes, and efficient cities. Switzerland offers unparalleled natural beauty and adventure.",
        bestTimeToVisit: "July to September",
        priceEstimate: "₹1,20,000 onwards",
        category: "Adventure",
        popularFoods: ["Cheese Fondue", "Rösti", "Swiss Chocolate", "Zürcher Geschnetzeltes"],
        visitingPlaces: ["Matterhorn", "Jungfraujoch", "Lake Geneva", "Lucerne Chapel Bridge"],
        itinerary: [
            { day: 1, morning: "Lucerne city tour", afternoon: "Lake Lucerne boat ride", evening: "Mount Pilatus sunset" },
            { day: 2, morning: "Jungfraujoch - Top of Europe", afternoon: "Ice Palace exploration", evening: "Interlaken stay" },
            { day: 3, morning: "Zermatt village walk", afternoon: "Matterhorn view point", evening: "Swiss fondue dinner" }
        ]
    },
    {
        id: 5,
        name: "Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop",
        rating: 5.0,
        reviews: 980,
        description: "Ultimate luxury overwater villas, turquoise lagoons, and world-class diving. The Maldives is a tropical dream destination.",
        bestTimeToVisit: "November to April",
        priceEstimate: "₹95,000 onwards",
        category: "Luxury",
        popularFoods: ["Garudhiya", "Mas Huni", "Hedhikaa", "Theluli Mas"],
        visitingPlaces: ["Male", "Maafushi", "Vaadhoo Island", "Baa Atoll"],
        itinerary: [
            { day: 1, morning: "Arrival at resort", afternoon: "Snorkeling at house reef", evening: "Sunset beach dinner" },
            { day: 2, morning: "Scuba diving excursion", afternoon: "Spa treatment", evening: "Starlight cinema" },
            { day: 3, morning: "Sandbank picnic", afternoon: "Dolphin watching cruise", evening: "Farewell cocktail" }
        ]
    },
    {
        id: 6,
        name: "Kerala, India",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop",
        rating: 4.8,
        reviews: 2150,
        description: "God's Own Country with serene backwaters, lush hill stations, and Ayurvedic wellness. A perfect blend of nature and culture.",
        bestTimeToVisit: "September to March",
        priceEstimate: "₹15,000 onwards",
        category: "Nature",
        popularFoods: ["Appam with Stew", "Karimeen Pollichathu", "Sadhya", "Malabar Parotta"],
        visitingPlaces: ["Munnar", "Alleppey Backwaters", "Wayanad", "Thekkady"],
        itinerary: [
            { day: 1, morning: "Munnar tea gardens", afternoon: "Eravikulam National Park", evening: "Munnar town market" },
            { day: 2, morning: "Alleppey houseboat check-in", afternoon: "Backwater cruise", evening: "Overnight on houseboat" },
            { day: 3, morning: "Fort Kochi walk", afternoon: "Chinese Fishing Nets", evening: "Kathakali performance" }
        ]
    },
    {
        id: 7,
        name: "Bangkok, Thailand",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7cbf1ba5?w=800&auto=format&fit=crop",
        rating: 4.6,
        reviews: 4200,
        description: "Bustling cityscapes, ornate shrines, and vibrant street life. Bangkok is famous for its street food and cultural heritage.",
        bestTimeToVisit: "November to February",
        priceEstimate: "₹35,000 onwards",
        category: "City",
        popularFoods: ["Pad Thai", "Tom Yum Goong", "Som Tum", "Mango Sticky Rice"],
        visitingPlaces: ["Grand Palace", "Wat Arun", "Chatuchak Market", "Wat Phra Kaew"],
        itinerary: [
            { day: 1, morning: "Grand Palace visit", afternoon: "Wat Arun & Wat Pho", evening: "Chao Phraya River cruise" },
            { day: 2, morning: "Chatuchak Weekend Market", afternoon: "Siam Square shopping", evening: "Khaosan Road nightlife" },
            { day: 3, morning: "Floating Market tour", afternoon: "Maeklong Railway Market", evening: "Rooftop bar dinner" }
        ]
    },
    {
        id: 8,
        name: "Tokyo, Japan",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
        rating: 4.9,
        reviews: 3800,
        description: "A neon-lit metropolis where futuristic technology meets traditional temples. Tokyo is a world unto itself.",
        bestTimeToVisit: "March to May (Sakura Season)",
        priceEstimate: "₹90,000 onwards",
        category: "City",
        popularFoods: ["Sushi", "Ramen", "Tempura", "Yakitori"],
        visitingPlaces: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Tower", "Meiji Jingu Shrine"],
        itinerary: [
            { day: 1, morning: "Senso-ji Temple", afternoon: "Akihabara exploration", evening: "Shibuya Crossing at night" },
            { day: 2, morning: "Meiji Jingu Shrine", afternoon: "Harajuku fashion street", evening: "Shinjuku Golden Gai dinner" },
            { day: 3, morning: "Tsukiji Outer Market", afternoon: "TeamLab Borderless", evening: "Tokyo Skytree views" }
        ]
    },
    {
        id: 9,
        name: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop",
        rating: 4.7,
        reviews: 5200,
        description: "The city of gold, skyscrapers, and desert adventures. Dubai is home to the world's tallest building and largest mall.",
        bestTimeToVisit: "November to March",
        priceEstimate: "₹65,000 onwards",
        category: "Luxury",
        popularFoods: ["Shawarma", "Al Harees", "Luqaimat", "Dates"],
        visitingPlaces: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Desert Safari"],
        itinerary: [
            { day: 1, morning: "Burj Khalifa views", afternoon: "Dubai Mall shopping", evening: "Dubai Fountain show" },
            { day: 2, morning: "Palm Jumeirah beach", afternoon: "Aquaventure Waterpark", evening: "Marina dhow cruise" },
            { day: 3, morning: "Desert Safari tour", afternoon: "Camel riding", evening: "Belly dance & BBQ dinner" }
        ]
    },
    {
        id: 10,
        name: "London, UK",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop",
        rating: 4.8,
        reviews: 3500,
        description: "A historic city blending royal heritage with modern culture. Walk through centuries of history on every street.",
        bestTimeToVisit: "May to September",
        priceEstimate: "₹95,000 onwards",
        category: "City",
        popularFoods: ["Fish & Chips", "English Breakfast", "Sunday Roast", "Afternoon Tea"],
        visitingPlaces: ["Big Ben", "London Eye", "Tower Bridge", "Buckingham Palace"],
        itinerary: [
            { day: 1, morning: "Buckingham Palace", afternoon: "Hyde Park stroll", evening: "West End musical show" },
            { day: 2, morning: "Tower of London", afternoon: "Tower Bridge walk", evening: "Borough Market food tour" },
            { day: 3, morning: "British Museum", afternoon: "Covent Garden market", evening: "South Bank walk" }
        ]
    },
    {
        id: 11,
        name: "New York, USA",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop",
        rating: 4.9,
        reviews: 6100,
        description: "The Big Apple, featuring iconic skylines, Broadway shows, and Central Park. The city that never sleeps.",
        bestTimeToVisit: "September to November",
        priceEstimate: "₹1,40,000 onwards",
        category: "City",
        popularFoods: ["NY Pizza", "Bagels", "Cheesecake", "Pastrami Sandwich"],
        visitingPlaces: ["Times Square", "Statue of Liberty", "Central Park", "Empire State Building"],
        itinerary: [
            { day: 1, morning: "Statue of Liberty ferry", afternoon: "Financial District", evening: "One World Observatory" },
            { day: 2, morning: "Central Park exploration", afternoon: "Metropolitan Museum of Art", evening: "Broadway show" },
            { day: 3, morning: "High Line walk", afternoon: "Chelsea Market", evening: "Times Square at night" }
        ]
    },
    {
        id: 12,
        name: "Singapore",
        image: "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?w=800&auto=format&fit=crop",
        rating: 4.8,
        reviews: 4500,
        description: "A garden city state with futuristic architecture, diverse culture, and incredible street food.",
        bestTimeToVisit: "February to April",
        priceEstimate: "₹55,000 onwards",
        category: "City",
        popularFoods: ["Chili Crab", "Hainanese Chicken Rice", "Laksa", "Satay"],
        visitingPlaces: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa Island", "Universal Studios"],
        itinerary: [
            { day: 1, morning: "Gardens by the Bay", afternoon: "Cloud Forest & Flower Dome", evening: "Marina Bay Light Show" },
            { day: 2, morning: "Sentosa Island tour", afternoon: "Universal Studios Singapore", evening: "Siloso Beach relaxation" },
            { day: 3, morning: "Little India culture", afternoon: "Chinatown heritage", evening: "Clarke Quay dinner" }
        ]
    }
];
