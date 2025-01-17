import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation for my project.'
  },
  host: 'localhost:1201'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/route.js'];

swaggerAutogen()(outputFile, routes, doc);