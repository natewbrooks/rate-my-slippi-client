import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "../../public/brand/textLogo.svg";
import { Icon } from "@iconify/react";
import upArrow from "../../public/upArrow.svg";
import { validateTag, normalizeTagInput } from "../utils/tag";
import { useRouter } from "@tanstack/react-router";
import { HomeFooter } from "../components/home.tsx/footer";


export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [tag, setTag] = useState<string>("");

  const router = useRouter();
  const isValid = !!validateTag(tag);

  return (
    <div className="flex flex-col justify-center w-full h-full p-6 bg-dark">
      <div className="flex justify-end items-center w-full">
        <div className="text-white flex gap-3">
          <Icon icon="stash:sun-solid" className="w-8 h-8" />
          <Icon icon="mingcute:user-4-fill" className="w-8 h-8" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img src={logo} width={150} />
      </div>
      <div className="flex flex-col -space-y-1">
        <h3 className="text-white/20 text-3xl tracking-wide">
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
          className="bg-darkest w-full text-8xl text-white/20 px-4 flex-1"
          placeholder="TAG#000"
        />

        <button
          type="submit"
          disabled={!isValid}
          className="w-fit p-4 h-full bg-red disabled:opacity-50"
        >
          <img src={upArrow} width={42} className="rotate-90 text-white" />
        </button>
      </form>

        {tag.length > 0 && !validateTag(tag) ? (
          <div className="text-red mt-2">Invalid tag</div>
        ) : null}
      </div>
    </div>
  );
}