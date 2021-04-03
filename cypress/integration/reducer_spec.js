import { urlReducer } from '../../src/reducers'
import { Url } from '../../src/types'

describe('urlReducer', () => {
    it('replaces the current urlInput', () => {
        const oldUrl = new Url({
            protocol: 'http',
            hostname: 'url1.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const expected = new Url({
            protocol: 'http',
            hostname: 'url2.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'REPLACE', payload: expected }

        const newUrl = urlReducer(oldUrl, action)

        expect(newUrl).to.equal(expected)
    })
})
