// src/components/Header.js
// LEGACY CLASS COMPONENT — migration target: convert to functional + useRef + useState
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { CityContext } from "../context/CityContext";
import PropTypes from "prop-types";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      scrolled: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    this.setState({ scrolled: window.scrollY > 40 });
  }

  toggleMenu() {
    this.setState((prev) => ({ menuOpen: !prev.menuOpen }));
  }

  render() {
    const { menuOpen, scrolled } = this.state;
    return (
      <CityContext.Consumer>
        {({ activeAnnouncements }) => (
          <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
            {activeAnnouncements > 0 && (
              <div className="alert-banner">
                <div className="container">
                  <span>⚠ NOTICE</span>
                  {activeAnnouncements} active city alert{activeAnnouncements !== 1 ? "s" : ""}.{" "}
                  <Link to="/announcements" style={{ color: "var(--gold-light)", textDecoration: "underline" }}>
                    View all announcements
                  </Link>
                </div>
              </div>
            )}

            <div className="header-main">
              <div className="container header-inner">
                {/* City seal + name */}
                <Link to="/" className="site-logo">
                  <div className="seal">🏛</div>
                  <div className="site-logo-text">
                    <span className="city-name">City of Maplewood</span>
                    <span className="city-tagline">Municipal Services Portal</span>
                  </div>
                </Link>

                {/* Desktop nav */}
                <nav className="main-nav desktop-nav" aria-label="Main navigation">
                  <NavLink exact to="/" activeClassName="nav-active">Home</NavLink>
                  <NavLink to="/departments" activeClassName="nav-active">Departments</NavLink>
                  <NavLink to="/services" activeClassName="nav-active">Services</NavLink>
                  <NavLink to="/permits" activeClassName="nav-active">Permit Status</NavLink>
                  <NavLink to="/announcements" activeClassName="nav-active">Announcements</NavLink>
                  <NavLink to="/council" activeClassName="nav-active">City Council</NavLink>
                </nav>

                {/* Mobile hamburger */}
                <button
                  className="hamburger"
                  onClick={this.toggleMenu}
                  aria-label="Toggle navigation"
                  aria-expanded={menuOpen}
                >
                  <span /><span /><span />
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
              <nav className="mobile-nav" aria-label="Mobile navigation">
                <NavLink exact to="/" activeClassName="nav-active" onClick={this.toggleMenu}>Home</NavLink>
                <NavLink to="/departments" activeClassName="nav-active" onClick={this.toggleMenu}>Departments</NavLink>
                <NavLink to="/services" activeClassName="nav-active" onClick={this.toggleMenu}>Services</NavLink>
                <NavLink to="/permits" activeClassName="nav-active" onClick={this.toggleMenu}>Permit Status</NavLink>
                <NavLink to="/announcements" activeClassName="nav-active" onClick={this.toggleMenu}>Announcements</NavLink>
                <NavLink to="/council" activeClassName="nav-active" onClick={this.toggleMenu}>City Council</NavLink>
              </nav>
            )}

            <style>{`
              .site-header { position: sticky; top: 0; z-index: 100; background: var(--navy); box-shadow: var(--shadow-md); transition: background 0.2s; }
              .site-header--scrolled .header-main { padding: 8px 0; }
              .header-main { padding: 14px 0; transition: padding 0.2s; }
              .header-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
              .site-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
              .seal { font-size: 32px; line-height: 1; }
              .site-logo-text { display: flex; flex-direction: column; }
              .city-name { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--white); letter-spacing: 0.01em; line-height: 1.2; }
              .city-tagline { font-size: 11px; color: var(--gold-light); letter-spacing: 0.08em; text-transform: uppercase; }
              .main-nav { display: flex; align-items: center; gap: 4px; }
              .main-nav a { color: rgba(255,255,255,0.85); padding: 6px 12px; border-radius: var(--radius); font-size: 14px; font-weight: 500; transition: color 0.15s, background 0.15s; text-decoration: none; }
              .main-nav a:hover, .main-nav a.nav-active { color: var(--white); background: rgba(255,255,255,0.1); }
              .main-nav a.nav-active { color: var(--gold-light); }
              .hamburger { display: none; flex-direction: column; gap: 5px; padding: 8px; }
              .hamburger span { display: block; width: 22px; height: 2px; background: var(--white); border-radius: 2px; }
              .mobile-nav { background: var(--navy-light); border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; }
              .mobile-nav a { color: rgba(255,255,255,0.85); padding: 14px 24px; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.08); text-decoration: none; }
              .mobile-nav a.nav-active { color: var(--gold-light); }
              .desktop-nav { display: flex; }
              @media (max-width: 768px) {
                .desktop-nav { display: none; }
                .hamburger { display: flex; }
              }
            `}</style>
          </header>
        )}
      </CityContext.Consumer>
    );
  }
}

Header.propTypes = {};

export default Header;
