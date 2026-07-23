const INCOME_CATEGORIES = [
  'Lohn / Gehalt',
  'Werkstatt-Entgelt',
  'Bürgergeld / Leistung',
  'Rente',
  'Geschenk',
  'Anderes'
];

const EXPENSE_CATEGORIES = [
  'Lebensmittel',
  'Miete',
  'Strom / Energie',
  'Handy / Internet',
  'Bus / Bahn / Auto',
  'Gesundheit',
  'Freizeit',
  'Schule / Kurs',
  'Geschenk',
  'Anderes'
];

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

const STORAGE_KEY = 'geld-planer-v2';
const OLD_STORAGE_KEY = 'geld-planer-v1';
const form = document.querySelector('#entry-form');
const list = document.querySelector('#entry-list');
const emptyState = document.querySelector('#empty-state');
const monthSelect = document.querySelector('#month-select');
const yearSelect = document.querySelector('#year-select');
const monthLabel = document.querySelector('#current-month-label');
const dateInput = document.querySelector('#date');
const categorySelect = document.querySelector('#category');
const typeRadios = document.querySelectorAll('input[name="type"]');
const totalIncomeEl = document.querySelector('#total-income');
const totalExpenseEl = document.querySelector('#total-expense');
const balanceEl = document.querySelector('#balance');
const incomeBar = document.querySelector('#income-bar');
const expenseBar = document.querySelector('#expense-bar');
const incomeBarValue = document.querySelector('#income-bar-value');
const expenseBarValue = document.querySelector('#expense-bar-value');
const categoryOverview = document.querySelector('#category-overview');
const clearMonthButton = document.querySelector('#clear-month');
const exportCsvButton = document.querySelector('#export-csv');
const exportPdfButton = document.querySelector('#export-pdf');
const exportJsonButton = document.querySelector('#export-json');
const importJsonInput = document.querySelector('#import-json');

let entries = loadEntries();

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function currentMonthISO() {
  return todayISO().slice(0, 7);
}

dateInput.value = todayISO();

function getSelectedMonthValue() {
  return `${yearSelect.value}-${monthSelect.value}`;
}

function populateMonthSelect() {
  monthSelect.innerHTML = MONTH_NAMES
    .map((name, index) => `<option value="${String(index + 1).padStart(2, '0')}">${name}</option>`)
    .join('');
}

function populateYearSelect() {
  const currentYear = Number(currentMonthISO().slice(0, 4));
  const entryYears = entries.map(entry => Number(entry.date.slice(0, 4)));
  const earliestYear = Math.min(currentYear, ...(entryYears.length ? entryYears : [currentYear]));
  const years = [];
  for (let year = currentYear + 1; year >= earliestYear - 1; year--) years.push(year);
  yearSelect.innerHTML = years.map(year => `<option value="${year}">${year}</option>`).join('');
}

populateMonthSelect();
populateYearSelect();
monthSelect.value = currentMonthISO().slice(5, 7);
yearSelect.value = currentMonthISO().slice(0, 4);

function renderCategoryOptions(type) {
  const categoryList = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const previous = categorySelect.value;
  categorySelect.innerHTML = categoryList.map(name => `<option value="${name}">${name}</option>`).join('');
  if (categoryList.includes(previous)) categorySelect.value = previous;
}

renderCategoryOptions(document.querySelector('input[name="type"]:checked').value);

typeRadios.forEach(radio => {
  radio.addEventListener('change', () => renderCategoryOptions(radio.value));
});

function loadEntries() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) return JSON.parse(current) || [];
    const old = localStorage.getItem(OLD_STORAGE_KEY);
    return old ? JSON.parse(old) || [] : [];
  } catch {
    return [];
  }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function euro(value) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

