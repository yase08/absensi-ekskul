import Dashboard from "../pages/User/Dashboard/Landing";
import AdminDashboard from "../pages/Admin/Dashboard/Dashboard";
import RombelDashboard from "../pages/Admin/Rombel/Rombel";
import RayonDashboard from "../pages/Admin/Rayon/Rayon";
import EkstrakurikulerDashboard from "../pages/Admin/Ekstrakurikuler/Ekstrakurikuler";
import JadwalDashboard from "../pages/Admin/Jadwal/Jadwal";
import RuanganDashboard from "../pages/Admin/Ruangan/Ruangan";
import ProgramDashboard from "../pages/Admin/Program/Program";
import SiswaDashboard from "../pages/Admin/Siswa/Siswa";
import ProfileDashboard from "../pages/Admin/Profile/Profile";
import GalleryDashboard from "../pages/Admin/Gallery/Gallery";
import AbsensiDashboard from "../pages/Admin/Absensi/Absensi";
import Login from "../pages/Admin/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import PenilaianDashboard from "../pages/Admin/Penilaian/Penilaian";
import TugasDashboard from "../pages/Admin/Tugas/Tugas";
import HariDashboard from "../pages/Admin/Hari/Hari";
import UserDashboard from "../pages/Admin/User/User";
import DetailGalleryDashboard from "../pages/Admin/Gallery/Detail/Detail";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/hari",
    element: <HariDashboard />,
  },
  {
    path: "/admin/penilaian",
    element: <PenilaianDashboard />,
  },
  {
    path: "/admin/user",
    element: <UserDashboard />,
  },
  {
    path: "/admin/penugasan",
    element: <TugasDashboard />,
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
    path: "/admin/absensi",
    element: <AbsensiDashboard />,
  },
  {
    path: "/admin/ekstrakurikuler",
    element: <EkstrakurikulerDashboard />,
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
    element: <ProfileDashboard />,
  },
  {
    path: "/admin/gallery",
    element: <GalleryDashboard />,
  },
  {
    path: "/admin/gallery/detail/:slug",
    element: <DetailGalleryDashboard />,
  },
]);

export default router;
