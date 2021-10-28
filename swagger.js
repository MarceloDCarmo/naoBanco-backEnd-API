const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./dist/src/routes.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./dist/src/server.js')
})