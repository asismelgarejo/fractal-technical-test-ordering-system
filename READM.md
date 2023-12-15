# Project Title

Order Management System

## Overview

This project is an Order Management System built with React (Next.js) and Express.js for managing and tracking orders. It includes two main views - "My Orders" and "Add/Edit Order" - allowing users to view existing orders, create new orders, and edit existing ones.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Dependencies](#dependencies)
5. [Usage](#usage)
6. [API](#api)
7. [Screenshots](#screenshots)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- **My Orders View:**
  - Displays a table of existing orders.
  - Columns: ID, Order #, Date, # Products, Final Price, Options.
  - Options: Edit Order (redirect to Add/Edit Order), Delete Order (confirmation modal).
  - Button to add a new order (redirects to Add/Edit Order).

- **Add/Edit Order View:**
  - Form for creating/editing orders.
  - Fields: Order #, Date (auto-completed with the current date), # Products (auto-completed), Final Price (auto-completed).
  - Button to add a new product to the order (opens a modal).
  - Table listing available products (ID, Name, Unit Price, Qty, Total Price, Options).
  - Options: Edit Product (modal to edit product quantity), Remove Product (confirmation modal).
  - Button to save and create the order.

- **Products Management View (Extra):**
  - Allows listing, adding, deleting, and editing products.

- **Order Status (Extra):**
  - Added an option in the orders table to change the status: Pending, In Progress, Completed.

- **Validations (Extra):**
  - Added validations to prevent editing or modifying completed orders.

## Project Structure

```
order-management-system/
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── public/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .gitignore
├── serverless.yml
├── package.json
└── ...
```

- **client:** Contains the React (Next.js) frontend.
  - **components:** Reusable React components.
  - **pages:** React components representing pages.
  - **public:** Static assets.

- **server:** Contains the Express.js backend.
  - **controllers:** Request handling logic.
  - **models:** MongoDB schema models.
  - **routes:** Express.js route definitions.
  - **server.js:** Express.js server setup.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/order-management-system.git
   ```

2. **Install dependencies:**

   ```bash
   cd order-management-system/client
   npm install
   ```

   ```bash
   cd order-management-system/server
   npm install
   ```

3. **Set up MongoDB:**

   - Create a MongoDB database and note the connection string.
   - Update the connection string in `order-management-system/server/config/db.js`.

4. **Run the server locally:**

   ```bash
   cd order-management-system/server
   npm start
   ```

5. **Run the client locally:**

   ```bash
   cd order-management-system/client
   npm run dev
   ```

6. **Access the application:**
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Dependencies

### Client

- React (Next.js)
- Material-UI
- Axios (for API requests)
- ...

### Server

- Express.js
- Mongoose (for MongoDB connection)
- ...

## Usage

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the client.
- The server runs on [http://localhost:4000](http://localhost:4000).

## API

### Endpoints

- **GET /api/orders:** Get all orders.
- **GET /api/orders/:id:** Get order by ID.
- **POST /api/orders:** Create a new order.
- **PUT /api/orders/:id:** Update order by ID.
- **DELETE /api/orders/:id:** Delete order by ID.
- ...

## Screenshots

![My Orders View](screenshots/my-orders.png)

![Add/Edit Order View](screenshots/add-edit-order.png)

...

## Contributing

Feel free to contribute to the project. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).