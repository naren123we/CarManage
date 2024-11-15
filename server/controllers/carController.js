const User = require("../models/User");
const Car = require("../models/Car");

exports.createCar = async (req, res) => {
  const {
    title,
    description,
    price,
    tags,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).send("User not found");
    }

    // Check if residency already exists
    const existingCar = await Car.findOne({ title, userEmail });
    if (existingCar) {
      return res.status(400).send("Car already exists");
    }

    const car = new Car({
      title,
      description,
      price,
      tags,
      facilities,
      image,
      userEmail,
      owner: user._id, 
    });

    await car.save();
    res.send({ message: "Car created successfully", car });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.send(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

// to get specific car

exports.getCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).send("Car not found");
    }
    res.send(car);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.updateCar=async (req,res)=> {
  try {
    const {id} = req.params;
    const updatedData = req.body.data;
    console.log(updatedData)
    const updatedCar = await Car.findByIdAndUpdate(id, updatedData, { new: true });
    console.log("updated",updatedCar)
    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({ message: "Car details updated successfully", car: updatedCar });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCar=async (req,res)=>{
  try {
    const {id} = req.params;
    const result = await Car.findByIdAndDelete(id);
console.log("delete")
    if (!result) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}