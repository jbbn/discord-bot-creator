import { useDashboardContext } from "../DashboardContext";
export default function SidebarErrors() {
  const { errors } = useDashboardContext();

  const errorCount = errors.filter((e) => e.handlerIndex === i).length;
  if (errorCount) {
    return (
      <div className="px-2 py-0 bg-red-500 rounded-lg badge">{errorCount}</div>
    );
  } else {
    return null;
  }
}
