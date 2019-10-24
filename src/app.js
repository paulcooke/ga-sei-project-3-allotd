import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'

import VegetablesIndex from './components/vegetables/VegetablesIndex'

import Login from './components/auth/Login'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/vegetables" component={VegetablesIndex}/>
        <Route path="/login" component={Login} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)