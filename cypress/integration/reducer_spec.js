import { urlReducer } from '../../src/reducers'
import { Url } from '../../src/types'

describe('urlReducer', () => {
    it('replaces the current url on REPLACE action', () => {
        const current = new Url({
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

        const newUrl = urlReducer(current, action)

        expect(newUrl).to.equal(expected)
    })

    it('replaces only the the protocol on PROTOCOL action', () => {
        const current = new Url({
            protocol: 'http',
            hostname: 'url.com',
            port: '',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const expected = new Url({
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

    it('replaces only the the hostname on HOSTNAME action', () => {
        const current = new Url({
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
        const action = { type: 'HOSTNAME', payload: 'url2.com' }

        const newUrl = urlReducer(current, action)

        expect(newUrl.protocol).to.equal(expected.protocol)
        expect(newUrl.hostname).to.equal(expected.hostname)
        expect(newUrl.port).to.equal(expected.port)
        expect(newUrl.path).to.equal(expected.path)
        expect(newUrl.query).to.deep.equal(expected.query)
        expect(newUrl.fragment).to.equal(expected.fragment)
    })

    it('replaces only the the port on PORT action', () => {
        const current = new Url({
            protocol: 'http',
            hostname: 'url.com',
            port: '1000',
            path: '/',
            query: new Map(),
            fragment: '',
        })
        const expected = new Url({
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
