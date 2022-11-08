const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const controllers = require('./controllers');

const app = express();

const port = process.env.PORT || 3030;

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'security/cert.pem')),
    key: fs.readFileSync(path.join(__dirname, 'security/key.pem'))
}

// app.use(express.static(path.join(__dirname, 'build')));
app.use(
    cors({
        origin: function(origin, callback) {
            return callback(null, true);
        }
    })
);
app.use(bodyParser.json());

app.get(`/profdevsquad`, controllers.getGroupMembers);

const server = https.createServer(httpsOptions, app).listen(port, () => console.log(`app listening on port: ${port}`));