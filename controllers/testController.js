const { db } = require('../utils/firebase')
const usersCol = db.collection('users')

const index_test = async (req, res) => {

    if (!req.body) return res.status(500).send({ message: "Some data was not provided"});

    let docRef = usersCol.doc('rafi nizar')

    try {
        await docRef.set({
            age: 21,
            email: 'rafi@email.com'
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

module.exports = {
    index_test
}