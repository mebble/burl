import { urlInputReducer } from '../../src/reducers'

describe('urlInputReducer', () => {
    it('replaces the current urlInput', () => {
        const current = 'some-value'
        const newValue = 'some-new-value'
        const action = { type: 'REPLACE', payload: newValue }

        const actual = urlInputReducer(current, action)

        expect(actual).to.equal(newValue)
    })
})
