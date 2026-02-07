import { useQuery } from "@tanstack/react-query";

export type SlippiUser = {
  displayName: string;
  connectCode: string;
  fbUid: string | null;
  status: string | null;
}

export const fetchUserData = async (tag: string): Promise<SlippiUser> => {
  console.info(`Fetching user with id ${tag}`)
  const response = await fetch(`/api/user/${tag}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  const data = await response.json();
  return data;
}

export const userQueryOptions = (tag: string) => useQuery ({
  queryKey: ['user', tag],
  queryFn: () => fetchUserData(tag),
})