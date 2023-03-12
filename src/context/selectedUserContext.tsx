import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
const CurrentUserContext = React.createContext([{} as any, () => {}] as any)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CurrentUserProvider = (props: any) => {
  const [state, setState] = React.useState({})
  return (
    <CurrentUserContext.Provider value={[state, setState]}>
      {props.children}
    </CurrentUserContext.Provider>
  )
}

export { CurrentUserContext, CurrentUserProvider }
