const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path")
const connectDb = require("./config/connectDb");


const BASE_URL=process.env.BASE_URL

dotenv.config();

connectDb();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.use("/api/v1/users",require('./routes/userRoute'))

app.use("/api/v1/transactions", require("./routes/transactionRoutes"));



const PORT = 8090 || process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  