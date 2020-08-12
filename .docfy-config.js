const path = require('path');
const hbs = require('remark-hbs');
const autolinkHeadings = require('remark-autolink-headings');
const highlight = require('remark-highlight.js');
const codeImport = require('remark-code-import');

module.exports = {
  remarkPlugins: [
    [
      autolinkHeadings,
      { behavior: 'wrap' }
    ],
    hbs,
    codeImport,
    highlight
  ],

  sources: [
    {
      root: path.resolve(__dirname, '.'),
      pattern: 'README.md',
      urlSchema: 'auto',
      urlPrefix: 'docs'
    },
    {
      root: path.join(__dirname, 'docs'),
      pattern: '**/*.md',
      urlSchema: 'manual',
      urlPrefix: 'docs/ember'
    }
  ],
}