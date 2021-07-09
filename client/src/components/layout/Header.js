import React, { useState } from "react";
import logoDark from "../../images/logo-dark.png";
import logoLight from "../../images/logo-light.png";

const Header = ({ page }) => {
  const menuToggle = () => {
    const header = document.querySelector(".header");
    const menu = document.querySelector(".header__menu");
    const overlay = document.querySelector(".header__overlay");

    menu.classList.toggle("open");
    header.classList.toggle("open");
    overlay.classList.toggle("open");
  };

  const [mode, setMode] = useState("dark");

  const switchDarkMode = () => {
    let checkbox = document.querySelector('input[name="theme"]');
    let htmlElement = document.documentElement;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        smoothTrans();
        htmlElement.setAttribute("data-theme", "light");
        setMode("light")
      } else {
        smoothTrans();
        htmlElement.setAttribute("data-theme", "dark");
        setMode("dark")
      }
    });

    let smoothTrans = () => {
      htmlElement.classList.add("transition");

      window.setTimeout(() => {
        htmlElement.classList.remove("transition");
      }, 1000);
    };
  };

  return (
    <header className='header'>
      <div onClick={menuToggle} className='header__menu'>
        <div className='header__menu--line'></div>
      </div>

      <div className='header__overlay'></div>

      <nav className='header__nav'>
        <a href='/' className='header__nav--logo'>
          <img src={mode === "dark" ? logoDark : logoLight} alt='logo'></img> Absolute Zero
        </a>

        <ul className='header__nav--links'>
          <li className='header__nav--links__item'>
            <a
              style={{
                color: page === "home" && "var(--color-active)",
                fontWeight: page === "home" && "700",
              }}
              href='#welcome'
              data-text='Home'>
              Home
            </a>
          </li>

          <li className='header__nav--links__item'>
            <a
              style={{
                color: page === "randomizer" && "var(--color-active)",
                fontWeight: page === "randomizer" && "700",
              }}
              href='#guide'
              data-text='Guide'>
              Guide
            </a>
          </li>

          <li className='header__nav--links__item'>
            <a
              style={{
                color: page === "randomizer" && "var(--color-active)",
                fontWeight: page === "randomizer" && "700",
              }}
              href='#champions'
              data-text='Champions'>
              Champions
            </a>
          </li>

          <li className='header__nav--links__item'>
            <a
              style={{
                color: page === "randomizer" && "var(--color-active)",
                fontWeight: page === "randomizer" && "700",
              }}
              href='#randomizer'
              data-text='Randomizer'>
              Randomizer
            </a>
          </li>

          <div className='header__nav--links__toggle-container'>
            <input
              onClick={switchDarkMode}
              type='checkbox'
              id='toggle'
              name='theme'
            />
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
