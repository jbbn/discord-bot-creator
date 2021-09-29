import Sidebar from "./sidebar/index";
import EventView from "./event/EventView";
import CommandView from "./command/CommandView";
import { useDashboardContext } from "./DashboardContext";
import ActionForm from "./actions/ActionForm";
import LogView from "./log/LogView";
import SettingsModal from "./settings/SettingsModal";

export default function DashboardWindow() {
  // Component Controls
  const { mode, handler, actionModalVisible, hideActionModal } =
    useDashboardContext();

  let isEvent = mode === "event";

  return (
    <div className="grid h-screen grid-cols-3 d-grid">
      <Sidebar />
      <div className="flex flex-col h-screen pt-4 overflow-auto">
        {(() => {
          switch (mode) {
            case "event":
              return <EventView event={handler} />;
            case "command":
              return <CommandView command={handler} />;
            case "logs":
              return <LogView />;
            case "settings":
              return <SettingsModal />;
          }
        })()}
        <ActionForm
          show={actionModalVisible}
          onHide={hideActionModal}
          isEvent={isEvent}
        />
      </div>
    </div>
  );
}
