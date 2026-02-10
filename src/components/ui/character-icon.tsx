import { Tooltip } from './tooltip'
import type { CharacterData } from '@/api/types'

interface CharacterIconProps {
    character: CharacterData
}

export const CharacterIcon = ({ character }: CharacterIconProps) => {
  return (
    <Tooltip
        key={`char-${character.name}`}
        label={
            <div className="flex flex-col leading-4 items-center">
            <span>
                {character.gameCount} {character.gameCount === 1 ? "game" : "games"}
            </span>
            <span>{character.percentage}%</span>
            </div>
        }
        side="top"
        >
        <div className="relative w-7 h-7">
            <svg className="absolute inset-0 -rotate-90 scale-110" viewBox="0 0 36 36">
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
                strokeDasharray={`${character.percentage} 100`}
                className="text-green"
                strokeLinecap="round"
            />
            </svg>

            <img
            src={character.imageUrl}
            className="relative p-1 rounded-full w-full h-full"
            width={28}
            height={28}
            alt={character.name}
            />
        </div>
    </Tooltip>
  )
}
