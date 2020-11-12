const { convertLinks, convertText, convertToHtml, splitLines } = require('../utils.js');
const { mocks } = require('./mocks.js');

describe('convertLinks()', () => {
  it('should convert a link inside a heading tag', () => {
      expect(convertLinks('<h1>This is a header [with a link](http://yahoo.com)</h1>')).toEqual('<h1>This is a header <a href="http://yahoo.com">with a link</a></h1>');
  });
  it('should convert a link inside a p tag', () => {
      expect(convertLinks('<p>This is a paragraph [with a link](http://yahoo.com)</p>')).toEqual('<p>This is a paragraph <a href="http://yahoo.com">with a link</a></p>');
  });
  it('should convert standalone link', () => {
      expect(convertLinks('[with a link](http://yahoo.com)')).toEqual('<a href="http://yahoo.com">with a link</a>');
  });
});

describe('convertText', () => {
  it('should convert a heading 1', () => {
    expect(convertText('# Heading 1')).toEqual('<h1>Heading 1</h1>');
  });
  it('should convert a heading 2', () => {
    expect(convertText('## Heading 2')).toEqual('<h2>Heading 2</h2>');
  });
  it('should convert a heading 3', () => {
    expect(convertText('### Heading 3')).toEqual('<h3>Heading 3</h3>');
  });
  it('should convert a heading 4', () => {
    expect(convertText('#### Heading 4')).toEqual('<h4>Heading 4</h4>');
  });
  it('should convert a heading 5', () => {
    expect(convertText('##### Heading 5')).toEqual('<h5>Heading 5</h5>');
  });
  it('should convert a heading 6', () => {
    expect(convertText('###### Heading 6')).toEqual('<h6>Heading 6</h6>');
  });
  it('should not convert empty strings', () => {
    expect(convertText()).toEqual('');
  });
  it('should convert any text not a heading to a p tag', () => {
    expect(convertText('plain text')).toEqual('<p>plain text</p>');
  })
  it('should convert a link inside a heading', () => {
    expect(convertText('# This is a header [with a link](http://yahoo.com)')).toEqual('<h1>This is a header <a href="http://yahoo.com">with a link</a></h1>');
  });
  it('should convert a link inside a p tag', () => {
    expect(convertText('This is a paragraph [with a link](http://yahoo.com)')).toEqual('<p>This is a paragraph <a href="http://yahoo.com">with a link</a></p>');
    expect(convertText('This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.')).toEqual('<p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>');
  });
  it('should keep punctuation', () => {
    expect(convertText('Hello!')).toEqual('<p>Hello!</p>');
    expect(convertText('This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.')).toEqual('<p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>');
  });
});

describe('convertToHtml()', () => {
  it('should convert mocks', () => {
    for(const mock of mocks) {
      expect(convertToHtml(mock.input).replace(/\s/g, '')).toEqual(mock.output.replace(/\s/g, ''));
    }
  });
});

describe('splitLines()', () => {
  it('should split a markdown text input into an array', () => {
    const sample = `# Header one

      Hello there

      How are you?
      What's going on?

      ## Another Header

      This is a paragraph [with an inline link](http://google.com). Neat, eh?

      ## This is a header [with a link](http://yahoo.com)`;
    const result = splitLines(sample);
    expect(Array.isArray(result)).toEqual(true);
  });
  it('should handle one line of markdown text into an array', () => {
    const sample = '# Header one';
    expect(splitLines(sample)).toEqual(['# Header one']);
  })
});