const STORAGE_KEY = "jabnow_projects_v1";

const SEED = [
  {
    title: "Project 1",
    category: "code",
    updated: "2026-05-01",
    url: "",
    description: "Build and implementation workflow for an interactive project.",
    tags: ["portfolio", "frontend"],
    tools: ["JavaScript", "HTML", "CSS"]
  },
  {
    title: "Project 2",
    category: "excel",
    updated: "2026-05-11",
    url: "",
    description: "Workbook-driven analysis and reporting outputs.",
    tags: ["analysis", "dashboard"],
    tools: ["Excel", "Power Query"]
  },
  {
    title: "Image Project",
    category: "image",
    updated: "2026-04-22",
    url: "",
    description: "Static visual communications and graphics experiments.",
    tags: ["visual", "design"],
    tools: ["Photoshop", "Illustrator"]
  },
  {
    title: "Video Project",
    category: "video",
    updated: "2026-03-14",
    url: "",
    description: "Editing timeline, production notes, and final export.",
    tags: ["motion", "storyboard"],
    tools: ["Premiere Pro"]
  },
  {
    title: "Multimedia Project",
    category: "multimedia",
    updated: "2026-02-10",
    url: "",
    description: "Cross-format project that combines tools and media types.",
    tags: ["hybrid", "interactive"],
    tools: ["Web Audio", "Canvas"]
  }
];

const store = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse stored projects, reseeding.", err);
    }
    const seeded = SEED.map((project, i) => ({
      id: i + 1,
      createdAt: new Date().toISOString(),
      ...project
    }));
    store.save(seeded);
    return seeded;
  },
  save(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error("Failed to save projects to localStorage.", err);
    }
  },
  nextId(list) {
    return list.reduce((max, project) => Math.max(max, project.id || 0), 0) + 1;
  }
};

const state = {
  filter: "all",
  search: "",
  sort: "recent",
  projects: store.load(),
  editingId: null
};

const refs = {
  folderList: document.getElementById("folder-list"),
  search: document.getElementById("project-search"),
  sort: document.getElementById("project-sort"),
  path: document.getElementById("current-path"),
  count: document.getElementById("results-count"),
  grid: document.getElementById("project-grid"),
  form: document.getElementById("project-form"),
  submitBtn: document.getElementById("submit-btn"),
  cancelEditBtn: document.getElementById("cancel-edit-btn"),
  editorTitle: document.getElementById("editor-title"),
  editorHeading: document.getElementById("editor-heading"),
  toast: document.getElementById("toast"),
  connectionDot: document.getElementById("connection-dot"),
  connectionText: document.getElementById("connection-text")
};

const CATEGORY_COLORS = {
  code: "#2563eb",
  excel: "#16a34a",
  image: "#ec4899",
  video: "#8b5cf6",
  multimedia: "#f97316",
  audio: "#0ea5e9",
  writing: "#a16207",
  design: "#db2777"
};

const FALLBACK_COLORS = ["#475569", "#0f766e", "#a16207", "#7c3aed", "#be123c", "#0891b2"];

const colorForCategory = category => {
  const key = (category || "").toLowerCase();
  if (CATEGORY_COLORS[key]) return CATEGORY_COLORS[key];
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
};

const titleCase = value => value.charAt(0).toUpperCase() + value.slice(1);

const showToast = (message, kind = "ok", ttl = 2500) => {
  refs.toast.textContent = message;
  refs.toast.className = `toast ${kind}`;
  if (showToast.timer) clearTimeout(showToast.timer);
  if (ttl > 0) {
    showToast.timer = setTimeout(() => {
      refs.toast.textContent = "";
      refs.toast.className = "toast";
    }, ttl);
  }
};

const setStatus = (status, label) => {
  refs.connectionDot.className = `connection-dot ${status}`;
  refs.connectionText.textContent = label;
};

const updateStatusFooter = () => {
  setStatus("ok", `Saved locally · ${state.projects.length} project${state.projects.length === 1 ? "" : "s"}`);
};

const persist = () => {
  store.save(state.projects);
  updateStatusFooter();
};

// ──────────────────────── PAGE NAV ────────────────────────
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".sb-nav button").forEach(b => b.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  const btn = document.getElementById("nav-" + id);
  if (btn) btn.classList.add("active");
  if (id === "home") {
    setTimeout(() => renderGraph({ rebuild: true }), 60);
  }
}
window.showPage = showPage;

