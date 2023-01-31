import React from "react";
import { AnimatePresence } from "framer-motion";
import { List, ListItem } from "./DropdownListStyle";

const DropdownList = ({
  closeDropdown,
  show,
  listRef,
  items,
  selectItem,
  selectedItem,
}: {
  closeDropdown: any;
  show: boolean;
  listRef: any;
  items: any;
  selectItem: any;
  selectedItem: any;
}) => {
  const onSortSelect = (sort: string) => {
    selectItem(sort);
    closeDropdown(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <List
          initial={{ opacity: 0, height: "0%" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: "0%" }}
        >
          <div ref={listRef}>
            {items?.map((item: any, index: number) => (
              <ListItem
                onClick={() => {
                  onSortSelect(item);
                }}
                sortActive={selectedItem === item}
                padding="6px"
                key={index}
              >
                {item}
              </ListItem>
            ))}
          </div>
        </List>
      )}
    </AnimatePresence>
  );
};

export default DropdownList;
