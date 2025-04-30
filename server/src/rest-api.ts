import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { api } from "@app/routes/index";
dotenv.config();

const app = express();

import moment from "moment-timezone";

//middleware
app.use(cors());
app.use(express.json());

moment.tz.setDefault("Asia/manila");

app.use("/", api);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
