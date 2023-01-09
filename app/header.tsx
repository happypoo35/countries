import Link from "next/link";
import ToggleTheme from "./toggleTheme";

import s from "./header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container} data-container="fixed">
        <Link href="/" className="logo">
          <h1>Where in the world?</h1>
        </Link>
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
