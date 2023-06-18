import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { MoButton } from '@/components/MoButton';
import { Login } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import SignInDetails from '@/scenes/Auth/SignIn/component/SignInDetails';
import s from './signin.module.scss';
import GoogleIcon from '@/components/Icons/Google';
import Link from 'next/link';
import { AuthTypeKeys } from '@/constants';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const initialValues = {
  email: '',
  password: '',
};

type FormStepName = 'Sign In' | 'Auth Details';
type FormStepType = {
  name: FormStepName;
  Step: (props: { onReturn: () => void }) => any;
  schema?: any;
};

export type AuthSignInFormValuesType = typeof initialValues;

const formSteps: FormStepType[] = [
  {
    name: 'Sign In',
    Step: (props: any) => <SignInDetails {...props} />,
  },
];

const SignIn = () => {
  const router = useRouter();

  const [btnAttribute, setBtnAttribute] = useState({
    disabled: true,
    loading: false,
    text: 'Create Account',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  const handleNext = () => {
    setActiveStep((activeStep) => Math.min(formSteps.length, activeStep + 1));
  };

  const handleBack = () => {
    setActiveStep((activeStep) => Math.max(0, activeStep - 1));
  };

  const getBtnTxt = (props: FormikProps<AuthSignInFormValuesType>) => {
    return {
      disabled: false,
      label: 'Login',
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
          enableReinitialize
          initialValues={initialValues}
          validationSchema={currentStep?.schema}
          onSubmit={async (
            values: AuthSignInFormValuesType,
            { setSubmitting, setFieldError },
          ) => {
            switch (currentStep.name) {
              case 'Sign In':
                console.log('onSubmit values :', values);

                // return;

                signIn(AuthTypeKeys.LOGIN, {
                  email: values.email,
                  password: values.password,
                  redirect: false,
                })
                  .then((res) => {
                    console.log('res ------  :', res);

                    if (!res?.ok && res?.error) {
                      toast.error(res.error || 'something went wrong');
                      return;
                    }

                    toast.success('successfully logged in');
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
        >
          {(props) => {
            const btnTxt = getBtnTxt(props);

            return (
              <Form>
                <div className={s.form_content}>
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
                    endIcon={<Login />}
                    fullWidth
                  >
                    {btnTxt.label}
                  </MoButton>

                  <div className={s.or}>
                    <Typography variant="body1">or</Typography>
                  </div>

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GoogleIcon />}
                  >
                    Continue with Google
                  </Button>

                  <Typography color="gray" fontWeight={300}>
                    Already have an account? &nbsp;&nbsp;
                    <Link href="/auth/register">
                      <Button variant="outlined">Register</Button>
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

export default SignIn;
