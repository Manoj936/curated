import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("No env variable detected in .env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const ConnectToDB = async () => {
  if (cached.conn) {
    console.log('Alread active connection found')
    return cached.conn;
  }

  if (!cached.conn) {
    const dbOptions = {
      maxPoolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, dbOptions).then(()=>mongoose.connection);
  }

  try {

    cached.conn = await cached.promise;
    if(cached.conn){
        console.log('DATABASE CONNECTION ESTABLISHED')
    }
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
};

