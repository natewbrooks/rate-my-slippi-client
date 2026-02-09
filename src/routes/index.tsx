import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logo from "../../public/brand/textLogo.svg";
import { Icon } from "@iconify/react";
import { validateTag, normalizeTagInput } from "../utils/tag";
import { useRouter } from "@tanstack/react-router";
import { ArrowIcon } from "@/assets/icons";
import { SlidingTabs } from "@/components/home/tabs";

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
          <Icon icon="stash:sun-solid" className="w-8 h-8" />
          <Icon icon="mingcute:user-4-fill" className="w-8 h-8" />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <img src={logo} width={180} fetchPriority="high" />
      </div>

      <div className="flex flex-col -space-y-1">
        <h3 className="text-white/20 text-3xl tracking-wider">
          Enter a <span className="text-green">slippi</span> player tag:
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isValid) return;

            router.navigate({
              to: "/user/$tag",
              params: { tag: tag.replace("#", "-") },
            });
          }}
          className="flex items-center justify-center"
        >
          <input
            value={tag}
            onChange={(e) => setTag(normalizeTagInput(e.target.value))}
            className="bg-darkest w-full text-8xl placeholder:text-white/20 text-white px-4 h-18 flex-1 rounded-l-2xl outline-none"
            placeholder="TAG#000"
          />
          <button
            type="submit"
            disabled={!isValid}
            className={`w-fit px-5 h-full disabled:opacity-50 rounded-r-2xl group transition-colors duration-300 bg-red ${
              isValid ? "cursor-pointer hover:bg-green hover:opacity-90" : " "
            }`}
          >
            <ArrowIcon
              className={`w-12 h-14 rotate-270 transition-colors duration-300 ${
                isValid ? " text-white group-hover:text-darkest" : "text-white/50"
              }`}
            />
          </button>
        </form>

        {tag.length > 0 && !validateTag(tag) ? (
          <div className="text-red text-2xl">Invalid tag</div>
        ) : null}
      </div>

      <SlidingTabs />

      <div className="w-full h-full bg-darkest rounded-2xl"> </div>
    </div>
  );
}
