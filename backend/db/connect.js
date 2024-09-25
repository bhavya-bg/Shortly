const mongoose = require("mongoose");
const uri = process.env.Mongo_URL;
const connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        await mongoose.connect(uri);
        console.log("connected to database successfully");
    } catch (error) {
        console.log("could not connect to database.", error);
    }
};

module.exports=connect;