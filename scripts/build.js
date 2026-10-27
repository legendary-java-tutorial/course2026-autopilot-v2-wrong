// Сборка сайта: каждая страница pages/*.md → _site/*.html
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { readPage } = require('./pages');

const out = '_site';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const file of fs.readdirSync('pages').filter((f) => f.endsWith('.md'))) {
  const page = readPage(path.join('pages', file));
  const html = `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8"><title>${page.title}</title></head>
<body>
${marked.parse(page.body)}
<footer><small>${page.date}</small></footer>
</body>
</html>
`;
  fs.writeFileSync(path.join(out, file.replace(/\.md$/, '.html')), html);
  console.log(`собрано: ${file}`);
}
