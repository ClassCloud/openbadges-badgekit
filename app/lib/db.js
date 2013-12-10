const path = require('path');
const fs = require('fs');
const streamsql = require('streamsql');
const config = require('./config');

module.exports = function getDB (key) {
  key = key || "DATABASE";
  return streamsql.connect(config(key));
};
