import { emptyUrl } from '../../src/url'
import { RipeUrl, RawUrl } from '../../src/types'

describe('RipeUrl', () => {
    describe('toString', () => {
        it('should return an empty string for an empty URL', () => {
            const url = emptyUrl()

            expect(url.toString()).to.equal('')
        })

        it('should return the raw string and not the parsed URL of a bad URL', () => {
            const url = new RipeUrl({
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

        it('should return the parsed URL and not the raw string of a valid URL', () => {
            const url = new RipeUrl({
                raw: 'http://example.com/path',
                isBad: false,
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/path',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com/path')
        })

        it('should return the string of a URL having only mandatory fields', () => {
            const url = new RipeUrl({
                raw: 'http://example.com/path',
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
                raw: 'http://example.com:9000/path?a=cat&b=dog#foo',
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

        it('should not have a trailing root path if the raw string does not', () => {
            const url = new RipeUrl({
                raw: 'http://example.com',
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com')
        })

        it('should have a trailing root path if the raw string does', () => {
            const url = new RipeUrl({
                raw: 'http://example.com/',
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com/')
        })

        it('should have a trailing port colon if the raw string does', () => {
            const url = new RipeUrl({
                raw: 'http://example.com:',
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com:')
        })

        it('should have a port colon if the raw string does and subsequent tokens exist', () => {
            const url = new RipeUrl({
                raw: 'http://example.com:/path',
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/path',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com:/path')
        })

        it('should have the implicit port even if the protocol infers it: http', () => {
            const url = new RipeUrl({
                raw: 'http://example.com:80/path',
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
                raw: 'https://example.com:443/path',
                protocol: 'https',
                hostname: 'example.com',
                port: '443',
                path: '/path',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('https://example.com:443/path')
        })

        it('should have a query question mark if the raw string does but query is empty', () => {
            const url = new RipeUrl({
                raw: 'http://example.com/path?#foo',
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/path',
                query: new Map(),
                fragment: 'foo',
            })

            expect(url.toString()).to.equal('http://example.com/path?#foo')
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
