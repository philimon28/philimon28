import React, { useEffect, useState } from 'react';
import s from './postjob.module.scss';
import {
  Button,
  Divider,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { AnimatePresence, motion, transform } from 'framer-motion';
import {
  ArrowCircleLeftTwoTone,
  ArrowCircleRightTwoTone,
} from '@mui/icons-material';
import JobRequirement from '@/scenes/CreateJobPost/JobRequirement';
import Review from '@/scenes/CreateJobPost/Review';
import JobDetails, {
  schema as JobDetailsSchema,
} from '@/scenes/CreateJobPost/JobDetails';
import { MoButton } from '@/components/MoButton';
import {
  transition,
  wrapperVariants,
} from '@/scenes/CreateJobPost/util/variants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

type FormStepName = 'Job Details' | 'Job Requirements' | 'Review' | 'Done';
type FormStepType = {
  name: FormStepName;
  component: (props: any) => any;
  schema?: any;
};

const formSteps: FormStepType[] = [
  {
    name: 'Job Details', // components: (props: any) => <Review {...props} />,
    component: (props: any) => <JobDetails {...props} />,
    schema: JobDetailsSchema,
  },
  {
    name: 'Job Requirements',
    component: (props: any) => <JobRequirement {...props} />, // schema: JobDetailsSchema,
  },
  {
    name: 'Review',
    component: (props: any) => <Review {...props} />,
  },
  {
    name: 'Done',
    component: (props: any) => <h1>congradulation </h1>,
  },
];

const initialValues = {
  title: '',
  description: '',
  type: null,
  category: [],
  vacancy: '',
  deadline: '',
  email: '',
  salary: [20, 1_000_000_000],

  // requirements
  location: null,
  compensation: null,
  experience: null,
  skill: [],
};

export type FormValuesType = typeof initialValues;

const PostJob = () => {
  const router = useRouter();

  const user = useSelector((state: any) => state.User.userData);

  console.log('user: ', user);

  const [dir, setDir] = useState<'RIGHT' | 'LEFT'>();
  const [activeStep, setActiveStep] = React.useState(0);
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActiveStep((activeStep) => Math.min(formSteps.length, activeStep + 1));
    setDir('LEFT');
  };

  const handleBack = () => {
    setActiveStep((activeStep) => Math.max(0, activeStep - 1));
    setDir('RIGHT');
  };

  useEffect(() => {
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

  const postNow = currentStep.name === 'Review';

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <header>
          <Typography variant="h3" className={s.title} gutterBottom>
            Create A Job Post
          </Typography>

          <Divider
            variant="fullWidth"
            orientation="horizontal"
            className={s.divider}
          />
        </header>

        <Stepper activeStep={activeStep} className={s.stepper}>
          {formSteps.map(({ name }, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={name} {...stepProps}>
                <StepLabel {...labelProps}>{name}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className={s.content}>
          {/*<form onSubmit={formik.handleSubmit}>*/}
          <Formik
            validateOnMount={false}
            validateOnChange={false}
            validateOnBlur={true}
            enableReinitialize
            validationSchema={currentStep?.schema}
            onSubmit={async (values: any, { setSubmitting }) => {
              console.log('onSubmit values :', values);

              switch (currentStep.name) {
                case 'Job Details':
                  handleNext();
                  break;
                case 'Job Requirements':
                  handleNext();
                  break;
                case 'Review':
                  const job = {
                    user: '647b2b3adc6e13d72b791be6',
                    title: values.title,
                    description: values.description,
                    company: 'company',
                    email: values.email,
                    salary: values.salary,
                    job_type: values.type.label,
                    job_category: values.category.map((c: any) => c.label),
                    job_experience: values.experience,
                    job_vacancy: values.vacancy,
                    job_deadline: values.deadline,
                    compensation: values.compensation.label.toLowerCase(),
                    job_skills: values.skill.map((c: any) => c.label),
                  };

                  const post = await axios
                    .post(
                      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/postAJob`,
                      job,
                    )
                    .then((res) => {
                      console.log('job list: ', res.data);

                      router.push('/job-posts');
                    })
                    .catch((err) => {
                      console.log('error geting jobs: ', err);
                    });

                  console.log('job :', job);
                  return;

                  handleNext();
                  break;
                case 'Done':
                  handleNext();
                  break;
                default:
                  break;
              }
            }}
            initialValues={initialValues}
          >
            {(props) => {
              return (
                <Form>
                  <div className={s.form_content}>
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        className={s.animator}
                        key={currentStep.name}
                        variants={wrapperVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                        custom={{ direction: dir }}
                      >
                        {currentStep?.component({})}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className={s.controll}>
                    <div className={s.progress}>
                      <LinearProgress
                        variant="determinate"
                        value={transform(
                          [0, formSteps.length],
                          [0, 100],
                        )(activeStep)}
                      />
                    </div>

                    <Button variant="text">Exit</Button>

                    <div className={s.controlle_right} id="sticky">
                      <MoButton
                        onClick={handleBack}
                        startIcon={<ArrowCircleLeftTwoTone />}
                        disabled={activeStep === 0}
                      >
                        Back
                      </MoButton>

                      <MoButton
                        // onClick={handleNext}
                        type="submit"
                        endIcon={<ArrowCircleRightTwoTone />}
                      >
                        {postNow ? 'Post Job' : 'Next'}
                      </MoButton>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>

          {/*</form>*/}
        </div>
      </div>
    </div>
  );
};

export default PostJob;
