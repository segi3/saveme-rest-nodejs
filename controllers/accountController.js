const { bucket, db } = require('@util/firebase')
const usersCol = db.collection('users')

const saltedMd5 = require('salted-md5')

// TODO: api

// ! register
// ! fetch data user (pake _id si user)
// ! update/insert koordinat user
// ! update registration token punya user


// * nge ping user lain di sekitar

// * server nya python

const updateRegistrationToken = async (req, res) => {
    /*
    * payload example

    * _id: id punya user
    * deviceRegistrationToken: registration token punya user
    */

    if (!req.body) return res.status(500).send({ message: "Data was not provided"});

    let docRef = usersCol.doc(req.body._id)

    try {
        
        await docRef.update({
            deviceRegistrationToken: req.body.deviceRegistrationToken
        })

        res.status(200).send({
            message: "registration token update success.",
            new_token: req.body.deviceRegistrationToken
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "Failed to update token data."
        })
    }
}

const updateLocation = async (req, res) => {

    /*
    * payload example

    * _id: id punya user
    * lang: koodinat lang
    * lot: kodrinat lot
    */

    if (!req.body) return res.status(500).send({ message: "Data was not provided"});

    let docRef = usersCol.doc(req.body._id)

    try {
        
        await docRef.update({
            location: {
                long: req.body.long,
                lat: req.body.lat
            }
        })

        res.status(200).send({
            message: "location update success.",
            location: {
                long: req.body.long,
                lat: req.body.lat
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "Failed to update location data."
        })
    }

}

const fetchAccount = async (req, res) => {

    /*
    * payload example

    * _id: id punya user
    */

    if (!req.body) return res.status(500).send({ message: "Data was not provided"});

    try {

        const user_account = await usersCol.doc(req.body._id).get()

        res.status(200).send({
            message: "fetch success.",
            data: user_account.data()
        })

        
    console.log(user_account)

    }catch(err) {
        console.log(err)
        res.status(500).send({
            message: "Failed to fetch data."
        })
    }

}

const registerAccount = async (req, res) => {

    /*
    * payload example

    * fullname: 'rafi nizar abiyyi'
    * email: 'rafi.nizar17@gmail.com'
    * password: password // lebih baik udah hashed

    * alamat: 'rahayu residence blok a7/1'
    * kota: 'Serang'
    * provinsi: 'Banten'
    * zipcode: '42114'

    * deviceRegistrationToken: token dari fcm android
    */

    if (!req.body) return res.status(500).send({ message: "Data was not provided"});

    const account_uuid = saltedMd5(
        req.body.email,
        'mudahkan kami menyelesaikan project ini'
    )

    const doc_check = await usersCol.doc(account_uuid).get()

    if (doc_check.exists) { // ! email udah dipake
        return res.status(500).send({ message: "Email already taken."})
    } 

    try {

        const docRef = usersCol.doc(account_uuid)

        const insert_result = await docRef.set({
            _uuid: account_uuid,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            alamat: req.body.alamat,
            kota: req.body.kota,
            zipcode: req.body.zipcode,
            provinsi: req.body.provinsi,
            deviceRegistrationToken: req.body.deviceRegistrationToken
        })

        res.status(200).send({
            message: "Insert success.",
            _id: account_uuid
        })

    }catch(err) {
        console.log(err)
        res.status(500).send({
            message: "Failed to insert data.",
            error: err
        })
    }
}

module.exports = {
    registerAccount,
    fetchAccount,
    updateLocation,
    updateRegistrationToken
}