//require mongodb
const mongodb = require('mongodb')
//create connecion to mongodb
const MongoClient = mongodb.MongoClient

//connection url
const connectionUrl = 'mongodb://127.0.0.1:27017'
//define the specific database
const databaseName = 'reece'

MongoClient.connect(connectionUrl, {useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log("failure");
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: "reece obrien",
        age: 45
    }, (error, result) => {
        if(error){
            return console.log("failure");
        }

        console.log(result.ops);
    })
})

