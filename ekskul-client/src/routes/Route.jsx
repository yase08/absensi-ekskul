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
import AbsensiPostDashboard from "../pages/Admin/Absensi/AbsensiPost";
import DetailAbsensiDashboard from "../pages/Admin/Absensi/Detail";
import Login from "../pages/Admin/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PenilaianDashboard from "../pages/Admin/Tugas/Nilai";
import InstrukturDashboard from "../pages/Admin/Instruktur/Instruktur";
import PenilaianPostDashboard from "../pages/Admin/Tugas/PenilaianPost";
import TugasDashboard from "../pages/Admin/Tugas/Tugas";
import HariDashboard from "../pages/Admin/Hari/Hari";
import UserDashboard from "../pages/Admin/User/User";
import DetailGalleryDashboard from "../pages/Admin/Gallery/Detail/Detail";
import PersistLogin from "../components/Admin/User/PersistLogin";
import RequireAuth from "../components/Admin/User/RequireAuth";
import NotFound from "../pages/Admin/NotFound/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route
              path="/admin/penugasan/penilaian/:id"
              element={<PenilaianDashboard />}
            />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route
              path="/admin/penugasan/nilai/:id"
              element={<PenilaianPostDashboard />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/hari" element={<HariDashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/user" element={<UserDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route path="/admin/penugasan" element={<TugasDashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/rombel" element={<RombelDashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/rayon" element={<RayonDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route path="/admin/absensi-siswa" element={<AbsensiDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route
              path="/admin/absensi-siswa/tambah"
              element={<AbsensiPostDashboard />}
            />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route
              path="/admin/absensi-siswa/detail/:id"
              element={<DetailAbsensiDashboard />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route
              path="/admin/ekstrakurikuler"
              element={<EkstrakurikulerDashboard />}
            />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route path="/admin/jadwal" element={<JadwalDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route path="/admin/program" element={<ProgramDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route path="/admin/siswa" element={<SiswaDashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/ruangan" element={<RuanganDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route path="/admin/profile" element={<ProfileDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route path="/admin/gallery" element={<GalleryDashboard />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route
              path="/admin/gallery/detail/:slug"
              element={<DetailGalleryDashboard />}
            />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["admin", "instructor"]} />}
          >
            <Route
              path="/admin/absensi-instruktur"
              element={<InstrukturDashboard />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
