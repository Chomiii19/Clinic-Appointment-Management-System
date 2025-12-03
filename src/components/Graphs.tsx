import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDarkMode } from "../hooks/useDarkMode";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function AppointmentCountLineGraph() {
  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const labels = weeks;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Completed",
        data: [65, 48, 80, 21, 56, 55, 14],
        borderColor: "#458dfc",
        backgroundColor: "#458dfc",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#458dfc",
      },
      {
        label: "Cancelled",
        data: [18, 7, 31, 5, 0, 11, 21],
        borderColor: "#FF5733",
        backgroundColor: "#FF5733",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#FF5733",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { beginAtZero: true, maxTicksLimit: 5 },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Appointment Count",
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Line data={data} options={options} />
    </div>
  );
}

export function TodayAppointmentDoughnutGraph() {
  const { darkMode } = useDarkMode();

  const data = {
    labels: ["Completed", "Ongoing"],
    datasets: [
      {
        label: "Count",
        data: [21, 13],
        backgroundColor: ["#458dfc", "#FF5733"],
        hoverOffset: 4,
        borderWidth: 3,
        borderColor: darkMode ? "#272629" : "#fdfdfd",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    cutout: "80%",
  };

  return (
    <div className="w-full relative">
      <p
        className="absolute top-[60%] left-[51%] -translate-x-1/2 -translate-y-1/2
                    text-xl font-bold text-primary"
      >
        58%
      </p>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export function ServicesUsedBarGraph() {
  const data = {
    labels: [
      "Consult",
      "Lab",
      "Check Up",
      "Vaccine",
      "Holistic",
      "Prenatal",
      "Medical Cert",
      "Circumcision",
      "Fam Plan",
    ],
    datasets: [
      {
        label: "Count",
        data: [31, 21, 10, 5, 48, 28, 8, 3, 42],
        backgroundColor: "#D1D5DB",
        borderRadius: 10,
        hoverBackgroundColor: "#458dfc",
        borderSkipped: false,
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Services Availed",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: true },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
