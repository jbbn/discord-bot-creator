import {
  ChatAlt2Icon,
  LightningBoltIcon,
  TerminalIcon,
  CogIcon,
} from "@heroicons/react/solid";
import { useDashboardContext } from "../DashboardContext";

type Props = {
  name: string;
  className?: string;
};

export default function SidebarItem({ name, className }: Props) {
  const setMode = (mode) => () => updateMode(mode);
  const { updateMode, mode } = useDashboardContext();
  let Icon;

  switch (name) {
    case "command":
      Icon = ChatAlt2Icon;
      break;
    case "event":
      Icon = LightningBoltIcon;
      break;
    case "logs":
      Icon = TerminalIcon;
      break;
    case "settings":
      Icon = CogIcon;
      break;
    default:
      throw new Error("Invalid sidebar item name");
  }

  return (
    <div
      className={className + " " + mode === name ? "active" : ""}
      onClick={setMode(name)}
    >
      <Icon className="text-gray-500 transition cursor-pointer w-7 h-7 hover:text-blue-800" />
    </div>
  );
}
