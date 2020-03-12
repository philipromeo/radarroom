let faker,User,mongoose,signup;_517‍.x([["seedUsers",()=>seedUsers]]);_517‍.w("faker",[["default",["faker"],function(v){faker=v}]]);_517‍.w("../Model/User",[["default",["User"],function(v){User=v}]]);_517‍.w("mongoose",[["default",["mongoose"],function(v){mongoose=v}]]);_517‍.w("../Controllers/User-controllers",[["signup",["signup"],function(v){signup=v}]]);





mongoose.connect(
  "mongodb+srv://dbPublic:WmS75XvxnelmSYFc@cluster0-i5ohp.mongodb.net/mern?retryWrites=true&w=majority", 
  //"mongodb+srv://filippo:YWeiZpm27UEslEp1@cluster0-7qzbw.mongodb.net/mern?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);



/** create array of fake users then seed database */
       const seedUsers = async () => {
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
    _517‍.g.console.log(error);
  }
};

seedUsers();
function exit() {
  mongoose.disconnect();
}
