# Vehicle Rental system API

A complete Node.js + TypeScript + PostgreSQL backend for managing
**users**, **vehicles**, and **vehicle bookings** with authentication,
validation

## Features

### Users

- Register new users
- Login with JWT authentication
- Password hashing using bcrypt
- Prevent duplicate emails
- Fetch user by email

### Vehicles

- Add vehicles
- Prevent duplicate registration numbers
- Update vehicle info
- Manage availability status (available, booked, maintenance)

### Bookings

- Create new rental bookings
- Validate vehicle & customer existence
- Calculate total rent based on days
- Update booking status
- Mark vehicle unavailable, after booking

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL (pg)
- bcrypt for hashing
- jsonwebtoken for login tokens

## Project Structure

`src/├── app/ 
    │   ├── modules/  
    │   │     ├── vehicles/ 
    │   │     ├── bookings/ 
    │   │     ├── users/
    │   │  
    │   ├── middlewares/                         
    │   │    
    │   └── config/ 
    └──server.ts
    └──app.ts
`

## Environment Variables

Create a `.env` file:

PORT=5000
CONNECTION_STR=postgres
JWTSECRET=yourpassword
