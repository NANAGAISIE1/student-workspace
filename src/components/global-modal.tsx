"use client";

import { create } from "zustand";
import { Dialog } from "@/components/ui/dialog";
import { CommandDialog } from "./ui/command";
import { useEffect, useState } from "react";

interface Modal {
  id: string;
  isOpen: boolean;
  type?: "command" | "dialog";
  children: React.ReactNode;
}

interface ModalState {
  modals: Modal[];
  openModal: ({
    id,
    children,
    type,
  }: {
    id: string;
    children: React.ReactNode;
    type?: "command" | "dialog";
  }) => void;
  closeModal: (id: string) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  modals: [],
  openModal: ({ id, children, type }) =>
    set((prevState) => {
      return {
        modals: [...prevState.modals, { id, children, isOpen: true, type }],
      };
    }),
  closeModal: (id) =>
    set((prevState) => {
      return {
        modals: prevState.modals.map((modal) =>
          modal.id === id ? { ...modal, isOpen: false, type: "dialog" } : modal,
        ),
      };
    }),
}));

export default function Modals() {
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {modals.map((modal) => {
        switch (modal.type) {
          case "dialog":
            return (
              <Dialog
                open={modal.isOpen}
                onOpenChange={() => closeModal(modal.id)}
              >
                {modal.children}
              </Dialog>
            );
          case "command":
            return (
              <CommandDialog
                open={modal.isOpen}
                onOpenChange={() => closeModal(modal.id)}
              >
                {modal.children}
              </CommandDialog>
            );
        }
      })}
    </>
  );
}
