let faker,Place,mongoose;_ee4‍.x([["seedPlaces",()=>seedPlaces]]);_ee4‍.w("faker",[["default",["faker"],function(v){faker=v}]]);_ee4‍.w("../Model/Place",[["default",["Place"],function(v){Place=v}]]);_ee4‍.w("mongoose",[["default",["mongoose"],function(v){mongoose=v}]]);





mongoose.connect(
  `mongodb+srv://${process.env.DB_USER_PUBLIC}:${process.env.DB_PASSWORD_PUBLIC}@cluster0-i5ohp.mongodb.net/${process.env.DB_NAME_PUBLIC}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

faker.locale = "it";

/** create array of fake places then seed database */
       const seedPlaces = async () => {
  try {
    const quantity = 10;
    let places = [];

    for (let i = 0; i < quantity; i++) {
      const formData = new Place();
      (formData.title = faker.lorem.sentence()),
        (formData.description = faker.lorem.paragraph()),
        (formData.image = faker.image.city()),
        (formData.address = faker.address.state()),
        (formData.location.lat = faker.address.latitude()),
        (formData.location.lng = faker.address.longitude()),
        (formData.creator = "5e69073e6baffdce0e53c988");
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
          _ee4‍.g.console.log(done + " " + places.length)
          exit();
        }
        _ee4‍.g.console.log(done + " " + places.length)
      });
    });
    exit();
    console.log("completed");
  } catch (error) {
    _ee4‍.g.console.log(error);
  }
};

seedPlaces();
function exit() {
  mongoose.disconnect();
}
