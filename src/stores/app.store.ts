import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
    Project,
    ScheduledPost,
    BrandProfile,
    ConnectedAccount,
    ProjectStatus,
} from "@type/index";

interface AppState {
    niche: string;
    projects: Project[];
    scheduledPosts: ScheduledPost[];
    connectedAccounts: ConnectedAccount[];
    brandProfile: BrandProfile | null;

    // Actions
    setNiche: (niche: string) => void;
    addProject: (project: Project) => void;
    updateProjectStatus: (id: string, status: ProjectStatus) => void;
    deleteProject: (id: string) => void;
    setProjects: (projects: Project[]) => void;

    schedulePost: (post: ScheduledPost) => void;
    unschedulePost: (id: string) => void;

    setBrandProfile: (profile: BrandProfile) => void;

    connectAccount: (account: ConnectedAccount) => void;
    disconnectAccount: (id: string) => void;
}

const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            niche: "AI Technology & Automation",
            projects: [],
            scheduledPosts: [],
            connectedAccounts: [],
            brandProfile: null,

            setNiche: (niche) => set({ niche }),

            addProject: (project) => set((state) => ({
                projects: [project, ...state.projects]
            })),

            updateProjectStatus: (id, status) => set((state) => ({
                projects: state.projects.map(p => p.id === id ? { ...p, status, lastModified: Date.now() } : p)
            })),

            deleteProject: (id) => set((state) => ({
                projects: state.projects.filter(p => p.id !== id)
            })),

            setProjects: (projects) => set({ projects }),

            schedulePost: (post) => set((state) => ({
                scheduledPosts: [...state.scheduledPosts, post]
            })),

            unschedulePost: (id) => set((state) => ({
                scheduledPosts: state.scheduledPosts.filter(p => p.id !== id)
            })),

            setBrandProfile: (brandProfile) => set({ brandProfile }),

            connectAccount: (account) => set((state) => ({
                connectedAccounts: [...state.connectedAccounts, account]
            })),

            disconnectAccount: (id) => set((state) => ({
                connectedAccounts: state.connectedAccounts.filter(a => a.id !== id)
            })),
        }),
        {
            name: "niche-ai-app-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAppStore;
