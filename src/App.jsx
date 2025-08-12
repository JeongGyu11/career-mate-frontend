// App.jsx (수정본)
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hydrateProfileFromStorage } from "./stores/profile";

import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";
import "./index.css";

export default function App() {
  useEffect(() => {
    hydrateProfileFromStorage(); // 로컬스토리지 → 상태 복원
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 진입은 홈으로 */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 실제 페이지 */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* 🔹 Home에서 링크하는 경로들: 임시 플레이스홀더라도 만들어둡니다 */}
        <Route path="/profile"   element={<div />} />
        <Route path="/resume"    element={<div />} />
        <Route path="/interview" element={<div />} />
        <Route path="/reports"   element={<div />} />
        <Route path="/history"   element={<div />} />
        <Route path="/jobs"      element={<div />} />
        <Route path="/settings"  element={<div />} />

        {/* 🔹 와일드카드는 이제 홈으로 보냅니다 (예전처럼 profile-setup X) */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
