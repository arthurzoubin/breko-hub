import { compose, createStore, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import { isBrowser, isEnv } from 'app/utils'
import DevTools from 'app/components/DevTools/DevTools'

export const makeCreateStore = (middleware) => {
  const topLevelMiddleware = [ applyMiddleware(...middleware) ]

  /* istanbul ignore if  */
  if (isEnv('development')) {
    topLevelMiddleware.push(
      (isBrowser && window.devToolsExtension != null)
        ? window.devToolsExtension()
        : DevTools.instrument()
    )

    if (isBrowser) {
      topLevelMiddleware.push(persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      ))
    }
  }

  return compose(...topLevelMiddleware)(createStore)
}
