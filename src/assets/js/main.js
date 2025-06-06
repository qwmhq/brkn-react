// 1) Generate the 40 product tiles
const products = [
  { file: 'giran.png', name: 'Giran S4BR Deck', price: '₦100,000', slug: 'giran-s4br-deck' },
  { file: 'wheel.png', name: 'Generis S4BR Wheel', price: '₦10,000 x 4', slug: 'generis-s4br-wheel' },
  { file: 'fs.png', name: 'FS S4BR Shirt', price: '₦20,000', slug: 'fs-s4br-shirt' },
  { file: 'convergence-front.png', name: 'Convergence S4BR Windbreaker', price: '₦50,000', slug: 'convergence-s4br-windbreaker' },
  { file: 'itutu.png', name: 'Itutu S4BR Deck', price: '₦FS', slug: 'itutu-s4br-deck' },
  { file: 'gxng.png', name: 'Gxng S4BR Deck', price: '₦100,000', slug: 'gxng-s4br-deck' },
  { file: '000.png', name: '000 S3BR Shirt', price: '₦20,000', slug: '000-s3br-shirt' },
  { file: 'stickers.png', name: 'Stciker Pack S4BR', price: '₦5,000', slug: 'sticker-pack-s4br' },
  { file: 'irony-white.png', name: 'Irony S4BR Socks', price: '₦10,000', slug: 'irony-s4br-socks' },
  { file: 'oraca-black.png', name: 'Oraca S4BR Socks', price: '₦10,000', slug: 'oraca-s4br-socks' },
  { file: 'maelstrom.png', name: 'Maelstrom S4BR Deck', price: '₦100,000', slug: 'maelstrom-s4br-deck' },
  { file: 'legacy.png', name: 'Legacy S4BR Deck', price: '₦100,000', slug: 'legacy-s4br-deck' },

  { file: 'opal.png', name: 'Opal S4BR Deck', price: '₦100,000', slug: 'opal-s4br-deck' },

  { file: 'wura.png', name: 'Wura S4BR Deck', price: '₦100,000', slug: 'wura-s4br-deck' },

  // …add any other unique product definitions here…
];

const cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const enterButton = document.getElementById('enter-button');
  const app = document.getElementById('app');

  // Fade out loader & reveal app
  enterButton.addEventListener('click', () => {
    loader.classList.add('loader--loaded');
    loader.addEventListener('transitionend', () => {
      loader.style.display = 'none';
      app.hidden = false;
    }, { once: true });

    // Called whenever we need to skip loader
    function showAppInstantly() {
      loader.style.display = 'none';
      app.hidden = false;
    }

    // If we've already hidden the loader this session, do it now
    if (sessionStorage.getItem('loaderHidden')) {
      showAppInstantly();
    } else {
      // First visit: wait for user to enter
      enterButton.addEventListener('click', () => {
        loader.classList.add('loader--loaded');
        loader.addEventListener('transitionend', () => {
          // hide loader, reveal app
          loader.style.display = 'none';
          app.hidden = false;
          // remember for the rest of this session
          sessionStorage.setItem('loaderHidden', 'true');
        }, { once: true });
      });
    }
  });

  // Also handle page restore from bfcache (back/forward)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted && sessionStorage.getItem('loaderHidden')) {
      const loader = document.getElementById('loader');
      const app = document.getElementById('app');
      loader.style.display = 'none';
      app.hidden = false;
    }

    document.body.classList.remove('no-scroll');
  });

});

// 1) Submit search on Enter
const searchInput = document.querySelector('.site-nav__search');
const searchResults = document.getElementById('search-results');

// Function to filter products based on search query
function searchProducts(query) {
  query = query.toLowerCase();
  const results = products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.price.toLowerCase().includes(query)
  );
  return results;
}

// Function to create search result HTML
function createSearchResultHTML(product) {
  return `
    <a href="product.html?slug=${encodeURIComponent(product.slug)}" class="search-result-item">
      <img src="assets/img/products/${encodeURIComponent(product.file)}" alt="${product.name}" />
      <div class="search-result-details">
        <div class="search-result-name">${product.name}</div>
        <div class="search-result-price">${product.price}</div>
      </div>
    </a>
  `;
}

// Handle search input
searchInput.addEventListener('input', e => {
  const query = e.target.value.trim();
  
  if (query.length >= 2) {
    const results = searchProducts(query);
    if (results.length > 0) {
      searchResults.innerHTML = results.map(createSearchResultHTML).join('');
      searchResults.style.display = 'block';
    } else {
      searchResults.innerHTML = '<div class="no-results">No products found</div>';
      searchResults.style.display = 'block';
    }
  } else {
    searchResults.style.display = 'none';
  }
});

// Close search results when clicking outside
document.addEventListener('click', e => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = searchInput.value.trim();
    if (q) {
      window.location.href = `/search?q=${encodeURIComponent(q)}`;
    }
  }
});

// 2) (Optional) Fetch live shop count
const shopCountEl = document.querySelector('.site-nav__shop-count');
fetch('/api/products/count')
  .then(res => res.json())
  .then(data => {
    shopCountEl.textContent = data.count.toLocaleString();
  })
  .catch(() => {
    /* silent fail—keep the placeholder number */
  });


document.addEventListener('DOMContentLoaded', () => {
  const total = 40;
  const grid = document.getElementById('product-grid');

  for (let i = 0; i < total; i++) {
    const { file, name, price, slug } = products[i % products.length];

    const tile = document.createElement('div');
    tile.className = 'product-item';
    tile.dataset.name = name;
    tile.dataset.price = price;

    const link = document.createElement('a');
    link.href = `product.html?slug=${encodeURIComponent(slug)}`;
    link.title = name;

    const img = document.createElement('img');
    img.src = `assets/img/products/${encodeURIComponent(file)}`;
    img.alt = name;

    link.appendChild(img);
    tile.appendChild(link);
    grid.appendChild(tile);
  }

  // 2) Tooltip logic
  const tooltip = document.getElementById('tooltip');
  document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const name = item.dataset.name || '';
      const price = item.dataset.price || '';
      tooltip.innerHTML = `<strong>${name}</strong><br>${price}`;
      tooltip.classList.add('visible');
    });
    item.addEventListener('mousemove', e => {
      tooltip.style.left = `${e.clientX + 12}px`;
      tooltip.style.top = `${e.clientY + 12}px`;
    });
    item.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
});

