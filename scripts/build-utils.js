'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function write(file, content) {
  const target = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function clean(value, removeLineComments = false) {
  let output = value
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  if (removeLineComments) output = output.replace(/^\s*\/\/.*$/gm, '');
  return output.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function extract(block, pattern) {
  const values = [];
  let match;
  while ((match = pattern.exec(block)) !== null) values.push(match[1].trim());
  return values;
}

function extractStyles(html) {
  return extract(html, /<style>([\s\S]*?)<\/style>/g).join('\n');
}

function extractInlineJs(html) {
  return extract(html, /<script>([\s\S]*?)<\/script>/g).join('\n');
}

function extractLibSrc(html) {
  return extract(html, /<script src="([^"]+)"><\/script>/g);
}

function withoutStyleBlocks(html) {
  return html.replace(/<style>[\s\S]*?<\/style>/gi, '');
}

module.exports = {
  ROOT,
  read,
  write,
  clean,
  cleanHtml: value => clean(value),
  cleanCss: value => clean(value),
  cleanJs: value => clean(value),
  cleanPreview: value => clean(value, true),
  extractStyles,
  extractInlineJs,
  extractLibSrc,
  withoutStyleBlocks,
};
