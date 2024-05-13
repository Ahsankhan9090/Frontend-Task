import create from "zustand";

export const useAutocompleteStore = create((set) => ({
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
  tags: [],
  addTag: (tagName) =>
    set((state) => ({
      tags: [...state.tags, { id: state.tags.length + 1, name: tagName }],
    })),
  deleteTag: (tagId) =>
    set((state) => ({ tags: state.tags.filter((tag) => tag.id !== tagId) })),
}));
