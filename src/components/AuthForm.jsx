// src/components/AuthForm.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, register } from '../services/auth';
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

const AuthForm = ({ isSignUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    login: '', // ← изменили email → login
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = 'Имя обязательно';
      }
    }

    if (!formData.login.trim()) {
      newErrors.login = 'Логин обязателен';
    } else if (formData.login.length < 3) {
      newErrors.login = 'Логин должен быть не короче 3 символов';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не короче 6 символов';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      let response;
      if (isSignUp) {
        response = await register({
          login: formData.login, 
          name: formData.name,
          password: formData.password,
        });
      } else {
        response = await login({
          login: formData.login, 
          password: formData.password,
        });
      }

      // Сохраняем токен
      localStorage.setItem('token', response.user.token);
      localStorage.setItem('isAuth', 'true');

      navigate('/');
    } catch (error) {
      setSubmitError(error.message || 'Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.login &&
      formData.password &&
      (!isSignUp || formData.name) &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <AuthContainer>
      <ModalBox>
        <Logo>SkyPro Kanban</Logo>
        {submitError && <ErrorText>{submitError}</ErrorText>}
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
                  name="login"
                  type="text"
                  placeholder="Логин"
                  value={formData.login}
                  onChange={handleChange}
                  $hasError={!!errors.login}
                />
                {errors.login && <ErrorText>{errors.login}</ErrorText>}
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