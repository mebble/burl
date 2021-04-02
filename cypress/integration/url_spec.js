import { getQueryParams, isHttpUrl, parseUrl } from '../../src/url'

describe('getQueryParams', () => {
    it('should return an empty map for an invalid URL', () => {
        const params = getQueryParams('some-invalid-url')
        expect(params).to.deep.equal(new Map())
    })

    it('should return an empty map for a query string not beginning with a query string separator', () => {
        const params = getQueryParams('a=cat&b=dog')
        expect(params).to.deep.equal(new Map())
    })

    it('should return an empty map for a URL without a query string', () => {
        const params = getQueryParams('http://example.com/some/path')
        expect(params).to.deep.equal(new Map())
    })

    it('should return an empty map for a URL with a trailing query string separator', () => {
        const params = getQueryParams('http://example.com/some/path?')
        expect(params).to.deep.equal(new Map())
    })

    it.skip('should return an empty map for a URL with a trailing query string separator and a fragment', () => {
        const params = getQueryParams('http://example.com/some/path?#foo')
        expect(params).to.deep.equal(new Map())
    })

    it('should return a map of the query params from the URL', () => {
        const params = getQueryParams('http://example.com/some/path?a=cat&b=dog')
        const expected = new Map([
            ['a', 'cat'],
            ['b', 'dog']
        ])
        expect(params).to.deep.equal(expected)
    })

    it('should return a map of the query params of a URL having a query string separator within the query string', () => {
        const params = getQueryParams('http://example.com/some/path?a=cat?&b=dog')
        const expected = new Map([
            ['a', 'cat?'],
            ['b', 'dog']
        ])
        expect(params).to.deep.equal(expected)
    })

    it('should return a map of the query params of a URL having a fragment after the query string', () => {
        const params = getQueryParams('http://example.com/some/path?a=cat&b=dog#foo')
        const expected = new Map([
            ['a', 'cat'],
            ['b', 'dog']
        ])
        expect(params).to.deep.equal(expected)
    })

    it('should return a map of the query params of a query string beginning with a query string separator', () => {
        const params = getQueryParams('?a=cat&b=dog')
        const expected = new Map([
            ['a', 'cat'],
            ['b', 'dog']
        ])
        expect(params).to.deep.equal(expected)
    })
})

describe('isHttpUrl', () => {
    it('is false for string without protocol', () => {
        expect(isHttpUrl('example.com')).to.be.false
    })

    it('is false for javascript url', () => {
        expect(isHttpUrl('javascript:void(0)')).to.be.false
    })

    it('is false for string with some other protocol', () => {
        expect(isHttpUrl('ftp://example.com')).to.be.false
    })

    it('is true for string with http protocol', () => {
        expect(isHttpUrl('http://example.com')).to.be.true
    })

    it('is true for string with https protocol', () => {
        expect(isHttpUrl('https://example.com')).to.be.true
    })
})

describe('parseUrl', () => {
    it('should throw an error when url is not an http url', () => {
        const url = 'ftp://example.com'
        expect(() => {
            const _ = parseUrl(url)
        }).to.throw('Must be an HTTP URL')
    });

    it('should throw an error when url is an invalid url', () => {
        const url = 'some-invalid-url'
        expect(() => {
            const _ = parseUrl(url)
        }).to.throw('Must be an HTTP URL')
    });

    it('should parse a url having all fields', () => {
        const urlString = 'http://example.com:9000/path?a=cat&b=dog#foo'

        const url = parseUrl(urlString)

        expect(url.protocol).to.equal('http')
        expect(url.hostname).to.equal('example.com')
        expect(url.port).to.equal('9000')
        expect(url.path).to.equal('/path')
        expect(url.query.get('a')).to.equal('cat')
        expect(url.query.get('b')).to.equal('dog')
        expect(url.fragment).to.equal('foo')
    });

    it('should set the explicitly given port even if the protocol infers it', () => {
        const urlString = 'http://example.com:80/path'

        const url = parseUrl(urlString)

        expect(url.protocol).to.equal('http')
        expect(url.port).to.equal('80')
    });

    it('should ignore the trailing query string separator of a url');
    it('should set a root path for a url having no path');
    it('should set empty values for non-mandatory fields');
    it('should set the hostname of a url having subdomains');
})
