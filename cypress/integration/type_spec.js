import { RipeUrl, RawUrl } from '../../src/types'

describe('RipeUrl', () => {
    describe('toString', () => {
        it('should return the string of a URL having only mandatory fields', () => {
            const url = new RipeUrl({
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com')
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

        it('should have the path if it is a root path', () => {
            const url = new RipeUrl({
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: '/',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com/')
        })

        it('should have a path that starts with "/" if the path field doesn\'t start with it and is nonempty', () => {
            const url = new RipeUrl({
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                path: 'path',
                query: new Map(),
                fragment: '',
            })

            expect(url.toString()).to.equal('http://example.com/path')
        })
    })

    describe('isBad', () => {
        it('should be false when all url fields are valid', () => {
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

            expect(url.isBad()).to.be.false
        })

        it('should be true when protocol field is not http')
        it('should be true when protocol field is not https')
        it('should be true when port field is greater than max port value')
        it('should be true when port field has non numeric characters')
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

    describe('isBad', () => {
        it('should return the property set in the constructor', () => {
            const url1 = new RawUrl({
                isBad: true,
            })
            const url2 = new RawUrl({
                isBad: false,
            })

            expect(url1.isBad()).to.be.true
            expect(url2.isBad()).to.be.false
        })
    })
})
