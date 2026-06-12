// === ServiçoSol — main.js ===

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

// === LocalStorage helpers ===
function getProfissionais() {
  return JSON.parse(localStorage.getItem('profissionais') || '[]');
}
function saveProfissionais(list) {
  localStorage.setItem('profissionais', JSON.stringify(list));
}


