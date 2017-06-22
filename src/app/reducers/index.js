import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { flashReducers as flash } from './flash.reducers'
import { barReducers as bar } from './bar.reducers'
import { fooReducers as foo } from './foo.reducers'
import { enableBatching } from 'redux-batched-actions'

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
})

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      })
    default:
      return state
  }
}

export default enableBatching(combineReducers({
  flash,
  foo,
  bar,
  routing: routeReducer,
}))
