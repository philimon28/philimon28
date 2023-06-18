import { Model, model, models, Schema } from 'mongoose';

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  address: {
    country: string;
  };
}

type IUserDocument = IUser & Document;

const UserSchema = new Schema<IUserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    country: { type: String, required: true },
  },

  /*portfolio: {
    experienceYear: Number,
    experience: [
      {
        company: String,
        year: String,
        role: String,
      },
    ],
  },*/

  // saved_job
});

const User = (models.User ||
  model<IUser>('User', UserSchema)) as Model<IUserDocument>;

export default User;
export type { IUser };
