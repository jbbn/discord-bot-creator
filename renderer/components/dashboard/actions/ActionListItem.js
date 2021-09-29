import { useDashboardContext } from "../DashboardContext";

const renderTooltip = (error) => (props) =>
  (
    <div id="button-tooltip" {...props}>
      {error}
    </div>
  );

export default function ActionItem({ action, index, onSelect }) {
  const {
    removeAction,
    updateActionIndex,
    showActionModal,
    handlerIndex,
    errors,
  } = useDashboardContext();

  const remove = (e) => {
    e.stopPropagation();
    removeAction(index);
  };

  const select = () => {
    updateActionIndex(index);
    showActionModal();
  };

  const error = errors.find((e) => {
    return e.handlerIndex === handlerIndex && e.actionIndex === index;
  });

  return (
    <div>
      <div
        className={
          "border p-2 my-2 mx-0 row align-items-center " +
          (error ? "border-danger" : "")
        }
        onSelect={() => onSelect(index)}
        style={{ cursor: "pointer", backgroundColor: "#35393f" }}
        onClick={select}
      >
        <p className="my-0 col">{action?.name}</p>
        <button className="btn-sm btn-danger btn-close" onClick={remove} />
      </div>
    </div>
  );
}
