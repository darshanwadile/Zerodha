import React, { useState } from "react";

function Hero() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="row">
        <div className="col-8">
          <h1 style={{ fontSize: "2.5rem", fontWeight: "400", color: "#424242" }}>Support Portal</h1>
        </div>
        <div className="col-4 text-end">
          <button className="btn btn-primary">My tickets</button>
        </div>
      </div>

      {/* Search Section */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="position-relative">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Eg: How do I open my account, How do I activate F&O..."
              style={{ 
                padding: "15px 20px", 
                fontSize: "16px", 
                border: "2px solid #e0e0e0",
                borderRadius: "5px"
              }}
            />
            <i className="fa fa-search position-absolute" style={{ right: "15px", top: "50%", transform: "translateY(-50%)", color: "#999" }}></i>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="row mt-5">
        {/* Left Column - Expandable Sections */}
        <div className="col-8">
          {/* Account Opening Section */}
          <div className="border-bottom mb-3">
            <div 
              className="d-flex align-items-center py-3" 
              style={{ cursor: "pointer" }}
              onClick={() => toggleSection('account')}
            >
              <i className="fa fa-plus-circle me-3" style={{ color: "#387ed1", fontSize: "20px" }}></i>
              <h5 className="mb-0">Account Opening</h5>
              <i className={`fa fa-chevron-${expandedSection === 'account' ? 'up' : 'down'} ms-auto`} style={{ color: "#999" }}></i>
            </div>
            {expandedSection === 'account' && (
              <div className="ps-5 pb-3">
                <p className="text-muted">Getting started with account opening process, documentation, and requirements.</p>
              </div>
            )}
          </div>

          {/* Your Zerodha Account Section */}
          <div className="border-bottom mb-3">
            <div 
              className="d-flex align-items-center py-3" 
              style={{ cursor: "pointer" }}
              onClick={() => toggleSection('zerodha-account')}
            >
              <i className="fa fa-user-circle me-3" style={{ color: "#387ed1", fontSize: "20px" }}></i>
              <h5 className="mb-0">Your Zerodha Account</h5>
              <i className={`fa fa-chevron-${expandedSection === 'zerodha-account' ? 'up' : 'down'} ms-auto`} style={{ color: "#999" }}></i>
            </div>
            {expandedSection === 'zerodha-account' && (
              <div className="ps-5 pb-3">
                <p className="text-muted">Account management, profile updates, and account-related queries.</p>
              </div>
            )}
          </div>

          {/* Kite Section */}
          <div className="border-bottom mb-3">
            <div 
              className="d-flex align-items-center py-3" 
              style={{ cursor: "pointer" }}
              onClick={() => toggleSection('kite')}
            >
              <i className="fa fa-desktop me-3" style={{ color: "#387ed1", fontSize: "20px" }}></i>
              <h5 className="mb-0">Kite</h5>
              <i className={`fa fa-chevron-${expandedSection === 'kite' ? 'up' : 'down'} ms-auto`} style={{ color: "#999" }}></i>
            </div>
            {expandedSection === 'kite' && (
              <div className="ps-5 pb-3">
                <p className="text-muted">Trading platform features, charts, orders, and Kite-related help.</p>
              </div>
            )}
          </div>

          {/* Funds Section */}
          <div className="border-bottom mb-3">
            <div 
              className="d-flex align-items-center py-3" 
              style={{ cursor: "pointer" }}
              onClick={() => toggleSection('funds')}
            >
              <i className="fa fa-credit-card me-3" style={{ color: "#387ed1", fontSize: "20px" }}></i>
              <h5 className="mb-0">Funds</h5>
              <i className={`fa fa-chevron-${expandedSection === 'funds' ? 'up' : 'down'} ms-auto`} style={{ color: "#999" }}></i>
            </div>
            {expandedSection === 'funds' && (
              <div className="ps-5 pb-3">
                <p className="text-muted">Fund transfers, withdrawals, payment gateways, and fund-related queries.</p>
              </div>
            )}
          </div>

          {/* Console Section */}
          <div className="border-bottom mb-3">
            <div 
              className="d-flex align-items-center py-3" 
              style={{ cursor: "pointer" }}
              onClick={() => toggleSection('console')}
            >
              <i className="fa fa-cog me-3" style={{ color: "#387ed1", fontSize: "20px" }}></i>
              <h5 className="mb-0">Console</h5>
              <i className={`fa fa-chevron-${expandedSection === 'console' ? 'up' : 'down'} ms-auto`} style={{ color: "#999" }}></i>
            </div>
            {expandedSection === 'console' && (
              <div className="ps-5 pb-3">
                <p className="text-muted">Back-office portal for reports, statements, and administrative functions.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Quick Links & Featured */}
        <div className="col-4">
          <div className="border-start ps-4">
            {/* Featured Section */}
            <div className="mb-4">
              <h6 className="text-warning mb-3">
                <i className="fa fa-star me-2"></i>
                Featured
              </h6>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a href="" style={{ color: "#387ed1", fontSize: "14px" }}>
                  Exclusion of F&O contracts on 8 securities from August 29, 2025
                </a>
                <a href="" style={{ color: "#387ed1", fontSize: "14px" }}>
                  Revision in expiry day of Index and Stock derivatives contracts
                </a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h6 className="mb-3">Quick links</h6>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href="" style={{ color: "#387ed1", fontSize: "14px" }}>
                  1. Track account opening
                </a>
                <a href="" style={{ color: "#387ed1", fontSize: "14px" }}>
                  2. Track segment activation
                </a>
                <a href="" style={{ color: "#387ed1", fontSize: "14px" }}>
                  3. Intraday margins
                </a>
                <a href="" style={{ color: "#387ed1", fontSize: "14px" }}>
                  4. Kite user manual
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
