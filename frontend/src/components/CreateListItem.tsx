import type { Identifier, XYCoord } from "dnd-core";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { usePreview } from "react-dnd-multi-backend";
import Box from "@mui/material/Box";

const MyPreview = () => {
  const preview = usePreview();
  if (!preview.display) {
    return null;
  }
  const { ref, item, style } = preview;
  const newStyle = { ...style, left: style.left || 0 + 100 };
  const itemData = item as DragItem;
  return (
    <Box ref={ref} sx={newStyle}>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <Icon>drag_indicator</Icon>
          </ListItemIcon>
          <ListItemText primary={itemData.text} />
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

interface DragItem {
  index: number;
  id: string;
  type: string;
  text: string;
}

const LIST_TYPE = "ListItem";

const CreateListItem = ({
  text,
  deleteItem,
  moveItem,
  idx,
}: {
  text: string;
  deleteItem: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  idx: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: LIST_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = idx;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: LIST_TYPE,
    item: () => {
      return { id: idx, index: idx, text };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));
  return (
    <>
      <div ref={ref} data-handler-id={handlerId}>
        <ListItem
          sx={{ opacity }}
          disablePadding
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
              <Icon>delete</Icon>
            </IconButton>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <Icon>drag_indicator</Icon>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </div>
      <MyPreview />
    </>
  );
};

export default CreateListItem;
