console.log("ProfileSetup mounted at", new Date().toISOString());

import { useState } from "react";

const JOB_OPTIONS = [
  "프론트엔드","백엔드","풀스택","모바일(iOS)","모바일(Android)","웹 퍼블리셔",
  "QA/테스트","DevOps/SRE","클라우드 엔지니어","게임 클라이언트","게임 서버",
  "임베디드/펌웨어","하드웨어","로보틱스","데이터 분석가","데이터 사이언티스트",
  "데이터 엔지니어","머신러닝 엔지니어","AI 리서처","제품 기획/PM","UI/UX 디자이너",
  "그래픽/모션 디자이너","마케터","콘텐츠 마케터","세일즈/CS","기술지원",
  "보안(정보보안)","테크니컬 라이터","기타",
];

export default function ProfileSetup() {
  const [nickname, setNickname] = useState("");
  const [job, setJob] = useState("");
  const [customJobChecked, setCustomJobChecked] = useState(false);
  const [customJob, setCustomJob] = useState("");
  const [showList, setShowList] = useState(true); // 처음엔 펼쳐진 목록

  const nicknameValid = nickname.trim().length >= 2;
  const jobValid = customJobChecked ? customJob.trim().length >= 2 : !!job;
  const canNext = nicknameValid && jobValid;

  const handleSelect = (e) => {
    setJob(e.target.value);
    setShowList(false); // 선택하면 접힘(스크롤 사라짐)
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!canNext) return;
    alert(`닉네임: ${nickname}\n직무: ${customJobChecked ? customJob : job}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleNext} className="w-full max-w-[720px]" aria-labelledby="title">
        {/* 헤더 */}
        <div className="text-center mb-9">
          <h1 id="title" className="font-extrabold tracking-tight text-[44px] md:text-[52px]">
            환영합니다
          </h1>
          <p className="mt-3 text-[15px] md:text-[16px] text-[var(--color-text-muted)]">
            커리어메이트에서 나에게 맞는 피드백을 설계해<br className="hidden md:block" />
            프로필을 설정해주세요.
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] bg-white/90 backdrop-blur border border-slate-200 shadow-[var(--shadow-soft)] p-6 md:p-8 space-y-7">
          {/* 닉네임 */}
          <div>
            <label htmlFor="nickname" className="block text-sm font-semibold text-slate-800 mb-2">
              닉네임을 입력해주세요
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full h-[52px] rounded-[var(--radius-xl)] border border-slate-300 px-4 text-[15px] outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition"
            />
            {!nicknameValid && nickname.length > 0 && (
              <p className="mt-2 text-xs text-red-600">닉네임은 2자 이상 입력해주세요.</p>
            )}
          </div>

          {/* 희망·직무 */}
          <div>
            <div className="text-sm font-semibold text-slate-800 mb-2">
              희망·직무를 선택해주세요
            </div>

            {/* 직접 입력 토글 */}
            <label className="mb-3 flex items-center gap-2 text-sm text-slate-700 select-none">
              <input
                type="checkbox"
                checked={customJobChecked}
                onChange={(e) => {
                  setCustomJobChecked(e.target.checked);
                  setCustomJob("");
                  setJob("");
                  setShowList(true);
                }}
                className="h-4 w-4 rounded border-slate-300"
              />
              직접 입력
            </label>

            {!customJobChecked ? (
              <div className="relative">
                {showList ? (
                  // 펼친 목록 (스크롤 보임)
                  <select
                    value={job}
                    onChange={handleSelect}
                    size={8}
                    className="w-full rounded-[var(--radius-xl)] border border-slate-300 px-4 py-3 text-[15px] outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition bg-white"
                  >
                    <option value="" disabled>선택</option>
                    {JOB_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  // 접힌 모드 (스크롤 사라지고 선택값만 표시)
                  <div className="relative">
                    <select
                      value={job}
                      onChange={(e) => setJob(e.target.value)}
                      className="w-full h-[48px] appearance-none rounded-[var(--radius-xl)] border border-slate-300 pl-4 pr-10 text-[15px] outline-none bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition"
                    >
                      {JOB_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      ▼
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowList(true)}
                      className="absolute inset-0 rounded-[var(--radius-xl)] focus:outline-none focus:ring-2 focus:ring-slate-200"
                      aria-label="목록 펼치기"
                    />
                  </div>
                )}
              </div>
            ) : (
              <input
                type="text"
                placeholder="직무를 직접 입력해주세요 (예: 프론트엔드 인턴)"
                value={customJob}
                onChange={(e) => setCustomJob(e.target.value)}
                className="w-full h-[48px] rounded-[var(--radius-xl)] border border-slate-300 px-4 text-[15px] outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition"
              />
            )}

            {!jobValid && (customJobChecked ? customJob.length > 0 : true) && (
              <p className="mt-2 text-xs text-red-600">직무를 선택하거나 2자 이상 입력해주세요.</p>
            )}
          </div>

          {/* 다음 버튼 */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={!canNext}
              className={`w-full h-[var(--btn-height)] rounded-[var(--radius-xl)] text-white text-[17px] font-semibold shadow-[0_10px_18px_rgba(37,99,235,.25)] transition
                ${canNext
                  ? "bg-[linear-gradient(90deg,#2563eb,#1d4ed8)] hover:brightness-105 active:translate-y-[1px]"
                  : "bg-slate-300 cursor-not-allowed shadow-none"}`}
            >
              다음으로
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
console.log("ProfileSetup mounted at", new Date().toISOString());
