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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });