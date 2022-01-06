import { useState } from "react";
import Logo from "../../assets/logo.png";
import Hamburger from "hamburger-react";
import "./Navbar.css";

const Navbar = () => {
  
  const [isOpen, setOpen] = useState(false);

  const navlinks = ["Programs", "Live Projects", "Community", "Jobs", "About"];

  return (
    <>
      <nav
        className={`navbar ${
          isOpen ? "navburger" : ""
        }`}
      >
        <div className="logo">
          <img className="logoimg" src={Logo} alt="Start Ladder" />
        </div>
        <div className="navbarlinks">
          {navlinks.map((link, index) => (
            <div key={index} className="navbarlink">
              {link}
            </div>
          ))}
        </div>
        <div className="hamburger">
          <Hamburger toggled={isOpen} onToggle={setOpen} />
        </div>
      </nav>
      {isOpen ? (
        <div className="verticalnav">
          <div className="verticallinks">
            {navlinks.map((link, idx) => (
              <div className="verticallink" key={idx}>
                {link}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
