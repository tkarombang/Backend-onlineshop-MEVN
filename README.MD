# Online Store Project

## Project Overview

This project is an online store application built using the MEVN stack (MongoDB, Express.js, Vue.js, Node.js). It serves as a final project for the CodePolitan online course.

---

## Table of Contents

1. [Features](#features)
2. [Installation and Setup](#installation-and-setup)
3. [Usage](#usage)
4. [Technologies Used](#technologies-used)
5. [Folder Structure](#folder-structure)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Shopping cart functionality
- Order management
- Responsive design

## Installation & Configuration

### Prerequisites

- Node.js (latest LTS version)
- MongoDB (local database)
- Git

### Steps to Install

1. **Clone the Repository**
   ```bash
   git clone https://github.com/tkarombang/Backend-onlineshop-MEVN.git
   cd Backend-onlineshop-MEVN
   ```
2. **Install Dependencies**

   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. **Environment Setup**

   - Create a `.env` file in the `server` directory and add environment variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. **Run the Application**

   ```bash
   # Run backend
   node app.js

   # Run frontend
   cd ../client
   npm run serve
   ```

5. **Access the Application**
   - Open your browser and go to `http://localhost:8080`

## Folder Structure

```
fullstack-codepolitan/
├── onlineshop-server/  # Backend server code
│   ├── models/         # MongoDB models
│   ├── routes/         # Express routes
│   ├── controllers/    # Business logic
│   └── config/         # Configuration files (e.g., db connection)
├── onlineshop/         # Frontend code
│   ├── src/            # Vue.js source code
│   ├── public/         # Static assets
│   └── vite.config.js
```

## Technologies Used

- **Frontend:** Vue.js, Vue Router, Vuex
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Version Control:** Git & GitHub

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact

- **Email:** tkarombang@gmail.com
- **GitHub:** [Muhammad Azwar Anas](https://github.com/tkarombang)
- **Linkedin:** [muhanaz](https://linkedin.com/in/muhanaz)
