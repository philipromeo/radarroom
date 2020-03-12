import faker from "faker";

import User from "../Model/User";

import mongoose from "mongoose";

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-7qzbw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

/** create array of fake users then seed database */
export const seedUsers = async () => {
  try {
    const quantity = 100;
    let users = [];

    for (let i = 0; i < quantity; i++) {
      const formData = new User();
      (formData.name = faker.name.firstName() + " " + faker.name.lastName()),
        (formData.email = faker.internet.email()),
        (formData.password = faker.internet.password()),
        (formData.image = faker.internet.avatar());
      users.push(formData);
    }

    var done = 0;

    users.forEach(user => {
      user.save(function(err, result) {
        done++;
        if (done === users.length) {
          exit();
        }
      });
      //   userControllers.signup(user);
    });
    console.log("completed");
  } catch (error) {
    console.log(error);
  }
};

seedUsers();
function exit() {
  mongoose.disconnect();
}
