import { validateTag, normalizeTagInput } from "@/utils/tag";
import { ArrowIcon } from "@/assets/icons";


export default function PlayerSearch({
  tag,
  setTag,
  isValid,
  onSubmit,
}: {
  tag: string;
  setTag: (v: string) => void;
  isValid: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-col -space-y-1">
      <h3 className="text-white/20 text-3xl tracking-wider">
        Enter a <span className="text-green">slippi</span> player tag:
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isValid) return;
          onSubmit();
        }}
        className="flex items-center justify-center"
      >
        <input
          value={tag}
          onChange={(e) => setTag(normalizeTagInput(e.target.value))}
          className="bg-darkest tracking-wide w-full text-[80px] placeholder:text-white/20 text-white px-4 h-18 flex-1 rounded-l-2xl outline-none"
          placeholder="TAG#000"
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`w-fit p-4 h-full disabled:opacity-50 rounded-r-2xl group transition-colors duration-300 bg-red ${
            isValid ? "cursor-pointer hover:bg-green hover:opacity-90" : " "
          }`}
        >
          <ArrowIcon
            className={`w-10 h-10 rotate-270 transition-colors duration-300 ${
              isValid
                ? " text-white group-hover:text-darkest"
                : "text-white/50"
            }`}
          />
        </button>
      </form>

      {tag.length > 0 && !validateTag(tag) ? (
        <div className="text-red text-2xl">Invalid tag</div>
      ) : null}
    </div>
  );
}