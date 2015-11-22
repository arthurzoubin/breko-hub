import ReactDOM from 'react-dom'
import makeRoutes from '~/src/app/makeRoutes'
import { history } from '~/src/app/store/history'
import { makeContent } from '~/src/app/utils/makeContent'
import { defaultMiddleware, makeCreateStore } from '~/src/app/store/configureStore'
import rootReducer from '~/src/app/reducers'
import { outClientViaSocketIO, inClientViaSocketIO } from 'redux-via-socket.io'
import io from 'socket.io-client'
import debug from 'debug'
debug.enable(process.env.DEBUG)
const log = {
  env: debug('environment'),
  sock: debug('socket-client'),
}
log.env(`Running in [${process.env.NODE_ENV}] environment`)

const socket = io()

const store = makeCreateStore([
  ...defaultMiddleware,
  outClientViaSocketIO(socket),
])(rootReducer, window.__INITIAL_STATE__)
inClientViaSocketIO(socket, store.dispatch)

socket.on('connect', () => {
  log.sock('Client connected to socket')
  store.dispatch({
    type: 'NEW_SOCKET_SESSION',
    payload: { data: Math.random() },
    meta: { broadcast: true, next: false },
  })
})

ReactDOM.render(
  makeContent(makeRoutes(history), store),
  document.getElementById('application-root')
)

if (module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(require('./reducers'))
  )
}
