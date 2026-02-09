import { useQuery } from '@tanstack/react-query'
import { createFileRoute, type LoaderFnContext } from '@tanstack/react-router'
import { userQueryOptions } from '../../api/user.api'
import { UserHeader } from '../../components/user/header'
import { UserBanner } from '../../components/user/banner'

export const Route = createFileRoute('/user/$tag')({
  loader: async ({ params, context }) => {
    // This fetches AND caches the data in React Query
    // @ts-expect-error
    await context.queryClient.ensureQueryData(userQueryOptions(params.tag))
  },
  errorComponent: ({ error }) => {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-600">Error loading user</h1>
        <p>{error.message}</p>
      </div>
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { tag } = Route.useParams()
  const { data, error } = useQuery(userQueryOptions(tag))

  const shortContinent = (cntnt: string) => {
    switch (cntnt) {
      case "NORTH_AMERICA": 
        return "NA";
    }
  }

  const continent = shortContinent(data?.rankedProfile?.continent || "");

  
  return (
    <div>
      <UserHeader user={data} region={continent} />
      <div className='py-2'>
        <UserBanner user={data}/>
      </div>
    </div>
  )
}