'use strict';

var app = require('./lib/server');

app.define();

app.addResource('things');
app.addResource('neatThings');

app.start(3333);

