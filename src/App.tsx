/* eslint-disable @typescript-eslint/no-explicit-any */
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import BaseLayout from './layouts'
import theme from './styles/theme'
import { routeList } from './config/routes/routeList'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  const getRoute = (argRoute = routeList, arr: JSX.Element[] = []) => {
    argRoute?.map((routes: any, idx: number) => {
      if (routes.component)
        arr.push(
          <Route
            path={routes.path}
            key={`${idx}-${routes.path}`}
            exact={routes.exact}
            component={routes.component}
          />
        )
      if (routes.children) {
        getRoute(routes.children, arr)
      }
    })
    return arr
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <React.Suspense fallback={<>Loading ...</>}>
              {getRoute(routeList)?.map((r: any) => r)}
            </React.Suspense>
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
