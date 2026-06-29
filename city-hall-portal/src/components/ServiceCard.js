// src/components/ServiceCard.js
// LEGACY: PropTypes validation. Migration target: TypeScript interfaces / Zod schemas.
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { departments } from "../data/cityData";

function ServiceCard({ service, compact }) {
  const dept = departments.find((d) => d.id === service.department);

  return (
    <div className={`service-card${compact ? " service-card--compact" : ""}`}>
      <div className="service-card-top">
        <span className="service-dept">{dept ? dept.name : "City Services"}</span>
        {service.fee === 0 ? (
          <span className="service-fee free">Free</span>
        ) : (
          <span className="service-fee">${service.fee}</span>
        )}
      </div>
      <h3 className="service-name">{service.name}</h3>
      {!compact && <p className="service-desc">{service.description}</p>}
      <div className="service-meta">
        <span>⏱ {service.processingDays} business day{service.processingDays !== 1 ? "s" : ""}</span>
      </div>
      {!compact && (
        <div className="service-docs">
          <strong>Required:</strong>
          <ul>
            {service.requiredDocs.map((doc, i) => (
              <li key={i}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to={`/services/${service.id}`} className="service-link">
        {compact ? "Learn more →" : "Start Application →"}
      </Link>

      <style>{`
        .service-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; display: flex; flex-direction: column; gap: 10px; transition: box-shadow 0.15s, border-color 0.15s; }
        .service-card:hover { box-shadow: var(--shadow-md); border-color: var(--navy); }
        .service-card--compact { padding: 16px; gap: 8px; }
        .service-card-top { display: flex; justify-content: space-between; align-items: center; }
        .service-dept { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 600; }
        .service-fee { font-size: 13px; font-weight: 700; color: var(--navy); background: var(--stone); padding: 2px 8px; border-radius: 4px; }
        .service-fee.free { color: var(--success); background: #dcfce7; }
        .service-name { font-size: 17px; color: var(--navy); }
        .service-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }
        .service-meta { font-size: 13px; color: var(--text-muted); }
        .service-docs { font-size: 13px; color: var(--text-secondary); }
        .service-docs ul { margin: 4px 0 0 16px; }
        .service-docs li { margin-bottom: 2px; }
        .service-link { color: var(--navy); font-weight: 600; font-size: 14px; text-decoration: none; margin-top: 4px; }
        .service-link:hover { color: var(--gold); text-decoration: underline; }
      `}</style>
    </div>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    fee: PropTypes.number.isRequired,
    processingDays: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    requiredDocs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  compact: PropTypes.bool,
};

ServiceCard.defaultProps = {
  compact: false,
};

export default ServiceCard;
