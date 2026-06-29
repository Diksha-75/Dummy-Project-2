// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-seal">🏛</span>
          <div>
            <div className="footer-city">City of Maplewood</div>
            <div className="footer-address">1 Civic Plaza, Maplewood, ST 00100</div>
            <div className="footer-address">(555) 201-4000 · info@maplewood.gov</div>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Services</h4>
            <Link to="/services">All Services</Link>
            <Link to="/permits">Permit Status</Link>
            <Link to="/departments">Departments</Link>
          </div>
          <div className="footer-col">
            <h4>Government</h4>
            <Link to="/council">City Council</Link>
            <Link to="/announcements">Announcements</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:5552014000">(555) 201-4000</a>
            <a href="mailto:info@maplewood.gov">info@maplewood.gov</a>
            <span>Mon–Fri 8:00 AM – 5:00 PM</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} City of Maplewood. All rights reserved. &nbsp;|&nbsp;
          <Link to="/announcements">Accessibility</Link> &nbsp;|&nbsp;
          <Link to="/announcements">Privacy Policy</Link>
        </div>
      </div>

      <style>{`
        .site-footer { background: var(--navy); color: rgba(255,255,255,0.75); margin-top: 64px; }
        .footer-inner { display: flex; flex-wrap: wrap; gap: 48px; padding: 48px 0 32px; justify-content: space-between; }
        .footer-brand { display: flex; gap: 16px; align-items: flex-start; max-width: 280px; }
        .footer-seal { font-size: 40px; line-height: 1; }
        .footer-city { font-family: var(--font-display); font-size: 17px; color: var(--white); margin-bottom: 6px; }
        .footer-address { font-size: 13px; line-height: 1.8; }
        .footer-links { display: flex; gap: 48px; flex-wrap: wrap; }
        .footer-col { display: flex; flex-direction: column; gap: 6px; }
        .footer-col h4 { font-family: var(--font-display); font-size: 13px; color: var(--gold-light); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
        .footer-col a, .footer-col span { color: rgba(255,255,255,0.7); font-size: 14px; text-decoration: none; transition: color 0.15s; }
        .footer-col a:hover { color: var(--white); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding: 16px 0; font-size: 12px; color: rgba(255,255,255,0.45); }
        .footer-bottom a { color: rgba(255,255,255,0.55); text-decoration: none; }
        .footer-bottom a:hover { color: var(--white); }
      `}</style>
    </footer>
  );
}

export default Footer;
