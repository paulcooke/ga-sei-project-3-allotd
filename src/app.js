import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/main.scss'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import Footer from './components/common/Footer'
import SecureRoute from './components/common/SecureRoute'

import VegetablesIndex from './components/vegetables/VegetablesIndex'
import VegetablesShow from './components/vegetables/VegetablesShow'
import VegetablesNew from './components/vegetables/VegetablesNew'
import VegetablesEdit from './components/vegetables/VegetablesEdit'
import VegetablesMap from './components/vegetables/VegetablesMap'
import VegetablesChat from './components/vegetables/VegetablesChat'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/users/Dashboard'
import DashboardEdit from './components/users/DashboardEdit'

import ImageUpload from './components/images/imageUpload'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path ="/vegetables/map" component={VegetablesMap} />
        <Route path ="/vegetables/chat" component={VegetablesChat} />
        <SecureRoute path="/vegetables/new" component={VegetablesNew} />
        <SecureRoute path="/vegetables/:id/edit" component={VegetablesEdit} />
        <Route path="/vegetables/:id" component={VegetablesShow} />
        <Route path="/vegetables" component={VegetablesIndex}/>
        <Route path="/uploadbase" component={ImageUpload}/>

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <SecureRoute path="/dashboard/:id/edit" component={DashboardEdit} />
        <SecureRoute path="/dashboard" component={Dashboard} />
      </Switch>
      <Footer/>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)