import React from "react";
import { cn } from "../../lib/utils";
import type { SlippiUser } from "../../api/types";
import { RANK_ICON_MAP, type Rank } from "@/assets/icons/ranks";
import { Tooltip } from "../ui/tooltip";
import { CharacterIcon } from "../ui/character-icon";
import { RANK_BG_MAP, RANK_COLOR_MAP } from "@/lib/ranks";

interface UserBannerProps {
  user: SlippiUser | undefined;
}

export const UserBanner = ({ user }: UserBannerProps) => {
  const parts = user?.rankedProfile?.rankName?.toLowerCase().split(" ") ?? [];
  const globalPlacement =
    user?.rankedProfile?.dailyGlobalPlacement != null &&
    Number.isFinite(user.rankedProfile.dailyGlobalPlacement);

  const isGrandmaster = parts[0] === "master" && globalPlacement;

  const rankLower = (isGrandmaster ? "grandmaster" : parts[0] ?? "unranked") as Rank;

  const rankColorClass = RANK_COLOR_MAP[rankLower] ?? RANK_COLOR_MAP.unranked;
  const rankBgClass = RANK_BG_MAP[rankLower] ?? RANK_BG_MAP.unranked;

  const variantRaw = parts[1];
  const variantIndexUnclamped = (Number.parseInt(variantRaw ?? "1", 10) || 1) - 1;

  const icons = rankLower === "unranked" ? undefined : RANK_ICON_MAP[rankLower];
  const variantIndex = icons
    ? Math.min(Math.max(0, variantIndexUnclamped), icons.length - 1)
    : 0;

  const RankIcon = icons?.[variantIndex];

  return (
    <div className="flex flex-col gap-2 px-6 py-3 text-white relative overflow-visible">
      <div className={cn(["absolute top-0 -left-10 w-[110%] h-30 blur-2xl opacity-20 rounded-full", rankBgClass])} />

      <h3 className="font-serif text-2xl z-20">{user?.displayName}</h3>

      <div className="flex flex-col gap-2.5 z-20">
        <h3 className="font-sans text-[64px] leading-4 tracking-wide">{user?.connectCode}</h3>

        <div className={cn(["font-sans flex items-center gap-1.5", rankColorClass])}>
          {RankIcon ? <RankIcon className="relative w-7 h-7" /> : null}
          <h3 className="text-[42px] leading-4 tracking-wide">
            {rankLower.toUpperCase()} {!isGrandmaster ? variantRaw : ""}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {user?.characters?.map((char) => (
          <CharacterIcon character={char}/>
        ))}
      </div>
    </div>
  );
};
