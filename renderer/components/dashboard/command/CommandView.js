import ActionForm from "../actions/ActionForm";
import ActionList from "../actions/ActionList";
import { useDashboardContext } from "../DashboardContext";
import CommandHeader from "./CommandHeader";

export default function CommandView() {
  const { handler } = useDashboardContext();

  return (
    <div>
      <CommandHeader command={handler} />
      <ActionList Form={ActionForm} />
    </div>
  );
}