// ──────────────────────── LIST VIEW ───────────────────────
const projectSearchText = project => {
  const tags = (project.tags || []).join(" ");
  const tools = (project.tools || []).join(" ");
  return `${project.title} ${project.description} ${project.category} ${tags} ${tools}`.toLowerCase();
};

const categoryOptions = () => {
  const categories = new Set(state.projects.map(p => p.category.trim().toLowerCase()));
  return ["all", ...[...categories].sort((a, b) => a.localeCompare(b))];
};

const renderFolders = () => {
  refs.folderList.innerHTML = "";
  categoryOptions().forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "folder-btn";
    button.dataset.filter = category;
    button.setAttribute("aria-pressed", String(state.filter === category));
    button.textContent = category === "all" ? "All" : category;
    button.addEventListener("click", () => {
      state.filter = category;
      renderList();
    });
    const li = document.createElement("li");
    li.appendChild(button);
    refs.folderList.appendChild(li);
  });
};

const applyFilters = () => {
  const search = state.search.trim().toLowerCase();
  return state.projects
    .filter(p => (state.filter === "all" ? true : p.category.toLowerCase() === state.filter))
    .filter(p => (!search ? true : projectSearchText(p).includes(search)))
    .sort((a, b) => {
      if (state.sort === "title") return a.title.localeCompare(b.title);
      if (state.sort === "category") return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
      return new Date(b.updated) - new Date(a.updated);
    });
};

const workItem = (project, index) => {
  const row = document.createElement("div");
  row.className = "work-item";

  const num = document.createElement("div");
  num.className = "wi-num";
  num.textContent = String(index + 1).padStart(2, "0");

  const dot = document.createElement("div");
  dot.className = "wi-dot";
  dot.style.background = colorForCategory(project.category);
  dot.textContent = (project.title || "?").charAt(0).toUpperCase();

  const body = document.createElement("div");
  body.className = "wi-body";

  const titleRow = document.createElement("div");
  titleRow.className = "wi-title-row";

  const link = document.createElement("a");
  link.className = "wi-title";
  link.textContent = project.title;
  link.href = project.url && project.url !== "#" ? project.url : "#";
  if (project.url && /^https?:\/\//i.test(project.url)) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else if (!project.url || project.url === "#") {
    link.addEventListener("click", event => {
      event.preventDefault();
      startEdit(project);
    });
  }

  const cat = document.createElement("span");
  cat.className = "wi-cat";
  cat.textContent = `· ${project.category}`;

  titleRow.append(link, cat);

  const desc = document.createElement("p");
  desc.className = "wi-desc";
  desc.textContent = project.description;

  const meta = document.createElement("div");
  meta.className = "wi-meta";
  (project.tags || []).forEach(tag => {
    const pill = document.createElement("span");
    pill.className = "wi-pill";
    pill.textContent = `#${tag}`;
    meta.appendChild(pill);
  });
  (project.tools || []).forEach(tool => {
    const pill = document.createElement("span");
    pill.className = "wi-pill";
    pill.textContent = tool;
    meta.appendChild(pill);
  });

  body.append(titleRow, desc);
  if (meta.children.length) body.appendChild(meta);

  const date = document.createElement("div");
  date.className = "wi-date";
  date.textContent = project.updated;

  const actions = document.createElement("div");
  actions.className = "wi-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => startEdit(project));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteProject(project));

  actions.append(editBtn, deleteBtn);
  row.append(num, dot, body, date, actions);
  return row;
};

const renderList = () => {
  const projects = applyFilters();
  refs.path.textContent = state.filter === "all" ? "All files" : titleCase(state.filter);
  refs.count.textContent = `${projects.length} project${projects.length === 1 ? "" : "s"}`;

  refs.grid.innerHTML = "";
  if (!projects.length) {
    const empty = document.createElement("p");
    empty.className = "list-empty";
    empty.textContent = state.projects.length
      ? "No projects match this search or filter yet."
      : "No projects yet — add one from the sidebar.";
    refs.grid.appendChild(empty);
  } else {
    projects.forEach((project, idx) => refs.grid.appendChild(workItem(project, idx)));
  }

  refs.folderList.querySelectorAll(".folder-btn").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === state.filter));
  });
};

