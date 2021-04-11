import { getQueryParams, isHttpUrl, parseUrl, emptyUrl, badUrl } from '../../src/url'

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

    it('should overwrite values of duplicate keys of the query params from the URL', () => {
        const params = getQueryParams('http://example.com/some/path?a=cat&b=dog&a=camel')
        const expected = new Map([
            ['a', 'camel'],
            ['b', 'dog'],
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

    it('should return an empty string value if the query param value of a key is absent', () => {
        const params = getQueryParams('http://example.com/path?a=cat&b=&c=turtle')
        const expected = new Map([
            ['a', 'cat'],
            ['b', ''],
            ['c', 'turtle'],
        ])
        expect(params).to.deep.equal(expected)
    })

    it('should return an empty string value if only the key is present for a query param', () => {
        const params = getQueryParams('http://example.com/path?a=cat&b&c=turtle')
        const expected = new Map([
            ['a', 'cat'],
            ['b', ''],
            ['c', 'turtle'],
        ])
        expect(params).to.deep.equal(expected)
    })

    context('URL having a URL query parameter value', () => {
        it('should return the param value for a url with no other query params or fragments', () => {
            const params = getQueryParams('http://example.com/some/path?url=http://example.com')
            const expected = new Map([
                ['url', 'http://example.com']
            ])
            expect(params).to.deep.equal(expected)
        })

        it('should return the param value for a url with a fragment', () => {
            const params = getQueryParams('http://example.com/some/path?url=http://example.com#foo')
            const expected = new Map([
                ['url', 'http://example.com']
            ])
            expect(params).to.deep.equal(expected)
        })

        it('should return the query param map for a url having other query params as well', () => {
            const params = getQueryParams('http://example.com/some/path?url=http://example.com?a=cat&b=dog')
            const expected = new Map([
                ['url', 'http://example.com?a=cat'],
                ['b', 'dog'],
            ])
            expect(params).to.deep.equal(expected)
        })

        it('should return the query param map for a url having other query params as well and a fragment', () => {
            const params = getQueryParams('http://example.com/some/path?url=http://example.com?a=cat&b=dog#foo')
            const expected = new Map([
                ['url', 'http://example.com?a=cat'],
                ['b', 'dog'],
            ])
            expect(params).to.deep.equal(expected)
        })
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
    it('should return a "bad url" when url is not an http url', () => {
        const urlString = 'ftp://example.com'

        const url = parseUrl(urlString)

        expect(url.isBad).to.be.true
    });

    it('should return a "bad url" when url is an invalid url', () => {
        const urlString = 'some-invalid-url'

        const url = parseUrl(urlString)

        expect(url.isBad).to.be.true
    });

    it('should return url with raw string when input is an invalid url', () => {
        const urlString = 'some-invalid-url'

        const url = parseUrl(urlString)

        expect(url.raw).to.equal(urlString)
    });

    it('should parse a url having all fields', () => {
        const urlString = 'http://example.com:9000/path?a=cat&b=dog#foo'

        const url = parseUrl(urlString)

        expect(url.isBad).to.be.false
        expect(url.protocol).to.equal('http')
        expect(url.hostname).to.equal('example.com')
        expect(url.port).to.equal('9000')
        expect(url.path).to.equal('/path')
        expect(url.query.get('a')).to.equal('cat')
        expect(url.query.get('b')).to.equal('dog')
        expect(url.fragment).to.equal('foo')
    });

    it('should return url with raw string when url is valid and has all fields', () => {
        const urlString = 'http://example.com:9000/path?a=cat&b=dog#foo'

        const url = parseUrl(urlString)

        expect(url.raw).to.equal(urlString)
    });

    it('should set the explicitly given port even if the protocol infers it: http', () => {
        const urlString = 'http://example.com:80/path'

        const url = parseUrl(urlString)

        expect(url.protocol).to.equal('http')
        expect(url.port).to.equal('80')
    });

    it('should set the explicitly given port even if the protocol infers it: https', () => {
        const urlString = 'https://example.com:443/path'

        const url = parseUrl(urlString)

        expect(url.protocol).to.equal('https')
        expect(url.port).to.equal('443')
    });

    it('should ignore the trailing query string separator of a url', () => {
        const urlString = 'http://example.com:80/path?'

        const url = parseUrl(urlString)

        expect(url.path).to.equal('/path')
        expect(url.query.size).to.equal(0)
    });

    it.skip('should ignore the trailing query string separator of a url having a fragment', () => {
        const urlString = 'http://example.com:80/path?#foo'

        const url = parseUrl(urlString)

        expect(url.path).to.equal('/path')
        expect(url.query.size).to.equal(0)
        expect(url.fragment).to.equal('foo')
    });

    it('should set a root path for a url having no path', () => {
        const urlString = 'http://example.com:80?a=cat'

        const url = parseUrl(urlString)

        expect(url.path).to.equal('/')
    });

    it('should set empty values for absent fields', () => {
        const urlString = 'http://example.com'

        const url = parseUrl(urlString)

        expect(url.port).to.equal('')
        expect(url.query.size).to.equal(0)
        expect(url.fragment).to.equal('')
    });

    it('should set the hostname of a url having subdomains', () => {
        const urlString = 'http://one.two.three.example.com:80/path'

        const url = parseUrl(urlString)

        expect(url.hostname).to.equal('one.two.three.example.com')
    });
})

describe('emptyUrl', () => {
    it('should return a url with empty fields and raw string', () => {
        const url = emptyUrl();

        expect(url.protocol).to.equal('')
        expect(url.hostname).to.equal('')
        expect(url.port).to.equal('')
        expect(url.path).to.equal('')
        expect(url.query.size).to.equal(0)
        expect(url.fragment).to.equal('')
        expect(url.raw).to.equal('')
    })
})

describe('badUrl', () => {
    it('should return url with empty fields and raw string', () => {
        const url = badUrl('some-bad-url-value')

        expect(url.protocol).to.equal('')
        expect(url.hostname).to.equal('')
        expect(url.port).to.equal('')
        expect(url.path).to.equal('')
        expect(url.query.size).to.equal(0)
        expect(url.fragment).to.equal('')
        expect(url.raw).to.equal('some-bad-url-value')
    })

    it('should return url with bad boolean true', () => {
        const url = badUrl('some-bad-url-value')

        expect(url.isBad).to.be.true
    })
})
