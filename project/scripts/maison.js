// Main JS: DOM interactions, template literals, localStorage, varias funciones
(function(){
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));

  // localStorage favorites
  const loadFavorites = () => {
    try{ return JSON.parse(localStorage.getItem('mb_favs')) || []; }catch(e){ return []; }
  };
  const saveFavorites = arr => localStorage.setItem('mb_favs', JSON.stringify(arr));

  // build card HTML (siempre con template literals)
  function bagCardHTML(bag, isFav){
    return `
      <article class="card" data-id="${bag.id}">
        <img src="${bag.img}" alt="${bag.name}" loading="lazy" />
        <h3>${bag.name}</h3>
        <p class="small">Tipo: ${bag.type}</p>
        <p class="price">${bag.onSale ? `<span class="badge">Oferta</span> $${(bag.salePrice||bag.price).toFixed(2)}` : `$${bag.price.toFixed(2)}`}</p>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn add-fav" data-id="${bag.id}" aria-pressed="${isFav}">${isFav? '♥ Favorito' : '♡ Favorito'}</button>
          <a class="btn" href="catalog.html#${bag.id}">Ver</a>
        </div>
      </article>
    `;
  }

  function renderList(targetSelector, items){
    const el = qs(targetSelector);
    if(!el) return;
    const favs = loadFavorites();
    el.innerHTML = items.map(b => bagCardHTML(b, favs.includes(b.id))).join('');
  }

  function initIndex(){
    renderList('#featured-list', BAGS.slice(0,3));
  }

  function initCatalog(){
    const filter = qs('#filter-type');
    const sort = qs('#sort-by');

    function applyFilters(){
      let items = BAGS.slice();
      const f = filter ? filter.value : 'all';
      if(f !== 'all') items = items.filter(b => b.type === f);

      const s = sort ? sort.value : 'featured';
      if(s === 'price-asc') items.sort((a,b) => a.price - b.price);
      else if(s === 'price-desc') items.sort((a,b) => b.price - a.price);

      renderList('#catalog-grid', items);
    }

    if(filter) filter.addEventListener('change', applyFilters);
    if(sort) sort.addEventListener('change', applyFilters);

    applyFilters();
  }

  function initDeals(){
    const deals = BAGS.filter(b => b.onSale);
    renderList('#deals-grid', deals);
  }

  function initContact(){
    const form = qs('#contact-form');
    if(!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = qs('#name').value.trim();
      const email = qs('#email').value.trim();
      const message = qs('#message').value.trim();
      const result = qs('#form-result');

      if(name.length < 2){ result.textContent = 'Por favor ingresa un nombre válido.'; return; }
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ result.textContent = 'Por favor ingresa un email válido.'; return; }
      if(message.length < 10){ result.textContent = 'El mensaje es muy corto.'; return; }

      result.textContent = 'Gracias — tu mensaje ha sido enviado.';
      form.reset();
    });
  }

  function initFavs(){
    document.addEventListener('click', e => {
      const btn = e.target.closest('.add-fav');
      if(!btn) return;
      const id = Number(btn.dataset.id);
      let favs = loadFavorites();
      const isFav = favs.includes(id);
      if(isFav) favs = favs.filter(x => x !== id);
      else favs.push(id);
      saveFavorites(favs);

      qsa('.add-fav').forEach(b => {
        const bid = Number(b.dataset.id);
        b.innerText = favs.includes(bid) ? '♥ Favorito' : '♡ Favorito';
        b.setAttribute('aria-pressed', favs.includes(bid));
      });
      btn.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:160});
    });
  }

  function initNav(){
    const t = qs('.nav-toggle');
    const nav = qs('#site-nav');
    if(!t || !nav) return;
    t.addEventListener('click', ()=>{
      const open = t.getAttribute('aria-expanded') === 'true';
      t.setAttribute('aria-expanded', String(!open));
      nav.style.display = open ? 'none' : 'flex';
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    initNav();
    initFavs();
    initContact();
    if(qs('#featured-list')) initIndex();
    if(qs('#catalog-grid')) initCatalog();
    if(qs('#deals-grid')) initDeals();
  });
})();
