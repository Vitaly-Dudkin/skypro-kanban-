// src/pages/RegisterPage.jsx

import { useState } from 'react';
import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  return <AuthForm isSignUp={true} />;
}