import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import { login_me } from '@/Services/auth';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/Utils/UserSlice';
import SignIn from '@/scenes/Auth/SignIn';

export default function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError({ ...error, email: 'Email Field is Required' });
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: 'Password Field is required' });
      return;
    }

    const res = await login_me(formData);
    if (res.success) {
      Cookies.set('token', res?.finalData?.token);
      localStorage.setItem('user', JSON.stringify(res?.finalData?.user));
      dispatch(
        setUserData(
          localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null,
        ),
      );
      Router.push('/');
    } else {
      toast.error(res.message);
    }
  };

  return <SignIn />;
}
