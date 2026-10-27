// Чтение страницы: блок полей между строками --- и текст после него
const fs = require('fs');

function readPage(file) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fields = {};
  if (match) {
    for (const line of match[1].split('\n')) {
      const [key, ...rest] = line.split(':');
      fields[key.trim()] = rest.join(':').trim();
    }
  }
  return { title: fields.title, date: fields.date, body: match ? match[2] : text };
}

module.exports = { readPage };
