// App.jsx (수정본)
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hydrateProfileFromStorage } from "./stores/profile";

import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";
import "./index.css";

// 로컬스토리지에 저장된 프로필 존재 여부(간단 가드)
function hasProfile() {
  try {
    const raw = localStorage.getItem("cm_profile");
    const data = raw ? JSON.parse(raw) : null;
    return !!data;
  } catch {
    return false;
  }
}

// /home 접근 시 프로필 없으면 /profile-setup으로 돌려보내기
function HomeGuard() {
  return hasProfile() ? <Home /> : <Navigate to="/profile-setup" replace />;
}

export default function App() {
  useEffect(() => {
    // 로컬스토리지 → 상태 복원 (초기 렌더 전에 불러와도 무방)
    hydrateProfileFromStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 기본 진입: 무조건 프로필 생성 화면부터 */}
        <Route path="/" element={<Navigate to="/profile-setup" replace />} />

        {/* 실제 페이지 */}
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/home" element={<HomeGuard />} />

        {/* 홈에서 링크하는 경로들: 임시 플레이스홀더 */}
        <Route path="/profile"   element={<div />} />
        <Route path="/resume"    element={<div />} />
        <Route path="/interview" element={<div />} />
        <Route path="/reports"   element={<div />} />
        <Route path="/history"   element={<div />} />
        <Route path="/jobs"      element={<div />} />
        <Route path="/settings"  element={<div />} />

        {/* ✅ 알 수 없는 경로도 프로필 생성으로 보냅니다 */}
        <Route path="*" element={<Navigate to="/profile-setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
