import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import Footer from './components/common/Footer'

import VegetablesIndex from './components/vegetables/VegetablesIndex'
import VegetablesShow from './components/vegetables/VegetablesShow'
import VegetablesNew from './components/vegetables/VegetablesNew'
import VegetablesEdit from './components/vegetables/VegetablesEdit'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/vegetables/new" component={VegetablesNew} />
        <Route path="/vegetables/:id/edit" component={VegetablesEdit} />
        <Route path="/vegetables/:id" component={VegetablesShow} />
        <Route path="/vegetables" component={VegetablesIndex}/>

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)