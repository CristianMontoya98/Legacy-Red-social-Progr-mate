import React from "react";
import styles from "../Navbar/Navbar.module.css";
import iconoEducamas from "../../assets/images/iconoEducamas.png";
import logoperfil from "../../assets/images/photoProfile.png";
import { BiGroup, BiMessageRoundedAdd } from "react-icons/bi";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineForum } from "react-icons/md";
import { Link } from "react-router-dom";
import DropdownLogOut from "./DropdownLogOut";
import Icon_home from "../../assets/icons/Icon_home";
import Icon_news  from "../../assets/icons/Icon_new";
import Icon_events from "../../assets/icons/Icon_events";
import Icon_forum from "../../assets/icons/Icon_forum";
import Icon_job from "../../assets/icons/Icon_job";
import Icon_message from "../../assets/icons/Icon_message";


const Navbar = () => {
  return (
    <header className={styles.globalNav}>
      <div className={styles.globalNavContent}>
        <nav className={styles.navBar}>
          <Link to="/home">
            <img
              src={iconoEducamas}
              alt="Prográmate"
              className={styles.iconoEducamas}
            />
          </Link>
          <ul className={styles.navList}>
            <Link to="/home">
              <li className={styles.navListItem}>
                <Icon_news/>
                <p>NEWS</p>
              </li>
            </Link>
            <Link to="/community">
              <li className={styles.navListItem}>
                <Icon_job/>
                <p>JOBS</p>
              </li>
            </Link>
            
            <Link to="/events">
              <li className={styles.navListItem}>
              <Icon_events/>
              <p>EVENTS</p>
              </li>
            </Link>
            <Link to="/community">
              <li className={styles.navListItem}>
                <Icon_job/>
                <p>COMUNITY</p>
              </li>
            </Link>
            <Link to="/questions">
              <li className={styles.navListItem}>
                <Icon_forum/>
                <p>FORUM</p>
              </li>
            </Link>
          </ul>

          <div className={styles.containerPhoto}>
            <img
              //src={logoperfil}
              alt="Prográmate"
              className={styles.photoProfile}
            />
            <DropdownLogOut />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;