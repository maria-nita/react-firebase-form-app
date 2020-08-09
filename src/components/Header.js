import React from 'react'
import logo from './../earthblox-logo.png'

export default function Header() {
    return (
        <div className="header-inner">
            <a href="https://blox.earth/">
            <img src={logo} />
            </a>
        </div>
    )
}
