import React from "react";

interface GroupListProps {
  items: { name: string; value: string }[];
  selectedItem: string;
  onItemSelect: (arg: string) => void;
  horizontal?: boolean;
}

const GroupList: React.FC<GroupListProps> = ({
  items,
  selectedItem,
  onItemSelect,
  horizontal = false,
}) => {
  const groupListClass = horizontal
    ? "list-group list-group-horizontal-md"
    : "list-group ";

  return (
    <ul className={groupListClass}>
      {items.map((item, i) => (
        <li
          key={item.value + i}
          className={
            "list-group-item" +
            (item.value === selectedItem ? " list-group-item-dark" : "")
          }
          onClick={() => onItemSelect(item.value)}
          role="button"
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
