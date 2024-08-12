const mongoose = require('mongoose');
require('dotenv').config();

const mongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(()=>{
                console.log("Connection to database established");
            })
            .catch((e)=>{
                console.error(e);
                process.exit(1);
            })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = mongodb;
