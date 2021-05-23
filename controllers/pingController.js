const { db } = require('@util/firebase')
const usersCol = db.collection('users')
const pingCol = db.collection('ping_histories')

// TODO: api


// * nge ping user lain di sekitar

const pingOthers = async (req, res) => {

    /*
    * payload example

    * _id: id punya user
    * kejahatan: pilihan kejahatan yang dipilih user
    * 
    * long: kordinat longitude
    * lat: kordinat latitude
    * 
    * deviceRegistrationToken: registration token punya user
    */

    if (!req.body) return res.status(500).send({ message: "Data was not provided"});

    // fetch account data
    try {
        const user_account = await usersCol.doc(req.body._id).get()

        const ping_history = {
            _id: req.body._id,
            time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            user_data: user_account.data(),
            kejahatan: req.body.kejahatan,
            location: {
                long: req.body.long,
                lat: req.body.lat
            },
            deviceRegistrationToken: req.body.deviceRegistrationToken
        }

        await pingCol.add(ping_history)

        res.status(200).send({
            message: "ping success.",
            ping_data: ping_history
        })

    } catch (err) {
        res.status(500).send({
            message: "failed to send ping."
        })
    }
}

module.exports = {
    pingOthers
}