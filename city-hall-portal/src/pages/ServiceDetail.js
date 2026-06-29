// src/pages/ServiceDetail.js
// LEGACY: Uses componentDidUpdate to detect route param changes (common pain point).
// Migration target: functional + useParams + useEffect.
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { CityContext } from "../context/CityContext";

class ServiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSubmitted: false,
      formData: {
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
      },
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // LEGACY: componentDidUpdate to react to route param changes.
  // Migration target: useEffect([id]) dependency array.
  componentDidUpdate(prevProps) {
    const prevId = prevProps.match && prevProps.match.params.id;
    const currId = this.props.match && this.props.match.params.id;
    if (prevId !== currId) {
      this.setState({ formSubmitted: false, formData: { name: "", email: "", phone: "", address: "", notes: "" }, errors: {} });
      window.scrollTo(0, 0);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prev) => ({
      formData: { ...prev.formData, [name]: value },
      errors: { ...prev.errors, [name]: "" },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { formData } = this.state;
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email required.";
    if (!formData.address.trim()) errors.address = "Property or mailing address required.";

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    // In a real app this would POST to an API
    this.setState({ formSubmitted: true });
  }

  render() {
    const { formSubmitted, formData, errors } = this.state;
    const serviceId = this.props.match && this.props.match.params.id;

    return (
      <CityContext.Consumer>
        {({ getServiceById, getDepartmentById }) => {
          const service = getServiceById(serviceId);
          if (!service) return <Redirect to="/services" />;
          const dept = getDepartmentById(service.department);

          if (formSubmitted) {
            return (
              <main className="container page-body">
                <div className="success-box">
                  <span className="success-icon">✅</span>
                  <h2>Application Submitted!</h2>
                  <p>
                    Your <strong>{service.name}</strong> application has been received.
                    You will receive a confirmation email at <strong>{formData.email}</strong> within 1 business day.
                  </p>
                  <p className="success-ref">
                    Reference #: {service.id.toUpperCase()}-{Date.now().toString().slice(-6)}
                  </p>
                  <div className="success-actions">
                    <Link to="/permits" className="btn-primary">Track Status →</Link>
                    <Link to="/services" className="btn-outline">Back to Services</Link>
                  </div>
                </div>
              </main>
            );
          }

          return (
            <main className="container page-body">
              <div className="breadcrumb">
                <Link to="/services">Services</Link> › {service.name}
              </div>

              <div className="detail-layout">
                {/* Info sidebar */}
                <aside className="detail-sidebar">
                  <div className="sidebar-card">
                    <h2 className="service-title">{service.name}</h2>
                    <p className="service-desc">{service.description}</p>
                    <div className="sidebar-meta">
                      <div className="meta-row">
                        <span className="meta-label">Department</span>
                        <span>{dept ? dept.name : "—"}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-label">Fee</span>
                        <span className="meta-value-em">{service.fee === 0 ? "No charge" : `$${service.fee}`}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-label">Processing Time</span>
                        <span>{service.processingDays} business days</span>
                      </div>
                    </div>
                    <div className="required-docs">
                      <h4>Required Documents</h4>
                      <ul>
                        {service.requiredDocs.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                    {dept && (
                      <div className="dept-contact">
                        <h4>Questions?</h4>
                        <p>{dept.name}</p>
                        <a href={`tel:${dept.phone.replace(/\D/g, "")}`}>{dept.phone}</a>
                        <br />
                        <a href={`mailto:${dept.email}`}>{dept.email}</a>
                      </div>
                    )}
                  </div>
                </aside>

                {/* Application form */}
                <section className="detail-form-section">
                  <h3 className="form-heading">Start Your Application</h3>
                  <form className="app-form" onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={this.handleChange} className={errors.name ? "error" : ""} />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={this.handleChange} className={errors.email ? "error" : ""} />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Property / Mailing Address *</label>
                      <input id="address" name="address" type="text" value={formData.address} onChange={this.handleChange} className={errors.address ? "error" : ""} />
                      {errors.address && <span className="field-error">{errors.address}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="notes">Additional Notes</label>
                      <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={this.handleChange} placeholder="Describe your project or request…" />
                    </div>
                    <div className="form-notice">
                      {service.fee > 0 && (
                        <p>💳 A fee of <strong>${service.fee}</strong> will be collected after review.</p>
                      )}
                      <p>📨 You will receive email confirmation within 1 business day.</p>
                    </div>
                    <button type="submit" className="btn-primary btn-full">
                      Submit Application
                    </button>
                  </form>
                </section>
              </div>

              <style>{`
                .page-body { padding-top: 28px; padding-bottom: 64px; }
                .breadcrumb { font-size: 13px; color: var(--text-muted); margin-bottom: 24px; }
                .breadcrumb a { color: var(--navy); text-decoration: none; }
                .detail-layout { display: grid; grid-template-columns: 320px 1fr; gap: 28px; align-items: start; }
                .sidebar-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; position: sticky; top: 100px; }
                .service-title { font-size: 22px; color: var(--navy); margin-bottom: 10px; }
                .service-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; }
                .sidebar-meta { display: flex; flex-direction: column; gap: 12px; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 16px; }
                .meta-row { display: flex; justify-content: space-between; font-size: 13px; }
                .meta-label { color: var(--text-muted); font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
                .meta-value-em { font-weight: 700; color: var(--navy); }
                .required-docs h4, .dept-contact h4 { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
                .required-docs ul { padding-left: 16px; }
                .required-docs li { font-size: 13px; color: var(--text-secondary); margin-bottom: 4px; }
                .dept-contact { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); font-size: 13px; line-height: 1.8; color: var(--text-secondary); }
                .dept-contact a { color: var(--navy); }
                .detail-form-section { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px; }
                .form-heading { font-size: 20px; color: var(--navy); margin-bottom: 20px; }
                .app-form { display: flex; flex-direction: column; gap: 18px; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
                .form-group { display: flex; flex-direction: column; gap: 6px; }
                .form-group label { font-size: 13px; font-weight: 600; color: var(--text-primary); }
                .form-group input, .form-group textarea { padding: 10px 14px; border: 1px solid var(--border); border-radius: var(--radius); font-family: var(--font-body); font-size: 14px; outline: none; transition: border-color 0.15s; }
                .form-group input:focus, .form-group textarea:focus { border-color: var(--navy); }
                .form-group input.error, .form-group textarea.error { border-color: var(--danger); }
                .field-error { font-size: 12px; color: var(--danger); }
                .form-notice { background: var(--stone); border-radius: var(--radius); padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--text-secondary); }
                .btn-primary { background: var(--navy); color: var(--white); padding: 14px 28px; border-radius: var(--radius); font-size: 15px; font-weight: 600; transition: background 0.15s; }
                .btn-primary:hover { background: var(--navy-light); }
                .btn-outline { background: var(--white); color: var(--navy); padding: 12px 24px; border-radius: var(--radius); font-size: 14px; font-weight: 600; border: 2px solid var(--navy); transition: background 0.15s; }
                .btn-outline:hover { background: var(--stone); }
                .btn-full { width: 100%; }
                .success-box { max-width: 560px; margin: 64px auto; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
                .success-icon { font-size: 48px; }
                .success-box h2 { font-size: 26px; color: var(--navy); }
                .success-box p { font-size: 15px; color: var(--text-secondary); line-height: 1.6; }
                .success-ref { background: var(--stone); padding: 8px 16px; border-radius: var(--radius); font-size: 13px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.05em; }
                .success-actions { display: flex; gap: 12px; margin-top: 8px; flex-wrap: wrap; justify-content: center; }
                @media (max-width: 768px) {
                  .detail-layout { grid-template-columns: 1fr; }
                  .form-row { grid-template-columns: 1fr; }
                  .sidebar-card { position: static; }
                }
              `}</style>
            </main>
          );
        }}
      </CityContext.Consumer>
    );
  }
}

export default ServiceDetail;
