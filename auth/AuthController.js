var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var fs = require('fs')
var path = require('path')
var rootdir = path.dirname(require.main.filename)

var VerifyToken = require('./VerifyToken');

// MULTER -> NANTI JADIIN FILE SENDIRI
var multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.email + '-' + file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

// ! TESTING GEO LAT
const geoloc = {
    type: "Point",
    coordinates: [50, 25]
}

// CREATE NEW USER
router.post('/register', upload.single('verification-image'), (req, res, next) => {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8)

    User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            verificationImage: {
                data: fs.readFileSync(path.join(rootdir+'/uploads/'+ req.file.filename)),
                contentType: 'image/png'
            },
            location: geoloc
        },
        function (err, user) {
            if (err)
                // return res.status(500).send(err)
                return res.status(500).send({
                    message: "There was a problem registering the user."
                });

                res.status(200).send({
                    message: 'Account succesfully registered.'
                });
        });

});

// MISC ROUTE CHECK BINARY DATA
router.post('/image', VerifyToken, function (req, res, next) {
    User.findById(req.userId,
        {
            password: 0
        },
    function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user.verificationImage.data.toString('base64'));
    });
})

// REFRESH TOKEN
router.post('/token', (req, res) => {

    if (!req.body._id || !req.body.refresh_token) return res.status(500).send("Some data was not provided.");

    User.findOne(
        { _id: req.body._id },
        (err, user) => {
            if (err) return res.status(500).send("There was a problem finding the user.")

            if (user.refreshTokens.includes(req.body.refresh_token)) {
                // create an access token
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 900
                });

                res.status(200).send({
                    token: token
                });

            } else {

                res.status(401).send('Invalid request: please relogin.')
            }
        }
    )
})

// GET USER ID OF TOKEN
router.get('/me', VerifyToken, function (req, res, next) {

    User.findById(req.userId,
        {
            __v: 0,
            password: 0,
            verificationImage: 0,
            location: 0,
            refreshTokens: 0
        },
    function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });

});

// LOGIN USER
router.post('/login', function (req, res) {

    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) return res.status(500).send({ auth: false, message: 'Error on the server.'});
        if (!user) return res.status(404).send({ auth: false, message: 'No user found.'});

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({
            auth: false,
            message: "Failed to authenticate token."
        });

        // create an access token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 900 // expire in 15 minutes (900)
        });
        // create an refresh token
        var refresh_token = jwt.sign({ id: user._id }, config.secret, {});

        // append refresh token to user
        User.findByIdAndUpdate(
            { _id: user._id },
            { $push: { refreshTokens: refresh_token } },
            function (err, success) {
                if (err) return res.status(500).send(err)

                res.status(200).send({
                    auth: true,
                    token: token,
                    refresh_token: refresh_token
                });
            }
        )
    });

});

// LOGOUT USER
router.get('/logout', function (req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

module.exports = router;