// ──────────────────────── FORM ────────────────────────
const formToPayload = () => {
  const data = new FormData(refs.form);
  const toList = value => String(value || "").split(",").map(item => item.trim()).filter(Boolean);
  return {
    title: String(data.get("title") || "").trim(),
    category: String(data.get("category") || "").trim().toLowerCase(),
    updated: String(data.get("updated") || "").trim(),
    url: String(data.get("url") || "").trim(),
    description: String(data.get("description") || "").trim(),
    tags: toList(data.get("tags")),
    tools: toList(data.get("tools"))
  };
};

const fillForm = project => {
  refs.form.elements.id.value = project ? project.id : "";
  refs.form.elements.title.value = project ? project.title : "";
  refs.form.elements.category.value = project ? project.category : "";
  refs.form.elements.updated.value = project ? project.updated : "";
  refs.form.elements.url.value = project ? project.url || "" : "";
  refs.form.elements.description.value = project ? project.description : "";
  refs.form.elements.tags.value = project ? (project.tags || []).join(", ") : "";
  refs.form.elements.tools.value = project ? (project.tools || []).join(", ") : "";
};

const startEdit = project => {
  state.editingId = project.id;
  fillForm(project);
  refs.editorTitle.textContent = "Edit project";
  refs.editorHeading.textContent = `Editing: ${project.title}`;
  refs.submitBtn.textContent = "Update project";
  refs.cancelEditBtn.hidden = false;
  showPage("add");
};

const cancelEdit = () => {
  state.editingId = null;
  fillForm(null);
  refs.editorTitle.textContent = "Add project";
  refs.editorHeading.textContent = "New project";
  refs.submitBtn.textContent = "Save project";
  refs.cancelEditBtn.hidden = true;
};

const deleteProject = project => {
  if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
  state.projects = state.projects.filter(p => p.id !== project.id);
  if (state.editingId === project.id) cancelEdit();
  persist();
  renderFolders();
  renderList();
  renderGraph({ rebuild: true });
  showToast(`Deleted ${project.title}`, "ok");
};

// ──────────────────────── GRAPH ────────────────────────
let graphState = null;

function renderGraph({ rebuild = false } = {}) {
  const container = document.getElementById("page-home");
  if (!container || !container.classList.contains("active")) return;

  const W = container.clientWidth;
  const H = container.clientHeight;
  if (!W || !H) return;

  const svgEl = document.getElementById("graph-svg");
  if (rebuild || !graphState || graphState.W !== W || graphState.H !== H) {
    svgEl.innerHTML = "";
    buildGraph(W, H);
  }
}

