// === ServiçoSol — main.js ===

// ─── CONFIGURAÇÃO ───────────────────────────────────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJgkx47qfXLi51fqmD0ganU26_LaewHvM70pTPLfuYSfqtd7IcBt6FJmHmEWsePkxZ/exec';
// ────────────────────────────────────────────────────────────────

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navBottom = document.querySelector('.navbar-bottom');
if (hamburger && navBottom) {
  hamburger.addEventListener('click', () => navBottom.classList.toggle('open'));
}

// Busca da hero → redireciona para profissionais com query
function buscarServico() {
  const val = document.getElementById('searchInput')?.value.trim();
  if (val) {
    window.location.href = `profissionais.html?q=${encodeURIComponent(val)}`;
  } else {
    window.location.href = 'profissionais.html';
  }
}
document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') buscarServico();
});

// === Banco de dados: Google Sheets via Apps Script ===

async function getProfissionais() {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'COLE_SUA_URL_AQUI') {
    // Fallback para localStorage enquanto não configurar o Apps Script
    return JSON.parse(localStorage.getItem('profissionais') || '[]');
  }
  try {
    const res = await fetch(APPS_SCRIPT_URL + '?action=get');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Erro ao buscar profissionais:', e);
    return [];
  }
}

async function saveProfissional(profissional) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'COLE_SUA_URL_AQUI') {
    // Fallback para localStorage enquanto não configurar o Apps Script
    const lista = JSON.parse(localStorage.getItem('profissionais') || '[]');
    lista.push(profissional);
    localStorage.setItem('profissionais', JSON.stringify(lista));
    return { ok: true };
  }
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'save', data: profissional }),
  });
  return res.json();
}