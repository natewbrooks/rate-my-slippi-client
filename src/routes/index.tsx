import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "../../public/brand/textLogo.svg";
import { Icon } from "@iconify/react";
import upArrow from "../../public/upArrow.svg";
import { validateTag, normalizeTagInput } from "../utils/tag";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [tag, setTag] = useState<string>("");
  const [validated, setValidated] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validateTag(tag);
    setValidated(v);
    if (!v) return;
  };

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
      <div>
        <h3 className="text-white/20 text-2xl tracking-wide">
          Enter a <span className="text-green">slippi</span> player tag:
        </h3>
        <form className="flex items-center justify-center" onSubmit={onSubmit}>
          <input
            className="bg-darkest w-full text-8xl text-white placeholder:text-white/20 h-fit leading-0 px-4 flex-1 outline-none"
            placeholder="TAG#000"
            value={tag}
            onChange={(e) => setTag(normalizeTagInput(e.target.value))}
          />
          <Link
            to="/user/$tag"
            params={{ tag: tag.replace("#", "-") }}
            onClick={(e) => {
              if (!isValid) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className={cn(
              "w-fit p-4 h-full bg-red transition-opacity",
              !isValid && "opacity-50 pointer-events-none"
            )}
          >
            <img src={upArrow} width={42} className="rotate-90 text-white" />
          </Link>

        </form>
        {tag.length > 0 && !validateTag(tag) ? (
          <div className="text-red mt-2">Invalid tag</div>
        ) : null}
      </div>
    </div>
  );
}