🌍 TravelMate – Intelligent Travel Planning & Booking Platform

TravelMate is a full-stack travel planning and booking platform that helps users explore destinations, plan trips, book hotels and transport, and manage travel itineraries.
The platform includes a User Portal for travelers and an Admin Dashboard for managing travel data such as destinations, hotels, restaurants, trips, and transport bookings.

✨ Features

👤 User Features

Browse popular destinations

View destination details & travel guides

Explore trip itineraries with day-by-day plans

Book:

✈ Flights

🚆 Trains

🚌 Buses

🏨 Hotels

🍽 Restaurants

🌍 Trips

Payment simulation for bookings

View booking history

Search destinations

Interactive travel itinerary timeline.

----------------------------------------------------------------------------------------------------------------------
🛠 Admin Features :

Admin panel allows full CRUD management of travel data.

Admin can manage:

🌍 Destinations

📍 Places

🏨 Hotels

🍽 Restaurants

✈ Flights

🚆 Trains

🚌 Buses

🧭 Trips

📅 Travel itineraries

👤 Users

📊 Booking management

-----------------------------------------------------------------------------------------------------------------------
📊 Admin Dashboard :

Analytics charts

Booking statistics

Popular destinations

Transport booking distribution

Monthly travel trends

-----------------------------------------------------------------------------------------------------------------------
🖼 Image Upload System : 

Images for destinations, hotels, restaurants, and trips are uploaded using:

Cloudinary

Features:

Image preview

Cloud storage

Optimized delivery

---------------------------------------------------------------------------------------------------------------------
📅 Trip Itinerary System :

Each trip contains day-wise travel plans.

Example:

Day 1

Morning – Visit Uluwatu Temple

Afternoon – Explore Ubud Market

Evening – Sunset at Kuta Beach

Features:

Timeline UI

Activity cards

Images for each location

--------------------------------------------------------------------------------------------------------------------
🧱 Tech Stack :

Frontend :

React (Vite)

JavaScript

CSS / Tailwind

Axios

Chart.js / Recharts

Backend :

Spring Boot

Spring Data JPA

Spring Security

REST APIs

Maven

Database:

MySQL

Cloud Services:

Cloudinary (Image Upload)

-------------------------------------------------------------------------------------------------------------------------

⚙️ Installation & Setup :

1️⃣ Clone the Repository:
  
git clone https://github.com/sarathkumarpalla/travelmate-project.git

cd travelmate

  ---------------
🗄 Database Setup :

Create database:

CREATE DATABASE travelmate;

USE travelmate;

  ------------------

🚀 Run Backend (Spring Boot) :

Navigate to backend folder:

cd travelmate-backend

Run application:

mvn spring-boot:run

Backend runs at:

http://localhost:8080

Test API:

http://localhost:8080/api/destinations

  -------------------
⚛ Run Frontend (React) :

Navigate to frontend:

cd travelmate-frontend

Install dependencies:

npm install

Start development server:
    
npm run dev

Frontend runs at:
  
http://localhost:5173

  ------------------------------------------------
🔑 Environment Variables

Create .env file in frontend:

VITE_API_BASE_URL=http://localhost:8080/api
    
☁ Cloudinary Configuration
  
Add in application.properties:
    
cloudinary.cloud-name=YOUR_CLOUD_NAME
    
cloudinary.api-key=YOUR_API_KEY
    
cloudinary.api-secret=YOUR_API_SECRET

----------------------------------------------------------------
📸 Screenshots

Home Page

Travel destinations and recommendations:
<img width="1582" height="910" alt="image" src="https://github.com/user-attachments/assets/2a4c73ef-ad01-4f7e-bc10-48a3d9aaaaa3" />

Destination Details

Trip overview with suggested itinerary:
<img width="1062" height="910" alt="image" src="https://github.com/user-attachments/assets/00a0e3d6-f4ca-4177-9304-f1a1db44436f" />

Travel Bookings

Flights, trains, and buses booking system:
<img width="1085" height="916" alt="image" src="https://github.com/user-attachments/assets/15258125-b5b9-4ec8-93a0-9b40321f2e0b" />
<img width="1041" height="753" alt="image" src="https://github.com/user-attachments/assets/fd598361-d153-4d35-8f55-48271cdd7190" />
<img width="1047" height="775" alt="image" src="https://github.com/user-attachments/assets/eca6eb2c-fb20-4c77-b032-8a331790e914" />

Hotels

Browse hotels and book stays:
<img width="792" height="882" alt="image" src="https://github.com/user-attachments/assets/9c635135-67bb-423b-84e7-1ccfc5910db9" />

Restaurants

Browse restaurants and book tables:
<img width="773" height="909" alt="image" src="https://github.com/user-attachments/assets/742a82c3-2b33-4ea7-8dd2-d84cfc717509" />

Booking status:
<img width="1028" height="896" alt="image" src="https://github.com/user-attachments/assets/9a88f190-cb2e-4b05-a984-58e36f5023d5" />

Admin Dashboard

Manage travel data and bookings:
<img width="833" height="905" alt="image" src="https://github.com/user-attachments/assets/aa97fbf4-facb-49b2-8cf4-5c94ea330de6" />

-------------------------------------------------------------------------------------------------------------------------------------------

👨‍💻 Project Team Members:

PALADUGU VARSHITHA

PALLA SARATH KUMAR

NALLAGATLA NARASIMHA

NALABOTHULA VENKATESH

NUSUM VENKATA NAGASUBBA REDDY

----------------------------------------------------------------------------------
⭐ Support
If you like this project:

⭐ Star the repository
🍴 Fork the project
🛠 Contribute improvements
