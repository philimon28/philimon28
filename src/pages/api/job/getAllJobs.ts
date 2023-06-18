import ConnectDB from '@/DB/connectDB';
import Job from '@/models/Job';

export default async (req: any, res: any) => {
  await ConnectDB();
  const { method } = req;
  switch (method) {
    case 'GET':
      await getAllJobs(req, res);
      break;
    default:
      res.status(400).json({ success: false, message: 'Invalid Request' });
  }
};

const getAllJobs = async (req: any, res: any) => {
  await ConnectDB();

  try {
    const gettingjobs = await Job.find({});
    // .populate('user');

    // console.log('getting jobs: ', gettingjobs);

    return res.status(200).json({ success: true, data: gettingjobs });
  } catch (error) {
    console.log('Error in getting a job (server) => ', error);
    return res.status(500).json({
      success: false,
      message: 'Something Went Wrong Please Retry login  !',
    });
  }
};
