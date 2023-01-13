import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@hooks";
import { selectRegion, setQueryRegion } from "rtk/query.slice";

import s from "./select.module.scss";

const optionsList = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

const Select = () => {
  const selected = useAppSelector(selectRegion);

  const [showList, setShowList] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    optionsList.indexOf(selected)
  );
  const selectRef = useRef<null | HTMLDivElement>(null);
  const namespace = "region";

  const dispatch = useAppDispatch();

  const handleSelect = (id: number) => {
    setSelectedOption(id);
    setShowList(false);
  };

  useEffect(() => {
    dispatch(setQueryRegion(optionsList[selectedOption]));
  }, [dispatch, selectedOption]);

  const handleKeyDown = (id: number) => (e: KeyboardEvent<HTMLLIElement>) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        handleSelect(id);
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
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : optionsList.length - 1
        );
        break;
      case "Down":
      case "ArrowDown":
        e.preventDefault();
        setSelectedOption(
          selectedOption == optionsList.length - 1 ? 0 : selectedOption + 1
        );
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
        aria-activedescendant={`${namespace}_element_${optionsList[selectedOption]}`}
        className={s.select}
        data-active={selectedOption || undefined}
        onClick={() => setShowList(!showList)}
        onKeyDown={handleListKeyDown}
      >
        {selectedOption ? optionsList[selectedOption] : "Filter by Region"}
        <FaChevronDown data-show={showList || undefined} />
      </button>
      <ul
        className={s.list}
        data-show={showList || undefined}
        role="listbox"
        id={`${namespace}_dropdown`}
        tabIndex={-1}
        aria-multiselectable={false}
      >
        {optionsList.map((option, id) => {
          return (
            <li
              key={id}
              role="option"
              tabIndex={0}
              id={`${namespace}_element_${option}`}
              aria-selected={selectedOption === id}
              className={s.option}
              data-active={selectedOption === id || undefined}
              onClick={() => handleSelect(id)}
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
