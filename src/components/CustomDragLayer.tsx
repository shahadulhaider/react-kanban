import { Card } from "components/Card";
import { Column } from "components/Columnm";
import { useDragLayer, XYCoord } from "react-dnd";
import { CustomDragLayerContainer } from "styles";

const getItemStyles = ({
  currentOffset,
}: {
  currentOffset: XYCoord | null;
}): React.CSSProperties => {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
};

const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles({ currentOffset })}>
        {item.type === "COLUMN" ? (
          <Column
            id={item.id}
            text={item.text}
            index={item.index}
            isPreview={true}
          />
        ) : (
          <Card
            columnId={item.columnId}
            index={0}
            isPreview={true}
            id={item.id}
            text={item.text}
          />
        )}
      </div>
    </CustomDragLayerContainer>
  ) : null;
};

export default CustomDragLayer;
