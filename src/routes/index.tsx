import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { validateTag } from "@/utils/tag";
import { useRouter } from "@tanstack/react-router";
import { SunIcon, UserIcon } from "@/assets/icons";
import { SlidingTabs } from "@/components/home/tabs";
import TextLogo from "@/assets/images/brand/textLogo.svg?react"
import PlayerSearch from "@/components/ui/player-search";
import { HomeFooter } from "@/components/home/footer";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [tag, setTag] = useState<string>("");

  const router = useRouter();
  const isValid = !!validateTag(tag);

  return (
    <div className="flex flex-col space-y-4 w-full h-full p-6 bg-dark">
      <div className="flex justify-end items-center w-full">
        <div className="text-white flex gap-3">
          <SunIcon className="w-8 h-8" />
          <UserIcon className="w-8 h-8" />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <TextLogo className="w-48 h-auto" aria-label="Rate My Slippi"/>
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

      <SlidingTabs />

      <div className="w-full h-full bg-darkest rounded-2xl"> </div>
      <HomeFooter/>
    </div>
  );
}
