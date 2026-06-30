const services = [
  {
    id: "building-permit",
    name: "Building Permit",
    fee: 150,
    processingDays: 10
  },
  {
    id: "business-license",
    name: "Business License",
    fee: 75,
    processingDays: 5
  }
];

const departments = [
  {
    id: "planning",
    name: "Planning & Zoning"
  },
  {
    id: "finance",
    name: "Finance"
  }
];

const announcements = [
  {
    id: 1,
    title: "City Hall Summer Hours",
    priority: "high"
  }
];

const permits = [
  {
    id: "BLD-2026-0001",
    applicant: "John",
    status: "Under Review"
  }
];

const applications = [];

module.exports = {
  services,
  departments,
  announcements,
  permits,
  applications
};