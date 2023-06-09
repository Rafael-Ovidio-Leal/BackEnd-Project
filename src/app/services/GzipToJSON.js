const zlib = require("zlib");
const { Transform } = require("stream");
const JSONStream = require('JSONStream')
const axios = require("axios");

const getTransformStream = () => {
  const transform = new Transform({
    transform: (chunk, encoding, next) => {
      next(null, chunk);
    },
  });

  return transform;
};

const getStream = async (url, headers = {}) => {
  try {
    const res = await axios.get(url, {
      headers,
      responseType: "stream",
    });

    return res.data;
  } 
  catch (err) {
    throw err;
  }
};

const readCsv = async (url) => {
  try {
    const httpStream = await getStream(url, {
      "accept-encoding": "gzip",
    });

    const transform = getTransformStream();

    const csvReadStream = httpStream
      .pipe(zlib.createGunzip())
      .pipe(transform)
      .pipe(JSONStream.parse());

    const results = [];

    // return a promise
    return new Promise((resolve, reject) => {
      csvReadStream.on("data", (chunk) => {
        results.push(chunk);
      });
      csvReadStream.on("end", () => {
        resolve(results);
      });
      csvReadStream.on("error", (err) => {
        reject(err);
      });
    });
  } 
  catch (err) {
    throw err;
  }
};

module.exports = readCsv;