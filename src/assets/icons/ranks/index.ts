import Bronze1 from "./bronze-1.svg";
import Bronze2 from "./bronze-2.svg";
import Bronze3 from "./bronze-3.svg";

import Silver1 from "./silver-1.svg";
import Silver2 from "./silver-2.svg";
import Silver3 from "./silver-3.svg";

import Gold1 from "./gold-1.svg";
import Gold2 from "./gold-2.svg";
import Gold3 from "./gold-3.svg";

import Platinum1 from "./platinum-1.svg";
import Platinum2 from "./platinum-2.svg";
import Platinum3 from "./platinum-3.svg";

import Diamond1 from "./diamond-1.svg";
import Diamond2 from "./diamond-2.svg";
import Diamond3 from "./diamond-3.svg";

import Grandmaster from "./grandmaster.svg";

export {
  Bronze1,
  Bronze2,
  Bronze3,
  Silver1,
  Silver2,
  Silver3,
  Gold1,
  Gold2,
  Gold3,
  Platinum1,
  Platinum2,
  Platinum3,
  Diamond1,
  Diamond2,
  Diamond3,
  Grandmaster,
};

export type Rank =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "grandmaster";

export type RankIcon = string;

export const RANK_ICON_MAP: Record<Rank, RankIcon[]> = {
  bronze: [Bronze1, Bronze2, Bronze3],
  silver: [Silver1, Silver2, Silver3],
  gold: [Gold1, Gold2, Gold3],
  platinum: [Platinum1, Platinum2, Platinum3],
  diamond: [Diamond1, Diamond2, Diamond3],
  grandmaster: [Grandmaster],
};
