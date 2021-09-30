import SidebarBotControls from "./SidebarBotControls";
import { useDashboardContext } from "../DashboardContext";
import SidebarItem from "./Item";
import SidebarErrors from "./errors";

export default function Sidebar({ selected }) {
  const {
    errors,
    handlers,
    commands,
    events,
    updateHandlerIndex,
    handlerIndex,
    addHandler,
  } = useDashboardContext();

  return (
    <>
      <div className="items-start navbar nowrap">
        {["command", "event", "logs", "settings"].map((name, index) => {
          return <SidebarItem key={name + index} name={name} />;
        })}
      </div>
      <div className="flex flex-col h-screen max-h-screen px-0">
        <div className="px-2">
          <div className="flex-column d-md-block d-none">
            {handlers.map((d, i) => (
              <div key={d?.name + "-" + i}>
                <div
                  eventKey={"nav-link-" + d?.name + "-" + i}
                  active={handlerIndex === i}
                  onClick={() => updateHandlerIndex(i)}
                  className="flex flex-row items-center justify-between mb-2"
                >
                  <span>{d?.name}</span>
                  <SidebarErrors />
                </div>
              </div>
            ))}
          </div>
          <div className="d-md-none">
            <select
              id="command"
              value={selected}
              onChange={(e) => updateHandlerIndex(e.target.value)}
            >
              {commands?.concat(events || []).map((c, i) => (
                <option
                  key={"select-" + c?.name + "-" + i}
                  onClick={() => updateHandlerIndex(i)}
                  value={i}
                >
                  {c?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <SidebarBotControls />
        </div>
        <div className="flex-row flex-wrap gap-2 d-flex justify-content-between align-items-center">
          <button onClick={() => addHandler()} variant="secondary">
            Add Command
          </button>
        </div>
      </div>
    </>
  );
}
