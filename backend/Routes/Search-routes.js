const express = require("express");

const searchControllers = require("../Controllers/Search-controllers");

const router = express.Router();


router.get("/", searchControllers.getAllPlaces);

router.post("/", searchControllers.getPlaceBySearchParameter);


module.exports = router;
