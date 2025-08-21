// Slideshows: cycle images inside each .category-slideshow
(function initializeSlideshows() {
  const slideshows = document.querySelectorAll('.category-slideshow');
  slideshows.forEach((slideshow) => {
    const slides = Array.from(slideshow.querySelectorAll('.slide-img'));
    if (slides.length === 0) return;
    let currentIndex = 0;
    slides[currentIndex].classList.add('active');
    setInterval(() => {
      slides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('active');
    }, 3000);
  });
})();

// Product selection state
const selectedProducts = new Set();

document.querySelectorAll('.product-card .select-product').forEach((checkbox) => {
  const card = checkbox.closest('.product-card');
  const productName = card?.getAttribute('data-name');
  checkbox.addEventListener('change', () => {
    if (!productName) return;
    if (checkbox.checked) {
      selectedProducts.add(productName);
    } else {
      selectedProducts.delete(productName);
    }
  });
});

// Material selection
let selectedMaterialRef = '';
const materialSelect = document.getElementById('material-select');
if (materialSelect) {
  materialSelect.addEventListener('change', () => {
    selectedMaterialRef = materialSelect.value;
  });
}

// Filters and search
const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');
const filterStyle = document.getElementById('filter-style');
const filterMaterial = document.getElementById('filter-material');

function applyFilters() {
  const q = (searchInput?.value || '').toLowerCase();
  const cat = filterCategory?.value || '';
  const style = filterStyle?.value || '';
  const mat = filterMaterial?.value || '';
  document.querySelectorAll('.product-card').forEach((card) => {
    const name = (card.getAttribute('data-name') || '').toLowerCase();
    const cardCat = card.getAttribute('data-category') || '';
    const cardStyle = card.getAttribute('data-style') || '';
    const materials = (card.getAttribute('data-materials') || '').split(',').filter(Boolean);
    const matchesText = !q || name.includes(q);
    const matchesCat = !cat || cardCat === cat;
    const matchesStyle = !style || cardStyle === style;
    const matchesMaterial = !mat || materials.includes(mat);
    card.style.display = (matchesText && matchesCat && matchesStyle && matchesMaterial) ? '' : 'none';
  });
}

[searchInput, filterCategory, filterStyle, filterMaterial].forEach((el) => {
  if (!el) return;
  el.addEventListener('input', applyFilters);
  el.addEventListener('change', applyFilters);
});

// WhatsApp quotation flow
const quoteButton = document.getElementById('request-quote');
if (quoteButton) {
  quoteButton.addEventListener('click', () => {
    const locationPin = (document.getElementById('location-pin')?.value || '').trim();
    const productsList = Array.from(selectedProducts);

    let message = 'Hello Ekhaya Home Solutions,%0A%0AI\'d like a quotation.%0A';
    if (productsList.length) {
      message += `%0AProducts:%20${encodeURIComponent(productsList.join(', '))}`;
    } else {
      message += `%0AProducts:%20(please advise)`;
    }
    if (selectedMaterialRef) {
      message += `%0ACabinet%20material%20ref:%20${encodeURIComponent(selectedMaterialRef)}`;
    }
    if (locationPin) {
      message += `%0ALocation%20pin:%20${encodeURIComponent(locationPin)}`;
    }
    message += '%0A%0AThank you.';

    const phone = '27677539066';
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
  });
}

