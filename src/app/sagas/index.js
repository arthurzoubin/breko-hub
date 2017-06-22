import { put, fork, take, race, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as flashSelectors from 'app/selectors/flash.selectors'
import * as flashActions from 'app/actions/flash.actions'

const DAEMON = true
const log = debug('sagas')

export function * timeoutRemoveFlash(nextFlash) {
  if (nextFlash) {
    const { removed } = yield race({
      timeout: delay(4000),
      removed: take(action =>
        action.type === flashActions.REMOVE_MESSAGE
        && action.id === nextFlash.id
      ),
    })
    if (!removed) {
      yield put(flashActions.removeMessage(nextFlash.id))
    }
  }
}

export function * takeFlashMessages() {
  while (DAEMON) {
    const action = yield take(flashActions.ADD_MESSAGE)
    log('Flash added, saga will remove it automatically')
    yield fork(timeoutRemoveFlash, action.payload)
  }
}

export default function * rootSaga() {
  const nextFlash = yield select(flashSelectors.getNextMessage)
  yield fork(timeoutRemoveFlash, nextFlash?nextFlash.toJS():undefined)
  yield fork(takeFlashMessages)
}
