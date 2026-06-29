// src/App.js
// LEGACY: React Router v5 with Switch + Route + exact.
// Migration target: React Router v6 with Routes + Route (no Switch, no exact).
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CityProvider } from "./context/CityContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Departments from "./pages/Departments";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import PermitStatus from "./pages/PermitStatus";
import Announcements from "./pages/Announcements";
import CityCouncil from "./pages/CityCouncil";

function App() {
  return (
    <CityProvider>
      <Router>
        <Header />
        {/* LEGACY: Switch renders the first matching <Route>.
            Migration target: <Routes> in React Router v6 — all routes evaluated, most specific wins. */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/departments" component={Departments} />
          <Route exact path="/services" component={Services} />
          {/* Dynamic route — uses match.params in class components; replace with useParams() */}
          <Route path="/services/:id" component={ServiceDetail} />
          <Route exact path="/permits" component={PermitStatus} />
          <Route exact path="/announcements" component={Announcements} />
          <Route exact path="/council" component={CityCouncil} />
          {/* 404 fallback */}
          <Route render={() => (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--navy)", marginBottom: 12 }}>
                Page Not Found
              </h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
                The page you're looking for doesn't exist.
              </p>
              <a href="/" style={{ color: "var(--navy)", fontWeight: 600 }}>← Return to Home</a>
            </div>
          )} />
        </Switch>
        <Footer />
      </Router>
    </CityProvider>
  );
}

export default App;
