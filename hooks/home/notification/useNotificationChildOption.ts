import { create } from "zustand";

type NotificationChildOption = {
  open: boolean;
  setOpen: (open: boolean) => void;
  notification_id?: string;
  setNotificationId: (id: string) => void;
  is_readed?: boolean;
  setIsReaded: (is_readed: boolean) => void;
};

export const useNotificationChildOption = create<NotificationChildOption>(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
    notification_id: "",
    setNotificationId: (id) => set({ notification_id: id }),
    setIsReaded: (is_readed) => set({ is_readed }),
  })
);
