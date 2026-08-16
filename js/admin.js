import { supabase } from "./supabase-init.js";
import { escapeHtml } from "./html-utils.js";

// products.js é carregado como script clássico antes deste módulo (veja admin.html)
// e define a variável global CATALOG usada como catálogo padrão para importação.
const SEED_CATALOG = typeof CATALOG !== "undefined" ? CATALOG : [];

const form = document.getElementById("product-form");
const nameInput = document.getElementById("field-name");
const priceInput = document.getElementById("field-price");
const originalPriceInput = document.getElementById("field-original-price");
const imageInput = document.getElementById("field-image");
const sectionInput = document.getElementById("field-section");
const sectionOptions = document.getElementById("section-options");
const categoryInput = document.getElementById("field-category");
const categoryOptions = document.getElementById("category-options");
const imageFileInput = document.getElementById("field-image-file");
const imagePreview = document.getElementById("image-preview");
const imageUploadStatus = document.getElementById("image-upload-status");
const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const formTitle = document.getElementById("form-title");
const sectionsRoot = document.getElementById("admin-sections");
const emptyMsg = document.getElementById("admin-empty");
const adminFilterChipsRoot = document.getElementById("admin-filter-chips");

let editingId = null;
let currentProducts = [];
let activeAdminCategory = "Todos";

async function requireSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
    return null;
  }
  document.getElementById("admin-email").textContent = session.user.email;
  return session;
}

supabase.auth.onAuthStateChange((_event, session) => {
  if (!session) window.location.href = "login.html";
});

document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "login.html";
});

async function loadProducts() {
  const { data, error } = await supabase.from("products").select("*").order("section");
  if (error) {
    alert("Erro ao carregar produtos: " + error.message);
    return;
  }
  currentProducts = data || [];
  buildAdminFilterChips(currentProducts);
  renderFilteredSections();
  renderSectionOptions(currentProducts);
  renderCategoryOptions(currentProducts);
}

function buildAdminFilterChips(products) {
  const categories = new Set();
  products.forEach((p) => categories.add(p.category || "Outros"));
  const chips = ["Todos", ...Array.from(categories).sort()];

  if (!chips.includes(activeAdminCategory)) activeAdminCategory = "Todos";

  adminFilterChipsRoot.innerHTML = "";
  chips.forEach((category) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip";
    chip.textContent = category;
    chip.classList.toggle("filter-chip--active", category === activeAdminCategory);
    chip.addEventListener("click", () => {
      activeAdminCategory = category;
      adminFilterChipsRoot.querySelectorAll(".filter-chip").forEach((el) => {
        el.classList.toggle("filter-chip--active", el.textContent === category);
      });
      renderFilteredSections();
    });
    adminFilterChipsRoot.appendChild(chip);
  });
}

function renderFilteredSections() {
  const filtered = activeAdminCategory === "Todos"
    ? currentProducts
    : currentProducts.filter((p) => (p.category || "Outros") === activeAdminCategory);
  renderSections(filtered);
}

function renderSectionOptions(products) {
  const sections = Array.from(new Set(products.map((p) => p.section).filter(Boolean))).sort();
  sectionOptions.innerHTML = sections.map((s) => `<option value="${s}"></option>`).join("");
}

function renderCategoryOptions(products) {
  const categories = new Set(["Perfumes", "Skincare", "Hidratantes", "Cabelo"]);
  products.forEach((p) => { if (p.category) categories.add(p.category); });
  categoryOptions.innerHTML = Array.from(categories).sort().map((c) => `<option value="${c}"></option>`).join("");
}

function renderSections(products) {
  sectionsRoot.innerHTML = "";

  if (currentProducts.length === 0) {
    emptyMsg.textContent = 'Nenhum produto cadastrado ainda. Use o formulário acima ou clique em "Importar catálogo padrão".';
    emptyMsg.hidden = false;
    return;
  }

  emptyMsg.textContent = "Nenhum produto nessa categoria.";
  emptyMsg.hidden = products.length > 0;

  const bySection = new Map();
  products.forEach((p) => {
    const key = p.section || "Sem seção";
    if (!bySection.has(key)) bySection.set(key, []);
    bySection.get(key).push(p);
  });

  bySection.forEach((items, title) => {
    const sectionEl = document.createElement("div");
    sectionEl.className = "admin-section";

    const heading = document.createElement("h3");
    heading.className = "admin-section__title";
    heading.textContent = `${title} (${items.length})`;
    sectionEl.appendChild(heading);

    items.forEach((product) => sectionEl.appendChild(buildRow(product)));
    sectionsRoot.appendChild(sectionEl);
  });
}

function buildRow(product) {
  const row = document.createElement("div");
  row.className = "admin-row";
  row.innerHTML = `
    <img class="admin-row__thumb" src="${escapeHtml(product.image || "")}" alt="">
    <div class="admin-row__info">
      <div class="admin-row__name">${escapeHtml(product.name)}</div>
      <div class="admin-row__price">${product.original_price ? `<span class="admin-row__price-original">${escapeHtml(product.original_price)}</span> ` : ""}${escapeHtml(product.price || "sem preço")}${product.category ? ` · ${escapeHtml(product.category)}` : ""}</div>
    </div>
    <div class="admin-row__actions">
      <button type="button" data-action="edit">Editar</button>
      <button type="button" data-action="delete">Excluir</button>
    </div>
  `;

  row.querySelector('[data-action="edit"]').addEventListener("click", () => startEdit(product));
  row.querySelector('[data-action="delete"]').addEventListener("click", () => removeProduct(product.id));

  return row;
}

function showImagePreview(url) {
  if (url) {
    imagePreview.src = url;
    imagePreview.hidden = false;
  } else {
    imagePreview.hidden = true;
    imagePreview.removeAttribute("src");
  }
}

