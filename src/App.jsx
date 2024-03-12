import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login, InputData, DashboardDosen, UploadDataMhs, DosenDataMhs, CapaianPembelajaran, DashboardMhs, DashboardDepartment, PencapaianMhs, PencapaianDepartment, NotFound } from "./Pages";
import PrivateRoutes from "../Utils/PrivateRoutes";
import FilterMahasiswaRoutes from "../Utils/FilterMahasiswaRoutes";
import { FilterDepartemenRoutes, FilterDosenRoutes, FilterOperatorRoutes } from "../Utils";
import GeneratePDFPage from "./Pages/PencapaianMhs/GeneratePDFPage";
import CapaianPembelajaranMhsAll from "./Pages/PencapaianDepartment/CapaianPembelajaranMhsAll";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            {/* Page operator */}
            <Route element={<FilterOperatorRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/input-data" element={<InputData />} />
            </Route>
            {/* Page dosen */}
            <Route element={<FilterDosenRoutes />}>
              <Route path="/dashboard-dosen" element={<DashboardDosen />} />
              <Route path="/dashboard-dosen/upload-data-mahasiswa" element={<UploadDataMhs />} />
              <Route path="/dashboard-dosen/dosen-data-mahasiswa" element={<DosenDataMhs />} />
              <Route path="/dashboard-dosen/capaian-pembelajaran/:nim" element={<CapaianPembelajaran />} />
            </Route>
            {/* Page mahasiswa */}
            <Route element={<FilterMahasiswaRoutes />}>
              <Route path="/dashboard-mahasiswa" element={<DashboardMhs />} />
              <Route path="/dashboard-mahasiswa/pencapaian" element={<PencapaianMhs />} />
              {/* Tambahkan rute untuk halaman pembuatan PDF di sini */}
              <Route path="/dashboard-mahasiswa/pencapaian/generate-pdf" element={<GeneratePDFPage />} />
            </Route>
            {/* Page department */}
            <Route element={<FilterDepartemenRoutes />}>
              <Route path="/dashboard-departemen" element={<DashboardDepartment />} />
              <Route path="/dashboard-departemen/permahasiswaan" element={<PencapaianDepartment />} />
              <Route path="/dashboard-departemen/capaian-pembelajaran/:nim" element={<CapaianPembelajaranMhsAll />} />
            </Route>
          </Route>
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
