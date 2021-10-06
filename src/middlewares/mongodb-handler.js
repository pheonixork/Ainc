import mongoose from 'mongoose'

//const connection =  /* creating connection object*/
global.connection = global.connection || {};

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (global.connection.isConnected) {
    return true;
  }

  let dbConnectUrl = process.env.MONGODB_URI + process.env.DB_NAME;
  /* connecting to our database */
  await mongoose.connect(dbConnectUrl).then(() => {
    global.connection.isConnected = true;
  }).catch((e) => {
    global.connection.isConnected = false;
  });

  return global.connection.isConnected;
}

export default dbConnect