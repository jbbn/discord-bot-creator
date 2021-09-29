import { ipcRenderer } from "electron";
import useSettings from "../../../lib/useSettings";

export default function SettingsModal(props) {
  const [settings, setSettings] = useSettings();
  let checked = false;

  if (settings?.checked) {
    if (settings.checked === "false") {
      checked = false;
    } else {
      checked = true;
    }
  }

  const changePrefix = (e) => {
    setSettings({ ...settings, prefix: e.target.value });
  };

  const changeToken = (e) => {
    setSettings({ ...settings, token: e.target.value });
  };

  const saveSettings = () => {
    ipcRenderer.send("saveSettings", settings);
    ipcRenderer.on("saveSettings", (event, data) => {
      props.onHide();
    });
  };

  return (
    <div
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div closebutton>
        <div id="contained-modal-title-vcenter">Settings</div>
      </div>
      <div style={{ maxHeight: "80vh" }} className="overflow-auto">
        <form>
          <div className="mb-3">
            <div>Prefix</div>
            <input type="text" onChange={changePrefix} value={settings?.tag} />
          </div>
          <div className="mb-3">
            <div>Token</div>
            <input
              type="text"
              value={settings?.token || ""}
              onChange={changeToken}
              placeholder="e.g.: NzI3ODcyOTg0NTc1OTAxNzg2.XvyKig.4eiNtg8CGOkT1Www5sRngSLSJ30"
            />
            <div>
              Get your token from the{" "}
              <a
                target="_blank"
                href="https://discord.com/developers/applications/"
              >
                bot dashboard
              </a>
            </div>
          </div>
          <div className="mb-3">
            <div>Separator</div>
            <input
              type="text"
              value={settings?.separator || ""}
              onChange={changeToken}
              placeholder="\\s+"
            />
            <div>
              <a
                target="_blank"
                href="https://discord.com/developers/applications/"
              ></a>
            </div>
          </div>
          <input
            type="switch"
            label="Run Bot on Save"
            checked={!!settings?.autoRestart}
            onChange={(e) =>
              setSettings({ ...settings, autoRestart: e.target.checked })
            }
            className="mb-3"
          />
          <input
            type="switch"
            label="Case Sensitive"
            checked={settings?.checked === "true" || false}
            onChange={(e) =>
              setSettings({
                ...settings,
                settings: e.target.checked ? "true" : "false",
              })
            }
            className="mb-3"
          />
          <input
            type="switch"
            label="Toggle Hints"
            checked={settings?.toggleHints !== false}
            onChange={(e) =>
              setSettings({ ...settings, toggleHints: e.target.checked })
            }
            className="mb-3"
          />
        </form>
      </div>
      <div className="flex-row d-flex justify-content-between">
        <button onClick={props.onHide}>Close</button>
        <button onClick={saveSettings} variant="success" className="mt-3">
          Save
        </button>
      </div>
    </div>
  );
}
