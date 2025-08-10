import { create } from "zustand";

export type Profile = {
  nickname: string;
  desiredRole?: string;
  recentActivity?: string; // 선택
};

type ProfileStore = {
  profile: Profile | null;
  setProfile: (p: Profile) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (p) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cm_profile", JSON.stringify(p));
    }
    set({ profile: p });
  },
  clearProfile: () => {
    if (typeof window !== "undefined") localStorage.removeItem("cm_profile");
    set({ profile: null });
  },
}));

// 새로고침 시 복원용(홈 등에서 호출)
export const hydrateProfileFromStorage = () => {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem("cm_profile");
  if (!raw) return;
  try {
    const p = JSON.parse(raw) as Profile;
    useProfileStore.getState().setProfile(p);
  } catch {
    // 파싱 실패 시 무시
  }
};
