import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Logo from "@/assets/images/brand/logo.svg?react";
import type { SlippiUser } from "../../api/types";
import { SearchIcon, UserIcon } from "@/assets/icons";
import { normalizeTagInput, validateTag } from "@/utils/tag";

interface UserHeaderProps {
  user: SlippiUser | undefined;
  region?: string;
}

export const UserHeader = ({ user, region }: UserHeaderProps) => {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      return;
    }

    if (!query) {
      setSearchOpen(false);
      setError("");
      return;
    }

    if (!validateTag(query)) {
      setError("Invalid tag");
      return;
    }

    setError("");
    navigate({
      to: "/user/$tag",
      params: { tag: query.replace("#", "-") },
      search: { trail: "reset" } as any,
    });
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <div>
      <div className="flex w-full justify-between p-4 items-center">
        <Link to="/">
          <Logo className="w-16 h-auto" aria-label="Rate My Slippi" />
        </Link>

        <div className="text-white flex gap-3 items-center">
          {searchOpen && (
            <input
              type="text"
              value={query}
              placeholder="TAG#000"
              className="tracking-wide text-3xl outline-none w-28 bg-red text-center px-2 rounded"
              onChange={(e) => {
                const v = normalizeTagInput(e.target.value);
                setQuery(v);
                if (error) setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
          )}

          {error ? <div className="text-red text-sm">{error}</div> : null}

          <button type="button" onClick={submit} aria-label="Search">
            <SearchIcon className="w-8 h-8" />
          </button>

          <UserIcon className="w-8 h-8" />
        </div>
      </div>

      <div className="bg-red py-2 px-6 flex flex-col justify-between text-white">
        <div className="flex gap-2 items-center text-3xl font-sans">
          <h2>
            {region && (<>{region} •</>)} {user?.displayName}
          </h2>
        </div>
      </div>
    </div>
  );
};
