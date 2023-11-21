import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login, InputData, DashboardDosen, UploadDataMhs, DosenDataMhs, DashboardMhs, DashboardDepartment, PencapaianMhs, PencapaianDepartment } from "./Pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Page operator */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/inputdata" element={<InputData />} />
          {/* Page dosen */}
          <Route path="/dashboarddosen" element={<DashboardDosen />} />
          <Route path="/dashboarddosen/uploaddatamhs" element={<UploadDataMhs />} />
          <Route path="/dashboarddosen/dosendatamhs" element={<DosenDataMhs />} />
          {/* Page mahasiswa */}
          <Route path="/dashboardmhs" element={<DashboardMhs />} />
          <Route path="/dashboardmhs/pencapaian" element={<PencapaianMhs />} />
          {/* Page department */}
          <Route path="/dashboarddepartment" element={<DashboardDepartment />} />
          <Route path="/dashboarddepartment/pencapaian" element={<PencapaianDepartment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
