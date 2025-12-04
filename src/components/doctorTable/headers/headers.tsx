import {
  CalendarPlus2,
  ClipboardClock,
  GraduationCap,
  ShieldUser,
  Wand,
} from "lucide-react";
import { statusOption } from "../data";

export const tableHeaders = [
  {
    name: "Doctor Name",
    icon: <ShieldUser className="w-4" />,
    filter: false,
    singleValue: false,
    options: [],
    sortable: true,
  },
  {
    name: "Specialization",
    icon: <GraduationCap className="w-4" />,
    filter: true,
    singleValue: true,
    options: [{ value: "", label: "" }],
    sortable: true,
  },
  {
    name: "Available Schedule",
    icon: <ClipboardClock className="w-4" />,
    filter: true,
    singleValue: true,
    options: [{ value: "", label: "" }],
    sortable: true,
  },
  {
    name: "Joined At",
    icon: <CalendarPlus2 className="w-4" />,
    filter: true,
    singleValue: false,
    options: statusOption,
    sortable: true,
  },
  {
    name: "Action",
    icon: <Wand className="w-4" />,
    filter: false,
    singleValue: false,
    options: [{ value: "", label: "" }],
    sortable: false,
  },
];
