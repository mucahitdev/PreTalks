import { Section } from "@/common/types/settings";

export const handleToggle = (
  sections: Section[],
  sectionId: number,
  itemId: number,
): Section[] => {
  return sections.map((section) => {
    if (section.id === sectionId) {
      return {
        ...section,
        data: section.data.map((item) => {
          if (item.id === itemId) {
            const newValue = !item.value;
            return { ...item, value: newValue };
          }
          return item;
        }),
      };
    }
    return section;
  });
};
