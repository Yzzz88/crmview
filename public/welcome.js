'use strict';

(function () {
  var KEY = 'yzzz-crm_demo_state_v1:intro';
  try {
    if (localStorage.getItem(KEY)) return;
  } catch (e) {}
  if (document.getElementById('welcome-backdrop')) return;

  function markSeen() {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
  }

  var wrap = document.createElement('div');
  wrap.className = 'welcome-backdrop';
  wrap.id = 'welcome-backdrop';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-modal', 'true');
  wrap.setAttribute('aria-labelledby', 'welcome-title');
  wrap.innerHTML =
    '<div class="welcome-card">' +
      '<button class="welcome-close" id="welcome-close" type="button" aria-label="关闭">✕</button>' +
      '<div class="welcome-logo" aria-hidden="true">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#001859"/><path d="M5 7h6l5 8 5-8h6l-8.5 13v6h-5v-6z" fill="white"/></svg>' +
      '</div>' +
      '<h2 id="welcome-title">欢迎来到 yzzz 的 CRM 工作台</h2>' +
      '<p>这是一套面向全渠道商家经营的 CRM。系统用已确认的客户事实和产品依据约束 Agent，分析商机时标明来源，对客动作需人工确认后再执行。</p>' +
      '<p>第一次打开可以先看项目介绍，也可以直接进入演示。</p>' +
      '<div class="welcome-actions">' +
        '<button class="btn primary" id="welcome-intro" type="button">查看项目介绍</button>' +
        '<button class="btn" id="welcome-skip" type="button">先看看演示</button>' +
      '</div>' +
    '</div>';

  function close() {
    markSeen();
    wrap.remove();
  }

  function goIntro() {
    markSeen();
    window.location.href = 'about.html';
  }

  function mount() {
    document.body.appendChild(wrap);
    document.getElementById('welcome-close').addEventListener('click', close);
    document.getElementById('welcome-skip').addEventListener('click', close);
    document.getElementById('welcome-intro').addEventListener('click', goIntro);
    wrap.addEventListener('click', function (e) {
      if (e.target === wrap) close();
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', onKey);
        close();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
