import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { fetchUserData } from '../../api/user.api'
import { useUser } from '../../hooks/use-user'

export const Route = createFileRoute('/user/$tag')({
  loader: async ({ params }) => await fetchUserData(params.tag),
  component: RouteComponent,
})

function RouteComponent() {
  const initalData = Route.useLoaderData();
  const { tag } = Route.useParams()
  
  return <div>Hello {initalData?.displayName}</div>
}