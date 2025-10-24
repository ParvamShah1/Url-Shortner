import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setAuthData } from '../utils/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://url-shortner-backend-vnle.onrender.com/user/signup', 
        formData,
        {
          withCredentials: true
        }
      );
      
      const userData = response.data.user || response.data.data || response.data;
      
      if (userData) {
        setAuthData(userData);
        navigate('/', { replace: true });
      } else {
        setError('Signup successful but invalid response format');
      }
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Signup failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg d-flex align-items-center justify-content-center p-3" style={{minHeight: '100vh'}}>
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-5">
            <div className="card card-shadow border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{
                         width: '80px', 
                         height: '80px',
                         background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                         opacity: 0.2
                       }}>
                    <i className="bi bi-person-plus-fill fs-1" style={{color: 'var(--accent-primary)'}}></i>
                  </div>
                  <h2 className="fw-bold">Create Account</h2>
                  <p className="text-muted">Join us today!</p>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-start" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0 mt-1"></i>
                    <div className="small">{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        minLength="2"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        minLength="6"
                      />
                    </div>
                    <small className="text-muted">Minimum 6 characters</small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gradient btn-lg w-100 text-white fw-bold mt-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-check-fill me-2"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0 small">
                    Already have an account?{' '}
                    <Link to="/login" className="fw-semibold text-decoration-none" style={{color: 'var(--accent-primary)'}}>
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
