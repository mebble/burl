import { emptyUrl } from '../../src/url'
import { Url } from '../../src/types'

describe('Url', () => {
    describe('toString', () => {
        it('should return an empty string for an empty URL', () => {
            const url = emptyUrl()

            expect(url.toString()).to.equal('')
        })

        it('should return the string of a URL having only mandatory fields', () => {
            const url = new Url({
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com/')
        })
    })
})
