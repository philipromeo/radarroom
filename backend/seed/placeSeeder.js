import faker from "faker";

import Place from "../Model/Place";

import mongoose from "mongoose";

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-7qzbw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

faker.locale = "it";

/** create array of fake places then seed database */
export const seedPlaces = async () => {
  try {
    const quantity = 200;
    let places = [];

    for (let i = 0; i < quantity; i++) {
      const formData = new Place();
      (formData.title = faker.lorem.sentence()),
        (formData.description = faker.lorem.paragraph()),
        (formData.image = faker.image.city()),
        (formData.address = faker.address.state()),
        (formData.location.lat = faker.address.latitude()),
        (formData.location.lng = faker.address.longitude()),
        (formData.creator = "5e496f51228ebc59c9720222");
        (formData.leaseTime = faker.random.number({ min: 1, max: 6 })),
        (formData.price = faker.random.number({ min: 100, max: 1000 })),
        //(formData.creator = []);
      places.push(formData);
    }

    var done = 0;
    places.forEach(place => {
      place.save(function(err, result) {
        done++;
        if (done === places.length) {
          exit();
        }
      });
    });
    console.log("completed");
  } catch (error) {
    console.log(error);
  }
};

seedPlaces();
function exit() {
  mongoose.disconnect();
}
