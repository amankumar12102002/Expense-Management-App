const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://Rohit_1009:rohit1009@expense-management-syst.bfynzpc.mongodb.net/",{useUnifiedTopology: true , useNewUrlParser : true});
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
