-- Insert Missing Trips if they don't exist
INSERT IGNORE INTO trips (id, destination_id, title, duration, description, best_season, image_url) VALUES 
(7, 5, 'Bangkok City Lights', '5 Days', 'Explore the vibrant streets and temples of Bangkok.', 'Nov-Feb', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop'),
(8, 7, 'Istanbul Crossroads', '6 Days', 'Experience where East meets West in historic Istanbul.', 'Apr-Nov', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop'),
(9, 8, 'Spanish Coast Discovery', '7 Days', 'The best of Barcelona and the Mediterranean coast.', 'May-Sep', 'https://images.unsplash.com/photo-1583422409516-1500d8692795?w=800&auto=format&fit=crop'),
(10, 10, 'Patagonia Glaciers', '8 Days', 'A journey to the end of the world in Argentina.', 'Nov-Mar', 'https://images.unsplash.com/photo-1518182170546-076616fdacaf?w=800&auto=format&fit=crop'),
(11, 11, 'Chilean Adventure', '10 Days', 'From the Andes to the Pacific coast of Chile.', 'Sep-Nov', 'https://images.unsplash.com/photo-1490216788543-9892697b0a3c?w=800&auto=format&fit=crop'),
(12, 12, 'Great Barrier Reef Dive', '5 Days', 'Underwater wonders and tropical islands in Australia.', 'Jun-Oct', 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&auto=format&fit=crop'),
(13, 13, 'Cappadocia Balloons', '4 Days', 'Fairytale landscapes and hot air balloons in Turkey.', 'Apr-Jun', 'https://images.unsplash.com/photo-1584941659728-66487eec1939?w=800&auto=format&fit=crop');

-- Clear existing itineraries to avoid duplicate key issues if running multiple times (optional)
-- TRUNCATE TABLE trip_itineraries; 

-- INSERT Itineraries for India (Trip ID 4)
INSERT IGNORE INTO trip_itineraries (trip_id, day_number, time_of_day, title, description, location_name, image_url) VALUES
(4, 1, 'MORNING', 'Arrival in New Delhi', 'Welcome to the capital of India. Meet your guide and transfer to your hotel.', 'DELHI', 'https://images.unsplash.com/photo-1587474260584-13657452dcd0?w=800'),
(4, 1, 'AFTERNOON', 'Old Delhi Heritage Walk', 'Visit Red Fort and explore the bustling lanes of Chandni Chowk.', 'OLD DELHI', 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=800'),
(4, 1, 'EVENING', 'India Gate at Night', 'Stroll through Rajpath and see the illuminated India Gate.', 'NEW DELHI', 'https://images.unsplash.com/photo-1587474260584-13657452dcd0?w=800'),
(4, 2, 'MORNING', 'Drive to Agra', 'Morning drive to the city of the Taj Mahal.', 'AGRA', 'https://images.unsplash.com/photo-1564507592209-482a9d80327f?w=800'),
(4, 2, 'AFTERNOON', 'Agra Fort Exploration', 'Discover the UNESCO World Heritage Agra Fort.', 'AGRA FORT', 'https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800'),
(4, 2, 'EVENING', 'Sunset at Mehtab Bagh', 'Enjoy a stunning sunset view of the Taj Mahal from across the river.', 'MEHTAB BAGH', 'https://images.unsplash.com/photo-1564507592209-482a9d80327f?w=800'),
(4, 3, 'MORNING', 'Taj Mahal at Sunrise', 'A magical experience visiting the ivory-white marble mausoleum at dawn.', 'TAJ MAHAL', 'https://images.unsplash.com/photo-1564507592209-482a9d80327f?w=800'),
(4, 3, 'AFTERNOON', 'Travel to Jaipur', 'Head towards the Pink City via Fatehpur Sikri.', 'FATEHPUR SIKRI', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7c3?w=800'),
(4, 3, 'EVENING', 'Lakeside Dinner', 'Enjoy a traditional Rajasthani meal overlooking Jal Mahal.', 'JAIPUR', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800');

-- INSERT Itineraries for Bangkok (Trip ID 7)
INSERT IGNORE INTO trip_itineraries (trip_id, day_number, time_of_day, title, description, location_name, image_url) VALUES
(7, 1, 'MORNING', 'Grand Palace Tour', 'Visit the most sacred site in Bangkok, the Grand Palace.', 'GRAND PALACE', 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800'),
(7, 1, 'AFTERNOON', 'Wat Arun & Wat Pho', 'Explore the Temple of Dawn and the Reclining Buddha.', 'CHAOPHRAYA RIVER', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800'),
(7, 1, 'EVENING', 'Dinner Cruise', 'A luxurious river cruise on the Chao Phraya River with live music.', 'CHAOPHRAYA RIVER', 'https://images.unsplash.com/photo-1562723686-81cf8353d712?w=800'),
(7, 2, 'MORNING', 'Floating Market Experience', 'Take a boat ride through Damnoen Saduak floating market.', 'RATCHABURI', 'https://images.unsplash.com/photo-1590373033501-f2f27db57416?w=800'),
(7, 2, 'AFTERNOON', 'Maeklong Railway Market', 'Watch vendors pull back their stalls as the train passes through the market.', 'MAEKLONG', 'https://images.unsplash.com/photo-1528181304800-2f3b0887be4e?w=800'),
(7, 2, 'EVENING', 'Sky Bar Sunset', 'Enjoy panoramic views of Bangkok from a world-famous rooftop bar.', 'SILOM', 'https://images.unsplash.com/photo-1548107116-7667cf762e59?w=800');

-- INSERT Itineraries for Rome (Trip ID 5)
INSERT IGNORE INTO trip_itineraries (trip_id, day_number, time_of_day, title, description, location_name, image_url) VALUES
(5, 1, 'MORNING', 'Colosseum & Forum', 'Step back in time at the iconic Colosseum and Roman Forum.', 'CENTRO STORICO', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800'),
(5, 1, 'AFTERNOON', 'Palatine Hill', 'Explore the birthplace of Rome and enjoy views of the city.', 'PALATINO', 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800'),
(5, 1, 'EVENING', 'Trastevere Dinner', 'Indulge in authentic Roman cuisine in the charming Trastevere neighborhood.', 'TRASTEVERE', 'https://images.unsplash.com/photo-1533923055331-5975f4640822?w=800'),
(5, 2, 'MORNING', 'Vatican Museums', 'Marvel at the Sistine Chapel and world-class art collections.', 'VATICAN CITY', 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=800'),
(5, 2, 'AFTERNOON', 'St. Peters Basilica', 'Visit the centerpiece of the Catholic Church and climb the dome.', 'VATICAN CITY', 'https://images.unsplash.com/photo-1516483601948-9bda960cdcc2?w=800'),
(5, 2, 'EVENING', 'Trevi Fountain & Gelato', 'Toss a coin in the Trevi Fountain and enjoy Italy\'s finest gelato.', 'TREVI', 'https://images.unsplash.com/photo-1515542706656-8e6ef17a1ed2?w=800');

-- INSERT Itineraries for Istanbul (Trip ID 8)
INSERT IGNORE INTO trip_itineraries (trip_id, day_number, time_of_day, title, description, location_name, image_url) VALUES
(8, 1, 'MORNING', 'Hagia Sophia & Blue Mosque', 'Visit the architectural marvels of Sultanahmet.', 'SULTANAHMET', 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800'),
(8, 1, 'AFTERNOON', 'Topkapi Palace', 'Explore the opulent home of Ottoman Sultans for centuries.', 'TOPKAPI', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800'),
(8, 1, 'EVENING', 'Grand Bazaar Shopping', 'Get lost in the world\'s largest covered market.', 'GRAND BAZAAR', 'https://images.unsplash.com/photo-1551670155-2a2ec9622ed0?w=800');

-- INSERT Itineraries for Barcelona (Trip ID 9)
INSERT IGNORE INTO trip_itineraries (trip_id, day_number, time_of_day, title, description, location_name, image_url) VALUES
(9, 1, 'MORNING', 'Sagrada Familia', 'The unfinished masterpiece of Antoni Gaudi.', 'EIXAMPLE', 'https://images.unsplash.com/photo-1583422409516-1500d8692795?w=800'),
(9, 1, 'AFTERNOON', 'Park Guell', 'A mosaic-filled park with the best views of Barcelona.', 'GRACIA', 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800'),
(9, 1, 'EVENING', 'Las Ramblas Stroll', 'Walk down the famous pedestrian boulevard to the sea.', 'GOTHIC QUARTER', 'https://images.unsplash.com/photo-1512753360424-aa6ae0446714?w=800');

-- INSERT Itineraries for Switzerland (Trip ID 6)
INSERT IGNORE INTO trip_itineraries (trip_id, day_number, time_of_day, title, description, location_name, image_url) VALUES
(6, 1, 'MORNING', 'Lucerne Chapel Bridge', 'Walk across the oldest wooden covered bridge in Europe.', 'LUCERNE', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800'),
(6, 1, 'AFTERNOON', 'Mount Pilatus Cogwheel', 'Ride the world\'s steepest cogwheel railway to the peak.', 'PILATUS', 'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=800'),
(6, 1, 'EVENING', 'Lakeside fondue', 'Enjoy a traditional Swiss cheese fondue by Lake Lucerne.', 'LUCERNE', 'https://images.unsplash.com/photo-1563214156-347473724c9d?w=800');

-- INSERT Itineraries for Cappadocia (Trip ID 13)
INSERT IGNORE INTO trip_itineraries (trip_id, day_number, time_of_day, title, description, location_name, image_url) VALUES
(13, 1, 'MORNING', 'Hot Air Balloon Flight', 'A bucket-list experience soaring over fairy chimneys at sunrise.', 'GOREME', 'https://images.unsplash.com/photo-1584941659728-66487eec1939?w=800'),
(13, 1, 'AFTERNOON', 'Goreme Open Air Museum', 'Explore ancient cave churches and rock-cut monasteries.', 'GOREME', 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800'),
(13, 1, 'EVENING', 'Cave Hotel Dinner', 'Dine inside a historic cave dwelling with Turkish specialties.', 'UCHISAR', 'https://images.unsplash.com/photo-1518112166137-970639906d9a?w=800');
