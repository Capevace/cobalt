const {
  parseCobaltMarkdown,
  generateCobaltMarkdown
} = require('./cobalt-markdown');

describe('cobalt-markdown parsing', () => {
  const exampleContent = `{"test": true}\n---\n\n# Some test content here\nMaybe some more`;
  const brokenContentSeparator = `{"test": true}\n--\n\n# Some test content here\nMaybe some more`;
  const brokenContentMeta = `{"invalid json"}\n---\n\n# Some test content here\nMaybe some more`;

  // Parse example content
  it('should parse example content', () => {
    expect(parseCobaltMarkdown(exampleContent)).toEqual({
      meta: { test: true },
      content: '# Some test content here\nMaybe some more'
    });
  });

  // Not parse invalid content
  it('should not parse invalid content', () => {
    expect(() => parseCobaltMarkdown(brokenContentSeparator)).toThrow();
    expect(() => parseCobaltMarkdown(brokenContentMeta)).toThrow();
  });
});

describe('cobalt-markdown generation', () => {
  const validMeta = { someValidMeta: true };
  const invalidMeta = { invalid: true, becauseOfThis: () => {} };
  const content = '# Some test content here\nMaybe some more';

  it('should generate readable COMD', () => {
    expect(generateCobaltMarkdown(validMeta, content, true)).toBe(
      '{\n  "someValidMeta": true\n}\n---\n\n# Some test content here\nMaybe some more\n'
    );
  });

  it('should generate COMD', () => {
    expect(generateCobaltMarkdown(validMeta, content)).toBe(
      '{"someValidMeta":true}\n---\n# Some test content here\nMaybe some more'
    );
  });

  it('should not generate COMD', () => {
    expect(() => parseCobaltMarkdown(invalidMeta, content)).toThrow();
  });
});
