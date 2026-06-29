// src/data/cityData.js
// NOTE: Static in-memory data — no database. Perfect migration target for React Query / SWR.

export const departments = [
  {
    id: "planning",
    name: "Planning & Zoning",
    head: "Director Patricia Okonkwo",
    phone: "(555) 201-4400",
    email: "planning@maplewood.gov",
    hours: "Mon–Fri 8:00 AM – 4:30 PM",
    description:
      "Oversees land use, building permits, zoning variances, and long-range city planning initiatives.",
    services: ["building-permit", "zoning-variance", "site-plan-review"],
  },
  {
    id: "public-works",
    name: "Public Works",
    head: "Commissioner James Hartley",
    phone: "(555) 201-4500",
    email: "publicworks@maplewood.gov",
    hours: "Mon–Fri 7:00 AM – 3:30 PM",
    description:
      "Maintains city infrastructure including roads, bridges, water systems, and sanitation.",
    services: ["pothole-report", "water-service", "tree-removal"],
  },
  {
    id: "finance",
    name: "Finance & Revenue",
    head: "CFO Sandra Lin",
    phone: "(555) 201-4600",
    email: "finance@maplewood.gov",
    hours: "Mon–Fri 8:30 AM – 4:00 PM",
    description:
      "Manages city budget, tax collection, business licensing, and financial reporting.",
    services: ["business-license", "tax-payment", "budget-request"],
  },
  {
    id: "parks",
    name: "Parks & Recreation",
    head: "Director Marcus Webb",
    phone: "(555) 201-4700",
    email: "parks@maplewood.gov",
    hours: "Mon–Fri 8:00 AM – 5:00 PM",
    description:
      "Operates public parks, community centers, sports programs, and special events.",
    services: ["facility-reservation", "event-permit", "program-registration"],
  },
  {
    id: "clerk",
    name: "City Clerk",
    head: "City Clerk Angela Torres",
    phone: "(555) 201-4100",
    email: "cityclerk@maplewood.gov",
    hours: "Mon–Fri 8:00 AM – 5:00 PM",
    description:
      "Maintains official city records, manages elections, and issues vital records and licenses.",
    services: ["records-request", "marriage-license", "public-meeting"],
  },
];

export const services = [
  {
    id: "building-permit",
    name: "Building Permit",
    department: "planning",
    fee: 150,
    processingDays: 10,
    description: "Required for new construction, additions, and major renovations.",
    requiredDocs: ["Site plan", "Contractor license", "Property deed", "Survey"],
  },
  {
    id: "zoning-variance",
    name: "Zoning Variance",
    department: "planning",
    fee: 300,
    processingDays: 30,
    description: "Request an exception to current zoning regulations.",
    requiredDocs: ["Application form", "Survey", "Written justification", "Neighbor notification proof"],
  },
  {
    id: "business-license",
    name: "Business License",
    department: "finance",
    fee: 75,
    processingDays: 5,
    description: "Required for all businesses operating within city limits.",
    requiredDocs: ["Business registration", "State ID", "Proof of location"],
  },
  {
    id: "facility-reservation",
    name: "Facility Reservation",
    department: "parks",
    fee: 50,
    processingDays: 3,
    description: "Reserve pavilions, community rooms, and athletic fields.",
    requiredDocs: ["Application form", "Proof of insurance (events >50 people)"],
  },
  {
    id: "event-permit",
    name: "Special Event Permit",
    department: "parks",
    fee: 100,
    processingDays: 14,
    description: "Required for public gatherings, festivals, and road closures.",
    requiredDocs: ["Event plan", "Insurance certificate", "Site map", "Security plan"],
  },
  {
    id: "records-request",
    name: "Public Records Request",
    department: "clerk",
    fee: 0,
    processingDays: 5,
    description: "Request public documents under the Freedom of Information Act.",
    requiredDocs: ["Written request describing records sought"],
  },
  {
    id: "pothole-report",
    name: "Pothole / Road Damage Report",
    department: "public-works",
    fee: 0,
    processingDays: 7,
    description: "Report road damage for city inspection and repair scheduling.",
    requiredDocs: ["Location description or address"],
  },
  {
    id: "water-service",
    name: "Water Service Request",
    department: "public-works",
    fee: 25,
    processingDays: 2,
    description: "New connections, disconnections, or service interruption requests.",
    requiredDocs: ["Property address", "Account number (existing customers)"],
  },
];

export const announcements = [
  {
    id: 1,
    date: "2026-06-20",
    title: "City Hall Summer Hours Begin July 1",
    body:
      "Starting July 1, City Hall offices will close at 3:00 PM on Fridays through August 29. Emergency services remain available 24/7.",
    priority: "high",
    department: null,
  },
  {
    id: 2,
    date: "2026-06-15",
    title: "Online Permit System Maintenance – June 30",
    body:
      "The online permit portal will be unavailable from 10:00 PM to 2:00 AM on June 30 for scheduled maintenance.",
    priority: "medium",
    department: "planning",
  },
  {
    id: 3,
    date: "2026-06-10",
    title: "Maplewood 4th of July Parade Route Announced",
    body:
      "The annual Independence Day parade will travel north on Elm Street from City Hall to Riverside Park. Road closures begin at 8:00 AM.",
    priority: "low",
    department: "parks",
  },
  {
    id: 4,
    date: "2026-06-05",
    title: "FY2027 Budget Public Hearing – July 15",
    body:
      "The City Council invites residents to comment on the proposed FY2027 budget. Hearing at 6:00 PM in Council Chambers, Room 201.",
    priority: "high",
    department: "finance",
  },
  {
    id: 5,
    date: "2026-05-28",
    title: "New Recycling Guidelines Effective August 1",
    body:
      "Public Works will implement updated recycling guidelines. Glass must now be separated into dedicated bins. Download the updated guide on the Public Works page.",
    priority: "medium",
    department: "public-works",
  },
];

export const permitStatuses = [
  { id: "BLD-2026-0041", type: "Building Permit", applicant: "R. Sharma", status: "Under Review", submitted: "2026-06-01", updated: "2026-06-10" },
  { id: "ZON-2026-0012", type: "Zoning Variance", applicant: "Greenfield LLC", status: "Pending Hearing", submitted: "2026-05-15", updated: "2026-06-18" },
  { id: "EVT-2026-0089", type: "Event Permit", applicant: "Lions Club", status: "Approved", submitted: "2026-05-20", updated: "2026-06-01" },
  { id: "BIZ-2026-0204", type: "Business License", applicant: "Corner Cafe LLC", status: "Issued", submitted: "2026-06-08", updated: "2026-06-13" },
  { id: "BLD-2026-0038", type: "Building Permit", applicant: "T. Nguyen", status: "Revisions Requested", submitted: "2026-05-25", updated: "2026-06-14" },
];

export const councilMembers = [
  { name: "Mayor Diane Holloway", ward: "At-Large", since: 2021 },
  { name: "Councilmember Raj Patel", ward: "Ward 1", since: 2019 },
  { name: "Councilmember Yolanda Cruz", ward: "Ward 2", since: 2023 },
  { name: "Councilmember Tom Brecker", ward: "Ward 3", since: 2021 },
  { name: "Councilmember Aisha Oduya", ward: "Ward 4", since: 2023 },
];
