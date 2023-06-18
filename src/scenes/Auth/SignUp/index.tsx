import React, { useEffect, useState } from 'react';
import s from './signup.module.scss';
import { Form, Formik, FormikProps } from 'formik';
import { MoButton } from '@/components/MoButton';
import { ArrowCircleRightTwoTone } from '@mui/icons-material';
import AuthType from '@/scenes/Auth/SignUp/component/AuthType';
import AuthDetails from '@/scenes/Auth/SignUp/component/AuthDetails';
import { Button, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { AuthTypeKeys } from '@/constants';
import { Country } from 'countries-list';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const initialValues = {
  type: '' as AuthTypeKeys | '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '' as unknown as Country,
  firstName: '',
  lastName: '',
  companyName: '',
  agree: '',
};

type FormStepName = 'Auth Type' | 'Auth Details';
type FormStepType = {
  name: FormStepName;
  Step: (props: { onReturn: () => void }) => any;
  schema?: any;
};

export type RegisterFormValuesType = typeof initialValues;

const formSteps: FormStepType[] = [
  {
    name: 'Auth Type',
    Step: (props: any) => <AuthType {...props} />,
  },
  {
    name: 'Auth Details',
    Step: (props: any) => <AuthDetails {...props} />, // schema: JobDetailsSchema,
  },
];

const SignUp = () => {
  const [btnAttribute, setBtnAttribute] = useState({
    disabled: true,
    loading: false,
    text: 'Create Account',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  const router = useRouter();

  const handleNext = () => {
    setActiveStep((activeStep) => Math.min(formSteps.length, activeStep + 1));
  };

  const handleBack = () => {
    setActiveStep((activeStep) => Math.max(0, activeStep - 1));
  };

  const getBtnTxt = (props: FormikProps<RegisterFormValuesType>) => {
    if (currentStep.name === 'Auth Type') {
      if (props.values.type === AuthTypeKeys.FREELANCER) {
        return {
          disabled: false,
          label: 'Apply as a Freelancer',
        };
      } else if (props.values.type === AuthTypeKeys.CLIENT) {
        return {
          disabled: false,
          label: 'Join as a Client',
        };
      } else {
        return {
          disabled: true,
          label: 'Select an option',
        };
      }
    }

    return {
      disabled: false,
      label: 'Create My Account',
    };
  };

  useEffect(() => {
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Formik
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={true}
          // enableReinitialize
          validationSchema={currentStep?.schema}
          onSubmit={async (
            values: RegisterFormValuesType,
            { setSubmitting, setFieldError },
          ) => {
            switch (currentStep.name) {
              case 'Auth Type':
                console.log('onSubmit values :', values);

                if (values.type === '') return null;

                handleNext();
                break;

              case 'Auth Details':
                if (values.password !== values.confirmPassword) {
                  setFieldError('confirmPassword', 'Password does not match');
                  return null;
                }

                console.log('onSubmit values :', values);
                const country = values.country.name;

                // return ;
                signIn(values.type, {
                  email: values.email,
                  password: values.password,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  companyName: values.companyName,
                  country: (values.country as Country).name,
                  redirect: false,
                })
                  .then((res) => {
                    console.log('res ------  :', res);

                    if (!res?.ok && res?.error) {
                      toast.error(res.error || 'something went wrong');
                      return;
                    }

                    // redirect the user to the dashboard
                    toast.success('Account created successfully, welcome!');
                    router.push('/');
                  })
                  .catch((err) => {
                    console.log('sign in err :', err, err?.code);

                    toast.error(err.message || 'something went wrong');
                  });

                break;

              default:
                break;
            }
          }}
          initialValues={initialValues}
        >
          {(props) => {
            const btnTxt = getBtnTxt(props);

            return (
              <Form>
                <div className={s.form_content}>
                  {/*{currentStep?.component({})}*/}
                  <currentStep.Step onReturn={handleBack} />
                </div>

                <div className={s.controll}>
                  <MoButton
                    // onClick={handleNext}
                    motionProps={{
                      whileHover: {
                        scale: 1.01,
                      },
                    }}
                    disabled={btnTxt.disabled}
                    loading={btnAttribute.loading}
                    type="submit"
                    endIcon={<ArrowCircleRightTwoTone />}
                    fullWidth
                  >
                    {btnTxt.label}
                  </MoButton>

                  <Typography color="gray" fontWeight={300}>
                    Already have an account? &nbsp;&nbsp;
                    <Link href="/auth/login">
                      <Button variant="outlined">Login</Button>
                    </Link>
                  </Typography>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
