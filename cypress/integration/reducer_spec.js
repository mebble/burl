import { urlReducer } from '../../src/reducers'
import { RawUrl, RipeUrl } from '../../src/types'

describe('urlReducer', () => {
    it('forwards the payload on REPLACE action', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url1.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const expected = new RawUrl({
            raw: 'some-raw-string',
            protocol: 'http',
            hostname: 'url2.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'REPLACE', payload: expected }

        const newUrl = urlReducer(current, action)

        expect(newUrl).to.equal(expected)
    })

    it('returns a RipeUrl on PROTOCOL action', () => {
        const current = new RawUrl({
            raw: 'some-raw-string',
            protocol: 'http',
            hostname: 'url2.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'PROTOCOL', payload: 'https' }

        const newUrl = urlReducer(current, action)

        expect(newUrl instanceof RipeUrl).to.be.true
    })

    it('replaces only the protocol on PROTOCOL action', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const expected = new RipeUrl({
            protocol: 'https',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'PROTOCOL', payload: 'https' }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('returns a RipeUrl on HOSTNAME action', () => {
        const current = new RawUrl({
            raw: 'some-raw-string',
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'HOSTNAME', payload: 'e.com' }

        const newUrl = urlReducer(current, action)

        expect(newUrl instanceof RipeUrl).to.be.true
    })

    it('replaces only the hostname on HOSTNAME action', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url1.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const expected = new RipeUrl({
            protocol: 'http',
            hostname: 'url2.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'HOSTNAME', payload: 'url2.com' }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('returns a RipeUrl on PORT action', () => {
        const current = new RawUrl({
            raw: 'some-raw-string',
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'PORT', payload: '9090' }

        const newUrl = urlReducer(current, action)

        expect(newUrl instanceof RipeUrl).to.be.true
    })

    it('replaces only the port on PORT action', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '1000',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const expected = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '2000',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'PORT', payload: '2000' }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('returns a RipeUrl on PATH action', () => {
        const current = new RawUrl({
            raw: 'some-raw-string',
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'PATH', payload: '/path' }

        const newUrl = urlReducer(current, action)

        expect(newUrl instanceof RipeUrl).to.be.true
    })

    it('replaces only the path on PATH action', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/path1',
            query: new Map(),
            fragment: '',
        })
        const expected = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/path2',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'PATH', payload: '/path2' }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('returns a RipeUrl on FRAGMENT action', () => {
        const current = new RawUrl({
            raw: 'some-raw-string',
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'FRAGMENT', payload: 'foo' }

        const newUrl = urlReducer(current, action)

        expect(newUrl instanceof RipeUrl).to.be.true
    })

    it('replaces only the fragment on FRAGMENT action', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: 'f1',
        })
        const expected = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: 'f2',
        })
        const action = { type: 'FRAGMENT', payload: 'f2' }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('returns a RipeUrl on QUERY action', () => {
        const current = new RawUrl({
            raw: 'some-raw-string',
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const action = { type: 'QUERY', payload: {} }

        const newUrl = urlReducer(current, action)

        expect(newUrl instanceof RipeUrl).to.be.true
    })

    it('replaces the given query param value on QUERY action', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map([
                ['a', 'cat'],
                ['b', 'dog'],
            ]),
            fragment: 'f1',
        })
        const expected = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map([
                ['a', 'camel'],
                ['b', 'dog'],
            ]),
            fragment: 'f1',
        })
        const action = {
            type: 'QUERY',
            payload: {
                key: 'a',
                value: 'camel'
            }
        }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('ignores the given query param value on QUERY action if query key is not in current URL', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map([
                ['a', 'cat'],
                ['b', 'dog'],
            ]),
            fragment: 'f1',
        })
        const expected = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map([
                ['a', 'cat'],
                ['b', 'dog'],
            ]),
            fragment: 'f1',
        })
        const action = {
            type: 'QUERY',
            payload: {
                key: 'c',
                value: 'camel'
            }
        }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('keeps the current query if payload is empty', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map([
                ['a', 'cat'],
                ['b', 'dog'],
            ]),
            fragment: 'f1',
        })
        const expected = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map([
                ['a', 'cat'],
                ['b', 'dog'],
            ]),
            fragment: 'f1',
        })
        const action = { type: 'QUERY', payload: {} }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('returns the current URL on an unknown action', () => {
        const current = new RipeUrl({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map([
                ['a', 'cat'],
                ['b', 'dog'],
            ]),
            fragment: 'f1',
        })

        const action = { type: 'UNKNOWN', payload: 'abc' }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(current.protocol)
        expect(newUrl.hostname).to.equal(current.hostname)
        expect(newUrl.port).to.equal(current.port)
        expect(newUrl.path).to.equal(current.path)
        expect(newUrl.query).to.deep.equal(current.query)
        expect(newUrl.fragment).to.equal(current.fragment)
    })
})
