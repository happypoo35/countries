"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectRegion, setQueryRegion } from "@/store/query.slice";
import regions from "@/public/regions.json";

import s from "./select.module.scss";

const Select = () => {
  const selectedId = useAppSelector(selectRegion);
  const selectedOption = regions[selectedId];

  const [showList, setShowList] = useState(false);
  const selectRef = useRef<null | HTMLDivElement>(null);
  const namespace = "region";

  const dispatch = useAppDispatch();

  const handleSelect = (id: number, hideList?: boolean) => {
    dispatch(setQueryRegion(id));
    if (hideList) {
      setShowList(false);
    }
  };

  const handleKeyDown = (id: number) => (e: KeyboardEvent<HTMLLIElement>) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        handleSelect(id, true);
        break;
      case "Esc":
      case "Escape":
        e.preventDefault();
        setShowList(false);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "Esc":
      case "Escape":
        e.preventDefault();
        setShowList(false);
        break;
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        handleSelect(selectedId - 1 >= 0 ? selectedId - 1 : regions.length - 1);
        break;
      case "Down":
      case "ArrowDown":
        e.preventDefault();
        handleSelect(selectedId == regions.length - 1 ? 0 : selectedId + 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (!selectRef.current || selectRef.current.contains(target)) return;

      setShowList(false);
    };

    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  });

  return (
    <div className={s.container} ref={selectRef}>
      <button
        role="combobox"
        aria-label="Filter countries by region"
        aria-haspopup="listbox"
        aria-controls={`${namespace}_dropdown`}
        aria-labelledby={`${namespace}_label`}
        aria-expanded={showList}
        aria-activedescendant={`${namespace}_element_${selectedOption}`}
        className={s.select}
        data-active={selectedId || undefined}
        onClick={() => setShowList(!showList)}
        onKeyDown={handleListKeyDown}
      >
        {selectedId !== 0 ? selectedOption : "Filter by Region"}
        <FaChevronDown data-show={showList || undefined} />
      </button>
      <ul
        className={s.list}
        data-show={showList || undefined}
        role="listbox"
        id={`${namespace}_dropdown`}
        tabIndex={-1}
        aria-multiselectable={false}
        aria-label="List of regions"
      >
        {regions.map((option, id) => {
          return (
            <li
              key={id}
              role="option"
              tabIndex={0}
              id={`${namespace}_element_${option}`}
              aria-selected={selectedId === id}
              className={s.option}
              data-active={selectedId === id || undefined}
              onClick={() => handleSelect(id, true)}
              onKeyDown={handleKeyDown(id)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
