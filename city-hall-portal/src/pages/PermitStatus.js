// src/pages/PermitStatus.js
// LEGACY CLASS COMPONENT — uses manual search state + Context.Consumer.
// Migration target: functional + useContext + useMemo for filtered results.
import React, { Component } from "react";
import { CityContext } from "../context/CityContext";

const STATUS_BADGE = {
  "Under Review": "review",
  "Pending Hearing": "pending",
  Approved: "approved",
  Issued: "issued",
  "Revisions Requested": "revisions",
};

class PermitStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    document.title = "Permit Status – Maplewood City Hall";
  }

  handleSearch(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    const { query } = this.state;

    return (
      <CityContext.Consumer>
        {({ permitStatuses }) => {
          const filtered = permitStatuses.filter((p) => {
            const q = query.toLowerCase();
            return (
              !q ||
              p.id.toLowerCase().includes(q) ||
              p.applicant.toLowerCase().includes(q) ||
              p.type.toLowerCase().includes(q)
            );
          });

          return (
            <main className="container page-body">
              <div className="page-header">
                <h1 className="page-title">Permit & Application Status</h1>
                <p className="page-sub">
                  Track the status of submitted permits and applications. Search by permit number, applicant name, or type.
                </p>
              </div>

              <input
                type="search"
                className="status-search"
                placeholder="Search by permit #, name, or type…"
                value={query}
                onChange={this.handleSearch}
                aria-label="Search permits"
              />

              <div className="status-table-wrap">
                <table className="status-table">
                  <thead>
                    <tr>
                      <th>Permit #</th>
                      <th>Type</th>
                      <th>Applicant</th>
                      <th>Submitted</th>
                      <th>Last Updated</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="table-empty">No permits match your search.</td>
                      </tr>
                    ) : (
                      filtered.map((permit) => (
                        <tr key={permit.id}>
                          <td><code>{permit.id}</code></td>
                          <td>{permit.type}</td>
                          <td>{permit.applicant}</td>
                          <td>{permit.submitted}</td>
                          <td>{permit.updated}</td>
                          <td>
                            <span className={`badge badge-${STATUS_BADGE[permit.status] || "review"}`}>
                              {permit.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="status-legend">
                <h4>Status Definitions</h4>
                <div className="legend-grid">
                  <div><span className="badge badge-review">Under Review</span> Application is being evaluated by staff.</div>
                  <div><span className="badge badge-pending">Pending Hearing</span> Requires a public hearing or board vote.</div>
                  <div><span className="badge badge-approved">Approved</span> Application approved; awaiting final issuance.</div>
                  <div><span className="badge badge-issued">Issued</span> Permit or license has been officially issued.</div>
                  <div><span className="badge badge-revisions">Revisions Requested</span> Applicant must submit corrections.</div>
                </div>
              </div>

              <style>{`
                .page-body { padding-top: 40px; padding-bottom: 64px; }
                .page-header { margin-bottom: 24px; }
                .page-title { font-size: 32px; color: var(--navy); margin-bottom: 8px; }
                .page-sub { font-size: 15px; color: var(--text-secondary); }
                .status-search { width: 100%; max-width: 440px; padding: 10px 16px; font-size: 15px; border: 1px solid var(--border); border-radius: var(--radius); font-family: var(--font-body); outline: none; margin-bottom: 20px; display: block; }
                .status-search:focus { border-color: var(--navy); }
                .status-table-wrap { overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--border); }
                .status-table { width: 100%; border-collapse: collapse; background: var(--white); }
                .status-table th { background: var(--navy); color: var(--white); padding: 12px 16px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.07em; font-family: var(--font-body); }
                .status-table td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid var(--border); vertical-align: middle; }
                .status-table tr:last-child td { border-bottom: none; }
                .status-table tr:hover td { background: var(--stone); }
                .status-table code { font-family: monospace; font-size: 13px; background: var(--stone); padding: 2px 6px; border-radius: 3px; }
                .table-empty { text-align: center; color: var(--text-muted); padding: 40px; }
                .status-legend { margin-top: 32px; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px 24px; }
                .status-legend h4 { font-size: 14px; color: var(--navy); margin-bottom: 14px; }
                .legend-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; font-size: 13px; color: var(--text-secondary); }
                .legend-grid > div { display: flex; align-items: center; gap: 8px; }
              `}</style>
            </main>
          );
        }}
      </CityContext.Consumer>
    );
  }
}

export default PermitStatus;
