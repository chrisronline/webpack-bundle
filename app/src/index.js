import React from 'react'
import { render } from 'react-dom'
import Kickoff from './kickoff'

const NavBar = Kickoff('NavBar')

render(
  <div>
    <h1>App</h1>
    <NavBar/>
  </div>,
  document.getElementById('app')
)