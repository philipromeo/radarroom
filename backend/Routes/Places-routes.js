const express = require("express");
const { check } = require("express-validator");

const placeControllers = require("../Controllers/Place-controllers");
const fileUpload = require("../Middleware/File-upload");
const checkAuth = require("../Middleware/check-auth");

const router = express.Router();

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title")
      .not()
      .isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address")
      .not()
      .isEmpty(),
    check("leaseTime")
      .not()
      .isEmpty(),
    check("price")
      .not()
      .isEmpty()
  ],
  placeControllers.createPlace
);

router.patch(
  "/:pid",
  [
    check("title")
      .not()
      .isEmpty(),
    check("description").isLength({ min: 5 }),
    check("leaseTime")
      .not()
      .isEmpty(),
    check("price")
      .not()
      .isEmpty()
  ],
  placeControllers.updatePlace
);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
