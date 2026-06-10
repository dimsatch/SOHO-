const STORAGE_KEY = "kos-image-engine-v1";

let saved = {};
try {
  saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
} catch (e) {
  saved = {};
}

function pad(n) {
  return String(n).padStart(3, "0");
}

function pollinationsUrl(prompt, seed, size) {
  const dims = size === "square" ? [1024, 1024] : [1200, 800];
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${dims[0]}&height=${dims[1]}&seed=${seed}&model=flux&nologo=true`;
}

function getCategoryImages(category) {
  if (category.images) return category.images;
  if (category._images) return category._images;

  const imgs = [];
  const start = (category.phase1Count || 0) + 1;
  for (let n = start; n <= category.count; n++) {
    const variation = VARIATIONS[(n - start) % VARIATIONS.length];
    imgs.push({
      filename: `kos-${category.slug}-${pad(n)}.jpg`,
      prompt: p(`${category.base}, ${variation}`)
    });
  }
  category._images = imgs;
  return imgs;
}

const imageIndex = new Map();

function indexAllImages() {
  for (const section of SECTIONS) {
    for (const category of section.categories) {
      const imgs = getCategoryImages(category);
      for (const img of imgs) {
        if (!("seed" in img)) img.seed = null;
        if (!("generated" in img)) img.generated = false;
        if (!("approved" in img)) img.approved = false;
        const restore = saved[img.filename];
        if (restore) {
          img.seed = restore.seed;
          img.generated = restore.generated;
          img.approved = restore.approved;
        }
        imageIndex.set(img.filename, { img, category, section });
      }
    }
  }
}

function saveState() {
  const out = {};
  for (const [filename, entry] of imageIndex) {
    const img = entry.img;
    if (img.seed || img.generated || img.approved) {
      out[filename] = { seed: img.seed, generated: img.generated, approved: img.approved };
    }
  }
  saved = out;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
}

const state = {
  sectionId: PHASE1.id,
  categoryId: PHASE1.categories[0].id
};

function getCurrent() {
  const section = SECTIONS.find((s) => s.id === state.sectionId);
  const category = section.categories.find((c) => c.id === state.categoryId);
  return { section, category };
}

function selectCategory(sectionId, categoryId) {
  state.sectionId = sectionId;
  state.categoryId = categoryId;
  renderAll();
}

function renderSidebar() {
  const el = document.getElementById("sidebar");
  el.innerHTML = "";
  for (const section of SECTIONS) {
    const group = document.createElement("div");
    group.className = "nav-group";

    const title = document.createElement("div");
    title.className = "nav-group-title";
    title.textContent = section.label;
    group.appendChild(title);

    for (const category of section.categories) {
      const item = document.createElement("button");
      item.className = "nav-item";
      if (section.id === state.sectionId && category.id === state.categoryId) {
        item.classList.add("active");
      }
      item.innerHTML = `<span class="nav-item-label">${category.label}</span><span class="nav-item-count">${category.count}</span>`;
      item.addEventListener("click", () => selectCategory(section.id, category.id));
      group.appendChild(item);
    }

    el.appendChild(group);
  }
}

function renderMain() {
  const { section, category } = getCurrent();
  document.getElementById("breadcrumb").textContent = `${section.shortLabel} · ${category.label}`;
}

function imageCard(img) {
  const card = document.createElement("div");
  card.className = "image-card";
  if (img.approved) card.classList.add("approved");

  const wrap = document.createElement("div");
  wrap.className = "image-wrap";

  if (img.generated) {
    const el = document.createElement("img");
    el.alt = img.filename;
    el.loading = "lazy";
    wrap.classList.add("loading");
    el.addEventListener("load", () => wrap.classList.remove("loading"));
    el.addEventListener("error", () => wrap.classList.remove("loading"));
    el.src = pollinationsUrl(img.prompt, img.seed, currentSize());
    wrap.appendChild(el);

    const overlay = document.createElement("div");
    overlay.className = "loading-overlay";
    overlay.textContent = "Generating…";
    wrap.appendChild(overlay);

    const regen = document.createElement("button");
    regen.className = "icon-btn regen-btn";
    regen.title = "Regenerate this image";
    regen.textContent = "↻";
    regen.addEventListener("click", () => {
      img.seed = Math.floor(Math.random() * 1e9);
      img.generated = true;
      saveState();
      renderGrid();
    });
    wrap.appendChild(regen);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.textContent = "Not generated yet";
    wrap.appendChild(placeholder);
  }

  if (img.approved) {
    const badge = document.createElement("div");
    badge.className = "approved-badge";
    badge.textContent = "✓ Approved";
    wrap.appendChild(badge);
  }

  const meta = document.createElement("div");
  meta.className = "image-meta";

  const name = document.createElement("span");
  name.className = "filename";
  name.textContent = img.filename;
  meta.appendChild(name);

  const approveBtn = document.createElement("button");
  approveBtn.className = "approve-btn";
  approveBtn.textContent = img.approved ? "Approved" : "Approve";
  approveBtn.disabled = !img.generated;
  approveBtn.addEventListener("click", () => {
    img.approved = !img.approved;
    saveState();
    renderGrid();
    renderFolder();
    updateCounters();
  });
  meta.appendChild(approveBtn);

  card.appendChild(wrap);
  card.appendChild(meta);
  return card;
}

function currentSize() {
  return getCurrent().category.size || "square";
}

function renderGrid() {
  const { category } = getCurrent();
  const imgs = getCategoryImages(category);
  const grid = document.getElementById("image-grid");
  grid.innerHTML = "";
  for (const img of imgs) {
    grid.appendChild(imageCard(img));
  }
}

function generateBatch(regenerate) {
  const { category } = getCurrent();
  const imgs = getCategoryImages(category);
  for (const img of imgs) {
    if (regenerate || !img.generated) {
      img.seed = Math.floor(Math.random() * 1e9);
      img.generated = true;
    }
  }
  saveState();
  renderGrid();
  setStatus(regenerate ? "Regenerating batch…" : "Generating batch…");
}

function renderFolder() {
  const folder = document.getElementById("shopify-folder");
  folder.innerHTML = "";
  let ready = 0;

  for (const filename of PHASE1_MANIFEST_ORDER) {
    const entry = imageIndex.get(filename);
    const chip = document.createElement("button");
    chip.className = "chip";
    if (entry.img.approved) {
      chip.classList.add("chip-approved");
      ready++;
    } else if (entry.img.generated) {
      chip.classList.add("chip-generated");
    } else {
      chip.classList.add("chip-pending");
    }
    chip.textContent = (entry.img.approved ? "✓ " : "") + filename;
    chip.addEventListener("click", () => selectCategory(entry.section.id, entry.category.id));
    folder.appendChild(chip);
  }

  document.getElementById("folder-ready").textContent =
    ready === 0
      ? "0 files ready — approve images above to mark them ready"
      : `${ready} of ${PHASE1_MANIFEST_ORDER.length} files ready for Shopify`;
}

function updateCounters() {
  let phase1Approved = 0;
  for (const filename of PHASE1_MANIFEST_ORDER) {
    if (imageIndex.get(filename).img.approved) phase1Approved++;
  }
  document.getElementById("approved-count").textContent =
    `Approved for Shopify: ${phase1Approved} / ${PHASE1_MANIFEST_ORDER.length}`;

  let totalApproved = 0;
  for (const entry of imageIndex.values()) {
    if (entry.img.approved) totalApproved++;
  }
  document.getElementById("total-approved").textContent =
    `${totalApproved} image${totalApproved === 1 ? "" : "s"} approved for Shopify`;

  document.getElementById("download-all").disabled = totalApproved === 0;
  document.getElementById("download-all-bottom").disabled = totalApproved === 0;
}

function setStatus(text) {
  document.getElementById("status-line").textContent = text;
}

async function downloadApproved() {
  const approvedImages = [];
  for (const entry of imageIndex.values()) {
    if (entry.img.approved && entry.img.generated) approvedImages.push(entry);
  }
  if (approvedImages.length === 0) return;

  setStatus(`Preparing ${approvedImages.length} image(s) for download…`);
  const zip = new JSZip();
  let failed = 0;

  for (const entry of approvedImages) {
    const { img, category } = entry;
    try {
      const res = await fetch(pollinationsUrl(img.prompt, img.seed, category.size || "square"));
      if (!res.ok) throw new Error("bad response");
      const blob = await res.blob();
      zip.file(img.filename, blob);
    } catch (e) {
      failed++;
    }
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kos-shopify-images.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  setStatus(
    failed > 0
      ? `Downloaded ${approvedImages.length - failed} image(s), ${failed} failed.`
      : `Downloaded ${approvedImages.length} image(s).`
  );
}

function renderStyleGuide() {
  const feel = document.getElementById("feel-like-list");
  feel.innerHTML = STYLE_GUIDE.feel_like.map((t) => `<li>${t}</li>`).join("");
  const never = document.getElementById("never-use-list");
  never.innerHTML = STYLE_GUIDE.never_use.map((t) => `<li>${t}</li>`).join("");
}

function renderAll() {
  renderSidebar();
  renderMain();
  renderGrid();
  renderFolder();
  updateCounters();
}

function init() {
  indexAllImages();
  renderStyleGuide();
  renderAll();
  setStatus("Ready to generate.");

  document.getElementById("generate-batch").addEventListener("click", () => generateBatch(false));
  document.getElementById("regenerate-all").addEventListener("click", () => generateBatch(true));
  document.getElementById("download-all").addEventListener("click", downloadApproved);
  document.getElementById("download-all-bottom").addEventListener("click", downloadApproved);
}

init();
