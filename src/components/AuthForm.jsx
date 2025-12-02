// src/components/AuthForm.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AuthContainer,
  ModalBox,
  Logo,
  Title,
  InputWrapper,
  Input,
  ErrorText,
  SubmitButton,
  SwitchLink,
  LinkStyled,
} from './AuthForm.styled';

const AuthForm = ({ isSignUp, setIsAuth }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не короче 6 символов';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userEmail', formData.email);
      setIsAuth(true);
      navigate('/');
    }

    setIsSubmitting(false);
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      (!isSignUp || formData.name) &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <AuthContainer>
      <ModalBox>
        <Logo>SkyPro Kanban</Logo>
        <div className="wrapper">
          <Title>{isSignUp ? 'Регистрация' : 'Вход'}</Title>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              {isSignUp && (
                <InputWrapper>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    $hasError={!!errors.name}
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </InputWrapper>
              )}

              <InputWrapper>
                <Input
                  name="email"
                  type="email"
                  placeholder="Эл. почта"
                  value={formData.email}
                  onChange={handleChange}
                  $hasError={!!errors.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </InputWrapper>

              <InputWrapper>
                <Input
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  $hasError={!!errors.password}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </InputWrapper>
            </div>

            <SubmitButton
              type="submit"
              $disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? 'Загрузка...' : isSignUp ? 'Зарегистрироваться' : 'Войти'}
            </SubmitButton>

            <SwitchLink>
              {isSignUp ? (
                <>
                  Есть аккаунт?{' '}
                  <LinkStyled to="/login">Войдите здесь</LinkStyled>
                </>
              ) : (
                <>
                  Нужно зарегистрироваться?{' '}
                  <LinkStyled to="/register">Регистрируйтесь здесь</LinkStyled>
                </>
              )}
            </SwitchLink>
          </form>
        </div>
      </ModalBox>
    </AuthContainer>
  );
};

export default AuthForm;