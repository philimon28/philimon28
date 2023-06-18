import React, { useEffect } from 'react';
import s from './review.module.scss';
import {
  Alert,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useFormikContext } from 'formik';
import { FormValuesType } from 'src/scenes/CreateJobPost';

const Review = () => {
  const formik = useFormikContext<FormValuesType>();
  const { values, handleChange } = formik;

  useEffect(() => {
    // convert values to array
    const row: any = [];

    const row1: any = [];

    /*
            * title: '',
          description: '',
          type: null,
          category: [],
          vacancy: '',
          deadline: '',
          email: '',
          salary: [20, 37],

          // requirements
          location: null,
          compensation: null,
          experience: null,
          skill: [],
            * */

    const r = [
      'title',
      'description',
      'type',
      'category',
      'vacancy',
      'deadline',
      'email',
    ];
    const r2 = ['salary', 'location', 'compensation', 'experience', 'skill'];

    const item = {};
  }, []);

  return (
    <div className={s.container}>
      <Typography className={s.step_title} gutterBottom>
        Review Job Post
      </Typography>

      <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
        <FormLabel sx={{ ml: '1rem' }}>Job Post Title</FormLabel>
        <TextField
          name="title"
          required
          fullWidth
          label="Job Title"
          value={values.title}
          placeholder="not provided"
          onChange={handleChange}
        />
      </Stack>

      <Alert severity="info">
        <Typography className={s.alert}>
          The job post will be visible to agents for 20 days, and they can apply
          for the position. You can update your job post’s visibility at any
          time.
        </Typography>
      </Alert>
      <div className={s.column}>
        <div className={s.row}>
          <div className={s.item}>
            <header>
              <Typography>Job Description</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.description || 'Not provided'}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Job Type</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              Not selected (required)
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Number of Hires Needed</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              6
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Skills Required</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              Not provided
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>English Fluency Level</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              First language is English
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Other Languages Required </Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              Spanish
            </Typography>
          </div>
        </div>

        <div className={s.row}>
          <div className={s.item}>
            <header>
              <Typography>Email</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              Not selected (required)
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Application Deadline</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              Not selected (required)
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Salary Amount (Range)</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              6
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Salary Compensation</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              First language is English
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Experience</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              Spanish
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
