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
  try {
    const res = await fetch(APPS_SCRIPT_URL + '?action=get', {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
    });
    if (!res.ok) return [];
    const text = await res.text();
    const data = JSON.parse(text);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.profissionais)) return data.profissionais;
    return [];
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