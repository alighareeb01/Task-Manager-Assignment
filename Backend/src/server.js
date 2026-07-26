import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

console.log(process.env.DATABASE, process.env.PORT);

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DATABASE IS CONNECTED");
  })
  .catch((err) => {
    console.log("DATABASE ERROR :", err);
  });

mongoose.connection.once("open", () => {
  console.log("CONNETED TO ", mongoose.connection.name);
});

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`server is running on port:${port}`);
// });
