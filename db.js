var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://segi3:4re6vpivYC4koADm@cluster0.iuqmx.mongodb.net/yabot?retryWrites=true&w=majority', {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
})

mongoose.set('useFindAndModify', false);