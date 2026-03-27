SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE trip_itineraries;
TRUNCATE TABLE trips;
TRUNCATE TABLE buses;
TRUNCATE TABLE trains;
TRUNCATE TABLE flights;
TRUNCATE TABLE restaurants;
TRUNCATE TABLE hotels;
TRUNCATE TABLE places;
TRUNCATE TABLE destinations;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Users
INSERT IGNORE INTO users (username, password, first_name, last_name, email, phone_number, created_at) VALUES 
('john_doe', '$2a$10$xyz', 'John', 'Doe', 'john@example.com', '1234567890', CURRENT_TIMESTAMP),
('testuser', '$2a$10$xyz', 'Test', 'User', 'testuser@example.com', '0987654321', CURRENT_TIMESTAMP);

-- Destinations
INSERT IGNORE INTO destinations (name, country, description, image_url, best_time_to_visit, rating, category) VALUES 
('Bali', 'Indonesia', 'Island of the Gods', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop', 'Apr-Oct', 4.8, 'Tropical'),
('Paris', 'France', 'The City of Light', 'https://images.unsplash.com/photo-1502602898657-3e90760b3713?w=800&auto=format&fit=crop', 'Jun-Aug', 4.9, 'Romantic'),
('Tokyo', 'Japan', 'Neon City Dreams', 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&auto=format&fit=crop', 'Mar-May', 4.9, 'Urban'),
('India', 'India', 'The majestic subcontinent', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7c3?w=800&auto=format&fit=crop', 'Oct-Mar', 4.8, 'Cultural'),
('Bangkok', 'Thailand', 'City of Angels', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop', 'Nov-Feb', 4.7, 'Urban'),
('Rome', 'Italy', 'The Eternal City', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop', 'Sep-Nov', 4.9, 'Historical'),
('Istanbul', 'Turkey', 'Where East Meets West', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop', 'Apr-Nov', 4.8, 'Cultural'),
('Barcelona', 'Spain', 'Gaudí’s Playground', 'https://images.unsplash.com/photo-1583422409516-1500d8692795?w=800&auto=format&fit=crop', 'May-Sep', 4.8, 'Coastal'),
('Switzerland', 'Switzerland', 'Alpine Majesty', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop', 'Jun-Aug', 4.9, 'Mountain'),
('Patagonia', 'Argentina', 'The End of the World', 'https://images.unsplash.com/photo-1518182170546-076616fdacaf?w=800&auto=format&fit=crop', 'Nov-Mar', 4.9, 'Nature'),
('Chile', 'Chile', 'Between Andes and Ocean', 'https://images.unsplash.com/photo-1490216788543-9892697b0a3c?w=800&auto=format&fit=crop', 'Sep-Nov', 4.6, 'Nature'),
('Great Barrier Reef', 'Australia', 'Underwater Wonder', 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&auto=format&fit=crop', 'Jun-Oct', 4.9, 'Tropical'),
('Cappadocia', 'Turkey', 'Land of Fairy Chimneys', 'https://images.unsplash.com/photo-1584941659728-66487eec1939?w=800&auto=format&fit=crop', 'Apr-Jun', 4.8, 'Adventure');

-- Places
INSERT IGNORE INTO places (destination_id, place_name, description, image_url) VALUES 
(1, 'Ubud Monkey Forest', 'Nature Reserve', 'https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?w=800&auto=format&fit=crop'),
(2, 'Eiffel Tower', 'Iconic Landmark', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop'),
(3, 'Sensō-ji', 'Ancient Temple in Asakusa', 'https://images.unsplash.com/photo-1532236395709-7d70320fce8b?w=800&auto=format&fit=crop'),
(4, 'Taj Mahal', 'Monument of Love', 'https://images.unsplash.com/photo-1564507592209-482a9d80327f?w=800&auto=format&fit=crop'),
(5, 'Grand Palace', 'Royal Complex', 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop'),
(6, 'Colosseum', 'Ancient Amphitheatre', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop'),
(7, 'Hagia Sophia', 'Byzantine Masterpiece', 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop'),
(8, 'Sagrada Familia', 'Gaudís Icon', 'https://images.unsplash.com/photo-1583422409516-1500d8692795?w=800&auto=format&fit=crop'),
(9, 'Matterhorn', 'Iconic Alpine Peak', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop'),
(10, 'Perito Moreno Glacier', 'Massive Ice Formation', 'https://images.unsplash.com/photo-1518182170546-076616fdacaf?w=800&auto=format&fit=crop'),
(11, 'Torres del Paine', 'National Park Peaks', 'https://images.unsplash.com/photo-1490216788543-9892697b0a3c?w=800&auto=format&fit=crop'),
(12, 'Heart Reef', 'Coral Composition', 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&auto=format&fit=crop'),
(13, 'Göreme Valley', 'Hot Air Balloon Spot', 'https://images.unsplash.com/photo-1584941659728-66487eec1939?w=800&auto=format&fit=crop');

-- Hotels
INSERT IGNORE INTO hotels (destination_id, name, location, rating, price_per_night, image_url) VALUES 
(1, 'Bali Beach Resort', 'Kuta Beach', 4.8, 12000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'),
(2, 'Le Meurice', '1st Arrondissement', 4.9, 45000, 'https://images.unsplash.com/photo-1551882547-ff40c0d5b9af?w=800&auto=format&fit=crop'),
(3, 'Aman Tokyo', 'Otemachi Tower', 4.9, 65000, 'https://images.unsplash.com/photo-1542314831-c6a4d14b8ba0?w=800&auto=format&fit=crop'),
(4, 'The Oberoi Amarvilas', 'Agra', 5.0, 45000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'),
(5, 'Mandarin Oriental', 'Riverside', 4.9, 25000, 'https://images.unsplash.com/photo-1551882547-ff40c0d5b9af?w=800&auto=format&fit=crop'),
(6, 'Hotel Eden', 'Via Veneto', 4.8, 40000, 'https://images.unsplash.com/photo-1542314831-c6a4d14b8ba0?w=800&auto=format&fit=crop'),
(7, 'Ciragan Palace Kempinski', 'Bosphorus', 4.9, 50000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'),
(8, 'W Barcelona', 'Barceloneta', 4.7, 30000, 'https://images.unsplash.com/photo-1551882547-ff40c0d5b9af?w=800&auto=format&fit=crop'),
(9, 'The Dolder Grand', 'Zurichberg', 4.9, 60000, 'https://images.unsplash.com/photo-1542314831-c6a4d14b8ba0?w=800&auto=format&fit=crop'),
(10, 'Explora Patagonia', 'Torres del Paine', 4.9, 55000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'),
(11, 'The Singular Patagonia', 'Puerto Bories', 4.8, 45000, 'https://images.unsplash.com/photo-1551882547-ff40c0d5b9af?w=800&auto=format&fit=crop'),
(12, 'Qualia', 'Hamilton Island', 5.0, 80000, 'https://images.unsplash.com/photo-1542314831-c6a4d14b8ba0?w=800&auto=format&fit=crop'),
(13, 'Museum Hotel', 'Uchisar', 4.9, 35000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop');

-- Restaurants
INSERT IGNORE INTO restaurants (destination_id, name, location, cuisine, rating, image_url) VALUES 
(1, 'Locavore', 'Ubud', 'Modern Indonesian', 4.7, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'),
(2, 'Le Jules Verne', 'Eiffel Tower', 'French Fine Dining', 4.8, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop'),
(3, 'Sukiyabashi Jiro', 'Ginza', 'Sushi', 4.9, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop'),
(4, 'Indian Accent', 'New Delhi', 'Modern Indian', 4.9, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'),
(5, 'Gaggan Anand', 'Bangkok', 'Progressive Indian', 4.9, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop'),
(6, 'La Pergola', 'Rome', 'Italian Fine Dining', 4.9, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop'),
(7, 'Mikla', 'Istanbul', 'New Anatolian', 4.8, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'),
(8, 'Disfrutar', 'Barcelona', 'Mediterranean', 4.9, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop'),
(9, 'Kronenhalle', 'Zurich', 'Swiss Classic', 4.7, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop'),
(10, 'El Boliche del Viejo Alberto', 'El Calafate', 'Argentine Grill', 4.6, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'),
(11, 'Boragó', 'Santiago', 'Endemic Chilean', 4.9, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop'),
(12, 'Ochre Restaurant', 'Cairns', 'Modern Australian', 4.7, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop'),
(13, 'Seki Restaurant', 'Cappadocia', 'Turkish Traditional', 4.8, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop');

-- Flights
INSERT IGNORE INTO flights (airline, departure_city, arrival_city, departure_time, arrival_time, duration, price) VALUES 
('Garuda Indonesia', 'Delhi', 'Bali', '2026-04-10 10:00:00', '2026-04-10 20:00:00', '10h 0m', 35000),
('Air France', 'Mumbai', 'Paris', '2026-04-12 02:00:00', '2026-04-12 08:30:00', '10h 30m', 45000),
('Japan Airlines', 'Bangalore', 'Tokyo', '2026-04-15 22:00:00', '2026-04-16 09:30:00', '8h 0m', 50000),
('Garuda Indonesia', 'Jakarta', 'Bali (Denpasar)', '2026-05-10 08:00:00', '2026-05-10 09:55:00', '1h 55m', 8000),
('Lion Air', 'Surabaya', 'Bali', '2026-05-11 12:00:00', '2026-05-11 13:00:00', '1h', 4500),
('Indonesia AirAsia', 'Kuala Lumpur', 'Bali', '2026-05-12 14:00:00', '2026-05-12 17:00:00', '3h', 9500),
('Singapore Airlines', 'Singapore', 'Bali', '2026-05-13 16:20:00', '2026-05-13 19:00:00', '2h 40m', 15000),
('Air India', 'Delhi', 'Bali', '2026-05-14 22:00:00', '2026-05-15 06:00:00', '8h', 32000),
('Air France', 'London', 'Paris', '2026-05-16 08:00:00', '2026-05-16 09:20:00', '1h 20m', 9000),
('British Airways', 'London', 'Paris', '2026-05-17 10:00:00', '2026-05-17 11:15:00', '1h 15m', 11000),
('Emirates', 'Dubai', 'Paris', '2026-05-18 14:00:00', '2026-05-18 21:00:00', '7h', 35000),
('Air India', 'Delhi', 'Paris', '2026-05-19 22:00:00', '2026-05-20 07:00:00', '9h', 40000),
('Lufthansa', 'Frankfurt', 'Paris', '2026-05-21 12:00:00', '2026-05-21 13:30:00', '1h 30m', 12000),
('Japan Airlines', 'Osaka', 'Tokyo', '2026-05-22 08:00:00', '2026-05-22 09:10:00', '1h 10m', 8000),
('All Nippon Airways', 'Sapporo', 'Tokyo', '2026-05-23 10:00:00', '2026-05-23 11:30:00', '1h 30m', 9500),
('Singapore Airlines', 'Singapore', 'Tokyo', '2026-05-24 14:00:00', '2026-05-24 21:00:00', '7h', 40000),
('Air India', 'Delhi', 'Tokyo', '2026-05-25 22:00:00', '2026-05-26 06:30:00', '8h 30m', 45000),
('Korean Air', 'Seoul', 'Tokyo', '2026-05-27 12:00:00', '2026-05-27 14:20:00', '2h 20m', 15000),
('Turkish Airlines', 'TK1001', 'Istanbul', 'Rome', '2026-06-01 10:00:00', '2026-06-01 12:40:00', '2h 40m', 12000),
('Swiss International', 'LX234', 'Zurich', 'Barcelona', '2026-06-02 08:00:00', '2026-06-02 09:50:00', '1h 50m', 9000),
('Thai Airways', 'TG315', 'Bangkok', 'Delhi', '2026-06-03 14:00:00', '2026-06-03 18:15:00', '4h 15m', 15000),
('LATAM Airlines', 'LA842', 'Santiago', 'Buenos Aires', '2026-06-04 16:00:00', '2026-06-04 18:00:00', '2h', 10000),
('Qantas', 'QF902', 'Cairns', 'Sydney', '2026-06-05 09:00:00', '2026-06-05 12:00:00', '3h', 14000);

-- Trains
INSERT IGNORE INTO trains (train_name, departure_station, arrival_station, travel_time, price) VALUES 
('Eurostar', 'London', 'Paris', '2h 20m', 12000),
('Shinkansen', 'Tokyo', 'Osaka', '2h 30m', 8000),
('Glacier Express', 'Zermatt', 'St. Moritz', '7h 10m', 15000),
('Mutiara Timur', 'Surabaya', 'Banyuwangi', '6h', 900),
('Wijayakusuma', 'Yogyakarta', 'Banyuwangi', '10h', 1200),
('Probowangi', 'Surabaya', 'Ketapang', '5h', 700),
('TGV 6201', 'Paris', 'Lyon', '2h', 4500),
('Eurostar 9024', 'Paris', 'London', '2h 20m', 8000),
('Thalys 9423', 'Paris', 'Brussels', '1h 25m', 5000),
('TGV 5454', 'Paris', 'Marseille', '3h 10m', 6500),
('Nozomi 21', 'Tokyo', 'Osaka', '2h 30m', 8000),
('Hikari 515', 'Tokyo', 'Kyoto', '2h 40m', 7500),
('Hayabusa 11', 'Tokyo', 'Sendai', '1h 30m', 6500),
('Kagayaki 503', 'Tokyo', 'Kanazawa', '2h 30m', 7800),
('Frecciarossa', 'Rome', 'Florence', '1h 30m', 3500),
('AVE', 'Barcelona', 'Madrid', '2h 30m', 6000),
('SBB InterCity', 'Zurich', 'Geneva', '2h 45m', 5000),
('Yüksek Hızlı Tren', 'Istanbul', 'Ankara', '4h', 1500),
('Vande Bharat Express', 'New Delhi', 'Varanasi', '8h', 1200);

-- Buses
INSERT IGNORE INTO buses (company, departure, arrival, duration, price) VALUES 
('FlixBus', 'Paris', 'Amsterdam', '8h 30m', 3500),
('Kura Kura', 'Ubud', 'Kuta', '2h 0m', 500),
('Willer Express', 'Tokyo', 'Kyoto', '7h 30m', 4500),
('Kura-Kura Bus', 'Kuta', 'Ubud', '1h 30m', 300),
('Perama Tour & Travel', 'Denpasar', 'Lovina', '3h', 600),
('Sarbagita Bus System', 'Denpasar', 'Nusa Dua', '1h', 100),
('Perama', 'Kuta', 'Padang Bai', '2h', 500),
('FlixBus', 'Paris', 'Brussels', '4h', 1500),
('FlixBus', 'Paris', 'Amsterdam', '7h', 2000),
('BlaBlaBus', 'Paris', 'Lyon', '6h', 1800),
('BlaBlaBus', 'Paris', 'Lille', '3h', 1200),
('Willer Express', 'Tokyo', 'Kyoto', '7h', 3000),
('Willer Express', 'Tokyo', 'Osaka', '8h', 3500),
('JR Bus', 'Tokyo', 'Mount Fuji', '2h 30m', 1800),
('JR Bus', 'Tokyo', 'Yokohama', '1h', 700),
('Alsa', 'Barcelona', 'Madrid', '7h', 3000),
('Metro Turizm', 'Istanbul', 'Cappadocia', '10h', 2500),
('Cruz del Sur', 'Santiago', 'Valparaiso', '1h 30m', 600),
('Greyhound Australia', 'Cairns', 'Townsville', '5h', 2000),
('Swiss PostBus', 'Zurich', 'Lucerne', '1h', 800);

-- Trips
INSERT IGNORE INTO trips (id, destination_id, title, duration, description, best_season, image_url) VALUES 
(1, 1, 'Bali Explorer', '7 Days', 'Comprehensive tour of Bali', 'Summer', 'https://images.unsplash.com/photo-1554481923-a6918bd997bc?w=800&auto=format&fit=crop'),
(2, 2, 'Romantic Paris', '5 Days', 'Discover the magic of Paris', 'Spring', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop'),
(3, 3, 'Classic Japan', '10 Days', 'Golden route of Japan', 'Autumn', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop'),
(4, 4, 'Golden Triangle Tour', '8 Days', 'Experience the heart of India', 'Winter', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7c3?w=800&auto=format&fit=crop'),
(5, 6, 'Italian Renaissance', '7 Days', 'Rome, Florence, and Venice', 'Spring', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop'),
(6, 9, 'Swiss Alps Explorer', '10 Days', 'Breathtaking mountain vistas', 'Summer', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop'),
(7, 5, 'Bangkok City Lights', '5 Days', 'Explore the vibrant streets and temples of Bangkok.', 'Nov-Feb', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop'),
(8, 7, 'Istanbul Crossroads', '6 Days', 'Experience where East meets West in historic Istanbul.', 'Apr-Nov', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop'),
(9, 8, 'Spanish Coast Discovery', '7 Days', 'The best of Barcelona and the Mediterranean coast.', 'May-Sep', 'https://images.unsplash.com/photo-1583422409516-1500d8692795?w=800&auto=format&fit=crop'),
(10, 10, 'Patagonia Glaciers', '8 Days', 'A journey to the end of the world in Argentina.', 'Nov-Mar', 'https://images.unsplash.com/photo-1518182170546-076616fdacaf?w=800&auto=format&fit=crop'),
(11, 11, 'Chilean Adventure', '10 Days', 'From the Andes to the Pacific coast of Chile.', 'Sep-Nov', 'https://images.unsplash.com/photo-1490216788543-9892697b0a3c?w=800&auto=format&fit=crop'),
(12, 12, 'Great Barrier Reef Dive', '5 Days', 'Underwater wonders and tropical islands in Australia.', 'Jun-Oct', 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&auto=format&fit=crop'),
(13, 13, 'Cappadocia Balloons', '4 Days', 'Fairytale landscapes and hot air balloons in Turkey.', 'Apr-Jun', 'https://images.unsplash.com/photo-1584941659728-66487eec1939?w=800&auto=format&fit=crop');

-- Itinerary Activities (New Table Structure)
INSERT IGNORE INTO trip_itineraries (trip_id, day_number, time_of_day, title, description, location_name, image_url) VALUES
(1, 1, 'MORNING', 'Mount Batur Sunrise Trekking', 'Hike up the active volcano for a spectacular sunrise.', 'KINTAMANI, BALI', 'https://images.unsplash.com/photo-1517054457784-06536093557d?w=800'),
(1, 1, 'EVENING', 'Ubud Cultural Day Tour', 'Explore the cultural heart of Bali including local markets.', 'UBUD', 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800'),
(1, 2, 'MORNING', 'Nusa Penida Island Day Trip', 'Visit the iconic Kelingking Beach and Broken Beach.', 'NUSA PENIDA', 'https://images.unsplash.com/photo-1537953391147-f45e3ed4665a?w=800'),
(1, 3, 'MORNING', 'Uluwatu Sunset & Kecak Dance Tour', 'Ancient clifftop temple and traditional dance performance.', 'ULUWATU TEMPLE', 'https://images.unsplash.com/photo-1539367628448-4bc5c9d170c8?w=800'),
(1, 4, 'MORNING', 'Tegallalang Rice Terraces', 'Stunning green rice paddies and scenic valley views.', 'TEGALLALANG, NEAR UBUD', 'https://images.unsplash.com/photo-1539316630485-6490334812f8?w=800'),
(2, 1, 'MORNING', 'Louvre Museum Tour', 'Explore the world\'s largest art museum.', 'PARIS', 'https://images.unsplash.com/photo-1502602898657-3e90760b3713?w=800'),
(2, 2, 'MORNING', 'Eiffel Tower Visit', 'The iconic symbol of Paris.', 'PARIS', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800'),
(3, 1, 'MORNING', 'Senso-ji Temple', 'Visit Tokyo\'s oldest and most famous temple.', 'ASAKUSA, TOKYO', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'),
(4, 1, 'MORNING', 'Arrival in New Delhi', 'Welcome to India. Transfer to hotel.', 'DELHI', 'https://images.unsplash.com/photo-1587474260584-13657452dcd0?w=800'),
(4, 2, 'MORNING', 'Taj Mahal at Sunrise', 'A magical experience visiting the ivory-white marble mausoleum.', 'AGRA', 'https://images.unsplash.com/photo-1564507592209-482a9d80327f?w=800'),
(4, 3, 'MORNING', 'Amber Fort Jaipur', 'Stunning palace complex of red sandstone and marble.', 'JAIPUR', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'),
(7, 1, 'MORNING', 'Grand Palace Tour', 'Visit the most sacred site in Bangkok.', 'GRAND PALACE', 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800'),
(7, 2, 'MORNING', 'Floating Market Experience', 'Take a boat ride through Damnoen Saduak.', 'RATCHABURI', 'https://images.unsplash.com/photo-1590373033501-f2f27db57416?w=800'),
(5, 1, 'MORNING', 'Colosseum & Forum', 'Step back in time at the iconic Colosseum.', 'ROME', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800'),
(5, 2, 'MORNING', 'Vatican Museums', 'Marvel at the Sistine Chapel.', 'VATICAN CITY', 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=800'),
(8, 1, 'MORNING', 'Hagia Sophia', 'Visit the architectural marvel of Sultanahmet.', 'ISTANBUL', 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800'),
(9, 1, 'MORNING', 'Sagrada Familia', 'The unfinished masterpiece of Antoni Gaudi.', 'BARCELONA', 'https://images.unsplash.com/photo-1583422409516-1500d8692795?w=800'),
(6, 1, 'MORNING', 'Lucerne Lake Cruise', 'Enjoy stunning views of the Swiss Alps from the water.', 'LUCERNE', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800'),
(13, 1, 'MORNING', 'Hot Air Balloon Flight', 'A bucket-list experience at sunrise.', 'GOREME', 'https://images.unsplash.com/photo-1584941659728-66487eec1939?w=800');
