import type { Rank } from "@/assets/icons/ranks";

export const RANK_COLOR_MAP: Record<Rank, string> = {
    unranked: "text-unranked",
    bronze: "text-bronze",
    silver: "text-silver",
    gold: "text-gold",
    platinum: "text-platinum",
    diamond: "text-diamond",
    master: "text-master",
    grandmaster: "text-grandmaster",
};

export const RANK_BG_MAP: Record<Rank, string> = {
    unranked: "bg-unranked",
    bronze: "bg-bronze",
    silver: "bg-silver",
    gold: "bg-gold",
    platinum: "bg-platinum",
    diamond: "bg-diamond",
    master: "bg-master",
    grandmaster: "bg-grandmaster",
};