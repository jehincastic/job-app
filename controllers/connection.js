const MongoClient = require("mongodb").MongoClient;

module.exports = {
    getConnection: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const url = process.env.mongoURI;
                const dbName = process.env.dbName;
                const client = new MongoClient(url, { useUnifiedTopology: true });
                await client.connect();
                const db = client.db(dbName)
                resolve([client, db]);
            } catch (error) {
                console.log("Could Not Create Connection Due to....", error);
                reject(error);   
            }
        })
        
    },
    
    closeConnection: (client) => {
        try {
            client.close();
        } catch (error) {
            console.log("Could Not Close Connection Due to....", error);
        }
    }
}