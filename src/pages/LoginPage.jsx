// src/pages/LoginPage.jsx

import { useState } from 'react';
import AuthForm from '../components/AuthForm';

export default function LoginPage({ setIsAuth }) {
  return <AuthForm isSignUp={false} setIsAuth={setIsAuth} />;
}