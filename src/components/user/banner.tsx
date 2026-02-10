import React from 'react'
import { cn } from "../../lib/utils"
import type { SlippiUser } from '../../api/types';
import { RANK_ICON_MAP, type Rank } from "@/assets/icons/ranks";
import { Tooltip } from '../ui/tooltip';

interface UserBannerProps { 
  user: SlippiUser | undefined;
}

export const UserBanner = ({ user }: UserBannerProps) => {
  const RANK_COLOR_MAP: Record<string, string> = {
    unranked: "text-unranked",
    bronze: "text-bronze",
    silver: "text-silver",
    gold: "text-gold",
    platinum: "text-platinum",
    diamond: "text-diamond",
    master: "text-master",
    grandmaster: "text-grandmaster",
  }

  const RANK_BG_MAP: Record<string, string> = {
    unranked: "bg-unranked",
    bronze: "bg-bronze",
    silver: "bg-silver",
    gold: "bg-gold",
    platinum: "bg-platinum",
    diamond: "bg-diamond",
    master: "bg-master",
    grandmaster: "bg-grandmaster",
  };

  const parts = user?.rankedProfile?.rankName?.toLowerCase().split(" ") ?? [];
  const globalPlacement = user?.rankedProfile?.dailyGlobalPlacement && isFinite(user?.rankedProfile?.dailyGlobalPlacement)
  const isGrandmaster = ((parts[0] == "master") && globalPlacement);

  const rankLower = isGrandmaster ? "grandmaster" : (parts[0] ?? "unranked") as Rank;
  const rankColorClass = RANK_COLOR_MAP[rankLower] ?? RANK_COLOR_MAP.unranked;
  const rankBgClass = RANK_BG_MAP[rankLower] ?? RANK_BG_MAP.unranked;
  
  const variantRaw = parts[1];
  const variantIndex = Math.max(0, (Number.parseInt(variantRaw ?? "1", 10) || 1) - 1);

  const icons = rankLower === "unranked" as Rank ? undefined : RANK_ICON_MAP[rankLower];
  const RankIcon = icons?.[variantIndex] ?? icons?.[0];
  
  return (
    <div className="flex flex-col gap-2 px-6 py-3 text-white relative">
      <div className={cn([`absolute top-0 -left-10 w-[110%] h-30 blur-2xl opacity-20 rounded-full`, rankBgClass])}></div>

      <h3 className="font-serif text-2xl z-20">{user?.displayName}</h3>
      <div className="flex flex-col gap-2.5 z-20">
        <h3 className="font-sans text-[64px] leading-4 tracking-wide">
          {user?.connectCode}
        </h3>

        <div
          className={cn(["font-sans flex items-center gap-1.5", rankColorClass])}
        >
          {RankIcon ? <img src={RankIcon} className='relative w-7'></img> : null}
          <h3 className='text-[42px] leading-4 tracking-wide'>{rankLower.toUpperCase()} {!isGrandmaster ? variantRaw : ""}</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {user?.characters?.map((char, i) => (
          <Tooltip label={<div className='flex flex-col leading-4 items-center'><span>{char.gameCount} {char.gameCount === 1 ? "game" : "games"}</span><span>{char.percentage}%</span></div>} side="top">
            <div className="relative w-7 h-7">
              <svg
                className="absolute inset-0 -rotate-90 scale-110"
                viewBox="0 0 36 36"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-green/20"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${char.percentage} 100`}
                  className="text-green"
                  strokeLinecap="round"
                />
              </svg>

              <img
                src={char.imageUrl}
                className="relative p-1 rounded-full w-full h-full"
                width={28}
                height={28}
                alt={char.name}
              />
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
