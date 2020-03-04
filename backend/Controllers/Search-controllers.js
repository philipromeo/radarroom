const Place = require("../Model/Place");
const HttpError = require("../Model/Http-error");


const getAllPlaces = async (req, res, next) => {
  try {
    elements = await Place.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.json({
    elements: elements.map(place => place.toObject({ getters: true }))
  });
};

const getPlaceBySearchParameter = async (req, res, next) => {
  let query = {};

  if (req.body.address) {
    query.address = req.body.address;
  }

  if (req.body.price) {
    query.price = { $gte: req.body.price};
  }

  if (req.body.leaseTime) {
    query.leaseTime = { $gte: req.body.leaseTime};
  }

  console.log(query);

  let elements;

  try {
    elements = await Place.find(query);
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.json({
    elements: elements.map(place => place.toObject({ getters: true }))
  });
};

exports.getAllPlaces = getAllPlaces;
exports.getPlaceBySearchParameter = getPlaceBySearchParameter;
