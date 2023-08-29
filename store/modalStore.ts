import { create } from 'zustand'

export const useModalStore = create<ModalState>((set, get)=> ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))