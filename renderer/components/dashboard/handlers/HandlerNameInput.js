import { useDashboardContext } from "../DashboardContext";

export default function HandlerNameInput(props) {
  const { handler, updateHandler } = useDashboardContext();

  const update = (event) => {
    updateHandler({ name: event.target.value || "NewEvent" });
  };

  return (
    <label controlId="floatingInputGrid" label="Name">
      <input
        type="text"
        defaultValue={handler.name}
        onChange={update}
        onBlur={update}
      />
    </label>
  );
}
