import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  profile: {
    fullName: string;
    company: string;
    avatarUrl: string;
  };
  notifications: {
    orderStatusChange: boolean;
    deliverableReady: boolean;
  };
  updateProfile: (data: Partial<SettingsState['profile']>) => void;
  updateNotifications: (data: Partial<SettingsState['notifications']>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      profile: {
        fullName: 'John Doe',
        company: 'Acme Corp',
        avatarUrl: '',
      },
      notifications: {
        orderStatusChange: true,
        deliverableReady: true,
      },
      updateProfile: (data) => 
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),
      updateNotifications: (data) =>
        set((state) => ({
          notifications: { ...state.notifications, ...data },
        })),
    }),
    {
      name: 'contentflow-settings',
    }
  )
);