function buildGraph(W, H) {
  const svg = d3.select("#graph-svg")
    .attr("width", W)
    .attr("height", H)
    .attr("viewBox", `0 0 ${W} ${H}`);

  const CX = W / 2;
  const CY = H / 2;

  const projectNodes = state.projects.map(project => ({
    kind: "project",
    id: `p-${project.id}`,
    project,
    label: project.title,
    category: project.category
  }));

  const nodes = [
    { kind: "center", id: "center", label: "Jabnow", sub: `${state.projects.length} project${state.projects.length === 1 ? "" : "s"}`, fx: CX, fy: CY },
    ...projectNodes
  ];

  if (!projectNodes.length) {
    const placeholder = svg.append("g").attr("transform", `translate(${CX}, ${CY})`);
    placeholder.append("circle").attr("r", 26).attr("fill", "#2563eb");
    placeholder.append("circle").attr("r", 8).attr("fill", "white");
    placeholder.append("text")
      .attr("y", 48)
      .attr("text-anchor", "middle")
      .attr("class", "node-label")
      .text("Jabnow");
    placeholder.append("text")
      .attr("y", 66)
      .attr("text-anchor", "middle")
      .attr("class", "node-label node-sublabel")
      .text("Add a project to see the graph");
    graphState = { W, H };
    return;
  }

  projectNodes.forEach((node, i) => {
    const angle = (i / projectNodes.length) * Math.PI * 2 - Math.PI / 2;
    const dist = 190 + Math.random() * 70;
    node.x = CX + Math.cos(angle) * dist;
    node.y = CY + Math.sin(angle) * dist;
  });

  const links = projectNodes.map(node => ({ source: "center", target: node.id }));

  const sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(165).strength(0.35))
    .force("charge", d3.forceManyBody().strength(-120))
    .force("collision", d3.forceCollide(54))
    .force("center", d3.forceCenter(CX, CY).strength(0.02))
    .alphaDecay(0.018);

  const PAD = 72;
  const linkSel = svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "link-line");

  const nodeG = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("cursor", d => (d.kind === "project" ? "pointer" : "default"))
    .call(d3.drag()
      .on("start", (event, d) => {
        if (!event.active) sim.alphaTarget(0.25).restart();
        if (d.kind !== "center") {
          d.fx = d.x;
          d.fy = d.y;
        }
      })
      .on("drag", (event, d) => {
        if (d.kind === "center") return;
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        if (d.kind !== "center") {
          d.fx = null;
          d.fy = null;
        }
      }))
    .on("click", (event, d) => {
      if (d.kind === "project") startEdit(d.project);
    });

  nodeG.each(function (d) {
    const g = d3.select(this);
    if (d.kind === "center") {
      g.append("circle").attr("r", 22).attr("fill", "#2563eb");
      g.append("polygon").attr("points", starPts(0, 0, 19, 9, 12)).attr("fill", "#1d4ed8");
      g.append("circle").attr("r", 6.5).attr("fill", "white");
      g.append("circle").attr("r", 2.8).attr("fill", "#2563eb");
    } else {
      const fill = colorForCategory(d.category);
      g.append("polygon")
        .attr("points", hexPts(0, 0, 18))
        .attr("class", "node-shape")
        .attr("fill", fill + "22")
        .attr("stroke", fill)
        .attr("stroke-width", 1.4);
      g.append("text")
        .attr("y", 4)
        .attr("text-anchor", "middle")
        .attr("class", "node-label")
        .attr("fill", fill)
        .style("font-weight", "500")
        .style("font-size", "11px")
        .text((d.project.title || "?").charAt(0).toUpperCase());
    }
  });

  nodeG.append("text")
    .attr("class", "node-label")
    .attr("y", d => (d.kind === "center" ? 36 : 32))
    .attr("text-anchor", "middle")
    .text(d => d.label);

  nodeG.filter(d => d.sub).append("text")
    .attr("class", "node-label node-sublabel")
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .text(d => d.sub);

  sim.on("tick", () => {
    nodes.forEach(n => {
      if (n.fx !== undefined && n.fx !== null) return;
      n.x = Math.max(PAD, Math.min(W - PAD, n.x));
      n.y = Math.max(PAD, Math.min(H - PAD, n.y));
    });
    linkSel
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    nodeG.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  graphState = { W, H, sim };
}

function hexPts(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

function starPts(cx, cy, ro, ri, n) {
  return Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 === 0 ? ro : ri;
    const a = (Math.PI / n) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

// ──────────────────────── EVENTS ────────────────────────
refs.search.addEventListener("input", event => {
  state.search = event.target.value;
  renderList();
});

refs.sort.addEventListener("change", event => {
  state.sort = event.target.value;
  renderList();
});

refs.cancelEditBtn.addEventListener("click", cancelEdit);

refs.form.addEventListener("submit", event => {
  event.preventDefault();
  const payload = formToPayload();
  if (!payload.title || !payload.category || !payload.updated || !payload.description) {
    showToast("Title, category, date, and description are required", "warn", 3500);
    return;
  }

  if (state.editingId) {
    const idx = state.projects.findIndex(p => p.id === state.editingId);
    if (idx >= 0) {
      state.projects[idx] = { ...state.projects[idx], ...payload };
      showToast(`Updated ${state.projects[idx].title}`, "ok");
    }
  } else {
    const created = {
      id: store.nextId(state.projects),
      createdAt: new Date().toISOString(),
      ...payload
    };
    state.projects.unshift(created);
    showToast(`Added ${created.title}`, "ok");
  }

  persist();
  cancelEdit();
  renderFolders();
  renderList();
  renderGraph({ rebuild: true });
  showPage("list");
});

window.addEventListener("resize", () => renderGraph({ rebuild: true }));

renderFolders();
renderList();
updateStatusFooter();
renderGraph({ rebuild: true });
