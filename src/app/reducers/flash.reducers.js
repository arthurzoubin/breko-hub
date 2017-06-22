import { fromJS } from 'immutable'
import { filter } from 'ramda'
import { typeToReducer, get } from 'app/utils'
import { REMOVE_MESSAGE, ADD_MESSAGE } from 'app/actions/flash.actions'

const getFlashId = get('payload.id')

const initialState = fromJS({
  messages: [],
})

export const flashReducers = typeToReducer({

  [ REMOVE_MESSAGE ]: (state, action) =>
    state.set('messages', filter(
      flash => flash.get('id') !== getFlashId(action),
      state.get('messages')
    )),

  [ ADD_MESSAGE ]: (state, action) =>
    state.set('messages', state.get('messages').merge([ action.payload ])),

}, initialState)
