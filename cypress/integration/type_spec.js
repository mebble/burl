import { emptyUrl } from '../../src/url'
import { Url } from '../../src/types'

describe('Url', () => {
    describe('toString', () => {
        it('should return an empty string for an empty URL', () => {
            const url = emptyUrl()

            expect(url.toString()).to.equal('')
        })

        it('should return the raw string and not the parsed URL of a bad URL', () => {
            const url = new Url({
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
            const url = new Url({
                raw: 'some-raw-string',
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
            const url = new Url({
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
            const url = new Url({
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
            const url = new Url({
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
            const url = new Url({
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
    })
})
