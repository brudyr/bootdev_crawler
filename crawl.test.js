const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl");

describe("normalize url", () => {
  test("normalize invalid url", () => {
    expect(normalizeURL("wurstbrot")).toBe(null)
  })

  test("normalize valid url", () => {
    expect(normalizeURL("http://boot.dev")).toBe("boot.dev")
  })

  test("normalize valid url with path", () => {
    expect(normalizeURL("http://boot.dev/api/v1/")).toBe("boot.dev/api/v1")
  })

  test("normalize valid url with search", () => {
    expect(normalizeURL("http://boot.dev?search=123")).toBe("boot.dev?search=123")
  })

  test("normalize valid url with hash", () => {
    expect(normalizeURL("http://boot.dev#sources")).toBe("boot.dev#sources")
  })

  test("normalize valid url with everything", () => {
    expect(normalizeURL("http://boot.dev/api/v1?search=123#sources")).toBe("boot.dev/api/v1?search=123#sources")
  })
})

describe("get urls from html", () => {
  test("containing no links", () => {
    expect(getURLsFromHTML('<!DOCTYPE html><p>Hello world</p>', "none")).toHaveLength(0)
  })

  test("containing one link", () => {
    expect(getURLsFromHTML('<!DOCTYPE html><p>Hello world</p><a href="https://boot.dev">Learn Backend Development</a>', "none")).toHaveLength(1)
  })

  test("containing multiple links", () => {
    expect(getURLsFromHTML('<!DOCTYPE html><p>Hello world</p><a href="https://boot.dev">Learn Backend Development</a><a href="https://boot.dev">Learn Backend Development</a><a href="https://boot.dev">Learn Backend Development</a>', "none")).toHaveLength(3)
  })

  test("links to have correct baseURL", () => {
    const links = getURLsFromHTML('<!DOCTYPE html><p>Hello world</p><a href="/home">Home</a><a href="/contact">Contact</a><a href="/blog">Blog</a>', "https://boot.dev")
    expect(links).toHaveLength(3)
    expect(links[0]).toBe("https://boot.dev/home")
    expect(links[1]).toBe("https://boot.dev/contact")
    expect(links[2]).toBe("https://boot.dev/blog")
  })
})
