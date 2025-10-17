require('dotenv').config()
const mongoose = require('mongoose');
let ConnectionString = "mongodb+srv://admin_db_user:un3iHK7349XHdHJ8@cluster001.cr0qlou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001"

module.exports = function(){

    mongoose.connect(ConnectionString);

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log('====> Connected to MongoDB.');
    })

    return mongodb;
}