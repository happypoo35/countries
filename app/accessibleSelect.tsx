// import React, { useState, useEffect, useRef } from "react";

// interface Option {
//   value: string;
//   label: string;
//   namespace?: string;
// }

// interface Props {
//   value: string;
//   options: Option[];
// }

// const registerOpenDropdownHandlers = ({
//   optionsLength,
//   activeIndex,
//   setActiveIndex,
//   select,
// }) => {
//   const keyDownCallback = (e) => {
//     e.preventDefault();
//     console.log(e);
//     switch (e.key) {
//       case "Up":
//       case "ArrowUp":
//         e.preventDefault();
//         setActiveIndex(activeIndex <= 0 ? optionsLength - 1 : activeIndex - 1);
//         return;
//       case "Down":
//       case "ArrowDown":
//         e.preventDefault();
//         setActiveIndex(activeIndex + 1 === optionsLength ? 0 : activeIndex + 1);
//         return;
//       case "Enter":
//       case " ": // Space
//         e.preventDefault();
//         select(options[activeIndex].value);
//         return;
//       case "Esc":
//       case "Escape":
//         e.preventDefault();
//         select(false);
//         return;
//       case "PageUp":
//       case "Home":
//         e.preventDefault();
//         setActiveIndex(0);
//         return;
//       case "PageDown":
//       case "End":
//         e.preventDefault();
//         setActiveIndex(options.length - 1);
//         return;
//     }
//   };
//   document.addEventListener("keydown", keyDownCallback);
//   return () => {
//     document.removeEventListener("keydown", keyDownCallback);
//   };
// };

// const registerClosedDropdownHandlers = ({ setIsDropdownOpen }) => {
//   const keyDownCallback = (e) => {
//     switch (e.key) {
//       case "Up":
//       case "ArrowUp":
//       case "Down":
//       case "ArrowDown":
//       case " ": // Space
//       case "Enter":
//         e.preventDefault();
//         setIsDropdownOpen(true);
//     }
//   };
//   document.addEventListener("keydown", keyDownCallback);
//   return () => {
//     document.removeEventListener("keydown", keyDownCallback);
//   };
// };

// const isSafari = () => {
//   const chromeInAgent = navigator.userAgent.indexOf("Chrome") > -1;
//   const safariInAgent = navigator.userAgent.indexOf("Safari") > -1;
//   return safariInAgent && !chromeInAgent;
// };

// const useAccessibleDropdown = ({ options, value, onChange }) => {
//   const [isDropdownOpen, setIsDropdownOpenInternal] = useState(false);
//   const listRef = useRef();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isFocus, setIsFocus] = useState(false);
//   const select = (value: string) => {
//     if (value) {
//       onChange && onChange(value);
//     }
//     setIsDropdownOpen(false);
//   };

//   const setIsDropdownOpen = (v: boolean) => {
//     if (v) {
//       const selected = options.findIndex((o) => o.value === value);
//       setActiveIndex(selected < 0 ? 0 : selected);
//       if (listRef.current && isSafari()) {
//         requestAnimationFrame(() => {
//           listRef.current.focus();
//         });
//       }
//     } else {
//       if (listRef.current && isSafari()) {
//         requestAnimationFrame(() => {
//           listRef.current.previousSibling.focus();
//         });
//       }
//     }
//     setIsDropdownOpenInternal(v);
//   };

//   useEffect(() => {
//     if (isDropdownOpen) {
//       return registerOpenDropdownHandlers({
//         activeIndex,
//         setActiveIndex,
//         optionsLength: options.length,
//         select,
//       });
//     } else {
//       return (
//         isFocus &&
//         registerClosedDropdownHandlers({
//           setIsDropdownOpen,
//         })
//       );
//     }
//   }, [isDropdownOpen, activeIndex, isFocus]);

//   return {
//     isDropdownOpen,
//     setIsDropdownOpen,
//     activeIndex,
//     setActiveIndex,
//     select,
//     setIsFocus,
//     listRef,
//   };
// };

// const Select = ({
//   options,
//   value,
//   namespace = "default_select_namespace",
//   onChange,
//   label,
// }: Props) => {
//   const {
//     isDropdownOpen,
//     setIsDropdownOpen,
//     activeIndex,
//     setActiveIndex,
//     select,
//     setIsFocus,
//     listRef,
//   } = useAccessibleDropdown({ options, value, onChange });
//   const chosen = options.find((o) => o.value === value);

//   return (
//     <>
//       <label id={`${namespace}_label`}>{label}</label>
//       <div className="select-container">
//         <button
//           className="select-button"
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           role="combobox"
//           aria-haspopup="listbox"
//           aria-controls={`${namespace}_dropdown`}
//           aria-expanded={isDropdownOpen}
//           aria-activedescendant={`${namespace}_element_${value}`}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           aria-label="Choose your favourite Ninjago character"
//         >
//           Selected: {chosen.label}
//         </button>
//         <ul
//           className="select-dropdown"
//           role="listbox"
//           ref={listRef}
//           id={`${namespace}_dropdown`}
//           tabIndex={-1}
//         >
//           {options.map(({ label, value: optionValue }, index) => (
//             <li
//               key={optionValue}
//               id={`${namespace}_element_${optionValue}`}
//               aria-selected={index === activeIndex}
//               role="option"
//               onMouseOver={() => setActiveIndex(index)}
//             >
//               <label>
//                 <input
//                   type="radio"
//                   name={`${namespace}_radio`}
//                   value={optionValue}
//                   className={chosen.value === optionValue && "checked"}
//                   checked={chosen.value === optionValue}
//                   onChange={() => select(optionValue)}
//                 />
//                 {label}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// const options = [
//   {
//     value: "kai",
//     label: "Kai",
//   },
//   {
//     value: "nya",
//     label: "Nya",
//   },
//   {
//     value: "lloyd",
//     label: "Lloyd",
//   },
//   {
//     value: "zane",
//     label: "Zane",
//   },
//   {
//     value: "cole",
//     label: "Cole",
//   },
//   {
//     value: "jay",
//     label: "Jay",
//   },
//   {
//     value: "garmadon",
//     label: "Garmadon",
//   },
// ];

// const Wrapper = () => {
//   const [v, setV] = useState("lloyd");
//   return (
//     <Select
//       options={options}
//       value={v}
//       onChange={setV}
//       label="Pick your favourite Ninjago: "
//     />
//   );
// };
