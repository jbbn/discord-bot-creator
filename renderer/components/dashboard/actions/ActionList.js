import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDashboardContext } from "../DashboardContext";
import ActionDropdown from "./ActionDropdown";
import ActionItem from "./ActionListItem";

export default function ActionList({ Form: ActionForm }) {
  const { actions, addAction, reorderAction, action } = useDashboardContext();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    console.log(result.destination);

    console.log("Here");
    reorderAction(result.source.index, result.destination.index);
  };

  return (
    <div>
      <div className="mx-2 mb-3 command-form">
        <label>Actions</label>
        <br />
        <ActionDropdown
          name={action.name || ""}
          className="mb-4"
          create={true}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" ignoreContainerClipping={true}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {actions.map((action, i) => (
                  <Draggable
                    key={"key-" + action.name + "-" + i}
                    draggableId={action.name + "-" + i}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={i}
                        index={i}
                      >
                        <ActionItem action={action} index={i} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
