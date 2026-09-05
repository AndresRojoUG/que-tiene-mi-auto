export type FuseReferenceCoverage = {
  id: string;
  brand: "Volkswagen";
  model: "Jetta";
  generation: string;
  years: readonly number[];
  boxes: readonly ("interior" | "battery")[];
  sourceUrl: string;
};

/**
 * Navigation coverage is deliberately separate from verified assignments.
 * It lets us scale by generation without treating an external reference as an
 * exact fuse map for every market, engine, and equipment combination.
 */
export const fuseReferenceCatalog: FuseReferenceCoverage[] = [
  { id: "jetta-a2", brand: "Volkswagen", model: "Jetta", generation: "A2", years: [1991], boxes: ["interior", "battery"], sourceUrl: "https://www.opinautos.com/volkswagen/jetta/info/fusibles/1991" },
  { id: "jetta-a3", brand: "Volkswagen", model: "Jetta", generation: "A3", years: [1992, 1993, 1994, 1995, 1996, 1997, 1998], boxes: ["interior", "battery"], sourceUrl: "https://www.opinautos.com/volkswagen/jetta/info/fusibles" },
  { id: "jetta-a4", brand: "Volkswagen", model: "Jetta", generation: "A4", years: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006], boxes: ["interior", "battery"], sourceUrl: "https://www.opinautos.com/volkswagen/jetta/info/fusibles" },
  { id: "jetta-classic", brand: "Volkswagen", model: "Jetta", generation: "Classic / Clásico", years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014], boxes: ["interior", "battery"], sourceUrl: "https://www.opinautos.com/volkswagen/jetta/info/fusibles/2009/classic-clasico" },
  { id: "jetta-a5", brand: "Volkswagen", model: "Jetta", generation: "A5", years: [2005, 2006, 2007, 2008, 2009, 2010, 2011], boxes: ["interior", "battery"], sourceUrl: "https://www.opinautos.com/volkswagen/jetta/info/fusibles" },
  { id: "jetta-a6", brand: "Volkswagen", model: "Jetta", generation: "A6", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018], boxes: ["interior", "battery"], sourceUrl: "https://www.opinautos.com/volkswagen/jetta/info/fusibles" },
  { id: "jetta-a7", brand: "Volkswagen", model: "Jetta", generation: "A7", years: [2019, 2020, 2021, 2022, 2023, 2024], boxes: ["interior", "battery"], sourceUrl: "https://www.opinautos.com/volkswagen/jetta/info/fusibles" },
];

export function getFuseReferenceCoverage(brand: string, model: string) {
  return fuseReferenceCatalog.filter((coverage) => coverage.brand === brand && coverage.model === model);
}
