// src/pages/CityCouncil.js
// NOTE: This page is intentionally a functional component (no hooks, React 16 compatible).
// Contrast with the class components — shows the mixed codebase a real migration would encounter.
import React from "react";
import { councilMembers } from "../data/cityData";

var MEETING_SCHEDULE = [
  { date: "2026-07-15", time: "6:00 PM", location: "Council Chambers, Room 201", topic: "FY2027 Budget Public Hearing" },
  { date: "2026-07-22", time: "6:00 PM", location: "Council Chambers, Room 201", topic: "Regular Council Meeting" },
  { date: "2026-08-12", time: "6:00 PM", location: "Council Chambers, Room 201", topic: "Regular Council Meeting" },
  { date: "2026-09-09", time: "6:00 PM", location: "Council Chambers, Room 201", topic: "Regular Council Meeting" },
];

function CityCouncil() {
  return (
    <main className="container page-body">
      <div className="page-header">
        <h1 className="page-title">City Council</h1>
        <p className="page-sub">
          The Maplewood City Council sets policy, approves the annual budget, and represents residents across four geographic wards.
        </p>
      </div>

      {/* Council Members */}
      <section className="council-section">
        <h2 className="section-heading">Council Members</h2>
        <div className="council-grid">
          {councilMembers.map(function(member) {
            return (
              <div key={member.name} className={"council-card" + (member.ward === "At-Large" ? " mayor" : "")}>
                <div className="member-avatar">{member.name.charAt(0)}</div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <span className="member-ward">{member.ward}</span>
                  <span className="member-since">Serving since {member.since}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Meeting schedule */}
      <section className="meetings-section">
        <h2 className="section-heading">Upcoming Meetings</h2>
        <p className="meetings-note">
          All regular council meetings are open to the public. Public comment period begins at 6:30 PM.
          Meetings are streamed live at maplewood.gov/live.
        </p>
        <div className="meetings-list">
          {MEETING_SCHEDULE.map(function(mtg, i) {
            return (
              <div key={i} className="meeting-row">
                <div className="meeting-date-col">
                  <span className="meeting-date">{mtg.date}</span>
                  <span className="meeting-time">{mtg.time}</span>
                </div>
                <div className="meeting-info-col">
                  <span className="meeting-topic">{mtg.topic}</span>
                  <span className="meeting-location">📍 {mtg.location}</span>
                </div>
                <div className="meeting-actions">
                  <a href="#agenda" className="btn-agenda">Agenda</a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        .page-body { padding-top: 40px; padding-bottom: 64px; }
        .page-header { margin-bottom: 32px; }
        .page-title { font-size: 32px; color: var(--navy); margin-bottom: 8px; }
        .page-sub { font-size: 15px; color: var(--text-secondary); }
        .section-heading { font-size: 22px; color: var(--navy); margin-bottom: 20px; }
        .council-section { margin-bottom: 48px; }
        .council-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .council-card { display: flex; align-items: center; gap: 14px; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px 20px; }
        .council-card.mayor { border-color: var(--gold); background: #fffbf0; }
        .member-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--navy); color: var(--white); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 20px; font-weight: 700; flex-shrink: 0; }
        .council-card.mayor .member-avatar { background: var(--gold); color: var(--navy); }
        .member-info { display: flex; flex-direction: column; gap: 3px; }
        .member-name { font-size: 15px; font-weight: 600; color: var(--navy); font-family: var(--font-display); }
        .member-ward { font-size: 12px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-muted); font-weight: 600; }
        .member-since { font-size: 12px; color: var(--text-muted); }
        .meetings-section { }
        .meetings-note { font-size: 14px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6; }
        .meetings-list { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; background: var(--white); }
        .meeting-row { display: flex; align-items: center; gap: 24px; padding: 16px 20px; border-bottom: 1px solid var(--border); }
        .meeting-row:last-child { border-bottom: none; }
        .meeting-row:hover { background: var(--stone); }
        .meeting-date-col { display: flex; flex-direction: column; min-width: 110px; }
        .meeting-date { font-weight: 700; font-size: 14px; color: var(--navy); }
        .meeting-time { font-size: 12px; color: var(--text-muted); }
        .meeting-info-col { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .meeting-topic { font-size: 15px; font-weight: 500; color: var(--text-primary); }
        .meeting-location { font-size: 13px; color: var(--text-muted); }
        .btn-agenda { background: var(--stone); color: var(--navy); padding: 6px 14px; border-radius: var(--radius); font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.15s; }
        .btn-agenda:hover { background: var(--stone-dark); text-decoration: none; color: var(--navy); }
        @media (max-width: 600px) {
          .meeting-row { flex-wrap: wrap; }
        }
      `}</style>
    </main>
  );
}

export default CityCouncil;
