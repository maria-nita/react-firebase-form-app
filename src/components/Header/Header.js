import React from 'react'
import logo from './../../earthblox-logo.png'

import './Header.css'

export default function Header() {
    return (
        <div className="header-inner">
            <a className="header-logo" href="https://blox.earth/">
                <img src={logo} />
            </a>
            {/* <div className="header-links">
                <a href="https://blox.earth/">Why Earth Blox?</a>
                <a href="https://blox.earth/">Features</a>
                <a href="https://blox.earth/">Trusted by</a>
            </div> */}
        </div>
    )
}
