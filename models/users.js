import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "User name Invalid, It should contain 8-20 alphanumeric letters and be unique!!!",
    ],
  },
  image: {
    type: String,
  },
});

//The "Models" object is provided by mongoose libarary and stores all the registerd models.
//if a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable,
//This prevents redfining the model and ensures that the existing model is reused.

//if a model named "User" does not exist in the "model" object, the "model" funcitn from mongoose is called to create a new model.
//they newly created model is then assigned to the "user" varable

const User = models.User || model("User", UserSchema); //chgecing if user model already exists or else creating a new model

export default User;
