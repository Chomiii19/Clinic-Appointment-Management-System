import { Routes, Route } from "react-router-dom";
import "./global.css";
import Dashboard from "./pages/app/dashboard";
import Appointments from "./pages/app/appointments";
import Patients from "./pages/app/patients";
import Reports from "./pages/app/reports";
import ManageAdmins from "./pages/settings/manageAdmins";
import ManageDoctors from "./pages/settings/manageDoctors";
import ManageServices from "./pages/settings/manageServices";
import PolictyTerms from "./pages/settings/policyTerms";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/admins" element={<ManageAdmins />} />
      <Route path="/doctors" element={<ManageDoctors />} />
      <Route path="/services" element={<ManageServices />} />
      <Route path="/policies-and-terms" element={<PolictyTerms />} />
    </Routes>
  );
}

export default App;
