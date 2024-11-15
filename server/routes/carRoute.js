const express=require('express');
const router = express.Router();
const { createCar, getAllCars, getCar, updateCar, deleteCar } =require( '../controllers/carController');
const {auth}=require("../middleware/auth")
router.post("/create",auth,createCar)
router.get("/allcars",getAllCars )
router.get("/cars/:id",getCar )
router.put("/update/:id",auth,updateCar)
router.delete("/delete/:id",auth,deleteCar)

module.exports = router  