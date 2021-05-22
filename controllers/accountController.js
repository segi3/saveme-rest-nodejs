const { bucket, db } = require('@util/firebase')
const usersCol = db.collection('users')

const saltedMd5 = require('salted-md5')

const registerAccount = async (req, res) => {

    /*
    * payload example

    * fullname: 'rafi nizar abiyyi'
    * email: 'rafi.nizar17@gmail.com'
    * password: password // lebih baik udah hashed

    * alamat: 'rahayu residence blok a7/1'
    * kota: 'Serang'
    * provinsi: 'Banten'

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
    registerAccount
}