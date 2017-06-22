import { fromJS, is } from 'immutable'
import { flashReducers } from './flash.reducers'
import { REMOVE_MESSAGE, ADD_MESSAGE } from 'app/actions/flash.actions'

describe('Flash Reducers', () => {
  const initialState = fromJS({
    messages: [],
  })
  const irrelevantAction = { type: 'IRRELEVANT_ACTION' }

  it('should return the initial state', () => {
    expect(is(flashReducers(undefined, irrelevantAction), initialState)).to.eql(true)
  })

  describe('REMOVE_FLASH', () => {
    const messages = [
      { id: 'test 1' },
      { id: 'test 2' },
      { id: 'test 3' },
      { id: 'test 4' },
      { id: 'test 5' },
    ]
    const previousState = fromJS({
      messages,
      test: 'test previous state',
    })
    const removeFlashAction = {
      type: REMOVE_MESSAGE,
      payload: {
        id: _.sample(messages).id,
      },
    }

    it('does nothing when the id isn\'t contained', () => {
      function assertStateUnchanged(state, id) {
        removeFlashAction.payload.id = id
        expect(
          is(flashReducers(state, removeFlashAction), state)
        ).to.eql(true)
      }

      assertStateUnchanged(previousState, 'not-contained')
      assertStateUnchanged(previousState, void 0)
      assertStateUnchanged(previousState, 99)
      assertStateUnchanged(previousState, {})
      assertStateUnchanged(previousState, '')
    })

    it('removes a message by id', () => {
      _.map(messages, ({ id }) => {
        removeFlashAction.payload.id = id
        const actual = flashReducers(previousState, removeFlashAction)
        const expectedMessages = _.reject(messages, {
          id: removeFlashAction.payload.id,
        })
        expect(is(actual.get('messages'), fromJS(expectedMessages))).to.eql(true)
      })
    })
  })

  describe('ADD_MESSAGE', () => {
    const messages = [
      { id: 'test 1' },
      { id: 'test 2' },
      { id: 'test 3' },
      { id: 'test 4' },
      { id: 'test 5' },
    ]
    const previousState = fromJS({
      messages,
      test: 'test previous state',
    })
    const addFlashAction = {
      type: ADD_MESSAGE,
      payload: { id: 'test payload id' },
    }

    it('keeps previous state and adding action.payload to messages', () => {
      expect(
        is(flashReducers(previousState, addFlashAction), previousState.set('messages', previousState.get('messages').merge([ addFlashAction.payload ])))
      ).to.eql(true)
    })
  })
})