function startEdit(product) {
  editingId = product.id;
  nameInput.value = product.name || "";
  priceInput.value = product.price || "";
  originalPriceInput.value = product.original_price || "";
  imageInput.value = product.image || "";
  sectionInput.value = product.section || "";
  categoryInput.value = product.category || "";
  showImagePreview(product.image || "");
  imageUploadStatus.textContent = "";
  formTitle.textContent = "Editar produto";
  submitBtn.textContent = "Salvar alterações";
  cancelEditBtn.hidden = false;
  nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetForm() {
  editingId = null;
  form.reset();
  showImagePreview("");
  imageUploadStatus.textContent = "";
  formTitle.textContent = "Adicionar produto";
  submitBtn.textContent = "Adicionar";
  cancelEditBtn.hidden = true;
}

imageFileInput.addEventListener("change", async () => {
  const file = imageFileInput.files[0];
  if (!file) return;

  imageUploadStatus.textContent = "Enviando...";

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const path = `${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file, { upsert: true });

  if (uploadError) {
    imageUploadStatus.textContent = "";
    alert("Erro ao enviar imagem: " + uploadError.message);
    return;
  }

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  imageInput.value = data.publicUrl;
  showImagePreview(data.publicUrl);
  imageUploadStatus.textContent = "Imagem enviada.";
});

cancelEditBtn.addEventListener("click", resetForm);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    name: nameInput.value.trim(),
    price: priceInput.value.trim(),
    original_price: originalPriceInput.value.trim() || null,
    image: imageInput.value.trim(),
    section: sectionInput.value.trim(),
    category: categoryInput.value.trim() || null
  };

  const { error } = editingId
    ? await supabase.from("products").update(data).eq("id", editingId)
    : await supabase.from("products").insert(data);

  if (error) {
    alert("Erro ao salvar produto: " + error.message);
    return;
  }

  resetForm();
  loadProducts();
});

async function removeProduct(id) {
  if (!confirm("Excluir este produto do catálogo?")) return;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    alert("Erro ao excluir produto: " + error.message);
    return;
  }
  loadProducts();
}

const settingsForm = document.getElementById("settings-form");
const whatsappInput = document.getElementById("field-whatsapp");
const settingsStatus = document.getElementById("settings-status");

async function loadSettings() {
  const { data, error } = await supabase.from("settings").select("whatsapp_number").eq("id", "main").maybeSingle();
  if (error) {
    settingsStatus.textContent = "Configurações ainda não disponíveis (rode o settings.sql no Supabase).";
    return;
  }
  whatsappInput.value = (data && data.whatsapp_number) || "";
}

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const number = whatsappInput.value.trim().replace(/\D/g, "");
  if (!number) return;

  settingsStatus.textContent = "Salvando...";
  const { error } = await supabase.from("settings").upsert({ id: "main", whatsapp_number: number });

  if (error) {
    settingsStatus.textContent = "Erro ao salvar: " + error.message;
    return;
  }

  whatsappInput.value = number;
  settingsStatus.textContent = "Número salvo com sucesso.";
});

const statsTotal = document.getElementById("stats-total");
const statsToday = document.getElementById("stats-today");
const statsProducts = document.getElementById("stats-products");
const statsEmpty = document.getElementById("stats-empty");
const statsRanking = document.getElementById("stats-ranking");

async function loadStats() {
  const { data, error } = await supabase.from("clicks").select("product_name, created_at");

  if (error) {
    statsEmpty.hidden = false;
    statsEmpty.textContent = "Painel de estatísticas ainda não configurado (rode o clicks.sql no Supabase).";
    return;
  }

  const clicks = data || [];
  statsTotal.textContent = clicks.length;

  const todayStr = new Date().toDateString();
  const todayCount = clicks.filter((c) => new Date(c.created_at).toDateString() === todayStr).length;
  statsToday.textContent = todayCount;

  const counts = new Map();
  clicks.forEach((c) => counts.set(c.product_name, (counts.get(c.product_name) || 0) + 1));
  statsProducts.textContent = counts.size;

  statsEmpty.hidden = clicks.length > 0;

  const ranked = Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  const maxCount = ranked.length ? ranked[0].count : 1;

  statsRanking.innerHTML = ranked
    .slice(0, 15)
    .map(
      (item, index) => `
        <div class="stats-ranking__row">
          <span class="stats-ranking__position">${index + 1}º</span>
          <div class="stats-ranking__bar-wrap">
            <span class="stats-ranking__name">${escapeHtml(item.name)}</span>
            <div class="stats-ranking__bar">
              <div class="stats-ranking__bar-fill" style="width: ${(item.count / maxCount) * 100}%"></div>
            </div>
          </div>
          <span class="stats-ranking__count">${item.count}</span>
        </div>
      `
    )
    .join("");
}

document.getElementById("seed-btn").addEventListener("click", async () => {
  const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
  if (count && count > 0) {
    alert("Já existem produtos cadastrados. O catálogo padrão só pode ser importado quando a lista estiver vazia.");
    return;
  }
  if (!confirm("Importar todos os produtos do catálogo padrão para o banco de dados?")) return;

  const rows = [];
  SEED_CATALOG.forEach((section) => {
    section.products.forEach((product) => {
      rows.push({
        name: product.name,
        price: product.price,
        original_price: product.original_price || null,
        image: product.image,
        section: section.title,
        category: product.category || null
      });
    });
  });

  const { error } = await supabase.from("products").insert(rows);
  if (error) {
    alert("Erro ao importar catálogo: " + error.message);
    return;
  }

  alert("Catálogo padrão importado com sucesso!");
  loadProducts();
});

(async () => {
  const session = await requireSession();
  if (session) {
    loadProducts();
    loadStats();
    loadSettings();
  }
})();
