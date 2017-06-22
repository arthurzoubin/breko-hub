import { fromJS } from 'immutable'
import { typeToReducer, get } from 'app/utils'
import { GET, GET_CLIENT_ONLY } from 'app/actions/foo.actions'

const getFoo = get('payload.foo')

const initialState = fromJS({
  data: null,
  isLoading: false,
  error: false,
})

export const fooReducers = typeToReducer({

  [ GET ]: (state, action) =>
    state.set('data', getFoo(action)),

  [ GET_CLIENT_ONLY ]: (state, action) =>
    state.set('data', getFoo(action)),

}, initialState)
