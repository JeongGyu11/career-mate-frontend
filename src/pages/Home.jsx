import { Link } from "react-router-dom";
import { useProfileStore } from "../stores/profile";
import "./Home.css";

export default function Home() {
  const profile = useProfileStore((s) => s.profile);
  const { nickname = "회원", desiredRole = "미설정", recentActivity } = profile ?? {};

  // 공용 클릭 핸들러: 링크 이동 막고 알림만
  const handleQuickActionClick = (e, label) => {
    e.preventDefault();            // 기본 네비게이션 방지
    window.alert(`${label} 버튼을 눌렀습니다.`);
  };

  return (
    <main className="cm-home">
      <header className="cm-hero" role="region" aria-labelledby="home-hello">
        <div className="cm-hero__top">
          <div className="cm-brand">CareerMate</div>
        </div>

        <h1 id="home-hello" className="cm-hello">환영합니다, {nickname}님!</h1>

        <div className="cm-profile-card">
          {/* ✅ 아바타는 그대로 프로필 페이지로 이동 */}
          <Link to="/profile" className="cm-avatar" aria-label="프로필 보기"> 👤 </Link>

          <div className="cm-profile-meta">
            <div className="cm-row">
              <span className="cm-label">희망 직무:</span>
              <strong className="cm-value">{desiredRole}</strong>
            </div>
            {recentActivity && (
              <div className="cm-row">
                <span className="cm-label">최근 활동:</span>
                <span className="cm-value">{recentActivity}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="quick-grid" aria-label="빠른 실행">
        <Link
          className="qa-card"
          to="/resume"
          onClick={(e) => handleQuickActionClick(e, "이력서 첨부")}
        >
          <span className="qa-icon">📄</span>
          <span className="qa-title">이력서 첨부</span>
          <span className="qa-desc">이력서를 업로드하고 분석</span>
        </Link>

        <Link
          className="qa-card"
          to="/interview"
          onClick={(e) => handleQuickActionClick(e, "면접 보기")}
        >
          <span className="qa-icon">🎤</span>
          <span className="qa-title">면접 보기</span>
          <span className="qa-desc">AI 면접 시뮬레이션</span>
        </Link>

        <Link
          className="qa-card"
          to="/reports"
          onClick={(e) => handleQuickActionClick(e, "피드백 리포트")}
        >
          <span className="qa-icon">📊</span>
          <span className="qa-title">피드백 리포트</span>
          <span className="qa-desc">이전 피드백 확인</span>
        </Link>

        <Link
          className="qa-card"
          to="/history"
          onClick={(e) => handleQuickActionClick(e, "이전 기록 보기")}
        >
          <span className="qa-icon">🕒</span>
          <span className="qa-title">이전 기록 보기</span>
          <span className="qa-desc">활동 기록 살펴보기</span>
        </Link>

        <Link
          className="qa-card"
          to="/jobs"
          onClick={(e) => handleQuickActionClick(e, "구직 사이트 바로가기")}
        >
          <span className="qa-icon">🔗</span>
          <span className="qa-title">구직 사이트 바로가기</span>
          <span className="qa-desc">주요 사이트 이동</span>
        </Link>

        <Link
          className="qa-card"
          to="/settings"
          onClick={(e) => handleQuickActionClick(e, "설정")}
        >
          <span className="qa-icon">⚙️</span>
          <span className="qa-title">설정</span>
          <span className="qa-desc">환경 설정 변경</span>
        </Link>
      </nav>
    </main>
  );
}
