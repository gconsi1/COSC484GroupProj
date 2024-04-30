const { MongoClient } = require("mongodb");
require("dotenv").config({path: "./config.env"});


async function main() {

    let client;

    try {
        // Retrieve MongoDB connection URI from environment variables
        const uri = process.env.ATLAS_URI;

        // Create a new MongoClient
        client = new MongoClient(uri);

        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Access a specific database (replace 'my_database_name' with your database name)
        const database = client.db("users");

        // Access a specific collection within the database (replace 'my_collection_name' with your collection name)
        const collection = database.collection("name");

        // Output the collection
        const documents = await collection.find().toArray();
        console.log("Collection contents:", documents);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the MongoDB connection
        if (client) {
            await client.close();
            console.log("MongoDB connection closed");
        }
    }
}

// Call the main function
main();