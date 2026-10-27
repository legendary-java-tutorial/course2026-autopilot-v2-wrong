// Тесты страниц: у каждой есть title и date, ссылки *.html ведут на страницы из pages/
const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert');
const { readPage } = require('./pages');

const files = fs.readdirSync('pages').filter((f) => f.endsWith('.md'));
const names = new Set(files.map((f) => f.replace(/\.md$/, '.html')));

for (const file of files) {
  const page = readPage(path.join('pages', file));
  test(`${file}: есть заголовок`, () => assert.ok(page.title, 'нет поля title'));
  test(`${file}: есть дата`, () => assert.match(page.date || '', /^\d{4}-\d{2}-\d{2}$/, 'нет поля date вида ГГГГ-ММ-ДД'));
  test(`${file}: ссылки ведут на страницы сайта`, () => {
    for (const [, link] of page.body.matchAll(/\]\(([^)]+\.html)\)/g)) {
      assert.ok(names.has(link), `битая ссылка: ${link}`);
    }
  });
}
