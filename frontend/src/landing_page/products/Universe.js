import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <img 
              src="media/images/zerodhaFundhouse.png" 
              style={{ width: "60%", height: "80px", objectFit: "contain", marginBottom: "20px" }}
              alt="Zerodha Fundhouse"
            />
            <p className="text-small text-muted" style={{ textAlign: "center", fontSize: "14px", lineHeight: "1.4" }}>
              Our asset management venture that is creating simple and transparent index funds to help you save for your goals.
            </p>
          </div>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <img 
              src="media/images/sensibullLogo.svg" 
              style={{ width: "60%", height: "80px", objectFit: "contain", marginBottom: "20px" }}
              alt="Sensibull"
            />
            <p className="text-small text-muted" style={{ textAlign: "center", fontSize: "14px", lineHeight: "1.4" }}>
              Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.
            </p>
          </div>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <img 
              src="media/images/goldenpiLogo.png" 
              style={{ width: "60%", height: "80px", objectFit: "contain", marginBottom: "20px" }}
              alt="Tijori (Goldenpi)"
            />
            <p className="text-small text-muted" style={{ textAlign: "center", fontSize: "14px", lineHeight: "1.4" }}>
              Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.
            </p>
          </div>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <img 
              src="media/images/streakLogo.png" 
              style={{ width: "60%", height: "80px", objectFit: "contain", marginBottom: "20px" }}
              alt="Streak"
            />
            <p className="text-small text-muted" style={{ textAlign: "center", fontSize: "14px", lineHeight: "1.4" }}>
              Systematic trading platform that allows you to create and backtest strategies without coding.
            </p>
          </div>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <img 
              src="media/images/smallcaseLogo.png" 
              style={{ width: "60%", height: "80px", objectFit: "contain", marginBottom: "20px" }}
              alt="Smallcase"
            />
            <p className="text-small text-muted" style={{ textAlign: "center", fontSize: "14px", lineHeight: "1.4" }}>
              Thematic investing platform that helps you invest in diversified baskets of stocks on NSE.
            </p>
          </div>
        </div>
        <div className="col-4 p-3 mt-5">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <img 
              src="media/images/dittoLogo.png" 
              style={{ width: "60%", height: "80px", objectFit: "contain", marginBottom: "20px" }}
              alt="Ditto Insurance"
            />
            <p className="text-small text-muted" style={{ textAlign: "center", fontSize: "14px", lineHeight: "1.4" }}>
              Personalized advice on life and health insurance. No spam and no mis-selling.
            </p>
          </div>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
