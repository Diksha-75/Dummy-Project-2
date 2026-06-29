// src/pages/Home.js
// LEGACY CLASS COMPONENT with componentDidMount for "loading" simulation.
// Migration target: functional component + useEffect.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CityContext } from "../context/CityContext";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";

const QUICK_LINKS = [
  { label: "Pay a Bill", icon: "💳", to: "/services/tax-payment" },
  { label: "Get a Permit", icon: "📋", to: "/services/building-permit" },
  { label: "Report an Issue", icon: "🚧", to: "/services/pothole-report" },
  { label: "Reserve a Facility", icon: "🏟", to: "/services/facility-reservation" },
  { label: "Records Request", icon: "📂", to: "/services/records-request" },
  { label: "Business License", icon: "🏪", to: "/services/business-license" },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredLoaded: false,
    };
  }

  // LEGACY: componentDidMount pattern for data fetching.
  // Migration target: useEffect(() => { ... }, [])
  componentDidMount() {
    document.title = "Maplewood City Hall – Home";
    // Simulate async load (in real app this would be an API call)
    setTimeout(() => {
      this.setState({ featuredLoaded: true });
    }, 300);
  }

  render() {
    const { featuredLoaded } = this.state;

    return (
      <CityContext.Consumer>
        {({ announcements, services }) => {
          const latestAnnouncement = announcements[0];
          const featuredServices = services.slice(0, 3);

          return (
            <main>
              {/* Hero */}
              <section className="hero">
                <div className="container hero-inner">
                  <div className="hero-text">
                    <p className="hero-eyebrow">Welcome to</p>
                    <h1 className="hero-title">Maplewood City Hall</h1>
                    <p className="hero-sub">
                      Your one-stop portal for municipal services, permits, announcements,
                      and city government resources.
                    </p>
                    <SearchBar />
                  </div>
                  <div className="hero-stat-block">
                    <div className="hero-stat">
                      <span className="stat-num">8</span>
                      <span className="stat-label">Departments</span>
                    </div>
                    <div className="hero-stat">
                      <span className="stat-num">24+</span>
                      <span className="stat-label">Online Services</span>
                    </div>
                    <div className="hero-stat">
                      <span className="stat-num">~5</span>
                      <span className="stat-label">Days Avg. Processing</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Links */}
              <section className="quick-links-section">
                <div className="container">
                  <h2 className="section-title">Common Services</h2>
                  <div className="quick-links-grid">
                    {QUICK_LINKS.map((link) => (
                      <Link key={link.to} to={link.to} className="quick-link-card">
                        <span className="ql-icon">{link.icon}</span>
                        <span className="ql-label">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* Latest Announcement */}
              {latestAnnouncement && (
                <section className="latest-section">
                  <div className="container">
                    <h2 className="section-title">Latest Announcement</h2>
                    <div className="announcement-card featured">
                      <span className={`badge badge-${latestAnnouncement.priority}`}>
                        {latestAnnouncement.priority}
                      </span>
                      <p className="ann-date">{latestAnnouncement.date}</p>
                      <h3>{latestAnnouncement.title}</h3>
                      <p className="ann-body">{latestAnnouncement.body}</p>
                      <Link to="/announcements" className="ann-more">View all announcements →</Link>
                    </div>
                  </div>
                </section>
              )}

              {/* Featured Services */}
              <section className="featured-services-section">
                <div className="container">
                  <div className="section-header">
                    <h2 className="section-title">Featured Services</h2>
                    <Link to="/services" className="see-all">See all services →</Link>
                  </div>
                  {!featuredLoaded ? (
                    <div className="loading-grid">
                      {[1, 2, 3].map((n) => <div key={n} className="skeleton-card" />)}
                    </div>
                  ) : (
                    <div className="services-grid">
                      {featuredServices.map((s) => (
                        <ServiceCard key={s.id} service={s} />
                      ))}
                    </div>
                  )}
                </div>
              </section>

              <style>{`
                /* Hero */
                .hero { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%); color: var(--white); padding: 64px 0 56px; }
                .hero-inner { display: flex; align-items: flex-start; justify-content: space-between; gap: 48px; flex-wrap: wrap; }
                .hero-text { max-width: 560px; }
                .hero-eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--gold-light); margin-bottom: 8px; }
                .hero-title { font-size: clamp(32px, 5vw, 48px); color: var(--white); margin-bottom: 16px; line-height: 1.15; }
                .hero-sub { font-size: 16px; color: rgba(255,255,255,0.8); margin-bottom: 28px; line-height: 1.6; }
                .hero-stat-block { display: flex; flex-direction: column; gap: 24px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-lg); padding: 28px 36px; min-width: 180px; }
                .hero-stat { display: flex; flex-direction: column; }
                .stat-num { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: var(--gold-light); line-height: 1; }
                .stat-label { font-size: 13px; color: rgba(255,255,255,0.65); margin-top: 4px; }

                /* Quick links */
                .quick-links-section { padding: 48px 0; }
                .section-title { font-size: 22px; color: var(--navy); margin-bottom: 20px; }
                .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 20px; }
                .see-all { font-size: 14px; font-weight: 600; color: var(--navy); }
                .quick-links-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
                .quick-link-card { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 24px 12px; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); text-decoration: none; color: var(--navy); font-weight: 600; font-size: 14px; text-align: center; transition: box-shadow 0.15s, border-color 0.15s, transform 0.15s; }
                .quick-link-card:hover { box-shadow: var(--shadow-md); border-color: var(--navy); transform: translateY(-2px); text-decoration: none; color: var(--navy); }
                .ql-icon { font-size: 28px; }
                .ql-label { line-height: 1.2; }

                /* Announcements */
                .latest-section { background: var(--stone-dark); padding: 40px 0; }
                .announcement-card { background: var(--white); border-radius: var(--radius-lg); padding: 24px; border-left: 4px solid var(--gold); }
                .ann-date { font-size: 12px; color: var(--text-muted); margin: 6px 0; }
                .announcement-card h3 { font-size: 19px; color: var(--navy); margin-bottom: 10px; }
                .ann-body { color: var(--text-secondary); font-size: 14px; line-height: 1.6; }
                .ann-more { display: inline-block; margin-top: 12px; font-weight: 600; font-size: 14px; color: var(--navy); }

                /* Services */
                .featured-services-section { padding: 48px 0; }
                .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
                .loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
                .skeleton-card { height: 220px; background: linear-gradient(90deg, var(--stone-dark) 25%, var(--stone) 50%, var(--stone-dark) 75%); background-size: 200% 100%; animation: shimmer 1.2s infinite; border-radius: var(--radius-lg); }
                @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
              `}</style>
            </main>
          );
        }}
      </CityContext.Consumer>
    );
  }
}

export default Home;
