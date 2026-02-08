import { queryOptions } from "@tanstack/react-query"
import type { SlippiUser } from "./types"

export const fetchUserData = async (tag: string): Promise<SlippiUser> => {
  console.info(`Fetching user with id ${tag}`)
  const response = await fetch(`/api/user/${tag}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  const data = await response.json();
  return data;
}

export const userQueryOptions = (tag: string) => queryOptions ({
  queryKey: ['user', tag],
  queryFn: () => fetchUserData(tag),
  enabled: !!tag,
  staleTime: 60_000 // invalidate every 60s
})