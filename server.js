'use strict';
const express = require('express');
const soap = require('soap');
const path = require('path');
const fs = require('fs');

const postPerson = require('./app/postPerson');

const wsdlPath = "/wsdl";
const wsdl = fs.readFileSync('service.wsdl', 'utf8');
const server = express();

server.use('/static', express.static(path.join(__dirname, 'static')))
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
const port = process.env.PORT || 3000;

async function getIndex(request, response) {
  response.render('index');
}

async function getSoapForm(request, response) {
  response.render('soapForm');
}

const service = {
  PostPersonService: {
    PostPersonServicePort: {
      PostPerson: postPerson
    }
  }
};

server.route('/')
  .get(getIndex)
server.route('/soap')
  .get(getSoapForm)

server.listen(port, function () {
  console.log('Listening on http://localhost:' + port);
});

soap.listen(server, wsdlPath, service, wsdl, function () {
  console.log('Check http://localhost:' + port + wsdlPath + '?wsdl to see if the service is working');
});
