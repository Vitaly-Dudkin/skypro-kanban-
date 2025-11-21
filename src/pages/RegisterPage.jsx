// src/pages/RegisterPage.jsx

import { useState } from 'react';
import AuthForm from '../components/AuthForm';

export default function RegisterPage({ setIsAuth }) {
  return <AuthForm isSignUp={true} setIsAuth={setIsAuth} />;
}