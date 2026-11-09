// Run once to create the first admin account:  node seed.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const User = require("./models/User");

const run = async () => {
  const uri = process.env.MONGO_URI?.trim();
  if (!uri) {
    throw new Error(
      "MONGO_URI is not configured. Create server/.env from server/.env.example and set the MongoDB connection string."
    );
  }
  await mongoose.connect(uri);

  const email = "admin@abcacademy.com";
  const exists = await User.findOne({ email });

  if (exists) {
    console.log("Admin already exists:", email);
  } else {
    const initialPassword = process.env.INITIAL_ADMIN_PASSWORD;
    if (!initialPassword || initialPassword.length < 12) {
      throw new Error("Set INITIAL_ADMIN_PASSWORD to a unique password with at least 12 characters.");
    }
    await User.create({
      name: "Head Admin",
      email,
      password: initialPassword,
      role: "admin",
    });
    console.log("Admin created:", email);
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
