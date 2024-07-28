const express = require("express");
const cors = require("cors");
const app = express();

const complaintRoutes = require("./routes/complaintRoutes");
const studentRoutes = require("./routes/studentRoutes");
const wardenRoutes = require("./routes/wardenRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use('/', complaintRoutes);
app.use('/', studentRoutes)
app.use('/', wardenRoutes)
app.use('/', userRoutes)

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});
