import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: String,
  email: String,
  logo: String,

  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Job',
  },
});

const User = mongoose.models.User || mongoose.model('Company', CompanySchema);

export default User;
