import React from 'react'
import { cn } from "../../lib/utils"
import type { SlippiUser } from '../../api/types';
import { RANK_ICON_MAP, type Rank } from "../../lib/imgs/icons/ranks";
import Diamond1 from '../../lib/imgs/icons/ranks/diamond-1.svg';

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

  const parts = user?.rankedProfile?.rankName?.toLowerCase().split(" ") ?? [];
  const isGrandmaster = ((parts[0] == "master") && isFinite(user?.rankedProfile?.dailyGlobalPlacement));

  const rankLower = isGrandmaster ? "grandmaster" : (parts[0] ?? "unranked");
  const rankColorClass = RANK_COLOR_MAP[rankLower] ?? RANK_COLOR_MAP.unranked;
  
  const variantRaw = parts[1];
  const variantIndex = Math.max(0, (Number.parseInt(variantRaw ?? "1", 10) || 1) - 1);

  const icons = rankLower === "unranked" ? undefined : RANK_ICON_MAP[rankLower];
  const RankIcon = icons?.[variantIndex] ?? icons?.[0];
  
  return (
    <div className="flex flex-col gap-3 px-6 text-white">
      <h3 className="font-serif text-2xl">{user?.displayName}</h3>

      <div className="flex flex-col gap-4.5">
        <h3 className="font-sans text-[64px]">
          {user?.connectCode}
        </h3>

        <h3
          className={cn(["font-sans text-[42px] flex items-center w-fit gap-1.5", rankColorClass])}
        >
          {/* <BronzeIcon /> */}

          {RankIcon ? <img src={RankIcon} className='relative bottom-1 w-7'></img> : null}
          {rankLower.toUpperCase()} {!isGrandmaster ? variantRaw : ""}
        </h3>
      </div>

      <div className='grid place-items-center grid-cols-6 w-fit gap-1 '>
        {user?.characters?.map((char, i) => (
          <div
            key={`${char.name}-${i}`}
            className="relative"
          >
            {/* SVG ring for more control */}
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
            
            {/* Image */}
            <img
              src={char.imageUrl}
              fetchPriority="high"
              className="relative p-1 rounded-full"
              width={28}
              alt={char.name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
