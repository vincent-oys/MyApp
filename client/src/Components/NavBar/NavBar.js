import React from "react";
import { Link } from 'react-router-dom';
import { MenuItems } from "./MenuItems"

class NavBar extends React.Component {


    render() {
        const menuItems = MenuItems.map((item, index) => {
            return <li key={`${index}`}><Link to={`${item.url}`}>{item.title}</Link></li>
        })
        return (
            <div>
                <header>
                    <div className="logo">
                        <h1>MyApp</h1>
                    </div>
                    <ul>
                        {menuItems}
                    </ul>
                </header>
            </div>
        )
    }
}

export default NavBar