import React from "react";


function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col-3">
            <img src="media/images/logo.svg" style={{ width: "50%" }} />
            <p className="mt-3 text-muted" style={{ fontSize: "14px" }}>
              &copy; 2010 - 2025, Zerodha Broking Ltd.<br />
              All rights reserved.
            </p>
          </div>
          <div className="col-3">
            <h6 className="mb-3">Account</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Open demat account</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Minor demat account</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>NRI demat account</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Commodity</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Dematerialisation</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Fund transfer</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>MTF</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Referral program</a>
            </div>
          </div>
          <div className="col-3">
            <h6 className="mb-3">Support</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Contact us</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Support portal</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>How to file a complaint?</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Status of your complaints</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Bulletin</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Circular</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Z-Connect blog</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Downloads</a>
            </div>
          </div>
          <div className="col-3">
            <h6 className="mb-3">Company</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>About</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Philosophy</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Press & media</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Careers</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Zerodha Cares (CSR)</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Zerodha.tech</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Open source</a>
            </div>
          </div>
        </div>
        {/* <div className="row mt-4">
          <div className="col-3"></div>
          <div className="col-3">
            <h6 className="mb-3">Quick links</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Upcoming IPOs</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Brokerage charges</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Market holidays</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Economic calendar</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Calculators</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Markets</a>
              <a href="" style={{ fontSize: "14px", color: "#666" }}>Sectors</a>
            </div>
          </div>
          <div className="col-6"></div>
        </div> */}
        <div className="mt-5 text-muted" style={{ fontSize: "12px", lineHeight: "1.6" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to <a href="mailto:complaints@zerodha.com" style={{ color: "#387ed1" }}>complaints@zerodha.com</a>, for DP related to <a href="mailto:dp@zerodha.com" style={{ color: "#387ed1" }}>dp@zerodha.com</a>. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on <a href="" style={{ color: "#387ed1" }}>SEBI SCORES</a>: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances
          </p>

          <p>
            <a href="" style={{ color: "#387ed1" }}>Smart Online Dispute Resolution</a> | <a href="" style={{ color: "#387ed1" }}>Grievances Redressal Mechanism</a>
          </p>

          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>

          <p>
            Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
          </p>

          <p>
            India's largest broker based on networth as per NSE. <a href="" style={{ color: "#387ed1" }}>NSE broker factsheet</a>
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please <a href="" style={{ color: "#387ed1" }}>create a ticket here</a>.
          </p>

          {/* Bottom navigation links */}
          <div className="mt-4 text-center">
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>NSE</a>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>BSE</a>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>MCX</a>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>Terms & conditions</a>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>Policies & procedures</a>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>Privacy policy</a>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>Disclosure</a>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>For investor's attention</a>
              <a href="" style={{ fontSize: "12px", color: "#999" }}>Investor charter</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
