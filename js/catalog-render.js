import { supabase } from "./supabase-init.js";

const WHATSAPP_ICON_PATH = `<path fill="currentColor" d="M16.001 3C9.11 3 3.5 8.61 3.5 15.5c0 2.36.66 4.57 1.8 6.46L3 29l7.24-2.26a12.44 12.44 0 0 0 5.76 1.43h.01c6.89 0 12.5-5.61 12.5-12.5S22.89 3 16.001 3zm0 22.7h-.01a10.35 10.35 0 0 1-5.28-1.45l-.38-.22-4.3 1.34 1.37-4.19-.25-.43a10.34 10.34 0 0 1-1.6-5.5C5.531 9.75 10.28 5 16.001 5c2.77 0 5.37 1.08 7.33 3.04a10.3 10.3 0 0 1 3.03 7.32c0 5.75-4.75 10.34-10.33 10.34zm5.66-7.74c-.31-.16-1.84-.91-2.12-1.01-.29-.11-.5-.16-.7.16-.21.31-.8 1.01-.98 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.06-1.09 2.6s1.12 3.02 1.28 3.23c.16.21 2.2 3.36 5.33 4.71.75.32 1.33.51 1.78.66.75.24 1.43.2 1.97.13.6-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.28-.21-.59-.36z"/>`;

const selectedProducts = new Map();

const orderBar = document.getElementById("order-bar");
const orderBarCount = document.getElementById("order-bar-count");
const orderBarButton = document.getElementById("order-bar-button");
const orderBarClear = document.getElementById("order-bar-clear");

function parsePrice(value) {
  if (!value) return NaN;
  const normalized = value.replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", ".");
  return parseFloat(normalized);
}

function buildWhatsappLink(productName) {
  const message = `Olá! Tenho interesse no produto: ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildWhatsappLinkMultiple(items) {
  const lines = items.map((item) => `- ${item.name}${item.price ? ` (${item.price})` : ""}`);
  const message = `Olá! Tenho interesse nos seguintes produtos:\n${lines.join("\n")}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function updateOrderBar() {
  const count = selectedProducts.size;

  if (count === 0) {
    orderBar.hidden = true;
    return;
  }

  orderBar.hidden = false;
  orderBarCount.textContent = count === 1 ? "1 produto selecionado" : `${count} produtos selecionados`;
  orderBarButton.href = buildWhatsappLinkMultiple(Array.from(selectedProducts.values()));
}

function toggleSelection(key, product, checked) {
  if (checked) {
    selectedProducts.set(key, product);
  } else {
    selectedProducts.delete(key);
  }
  updateOrderBar();
}

orderBarClear.addEventListener("click", () => {
  selectedProducts.clear();
  document.querySelectorAll(".card__select-input:checked").forEach((input) => {
    input.checked = false;
    input.closest(".card").classList.remove("card--selected");
  });
  updateOrderBar();
});

function buildCard(product, key) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.name = product.name.toLowerCase();
  card.dataset.category = product.category || "Outros";

  const currentValue = parsePrice(product.price);
  const originalValue = parsePrice(product.original_price);
  const hasDiscount = product.original_price && originalValue > currentValue;
  const discountPct = hasDiscount ? Math.round((1 - currentValue / originalValue) * 100) : 0;

  card.innerHTML = `
    <div class="card__image-wrap">
      <label class="card__select">
        <input type="checkbox" class="card__select-input">
        <span class="card__select-box"></span>
      </label>
      ${hasDiscount ? `<span class="card__discount-badge">-${discountPct}%</span>` : ""}
      <img class="card__image" src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="card__body">
      <h3 class="card__name">${product.name}</h3>
      ${product.price ? `
        <p class="card__price-row">
          ${hasDiscount ? `<span class="card__price-original">${product.original_price}</span>` : ""}
          <span class="card__price">${product.price}</span>
        </p>
      ` : ""}
      <a class="card__button" href="${buildWhatsappLink(product.name)}" target="_blank" rel="noopener noreferrer">
        <svg class="card__button-icon" viewBox="0 0 32 32" aria-hidden="true">${WHATSAPP_ICON_PATH}</svg>
        <span>Encomendar agora</span>
      </a>
    </div>
  `;

  const checkbox = card.querySelector(".card__select-input");
  checkbox.addEventListener("change", () => {
    card.classList.toggle("card--selected", checkbox.checked);
    toggleSelection(key, product, checkbox.checked);
  });

  return card;
}

function renderSections(sections) {
  const root = document.getElementById("catalog-root");
  root.innerHTML = "";

  sections.forEach((section) => {
    if (!section.products || !section.products.length) return;

    const sectionEl = document.createElement("section");
    sectionEl.className = "catalog-section";

    const heading = document.createElement("h2");
    heading.className = "catalog-section__title";
    heading.textContent = section.title;
    sectionEl.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "catalog-grid";
    section.products.forEach((product) => {
      const key = `${section.title}|${product.name}`;
      grid.appendChild(buildCard(product, key));
    });
    sectionEl.appendChild(grid);

    root.appendChild(sectionEl);
  });
}

const searchInput = document.getElementById("search-input");
const filterChipsRoot = document.getElementById("filter-chips");
const catalogEmpty = document.getElementById("catalog-empty");
let activeCategory = "Todos";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let anyVisible = false;

  document.querySelectorAll(".catalog-section").forEach((sectionEl) => {
    let sectionHasVisible = false;

    sectionEl.querySelectorAll(".card").forEach((card) => {
      const matchesQuery = !query || card.dataset.name.includes(query);
      const matchesCategory = activeCategory === "Todos" || card.dataset.category === activeCategory;
      const visible = matchesQuery && matchesCategory;
      card.hidden = !visible;
      if (visible) sectionHasVisible = true;
    });

    sectionEl.hidden = !sectionHasVisible;
    if (sectionHasVisible) anyVisible = true;
  });

  catalogEmpty.hidden = anyVisible;
}

function buildFilterChips(sections) {
  const categories = new Set();
  sections.forEach((section) => {
    (section.products || []).forEach((product) => categories.add(product.category || "Outros"));
  });

  const chips = ["Todos", ...Array.from(categories).sort()];

  filterChipsRoot.innerHTML = "";
  chips.forEach((category) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip";
    chip.textContent = category;
    chip.classList.toggle("filter-chip--active", category === activeCategory);
    chip.addEventListener("click", () => {
      activeCategory = category;
      filterChipsRoot.querySelectorAll(".filter-chip").forEach((el) => {
        el.classList.toggle("filter-chip--active", el.textContent === category);
      });
      applyFilters();
    });
    filterChipsRoot.appendChild(chip);
  });
}

searchInput.addEventListener("input", applyFilters);

async function loadFromSupabase() {
  const { data, error } = await supabase.from("products").select("*");
  if (error || !data || !data.length) return null;

  const bySection = new Map();
  data.forEach((product) => {
    const key = product.section || "Produtos";
    if (!bySection.has(key)) bySection.set(key, []);
    bySection.get(key).push(product);
  });

  return Array.from(bySection, ([title, products]) => ({ title, products }));
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}

async function init() {
  let sections = null;

  try {
    sections = await Promise.race([loadFromSupabase(), timeout(4000)]);
  } catch (err) {
    console.warn("Não foi possível carregar produtos do Supabase, usando catálogo local.", err);
  }

  if (!sections) {
    sections = typeof CATALOG !== "undefined" ? CATALOG : [];
  }

  renderSections(sections);
  buildFilterChips(sections);
  applyFilters();
}

init();
