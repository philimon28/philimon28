import mongoose from 'mongoose';

const debug = require('debug')('yay');
const error = require('debug')('error');

// connecting to database
const connectDB = async () => {
  const connectionUrl = process.env.MONGO_DB_URL;

  mongoose
    .connect(connectionUrl as any)
    .then((res) => {
      console.log('Database connected successfully', res.models);
      debug('Database connected successfully');
    })
    .catch((err) => {
      error('Getting Error from DB connection' + err.message);
      console.error('Getting Error from DB connection' + err.message);
    });
  mongoose.set('strictQuery', false);
};

export default connectDB;
