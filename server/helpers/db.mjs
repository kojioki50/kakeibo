import mongoose from "mongoose";
import env from "dotenv";
env.config();

await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
