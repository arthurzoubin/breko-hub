import { isBrowser } from 'app/utils'
import { browserHistory, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { store } from 'app/composition/store'

export const history = syncHistoryWithStore(
  isBrowser ? browserHistory : createMemoryHistory(),
  store
)
