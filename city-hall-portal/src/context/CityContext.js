// src/context/CityContext.js
// LEGACY: Uses old React.createContext + Consumer pattern.
// Migration target: modernize to useContext hook in functional components.

import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/client";
import { announcements, departments, services, permitStatuses } from "../data/cityData";


const CityContext = React.createContext({
  announcements: [],
  departments: [],
  services: [],
  permitStatuses: [],
  activeAnnouncements: 0,
  searchQuery: "",
  setSearchQuery: () => {},
  getServiceById: () => null,
  getDepartmentById: () => null,
});

class CityProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      notifications: announcements.filter((a) => a.priority === "high"),
    };
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.getServiceById = this.getServiceById.bind(this);
    this.getDepartmentById = this.getDepartmentById.bind(this);
  }

  setSearchQuery(query) {
    this.setState({ searchQuery: query });
  }

  getServiceById(id) {
    return services.find((s) => s.id === id) || null;
  }

  getDepartmentById(id) {
    return departments.find((d) => d.id === id) || null;
  }

  render() {
    const value = {
      announcements,
      departments,
      services,
      permitStatuses,
      activeAnnouncements: this.state.notifications.length,
      searchQuery: this.state.searchQuery,
      setSearchQuery: this.setSearchQuery,
      getServiceById: this.getServiceById,
      getDepartmentById: this.getDepartmentById,
    };

    return (
      <CityContext.Provider value={value}>
        {this.props.children}
      </CityContext.Provider>
    );
  }
}

export { CityContext, CityProvider };
