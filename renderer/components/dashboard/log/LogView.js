import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";

export default function LogView() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const listener = (event, logs = []) => {
      setLogs(logs);
    };

    ipcRenderer.on("onLogsUpdate", listener);

    return () => {
      ipcRenderer.removeListener("onLogsUpdate", listener);
    };
  }, [JSON.stringify(logs)]);

  useEffect(() => {
    ipcRenderer.send("getLogs");
  }, []);

  const onClear = () => {
    ipcRenderer.send("clearLogs");
    setLogs([]);
  };

  return (
    <div className="mt-auto d-flex flex-column h-100">
      <div className="mt-auto">
        {logs.map((log, i) => (
          <div key={i} className="p-3 mb-2 align-self-end">
            {log}
          </div>
        ))}
      </div>
      <button
        bsStyle="primary"
        bsSize="large"
        onClick={onClear}
        className="mt-3"
      >
        Clear
      </button>
    </div>
  );
}
