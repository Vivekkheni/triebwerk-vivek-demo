"use strict"
const express = require('express'),
    http = require('http'),
    cors = require('cors'),
    app = express(),
    routers = require('./routes'),
    server = new http.Server(app)
console.log(process.env.NODE_ENV || 'localhost');
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Node backend server is running",
    })
});
app.use(routers)
app.use('*', (req, res) => { return res.status(502).json({ status: 502, message: "Node Backend API Bad Gateway" }) });

module.exports = server