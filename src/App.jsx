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
              <Route path="/dashboard/inputdata" element={<InputData />} />
            </Route>
            {/* Page dosen */}
            <Route element={<FilterDosenRoutes />}>
              <Route path="/dashboarddosen" element={<DashboardDosen />} />
              <Route path="/dashboarddosen/uploaddatamhs" element={<UploadDataMhs />} />
              <Route path="/dashboarddosen/dosendatamhs" element={<DosenDataMhs />} />
              <Route path="/dashboarddosen/capaianpembelajaran/:nim" element={<CapaianPembelajaran />} />
            </Route>
            {/* Page mahasiswa */}
            <Route element={<FilterMahasiswaRoutes />}>
              <Route path="/dashboardmhs" element={<DashboardMhs />} />
              <Route path="/dashboardmhs/pencapaian" element={<PencapaianMhs />} />
              {/* Tambahkan rute untuk halaman pembuatan PDF di sini */}
              <Route path="/dashboardmhs/pencapaian/generate-pdf" element={<GeneratePDFPage />} />
            </Route>
            {/* Page department */}
            <Route element={<FilterDepartemenRoutes />}>
              <Route path="/dashboarddepartment" element={<DashboardDepartment />} />
              <Route path="/dashboarddepartment/permahasiswaan" element={<PencapaianDepartment />} />
              <Route path="/dashboarddepartment/capaianpembelajaran/:nim" element={<CapaianPembelajaranMhsAll />} />
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
