import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  AppointmentCountLineGraph,
  ServicesUsedBarGraph,
  TodayAppointmentDoughnutGraph,
} from "../../components/Graphs";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Menu, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { IDoctor } from "../../@types/interface";
import { BACKEND_DOMAIN } from "../../configs/config";
import dayjs from "dayjs";

function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <main className="bg-off-white dark:bg-off-black dark:text-zinc-50 font-manrope h-screen w-full flex gap-3">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        page="dashboard"
      />

      <div className="w-full h-full flex flex-col gap-4 lg:ml-58 p-5 pb-0">
        <div className="flex items-center gap-1 w-full">
          <Menu
            onClick={() => setOpenSidebar(true)}
            className="text-zinc-500 cursor-pointer w-7 visible lg:hidden"
          />
          <Header headline="Dashboard" />
        </div>
        <div className="flex flex-col lg:flex-row gap-3 overflow-y-auto no-scrollbar h-auto">
          <div className="flex flex-col gap-3 w-full lg:w-2/3">
            <Overview />
            <AppointmentsOverview />
            <ServicesAvailed />
          </div>
          <div className="w-full lg:w-1/3 gap-3 flex flex-col h-full mb-5">
            <Services />
            <Doctors />
          </div>
        </div>
      </div>
    </main>
  );
}

