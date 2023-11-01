<img src="https://github.com/Athiselva/Shopzen-SQL/blob/main/Microservice.jpg" alt="Microservice" width="550" height="300">


# Node.js - Shopzen Product Management API

This Node.js API handles product management operations with a MySQL database. It includes endpoints for fetching all products, fetching a product by ID, creating a new product, updating an existing product, and deleting a product by ID. The API uses the `mysql` library to connect to the database, and it loads environment variables from a `.env` file using `dotenv`.

## Prerequisites

- Node.js installed on your system.
- A MySQL database with the necessary schema.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/yourusername/product-management-api.git
   cd product-management-api
   ```

2. Install the required packages:

   ```shell
   npm install
   ```

3. Create a `.env` file in the project directory with the following content, updating the values with your database credentials:

   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_DATABASE=your_database_name
   ```

4. Start the Node.js application:

   ```shell
   node app.js
   ```

## Usage

You can interact with the API using HTTP requests. Here are some examples using `curl`:

- Fetch all products:

   ```shell
   curl http://localhost:8081/products
   ```

- Fetch a product by ID:

   ```shell
   curl http://localhost:8081/products/1
   ```

- Create a new product:

   ```shell
   curl -X POST -H "Content-Type: application/json" -d '{"name": "Product Name", "type": "Product Type", "specification_id": 1, "price": 19.99, "created_by": 1}' http://localhost:8081/products
   ```

- Update a product by ID:

   ```shell
   curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Name", "price": 29.99}' http://localhost:8081/products/1
   ```

- Delete a product by ID:

   ```shell
   curl -X DELETE http://localhost:8081/products/1
   ```
