import { List } from 'immutable'
import { createSelector } from 'reselect'
import { head } from 'ramda'

export const getMessages = (state) => state?state.get('flash').get('messages'):List([])

export const getNextMessage = createSelector([ getMessages ], (messages) => head(messages.toArray()))
