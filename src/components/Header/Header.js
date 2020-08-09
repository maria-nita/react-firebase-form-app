import React from 'react'
import logo from './../../assets/earthblox-logo.png'

import './Header.css'

export default function Header() {
    return (
        <div className="header-inner">
            <a className="header-logo" href="https://blox.earth/">
                <img src={logo} alt="Earth Blox logo" />
            </a>
        </div>
    )
}
