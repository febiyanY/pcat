import React, { Suspense, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { GenerateRoute, routeList } from './routes/routes'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import NotFound from './pages/404'
import NProgress from './components/NProgress'
import Layout from './layout/Layout'
import {useDispatch} from 'react-redux'
import {onCheckAuth} from './state/ducks/auth'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onCheckAuth())
  },[dispatch])

  return (
    <React.Fragment>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<NProgress />}>
            <Switch>
              {routeList.map((route, i) => {
                return <GenerateRoute {...route} key={i} />
              })}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Layout>

      </BrowserRouter>


    </React.Fragment>
  )
}

export default App;
