import { useQuery } from "@tanstack/react-query"
import { fetchUserData } from "../api/user.api"

export const useUser = (tag: string) => {
  return useQuery({
    queryKey: ['user', tag],
    queryFn: () => fetchUserData(tag),
  })
}