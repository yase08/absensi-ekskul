import Dashboard from "../pages/User/Dashboard/Landing";
import AdminDashboard from "../pages/Admin/Dashboard/Dashboard";
import RombelDashboard from "../pages/Admin/Rombel/Rombel";
import RayonDashboard from "../pages/Admin/Rayon/Rayon";
import EkstrakulikulerDashboard from "../pages/Admin/Ekstrakulikuler/Ekstrakulikuler";
import JadwalDashboard from "../pages/Admin/Jadwal/Jadwal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/admin",
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
]);

export default router