function Overview() {
  const [filter, setFilter] = useState("W");

  return (
    <div className="w-full flex flex-col lg:flex-row gap-3">
      <section className="bg-system-white dark:bg-system-black rounded-2xl w-full lg:w-auto h-full p-3 flex flex-col shadow-sm">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Today's Appointments</h2>
          <button title="Refresh">
            <RefreshCcw className="text-zinc-400 w-5 cursor-pointer transition-colors duration-150 ease-in-out hover:text-zinc-700" />
          </button>
        </header>
        <TodayAppointmentDoughnutGraph />
        <p className="text-sm text-zinc-500">Cancelled: 8</p>
      </section>

      <section className="bg-system-white dark:bg-system-black rounded-2xl w-full h-full p-3 flex flex-col shadow-sm">
        <header className="flex items-center justify-between w-full mb-1.5">
          <h2 className="text-lg font-bold">Overview</h2>

          <aside className="flex items-center gap-3 ">
            <button title="Refresh">
              <RefreshCcw className="text-zinc-400 w-5 cursor-pointer transition-colors duration-150 ease-in-out hover:text-zinc-700" />
            </button>
            <FilterButton filter={filter} setFilter={setFilter} />
          </aside>
        </header>

        <div className="flex items-center justify-between w-full h-full gap-3 bg-[#F6F6F6] dark:bg-off-black p-1.5 rounded-4xl shadow-[inset_0_1px_4px_rgba(0,0,0,0.12)]">
          <section className="bg-system-white dark:bg-system-black rounded-3xl w-full h-full p-3 flex flex-col justify-center items-center shadow-sm">
            <header className="flex items-center gap-2 font-bold text-zinc-600 mb-1">
              <h3>Patients</h3>
            </header>

            <div className="flex flex-col lg:flex-row items-center lg:gap-3.5">
              <b className="text-5xl text-zinc-950 dark:text-zinc-50">18</b>
              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-orange-500 font-medium bg-orange-500/20 border border-orange-500 rounded-lg flex items-center w-fit px-2 text-sm">
                  <ArrowDown className="w-4" />
                  75.8%
                </span>

                <p className="text-xs text-zinc-500">
                  vs last{" "}
                  {filter === "W" ? "week" : filter === "M" ? "month" : "year"}
                </p>
              </div>
            </div>
          </section>

          <section className="w-full h-full flex justify-center items-center flex-col">
            <header className="flex items-center gap-2 font-bold text-zinc-600 mb-1">
              <h3 className="text-center">Completed Appointments</h3>
            </header>
            <div className="flex flex-col lg:flex-row items-center lg:gap-3.5">
              <b className="text-5xl text-zinc-950 dark:text-zinc-50">47</b>
              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-green-500 font-medium bg-green-500/20 border border-green-500 rounded-lg flex items-center w-fit px-2 text-sm">
                  <ArrowUp className="w-4" />
                  9.2%
                </span>

                <p className="text-xs text-zinc-500">
                  vs last{" "}
                  {filter === "W" ? "week" : filter === "M" ? "month" : "year"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function AppointmentsOverview() {
  const [filter, setFilter] = useState("W");

  return (
    <section className="bg-system-white dark:bg-system-black rounded-2xl w-full p-3 flex flex-col shadow-sm">
      <header className="flex items-center justify-between w-full">
        <h2 className="text-lg font-bold">Appointment Status Trends</h2>

        <aside className="flex items-center gap-3 ">
          <button title="Refresh">
            <RefreshCcw className="text-zinc-400 w-5 cursor-pointer transition-colors duration-150 ease-in-out hover:text-zinc-700" />
          </button>
          <FilterButton filter={filter} setFilter={setFilter} />
        </aside>
      </header>
      <AppointmentCountLineGraph />
    </section>
  );
}

function ServicesAvailed() {
  const [filter, setFilter] = useState("W");

  return (
    <section className="bg-system-white dark:bg-system-black rounded-2xl w-full p-3 flex flex-col shadow-sm">
      <header className="flex items-center justify-between w-full mb-1">
        <h2 className="text-lg font-bold">Services Availed Report</h2>

        <aside className="flex items-center gap-3 ">
          <button title="Refresh">
            <RefreshCcw className="text-zinc-400 w-5 cursor-pointer transition-colors duration-150 ease-in-out hover:text-zinc-700" />
          </button>
          <FilterButton filter={filter} setFilter={setFilter} />
        </aside>
      </header>
      <div className="w-full flex flex-col lg:flex-row gap-2 items-center overflow-x-auto">
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-0">
          <b className="text-4xl lg:text-7xl text-zinc-950 dark:text-zinc-50">
            <span className="text-zinc-700 dark:text-zinc-400 text-2xl lg:text-5xl">
              ₱
            </span>
            8.2k
          </b>
          <div className="flex gap-1.5 items-center">
            <span className="text-green-500 font-medium bg-green-500/20 border border-green-500 rounded-lg flex items-center w-fit px-2 text-xs lg:text-sm">
              <ArrowUp className="w-3 lg:w-4" />
              13.8%
            </span>

            <p className="text-xs text-zinc-500">
              vs last{" "}
              {filter === "W" ? "week" : filter === "M" ? "month" : "year"}
            </p>
          </div>
        </div>
        <ServicesUsedBarGraph />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-system-white dark:bg-system-black rounded-2xl w-full p-3 flex flex-col shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Popular Services</h2>
        <Link
          to="/services"
          className="text-sm px-2 py-0.5 border border-zinc-400 text-zinc-500 rounded-lg"
        >
          View All
        </Link>
      </header>

      <ul className="flex flex-col gap-3 mt-3.5">
        <li className="flex items-center justify-between ">
          <div className="flex gap-3">
            <img
              src="/assets/images/consultation.jpg"
              alt="consultation"
              className="w-14 h-14 rounded-xl border border-zinc-300"
            />
            <aside>
              <h3 className="font-bold">Consultation</h3>
              <p className="text-green-500 text-xs px-1.5 py-0.5 bg-green-200/30 border border-green-500 w-fit rounded-lg">
                Available
              </p>
            </aside>
          </div>

          <p>₱150.00</p>
        </li>
        <li className="flex items-center justify-between ">
          <div className="flex gap-3">
            <img
              src="/assets/images/certificate.jpg"
              alt="certificate"
              className="w-14 h-14 rounded-xl border border-zinc-300"
            />
            <aside>
              <h3 className="font-bold">Medical Certificate</h3>
              <p className="text-green-500 text-xs px-1.5 py-0.5 bg-green-200/30 border border-green-500 w-fit rounded-lg">
                Available
              </p>
            </aside>
          </div>

          <p>₱180.00</p>
        </li>
        <li className="flex items-center justify-between ">
          <div className="flex gap-3">
            <img
              src="/assets/images/checkup.jpg"
              alt="checkup"
              className="w-14 h-14 rounded-xl border border-zinc-300"
            />
            <aside>
              <h3 className="font-bold">Medical Check Up</h3>
              <p className="text-green-500 text-xs px-1.5 py-0.5 bg-green-200/30 border border-green-500 w-fit rounded-lg">
                Available
              </p>
            </aside>
          </div>

          <p>₱100.00</p>
        </li>
        <li className="flex items-center justify-between ">
          <div className="flex gap-3">
            <img
              src="/assets/images/vaccination.jpg"
              alt="vaccination"
              className="w-14 h-14 rounded-xl border border-zinc-300"
            />
            <aside>
              <h3 className="font-bold">Vaccination</h3>
              <p className="text-orange-500 text-xs px-1.5 py-0.5 bg-orange-200/30 border border-orange-500 w-fit rounded-lg">
                Unavailable
              </p>
            </aside>
          </div>

          <p>₱280.00</p>
        </li>
        <li className="flex items-center justify-between ">
          <div className="flex gap-3">
            <img
              src="/assets/images/prenatal.jpg"
              alt="consultation"
              className="w-14 h-14 rounded-xl border border-zinc-300"
            />
            <aside>
              <h3 className="font-bold">Prenatal Check Up</h3>
              <p className="text-green-500 text-xs px-1.5 py-0.5 bg-green-200/30 border border-green-500 w-fit rounded-lg">
                Available
              </p>
            </aside>
          </div>

          <p>₱230.00</p>
        </li>
      </ul>
    </section>
  );
}

function Doctors() {
  const [data, setData] = useState<IDoctor[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_DOMAIN}/api/v1/doctors`, {
          withCredentials: true,
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-system-white dark:bg-system-black rounded-2xl w-full p-3 flex flex-col shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Doctors</h2>
        <Link
          to="/doctors"
          className="text-sm px-2 py-0.5 border border-zinc-400 text-zinc-500 rounded-lg"
        >
          View All
        </Link>
      </header>

      <ul className="flex flex-col gap-3 mt-3.5">
        {data.map((doctor, i) => (
          <li key={i} className="flex items-center justify-between ">
            <div className="flex gap-3">
              <img
                src="/assets/images/profile-doctor.jpg"
                alt="consultation"
                className="w-14 h-14 rounded-xl border border-zinc-300"
              />
              <aside>
                <h3 className="font-bold">{doctor.name}</h3>
                <p className="text-green-500 text-xs px-1.5 py-0.5 bg-green-200/30 border border-green-500 w-fit rounded-lg">
                  {doctor.specialization}
                </p>
              </aside>
            </div>

            <p className="whitespace-normal text-sm w-16">
              {dayjs(doctor.schedule).format("MM/DD/YY, hh:mm:ss")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FilterButton({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className="flex items-center gap-3 bg-[#F6F6F6] dark:bg-off-black p-0.5 text-sm rounded-lg text-zinc-400 shadow-[inset_0_1px_4px_rgba(0,0,0,0.12)]
          "
    >
      <button
        title="Weekly"
        onClick={() => setFilter("W")}
        className={`px-3 py-1 rounded-lg cursor-pointer ${
          filter === "W"
            ? "bg-system-white dark:bg-system-black text-zinc-950 dark:text-zinc-50 shadow-sm"
            : ""
        }`}
      >
        W
      </button>
      <button
        title="Monthly"
        onClick={() => setFilter("M")}
        className={`px-3 py-1 rounded-lg cursor-pointer ${
          filter === "M"
            ? "bg-system-white dark:bg-system-black text-zinc-950 dark:text-zinc-50 shadow-sm"
            : ""
        }`}
      >
        M
      </button>
      <button
        title="Yearly"
        onClick={() => setFilter("Y")}
        className={`px-3 py-1 rounded-lg cursor-pointer ${
          filter === "Y"
            ? "bg-system-white dark:bg-system-black text-zinc-950 dark:text-zinc-50 shadow-sm"
            : ""
        }`}
      >
        Y
      </button>
    </div>
  );
}

export default Dashboard;
