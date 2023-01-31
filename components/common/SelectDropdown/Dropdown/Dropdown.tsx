import React, { useEffect } from "react";
import {
  DropdownContainer,
  ArrowImg,
  SearchInput,
  TagsContainer,
  Text,
} from "./Style";

import arrow from "../../../../images/arrowUpDown.png";
// import CancelIcon from "../../../../images/svgs/cancel-icon.svg";
import DropdownList from "../DropdownList/DropdownList";
import { TagText } from "../../../Map/styles";
import CancelIcon from "../../../../images/svgs/CancelIcon";

const Dropdown = ({
  items,
  callFor,
  selectItem,
  selectedItem,
  labelText,
  requiredError,
  onDelete,
  themeColor,
}: {
  items: any;
  callFor: any;
  selectItem: any;
  selectedItem: any;
  labelText: any;
  requiredError: boolean;
  onDelete: any;
  themeColor: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const listRef = React.useRef(null);
  const [search, setSearch] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(items);
  const ref = React.useRef(null);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    if (search === "") {
      setFilteredItems(items);
    } else {
      const newItems = items.filter((item: any) => {
        return item?.toLowerCase()?.includes(search?.toLowerCase());
      });
      setFilteredItems(newItems);
    }
  };

  useEffect(() => {
    const handleMouseClick = (e: any) => {
      if (
        !listRef?.current?.contains(e.target) &&
        !ref?.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [open, ref]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <DropdownContainer
        color={themeColor}
        ref={ref}
        requiredError={requiredError}
        open={open}
        onClick={
          callFor === "tags" && selectedItem?.length >= 3
            ? () => setOpen(false)
            : open
            ? () => {}
            : () => setOpen(true)
        }
      >
        <>
          {callFor !== "tags" ? (
            <>
              {open ? (
                <SearchInput
                  placeholder={
                    callFor === "countries" ? "Search Country" : "Search City"
                  }
                  onChange={handleSearch}
                />
              ) : (
                <Text>{labelText}</Text>
              )}
            </>
          ) : (
            <TagsContainer>
              {selectedItem?.length > 0 ? (
                selectedItem?.map((item: any, index: number) => (
                  <TagText key={index}>
                    {item}
                    <span
                      onClick={() => {
                        onDelete(item);
                      }}
                    >
                      <CancelIcon fill="white" />
                    </span>
                  </TagText>
                ))
              ) : (
                <Text>{labelText}</Text>
              )}
            </TagsContainer>
          )}
        </>
        <span
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        >
          <ArrowImg src={arrow} alt="arrow" open={open} />
        </span>
        <span className="underline"></span>
        {callFor === "tags" && (
          <span className="instraction">Press enter to add skills (max 3)</span>
        )}
      </DropdownContainer>
      <DropdownList
        show={open}
        closeDropdown={setOpen}
        listRef={listRef}
        items={search === "" ? items : filteredItems}
        selectItem={selectItem}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Dropdown;
