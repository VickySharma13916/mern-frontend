import { FaEdit } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

export const routes = [
  {
    key: "dashboard",
    name: "Dashboard",
    route: "/dashboard",
    icon: <MdSpaceDashboard size={20} />,
  },
  {
    key: "note",
    name: "Notes",
    route: "/notes",
    icon: <FaEdit size={20} />,
  },
];
