import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./utils/auth.js";
import api from "./utils/api.js";
import Analytics from "./components/Analytics.jsx";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = async () => {
    try {
      await api.post('/user/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      navigate("/login", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await api.post("/url", { url });
      setShortUrl(`http://localhost:8001/url/${res.data.id}`);
      setUrl("");
    } catch (error) {
      console.error('URL shortening error:', error);
      
      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => {
          localStorage.removeItem('user');
          navigate('/login', { replace: true });
        }, 2000);
      } else {
        setError(error.response?.data?.message || "Error generating short URL");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="gradient-bg-light">
      {/* Header */}
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <i className="bi bi-link-45deg fs-2 me-2" style={{color: 'var(--accent-primary)'}}></i>
            <span className="fw-bold fs-4">URL Shortener</span>
          </a>
          <div className="d-flex align-items-center flex-wrap justify-content-end">
            <div className="text-end me-3 d-none d-md-block">
              <small className="text-muted d-block">Welcome back,</small>
              <strong style={{color: 'var(--accent-primary)'}}>{user?.name || 'User'}</strong>
            </div>
            <button onClick={handleLogout} className="btn btn-danger">
              <i className="bi bi-box-arrow-right me-2"></i>
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container pb-5" style={{position: 'relative', zIndex: 1}}>
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card card-shadow border-0 mb-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-lightning-charge-fill fs-1" style={{color: 'var(--accent-primary)'}}></i>
                  </div>
                  <h2 className="fw-bold mb-2">Shorten Your URL</h2>
                  <p className="text-muted">Create short, memorable links in seconds</p>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0"></i>
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="urlInput" className="form-label fw-bold">
                      Enter Your Long URL
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text">
                        <i className="bi bi-globe"></i>
                      </span>
                      <input
                        type="url"
                        className="form-control"
                        id="urlInput"
                        placeholder="https://example.com/very-long-url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-gradient btn-lg w-100 text-white fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Shortening...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-lightning-fill me-2"></i>
                        Shorten URL
                      </>
                    )}
                  </button>
                </form>

                {shortUrl && (
                  <div className="success-card rounded p-3 p-md-4 mt-4 animate-fadeIn">
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-check-circle-fill fs-4 me-2" style={{color: 'var(--success)'}}></i>
                      <strong>Your Shortened URL:</strong>
                    </div>
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={shortUrl} 
                        readOnly 
                      />
                      <button 
                        onClick={handleCopy} 
                        className="btn btn-primary flex-shrink-0"
                      >
                        <i className="bi bi-clipboard me-1"></i>
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Component */}
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
