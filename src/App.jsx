import { useEffect } from "react";
import { useProfileStore, hydrateProfileFromStorage } from "./stores/profile";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home"; // ✅ Home 페이지 불러오기
import "./index.css";

export default function App() {
  const setProfile = useProfileStore((s) => s.setProfile);

  useEffect(() => {
    hydrateProfileFromStorage(); // 로컬스토리지 → 상태 복원
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/home" element={<Home />} /> {/* ✅ Home 경로 추가 */}
        <Route path="*" element={<Navigate to="/profile-setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
