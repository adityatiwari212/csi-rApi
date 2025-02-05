const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const resouceRoutes = require("./routes/resourceRoutes");
const adminRouters = require("./routes/adminRoutes");

const cors = require("cors");
dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use("/api/user" , userRoutes);
app.use("/api/resource" , resouceRoutes);
app.use("/api/admin" , adminRouters);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
