import React from 'react';
import s from '../signup.module.scss';
import { Button, Typography } from '@mui/material';
import {
  AccountCircleTwoTone,
  ContentPasteSearchTwoTone,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { useFormikContext } from 'formik';
import { RegisterFormValuesType } from '@/scenes/Auth/SignUp';
import clsx from 'clsx';
import { AuthTypeKeys } from '@/constants';

const aType = [
  {
    label: "I'm a client, hiring for a project",
    value: AuthTypeKeys.CLIENT,
    checked: false,
    Icon: AccountCircleTwoTone,
  },
  {
    label: "I'm a freelancer, looking for work",
    value: AuthTypeKeys.FREELANCER,
    checked: false,
    Icon: ContentPasteSearchTwoTone,
  },
];

const AuthType = () => {
  const formik = useFormikContext<RegisterFormValuesType>();

  // console.log('formik : ', formik);

  return (
    <div className={s.auth_type}>
      <header>
        <Typography variant="h4" className={s.title}>
          Join as a Client or Freelancer
        </Typography>
      </header>

      <div className={s.auth_type__buttons}>
        {aType.map((type) => {
          const selected = type.value === formik.values.type;
          return (
            <Button
              color={selected ? 'primary' : 'inherit'}
              className={clsx([s.item, selected && s.selected])}
              key={type.label}
              onClick={() => {
                formik.setFieldValue('type', type.value).then();
                formik.setFieldTouched('type', true);
              }}
            >
              {selected ? (
                <RadioButtonChecked color="primary" className={s.radio} />
              ) : (
                <RadioButtonUnchecked className={s.radio} />
              )}

              <type.Icon className={s.icon} fontSize="large" />
              <Typography variant="body1" className={s.label}>
                {type.label}
              </Typography>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AuthType;
