import { fromJS } from 'immutable'
import { typeToReducer, get } from 'app/utils'
import { API_FETCH } from 'app/actions/bar.actions'

const getBar = get('payload.bar')

const initialState = fromJS({
  isPending: false,
  error: false,
  data: [],
})

export const barReducers = typeToReducer({

  [ API_FETCH ]: {
    PENDING: (state) => state.set('isPending', true),
    REJECTED: (state, action) =>
      state.merge(initialState)
        .set('error', action.payload),
    FULFILLED: (state, action) =>
      state.merge(initialState)
        .set('data', getBar(action)),
  },

}, initialState)
