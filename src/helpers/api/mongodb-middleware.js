import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  let DB_CONN_URL = process.env.mongodb.srv;
  if (!DB_CONN_URL) 
    DB_CONN_URL = "mongodb://localhost:27017/ainc_db";
  else
    DB_CONN_URL = "mongodb://" + DB_CONN_URL + ":" + process.env.mongodb.port + "/" + process.env.mongodb.db;

  // use new db connection
  await mongoose.connect(DB_CONN_URL, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true, 
    useNewUrlParse: true
  });

  return handler(req, res);
}

export {connectDB};