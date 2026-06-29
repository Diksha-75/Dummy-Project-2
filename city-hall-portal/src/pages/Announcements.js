// src/pages/Announcements.js
import React, { Component } from "react";
import { CityContext } from "../context/CityContext";

class Announcements extends Component {
  componentDidMount() {
    document.title = "Announcements – Maplewood City Hall";
  }

  render() {
    return (
      <CityContext.Consumer>
        {({ announcements, departments }) => {
          const getDeptName = (id) => {
            const dept = departments.find((d) => d.id === id);
            return dept ? dept.name : null;
          };

          return (
            <main className="container page-body">
              <div className="page-header">
                <h1 className="page-title">City Announcements</h1>
                <p className="page-sub">
                  Official notices, service updates, and public hearing announcements from the City of Maplewood.
                </p>
              </div>

              <div className="announcements-list">
                {announcements.map((ann) => (
                  <article key={ann.id} className={`ann-item priority-${ann.priority}`}>
                    <div className="ann-item-meta">
                      <span className={`badge badge-${ann.priority}`}>{ann.priority} priority</span>
                      <time className="ann-date">{ann.date}</time>
                      {ann.department && (
                        <span className="ann-dept">{getDeptName(ann.department)}</span>
                      )}
                    </div>
                    <h2 className="ann-title">{ann.title}</h2>
                    <p className="ann-body">{ann.body}</p>
                  </article>
                ))}
              </div>

              <style>{`
                .page-body { padding-top: 40px; padding-bottom: 64px; }
                .page-header { margin-bottom: 32px; }
                .page-title { font-size: 32px; color: var(--navy); margin-bottom: 8px; }
                .page-sub { font-size: 15px; color: var(--text-secondary); }
                .announcements-list { display: flex; flex-direction: column; gap: 16px; }
                .ann-item { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 28px; border-left: 5px solid var(--border); }
                .ann-item.priority-high { border-left-color: var(--danger); }
                .ann-item.priority-medium { border-left-color: var(--warning); }
                .ann-item.priority-low { border-left-color: var(--success); }
                .ann-item-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
                .ann-date { font-size: 12px; color: var(--text-muted); }
                .ann-dept { font-size: 12px; color: var(--text-muted); background: var(--stone); padding: 2px 8px; border-radius: 4px; }
                .ann-title { font-size: 19px; color: var(--navy); margin-bottom: 8px; }
                .ann-body { font-size: 14px; color: var(--text-secondary); line-height: 1.65; }
              `}</style>
            </main>
          );
        }}
      </CityContext.Consumer>
    );
  }
}

export default Announcements;
