import Dashboard from "../pages/User/Dashboard/Landing";
import AdminDashboard from "../pages/Admin/Dashboard/Dashboard";
import RombelDashboard from "../pages/Admin/Rombel/Rombel";
import RayonDashboard from "../pages/Admin/Rayon/Rayon";
import EkstrakulikulerDashboard from "../pages/Admin/Ekstrakulikuler/Ekstrakulikuler";
import JadwalDashboard from "../pages/Admin/Jadwal/Jadwal";
import RuanganDashboard from "../pages/Admin/Ruangan/Ruangan";
import ProgramDashboard from "../pages/Admin/Program/Program";
import SiswaDashboard from "../pages/Admin/Siswa/Siswa";
import ProfileDashboard from "../pages/Admin/Profile/Profile"
import GalleryDashboard from "../pages/Admin/Gallery/Gallery"
import Login from "../pages/Admin/Login/Login"
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Dashboard />,
  },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/rombel",
    element: <RombelDashboard />,
  },
  {
    path: "/admin/rayon",
    element: <RayonDashboard />,
  },
  {
    path: "/admin/ekstrakulikuler",
    element: <EkstrakulikulerDashboard />,
  },
  {
    path: "/admin/jadwal",
    element: <JadwalDashboard />,
  },
  {
    path: "/admin/program",
    element: <ProgramDashboard />,
  },
  {
    path: "/admin/siswa",
    element: <SiswaDashboard />,
  },
  {
    path: "/admin/ruangan",
    element: <RuanganDashboard />,
  },
  {
    path: "/admin/profile",
    element: <ProfileDashboard/>,
  },
  {
    path: "/admin/gallery",
    element: <GalleryDashboard/>,
  },
]);

export default router
