# Maplewood City Hall — Municipal Services Portal

A demo municipal services web app built with **React 16** on **Node 22**, intentionally using legacy patterns as a migration exercise target.

## Stack

| Layer | Version | Notes |
|---|---|---|
| Node.js | 22.x | Runtime |
| React | 16.14.0 | Legacy class components + old APIs |
| React DOM | 16.14.0 | `ReactDOM.render` (deprecated in React 18) |
| React Router | 5.3.4 | `Switch`, `Route`, `withRouter`, `Redirect` |
| PropTypes | 15.8.1 | Runtime type checking (no TypeScript) |

## Getting Started

```bash
npm install --legacy-peer-deps
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## App Structure

```
src/
├── data/
│   └── cityData.js          # In-memory data (departments, services, permits, announcements)
├── context/
│   └── CityContext.js       # Legacy class-based Context provider
├── components/
│   ├── Header.js            # Class component with componentDidMount/WillUnmount
│   ├── Footer.js            # Simple functional component
│   ├── ServiceCard.js       # Functional component with PropTypes
│   └── SearchBar.js         # Class component using withRouter HOC + Consumer pattern
└── pages/
    ├── Home.js              # Class + componentDidMount + Consumer
    ├── Departments.js       # Class with local tab state
    ├── Services.js          # Class with getDerivedStateFromProps marker
    ├── ServiceDetail.js     # Class with componentDidUpdate for param changes + form
    ├── PermitStatus.js      # Class with search state
    ├── Announcements.js     # Class + Consumer
    └── CityCouncil.js       # Intentional functional (no hooks) — contrasts with rest
```

---

## Migration Guide: React 16 → React 18 + React Router v6

This project is structured to give you clear, named migration targets in every file.

### 1. `src/index.js` — ReactDOM.render → createRoot

```js
// BEFORE (React 16)
import ReactDOM from "react-dom";
ReactDOM.render(<App />, document.getElementById("root"));

// AFTER (React 18)
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### 2. `src/App.js` — React Router Switch → Routes

```jsx
// BEFORE (RR v5)
import { Switch, Route } from "react-router-dom";
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/services/:id" component={ServiceDetail} />
</Switch>

// AFTER (RR v6)
import { Routes, Route } from "react-router-dom";
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/services/:id" element={<ServiceDetail />} />
</Routes>
```

### 3. Class Components → Functional + Hooks

Every page in `src/pages/` is a class component. Convert each to functional:

```jsx
// BEFORE
class Departments extends Component {
  constructor(props) { super(props); this.state = { activeDept: null }; }
  componentDidMount() { document.title = "Departments – ..."; }
  handleSelect(id) { this.setState(...) }
  render() { ... }
}

// AFTER
function Departments() {
  const [activeDept, setActiveDept] = useState(null);
  useEffect(() => { document.title = "Departments – ..."; }, []);
  ...
}
```

### 4. Context — Consumer render prop → useContext

```jsx
// BEFORE (all pages use this pattern)
<CityContext.Consumer>
  {({ departments, services }) => ( ... )}
</CityContext.Consumer>

// AFTER
const { departments, services } = useContext(CityContext);
```

### 5. CityContext Provider — class → functional

```jsx
// BEFORE: src/context/CityContext.js
class CityProvider extends Component { ... }

// AFTER
function CityProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const value = useMemo(() => ({ departments, services, searchQuery, setSearchQuery, ... }), [searchQuery]);
  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}
```

### 6. `withRouter` HOC → `useNavigate`

```jsx
// BEFORE: SearchBar.js
import { withRouter } from "react-router-dom";
class SearchBar extends Component {
  handleSubmit(e, setSearchQuery) {
    this.props.history.push("/services");
  }
}
export default withRouter(SearchBar);

// AFTER
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(CityContext);
  function handleSubmit(e) {
    e.preventDefault();
    setSearchQuery(query);
    navigate("/services");
  }
}
```

### 7. Route params — `match.params` → `useParams`

```jsx
// BEFORE: ServiceDetail.js
const serviceId = this.props.match.params.id;

// AFTER
const { id } = useParams();
```

### 8. `componentDidUpdate` for route param changes → `useEffect` dependency

```jsx
// BEFORE: ServiceDetail.js
componentDidUpdate(prevProps) {
  if (prevProps.match.params.id !== this.props.match.params.id) {
    this.setState({ formSubmitted: false });
  }
}

// AFTER
const { id } = useParams();
useEffect(() => {
  setFormSubmitted(false);
  setFormData({ name: "", email: "", phone: "", address: "", notes: "" });
}, [id]);
```

### 9. PropTypes → TypeScript

Replace `prop-types` with TypeScript interfaces:

```ts
// BEFORE: ServiceCard.js
import PropTypes from "prop-types";
ServiceCard.propTypes = { service: PropTypes.shape({ ... }) };

// AFTER: ServiceCard.tsx
interface Service {
  id: string;
  name: string;
  department: string;
  fee: number;
  processingDays: number;
  description: string;
  requiredDocs: string[];
}
interface Props { service: Service; compact?: boolean; }
```

### 10. Filtering — getDerivedStateFromProps / manual → useMemo

```jsx
// BEFORE: Services.js — manual filtering in render()
const filtered = services.filter((svc) => { ... });

// AFTER
const filtered = useMemo(
  () => services.filter((svc) => { ... }),
  [services, filter, localSearch]
);
```

---

## Optional Next Steps After Migration

- **React Query / SWR** — replace in-memory `cityData.js` with real API calls + caching
- **Zustand or Redux Toolkit** — if context state grows complex
- **Vite** — replace Create React App (`react-scripts`) for faster dev + build
- **Zod** — runtime validation for form data (replaces manual `errors` state pattern)
- **React Hook Form** — replace manual controlled form pattern in `ServiceDetail.js`
