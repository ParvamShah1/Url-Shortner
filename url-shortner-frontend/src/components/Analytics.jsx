import React, { useState } from 'react';
import api from '../utils/api';

const Analytics = () => {
  const [shortId, setShortId] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnalytics(null);

    try {
      const res = await api.get(`/url/analytics/${shortId}`);
      setAnalytics(res.data);
      setShortId('');
    } catch (error) {
      console.error('Analytics error:', error);
      setError(error.response?.data?.message || 'Error fetching analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card card-shadow border-0">
      <div className="card-body p-4 p-md-5">
        <div className="text-center mb-4">
          <i className="bi bi-bar-chart-fill fs-1 mb-3 d-block" style={{color: 'var(--accent-primary)'}}></i>
          <h2 className="fw-bold mb-2">View Analytics</h2>
          <p className="text-muted">Track your link performance</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="shortId" className="form-label fw-bold">
              Enter Short URL ID
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="shortId"
              placeholder="e.g., abc123"
              value={shortId}
              onChange={(e) => setShortId(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-success btn-lg w-100 fw-bold"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Fetching...
              </>
            ) : (
              <>
                <i className="bi bi-bar-chart-fill me-2"></i>
                Get Analytics
              </>
            )}
          </button>
        </form>

        {analytics && (
          <div className="mt-4">
            {/* Total Clicks Card */}
            <div className="analytics-card rounded p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <p className="text-muted mb-1 small">Total Clicks</p>
                  <h1 className="display-4 fw-bold mb-0" style={{color: 'var(--accent-primary)'}}>{analytics.totalclicks}</h1>
                </div>
                <div className="bg-white bg-opacity-10 rounded-circle p-3 d-flex align-items-center justify-content-center" style={{width: '70px', height: '70px'}}>
                  <i className="bi bi-graph-up-arrow fs-1" style={{color: 'var(--accent-primary)'}}></i>
                </div>
              </div>
            </div>

            {/* Click History */}
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0 fw-bold d-flex align-items-center">
                  <i className="bi bi-clock-history me-2"></i>
                  Click History
                </h5>
              </div>
              <div className="card-body p-0">
                {analytics.Analytics && analytics.Analytics.length > 0 ? (
                  <div className="list-group list-group-flush" style={{maxHeight: '400px', overflowY: 'auto'}}>
                    {analytics.Analytics.map((click, index) => (
                      <div key={click._id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <div className="d-flex align-items-center mb-2 mb-sm-0">
                            <span className="badge rounded-circle me-3 d-flex align-items-center justify-content-center" 
                                  style={{
                                    width: '35px', 
                                    height: '35px',
                                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                                  }}>
                              {index + 1}
                            </span>
                            <div>
                              <div className="fw-semibold">{formatDate(click.timestamp)}</div>
                              <small className="text-muted d-block d-sm-none">ID: {click._id.substring(0, 8)}...</small>
                              <small className="text-muted d-none d-sm-block">Click ID: {click._id}</small>
                            </div>
                          </div>
                          <i className="bi bi-check-circle-fill fs-4" style={{color: 'var(--success)'}}></i>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                    <p className="mb-0">No click history available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
