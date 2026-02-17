import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { validateTag } from "@/utils/tag";
import { useRouter } from "@tanstack/react-router";
import PlayerSearch from "@/components/ui/player-search";
import { userQueryOptions } from "../../api/user.api";
import { UserHeader } from "../../components/user/header";
import { UserBanner } from "../../components/user/banner";
import RouteHistory from "@/components/ui/route-history";
import { UserFooter } from "@/components/user/footer";

export const Route = createFileRoute("/user/$tag")({
  loader: async ({ params, context }) => {
    // This fetches AND caches the data in React Query
    // @ts-expect-error
    await context.queryClient.ensureQueryData(userQueryOptions(params.tag));
  },
  errorComponent: ({ error }) => {
    const [tag, setTag] = useState<string>("");
    const router = useRouter();
    const isValid = !!validateTag(tag);

    return (
      <div className="flex flex-col gap-4 p-6 text-white">
        <div>
          <h1 className="font-bold text-4xl text-red-600">Error loading user</h1>
          <p className="text-2xl text-white/80">{error.message}</p>
        </div>

        <PlayerSearch
          tag={tag}
          setTag={setTag}
          isValid={isValid}
          onSubmit={() => {
            router.navigate({
              to: "/user/$tag",
              params: { tag: tag.replace("#", "-") },
            });
          }}
        />
      </div>
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { tag } = Route.useParams();
  const { data } = useQuery(userQueryOptions(tag));

  const shortContinent = (cntnt: string) => {
    switch (cntnt) {
      case "NORTH_AMERICA":
        return "NA";
      default:
        return "";
    }
  };

  const continent = shortContinent(data?.rankedProfile?.continent || "");

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div>
        <UserHeader user={data} region={continent} />
        <RouteHistory/>
        <div className="py-2 ">
          <UserBanner user={data} />
        </div>
      </div>
      <UserFooter />
    </div>
  );
}
