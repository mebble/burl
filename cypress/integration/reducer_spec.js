import { urlReducer } from '../../src/reducers'
import { RawUrl, RipeUrl } from '../../src/types'

describe('urlReducer', () => {
    context('REPLACE action', () => {
        it('forwards the payload', () => {
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
    })

    context('PROTOCOL action', () => {
        it('returns a RipeUrl', () => {
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

        it('replaces only the protocol', () => {
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
    })

    context('HOSTNAME action', () => {
        it('returns a RipeUrl', () => {
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

        it('replaces only the hostname', () => {
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
    })

    context('PORT action', () => {
        it('returns a RipeUrl', () => {
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

        it('replaces only the port', () => {
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
    })

    context('PATH action', () => {
        it('returns a RipeUrl', () => {
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

        it('replaces only the path', () => {
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
    })

    context('FRAGMENT action', () => {
        it('returns a RipeUrl', () => {
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

        it('replaces only the fragment', () => {
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
    })

    context('QUERY_UPDATE action', () => {
        it('returns a RipeUrl', () => {
            const current = new RawUrl({
                raw: 'some-raw-string',
                protocol: 'http',
                hostname: 'url.com',
                port: '',
                path: '/',
                query: new Map(),
                fragment: '',
            })
            const action = { type: 'QUERY_UPDATE', payload: {} }

            const newUrl = urlReducer(current, action)

            expect(newUrl instanceof RipeUrl).to.be.true
        })

        it('replaces the given query param value', () => {
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
                type: 'QUERY_UPDATE',
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

        it('ignores the given query param value if query key is not in current URL', () => {
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
                type: 'QUERY_UPDATE',
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

        it('keeps the current query if key is undefined', () => {
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
                type: 'QUERY_UPDATE',
                payload: {
                    key: undefined,
                    value: '',
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
    })

    context('QUERY_ADD action', () => {
        it('returns a RipeUrl', () => {
            const current = new RawUrl({
                raw: 'some-raw-string',
                protocol: 'http',
                hostname: 'url.com',
                port: '',
                path: '/',
                query: new Map(),
                fragment: '',
            })
            const action = { type: 'QUERY_ADD', payload: {} }

            const newUrl = urlReducer(current, action)

            expect(newUrl instanceof RipeUrl).to.be.true
        })

        it('sets a new key-value pair when the key is new', () => {
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
                    ['c', 'camel'],
                ]),
                fragment: 'f1',
            })
            const action = {
                type: 'QUERY_ADD',
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

        it('ignores the given query param value if query key is already in current URL', () => {
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
                type: 'QUERY_ADD',
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

        it('keeps the current query if key is undefined', () => {
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
                type: 'QUERY_ADD',
                payload: {
                    key: undefined,
                    value: '',
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

        it('keeps the current query if key is an empty string', () => {
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
                type: 'QUERY_ADD',
                payload: {
                    key: '',
                    value: 'haha',
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
    })

    context('QUERY_REMOVE action', () => {
        it('returns a RipeUrl', () => {
            const current = new RawUrl({
                raw: 'some-raw-string',
                protocol: 'http',
                hostname: 'url.com',
                port: '',
                path: '/',
                query: new Map([
                    ['a', 'cat'],
                    ['b', 'dog'],
                ]),
                fragment: '',
            })
            const action = { type: 'QUERY_REMOVE', payload: {} }

            const newUrl = urlReducer(current, action)

            expect(newUrl instanceof RipeUrl).to.be.true
        })

        it('removes the query param having the payload key', () => {
            const current = new RipeUrl({
                protocol: 'http',
                hostname: 'url.com',
                port: '',
                path: '/',
                query: new Map([
                    ['a', 'cat'],
                    ['b', 'dog'],
                    ['c', 'camel'],
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
                    ['c', 'camel'],
                ]),
                fragment: 'f1',
            })
            const action = { type: 'QUERY_REMOVE', payload: 'b' }

            const newUrl = urlReducer(current, action)

            expect(newUrl.protocol).to.equal(expected.protocol)
            expect(newUrl.hostname).to.equal(expected.hostname)
            expect(newUrl.port).to.equal(expected.port)
            expect(newUrl.path).to.equal(expected.path)
            expect(newUrl.query).to.deep.equal(expected.query)
            expect(newUrl.fragment).to.equal(expected.fragment)
        })

        it('keeps the current query if query key is not in current URL', () => {
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
            const action = { type: 'QUERY_REMOVE', payload: 'c' }

            const newUrl = urlReducer(current, action)

            expect(newUrl.protocol).to.equal(expected.protocol)
            expect(newUrl.hostname).to.equal(expected.hostname)
            expect(newUrl.port).to.equal(expected.port)
            expect(newUrl.path).to.equal(expected.path)
            expect(newUrl.query).to.deep.equal(expected.query)
            expect(newUrl.fragment).to.equal(expected.fragment)
        })

        it('keeps the current query if key is undefined', () => {
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
            const action = { type: 'QUERY_REMOVE', payload: undefined }

            const newUrl = urlReducer(current, action)

            expect(newUrl.protocol).to.equal(expected.protocol)
            expect(newUrl.hostname).to.equal(expected.hostname)
            expect(newUrl.port).to.equal(expected.port)
            expect(newUrl.path).to.equal(expected.path)
            expect(newUrl.query).to.deep.equal(expected.query)
            expect(newUrl.fragment).to.equal(expected.fragment)
        })
    })

    context('unknown action', () => {
        it('returns the current URL', () => {
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
})
