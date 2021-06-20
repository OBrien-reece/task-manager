const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionUrl = "mongodb://127.0.0.1/27017"
const databaseName = 'robo3t'

MongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log("Unable to connect to the database");
    }

    const db = client.db(databaseName)
    
    //CREATE 
    /*
    db.collection('tasks').insertMany([
        {
            task: "Hunting",
            name: "Evance",
            age: 23
        },{
            task: "Gathering",
            name: "Rachael",
            age: 12
        },{
            task: "Climbing Trees",
            name: "Stoneface",
            age: 45
        }
    ], (error, result) => {
        if(error){
            return console.log("There was an error... please try again");
        }

        console.log("Successfuy inserted user data");
    })
    */

    //READ
    /*
    db.collection('tasks').findOne({ task: "Gathering" }, (error, result) => {
        console.log(result);
    })
    */

    /*
    db.collection('tasks').find({ task: "Gathering" }).count((error, result) => {
        console.log(result);
    })
    */

    //UPDATE
    /*
    db.collection('tasks').updateOne({
        task: "Hunting"
    },{
        $inc: {
            age: 4
        },
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    */
   
    //DELETE
    /*
    db.collection('tasks').deleteOne({
        task: "Hunting"
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    */
})