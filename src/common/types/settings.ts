export type SectionData = {
  id: number;
  title: string;
  value: boolean;
  type: number;
  sectionId: number;
};

export type Section = {
  id: number;
  title: string;
  data: SectionData[];
};
