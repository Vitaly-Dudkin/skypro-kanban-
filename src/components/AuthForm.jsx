// src/components/AuthForm.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = 'Имя обязательно';
      }
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

    // Очищаем ошибку при изменении поля
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
      // ✅ Всё валидно
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
    <div className="bg" style={{ padding: '20px' }}>
      <div className="modal" style={{ maxWidth: '400px', margin: '0 auto', background: 'white', borderRadius: '8px', padding: '30px' }}>
        <div className="logo" style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
          SkyPro Kanban
        </div>
        <div className="wrapper">
          <h2 className="title" style={{ textAlign: 'center', marginBottom: '20px' }}>
            {isSignUp ? 'Регистрация' : 'Вход'}
          </h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              {isSignUp && (
                <div style={{ marginBottom: '16px' }}>
                  <input
                    name="name"
                    type="text"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: errors.name ? '1px solid red' : '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                  {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <input
                  name="email"
                  type="email"
                  placeholder="Эл. почта"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.email ? '1px solid red' : '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <input
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.password ? '1px solid red' : '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              style={{
                width: '100%',
                padding: '12px',
                background: !isFormValid() || isSubmitting ? '#ccc' : '#565EEF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: !isFormValid() || isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '16px',
              }}
            >
              {isSubmitting ? 'Загрузка...' : isSignUp ? 'Зарегистрироваться' : 'Войти'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {isSignUp ? (
                <p>
                  Есть аккаунт?{' '}
                  <Link to="/login" style={{ color: '#565EEF', textDecoration: 'none' }}>
                    Войдите здесь
                  </Link>
                </p>
              ) : (
                <p>
                  Нужно зарегистрироваться?{' '}
                  <Link to="/register" style={{ color: '#565EEF', textDecoration: 'none' }}>
                    Регистрируйтесь здесь
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;