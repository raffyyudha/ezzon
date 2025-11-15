export type BrochureItem = {
  name: string;
  href: string;
};

export type BrochureGroup = {
  brand: string;
  items: BrochureItem[];
};

const BROCHURE_GROUPS: BrochureGroup[] = [
  {
    brand: "SATEC",
    items: [
      {
        name: "SATEC General Catalog",
        href: "/brosur/SATEC-GeneralCatalog.pdf",
      },
      {
        name: "ExpertPower Brochure",
        href: "/brosur/SATEC/ExpertPower-Brochure.pdf",
      },
      {
        name: "ExpertPower Manual",
        href: "/brosur/SATEC/Expertpower_manual.pdf",
      },
      {
        name: "PAS Datasheet",
        href: "/brosur/SATEC/PAS-Datasheet.pdf",
      },
      {
        name: "PAS Installation Manual",
        href: "/brosur/SATEC/PAS-Installation-Manual.pdf",
      },
    ],
  },
  {
    brand: "SERTEC",
    items: [
      {
        name: "CMCE 2025 Brochure",
        href: "/brosur/SERTEC/Brochure - CMCE 2025.pdf",
      },
      {
        name: "CMCE Marine Datasheet",
        href: "/brosur/SERTEC/CMCE-MARINE-Datasheet.pdf",
      },
      {
        name: "CMCE Manual (ENG)",
        href: "/brosur/SERTEC/MANUAL-CMCE-SERTEC-2021 - ENG_2.pdf",
      },
    ],
  },
];

export function getBrochureGroups(): BrochureGroup[] {
  return BROCHURE_GROUPS;
}
