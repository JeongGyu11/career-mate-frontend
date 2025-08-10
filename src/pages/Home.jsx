import { useProfileStore } from "../stores/profile";
import "./Home.css"; // 스타일 파일 임포트

export default function Home() {
  const profile = useProfileStore((s) => s.profile);

  if (!profile) {
    return <p>프로필이 없습니다. 먼저 설정해주세요.</p>;
  }

return (
  <div className="home-container">
    {/* 환영 배너 */}
    <div className="welcome-banner">
      <h1>{profile.nickname}님 환영합니다! 🎉</h1>
      <p>직무: {profile.desiredRole}</p>
    </div>

    {/* 빠른 실행 카드 */}
    <div className="quick-grid">
      <button className="qa-card">
        <span className="qa-icon">📄</span>
        <span className="qa-title">이력서 첨부</span>
        <span className="qa-desc">이력서를 업로드하고 분석</span>
      </button>

      <button className="qa-card">
        <span className="qa-icon">🎤</span>
        <span className="qa-title">면접 보기</span>
        <span className="qa-desc">AI 면접 시뮬레이션</span>
      </button>

      <button className="qa-card">
        <span className="qa-icon">📊</span>
        <span className="qa-title">피드백 리포트</span>
        <span className="qa-desc">이전 피드백 확인</span>
      </button>

      <button className="qa-card">
        <span className="qa-icon">🕒</span>
        <span className="qa-title">이전 기록 보기</span>
        <span className="qa-desc">활동 기록 살펴보기</span>
      </button>

      <button className="qa-card">
        <span className="qa-icon">🔗</span>
        <span className="qa-title">구직 사이트 바로가기</span>
        <span className="qa-desc">주요 사이트 이동</span>
      </button>
    
      <button className="qa-card">
        <span className="qa-icon">⚙️</span>
        <span className="qa-title">설정</span>
        <span className="qa-desc">환경 설정 변경</span>
      </button>
    </div>
  </div>
);

}
