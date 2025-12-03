import { Search } from "lucide-react";

function Header({ headline }: { headline: string }) {
  return (
    <header className="flex items-center justify-between w-full">
      <h1 className="text-2xl lg:text-3xl font-bold">{headline}</h1>
      <div className="flex items-center gap-2 lg:gap-5">
        <span className="flex items-center gap-2 px-3 py-2 bg-system-white dark:bg-system-black text-sm rounded-full">
          <Search className="text-zinc-400 w-5" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-28 lg:w-52"
          />
        </span>

        <div className="flex items-center gap-2">
          <img
            src="/assets/images/profile.png"
            alt="profile"
            className="w-9 rounded-full border-3 border-system-white"
          />
          <p className="font-bold lg:flex hidden">Mary Jane</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
