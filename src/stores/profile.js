import { create } from "zustand";

export const useProfileStore = create((set) => ({
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

export const hydrateProfileFromStorage = () => {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem("cm_profile");
  if (!raw) return;
  try {
    const p = JSON.parse(raw);
    useProfileStore.getState().setProfile(p);
  } catch {}
};
