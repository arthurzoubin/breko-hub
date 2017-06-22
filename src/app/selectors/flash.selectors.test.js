import { fromJS, is } from 'immutable'
import * as flashSelectors from './flash.selectors'

describe('Flash Selectors', function() {
  describe('getMessages()', () => {
    it('returns an empty array by default', () => {
      expect(
        flashSelectors.getMessages(null).toArray()
      ).to.be.an('array').with.length(0)
    })

    it('returns the flash messages', () => {
      const state = fromJS({
        flash: {
          messages: [ { id: 'test' }, { id: 'messages' } ],
        },
      })
      expect(flashSelectors.getMessages(state)).to.eql(state.get('flash').get('messages'))
    })
  })

  describe('getNextMessage()', () => {
    it('returns undefined by default', () => {
      expect(
        flashSelectors.getNextMessage(null)
      ).to.eql(undefined)
    })

    it('returns the flash message start of list', () => {
      const state = fromJS({
        flash: {
          messages: [ { id: 'test' }, { id: 'messages' } ],
        },
      })
      expect(
        is(flashSelectors.getNextMessage(state), state.get('flash').get('messages').toArray()[0])
      ).to.eql(true)
    })
  })
})
