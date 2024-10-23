// Import the MongoDB client
const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';  // Replace with your MongoDB server
const dbName = 'myDatabase';  // Replace with your database name

async function main() {
    // Create a new MongoClient
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected successfully to MongoDB server');

        // Select the database and collection
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Insert a document into the collection
        const insertResult = await collection.insertOne({ name: 'John Doe', email: 'johndoe@example.com' });
        console.log('Inserted document:', insertResult.insertedId);

        // Query documents from the collection
        const queryResult = await collection.find({ name: 'John Doe' }).toArray();
        console.log('Query result:', queryResult);

        // Update a document in the collection
        const updateResult = await collection.updateOne({ name: 'John Doe' }, { $set: { email: 'john.updated@example.com' } });
        console.log('Updated document:', updateResult.modifiedCount);

        // Delete a document from the collection
        const deleteResult = await collection.deleteOne({ name: 'John Doe' });
        console.log('Deleted document count:', deleteResult.deletedCount);
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

main().catch(console.error);
