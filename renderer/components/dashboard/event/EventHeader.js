import { useDashboardContext } from "../DashboardContext";
import HandlerNameInput from "../handlers/HandlerNameInput";
import eventTypeOptions from "../../../lib/eventTypeOptions";

export default function EventHeader() {
  const { handler: event, updateHandler } = useDashboardContext();

  const onSelect = (e) => {
    updateHandler({ ["event-type"]: e.target.value });
  };

  const onChangeTemp = (e) => {
    updateHandler({ temp: e.target.value });
  };

  const onChangeTemp2 = (e) => {
    updateHandler({ temp2: e.target.value });
  };
  const option = eventTypeOptions[event?.["event-type"]];

  return (
    <div>
      <div sm="8" className="mx-2 command-form">
        <div>
          <div className="mb-4">
            <HandlerNameInput />
          </div>
          <div md="auto"></div>
        </div>
        <div>
          <div className="mb-3">
            <label>Trigger</label>
            <select value={event?.["event-type"]} onChange={onSelect}>
              <option value="0">None</option>
              <option value="1">Bot Initialization</option>
              <option value="2">Message Sent</option>
              <option value="3">On Interval</option>
              <option value="4">Bot Join Server</option>
              <option value="5">Bot Leave Server</option>
              <option value="6">Member Join Server</option>
              <option value="7">Member Leave Server</option>
              <option value="8">Channel Create</option>
              <option value="9">Channel Delete</option>
              <option value="10">Role Create</option>
              <option value="11">Role Delete</option>
              <option value="12">Member Banned</option>
              <option value="13">Member Unbanned</option>
              <option value="14">Voice Channel Create</option>
              <option value="15">Voice Channel Delete</option>
              <option value="16">Emoji Create</option>
              <option value="17">Emoji Delete</option>
              <option value="18">Message Deleted</option>
              <option value="19">Server Update</option>
              <option value="20">Member Update</option>
              <option value="21">Presence Update</option>
              <option value="22">Member Voice Update</option>
              <option value="23">Channel Update</option>
              <option value="24">Channel Pins Update</option>
              <option value="25">Role Update</option>
              <option value="26">Message Update</option>
              <option value="27">Emoji Update</option>
              <option value="28">Message Reaction Added</option>
              <option value="29">Message Reaction Removed</option>
              <option value="30">All Message Reactions Removed</option>
              <option value="31">Member Becomes Available</option>
              <option value="32">Member Chunck Received</option>
              <option value="33">Member Starts/Stops Speaking</option>
              <option value="34">Member Typing Starts</option>
              <option value="35">Member Typing Stops</option>
              <option value="36">Server Becomes Unavailable</option>
              <option value="37">On Bot Error</option>
              <option value="38">On Time Restricted Command</option>
            </select>
          </div>
          {option?.temp && (
            <div className="mb-3">
              <label>{option.tempLabel || "Temp Variable Name"}</label>
              <input type="text" value={event?.temp} onChange={onChangeTemp} />
              <p>{option.tempDescription || ""}</p>
            </div>
          )}
          {option?.temp2 && (
            <div className="mb-3">
              <label>{option.temp2Description}</label>
              <input
                type="text"
                value={event?.temp2}
                onChange={onChangeTemp2}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
