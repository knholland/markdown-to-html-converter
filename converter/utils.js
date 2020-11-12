function convertText (markdownText = '') {
  // https://regex101.com/r/lAZx1a/1
  const headingRegex = new RegExp('(#+)(.*)');
  const supportedHeadings = {
    '#': (text = '') => `<h1>${text.trim()}</h1>`,
    '##': (text = '') => `<h2>${text.trim()}</h2>`,
    '###': (text = '') => `<h3>${text.trim()}</h3>`,
    '####': (text = '') => `<h4>${text.trim()}</h4>`,
    '#####': (text = '') => `<h5>${text.trim()}</h5>`,
    '######': (text = '') => `<h6>${text.trim()}</h6>`,
    default: (text = '') => text ? `<p>${text.trim()}</p>` : ''
  };
  const match = markdownText.match(headingRegex);
  const convertedHeading = match ? supportedHeadings[match[1]](match[2]) : supportedHeadings.default(markdownText);
  return convertLinks(convertedHeading);
}

function convertLinks(text) {
  // https://regex101.com/r/7yJP3w/1
  const match = text && text.match(/\[(.+)\]\(([^ ]+?)( "(.+)")?\)/);
  return match ? text.replace(match[0], `<a href="${match[2]}">${match[1]}</a>`) : text;
}

function convertToHtml (markdownText) {
  const html = [];
  const splitMarkdown = splitLines(markdownText);

  for (const line of splitMarkdown) {
    const convertedLine = convertText(line.trim());
    html.push(convertedLine);
  }

  return html.join('\n');
}

function splitLines(markdownBlob) {
  return markdownBlob.split('\n');
}

module.exports = {
  convertLinks,
  convertText,
  convertToHtml,
  splitLines
};