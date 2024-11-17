import { useDrag, useDrop } from "react-dnd";

// ItemTypes 정의
export const ItemTypes = {
  USER: 'user',
};

// useDrag 
export const useUserDrag = (user: any) => {
  return useDrag(() => ({
    type: ItemTypes.USER,
    item: { user },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
};

// useDrop 
export const useUserDrop = (onDrop: (user: any) => void) => {
  return useDrop(() => ({
    accept: ItemTypes.USER,
    drop: (item: { user: any }) => onDrop(item.user),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
};
