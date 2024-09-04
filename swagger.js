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
  "./src/docs/swaggerDocumentation.js",
  "./src/routes/AdminRoutes.js",
  "./src/routes/UserRoutes.js",
  "./src/routes/EventRoutes.js",
  "./src/routes/index.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
