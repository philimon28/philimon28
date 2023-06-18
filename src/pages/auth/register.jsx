import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register_me } from '@/Services/auth';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import SignUp from '@/scenes/Auth/SignUp';

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('token')) {
      router.push('/');
    }
  }, [router]);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '', name: '' });

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
    if (!formData.name) {
      setError({ ...error, name: 'Name Field is required' });
      return;
    }

    const data = await register_me(formData);
    if (data.success) {
      toast.success(data.message);
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } else {
      toast.error(data.message);
    }
  };

  return <SignUp />;
}
