import { Routes, Route } from "react-router-dom";
import "./global.css";
import Dashboard from "./pages/app/dashboard";
import Patients from "./pages/app/patients";
import ManageAdmins from "./pages/settings/manageAdmins";
import ManageDoctors from "./pages/settings/manageDoctors";
import ManageServices from "./pages/settings/manageServices";
import PolictyTerms from "./pages/settings/policyTerms";
import { DarkModeProvider } from "./context/DarkModeContext";
import Login from "./pages/auth/login";
import ArchiveAppointments from "./pages/app/appointments/archiveAppointments";
import Appointments from "./pages/app/appointments/appointments";
import TodayAppointments from "./pages/app/appointments/todayAppointments";

function App() {
  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/archive" element={<ArchiveAppointments />} />
        <Route path="/appointments/today" element={<TodayAppointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/admins" element={<ManageAdmins />} />
        <Route path="/doctors" element={<ManageDoctors />} />
        <Route path="/services" element={<ManageServices />} />
        <Route path="/policies-and-terms" element={<PolictyTerms />} />
      </Routes>
    </DarkModeProvider>
  );
}

export default App;
