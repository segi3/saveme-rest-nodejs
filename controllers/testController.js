const { bucket, db, messaging } = require('@util/firebase')
const usersCol = db.collection('users')

const saltedMd5 = require('salted-md5')
const path = require('path')

const express = require('express')
const { storage } = require('firebase-admin')
const app = express()

const fcm_test = (req, res) => {

    const notification_options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24
    }

    const registration_tokens = ["fJQGPhG5SIC93z7T1OY2YQ:APA91bG6EzjNyuTFLEBfih1hkS44MVGnwW9fwHUB8uImS7f_kryspfRPwtc8nR7xvIFgJJcUWECtAp2C-xHzLdzi7HvGgEAC0-RlVE5-VTWZws7UtGEwNnmfYrqgijrLuVkX48mYq39f"]

    const payload = {
            notification: {
                title: 'title You have a new follower!',
                body: `body is now following you.`,
        }
      };

    messaging.sendToDevice(registration_tokens, payload, notification_options)
        .then((response) => {
            console.log(response)
            res.status(200).send({message: 'notification successfully sent.'})
        })
        .catch((err) => {
            res.status(500).send({message: 'failed to send nottif :(', error: err})
            console.log(err)
        })
}

const index_test = async (req, res) => {

    if (!req.body) return res.status(500).send({ message: "Some data was not provided"});

    let docRef = usersCol.doc('rafi nizar')

    try {
        await docRef.set({
            age: 21,
            email: 'rafi@email.com'
        })

        // cara lain pake add
        await usersCol.add({
            age: 21,
            email: 'rafi2@email.com'
        })
    

        res.status(200).send({
            body: req.body
        })
    } catch (error) {
        res.status(500).send({
            message: "Failed to communicate with database."
        })
    }
    
}

const file_test = async (req, res) => {

    // console.log(req)

    const name = saltedMd5(req.file.originalname, process.env.FILENAME_SALT)
    const filename = name + path.extname(req.file.originalname)
    
    await bucket.file('user_images/' + filename).createWriteStream()
        .on('error', (err) => res.status(500).send({ message: "Internal server error. "}))
        .end(req.file.buffer)
        .on('response', (storageResponse) => {
            console.log(storageResponse)
            res.status(200).send({
                filename,
                message: 'Upload successfull.'
            })
        })
        
}

const file_download = async (req, res) => {

    await bucket.file('user_images/5d8544ba44f96a7735ccc71001341de0.PNG').createReadStream()
        .on('error', (err) => res.status(500).send({ message: "Internal server error. "}))
        .on('response', (storageResponse) => {
            // console.log(storageResponse)
            res.setHeader(
                "content-type", storageResponse.headers["content-type"]
            )
            res.setHeader(
                "content-length", storageResponse.headers["content-length"]
            )
            res.status(200)
        })
        .on('end', () => res.end())
        .pipe(res)
}

module.exports = {
    index_test,
    file_test,
    file_download,
    fcm_test
}