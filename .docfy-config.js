const path = require('path');

module.exports = {
    sources: [
        {
          root: path.resolve(__dirname, '.'),
          pattern: 'README.md',
          urlSchema: 'manual',
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