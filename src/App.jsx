import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfileSetup from "./pages/ProfileSetup";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="*" element={<Navigate to="/profile-setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