function monthLong(monthString) {
  const date = new Date(`${monthString}-01T12:00:00`);
  return new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' }).format(date);
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function formatDateShort(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

function getVisibleEntries() {
  return entries
    .filter(entry => entry.date.startsWith(getSelectedMonthValue()))
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
}

function getTotals(visible) {
  const totalIncome = visible.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = visible.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
}

function getExpenseCategories(visible) {
  const categories = new Map();
  visible.filter(e => e.type === 'expense').forEach(entry => {
    categories.set(entry.category, (categories.get(entry.category) || 0) + entry.amount);
  });
  return [...categories.entries()].sort((a, b) => b[1] - a[1]);
}

function render() {
  const visible = getVisibleEntries();
  const { totalIncome, totalExpense, balance } = getTotals(visible);

  monthLabel.textContent = monthLong(getSelectedMonthValue());
  totalIncomeEl.textContent = euro(totalIncome);
  totalExpenseEl.textContent = euro(totalExpense);
  balanceEl.textContent = euro(balance);
  balanceEl.setAttribute('aria-label', `Das bleibt übrig: ${euro(balance)}`);

  renderBars(totalIncome, totalExpense);
  renderCategories(visible, totalExpense);
  renderList(visible);
}

function renderBars(totalIncome, totalExpense) {
  const max = Math.max(totalIncome, totalExpense, 1);
  incomeBar.style.width = `${Math.round((totalIncome / max) * 100)}%`;
  expenseBar.style.width = `${Math.round((totalExpense / max) * 100)}%`;
  incomeBarValue.textContent = euro(totalIncome);
  expenseBarValue.textContent = euro(totalExpense);
}

function renderCategories(visible, totalExpense) {
  const categories = getExpenseCategories(visible);
  categoryOverview.innerHTML = '';
  if (categories.length === 0) {
    categoryOverview.innerHTML = '<div class="no-chart-data">Noch keine Ausgaben für diesen Monat.</div>';
    return;
  }
  categories.forEach(([name, amount]) => {
    const percent = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
    const row = document.createElement('div');
    row.className = 'category-row';
    row.innerHTML = `
      <div class="category-name">${escapeHTML(name)}</div>
      <div class="category-track" aria-label="${escapeHTML(name)}: ${percent} Prozent der Ausgaben">
        <div class="category-bar" style="width: ${percent}%"></div>
      </div>
      <div class="category-amount">${euro(amount)}</div>
    `;
    categoryOverview.appendChild(row);
  });
}

function renderList(visible) {
  list.innerHTML = '';
  emptyState.hidden = visible.length > 0;

  visible.forEach(entry => {
    const item = document.createElement('li');
    item.className = 'entry-item';
    const amountText = `${entry.type === 'expense' ? '-' : '+'}${euro(entry.amount)}`;
    const typeText = entry.type === 'income' ? 'Geld bekommen' : 'Geld ausgegeben';
    item.innerHTML = `
      <div class="entry-top">
        <div>
          <div class="entry-title">${escapeHTML(entry.category)}</div>
          <div class="entry-meta">${formatDate(entry.date)} · ${typeText}</div>
          ${entry.note ? `<div>${escapeHTML(entry.note)}</div>` : ''}
        </div>
        <div class="entry-amount">${amountText}</div>
      </div>
      <button class="danger" type="button" data-delete="${entry.id}">Eintrag löschen</button>
    `;
    list.appendChild(item);
  });
}

function escapeHTML(text) {
  return String(text).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
  }[char]));
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const amount = Number(data.get('amount'));
  if (!amount || amount <= 0) {
    showToast('Bitte einen Betrag eintragen.');
    return;
  }
  entries.push({
    id: crypto.randomUUID(),
    type: data.get('type'),
    amount,
    category: data.get('category'),
    note: data.get('note').trim(),
    date: data.get('date'),
    createdAt: new Date().toISOString()
  });
  saveEntries();
  form.reset();
  dateInput.value = todayISO();
  document.querySelector('input[name="type"][value="income"]').checked = true;
  renderCategoryOptions('income');
  render();
  showToast('Eintrag gespeichert.');
});

list.addEventListener('click', event => {
  const id = event.target?.dataset?.delete;
  if (!id) return;
  const entry = entries.find(item => item.id === id);
  if (!entry) return;
  if (confirm('Diesen Eintrag wirklich löschen?')) {
    entries = entries.filter(item => item.id !== id);
    saveEntries();
    render();
    showToast('Eintrag gelöscht.');
  }
});

monthSelect.addEventListener('change', render);
yearSelect.addEventListener('change', render);

clearMonthButton.addEventListener('click', () => {
  const visible = getVisibleEntries();
  if (visible.length === 0) {
    showToast('In diesem Monat gibt es keine Einträge.');
    return;
  }
  if (confirm('Alle Einträge in diesem Monat löschen?')) {
    const ids = new Set(visible.map(entry => entry.id));
    entries = entries.filter(entry => !ids.has(entry.id));
    saveEntries();
    render();
    showToast('Monat gelöscht.');
  }
});

exportCsvButton.addEventListener('click', () => {
  const visible = getVisibleEntries();
  const rows = [
    ['Datum', 'Datum ISO', 'Art', 'Kategorie', 'Notiz', 'Betrag'],
    ...visible.map(entry => [
      formatDateShort(entry.date),
      entry.date,
      entry.type === 'income' ? 'Geld bekommen' : 'Geld ausgegeben',
      entry.category,
      entry.note,
      entry.type === 'expense' ? -entry.amount : entry.amount
    ])
  ];
  const csv = rows.map(row => row.map(csvCell).join(';')).join('\n');
  downloadFile(`geld-planer-${getSelectedMonthValue()}.csv`, '\ufeff' + csv, 'text/csv;charset=utf-8');
});

exportPdfButton.addEventListener('click', () => {
  openPrintReport();
});

function csvCell(value) {
  const text = String(value ?? '').replace(/"/g, '""');
  return `"${text}"`;
}

exportJsonButton.addEventListener('click', () => {
  const data = JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), entries }, null, 2);
  downloadFile(`geld-planer-sicherung-${todayISO()}.json`, data, 'application/json');
});

