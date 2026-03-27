-- Destinations
INSERT INTO destinations (name, country, description, image_url, best_time_to_visit, rating, category) VALUES 
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

-- Places (destination_id, place_name, description, image_url)
INSERT INTO places (destination_id, place_name, description, image_url) VALUES 
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

-- Hotels (destination_id, name, location, rating, price_per_night, image_url)
INSERT INTO hotels (destination_id, name, location, rating, price_per_night, image_url) VALUES 
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

-- Restaurants (destination_id, name, location, cuisine, rating, image_url)
INSERT INTO restaurants (destination_id, name, location, cuisine, rating, image_url) VALUES 
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
INSERT INTO flights (airline, flight_number, departure_city, arrival_city, duration, price, departure_time, arrival_time) VALUES 
('Turkish Airlines', 'TK1001', 'Istanbul', 'Rome', '2h 40m', 12000, '2026-06-01 10:00:00', '2026-06-01 12:40:00'),
('Swiss International', 'LX234', 'Zurich', 'Barcelona', '1h 50m', 9000, '2026-06-02 08:00:00', '2026-06-02 09:50:00'),
('Thai Airways', 'TG315', 'Bangkok', 'Delhi', '4h 15m', 15000, '2026-06-03 14:00:00', '2026-06-03 18:15:00'),
('LATAM Airlines', 'LA842', 'Santiago', 'Buenos Aires', '2h', 10000, '2026-06-04 16:00:00', '2026-06-04 18:00:00'),
('Qantas', 'QF902', 'Cairns', 'Sydney', '3h', 14000, '2026-06-05 09:00:00', '2026-06-05 12:00:00');

-- Buses
INSERT INTO buses (company, departure, arrival, duration, price) VALUES 
('Alsa', 'Barcelona', 'Madrid', '7h', 3000),
('Metro Turizm', 'Istanbul', 'Cappadocia', '10h', 2500),
('Cruz del Sur', 'Santiago', 'Valparaiso', '1h 30m', 600),
('Greyhound Australia', 'Cairns', 'Townsville', '5h', 2000),
('Swiss PostBus', 'Zurich', 'Lucerne', '1h', 800);

-- Trains
INSERT INTO trains (train_name, departure_station, arrival_station, travel_time, price) VALUES 
('Frecciarossa', 'Rome', 'Florence', '1h 30m', 3500),
('AVE', 'Barcelona', 'Madrid', '2h 30m', 6000),
('SBB InterCity', 'Zurich', 'Geneva', '2h 45m', 5000),
('Yüksek Hızlı Tren', 'Istanbul', 'Ankara', '4h', 1500),
('Vande Bharat Express', 'New Delhi', 'Varanasi', '8h', 1200);

-- Trips
INSERT INTO trips (destination_id, title, duration, description, best_season, image_url) VALUES 
(4, 'Golden Triangle Tour', '8 Days', 'Experience the heart of India', 'Winter', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7c3?w=800&auto=format&fit=crop'),
(6, 'Italian Renaissance', '7 Days', 'Rome, Florence, and Venice', 'Spring', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop'),
(9, 'Swiss Alps Explorer', '10 Days', 'Breathtaking mountain vistas', 'Summer', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop');
