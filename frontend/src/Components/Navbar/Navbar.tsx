import * as React from "react";
import { Icon } from 'rsuite';
import { NavbarItem } from './NavbarItem';
import { NavbarSearch } from "./NavbarSearch";
import './styles/Navbar.sass'

/**
 * The Navbar holds links to the different sites of the application
 * @param props are the standard NavbarProps from rsuite
 * @returns the navbar with links to the Search-, My Papers-, Graph-, Privacy- and Aboutpages and a link to Github and to the settings
 */
export const NavBar: React.FC = (props) => {
    return (
        <div id="navbar">
            <div className="navbar-left">
                <NavbarItem label="Icteridae" path="/" className="navbar-home"/>
                <NavbarSearch/>
                <NavbarItem icon="bookmark" label="My Papers" path="/papers" className="navbar-my-papers"/>
                <NavbarItem icon="info" label="About" path="/privacy" className="navbar-about"/>
            </div>
            <div className="navbar-right">
                <NavbarItem extern icon="github" label="Github" path="https://github.com/icteridae/icteridae/" className="navbar-github"/>
            </div>
        </div>
    )
}
