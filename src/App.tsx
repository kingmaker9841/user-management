/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { CurrentUserProvider } from './context/selectedUserContext'
import { routeList } from './config/routes/routeList'
import { setStorageData } from './config/setup'
import { ThemeProvider } from '@mui/material/styles'
import BaseLayout from './layouts'
import React from 'react'
import theme from './styles/theme'
import { lsGet, lsSet } from './utils/localStorateAction'
import PageNotFound from './pages/404Page'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  const getItem = () => {
    const isDataSet: any = lsGet('isSet')
    if (!JSON.parse(isDataSet)) {
      setStorageData()
      lsSet('isSet', 'true')
    }
  }
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

  React.useEffect(() => {
    getItem()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CurrentUserProvider>
        <CssBaseline />
        <BaseLayout>
          <BrowserRouter>
            <React.Suspense fallback={<>Loading ...</>}>
              <Switch>
                {getRoute(routeList)?.map((r: any) => r)}
                <Route component={PageNotFound} />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </BaseLayout>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="colored"
        />
      </CurrentUserProvider>
    </ThemeProvider>
  )
}

export default App
