import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Helmet } from 'react-helmet';
import Dashboard from './pages/User/Dashboard/Landing';
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';
import RombelDashboard from './pages/Admin/Rombel/Rombel';
import RayonDashboard from './pages/Admin/Rayon/Rayon';
import EkstrakulikulerDashboard from './pages/Admin/Ekstrakulikuler/Ekstrakulikuler';
import JadwalDashboard from './pages/Admin/Jadwal/Jadwal';


function App() {
 return (
  <>
    <Helmet>
    <html className="h-full" />
    <body className="h-full dark:bg-dark bg-light" />
  </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rombel" element={<RombelDashboard />} />
          <Route path="/admin/rayon" element={<RayonDashboard />} />
          <Route path="/admin/ekstrakulikuler" element={<EkstrakulikulerDashboard />} />
          <Route path="/admin/jadwal" element={<JadwalDashboard />} />
        </Routes>
      </Router>
  </>
 );
}

export default App;