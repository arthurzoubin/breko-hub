import { fromJS } from 'immutable'
import { barReducers } from './bar.reducers'
import { API_FETCH } from 'app/actions/bar.actions'

describe('Bar Reducers', ()=> {
  const initialState = fromJS({
    isPending: false,
    error: false,
    data: [],
  })
  const irrelevantAction = { type: 'IRRELEVANT_ACTION' }

  it('returns the initialState when no state', () => {
    expect(barReducers(undefined, irrelevantAction)).to.eql(initialState)
  })

  describe('API_FETCH_PENDING', ()=> {
    const stateBeforeDispatch = fromJS({
      data: 'test dirty data',
      error: new Error('test previous state error'),
      isPending: !initialState.get('isPending'),
    })

    it('sets initialState with isPending=true', ()=> {
      const apiFetchPendingAction = {
        type: `${API_FETCH}_PENDING`,
      }
      expect(
        barReducers(stateBeforeDispatch, apiFetchPendingAction)
      ).to.eql(stateBeforeDispatch.set('isPending', true))
    })
  })

  describe('API_FETCH_REJECTED', ()=> {
    const stateBeforeDispatch = fromJS({
      data: 'test dirty data',
      error: new Error('test previous state error'),
      isPending: !initialState.isPending,
    })

    it('sets initialState with payload as error', ()=> {
      const apiFetchRejectedAction = {
        type: `${API_FETCH}_REJECTED`,
        error: true,
        payload: new Error('api_fetch error'),
      }
      expect(
        barReducers(stateBeforeDispatch, apiFetchRejectedAction)
      ).to.eql(stateBeforeDispatch.merge(initialState).set('error', apiFetchRejectedAction.payload))
    })
  })

  describe('API_FETCH_FULFILLED', ()=> {
    const stateBeforeDispatch = fromJS({
      data: 'test dirty data',
      error: new Error('test previous state error'),
      isPending: !initialState.isPending,
    })

    it('sets initialState with payload as data', ()=> {
      const apiFetchFulfilledAction = {
        type: `${API_FETCH}_FULFILLED`,
        error: true,
        payload: {
          bar: [ 'some', 'test', 'data' ],
        },
      }
      expect(
        barReducers(stateBeforeDispatch, apiFetchFulfilledAction)
      ).to.eql(stateBeforeDispatch.merge(initialState).set('data', apiFetchFulfilledAction.payload.bar))
    })
  })
})
