import { useState } from "react";
import SidebarBotControls from "./SidebarBotControls";
import SettingsModal from "../settings/SettingsModal";
import { useDashboardContext } from "../DashboardContext";
import {
  ChatAlt2Icon,
  LightningBoltIcon,
  TerminalIcon,
  CogIcon,
} from "@heroicons/react/solid";

export default function Sidebar({ selected, setSelected }) {
  const [settingsShow, setSettingsShow] = useState(false);
  const {
    errors,
    updateMode,
    mode,
    handlers,
    commands,
    events,
    updateHandlerIndex,
    handlerIndex,
    addHandler,
  } = useDashboardContext();

  const setMode = (mode) => () => updateMode(mode);

  return (
    <>
      <div className="flex flex-row h-screen px-0 sidebar">
        <div className="navbar align-items-start nowrap">
          <div
            className={mode === "command" ? "active" : ""}
            onClick={setMode("command")}
          >
            <ChatAlt2Icon className="w-6 h-6" />
          </div>
          <div
            className={mode === "event" ? "active" : ""}
            onClick={setMode("event")}
          >
            <LightningBoltIcon />
          </div>
          <div
            className={mode === "logs" ? "active" : ""}
            onClick={setMode("logs")}
          >
            <TerminalIcon />
          </div>
          <div onClick={() => setSettingsShow(true)} className="mt-auto">
            <CogIcon />
          </div>
        </div>
        <div className="flex flex-col h-screen max-h-screen px-0">
          <div className="px-2">
            <div variant="pills" className="flex-column d-md-block d-none">
              {handlers.map((d, i) => (
                <div key={d?.name + "-" + i}>
                  <div
                    eventKey={"nav-link-" + d?.name + "-" + i}
                    active={handlerIndex === i}
                    onClick={() => updateHandlerIndex(i)}
                    className="flex flex-row items-center justify-between mb-2"
                  >
                    <span>{d?.name}</span>
                    {errors.filter((e) => e.handlerIndex === i).length ? (
                      <div bg="danger" text="light">
                        {errors.filter((e) => e.handlerIndex === i).length}
                      </div>
                    ) : null}
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
      </div>
      <SettingsModal
        show={settingsShow}
        onHide={() => setSettingsShow(false)}
      />
    </>
  );
}
