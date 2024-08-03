const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Events API",
    description: "My events management API",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
