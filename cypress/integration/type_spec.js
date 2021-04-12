import { emptyUrl } from '../../src/url'
import { RipeUrl, RawUrl } from '../../src/types'

describe('RipeUrl', () => {
    describe('toString', () => {
        it('should return an empty string for an empty URL', () => {
            const url = emptyUrl()

            expect(url.toString()).to.equal('')
        })

        it('should return the string of a URL having only mandatory fields', () => {
            const url = new RipeUrl({
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/path',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com/path')
        })

        it('should return the string of a URL having all fields', () => {
            const url = new RipeUrl({
                protocol: 'http',
                hostname: 'example.com',
                port: '9000',
                path: '/path',
                query: new Map([
                    ['a', 'cat'],
                    ['b', 'dog'],
                ]),
                fragment: 'foo',
            })

            expect(url.toString()).to.equal('http://example.com:9000/path?a=cat&b=dog#foo')
        })

        it('should have the implicit port even if the protocol infers it: http', () => {
            const url = new RipeUrl({
                protocol: 'http',
                hostname: 'example.com',
                port: '80',
                path: '/path',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com:80/path')
        })

        it('should have the implicit port even if the protocol infers it: https', () => {
            const url = new RipeUrl({
                protocol: 'https',
                hostname: 'example.com',
                port: '443',
                path: '/path',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('https://example.com:443/path')
        })
    })
})

describe('RawUrl', () => {
    describe('toString', () => {
        it('should return the raw string regardless of the url fields', () => {
            const url = new RawUrl({
                raw: 'some-raw-string',
                isBad: true,
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/path',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('some-raw-string')
        })
    })
})
