import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { RegisterFormValuesType } from '@/scenes/Auth/SignUp';
import GoogleIcon from '@/components/Icons/Google';
import {
  ArrowCircleLeft,
  CheckCircleTwoTone,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import s from '../signup.module.scss';
import { countries } from 'countries-list';
import { AuthTypeKeys } from '@/constants';

const AuthDetails = ({ onReturn }: any) => {
  // console.log('countries : ', Object.values(countries));
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormikContext<RegisterFormValuesType>();
  const { values, handleChange } = formik;

  useEffect(() => {
    // console.log('formik : ', formik);
  }, [formik]);

  const PasswordAdornment = () => (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword((show) => !show)}
        onMouseDown={(event) => event.preventDefault()}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div className={s.auth_detail}>
      <header>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={() => {
              onReturn && onReturn();
            }}
          >
            <ArrowCircleLeft />
          </IconButton>
          <Typography variant="h4" className={s.title}>
            {formik.values.type === AuthTypeKeys.CLIENT
              ? 'Sign up to hire talent'
              : 'Sign up to find work you love'}
          </Typography>
        </Stack>
      </header>

      <Button variant="outlined" startIcon={<GoogleIcon />}>
        Continue with Google
      </Button>

      <div className={s.or}>
        <Typography variant="body1">or</Typography>
      </div>

      <Stack direction="row" spacing={2}>
        <TextField
          required
          fullWidth
          name="firstName"
          label="First name"
          type="text"
          variant="outlined"
          value={values.firstName}
          onChange={handleChange}
          error={Boolean(
            Array.isArray(formik.errors.firstName) &&
              (formik.errors.firstName as any),
          )}
          helperText={
            formik.errors.firstName && (formik.errors.firstName as any)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          required
          name="lastName"
          label="Last name"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={Boolean(
            Array.isArray(formik.errors.lastName) &&
              (formik.errors.lastName as any),
          )}
          helperText={formik.errors.lastName && (formik.errors.lastName as any)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          required
          name="password"
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={values.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: <PasswordAdornment />,
          }}
        />

        <TextField
          required
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          value={values.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <CheckCircleTwoTone
                color={
                  values.password && values.password === values.confirmPassword
                    ? 'primary'
                    : 'inherit'
                }
              />
            ),
          }}
          error={Boolean(formik.errors.confirmPassword as any)}
          helperText={
            formik.errors.confirmPassword &&
            (formik.errors.confirmPassword as any)
          }
        />
      </Stack>

      <TextField
        name="email"
        value={values.email}
        onChange={handleChange}
        label="Email"
        variant="outlined"
        fullWidth
      />

      {values.type === AuthTypeKeys.CLIENT && (
        <TextField
          name="companyName"
          type="text"
          value={values.companyName}
          onChange={handleChange}
          label="Company Name"
          variant="outlined"
          fullWidth
        />
      )}

      <Autocomplete
        disablePortal
        fullWidth
        // sx={{ width: 300 }}
        // multiple
        options={Object.values(countries)}
        getOptionLabel={(option) => option.name || ''}
        value={values.country as any}
        onChange={(event, newValue) => {
          formik.setFieldValue('country', newValue).then();
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="country"
            label="Your Location"
            fullWidth
            // required
          />
        )}
      />

      <FormControlLabel
        className={s.confirm}
        control={
          <Checkbox
            required
            name="agree"
            onChange={handleChange}
            value={values.agree}
          />
        }
        label="Yes, I understand and agree to the bloom Terms of Service, including the User Agreement and Privacy Policy."
      />
    </div>
  );
};

export default AuthDetails;
