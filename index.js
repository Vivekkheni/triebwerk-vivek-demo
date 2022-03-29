"use strict";
const server = require('./src')
const port = process.env.PORT || 80;
server.listen(port, () => {
    console.clear()
    console.log(`server started on port ${port}`);
});