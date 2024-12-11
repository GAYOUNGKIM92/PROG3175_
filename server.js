const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const Car = require("./models/Car");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const carsFilePath = "./cars.json";

const readCarsFromFile = () => {
  const data = fs.readFileSync(carsFilePath);
  const cars = JSON.parse(data);
  return cars;
};

const writeCarsToFile = (data) => {
  fs.writeFileSync(carsFilePath, JSON.stringify(data, null, 2));
};

const getNextId = (cars) => {
  if (cars.length === 0) return 1;
  const lastCar = cars[cars.length - 1];
  return parseInt(lastCar.id) + 1;
};

// Create
app.post("/cars", (req, res) => {
  const cars = readCarsFromFile();
  const newId = getNextId(cars).toString();
  const newCar = new Car(newId, req.body.make, req.body.model, req.body.year);
  cars.push(newCar);
  writeCarsToFile(cars);
  res.status(201).json(newCar);
});

// Read
app.get('/cars', (req, res) => {
    const cars = readCarsFromFile();
    res.json(cars);
  });

  // Get a car by id
app.get('/cars/:id', (req, res) => {
    const cars = readCarsFromFile();
    const car = cars.find(c => c.id === req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  });

  // Update 
app.put('/cars/:id', (req, res) => {
    const cars = readCarsFromFile();
    const index = cars.findIndex(c => c.id === req.params.id);
    if (index !== -1) {
      cars[index] = new Car(req.params.id, req.body.make, req.body.model, req.body.year);
      writeCarsToFile(cars);
      res.json(cars[index]);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  });

  // Delete 
app.delete('/cars/:id', (req, res) => {
    let cars = readCarsFromFile();
    cars = cars.filter(c => c.id !== req.params.id);
    writeCarsToFile(cars);
    res.status(204).end();
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });