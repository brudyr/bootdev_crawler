const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl");

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

