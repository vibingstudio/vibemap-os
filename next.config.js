/** @type {import('next').NextConfig} */

// const mongoose = require("mongoose");
const schedule = require("node-schedule");

require("dotenv").config();

// mongoose
//   .connect(
//     "mongodb+srv://binjahid:am2XJvkkAQGat0Mp@cluster0.zqcfr.mongodb.net/?retryWrites=true&w=majority"
//   ) //, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("DB Connected"))
//   .catch((err) => console.log(err));

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    MAPBOX_STYLE: process.env.MAPBOX_STYLE,
    MINT_TOKEN: process.env.MINT_TOKEN,
  },
};

module.exports = nextConfig
