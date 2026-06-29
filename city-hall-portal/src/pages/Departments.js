// src/pages/Departments.js
// LEGACY CLASS COMPONENT with local state for active tab/department.
// Migration target: functional + useState + useEffect for title.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CityContext } from "../context/CityContext";

class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDept: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    document.title = "Departments – Maplewood City Hall";
  }

  handleSelect(id) {
    this.setState((prev) => ({
      activeDept: prev.activeDept === id ? null : id,
    }));
  }

  render() {
    const { activeDept } = this.state;

    return (
      <CityContext.Consumer>
        {({ departments, services }) => {
          const selected = departments.find((d) => d.id === activeDept);
          const deptServices = selected
            ? services.filter((s) => s.department === activeDept)
            : [];

          return (
            <main className="container page-body">
              <div className="page-header">
                <h1 className="page-title">City Departments</h1>
                <p className="page-sub">
                  Select a department to view contact information, hours, and available services.
                </p>
              </div>

              <div className="dept-layout">
                {/* List */}
                <nav className="dept-list" aria-label="Department list">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      className={`dept-tab${activeDept === dept.id ? " active" : ""}`}
                      onClick={() => this.handleSelect(dept.id)}
                      aria-expanded={activeDept === dept.id}
                    >
                      <span className="dept-tab-name">{dept.name}</span>
                      <span className="dept-tab-arrow">{activeDept === dept.id ? "▲" : "▶"}</span>
                    </button>
                  ))}
                </nav>

                {/* Detail panel */}
                <div className="dept-detail">
                  {!selected ? (
                    <div className="dept-placeholder">
                      <span>👈</span>
                      <p>Select a department from the list to view details.</p>
                    </div>
                  ) : (
                    <div className="dept-panel">
                      <h2 className="dept-name">{selected.name}</h2>
                      <p className="dept-desc">{selected.description}</p>

                      <div className="dept-info-grid">
                        <div className="dept-info-item">
                          <span className="info-label">Department Head</span>
                          <span>{selected.head}</span>
                        </div>
                        <div className="dept-info-item">
                          <span className="info-label">Phone</span>
                          <a href={`tel:${selected.phone.replace(/\D/g, "")}`}>{selected.phone}</a>
                        </div>
                        <div className="dept-info-item">
                          <span className="info-label">Email</span>
                          <a href={`mailto:${selected.email}`}>{selected.email}</a>
                        </div>
                        <div className="dept-info-item">
                          <span className="info-label">Office Hours</span>
                          <span>{selected.hours}</span>
                        </div>
                      </div>

                      {deptServices.length > 0 && (
                        <div className="dept-services">
                          <h3>Available Services</h3>
                          <div className="dept-services-list">
                            {deptServices.map((svc) => (
                              <Link key={svc.id} to={`/services/${svc.id}`} className="dept-service-link">
                                <span className="dsvc-name">{svc.name}</span>
                                <span className="dsvc-fee">{svc.fee === 0 ? "Free" : `$${svc.fee}`}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <style>{`
                .page-body { padding-top: 40px; padding-bottom: 64px; }
                .page-header { margin-bottom: 32px; }
                .page-title { font-size: 32px; color: var(--navy); margin-bottom: 8px; }
                .page-sub { font-size: 15px; color: var(--text-secondary); }
                .dept-layout { display: grid; grid-template-columns: 280px 1fr; gap: 24px; align-items: start; }
                .dept-list { display: flex; flex-direction: column; gap: 4px; }
                .dept-tab { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 12px 16px; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); text-align: left; font-size: 14px; font-weight: 500; color: var(--text-primary); transition: border-color 0.15s, background 0.15s; }
                .dept-tab:hover { border-color: var(--navy); background: var(--stone); }
                .dept-tab.active { background: var(--navy); color: var(--white); border-color: var(--navy); }
                .dept-tab-name { flex: 1; }
                .dept-tab-arrow { font-size: 10px; opacity: 0.6; }
                .dept-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 64px; color: var(--text-muted); font-size: 15px; }
                .dept-placeholder span { font-size: 40px; }
                .dept-panel { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px; }
                .dept-name { font-size: 24px; color: var(--navy); margin-bottom: 10px; }
                .dept-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; }
                .dept-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
                .dept-info-item { display: flex; flex-direction: column; gap: 4px; }
                .info-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600; }
                .dept-info-item a, .dept-info-item span { font-size: 14px; color: var(--text-primary); }
                .dept-services h3 { font-size: 16px; color: var(--navy); margin-bottom: 12px; }
                .dept-services-list { display: flex; flex-direction: column; gap: 8px; }
                .dept-service-link { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--stone); border-radius: var(--radius); text-decoration: none; color: var(--navy); transition: background 0.15s; }
                .dept-service-link:hover { background: var(--stone-dark); text-decoration: none; color: var(--navy); }
                .dsvc-name { font-size: 14px; font-weight: 500; }
                .dsvc-fee { font-size: 13px; font-weight: 700; color: var(--text-muted); }
                @media (max-width: 700px) {
                  .dept-layout { grid-template-columns: 1fr; }
                  .dept-info-grid { grid-template-columns: 1fr; }
                }
              `}</style>
            </main>
          );
        }}
      </CityContext.Consumer>
    );
  }
}

export default Departments;
