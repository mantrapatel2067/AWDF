# Practical 8: Performance Optimization and Route-Based Lazy Loading in React

**Repository:** [https://github.com/24cs73-prince/24CS068_AWDF_P8](https://github.com/24cs73-prince/24CS068_AWDF_P8)

---

## 1. Objective

The objective of Practical 8 is to optimize the frontend loading performance of the React Task Management application using **route-based code splitting**, **`React.lazy()`**, and **`React.Suspense`**.

By default, single-page React applications bundle all components and routes into one large initial JavaScript file. In this practical, non-critical routes (`Projects` and `Contact`) are separated into independent chunks that are downloaded only when requested by the user, significantly reducing initial bundle size and initial load time.

---

## 2. Core Optimization Concepts

- **Lazy Loading**: A design pattern that defers loading of resources or components until they are actually needed.
- **`React.lazy()`**: A built-in React function enabling dynamic imports (`import()`) for components. Bundlers like Vite recognize dynamic imports and automatically split them into isolated JavaScript chunks.
- **`React.Suspense`**: A wrapper component that catches pending asynchronous operations (such as dynamic chunk fetching) and renders a specified fallback UI (`<LoadingPage />`) until the module is ready.
- **Route-Based Code Splitting**: Applying lazy loading at the route level in React Router so that navigating to a route triggers the download of that specific page's chunk.

---

## 3. Implementation Details

### Route Strategy in `frontend/src/App.jsx`
1. **Home Route (`/`)**: Maintained as a **static import** to ensure immediate availability upon application startup without extra network delays.
2. **Projects Route (`/projects`)**: Converted from static import to a dynamic import using `React.lazy()`.
3. **Contact Route (`/contact`)**: Converted from static import to a dynamic import using `React.lazy()`.
4. **Suspense Boundary**: Wrapped all `<Routes>` inside `<Suspense fallback={<LoadingPage />}>`.

```jsx
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Static import for immediate initial render
import Home from "./pages/Home";

// Route-based Code Splitting: Lazy-loaded route components
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

// Fallback UI displayed during chunk download
function LoadingPage() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Loading...</h2>
      <p>Please wait while the page loads.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
```

### Module Default Exports
`React.lazy()` requires dynamically imported modules to export a default React component:
- `frontend/src/pages/Projects.jsx`: Verified `export default Projects;`
- `frontend/src/pages/Contact.jsx`: Verified `export default Contact;`

---

## 4. Production Build & Generated Asset Chunks

Running the production build creates separate JavaScript chunks for lazy-loaded routes:

```bash
cd frontend
npm run build
```

### Verified Build Output
```text
vite v5.4.21 building for production...
transforming...
✓ 39 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                     0.50 kB │ gzip:  0.33 kB
dist/assets/index-CBDPkHhc.css      2.93 kB │ gzip:  1.13 kB
dist/assets/Projects-tmlak3Ki.js    1.83 kB │ gzip:  0.90 kB
dist/assets/Contact-BWzeUhLB.js     2.09 kB │ gzip:  0.83 kB
dist/assets/index-UfmLSPLq.js     175.68 kB │ gzip: 56.97 kB
✓ built in 8.61s
```

### Chunk Breakdown
| Chunk File | Type | Purpose | Size | Gzip Size |
|---|---|---|:---:|:---:|
| `index-UfmLSPLq.js` | Initial Bundle | Core React, React-DOM, Router, and Home route | 175.68 kB | 56.97 kB |
| `Projects-tmlak3Ki.js` | Lazy Chunk | Dynamically loaded on visiting `/projects` | **1.83 kB** | **0.90 kB** |
| `Contact-BWzeUhLB.js` | Lazy Chunk | Dynamically loaded on visiting `/contact` | **2.09 kB** | **0.83 kB** |
| `index-CBDPkHhc.css` | Stylesheet | Application styles | 2.93 kB | 1.13 kB |

---

## 5. Inherited Full-Stack Architecture

This practical builds on the Task Management backend:
- **Backend (`server.js`)**: Express.js server connected to MongoDB using Mongoose.
- **Static File Serving**: Serves the built Vite distribution (`frontend/dist`) or fallback public directory.
- **REST Endpoints**:
  - `/api/auth/register`, `/api/auth/login`, `/api/auth/me` (JWT authentication & password hashing)
  - `/api/tasks` (CRUD operations scoped to authenticated user)
- **Database Persistence**: MongoDB `taskmanager` collection.

---

## 6. How to Run Locally

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string.

### 2. Install Dependencies
```bash
# Root backend dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the project root:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Running the Development Environment
Run backend and frontend in separate terminals:

**Terminal 1 (Backend API):**
```bash
node server.js
# Server running on http://localhost:5000
```

**Terminal 2 (Frontend with Vite HMR):**
```bash
cd frontend
npm run dev
# Frontend running on http://localhost:3000
```

### 5. Running the Optimized Production Build
```bash
# Build frontend chunks
cd frontend
npm run build
cd ..

# Start full-stack server
node server.js
# Access optimized app at http://localhost:5000
```

---

## 7. How to Verify Lazy Loading in Chrome DevTools

1. Open Google Chrome and navigate to `http://localhost:5000` (or `http://localhost:3000`).
2. Press `F12` or `Ctrl + Shift + I` to open **Developer Tools**.
3. Select the **Network** tab and click the **JS** filter button.
4. Clear existing requests (`Clear` button or `Ctrl + L`).
5. **Initial Load (`/`)**:
   - Reload the page.
   - Observe that only the main bundle (`index-*.js`) is loaded. Notice `Projects-*.js` and `Contact-*.js` are **not** downloaded.
6. **Simulate Slow Network**:
   - Set Network Throttling to **Slow 3G** (Network tab dropdown).
7. **Navigate to `/projects`**:
   - Click **Projects** in the navigation bar.
   - Observe the `<LoadingPage />` fallback displaying *"Loading... Please wait while the page loads."*.
   - In the Network tab, observe the dynamic fetch of `Projects-tmlak3Ki.js`.
8. **Navigate to `/contact`**:
   - Click **Contact** in the navigation bar.
   - Observe the `<LoadingPage />` fallback again.
   - In the Network tab, observe the dynamic fetch of `Contact-BWzeUhLB.js`.

---

## 8. Verification & Evidence Collection

### Suggested Screenshots
| Screenshot | Recommended Filename | Description |
|---|---|---|
| **Before Optimization** | `before-optimization.png` | Network tab on initial load before code-splitting |
| **Suspense Fallback UI** | `suspense-loading.png` | Fallback loading UI visible under Slow 3G |
| **After Optimization** | `after-optimization.png` | Network tab showing separate chunk requests on route change |

### Performance Comparison Template
*(Values to be recorded manually via Chrome DevTools)*

| Metric | Before Optimization | After Optimization (Practical 8) |
|---|:---:|:---:|
| **Initial JS Bundle Size** | *Recorded manually* | 175.68 kB (56.97 kB gzipped) |
| **Projects Chunk Size** | Included in main bundle | 1.83 kB (0.90 kB gzipped) |
| **Contact Chunk Size** | Included in main bundle | 2.09 kB (0.83 kB gzipped) |
| **Initial JS Requests** | *Recorded manually* | *Recorded manually* |
| **Total Transferred JS (Home)** | *Recorded manually* | *Recorded manually* |
| **Initial Load Time** | *Recorded manually* | *Recorded manually* |