importJsonInput.addEventListener('change', async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data.entries)) throw new Error('Keine Einträge gefunden.');
    if (!confirm('Sicherung einlesen? Die Daten auf diesem Gerät werden ersetzt.')) return;
    entries = data.entries;
    saveEntries();
    const keepMonth = monthSelect.value;
    const keepYear = yearSelect.value;
    populateYearSelect();
    monthSelect.value = keepMonth;
    yearSelect.value = yearSelect.querySelector(`option[value="${keepYear}"]`) ? keepYear : currentMonthISO().slice(0, 4);
    render();
    showToast('Sicherung eingelesen.');
  } catch {
    showToast('Die Datei konnte nicht gelesen werden.');
  } finally {
    importJsonInput.value = '';
  }
});

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function openPrintReport() {
  const visible = getVisibleEntries();
  const { totalIncome, totalExpense, balance } = getTotals(visible);
  const categories = getExpenseCategories(visible);
  const reportWindow = window.open('', '_blank');
  if (!reportWindow) {
    showToast('Das PDF-Fenster konnte nicht geöffnet werden.');
    return;
  }

  const max = Math.max(totalIncome, totalExpense, 1);
  const categoryMax = Math.max(...categories.map(([, amount]) => amount), 1);
  const rows = visible.map(entry => `
    <tr>
      <td>${formatDate(entry.date)}</td>
      <td>${entry.type === 'income' ? 'Geld bekommen' : 'Geld ausgegeben'}</td>
      <td>${escapeHTML(entry.category)}</td>
      <td>${escapeHTML(entry.note || '')}</td>
      <td class="amount">${entry.type === 'expense' ? '-' : '+'}${euro(entry.amount)}</td>
    </tr>
  `).join('');

  const categoryRows = categories.length ? categories.map(([name, amount]) => `
    <div class="cat">
      <strong>${escapeHTML(name)}</strong>
      <div class="track"><div style="width:${Math.round((amount / categoryMax) * 100)}%"></div></div>
      <span>${euro(amount)}</span>
    </div>
  `).join('') : '<p>Noch keine Ausgaben für diesen Monat.</p>';

  reportWindow.document.write(`
    <!doctype html>
    <html lang="de">
    <head>
      <meta charset="utf-8">
      <title>Mein Geld im Blick – ${monthLong(getSelectedMonthValue())}</title>
      <style>
        body { font-family: Arial, sans-serif; color: #18365d; margin: 2rem; line-height: 1.4; }
        h1 { margin-bottom: .2rem; }
        .month { font-size: 1.4rem; font-weight: 700; margin-top: 0; }
        .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: .7rem; margin: 1rem 0; }
        .card { border: 1px solid #dce6ef; border-radius: 14px; padding: .8rem; background: #ffffff; }
        .card strong { display: block; font-size: 1.4rem; margin-top: .2rem; }
        .chart { margin: 1.2rem 0; }
        .bar-row, .cat { display: grid; grid-template-columns: 8rem 1fr 7rem; gap: .6rem; align-items: center; margin: .4rem 0; }
        .track { height: 1rem; background: #e9eef4; border-radius: 999px; overflow: hidden; border: 1px solid #dce6ef; }
        .track div { height: 100%; background: #1f8a84; border-radius: 999px; }
        .expense .track div, .cat .track div { background: #ef7b45; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: .95rem; }
        th, td { border-bottom: 1px solid #dce6ef; padding: .45rem; text-align: left; vertical-align: top; }
        th { background: #f6f8fb; }
        .amount { text-align: right; white-space: nowrap; }
        .hint { margin-top: 1.5rem; color: #607086; font-size: .9rem; }
        @media print { body { margin: 1.2cm; } button { display: none; } }
      </style>
    </head>
    <body>
      <h1>Mein Geld im Blick</h1>
      <p class="month">${monthLong(getSelectedMonthValue())}</p>
      <div class="cards">
        <div class="card">Einnahmen<strong>${euro(totalIncome)}</strong></div>
        <div class="card">Ausgaben<strong>${euro(totalExpense)}</strong></div>
        <div class="card">Das bleibt übrig<strong>${euro(balance)}</strong></div>
      </div>
      <section class="chart">
        <h2>Einfache Übersicht</h2>
        <div class="bar-row"><strong>Einnahmen</strong><div class="track"><div style="width:${Math.round((totalIncome / max) * 100)}%"></div></div><strong>${euro(totalIncome)}</strong></div>
        <div class="bar-row expense"><strong>Ausgaben</strong><div class="track"><div style="width:${Math.round((totalExpense / max) * 100)}%"></div></div><strong>${euro(totalExpense)}</strong></div>
        <h2>Ausgaben nach Kategorien</h2>
        ${categoryRows}
      </section>
      <h2>Einträge</h2>
      <table>
        <thead><tr><th>Datum</th><th>Art</th><th>Kategorie</th><th>Notiz</th><th class="amount">Betrag</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="5">Noch keine Einträge für diesen Monat.</td></tr>'}</tbody>
      </table>
      <p class="hint">© Elisabeth Vanderheiden</p><p class="hint">Zum Speichern als PDF: Im Druckfenster „Als PDF sichern“ oder „PDF speichern“ wählen.</p>
      <script>window.onload = () => setTimeout(() => window.print(), 250);<\/script>
    </body>
    </html>
  `);
  reportWindow.document.close();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {
      // Die App funktioniert auch ohne Service Worker.
    });
  });
}

render();
