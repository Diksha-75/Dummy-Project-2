// src/pages/Services.js
// LEGACY CLASS COMPONENT — uses getDerivedStateFromProps (legacy lifecycle).
// Migration target: functional + useMemo for filtering.
import React, { Component } from "react";
import { CityContext } from "../context/CityContext";
import ServiceCard from "../components/ServiceCard";

const ALL = "all";

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ALL,
      localSearch: "",
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    document.title = "Services – Maplewood City Hall";
  }

  // LEGACY lifecycle: syncs context searchQuery into local state on mount/update.
  // Migration target: useMemo / useEffect.
  static getDerivedStateFromProps(props, state) {
    return null; // context consumed via Consumer below; kept as migration marker
  }

  handleFilter(filter) {
    this.setState({ filter });
  }

  handleSearch(e) {
    this.setState({ localSearch: e.target.value });
  }

  render() {
    const { filter, localSearch } = this.state;

    return (
      <CityContext.Consumer>
        {({ services, departments, searchQuery }) => {
          const activeQuery = localSearch || searchQuery;

          const filtered = services.filter((svc) => {
            const matchesDept = filter === ALL || svc.department === filter;
            const q = activeQuery.toLowerCase();
            const matchesSearch =
              !q ||
              svc.name.toLowerCase().includes(q) ||
              svc.description.toLowerCase().includes(q);
            return matchesDept && matchesSearch;
          });

          return (
            <main className="container page-body">
              <div className="page-header">
                <h1 className="page-title">City Services</h1>
                <p className="page-sub">
                  Apply for permits, licenses, and city services online.
                  Processing times vary by service type.
                </p>
              </div>

              {/* Search + filters */}
              <div className="services-controls">
                <input
                  type="search"
                  className="services-search"
                  placeholder="Search services…"
                  value={localSearch}
                  onChange={this.handleSearch}
                  aria-label="Search services"
                />
                <div className="filter-tabs" role="tablist">
                  <button
                    className={`filter-tab${filter === ALL ? " active" : ""}`}
                    onClick={() => this.handleFilter(ALL)}
                    role="tab"
                    aria-selected={filter === ALL}
                  >
                    All
                  </button>
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      className={`filter-tab${filter === dept.id ? " active" : ""}`}
                      onClick={() => this.handleFilter(dept.id)}
                      role="tab"
                      aria-selected={filter === dept.id}
                    >
                      {dept.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="empty-state">
                  <span>🔍</span>
                  <p>No services found for "{activeQuery || filter}". Try adjusting your search.</p>
                </div>
              ) : (
                <div className="services-grid-full">
                  {filtered.map((svc) => (
                    <ServiceCard key={svc.id} service={svc} />
                  ))}
                </div>
              )}

              <style>{`
                .page-body { padding-top: 40px; padding-bottom: 64px; }
                .page-header { margin-bottom: 28px; }
                .page-title { font-size: 32px; color: var(--navy); margin-bottom: 8px; }
                .page-sub { font-size: 15px; color: var(--text-secondary); }
                .services-controls { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
                .services-search { padding: 10px 16px; font-size: 15px; border: 1px solid var(--border); border-radius: var(--radius); font-family: var(--font-body); width: 100%; max-width: 400px; outline: none; }
                .services-search:focus { border-color: var(--navy); }
                .filter-tabs { display: flex; flex-wrap: wrap; gap: 6px; }
                .filter-tab { padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 500; border: 1px solid var(--border); background: var(--white); color: var(--text-secondary); transition: all 0.15s; }
                .filter-tab:hover { border-color: var(--navy); color: var(--navy); }
                .filter-tab.active { background: var(--navy); color: var(--white); border-color: var(--navy); }
                .services-grid-full { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
                .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 64px; color: var(--text-muted); }
                .empty-state span { font-size: 40px; }
              `}</style>
            </main>
          );
        }}
      </CityContext.Consumer>
    );
  }
}

export default Services;
