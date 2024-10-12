const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const propertyRoutes = require("./routes/property.route");
const facilityRoutes = require("./routes/facility.route");
const categoryRoutes = require("./routes/category.route");

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Working');
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
