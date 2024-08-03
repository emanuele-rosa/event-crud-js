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
const endpointsFiles = [
  "./src/routes/event.js",
  "./src/docs/swaggerDocumentation.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
