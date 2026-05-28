// ═══════════════════════════════════════════════════════════
// Theme Toggle — base64.tools
// ═══════════════════════════════════════════════════════════

(function() {
  const KEY = 'color-mode';

  function getMode() {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyMode(mode) {
    document.documentElement.setAttribute('data-color-mode', mode);
    localStorage.setItem(KEY, mode);
  }

  function toggleMode() {
    const current = document.documentElement.getAttribute('data-color-mode');
    applyMode(current === 'light' ? 'dark' : 'light');
  }

  // Apply on load
  applyMode(getMode());

  // Listen for system changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
    if (!localStorage.getItem(KEY)) {
      applyMode(e.matches ? 'light' : 'dark');
    }
  });

  // Expose
  window.toggleTheme = toggleMode;
  window.getThemeMode = function() { return document.documentElement.getAttribute('data-color-mode'); };
})();

// ═══════════════════════════════════════════════════════════
// Shared Utilities
// ═══════════════════════════════════════════════════════════

function showToast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show toast-' + type;
  setTimeout(function() { t.classList.remove('show'); }, 3000);
}

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText('' + text).then(function() {
      showToast('Copied!', 'success');
    }).catch(function() {
      copyFallback(text);
    });
  } else {
    copyFallback(text);
  }
}

function copyFallback(text) {
  var ta = document.createElement('textarea');
  ta.value = '' + text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showToast('Copied!', 'success'); }
  catch(e) { showToast('Copy failed', 'error'); }
  document.body.removeChild(ta);
}
