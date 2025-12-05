import { Menu } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function ViewAccount() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <main className="bg-off-white dark:bg-off-black dark:text-zinc-50 font-manrope h-screen w-full flex gap-3 overflow-hidden">
      <Sidebar
        page=""
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div className="w-full h-screen flex flex-col gap-4 lg:ml-58 p-5 overflow-hidden">
        <div className="flex items-center gap-1 w-full">
          <Menu
            onClick={() => setOpenSidebar(true)}
            className="text-zinc-500 cursor-pointer w-7 visible lg:hidden"
          />
          <Header headline="Profile" />
        </div>
      </div>
    </main>
  );
}

export default ViewAccount;
