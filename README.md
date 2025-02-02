# PROG3175_Final
This is a simple Node.js API using Express that performs CRUD operations for a Car resource. The data is stored in a JSON file.

## Endpoints
- `POST /cars`: Add a new car
- `GET /cars`: Get a list of all cars
- `GET /cars/:id`: Get a car by id
- `PUT /cars/:id`: Update a car by id
- `DELETE /cars/:id`: Delete a car by id



## Data Storage

The car data is stored in a JSON file named `cars.json`.


## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `node server.js` to start the server

## Example Usage

### Add a New Car

- **Request**:
    ```sh
    curl -X POST http://localhost:3000/cars -H "Content-Type: application/json" -d '{"make": "Toyota", "model": "Camry", "year": 2020}'
    ```

- **Response**:
    ```json
    {
        "id": "1",
        "make": "Toyota",
        "model": "Camry",
        "year": 2020
    }
    ```

### Get All Cars

- **Request**:
    ```sh
    curl http://localhost:3000/cars
    ```

- **Response**:
    ```json
    [
        {
            "id": "1",
            "make": "Toyota",
            "model": "Camry",
            "year": 2020
        }
    ]
    ```

### Get a Car by ID

- **Request**:
    ```sh
    curl http://localhost:3000/cars/1
    ```

- **Response**:
    ```json
    {
        "id": "1",
        "make": "Toyota",
        "model": "Camry",
        "year": 2020
    }
    ```

### Update a Car by ID

- **Request**:
    ```sh
    curl -X PUT http://localhost:3000/cars/1 -H "Content-Type: application/json" -d '{"make": "Honda", "model": "Accord", "year": 2021}'
    ```

- **Response**:
    ```json
    {
        "id": "1",
        "make": "Honda",
        "model": "Accord",
        "year": 2021
    }
    ```

### Delete a Car by ID

- **Request**:
    ```sh
    curl -X DELETE http://localhost:3000/cars/1
    ```

- **Response**:
    ```sh
    (No content, status code 204)
    ```