const STORAGE_KEY = "jabnow_projects_v1";
const SESSION_KEY = "jabnow_editor_v1";
const EDITOR_USER = "jabnow";
const EDITOR_PASS = "beans";
const PUBLIC_SITE_URL = "https://meetjabnow.vercel.app";
const CONTACT_INBOX = "joywang@nyu.edu";
const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_INBOX}`;

const BRANCHES = [
  { key: "product", label: "Product" },
  { key: "analyst", label: "Analyst" },
  { key: "indie", label: "Indie" }
];
const BRANCH_KEYS = BRANCHES.map(b => b.key);

const PROFILES = [
  { key: "jabnow", label: "Jabnow" },
  { key: "product", label: "Product" },
  { key: "analyst", label: "Analyst" },
  { key: "indie", label: "Indie" }
];
const PROFILE_KEYS = PROFILES.map(p => p.key);
const BRANCH_PROFILE_KEYS = ["product", "analyst", "indie"];
const profileLabel = key => PROFILES.find(p => p.key === key)?.label || key;

const splitLines = value => String(value || "").split("\n").map(v => v.trim()).filter(Boolean);
const splitCsv = value => String(value || "").split(",").map(v => v.trim()).filter(Boolean);

const emptyEducation = () => ({ school: "", location: "", degree: "", date: "", bullets: [] });
const emptyExperience = () => ({ company: "", location: "", role: "", date: "", bullets: [] });
const emptySkillSection = () => ({ title: "", content: "" });
const emptyAboutLink = () => ({ label: "", url: "" });
const emptyBook = () => ({ title: "", author: "", coverUrl: "", url: "" });
const emptySong = () => ({ title: "", artist: "", url: "" });

const DEFAULT_BOOKS = [
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg"
  },
  {
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780812988406-L.jpg"
  },
  {
    title: "Never Let Me Go",
    author: "Kazuo Ishiguro",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781400078776-L.jpg"
  },
  {
    title: "xkcd.com",
    author: "Daily comic",
    coverUrl: "https://imgs.xkcd.com/comics/duty_calls.png",
    url: "https://xkcd.com/#"
  }
];

const DEFAULT_SONGS = [
  {
    title: "Stand Out Fit In",
    artist: "ONE OK ROCK",
    url: "https://music.youtube.com/watch?v=DowLEpo7A18&si=kz1Yks69SVEZdSyB"
  },
  {
    title: "Take Me To You",
    artist: "GOT7",
    url: "https://music.youtube.com/watch?v=g2n0jMXgsDE&si=pJ019NtPH_a0iVn4"
  },
  {
    title: "death bed (coffee for your head)",
    artist: "Powfu",
    url: "https://music.youtube.com/watch?v=JApegyYlvyY&si=nBK2cTOujt_-iryy"
  },
  {
    title: "OVERTIME",
    artist: "haruno",
    url: "https://music.youtube.com/watch?v=NjXYmfF0I98&si=P1Fg3TVhq_QHKzjs"
  },
  {
    title: "Be Kind",
    artist: "Marshmello & Halsey",
    url: "https://music.youtube.com/watch?v=qGayx0PQ6J0&si=5Rt9Hp5r-yYluS7p"
  },
  {
    title: "Someday",
    artist: "The Strokes",
    url: "https://music.youtube.com/watch?v=eArVJFjd6S0&si=_KphVKmPVmkG1WaB"
  }
];

const JABNOW_SAMPLE_RESUME = {
  name: "Joy Wang",
  location: "New York, NY, USA",
  phone: "(978) 489-4207",
  email: "joywang@nyu.edu",
  summary: "",
  education: [{
    school: "New York University",
    location: "New York, NY, USA",
    degree: "Bachelor of Science in Strategic Business and Technology Management",
    date: "Expected 2026",
    bullets: [
      "GPA: 3.6 / 4.0; SAT: 1580; Dean's List; Honors Scholar",
      "Minors: Computer Science, Mathematics",
      "Coursework: Applied Statistics, Management Science, Financial Risk Management, Graduate Offensive Security, SQL, Python, C/C++"
    ]
  }],
  experience: [
    {
      company: "Crédit Agricole Corporate Investment Bank",
      location: "New York, NY",
      role: "Liquidity Risk Analyst, Treasury / ALM",
      date: "Present",
      bullets: ["Produce and analyze liquidity stress reports, raise alerts on atypical events, and work closely with the Market Risk team."]
    },
    {
      company: "Amazon ACY1",
      location: "NJ",
      role: "Management Intern, Quality & Assurance",
      date: "May 2025 – Aug 2025",
      bullets: [
        "Identified recurring inventory inefficiencies and reduced root cause analysis time by 65% with $500K annualized savings potential.",
        "Analyzed 20K daily operational and financial KPIs with VBA & ELK, summarized in leadership dashboards.",
        "Garnered cross-department support to validate physical prototype implement changes during Prime Week."
      ]
    },
    {
      company: "Leslie Entrepreneurship Lab",
      location: "New York, NY",
      role: "Founder in Program",
      date: "Jun 2025 – Present",
      bullets: [
        "Developed proto-token incentive model for on-chain skill development and reputation scoring.",
        "Conducted 50–100 structured user interviews, designed GTM strategy, and iterated MVP for fundraising."
      ]
    }
  ],
  skillsSections: [
    { title: "Languages", content: "Fluent in Mandarin, Spanish; Conversational Proficiency in French" },
    { title: "Technical Skills", content: "Python, Java, C/C++, SQL, Tableau/Power BI, AWS, CI/CD" },
    { title: "Certifications & Training", content: "Google Cloud Beginner Data Analyst Certification, Bloomberg Market Concepts, Scheduled SIE" },
    { title: "Activities", content: "Strategy Lead (Tech SHRM NYU Chapter), Mentor (SWE), 6x Fintech Hackathon Winner" },
    { title: "Interests", content: "Snowboarding Instructor (Stoked.org), U18 MA Top 50 & D1 Varsity Tennis Captain" }
  ]
};

const migrateLegacyBooks = books => {
  if (!Array.isArray(books) || !books.length) return books;
  const legacyTitles = new Set(["Sapiens", "Sophie's World", "The White Tiger", "Annapurna"]);
  const allLegacy = books.length === 4 && books.every(b => legacyTitles.has(b.title) && !b.coverUrl);
  if (allLegacy) return JSON.parse(JSON.stringify(DEFAULT_BOOKS));
  return books;
};

const migrateLegacySongs = songs => {
  if (!Array.isArray(songs) || !songs.length) return songs;
  const legacyTitles = new Set([
    "Ghost in Town",
    "Bless The Telephone",
    "Vachari",
    "Tears Over Beers",
    "Mohtarma"
  ]);
  const onlyLegacy = songs.every(s => legacyTitles.has(s.title) || s.title === "death bed (coffee for your head)");
  const matchesOldDefault = songs.length === 6 && onlyLegacy;
  if (matchesOldDefault) return JSON.parse(JSON.stringify(DEFAULT_SONGS));
  const legacy5Titles = new Set([
    "Ghost in Town",
    "death bed (coffee for your head)",
    "Bless The Telephone",
    "Vachari",
    "Tears Over Beers"
  ]);
  if (songs.length === 5 && songs.every(s => legacy5Titles.has(s.title))) {
    return JSON.parse(JSON.stringify(DEFAULT_SONGS));
  }
  const matchesDefaultTitles = songs.length === DEFAULT_SONGS.length
    && songs.every((s, i) => s.title === DEFAULT_SONGS[i].title);
  if (matchesDefaultTitles && songs.some(s => !s.url)) {
    return JSON.parse(JSON.stringify(DEFAULT_SONGS));
  }
  return songs;
};

const normalizeAboutContent = (about, key) => {
  const base = about || {};
  const rawBooks = Array.isArray(base.books) ? migrateLegacyBooks(base.books) : [];
  const rawSongs = Array.isArray(base.songs) ? migrateLegacySongs(base.songs) : [];
  return {
    hero: String(base.hero || "").trim(),
    body: Array.isArray(base.body) ? base.body.map(String) : splitLines(base.body),
    photo: String(base.photo || "").trim(),
    stack: Array.isArray(base.stack) ? base.stack.map(String) : splitCsv(base.stack),
    links: Array.isArray(base.links)
      ? base.links.filter(l => l && (l.label || l.url)).map(l => ({
        label: String(l.label || l.url || "").trim(),
        url: String(l.url || "").trim()
      }))
      : [],
    books: rawBooks
      .filter(b => b && (b.title || b.coverUrl)).map(b => ({
        title: String(b.title || "").trim(),
        author: String(b.author || "").trim(),
        coverUrl: String(b.coverUrl || b.cover || "").trim(),
        url: String(b.url || "").trim()
      })),
    songs: rawSongs
      .filter(s => s && s.title).map(s => ({
        title: String(s.title || "").trim(),
        artist: String(s.artist || "").trim(),
        url: String(s.url || "").trim()
      }))
  };
};

const normalizeContactContent = (contact, key, resume) => {
  const base = contact || {};
  const r = resume || {};
  return {
    headline: String(base.headline || "My inbox is open").trim(),
    subhead: String(base.subhead || "Have an idea, a project, or just want to talk? Drop a message!").trim(),
    email: String(base.email || r.email || "").trim(),
    phone: String(base.phone || r.phone || "").trim(),
    location: String(base.location || r.location || "").trim(),
    timezone: String(base.timezone || "America/New_York").trim(),
    links: Array.isArray(base.links)
      ? base.links.filter(l => l && (l.label || l.url)).map(l => ({
        label: String(l.label || l.url || "").trim(),
        url: String(l.url || "").trim()
      }))
      : []
  };
};

const normalizeResumeContent = (resume, key) => {
  const base = resume || {};
  const legacyExp = base.experience && !Array.isArray(base.experience) && typeof base.experience === "object";
  const hasNewShape = !legacyExp && (base.name !== undefined || Array.isArray(base.education) || Array.isArray(base.experience));
  if (hasNewShape) {
    return {
      name: String(base.name || profileLabel(key)).trim(),
      location: String(base.location || "").trim(),
      phone: String(base.phone || "").trim(),
      email: String(base.email || "").trim(),
      summary: String(base.summary || base.bio || "").trim(),
      education: (Array.isArray(base.education) ? base.education : []).map(e => ({
        school: String(e.school || "").trim(),
        location: String(e.location || "").trim(),
        degree: String(e.degree || "").trim(),
        date: String(e.date || "").trim(),
        bullets: Array.isArray(e.bullets) ? e.bullets.map(String) : splitLines(e.bullets)
      })),
      experience: (Array.isArray(base.experience) ? base.experience : []).map(e => ({
        company: String(e.company || "").trim(),
        location: String(e.location || "").trim(),
        role: String(e.role || "").trim(),
        date: String(e.date || "").trim(),
        bullets: Array.isArray(e.bullets) ? e.bullets.map(String) : splitLines(e.bullets)
      })),
      skillsSections: (Array.isArray(base.skillsSections) ? base.skillsSections : []).map(s => ({
        title: String(s.title || "Skills").trim(),
        content: String(s.content || "").trim()
      }))
    };
  }
  const legacySkills = Array.isArray(base.skills) ? base.skills : splitCsv(base.skills);
  const exp = legacyExp ? base.experience : {};
  return {
    name: profileLabel(key),
    location: "",
    phone: "",
    email: "",
    summary: String(base.bio || base.hero || "").trim(),
    education: [],
    experience: exp?.role ? [{
      company: String(exp.role).split(" · ").slice(1).join(" · ") || String(exp.role),
      location: "",
      role: String(exp.role).split(" · ")[0] || String(exp.role),
      date: String(exp.date || "").trim(),
      bullets: exp.desc ? [String(exp.desc)] : []
    }] : [],
    skillsSections: legacySkills.length ? [{ title: "Skills", content: legacySkills.join(", ") }] : []
  };
};

const defaultProfileContent = key => {
  const branch = BRANCHES.find(b => b.key === key);
  const branchName = branch ? branch.label : "Jabnow";
  return {
    about: {
      hero: key === "jabnow"
        ? "A small filing cabinet to keep track of past projects and WIPs."
        : `${branchName} work — projects, process, and background.`,
      body: key === "jabnow"
        ? [
            "The home view is a force-directed graph of every project, grouped around a center node. Click a project to view it; drag any node to rearrange the layout.",
            "The list view supports search, category folders, and sort. Everything you add or change is stored in this browser's localStorage, so it sticks around between visits on this device."
          ]
        : [
            `This is the ${branchName.toLowerCase()} profile — tailored projects and narrative for that lane of work.`,
            "Switch profiles from the dropdown to see other sides of the portfolio."
          ],
      stack: key === "jabnow"
        ? ["Vanilla HTML / CSS / JS", "D3 Force Graph", "Browser localStorage"]
        : [`${branchName} projects`, "Case studies", "Selected tools"],
      links: key === "jabnow"
        ? [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/wang-joy/" },
            { label: "GitHub", url: "https://github.com/jabnow" }
          ]
        : [],
      books: key === "jabnow" ? JSON.parse(JSON.stringify(DEFAULT_BOOKS)) : [],
      songs: key === "jabnow" ? JSON.parse(JSON.stringify(DEFAULT_SONGS)) : []
    },
    contact: {
      headline: "My inbox is open",
      subhead: key === "jabnow"
        ? "Have an idea, a project, or just want to talk? Drop a message!"
        : `Questions about ${branchName.toLowerCase()} work, collaboration, or opportunities?`,
      email: key === "jabnow" || BRANCH_PROFILE_KEYS.includes(key) ? "joywang@nyu.edu" : "",
      phone: key === "jabnow" ? "(978) 489-4207" : "",
      location: key === "jabnow" || BRANCH_PROFILE_KEYS.includes(key) ? "New York, NY, USA" : "",
      timezone: "America/New_York",
      links: (key === "jabnow" || BRANCH_PROFILE_KEYS.includes(key))
        ? [{ label: "LinkedIn", url: "https://linkedin.com/in/" }]
        : []
    },
    resume: key === "jabnow"
      ? JSON.parse(JSON.stringify(JABNOW_SAMPLE_RESUME))
      : {
        name: profileLabel(key),
        location: "",
        phone: "",
        email: "",
        summary: `${branchName} background and highlights.`,
        education: [],
        experience: [{
          company: "Company",
          location: "City, ST",
          role: `${branchName} role title`,
          date: "2024–Present",
          bullets: ["Brief description of responsibilities and impact."]
        }],
        skillsSections: [{
          title: "Skills",
          content: key === "analyst"
            ? "Excel / SQL, Data visualization, Reporting"
            : key === "product"
              ? "Product strategy, Roadmapping, User research"
              : "Creative direction, Design & media, Self-directed builds"
        }]
      }
  };
};

const DEFAULT_SITE_CONFIG = {
  shareSelection: ["jabnow"],
  contactPublicProfiles: ["product", "analyst", "indie"],
  visibleProfiles: ["product", "analyst", "indie"],
  profiles: Object.fromEntries(PROFILE_KEYS.map(key => [key, defaultProfileContent(key)]))
};

const SITE_CONFIG_KEY = "jabnow_site_config_v1";

const siteConfigStore = {
  load() {
    try {
      const raw = localStorage.getItem(SITE_CONFIG_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return siteConfigStore.merge(DEFAULT_SITE_CONFIG, parsed);
      }
    } catch (err) {
      console.warn("Failed to parse site config, using defaults.", err);
    }
    siteConfigStore.save(DEFAULT_SITE_CONFIG);
    return JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));
  },
  merge(base, patch) {
    const profiles = {};
    PROFILE_KEYS.forEach(key => {
      const mergedAbout = { ...base.profiles[key].about, ...(patch.profiles?.[key]?.about || {}) };
      const mergedResume = { ...base.profiles[key].resume, ...(patch.profiles?.[key]?.resume || {}) };
      const mergedContact = { ...(base.profiles[key].contact || {}), ...(patch.profiles?.[key]?.contact || {}) };
      const resume = normalizeResumeContent(mergedResume, key);
      profiles[key] = {
        about: normalizeAboutContent(mergedAbout, key),
        resume,
        contact: normalizeContactContent(mergedContact, key, resume)
      };
    });
    return {
      shareSelection: Array.isArray(patch.shareSelection) ? patch.shareSelection : base.shareSelection,
      contactPublicProfiles: Array.isArray(patch.contactPublicProfiles) ? patch.contactPublicProfiles : base.contactPublicProfiles,
      visibleProfiles: Array.isArray(patch.visibleProfiles) ? patch.visibleProfiles : base.visibleProfiles,
      profiles
    };
  },
  save(config) {
    localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(config));
  }
};

const parseShareProfilesFromUrl = () => {
  const raw = new URLSearchParams(location.search).get("profiles");
  if (!raw) return null;
  const keys = raw.split(",").map(v => v.trim().toLowerCase()).filter(k => BRANCH_PROFILE_KEYS.includes(k));
  return keys.length ? keys : null;
};

const normalizeShareSelection = selection => {
  const picked = (selection || []).filter(k => PROFILE_KEYS.includes(k));
  if (!picked.length || picked.includes("jabnow")) return ["jabnow"];
  return picked;
};

const buildShareLink = selection => {
  const normalized = normalizeShareSelection(selection);
  const base = PUBLIC_SITE_URL.replace(/\/$/, "");
  if (normalized.includes("jabnow")) return `${base}/`;
  return `${base}/?profiles=${normalized.join(",")}`;
};

const normalizeBranch = branch => {
  const key = String(branch || "").toLowerCase();
  return BRANCH_KEYS.includes(key) ? key : "indie";
};

const NODE_SHAPES = ["hexagon", "circle", "square", "triangle"];

const normalizeShape = shape => {
  const key = String(shape || "").toLowerCase();
  return NODE_SHAPES.includes(key) ? key : null;
};

const shapeForProject = project => {
  const explicit = normalizeShape(project?.shape);
  if (explicit) return explicit;
  const cat = String(project?.category || "").toLowerCase();
  if (cat === "image" || cat === "video") return "circle";
  if (cat === "excel") return "square";
  if (cat === "code") return "triangle";
  return "hexagon";
};

const isProjectOnGraph = project => project.graphAttached !== false;

const MEDIA_KINDS = ["image", "video", "excel", "embed", "link"];
const genMediaId = () => `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

const normalizeMedia = media => {
  if (!Array.isArray(media)) return [];
  return media
    .filter(item => item && MEDIA_KINDS.includes(item.kind))
    .map(item => ({
      id: item.id || genMediaId(),
      kind: item.kind,
      name: String(item.name || "").slice(0, 200),
      url: String(item.url || ""),
      mime: String(item.mime || ""),
      caption: String(item.caption || "")
    }))
    .filter(item => item.url);
};

const cloneMedia = media => normalizeMedia(media).map(item => ({ ...item }));

const readFileAsDataURL = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error || new Error("File read failed"));
  reader.readAsDataURL(file);
});

const MEDIA_KIND_ICON = { image: "🖼", video: "🎬", excel: "📊", embed: "🔗", link: "🔗" };
const MEDIA_KIND_LABEL = { image: "Image", video: "Video", excel: "Spreadsheet", embed: "Embed", link: "Link" };

const normalizeEmbedUrl = rawUrl => {
  const url = String(rawUrl || "").trim();
  if (!url) return "";
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }
    if (host === "codepen.io") {
      const parts = u.pathname.split("/").filter(Boolean);
      const penIdx = parts.indexOf("pen");
      if (penIdx >= 1 && parts[penIdx + 1]) {
        const id = parts[penIdx + 1];
        if (parts[0] === "team" && penIdx >= 2) {
          return `https://codepen.io/team/${parts[1]}/embed/${id}?default-tab=result`;
        }
        return `https://codepen.io/${parts[penIdx - 1]}/embed/${id}?default-tab=result`;
      }
    }
    if (host === "jsfiddle.net") {
      return url.includes("/embed/") ? url : `${url.replace(/\/$/, "")}/embedded/result/`;
    }
    if (host === "gist.github.com") {
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) return `https://gist.github.com/${parts[0]}/${parts[1]}.pibb`;
    }
    if (host === "stackblitz.com" && u.pathname.includes("/edit/")) {
      return url.includes("embed=1") ? url : `${url}${url.includes("?") ? "&" : "?"}embed=1`;
    }
    if (host === "docs.google.com") {
      return url.replace(/\/(edit|view)(\?[^#]*)?(#.*)?$/, "/preview");
    }
    if (/\.(xlsx|xls|docx|doc|pptx|ppt)$/i.test(u.pathname)) {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
    }
  } catch {
    return url;
  }
  return url;
};

const isProjectEmpty = project => {
  const title = String(project.title || "").trim();
  const desc = String(project.description || "").trim();
  return !desc || title === "Untitled project" || title === "Untitled";
};

const projectGraphStatus = project => {
  if (!isProjectOnGraph(project)) {
    return isProjectEmpty(project) ? "Empty · not on graph" : "Not on graph";
  }
  const branch = BRANCHES.find(b => b.key === normalizeBranch(project.branch));
  const branchLabel = branch ? branch.label : project.branch;
  return isProjectEmpty(project) ? `Empty · ${branchLabel}` : `On · ${branchLabel}`;
};

const SEED = [
  {
    title: "Project 1",
    branch: "product",
    category: "code",
    updated: "2026-05-01",
    url: "",
    description: "Build and implementation workflow for an interactive project.",
    tags: ["portfolio", "frontend"],
    tools: ["JavaScript", "HTML", "CSS"]
  },
  {
    title: "Project 2",
    branch: "analyst",
    category: "excel",
    updated: "2026-05-11",
    url: "",
    description: "Workbook-driven analysis and reporting outputs.",
    tags: ["analysis", "dashboard"],
    tools: ["Excel", "Power Query"]
  },
  {
    title: "Image Project",
    branch: "indie",
    category: "image",
    updated: "2026-04-22",
    url: "",
    description: "Static visual communications and graphics experiments.",
    tags: ["visual", "design"],
    tools: ["Photoshop", "Illustrator"]
  },
  {
    title: "Video Project",
    branch: "indie",
    category: "video",
    updated: "2026-03-14",
    url: "",
    description: "Editing timeline, production notes, and final export.",
    tags: ["motion", "storyboard"],
    tools: ["Premiere Pro"]
  },
  {
    title: "Multimedia Project",
    branch: "product",
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
      if (raw) {
        return JSON.parse(raw).map(project => ({
          ...project,
          branch: normalizeBranch(project.branch),
          graphAttached: project.graphAttached !== false,
          shape: normalizeShape(project.shape),
          media: normalizeMedia(project.media)
        }));
      }
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
  search: "",
  branchFilter: "all",
  categoryFilter: "all",
  currentPage: "home",
  layoutFullpage: false,
  projects: store.load(),
  siteConfig: siteConfigStore.load(),
  shareProfiles: parseShareProfilesFromUrl(),
  viewingAboutProfile: "jabnow",
  viewingResumeProfile: "jabnow",
  editingId: null,
  selectedGraphBranch: null,
  graphPickerProjectId: null,
  graphProjectSearch: "",
  formMedia: [],
  aboutEditPreview: false,
  resumeEditPreview: false,
  profile: sessionStorage.getItem(SESSION_KEY) === "1" ? "editor" : "guest"
};

const isEditor = () => state.profile === "editor";

const isShareView = () => !isEditor() && Array.isArray(state.shareProfiles);

// Global, editor-controlled toggle of which branch profiles guests may see.
const guestVisibleBranches = () => {
  const configured = state.siteConfig?.visibleProfiles;
  const list = Array.isArray(configured) ? configured : BRANCH_PROFILE_KEYS;
  return BRANCH_PROFILE_KEYS.filter(key => list.includes(key));
};

// True when a branch's nodes/pages should exist for the current viewer.
const isBranchGloballyVisible = branchKey => guestVisibleBranches().includes(branchKey);

const isBranchProfileEnabled = branchKey => {
  if (!isBranchGloballyVisible(branchKey)) return false;
  if (!state.shareProfiles) return true;
  return state.shareProfiles.includes(branchKey);
};

const isContentProfileEnabled = profileKey => {
  if (profileKey === "jabnow") return !state.shareProfiles;
  if (!isBranchGloballyVisible(profileKey)) return false;
  if (!state.shareProfiles) return true;
  return state.shareProfiles.includes(profileKey);
};

const enabledContentProfiles = () => PROFILES.filter(p => isContentProfileEnabled(p.key));

const refs = {
  search: document.getElementById("project-search"),
  branchList: document.getElementById("branch-list"),
  folderList: document.getElementById("folder-list"),
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
  connectionText: document.getElementById("connection-text"),
  workSubmenu: document.getElementById("work-submenu"),
  navGroupWork: document.getElementById("nav-group-work"),
  projectDetailTitle: document.getElementById("project-detail-title"),
  projectDetailCat: document.getElementById("project-detail-cat"),
  projectDetailDate: document.getElementById("project-detail-date"),
  projectDetailHeading: document.getElementById("project-detail-heading"),
  projectDetailDesc: document.getElementById("project-detail-desc"),
  projectDetailMeta: document.getElementById("project-detail-meta"),
  projectDetailLink: document.getElementById("project-detail-link"),
  projectDetailEdit: document.getElementById("project-detail-edit"),
  contactForm: document.getElementById("contact-form"),
  contactToast: document.getElementById("contact-toast"),
  contactHeadline: document.getElementById("contact-headline"),
  contactSubhead: document.getElementById("contact-subhead"),
  contactDetails: document.getElementById("contact-details"),
  contactLocation: document.getElementById("contact-location"),
  contactEditorPanel: document.getElementById("contact-editor-panel"),
  contactEditorForm: document.getElementById("contact-editor-form"),
  contactLinksList: document.getElementById("contact-links-list"),
  contactAddLink: document.getElementById("contact-add-link"),
  contactEditorToast: document.getElementById("contact-editor-toast"),
  sbLogo: document.getElementById("sb-logo"),
  sbStarburst: document.getElementById("sb-starburst"),
  sbBio: document.getElementById("sb-bio"),
  profileLabel: document.getElementById("profile-label"),
  profileLogout: document.getElementById("profile-logout"),
  loginForm: document.getElementById("login-form"),
  loginCancel: document.getElementById("login-cancel"),
  loginToast: document.getElementById("login-toast"),
  navShareLi: document.getElementById("nav-share-li"),
  aboutProfileSelect: document.getElementById("about-profile-select"),
  aboutProfileLabel: document.getElementById("about-profile-label"),
  aboutContent: document.getElementById("about-content"),
  resumeProfileSelect: document.getElementById("resume-profile-select"),
  resumeProfileLabel: document.getElementById("resume-profile-label"),
  resumeContent: document.getElementById("resume-content"),
  contactProfileOptions: document.getElementById("contact-profile-options"),
  shareProfileChecks: document.getElementById("share-profile-checks"),
  shareLinkOutput: document.getElementById("share-link-output"),
  shareLinkCopy: document.getElementById("share-link-copy"),
  shareLinkNote: document.getElementById("share-link-note"),
  contactPublicChecks: document.getElementById("contact-public-checks"),
  visibilityChecks: document.getElementById("visibility-checks"),
  shareContentProfile: document.getElementById("share-content-profile"),
  shareContentForm: document.getElementById("share-content-form"),
  shareToast: document.getElementById("share-toast"),
  graphHintGuest: document.getElementById("graph-hint-guest"),
  graphActionBar: document.getElementById("graph-action-bar"),
  graphTargetLabel: document.getElementById("graph-target-label"),
  graphProjectSearch: document.getElementById("graph-project-search"),
  graphProjectPicker: document.getElementById("graph-project-picker"),
  graphShapeSelect: document.getElementById("graph-shape-select"),
  graphAttachBtn: document.getElementById("graph-attach-btn"),
  graphNewBtn: document.getElementById("graph-new-btn"),
  graphBranchSelect: document.getElementById("graph-branch-select"),
  autosaveStatus: document.getElementById("autosave-status"),
  mediaType: document.getElementById("media-type"),
  mediaFile: document.getElementById("media-file"),
  mediaUrl: document.getElementById("media-url"),
  mediaLabel: document.getElementById("media-label"),
  mediaAddBtn: document.getElementById("media-add-btn"),
  mediaList: document.getElementById("media-list"),
  projectDetailMedia: document.getElementById("project-detail-media"),
  aboutEditorPanel: document.getElementById("about-editor-panel"),
  aboutEditorForm: document.getElementById("about-editor-form"),
  aboutLinksList: document.getElementById("about-links-list"),
  aboutAddLink: document.getElementById("about-add-link"),
  aboutBooksList: document.getElementById("about-books-list"),
  aboutSongsList: document.getElementById("about-songs-list"),
  aboutAddBook: document.getElementById("about-add-book"),
  aboutAddSong: document.getElementById("about-add-song"),
  aboutPhotoFile: document.getElementById("about-photo-file"),
  aboutEditorToast: document.getElementById("about-editor-toast"),
  resumeEditorPanel: document.getElementById("resume-editor-panel"),
  resumeEditorForm: document.getElementById("resume-editor-form"),
  resumeEducationList: document.getElementById("resume-education-list"),
  resumeExperienceList: document.getElementById("resume-experience-list"),
  resumeSkillsList: document.getElementById("resume-skills-list"),
  resumeAddEducation: document.getElementById("resume-add-education"),
  resumeAddExperience: document.getElementById("resume-add-experience"),
  resumeAddSkill: document.getElementById("resume-add-skill"),
  resumeEditorToast: document.getElementById("resume-editor-toast"),
  resumeExportPdf: document.getElementById("resume-export-pdf"),
  aboutPreviewBar: document.getElementById("about-preview-bar"),
  aboutPreviewEdit: document.getElementById("about-preview-edit"),
  resumePreviewBar: document.getElementById("resume-preview-bar"),
  resumePreviewEdit: document.getElementById("resume-preview-edit"),
  canonicalLink: document.getElementById("canonical-link"),
  structuredData: document.getElementById("structured-data")
};

const PAGE_META = {
  home: {
    title: "Jabnow — Multi-Profile Project Portfolio",
    description: "Explore Product, Analyst, and Indie projects on an interactive force-directed graph with searchable list and case studies."
  },
  list: {
    title: "All Projects — Jabnow",
    description: "Search and filter portfolio projects by branch, category, tags, and tools."
  },
  about: {
    title: "About — Jabnow",
    description: "Background, stack, and links for each portfolio profile."
  },
  resume: {
    title: "Resume — Jabnow",
    description: "ATS-friendly résumé for each profile with one-page PDF export."
  },
  contact: {
    title: "Contact — Jabnow",
    description: "Get in touch about projects, collaboration, or opportunities."
  },
  project: {
    title: "Project — Jabnow",
    description: "Project details, media, tags, and tools."
  }
};

const updatePageMeta = pageId => {
  const meta = PAGE_META[pageId] || PAGE_META.home;
  document.title = meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", meta.description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", meta.title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", meta.description);
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute("content", meta.title);
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute("content", meta.description);
  if (refs.canonicalLink) refs.canonicalLink.href = PUBLIC_SITE_URL.replace(/\/$/, "") + (location.search || "");
  if (refs.structuredData) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Jabnow",
      url: PUBLIC_SITE_URL,
      description: meta.description,
      publisher: { "@type": "Person", name: "Jabnow" }
    };
    if (pageId === "project" && state.viewingProjectId) {
      const project = state.projects.find(p => p.id === state.viewingProjectId);
      if (project) {
        schema["@type"] = "CreativeWork";
        schema.name = project.title;
        schema.description = project.description;
        schema.keywords = (project.tags || []).join(", ");
      }
    }
    refs.structuredData.textContent = JSON.stringify(schema);
  }
};

const BRANCH_COLORS = { product: "#2563eb", analyst: "#16a34a", indie: "#ec4899" };

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

const GUEST_BIO = "A filing cabinet for past projects and WIPs. Open projects from the graph or All projects — the sidebar lists only the full catalog.";
const EDITOR_BIO = "Editor mode — add projects, edit details, or update site content. Everything is saved to this browser's storage.";

const applyProfileUI = () => {
  if (!isEditor()) {
    state.aboutEditPreview = false;
    state.resumeEditPreview = false;
  }
  document.body.classList.toggle("profile-editor", isEditor());
  document.body.classList.toggle("share-view", isShareView());
  refs.sbBio.textContent = isEditor() ? EDITOR_BIO : GUEST_BIO;
  refs.profileLabel.textContent = isEditor() ? "Editor" : "Guest";
  refs.profileLogout.hidden = !isEditor();
  if (refs.navShareLi) refs.navShareLi.hidden = !isEditor();
  if (refs.graphHintGuest) refs.graphHintGuest.hidden = isEditor();
  if (refs.graphActionBar) refs.graphActionBar.hidden = !isEditor();
  renderWorkSubmenu();
  renderFilters();
  renderList();
  renderAboutPage();
  renderResumePage();
  renderContactPage();
  if (isEditor()) renderSharePage();
  if (state.viewingProjectId) {
    const project = state.projects.find(p => p.id === state.viewingProjectId);
    if (project) renderProjectDetail(project);
  }
  if (state.currentPage === "home") {
    renderGraphActionBar();
    renderGraph({ rebuild: true });
  }
};

const signIn = () => {
  sessionStorage.setItem(SESSION_KEY, "1");
  state.profile = "editor";
  applyProfileUI();
};

const signOut = () => {
  sessionStorage.removeItem(SESSION_KEY);
  state.profile = "guest";
  state.aboutEditPreview = false;
  state.resumeEditPreview = false;
  if (state.editingId) cancelEdit();
  applyProfileUI();
  showPage("home");
};

const requireEditor = () => {
  if (isEditor()) return true;
  showToast("Editor sign-in required", "warn", 3000);
  return false;
};

const persistSiteConfig = () => {
  siteConfigStore.save(state.siteConfig);
};

const persist = () => {
  try {
    store.save(state.projects);
  } catch (err) {
    console.error("Failed to save projects.", err);
    showToast("Storage full — use smaller files or link/embed instead.", "warn", 5000);
  }
  updateStatusFooter();
};

const fillProfileSelect = (select, currentKey) => {
  if (!select) return;
  const enabled = enabledContentProfiles();
  select.innerHTML = "";
  enabled.forEach(({ key, label }) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = label;
    select.appendChild(opt);
  });
  if (enabled.some(p => p.key === currentKey)) select.value = currentKey;
  else if (enabled.length) select.value = enabled[0].key;
};

const formatLocalTime = timezone => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone || "America/New_York"
    }).format(new Date());
  } catch {
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(new Date());
  }
};

const truncateText = (text, max) => {
  const s = String(text || "");
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
};

const extractYoutubeVideoId = url => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    return u.searchParams.get("v");
  } catch {
    const match = String(url).match(/(?:v=|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : null;
  }
};

let youtubeApiPromise = null;
const loadYoutubeIframeApi = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;
  youtubeApiPromise = new Promise(resolve => {
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevReady?.();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return youtubeApiPromise;
};

const ipod = {
  songs: [],
  selected: 0,
  playing: false,
  ytPlayer: null,
  ytReady: false,
  playerInitPromise: null,
  ui: null,
  getPlayerHost() {
    let el = document.getElementById("about-ipod-player-host");
    if (!el) {
      el = document.createElement("div");
      el.id = "about-ipod-player-host";
      el.className = "about-ipod__player-host";
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
    }
    return el;
  }
};

let ipodUiDetach = null;

const syncIpodPlayingFromPlayer = () => {
  if (!ipod.ytPlayer || !ipod.ytReady || !window.YT) return;
  const state = ipod.ytPlayer.getPlayerState();
  ipod.playing = state === window.YT.PlayerState.PLAYING;
};

const ipodCurrentVideoId = () => extractYoutubeVideoId(ipod.songs[ipod.selected]?.url);

const ipodNotifyUi = () => {
  ipod.ui?.paintScreen?.();
  ipod.ui?.updatePlayBtn?.();
};

const ipodHandlePlayerStateChange = event => {
  if (!window.YT) return;
  if (event.data === window.YT.PlayerState.ENDED) {
    ipod.selected = (ipod.selected + 1) % ipod.songs.length;
    ipodPlaySelected(true);
    return;
  }
  if (event.data === window.YT.PlayerState.PLAYING) {
    ipod.playing = true;
    ipodNotifyUi();
  } else if (event.data === window.YT.PlayerState.PAUSED) {
    ipod.playing = false;
    ipodNotifyUi();
  }
};

const ipodEnsurePlayer = videoId => loadYoutubeIframeApi().then(() => {
  const playerHost = ipod.getPlayerHost();
  if (ipod.ytPlayer && ipod.ytReady) {
    ipod.ytPlayer.loadVideoById(videoId);
    return ipod.ytPlayer;
  }
  if (ipod.playerInitPromise) {
    return ipod.playerInitPromise.then(player => {
      player.loadVideoById(videoId);
      return player;
    });
  }
  ipod.playerInitPromise = new Promise(resolve => {
    ipod.ytPlayer = new window.YT.Player(playerHost, {
      height: "1",
      width: "1",
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1
      },
      events: {
        onReady: e => {
          ipod.ytReady = true;
          resolve(e.target);
        },
        onStateChange: ipodHandlePlayerStateChange
      }
    });
  });
  return ipod.playerInitPromise;
});

const ipodPlaySelected = async (autoPlay = true) => {
  const videoId = ipodCurrentVideoId();
  if (!videoId) {
    ipod.playing = false;
    ipodNotifyUi();
    return;
  }
  try {
    const player = await ipodEnsurePlayer(videoId);
    if (autoPlay) player.playVideo();
    else {
      ipod.playing = false;
      ipodNotifyUi();
    }
  } catch {
    ipod.playing = false;
    ipodNotifyUi();
  }
};

const ipodTogglePlay = async () => {
  const videoId = ipodCurrentVideoId();
  if (!videoId) return;
  if (!ipod.ytPlayer || !ipod.ytReady) {
    await ipodPlaySelected(true);
    return;
  }
  const YT = window.YT;
  const state = ipod.ytPlayer.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    ipod.ytPlayer.pauseVideo();
    ipod.playing = false;
    ipodNotifyUi();
    return;
  }
  const loadedId = ipod.ytPlayer.getVideoData?.()?.video_id;
  if (loadedId !== videoId) {
    await ipodPlaySelected(true);
  } else {
    ipod.ytPlayer.playVideo();
    ipod.playing = true;
    ipodNotifyUi();
  }
};

const ipodPause = () => {
  if (ipod.ytPlayer?.pauseVideo) ipod.ytPlayer.pauseVideo();
  ipod.playing = false;
  ipodNotifyUi();
};

const renderAboutIpod = (container, songs) => {
  if (!songs.length) return;
  ipodUiDetach?.();
  ipodUiDetach = null;

  ipod.songs = songs;
  if (ipod.selected >= songs.length) ipod.selected = 0;
  syncIpodPlayingFromPlayer();
  if (ipod.ytPlayer?.getVideoData) {
    const loadedId = ipod.ytPlayer.getVideoData()?.video_id;
    const matchIdx = songs.findIndex(s => extractYoutubeVideoId(s.url) === loadedId);
    if (matchIdx >= 0) ipod.selected = matchIdx;
  }

  const pill = document.createElement("span");
  pill.className = "about-section-pill";
  pill.textContent = "Listen";
  container.appendChild(pill);

  const device = document.createElement("div");
  device.className = "about-ipod";

  const screen = document.createElement("div");
  screen.className = "about-ipod__screen about-ipod__screen--all";

  const wheel = document.createElement("div");
  wheel.className = "about-ipod__wheel";
  wheel.innerHTML = `
    <button type="button" class="about-ipod__wheel-btn about-ipod__wheel-btn--menu" aria-label="Menu">MENU</button>
    <button type="button" class="about-ipod__wheel-btn about-ipod__wheel-btn--prev" aria-label="Previous">⏮</button>
    <button type="button" class="about-ipod__wheel-btn about-ipod__wheel-btn--next" aria-label="Next">⏭</button>
    <button type="button" class="about-ipod__wheel-btn about-ipod__wheel-btn--play" aria-label="Play or pause">▶</button>
    <span class="about-ipod__wheel-ring" aria-hidden="true"></span>
  `;

  const playBtn = wheel.querySelector(".about-ipod__wheel-btn--play");

  const updatePlayBtn = () => {
    if (playBtn) playBtn.textContent = ipod.playing ? "⏸" : "▶";
  };

  const paintScreen = () => {
    screen.classList.toggle("about-ipod__screen--playing", ipod.playing);
    const activeSong = ipod.songs[ipod.selected];
    const statusLabel = ipod.playing && activeSong?.title
      ? truncateText(activeSong.title, 20)
      : "All Songs";
    screen.innerHTML = `
      <div class="about-ipod__status">
        <span class="about-ipod__status-play">${ipod.playing ? "⏸" : "▶"}</span>
        <span class="about-ipod__status-title">${statusLabel}</span>
        <span class="about-ipod__status-battery" aria-hidden="true">▮▮▮</span>
      </div>
      <ul class="about-ipod__tracks" role="listbox" aria-label="Songs"></ul>
    `;
    const list = screen.querySelector(".about-ipod__tracks");
    ipod.songs.forEach((song, idx) => {
      const li = document.createElement("li");
      li.className = "about-ipod__track" + (idx === ipod.selected ? " about-ipod__track--active" : "");
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(idx === ipod.selected));
      const label = song.artist ? `${song.title} — ${song.artist}` : song.title;
      li.textContent = truncateText(label, 32);
      li.title = label;
      li.addEventListener("click", () => {
        if (ipod.selected === idx) ipodTogglePlay();
        else {
          ipod.selected = idx;
          if (ipod.playing) ipodPlaySelected(true);
          else paintScreen();
        }
      });
      list.appendChild(li);
    });
    updatePlayBtn();
  };

  ipod.ui = { paintScreen, updatePlayBtn };

  wheel.querySelector(".about-ipod__wheel-btn--prev").addEventListener("click", () => {
    ipod.selected = (ipod.selected - 1 + ipod.songs.length) % ipod.songs.length;
    if (ipod.playing) ipodPlaySelected(true);
    else paintScreen();
  });
  wheel.querySelector(".about-ipod__wheel-btn--next").addEventListener("click", () => {
    ipod.selected = (ipod.selected + 1) % ipod.songs.length;
    if (ipod.playing) ipodPlaySelected(true);
    else paintScreen();
  });
  playBtn.addEventListener("click", () => ipodTogglePlay());
  wheel.querySelector(".about-ipod__wheel-btn--menu").addEventListener("click", () => {
    ipodPause();
    ipod.selected = 0;
    paintScreen();
  });

  ipodUiDetach = () => {
    ipod.ui = null;
  };

  device.append(screen, wheel);
  container.appendChild(device);
  paintScreen();
};

const makeStackEditorCard = (text, grid) => {
  const wrap = document.createElement("div");
  wrap.className = "about-stack-editor__item";
  const input = document.createElement("textarea");
  input.className = "value-card about-stack-editor__input";
  input.rows = 3;
  input.value = text;
  input.placeholder = "Stack card text";
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "about-stack-editor__remove";
  remove.setAttribute("aria-label", "Remove stack card");
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    if (grid.children.length <= 1) {
      input.value = "";
      return;
    }
    wrap.remove();
  });
  wrap.append(input, remove);
  return wrap;
};

const readAboutStackEditor = () => [...document.querySelectorAll("#about-stack-editor .about-stack-editor__input")]
  .map(el => el.value.trim())
  .filter(Boolean);

const makeLinkEditorCard = (link, list) => {
  const wrap = document.createElement("div");
  wrap.className = "about-links-editor__item";
  const icon = document.createElement("span");
  icon.className = "about-links-editor__icon";
  icon.textContent = "↗";
  icon.setAttribute("aria-hidden", "true");
  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.className = "about-links-editor__label";
  labelInput.placeholder = "Label";
  labelInput.value = link.label || "";
  const urlInput = document.createElement("input");
  urlInput.type = "url";
  urlInput.className = "about-links-editor__url";
  urlInput.placeholder = "https://…";
  urlInput.value = link.url || "";
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "about-links-editor__remove";
  remove.setAttribute("aria-label", "Remove link");
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    if (list.children.length <= 1) {
      labelInput.value = "";
      urlInput.value = "";
      return;
    }
    wrap.remove();
  });
  wrap.append(icon, labelInput, urlInput, remove);
  return wrap;
};

const readAboutLinksEditor = () => [...document.querySelectorAll("#about-links-editor .about-links-editor__item")]
  .map(item => ({
    label: item.querySelector(".about-links-editor__label")?.value.trim() || "",
    url: item.querySelector(".about-links-editor__url")?.value.trim() || ""
  }))
  .filter(l => l.label || l.url);

const makeBookEditorBlock = book => {
  const block = makeRepeatBlock(
    [
      { name: "title", label: "Title" },
      { name: "author", label: "Author" },
      { name: "coverUrl", label: "Cover URL", placeholder: "https://… or upload" },
      { name: "url", label: "Link (optional)", placeholder: "https://…" }
    ],
    book,
    null
  );
  const fileWrap = document.createElement("div");
  const fileLbl = document.createElement("label");
  fileLbl.textContent = "Cover upload";
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  file.addEventListener("change", async () => {
    const f = file.files?.[0];
    if (!f) return;
    try {
      const url = await readFileAsDataURL(f);
      const input = block.querySelector('[name="coverUrl"]');
      if (input) input.value = url;
    } catch {
      showToast("Could not read image", "warn");
    }
  });
  fileWrap.append(fileLbl, file);
  const removeBtn = block.querySelector(".repeat-block__remove");
  if (removeBtn) block.insertBefore(fileWrap, removeBtn);
  else block.appendChild(fileWrap);
  return block;
};

const renderAboutPage = () => {
  fillProfileSelect(refs.aboutProfileSelect, state.viewingAboutProfile);
  const key = refs.aboutProfileSelect?.value || state.viewingAboutProfile;
  state.viewingAboutProfile = key;
  const content = state.siteConfig.profiles[key]?.about;
  if (!content || !refs.aboutContent) return;
  if (refs.aboutProfileLabel) refs.aboutProfileLabel.textContent = profileLabel(key);
  refs.aboutContent.innerHTML = "";

  const intro = document.createElement("div");
  intro.className = "about-intro";
  const introText = document.createElement("div");
  introText.className = "about-intro__text";
  const hero = document.createElement("h2");
  hero.className = "about-hero";
  hero.textContent = content.hero;
  introText.appendChild(hero);
  (content.body || []).forEach(text => {
    const p = document.createElement("p");
    p.className = "about-bio";
    p.textContent = text;
    introText.appendChild(p);
  });
  intro.appendChild(introText);
  if (content.photo) {
    const photoWrap = document.createElement("figure");
    photoWrap.className = "about-intro__photo";
    const img = document.createElement("img");
    img.src = content.photo;
    img.alt = "";
    img.loading = "lazy";
    photoWrap.appendChild(img);
    intro.appendChild(photoWrap);
  }
  refs.aboutContent.appendChild(intro);

  if ((content.stack || []).length || (isEditor() && !state.aboutEditPreview)) {
    const stackLabel = document.createElement("p");
    stackLabel.className = "sec-label";
    stackLabel.textContent = "Stack";
    refs.aboutContent.appendChild(stackLabel);

    if (isEditor() && !state.aboutEditPreview) {
      const stackEditor = document.createElement("div");
      stackEditor.className = "about-stack-editor";
      stackEditor.id = "about-stack-editor";
      const grid = document.createElement("div");
      grid.className = "values-grid about-stack-editor__grid";
      const stackItems = content.stack?.length ? [...content.stack] : [""];
      stackItems.forEach(text => {
        grid.appendChild(makeStackEditorCard(text, grid));
      });
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "ghost-btn repeat-add about-stack-editor__add";
      addBtn.textContent = "+ Add stack card";
      addBtn.addEventListener("click", () => {
        grid.appendChild(makeStackEditorCard("", grid));
      });
      stackEditor.append(grid, addBtn);
      refs.aboutContent.appendChild(stackEditor);
    } else if ((content.stack || []).length) {
      const grid = document.createElement("div");
      grid.className = "values-grid";
      content.stack.forEach(item => {
        const card = document.createElement("div");
        card.className = "value-card";
        card.textContent = item;
        grid.appendChild(card);
      });
      refs.aboutContent.appendChild(grid);
    }
  }
  if ((content.links || []).length || (isEditor() && !state.aboutEditPreview)) {
    const linksLabel = document.createElement("p");
    linksLabel.className = "sec-label";
    linksLabel.textContent = "Links";
    refs.aboutContent.appendChild(linksLabel);

    if (isEditor() && !state.aboutEditPreview) {
      const linksEditor = document.createElement("div");
      linksEditor.className = "about-links-editor";
      linksEditor.id = "about-links-editor";
      const list = document.createElement("div");
      list.className = "about-links-editor__list";
      const linkItems = content.links?.length ? content.links.map(l => ({ ...l })) : [emptyAboutLink()];
      linkItems.forEach(link => {
        list.appendChild(makeLinkEditorCard(link, list));
      });
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "ghost-btn repeat-add about-links-editor__add";
      addBtn.textContent = "+ Add link";
      addBtn.addEventListener("click", () => {
        list.appendChild(makeLinkEditorCard(emptyAboutLink(), list));
      });
      linksEditor.append(list, addBtn);
      refs.aboutContent.appendChild(linksEditor);
    } else if ((content.links || []).length) {
      const linksWrap = document.createElement("div");
      linksWrap.className = "about-links";
      content.links.forEach(link => {
        const a = document.createElement("a");
        a.className = "about-link-card";
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = `<span class="about-link-card__icon">↗</span><span class="about-link-card__label">${link.label || link.url}</span>`;
        linksWrap.appendChild(a);
      });
      refs.aboutContent.appendChild(linksWrap);
    }
  }

  if ((content.books || []).length || (content.songs || []).length) {
    const mediaRow = document.createElement("div");
    mediaRow.className = "about-media-row";
    if (content.books?.length) {
      const booksCol = document.createElement("section");
      booksCol.className = "about-books";
      const pill = document.createElement("span");
      pill.className = "about-section-pill";
      pill.textContent = "Read";
      booksCol.appendChild(pill);
      const grid = document.createElement("div");
      grid.className = "about-books__grid";
      content.books.forEach(book => {
        const item = document.createElement("figure");
        item.className = "about-book";
        const coverEl = book.coverUrl
          ? (() => {
            const img = document.createElement("img");
            img.src = book.coverUrl;
            img.alt = book.title;
            img.loading = "lazy";
            if (book.url && /xkcd\.com/i.test(book.url)) {
              img.classList.add("about-book__cover--comic");
            }
            return img;
          })()
          : (() => {
            const ph = document.createElement("div");
            ph.className = "about-book__placeholder";
            ph.textContent = (book.title || "?").charAt(0).toUpperCase();
            return ph;
          })();
        if (book.url) {
          const link = document.createElement("a");
          link.className = "about-book__cover-link";
          link.href = book.url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.appendChild(coverEl);
          item.appendChild(link);
        } else {
          item.appendChild(coverEl);
        }
        const cap = document.createElement("figcaption");
        cap.innerHTML = `<strong>${book.title || "Untitled"}</strong>${book.author ? `<span>${book.author}</span>` : ""}`;
        item.appendChild(cap);
        grid.appendChild(item);
      });
      booksCol.appendChild(grid);
      mediaRow.appendChild(booksCol);
    }
    if (content.songs?.length) {
      const songsCol = document.createElement("section");
      songsCol.className = "about-songs";
      renderAboutIpod(songsCol, content.songs);
      mediaRow.appendChild(songsCol);
    }
    refs.aboutContent.appendChild(mediaRow);
  }

  syncAboutEditorUI();
  if (isEditor() && !state.aboutEditPreview) fillAboutEditorForm(key);
};

const syncAboutEditorUI = () => {
  const showPreview = isEditor() && state.aboutEditPreview;
  if (refs.aboutEditorPanel) refs.aboutEditorPanel.hidden = !isEditor() || showPreview;
  if (refs.aboutPreviewBar) refs.aboutPreviewBar.hidden = !showPreview;
};

const renderResumeAts = (container, resume) => {
  container.innerHTML = "";
  const header = document.createElement("header");
  header.className = "resume-ats__header";
  const name = document.createElement("h1");
  name.className = "resume-ats__name";
  name.textContent = resume.name || "Name";
  header.appendChild(name);
  container.appendChild(header);
  if (resume.summary) {
    const summary = document.createElement("p");
    summary.className = "resume-ats__summary";
    summary.textContent = resume.summary;
    container.appendChild(summary);
  }
  const addSection = (title, bodyEl) => {
    const section = document.createElement("section");
    section.className = "resume-ats__section";
    const h2 = document.createElement("h2");
    h2.className = "resume-ats__section-title";
    h2.textContent = title;
    section.append(h2, bodyEl);
    container.appendChild(section);
  };
  if ((resume.education || []).length) {
    const wrap = document.createElement("div");
    wrap.className = "resume-ats__entries";
    resume.education.forEach(edu => {
      const entry = document.createElement("div");
      entry.className = "resume-ats__entry";
      const head = document.createElement("div");
      head.className = "resume-ats__entry-head";
      head.innerHTML = `<strong>${edu.school}</strong><span>${edu.location}</span>`;
      entry.appendChild(head);
      const sub = document.createElement("div");
      sub.className = "resume-ats__entry-sub";
      sub.innerHTML = `<em>${edu.degree}</em><span>${edu.date}</span>`;
      entry.appendChild(sub);
      if (edu.bullets?.length) {
        const ul = document.createElement("ul");
        edu.bullets.forEach(b => {
          const li = document.createElement("li");
          li.textContent = b;
          ul.appendChild(li);
        });
        entry.appendChild(ul);
      }
      wrap.appendChild(entry);
    });
    addSection("Education", wrap);
  }
  if ((resume.experience || []).length) {
    const wrap = document.createElement("div");
    wrap.className = "resume-ats__entries";
    resume.experience.forEach(exp => {
      const entry = document.createElement("div");
      entry.className = "resume-ats__entry resume-ats__entry--experience";
      const head = document.createElement("div");
      head.className = "resume-ats__entry-head";
      head.innerHTML = `<strong>${exp.company}</strong><span>${exp.location}</span>`;
      entry.appendChild(head);
      const sub = document.createElement("div");
      sub.className = "resume-ats__entry-sub";
      sub.innerHTML = `<em>${exp.role}</em><span>${exp.date}</span>`;
      entry.appendChild(sub);
      if (exp.bullets?.length) {
        const ul = document.createElement("ul");
        exp.bullets.forEach(b => {
          const li = document.createElement("li");
          li.textContent = b;
          ul.appendChild(li);
        });
        entry.appendChild(ul);
      }
      wrap.appendChild(entry);
    });
    addSection("Work & Leadership Experience", wrap);
  }
  if ((resume.skillsSections || []).length) {
    const wrap = document.createElement("div");
    wrap.className = "resume-ats__skills";
    resume.skillsSections.forEach(sec => {
      const row = document.createElement("div");
      row.className = "resume-ats__skill-row";
      row.innerHTML = `<strong>${sec.title}</strong><p>${sec.content}</p>`;
      wrap.appendChild(row);
    });
    addSection("Skills, Activities & Interests", wrap);
  }
};

const renderResumePage = () => {
  fillProfileSelect(refs.resumeProfileSelect, state.viewingResumeProfile);
  const key = refs.resumeProfileSelect?.value || state.viewingResumeProfile;
  state.viewingResumeProfile = key;
  const resume = state.siteConfig.profiles[key]?.resume;
  if (!resume || !refs.resumeContent) return;
  if (refs.resumeProfileLabel) refs.resumeProfileLabel.textContent = profileLabel(key);
  renderResumeAts(refs.resumeContent, resume);
  syncResumeEditorUI();
  if (isEditor() && !state.resumeEditPreview) fillResumeEditorForm(key);
};

const syncResumeEditorUI = () => {
  const showPreview = isEditor() && state.resumeEditPreview;
  if (refs.resumeEditorPanel) refs.resumeEditorPanel.hidden = !isEditor() || showPreview;
  if (refs.resumePreviewBar) refs.resumePreviewBar.hidden = !showPreview;
};

const makeRepeatBlock = (fields, data, onRemove) => {
  const block = document.createElement("div");
  block.className = "repeat-block";
  fields.forEach(({ name, label, type, placeholder, rows }) => {
    const wrap = document.createElement("div");
    const lbl = document.createElement("label");
    lbl.textContent = label;
    let input;
    if (type === "textarea") {
      input = document.createElement("textarea");
      input.rows = rows || 2;
    } else {
      input = document.createElement("input");
      input.type = type || "text";
    }
    input.name = name;
    input.placeholder = placeholder || "";
    input.value = data[name] || "";
    wrap.append(lbl, input);
    block.appendChild(wrap);
  });
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "repeat-block__remove ghost-btn";
  remove.textContent = "Remove";
  remove.addEventListener("click", () => { block.remove(); onRemove?.(); });
  block.appendChild(remove);
  return block;
};

const readRepeatBlocks = (container, fieldMap) => {
  if (!container) return [];
  const items = [];
  container.querySelectorAll(".repeat-block").forEach(block => {
    const item = {};
    fieldMap.forEach(({ name, type }) => {
      const el = block.querySelector(`[name="${name}"]`);
      const val = el ? el.value.trim() : "";
      item[name] = type === "bullets" ? splitLines(val) : val;
    });
    if (fieldMap.some(f => item[f.name])) items.push(item);
  });
  return items;
};

const fillAboutEditorForm = key => {
  if (!refs.aboutEditorForm) return;
  const content = state.siteConfig.profiles[key]?.about;
  if (!content) return;
  refs.aboutEditorForm.elements.hero.value = content.hero;
  refs.aboutEditorForm.elements.body.value = (content.body || []).join("\n");
  refs.aboutEditorForm.elements.photo.value = content.photo || "";
  if (refs.aboutBooksList) {
    refs.aboutBooksList.innerHTML = "";
    (content.books?.length ? content.books : [emptyBook()]).forEach(book => {
      refs.aboutBooksList.appendChild(makeBookEditorBlock(book));
    });
  }
  if (refs.aboutSongsList) {
    refs.aboutSongsList.innerHTML = "";
    (content.songs?.length ? content.songs : [emptySong()]).forEach(song => {
      refs.aboutSongsList.appendChild(makeRepeatBlock(
        [
          { name: "title", label: "Title" },
          { name: "artist", label: "Artist (optional)" },
          { name: "url", label: "Link", placeholder: "https://music.youtube.com/…" }
        ],
        song,
        null
      ));
    });
  }
};

const fillResumeEditorForm = key => {
  if (!refs.resumeEditorForm) return;
  const resume = state.siteConfig.profiles[key]?.resume;
  if (!resume) return;
  refs.resumeEditorForm.elements.name.value = resume.name || "";
  refs.resumeEditorForm.elements.summary.value = resume.summary || "";
  const eduFields = [
    { name: "school", label: "School" },
    { name: "location", label: "Location" },
    { name: "degree", label: "Degree" },
    { name: "date", label: "Date" },
    { name: "bullets", label: "Bullets (one per line)", type: "textarea", rows: 3 }
  ];
  const expFields = [
    { name: "company", label: "Company" },
    { name: "location", label: "Location" },
    { name: "role", label: "Role" },
    { name: "date", label: "Date" },
    { name: "bullets", label: "Bullets (one per line)", type: "textarea", rows: 3 }
  ];
  const skillFields = [
    { name: "title", label: "Section title" },
    { name: "content", label: "Content", type: "textarea", rows: 2 }
  ];
  const fillList = (container, fields, items, emptyFn) => {
    if (!container) return;
    container.innerHTML = "";
    (items?.length ? items : [emptyFn()]).forEach(item => {
      const data = { ...item };
      if (Array.isArray(data.bullets)) data.bullets = data.bullets.join("\n");
      container.appendChild(makeRepeatBlock(fields, data, null));
    });
  };
  fillList(refs.resumeEducationList, eduFields, resume.education, emptyEducation);
  fillList(refs.resumeExperienceList, expFields, resume.experience, emptyExperience);
  fillList(refs.resumeSkillsList, skillFields, resume.skillsSections, emptySkillSection);
};

const saveAboutEditor = key => {
  if (!refs.aboutEditorForm) return;
  const data = new FormData(refs.aboutEditorForm);
  const links = readAboutLinksEditor();
  const books = readRepeatBlocks(refs.aboutBooksList, [
    { name: "title" }, { name: "author" }, { name: "coverUrl" }, { name: "url" }
  ]).filter(b => b.title || b.coverUrl);
  const songs = readRepeatBlocks(refs.aboutSongsList, [
    { name: "title" }, { name: "artist" }, { name: "url" }
  ]).filter(s => s.title);
  state.siteConfig.profiles[key].about = normalizeAboutContent({
    hero: String(data.get("hero") || "").trim(),
    body: splitLines(data.get("body")),
    photo: String(data.get("photo") || "").trim(),
    stack: readAboutStackEditor(),
    links,
    books,
    songs
  }, key);
  persistSiteConfig();
  state.aboutEditPreview = true;
  renderAboutPage();
};

const saveResumeEditor = key => {
  if (!refs.resumeEditorForm) return;
  const data = new FormData(refs.resumeEditorForm);
  state.siteConfig.profiles[key].resume = normalizeResumeContent({
    name: String(data.get("name") || "").trim(),
    summary: String(data.get("summary") || "").trim(),
    education: readRepeatBlocks(refs.resumeEducationList, [
      { name: "school" }, { name: "location" }, { name: "degree" }, { name: "date" }, { name: "bullets", type: "bullets" }
    ]),
    experience: readRepeatBlocks(refs.resumeExperienceList, [
      { name: "company" }, { name: "location" }, { name: "role" }, { name: "date" }, { name: "bullets", type: "bullets" }
    ]),
    skillsSections: readRepeatBlocks(refs.resumeSkillsList, [
      { name: "title" }, { name: "content" }
    ])
  }, key);
  persistSiteConfig();
  state.resumeEditPreview = true;
  renderResumePage();
};

const exportResumePdf = key => {
  const resume = state.siteConfig.profiles[key]?.resume;
  if (!resume || !window.jspdf?.jsPDF) {
    showToast("PDF export unavailable", "warn");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 42;
  const pageW = doc.internal.pageSize.getWidth();
  const maxW = pageW - margin * 2;
  let y = margin;
  const lineH = 11;
  const ensureSpace = need => {
    if (y + need > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };
  const addLines = (text, size, style, gap) => {
    doc.setFont("helvetica", style || "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach(line => {
      ensureSpace(lineH + 2);
      doc.text(line, margin, y);
      y += lineH;
    });
    y += gap || 4;
  };
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(resume.name || "Resume", margin, y);
  y += 18;
  const contactInfo = state.siteConfig.profiles[key]?.contact;
  const contact = contactInfo
    ? [contactInfo.location, [contactInfo.phone, contactInfo.email].filter(Boolean).join(" | ")].filter(Boolean).join("  ·  ")
    : [resume.location, [resume.phone, resume.email].filter(Boolean).join(" | ")].filter(Boolean).join("  ·  ");
  if (contact) addLines(contact, 9, "normal", 6);
  if (resume.summary) addLines(resume.summary, 9, "normal", 8);
  const sectionTitle = title => {
    ensureSpace(16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(title.toUpperCase(), margin, y);
    y += 14;
  };
  if ((resume.education || []).some(e => e.school || e.degree)) {
    sectionTitle("Education");
    resume.education.forEach(edu => {
      if (!edu.school && !edu.degree) return;
      ensureSpace(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(edu.school || "", margin, y);
      if (edu.location) doc.text(edu.location, pageW - margin, y, { align: "right" });
      y += lineH;
      doc.setFont("helvetica", "italic");
      doc.text(edu.degree || "", margin, y);
      if (edu.date) doc.text(edu.date, pageW - margin, y, { align: "right" });
      y += lineH;
      edu.bullets?.forEach(b => addLines(`• ${b}`, 8.5, "normal", 0));
      y += 4;
    });
  }
  if ((resume.experience || []).some(e => e.company || e.role)) {
    sectionTitle("Work & Leadership Experience");
    resume.experience.forEach(exp => {
      if (!exp.company && !exp.role) return;
      ensureSpace(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(exp.company || "", margin, y);
      if (exp.location) doc.text(exp.location, pageW - margin, y, { align: "right" });
      y += lineH;
      doc.setFont("helvetica", "italic");
      doc.text(exp.role || "", margin, y);
      if (exp.date) doc.text(exp.date, pageW - margin, y, { align: "right" });
      y += lineH;
      exp.bullets?.forEach(b => addLines(`• ${b}`, 8.5, "normal", 0));
      y += 4;
    });
  }
  if ((resume.skillsSections || []).length) {
    sectionTitle("Skills, Activities & Interests");
    resume.skillsSections.forEach(sec => {
      if (!sec.content) return;
      addLines(`${sec.title}: ${sec.content}`, 8.5, "normal", 2);
    });
  }
  const slug = (resume.name || profileLabel(key)).replace(/\s+/g, "_");
  doc.save(`${slug}_Resume_${profileLabel(key)}.pdf`);
  showToast("Résumé PDF downloaded", "ok");
};

const renderCheckGrid = (container, options, selected, onChange) => {
  if (!container) return;
  container.innerHTML = "";
  options.forEach(({ key, label, hint }) => {
    const labelEl = document.createElement("label");
    labelEl.className = "check-chip";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = key;
    input.checked = selected.includes(key);
    input.addEventListener("change", () => onChange(key, input.checked));
    const text = document.createElement("span");
    text.textContent = label;
    labelEl.append(input, text);
    if (hint) {
      const small = document.createElement("small");
      small.textContent = hint;
      labelEl.appendChild(small);
    }
    container.appendChild(labelEl);
  });
};

const updateShareLinkPreview = () => {
  const selection = normalizeShareSelection(state.siteConfig.shareSelection);
  if (refs.shareLinkOutput) refs.shareLinkOutput.value = buildShareLink(selection);
  if (refs.shareLinkNote) {
    refs.shareLinkNote.textContent = selection.includes("jabnow")
      ? "Jabnow selected — link shows the full portfolio with every branch enabled."
      : `Shared link greys out branches not included: ${selection.map(profileLabel).join(", ")}.`;
  }
};

const applyGuestVisibilityChange = () => {
  persistSiteConfig();
  if (!isContentProfileEnabled(state.viewingAboutProfile)) {
    state.viewingAboutProfile = enabledContentProfiles()[0]?.key || "jabnow";
  }
  if (!isContentProfileEnabled(state.viewingResumeProfile)) {
    state.viewingResumeProfile = enabledContentProfiles()[0]?.key || "jabnow";
  }
  if (state.branchFilter !== "all" && !isBranchGloballyVisible(state.branchFilter)) {
    state.branchFilter = "all";
  }
  if (state.selectedGraphBranch && !isBranchGloballyVisible(state.selectedGraphBranch)) {
    state.selectedGraphBranch = null;
  }
  syncGraphBranchSelectOptions();
  renderFilters();
  renderList();
  renderWorkSubmenu();
  renderAboutPage();
  renderResumePage();
  renderContactPage();
  if (state.currentPage === "home") renderGraph({ rebuild: true });
};

const renderSharePage = () => {
  if (!isEditor()) return;
  renderCheckGrid(
    refs.visibilityChecks,
    BRANCHES.map(b => ({ key: b.key, label: b.label })),
    guestVisibleBranches(),
    (key, checked) => {
      const set = new Set(guestVisibleBranches());
      if (checked) set.add(key);
      else set.delete(key);
      state.siteConfig.visibleProfiles = BRANCH_PROFILE_KEYS.filter(k => set.has(k));
      applyGuestVisibilityChange();
    }
  );
  renderCheckGrid(
    refs.shareProfileChecks,
    PROFILES.map(p => ({
      key: p.key,
      label: p.label,
      hint: p.key === "jabnow" ? "Show everything" : undefined
    })),
    state.siteConfig.shareSelection,
    (key, checked) => {
      if (key === "jabnow") {
        state.siteConfig.shareSelection = checked ? ["jabnow"] : [];
      } else {
        const without = state.siteConfig.shareSelection.filter(k => k !== "jabnow" && k !== key);
        state.siteConfig.shareSelection = checked ? [...without, key] : without;
        if (!state.siteConfig.shareSelection.length) state.siteConfig.shareSelection = ["jabnow"];
      }
      persistSiteConfig();
      renderSharePage();
    }
  );
  renderCheckGrid(
    refs.contactPublicChecks,
    BRANCHES.map(b => ({ key: b.key, label: b.label })),
    state.siteConfig.contactPublicProfiles,
    (key, checked) => {
      const set = new Set(state.siteConfig.contactPublicProfiles);
      if (checked) set.add(key);
      else set.delete(key);
      state.siteConfig.contactPublicProfiles = [...set];
      persistSiteConfig();
      renderContactPage();
    }
  );
  updateShareLinkPreview();
};

const syncGraphBranchSelectOptions = () => {
  if (!refs.graphBranchSelect) return;
  const current = refs.graphBranchSelect.value;
  refs.graphBranchSelect.innerHTML = '<option value="">Select branch…</option>';
  BRANCHES.filter(b => isBranchGloballyVisible(b.key)).forEach(({ key, label }) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = label;
    refs.graphBranchSelect.appendChild(opt);
  });
  if (current && isBranchGloballyVisible(current)) refs.graphBranchSelect.value = current;
  else refs.graphBranchSelect.value = state.selectedGraphBranch || "";
};

const viewerProfileAccessLabel = () => {
  if (state.shareProfiles?.length) {
    return state.shareProfiles.map(profileLabel).join(", ");
  }
  const visible = guestVisibleBranches();
  if (visible.length >= BRANCH_PROFILE_KEYS.length) return "Jabnow (all)";
  if (!visible.length) return "None visible";
  return visible.map(k => profileLabel(k)).join(", ");
};

const contactDisplayKey = () => {
  const jabnow = state.siteConfig.profiles.jabnow?.contact;
  if (jabnow?.email || jabnow?.headline || jabnow?.phone) return "jabnow";
  const publicProfiles = state.siteConfig.contactPublicProfiles.filter(k => isContentProfileEnabled(k));
  return publicProfiles[0] || "jabnow";
};

const addContactDetail = (label, value, { href, display } = {}) => {
  if (!value || !refs.contactDetails) return;
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  if (href) {
    const a = document.createElement("a");
    a.href = href;
    if (href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.textContent = display || value;
    dd.appendChild(a);
  } else {
    dd.textContent = display || value;
  }
  refs.contactDetails.append(dt, dd);
};

const fillContactEditorForm = key => {
  if (!refs.contactEditorForm) return;
  const contact = state.siteConfig.profiles[key]?.contact;
  if (!contact) return;
  refs.contactEditorForm.elements.headline.value = contact.headline || "";
  refs.contactEditorForm.elements.subhead.value = contact.subhead || "";
  refs.contactEditorForm.elements.email.value = contact.email || "";
  refs.contactEditorForm.elements.phone.value = contact.phone || "";
  refs.contactEditorForm.elements.location.value = contact.location || "";
  refs.contactEditorForm.elements.timezone.value = contact.timezone || "America/New_York";
  if (!refs.contactLinksList) return;
  refs.contactLinksList.innerHTML = "";
  (contact.links?.length ? contact.links : [emptyAboutLink()]).forEach(link => {
    refs.contactLinksList.appendChild(makeRepeatBlock(
      [
        { name: "label", label: "Label" },
        { name: "url", label: "URL", placeholder: "https://…" }
      ],
      link,
      null
    ));
  });
};

const saveContactEditor = key => {
  if (!refs.contactEditorForm) return;
  const data = new FormData(refs.contactEditorForm);
  const links = readRepeatBlocks(refs.contactLinksList, [
    { name: "label" }, { name: "url" }
  ]).filter(l => l.label || l.url);
  const resume = state.siteConfig.profiles[key]?.resume;
  state.siteConfig.profiles[key].contact = normalizeContactContent({
    headline: String(data.get("headline") || "").trim(),
    subhead: String(data.get("subhead") || "").trim(),
    email: String(data.get("email") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    location: String(data.get("location") || "").trim(),
    timezone: String(data.get("timezone") || "").trim(),
    links
  }, key, resume);
  persistSiteConfig();
  renderContactPage();
  if (refs.contactEditorToast) {
    refs.contactEditorToast.textContent = "Contact saved";
    refs.contactEditorToast.className = "toast ok";
    setTimeout(() => {
      refs.contactEditorToast.textContent = "";
      refs.contactEditorToast.className = "toast";
    }, 2500);
  }
};

const renderContactPage = () => {
  const key = contactDisplayKey();
  if (!key) {
    if (refs.contactDetails) refs.contactDetails.innerHTML = "";
    if (refs.contactLocation) refs.contactLocation.hidden = true;
    return;
  }
  const contact = state.siteConfig.profiles[key]?.contact;
  if (!contact) return;

  if (refs.contactHeadline) refs.contactHeadline.textContent = contact.headline || "My inbox is open";
  if (refs.contactSubhead) refs.contactSubhead.textContent = contact.subhead || "";

  if (refs.contactDetails) {
    refs.contactDetails.innerHTML = "";
    addContactDetail("Email", contact.email, { href: contact.email ? `mailto:${contact.email}` : null });
    if (contact.phone) addContactDetail("Phone", contact.phone, { href: `tel:${contact.phone.replace(/\s/g, "")}` });
    contact.links.forEach(link => {
      const display = link.label || link.url.replace(/^https?:\/\/(www\.)?/, "");
      addContactDetail(link.label || "Link", link.url, { href: link.url, display });
    });
  }

  if (refs.contactLocation) {
    if (contact.location) {
      refs.contactLocation.hidden = false;
      refs.contactLocation.innerHTML = `
        <div class="contact-location__row"><span class="contact-location__label">Currently in</span><span class="contact-location__value">${contact.location}</span></div>
        <div class="contact-location__row"><span class="contact-location__label">Local time</span><span class="contact-location__value" id="contact-local-time">${formatLocalTime(contact.timezone)}</span></div>
      `;
    } else {
      refs.contactLocation.hidden = true;
      refs.contactLocation.innerHTML = "";
    }
  }

  if (isEditor()) fillContactEditorForm(key);
  if (refs.contactEditorPanel) refs.contactEditorPanel.hidden = !isEditor();
};

const buildContactEmailBody = ({ name, replyEmail, message, profileAccess }) => {
  return `${message}

---
This message was sent via the contact form on the Jabnow portfolio site (${PUBLIC_SITE_URL}).
Visitor profile access: ${profileAccess}
From: ${name} <${replyEmail}>`;
};

const submitContactForm = async event => {
  event.preventDefault();
  const data = new FormData(refs.contactForm);
  const name = String(data.get("name") || "").trim();
  const replyEmail = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const profileAccess = viewerProfileAccessLabel();
  if (!name || !replyEmail || !message) return;

  const fullBody = buildContactEmailBody({ name, replyEmail, message, profileAccess });
  const subject = `Jabnow portfolio: message from ${name}`;
  const submitBtn = refs.contactForm.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;
  refs.contactToast.textContent = "Sending…";
  refs.contactToast.className = "toast";

  try {
    const payload = new FormData();
    payload.append("name", name);
    payload.append("email", replyEmail);
    payload.append("message", fullBody);
    payload.append("_subject", subject);
    payload.append("_replyto", replyEmail);
    payload.append("_captcha", "false");
    payload.append("_template", "table");
    const res = await fetch(CONTACT_FORM_ENDPOINT, { method: "POST", body: payload, headers: { Accept: "application/json" } });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || "Send failed");
    refs.contactToast.textContent = "Message sent — check your inbox for a confirmation.";
    refs.contactToast.className = "toast ok";
    refs.contactForm.reset();
    renderContactPage();
  } catch {
    const mailto = `mailto:${CONTACT_INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
    window.location.href = mailto;
    refs.contactToast.textContent = "Opening your email app…";
    refs.contactToast.className = "toast warn";
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    setTimeout(() => {
      refs.contactToast.textContent = "";
      refs.contactToast.className = "toast";
    }, 5000);
  }
};

const WORK_PAGES = new Set(["home", "list", "add", "project"]);

const clearNavActive = () => {
  document.querySelectorAll(".sb-nav li > button, .nav-group-row > button, .nav-submenu button").forEach(b => {
    b.classList.remove("active");
  });
};

const setWorkNavOpen = open => {
  refs.navGroupWork.classList.toggle("open", open);
  const chevron = refs.navGroupWork.querySelector(".nav-chevron");
  if (chevron) chevron.setAttribute("aria-expanded", String(open));
};

function toggleWorkMenu() {
  setWorkNavOpen(!refs.navGroupWork.classList.contains("open"));
}
window.toggleWorkMenu = toggleWorkMenu;

const renderWorkSubmenu = () => {
  refs.workSubmenu.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "nav-submenu-all";
  allBtn.textContent = "All projects";
  allBtn.addEventListener("click", () => showPage("list"));
  const allLi = document.createElement("li");
  allLi.appendChild(allBtn);
  refs.workSubmenu.appendChild(allLi);

  if (isEditor()) {
    const sorted = [...state.projects]
      .filter(p => isBranchProfileEnabled(normalizeBranch(p.branch)))
      .sort((a, b) => a.title.localeCompare(b.title));
    sorted.forEach(project => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = `nav-project-${project.id}`;
      btn.textContent = project.title;
      btn.title = project.title;
      btn.addEventListener("click", () => showProject(project.id));
      const li = document.createElement("li");
      li.appendChild(btn);
      refs.workSubmenu.appendChild(li);
    });
  }

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "nav-submenu-all editor-only";
  addBtn.textContent = "+ New project";
  addBtn.hidden = !isEditor();
  addBtn.addEventListener("click", () => {
    if (!requireEditor()) return;
    startNewProject();
  });
  const addLi = document.createElement("li");
  addLi.className = "editor-only";
  addLi.hidden = !isEditor();
  addLi.appendChild(addBtn);
  refs.workSubmenu.appendChild(addLi);
};

const renderProjectDetail = project => {
  refs.projectDetailTitle.textContent = project.title;
  refs.projectDetailCat.textContent = `${normalizeBranch(project.branch)} · ${project.category}`;
  refs.projectDetailDate.textContent = project.updated;
  refs.projectDetailHeading.textContent = project.title;
  refs.projectDetailDesc.textContent = project.description;

  refs.projectDetailMeta.innerHTML = "";
  (project.tags || []).forEach(tag => {
    const pill = document.createElement("span");
    pill.className = "wi-pill";
    pill.textContent = `#${tag}`;
    refs.projectDetailMeta.appendChild(pill);
  });
  (project.tools || []).forEach(tool => {
    const pill = document.createElement("span");
    pill.className = "wi-pill";
    pill.textContent = tool;
    refs.projectDetailMeta.appendChild(pill);
  });

  renderMediaGallery(refs.projectDetailMedia, project.media);

  const hasLink = project.url && project.url !== "#";
  refs.projectDetailLink.hidden = !hasLink;
  if (hasLink) refs.projectDetailLink.href = project.url;

  refs.projectDetailEdit.hidden = !isEditor();
  refs.projectDetailEdit.onclick = () => {
    if (!requireEditor()) return;
    startEdit(project);
  };
};

function showProject(id, { from = "list" } = {}) {
  const project = state.projects.find(p => p.id === id);
  if (!project) return;
  if (!isBranchProfileEnabled(normalizeBranch(project.branch))) return;
  state.viewingProjectId = id;
  state.projectViewSource = from;
  renderProjectDetail(project);
  showPage("project");
}
window.showProject = showProject;

function showPage(id) {
  if (id === "add" && !isEditor()) {
    showPage("list");
    return;
  }
  if (id === "share" && !isEditor()) {
    showPage("home");
    return;
  }

  clearNavActive();
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  state.currentPage = id;

  if (WORK_PAGES.has(id)) {
    document.getElementById("nav-work").classList.add("active");
    setWorkNavOpen(true);
    if (id === "project" && state.viewingProjectId) {
      const subBtn = document.getElementById(`nav-project-${state.viewingProjectId}`);
      if (subBtn) subBtn.classList.add("active");
      else if (!isEditor() && state.projectViewSource === "list") {
        const allBtn = refs.workSubmenu.querySelector(".nav-submenu-all");
        if (allBtn) allBtn.classList.add("active");
      }
    } else if (id === "list") {
      const allBtn = refs.workSubmenu.querySelector(".nav-submenu-all");
      if (allBtn) allBtn.classList.add("active");
    }
  } else {
    const btn = document.getElementById("nav-" + id);
    if (btn) btn.classList.add("active");
  }

  updatePageMeta(id);
  if (id === "project" && state.viewingProjectId) {
    const project = state.projects.find(p => p.id === state.viewingProjectId);
    if (project) {
      document.title = `${project.title} — Jabnow`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", project.description || PAGE_META.project.description);
    }
  }

  if (id === "home") {
    renderGraphActionBar();
    setTimeout(() => renderGraph({ rebuild: true }), 60);
  } else if (id === "about") {
    renderAboutPage();
  } else if (id === "resume") {
    renderResumePage();
  } else if (id === "contact") {
    renderContactPage();
  } else if (id === "share") {
    renderSharePage();
  }
}
window.showPage = showPage;

function closePage() {
  const id = state.currentPage || "home";
  if (id === "project") {
    showPage(state.projectViewSource === "graph" ? "home" : "list");
  } else if (id === "list") {
    showPage("home");
  } else if (id === "about" || id === "resume" || id === "contact") {
    showPage("home");
  } else if (id === "add") {
    cancelEdit();
    showPage("list");
  } else if (id === "share") {
    showPage("home");
  } else if (id === "login") {
    showPage("home");
  }
}
window.closePage = closePage;

function expandPage() {
  document.querySelector(".app").classList.add("layout-fullpage");
  state.layoutFullpage = true;
  if (state.currentPage === "home") {
    setTimeout(() => renderGraph({ rebuild: true }), 60);
  }
}
window.expandPage = expandPage;

function minimizePage() {
  document.querySelector(".app").classList.remove("layout-fullpage");
  state.layoutFullpage = false;
  if (state.currentPage === "home") {
    setTimeout(() => renderGraph({ rebuild: true }), 60);
  }
}
window.minimizePage = minimizePage;

// ──────────────────────── LIST VIEW ───────────────────────
const YEAR_START = 2022;
const GRID_COLS = 6;
const GRID_ROWS = 5;
const GRID_SLOTS = GRID_COLS * GRID_ROWS;

const projectSearchText = project => {
  const tags = (project.tags || []).join(" ");
  const tools = (project.tools || []).join(" ");
  const branch = normalizeBranch(project.branch);
  return `${project.title} ${project.description} ${project.category} ${branch} ${tags} ${tools}`.toLowerCase();
};

const projectYear = project => {
  const year = parseInt(String(project.updated).slice(0, 4), 10);
  return Number.isFinite(year) && year > 2021 ? year : YEAR_START;
};

const yearRange = () => {
  const current = new Date().getFullYear();
  const years = [];
  for (let year = current; year >= YEAR_START; year--) years.push(year);
  return years;
};

const categoryOptions = () => {
  const categories = new Set(
    state.projects
      .map(p => String(p.category || "").trim().toLowerCase())
      .filter(Boolean)
  );
  return ["all", ...[...categories].sort((a, b) => a.localeCompare(b))];
};

const makeFilterChip = (key, label, color, { active, disabled = false, onClick }) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "filter-chip";
  if (active) button.classList.add("filter-chip--active");
  if (disabled) button.classList.add("filter-chip--disabled");
  button.dataset.filter = key;
  button.disabled = disabled;
  button.setAttribute("aria-pressed", String(active));
  if (color) {
    const dot = document.createElement("span");
    dot.className = "filter-chip__dot";
    dot.style.background = color;
    button.appendChild(dot);
  }
  button.appendChild(document.createTextNode(label));
  if (!disabled && onClick) button.addEventListener("click", onClick);
  const li = document.createElement("li");
  li.appendChild(button);
  return li;
};

const renderBranchFilters = () => {
  refs.branchList.innerHTML = "";
  [{ key: "all", label: "All" }, ...BRANCHES]
    .filter(({ key }) => key === "all" || isBranchGloballyVisible(key))
    .forEach(({ key, label }) => {
      const disabled = key !== "all" && !isBranchProfileEnabled(key);
      refs.branchList.appendChild(makeFilterChip(key, label, key === "all" ? null : BRANCH_COLORS[key], {
        active: state.branchFilter === key,
        disabled,
        onClick: () => {
          state.branchFilter = key;
          renderList();
        }
      }));
    });
};

const renderCategoryFilters = () => {
  refs.folderList.innerHTML = "";
  categoryOptions().forEach(category => {
    const label = category === "all" ? "All" : category;
    const color = category === "all" ? null : colorForCategory(category);
    refs.folderList.appendChild(makeFilterChip(category, label, color, {
      active: state.categoryFilter === category,
      onClick: () => {
        state.categoryFilter = category;
        renderList();
      }
    }));
  });
};

const renderFilters = () => {
  if (state.branchFilter !== "all" && !isBranchProfileEnabled(state.branchFilter)) {
    state.branchFilter = "all";
  }
  renderBranchFilters();
  renderCategoryFilters();
};

const listPathLabel = () => {
  const parts = ["All projects"];
  if (state.branchFilter !== "all") {
    const branch = BRANCHES.find(b => b.key === state.branchFilter);
    parts.push(branch ? branch.label : state.branchFilter);
  }
  if (state.categoryFilter !== "all") parts.push(state.categoryFilter);
  return parts.join(" · ");
};

const applyFilters = () => {
  const search = state.search.trim().toLowerCase();
  return state.projects
    .filter(p => isBranchProfileEnabled(normalizeBranch(p.branch)))
    .filter(p => (state.branchFilter === "all" ? true : normalizeBranch(p.branch) === state.branchFilter))
    .filter(p => (state.categoryFilter === "all" ? true : p.category.toLowerCase() === state.categoryFilter))
    .filter(p => (!search ? true : projectSearchText(p).includes(search)))
    .sort((a, b) => new Date(b.updated) - new Date(a.updated));
};

const formatCardDate = value => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const createBlankProject = ({ branch = "product", graphAttached = false, year = null } = {}) => {
  const today = new Date();
  const y = year || today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const updated = y === today.getFullYear() ? `${y}-${month}-${day}` : `${y}-12-31`;
  return {
    id: store.nextId(state.projects),
    createdAt: new Date().toISOString(),
    title: "Untitled project",
    branch: normalizeBranch(branch),
    graphAttached,
    category: "",
    description: "",
    tags: [],
    tools: [],
    updated,
    url: "",
    shape: null
  };
};

const startNewProject = () => {
  if (!requireEditor()) return;
  const created = createBlankProject({ graphAttached: false });
  state.projects.unshift(created);
  persist();
  renderWorkSubmenu();
  startEdit(created);
};

const startAddForYear = year => {
  if (!requireEditor()) return;
  const created = createBlankProject({ graphAttached: false, year });
  state.projects.unshift(created);
  persist();
  renderWorkSubmenu();
  refs.editorHeading.textContent = `New project · ${year}`;
  startEdit(created);
};

const emptyGridSlot = year => {
  const slot = document.createElement("button");
  slot.type = "button";
  slot.className = "grid-slot";
  slot.setAttribute("aria-label", `Add project in ${year}`);
  slot.innerHTML = "<span class=\"grid-slot__plus\">+</span>";
  slot.addEventListener("click", () => startAddForYear(year));
  return slot;
};

const projectCard = (project, { editor = false } = {}) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "project-card";
  if (editor) card.classList.add("project-card--editor");
  card.title = project.title;

  const accent = document.createElement("div");
  accent.className = "project-card__accent";
  accent.style.background = colorForCategory(project.category);

  const dot = document.createElement("div");
  dot.className = "project-card__dot";
  dot.style.background = colorForCategory(project.category);
  dot.textContent = (project.title || "?").charAt(0).toUpperCase();

  const title = document.createElement("div");
  title.className = "project-card__title";
  title.textContent = project.title;

  const meta = document.createElement("div");
  meta.className = "project-card__meta";
  const branchLabel = BRANCHES.find(b => b.key === normalizeBranch(project.branch))?.label || project.branch;
  meta.textContent = `${branchLabel} · ${formatCardDate(project.updated)}`;

  card.append(accent, dot, title, meta);

  if (editor) {
    const actions = document.createElement("div");
    actions.className = "project-card__actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "project-card__action";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", event => {
      event.stopPropagation();
      startEdit(project);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "project-card__action project-card__action--danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", event => {
      event.stopPropagation();
      deleteProject(project);
    });

    actions.append(editBtn, deleteBtn);
    card.appendChild(actions);
    card.addEventListener("click", () => startEdit(project));
  } else {
    card.addEventListener("click", () => showProject(project.id));
  }

  return card;
};

const renderYearGrid = (year, yearProjects, grid) => {
  const editor = isEditor();
  if (editor) grid.classList.add("year-grid--editor");

  yearProjects.forEach(project => grid.appendChild(projectCard(project, { editor })));

  if (editor && yearProjects.length < GRID_SLOTS) {
    const emptyCount = GRID_SLOTS - yearProjects.length;
    for (let i = 0; i < emptyCount; i++) grid.appendChild(emptyGridSlot(year));
  }
};

const renderList = () => {
  const projects = applyFilters();
  refs.path.textContent = listPathLabel();
  refs.count.textContent = `${projects.length} project${projects.length === 1 ? "" : "s"}`;

  refs.grid.innerHTML = "";
  refs.grid.classList.toggle("year-scroll--editor", isEditor());

  if (!projects.length) {
    const empty = document.createElement("p");
    empty.className = "list-empty";
    empty.textContent = state.projects.length
      ? "No projects match this search or filter yet."
      : isEditor()
        ? "No projects yet — add one from the Work menu or an empty grid slot."
        : "No projects yet.";
    refs.grid.appendChild(empty);
    syncFilterButtons();
    return;
  }

  const byYear = {};
  projects.forEach(project => {
    const year = projectYear(project);
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(project);
  });

  yearRange()
    .filter(year => (byYear[year] || []).length > 0)
    .forEach(year => {
      const yearProjects = byYear[year].sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );

      const section = document.createElement("section");
      section.className = "year-section";
      if (isEditor()) section.classList.add("year-section--editor");
      section.id = `year-${year}`;
      section.setAttribute("aria-label", `Projects from ${year}`);

      const header = document.createElement("h2");
      header.className = "year-label";
      header.textContent = year;

      const grid = document.createElement("div");
      grid.className = "year-grid";
      renderYearGrid(year, yearProjects, grid);

      section.append(header, grid);
      refs.grid.appendChild(section);
    });

  syncFilterButtons();
};

const syncFilterButtons = () => {
  refs.branchList.querySelectorAll(".filter-chip").forEach(button => {
    button.classList.toggle("filter-chip--active", button.dataset.filter === state.branchFilter);
    button.setAttribute("aria-pressed", String(button.dataset.filter === state.branchFilter));
  });
  refs.folderList.querySelectorAll(".filter-chip").forEach(button => {
    button.classList.toggle("filter-chip--active", button.dataset.filter === state.categoryFilter);
    button.setAttribute("aria-pressed", String(button.dataset.filter === state.categoryFilter));
  });
};

// ──────────────────────── GRAPH EDITOR ────────────────────────
const updateGraphActionButtons = () => {
  const hasBranch = Boolean(state.selectedGraphBranch);
  const hasProject = Boolean(state.graphPickerProjectId);
  if (refs.graphAttachBtn) refs.graphAttachBtn.disabled = !hasBranch || !hasProject;
  if (refs.graphNewBtn) refs.graphNewBtn.disabled = !hasBranch;
  if (refs.graphBranchSelect) refs.graphBranchSelect.value = state.selectedGraphBranch || "";
  if (refs.graphTargetLabel) {
    refs.graphTargetLabel.textContent = hasBranch
      ? `Adding to ${profileLabel(state.selectedGraphBranch)}`
      : "Pick a branch or click a blue node";
  }
};

const renderGraphActionBar = () => {
  if (!isEditor()) return;
  syncGraphBranchSelectOptions();
  updateGraphActionButtons();
};

const selectGraphBranch = branchKey => {
  state.selectedGraphBranch = branchKey;
  if (refs.graphBranchSelect) refs.graphBranchSelect.value = branchKey || "";
  renderGraphActionBar();
  renderGraph({ rebuild: true });
};

const renderGraphProjectPicker = () => {
  if (!refs.graphProjectPicker) return;
  const query = state.graphProjectSearch.trim().toLowerCase();
  const matches = [...state.projects]
    .filter(p => {
      if (!query) return true;
      return `${p.title} ${projectGraphStatus(p)}`.toLowerCase().includes(query);
    })
    .sort((a, b) => {
      const aOn = isProjectOnGraph(a);
      const bOn = isProjectOnGraph(b);
      if (aOn !== bOn) return aOn ? 1 : -1;
      return a.title.localeCompare(b.title);
    });

  refs.graphProjectPicker.innerHTML = "";
  if (!matches.length) {
    refs.graphProjectPicker.innerHTML = "<p class=\"graph-picker-empty\">No matching projects</p>";
    refs.graphProjectPicker.hidden = false;
    return;
  }

  matches.forEach(project => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "graph-picker-item";
    if (state.graphPickerProjectId === project.id) btn.classList.add("active");
    if (isProjectEmpty(project)) btn.classList.add("graph-picker-item--empty");
    btn.innerHTML = `<span class="graph-picker-item__title">${project.title || "Untitled"}</span><span class="graph-picker-item__status">${projectGraphStatus(project)}</span>`;
    btn.addEventListener("click", () => {
      state.graphPickerProjectId = project.id;
      if (refs.graphProjectSearch) refs.graphProjectSearch.value = project.title;
      refs.graphProjectPicker.hidden = true;
      renderGraphProjectPicker();
      updateGraphActionButtons();
    });
    refs.graphProjectPicker.appendChild(btn);
  });
  refs.graphProjectPicker.hidden = false;
};

const attachProjectToBranch = (projectId, branchKey, shapeOverride = null) => {
  const idx = state.projects.findIndex(p => p.id === projectId);
  if (idx < 0 || !branchKey) return;
  const shape = normalizeShape(shapeOverride);
  state.projects[idx] = {
    ...state.projects[idx],
    branch: normalizeBranch(branchKey),
    graphAttached: true,
    shape: shape ?? state.projects[idx].shape ?? null
  };
  persist();
  state.graphPickerProjectId = null;
  if (refs.graphProjectSearch) refs.graphProjectSearch.value = "";
  renderFilters();
  renderList();
  renderWorkSubmenu();
  renderGraphActionBar();
  renderGraph({ rebuild: true });
  showToast(`Attached to ${profileLabel(branchKey)}`, "ok");
};

const createProjectOnGraph = branchKey => {
  if (!branchKey || !requireEditor()) return;
  const today = new Date().toISOString().slice(0, 10);
  const shape = normalizeShape(refs.graphShapeSelect?.value);
  const created = {
    id: store.nextId(state.projects),
    createdAt: new Date().toISOString(),
    title: "Untitled project",
    branch: normalizeBranch(branchKey),
    graphAttached: true,
    category: "",
    description: "",
    tags: [],
    tools: [],
    updated: today,
    url: "",
    shape
  };
  state.projects.unshift(created);
  persist();
  renderWorkSubmenu();
  renderGraph({ rebuild: true });
  startEdit(created, { fromGraph: true });
};

const setAutosaveStatus = (text, kind = "") => {
  if (!refs.autosaveStatus) return;
  refs.autosaveStatus.textContent = text;
  refs.autosaveStatus.className = kind ? `toast ${kind}` : "toast";
};

let autosaveTimer = null;

const scheduleAutosave = () => {
  if (!isEditor() || !state.editingId) return;
  setAutosaveStatus("Saving…");
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(saveProjectDraft, 600);
};

const saveProjectDraft = () => {
  if (!isEditor() || !state.editingId) return;
  const payload = formToPayload();
  const idx = state.projects.findIndex(p => p.id === state.editingId);
  if (idx < 0) return;
  state.projects[idx] = {
    ...state.projects[idx],
    ...payload,
    title: payload.title || "Untitled project",
    updated: payload.updated || state.projects[idx].updated
  };
  persist();
  renderFilters();
  renderList();
  renderWorkSubmenu();
  if (state.currentPage === "home") renderGraph({ rebuild: true });
  setAutosaveStatus("Saved", "ok");
  setTimeout(() => {
    if (refs.autosaveStatus?.textContent === "Saved") setAutosaveStatus("");
  }, 2000);
};

// ──────────────────────── FORM ────────────────────────
const formToPayload = () => {
  const data = new FormData(refs.form);
  const toList = value => String(value || "").split(",").map(item => item.trim()).filter(Boolean);
  return {
    title: String(data.get("title") || "").trim(),
    branch: normalizeBranch(data.get("branch")),
    category: String(data.get("category") || "").trim().toLowerCase(),
    updated: String(data.get("updated") || "").trim(),
    url: String(data.get("url") || "").trim(),
    description: String(data.get("description") || "").trim(),
    tags: toList(data.get("tags")),
    tools: toList(data.get("tools")),
    shape: normalizeShape(data.get("shape")),
    graphAttached: refs.form.elements.graphAttached.checked,
    media: cloneMedia(state.formMedia)
  };
};

const fillForm = (project, { graphAttachedDefault = false } = {}) => {
  refs.form.elements.id.value = project ? project.id : "";
  refs.form.elements.title.value = project ? project.title : "";
  refs.form.elements.branch.value = project ? normalizeBranch(project.branch) : (state.selectedGraphBranch || "product");
  refs.form.elements.category.value = project ? project.category : "";
  refs.form.elements.updated.value = project ? project.updated : new Date().toISOString().slice(0, 10);
  refs.form.elements.url.value = project ? project.url || "" : "";
  refs.form.elements.description.value = project ? project.description : "";
  refs.form.elements.tags.value = project ? (project.tags || []).join(", ") : "";
  refs.form.elements.tools.value = project ? (project.tools || []).join(", ") : "";
  refs.form.elements.shape.value = project?.shape || "";
  refs.form.elements.graphAttached.checked = project ? isProjectOnGraph(project) : graphAttachedDefault;
  state.formMedia = project ? cloneMedia(project.media) : [];
  renderMediaEditor();
};

const startEdit = (project, { fromGraph = false } = {}) => {
  if (!requireEditor()) return;
  state.editingId = project.id;
  fillForm(project, { graphAttachedDefault: fromGraph });
  refs.editorTitle.textContent = "Edit project";
  refs.editorHeading.textContent = isProjectEmpty(project)
    ? "Fill in this project"
    : `Editing: ${project.title}`;
  refs.submitBtn.textContent = "Done";
  refs.cancelEditBtn.hidden = false;
  setAutosaveStatus("");
  showPage("add");
};

const cancelEdit = () => {
  clearTimeout(autosaveTimer);
  state.editingId = null;
  state.formMedia = [];
  fillForm(null);
  refs.editorTitle.textContent = "Add project";
  refs.editorHeading.textContent = "New project";
  refs.submitBtn.textContent = "Done";
  refs.cancelEditBtn.hidden = true;
  setAutosaveStatus("");
};

const deleteProject = project => {
  if (!requireEditor()) return;
  if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
  state.projects = state.projects.filter(p => p.id !== project.id);
  if (state.editingId === project.id) cancelEdit();
  persist();
  renderFilters();
  renderList();
  renderWorkSubmenu();
  renderGraph({ rebuild: true });
  showToast(`Deleted ${project.title}`, "ok");
};

// ──────────────────────── MEDIA EDITOR ────────────────────────
const persistMediaChange = () => {
  renderMediaEditor();
  if (state.editingId) scheduleAutosave();
};

const addMediaItem = ({ kind, name, url, mime, caption }) => {
  state.formMedia.push({ id: genMediaId(), kind, name: name || "", url: url || "", mime: mime || "", caption: caption || "" });
};

const removeMediaItem = id => {
  state.formMedia = state.formMedia.filter(item => item.id !== id);
  persistMediaChange();
};

function renderMediaEditor() {
  if (!refs.mediaList) return;
  refs.mediaList.innerHTML = "";
  state.formMedia.forEach(item => {
    const li = document.createElement("li");
    li.className = "media-row";
    const thumb = document.createElement("div");
    thumb.className = "media-row__thumb";
    if (item.kind === "image" && item.url) {
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = "";
      thumb.appendChild(img);
    } else {
      thumb.textContent = MEDIA_KIND_ICON[item.kind] || "📎";
    }
    const info = document.createElement("div");
    info.className = "media-row__info";
    const name = document.createElement("div");
    name.className = "media-row__name";
    name.textContent = item.caption || item.name || item.url;
    const kind = document.createElement("div");
    kind.className = "media-row__kind";
    kind.textContent = MEDIA_KIND_LABEL[item.kind] || item.kind;
    info.append(name, kind);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "media-row__remove";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => removeMediaItem(item.id));
    li.append(thumb, info, remove);
    refs.mediaList.appendChild(li);
  });
}

const syncMediaInputs = () => {
  if (!refs.mediaType) return;
  const type = refs.mediaType.value;
  const isUpload = type === "image" || type === "video" || type === "excel";
  refs.mediaFile.hidden = !isUpload;
  refs.mediaUrl.hidden = isUpload;
  refs.mediaAddBtn.hidden = isUpload;
  if (type === "image") refs.mediaFile.accept = "image/*";
  else if (type === "video") refs.mediaFile.accept = "video/*";
  else if (type === "excel") refs.mediaFile.accept = ".xlsx,.xls,.csv";
  refs.mediaFile.multiple = type === "image";
  refs.mediaUrl.placeholder = type === "embed"
    ? "CodePen, YouTube, Sheets, Office…"
    : "https://…";
};

const handleMediaFiles = async fileList => {
  if (!requireEditor()) return;
  const type = refs.mediaType.value;
  const files = Array.from(fileList || []);
  if (!files.length) return;
  const caption = refs.mediaLabel.value.trim();
  let added = 0;
  for (const file of files) {
    try {
      addMediaItem({ kind: type, name: file.name, url: await readFileAsDataURL(file), mime: file.type, caption });
      added += 1;
    } catch {
      showToast(`Could not read ${file.name}`, "warn");
    }
  }
  refs.mediaFile.value = "";
  refs.mediaLabel.value = "";
  if (added) {
    persistMediaChange();
    showToast(`Added ${added} file${added === 1 ? "" : "s"}`, "ok");
  }
};

const handleMediaLink = () => {
  if (!requireEditor()) return;
  const type = refs.mediaType.value;
  let url = refs.mediaUrl.value.trim();
  if (!url) return showToast("Enter a URL", "warn");
  if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) url = `https://${url}`;
  const label = refs.mediaLabel.value.trim();
  addMediaItem({ kind: type, name: label || url, url, caption: label });
  refs.mediaUrl.value = "";
  refs.mediaLabel.value = "";
  persistMediaChange();
  showToast(type === "embed" ? "Embed added" : "Link added", "ok");
};

const appendEmbedFrame = (fig, url) => {
  const frame = document.createElement("div");
  frame.className = "media-embed-frame";
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.loading = "lazy";
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen");
  iframe.setAttribute("allowfullscreen", "");
  frame.appendChild(iframe);
  fig.appendChild(frame);
};

const renderExcelPreview = (wrap, item) => {
  if (!window.XLSX) {
    wrap.innerHTML = "<p class=\"media-loading\">Preview unavailable.</p>";
    return;
  }
  wrap.innerHTML = "<p class=\"media-loading\">Loading…</p>";
  fetch(item.url)
    .then(r => r.arrayBuffer())
    .then(buf => {
      const wb = XLSX.read(buf, { type: "array" });
      wrap.innerHTML = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
    })
    .catch(() => { wrap.innerHTML = "<p class=\"media-loading\">Could not preview spreadsheet.</p>"; });
};

const renderMediaGallery = (container, mediaList) => {
  if (!container) return;
  const list = normalizeMedia(mediaList);
  container.innerHTML = "";
  if (!list.length) { container.hidden = true; return; }
  container.hidden = false;
  list.forEach(item => {
    const fig = document.createElement("figure");
    fig.className = `media-item media-item--${item.kind}`;
    if (item.kind === "image") {
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.caption || item.name || "";
      img.loading = "lazy";
      fig.appendChild(img);
    } else if (item.kind === "video") {
      if (item.url.startsWith("data:") || /\.(mp4|webm|ogg|mov)$/i.test(item.url)) {
        const video = document.createElement("video");
        video.src = item.url;
        video.controls = true;
        video.preload = "metadata";
        fig.appendChild(video);
      } else {
        appendEmbedFrame(fig, normalizeEmbedUrl(item.url));
      }
    } else if (item.kind === "embed") {
      appendEmbedFrame(fig, normalizeEmbedUrl(item.url));
    } else if (item.kind === "excel") {
      if (item.url.startsWith("data:")) {
        const wrap = document.createElement("div");
        wrap.className = "media-table-wrap";
        fig.appendChild(wrap);
        renderExcelPreview(wrap, item);
      } else {
        appendEmbedFrame(fig, normalizeEmbedUrl(item.url));
      }
    } else {
      const link = document.createElement("a");
      link.className = "media-link-card";
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.innerHTML = `<span class="media-link-card__icon">🔗</span><div class="media-link-card__text"><div class="media-link-card__title">${item.caption || item.name || item.url}</div><div class="media-link-card__url">${item.url}</div></div>`;
      fig.appendChild(link);
    }
    if (item.kind !== "link") {
      const caption = item.caption || item.name;
      const isUpload = item.url.startsWith("data:");
      if (caption || isUpload) {
        const figcap = document.createElement("figcaption");
        figcap.className = "media-item__caption";
        const span = document.createElement("span");
        span.textContent = caption || MEDIA_KIND_LABEL[item.kind] || "";
        figcap.appendChild(span);
        if (isUpload) {
          const dl = document.createElement("a");
          dl.href = item.url;
          dl.download = item.name || item.kind;
          dl.textContent = "Download";
          figcap.appendChild(dl);
        }
        fig.appendChild(figcap);
      }
    }
    container.appendChild(fig);
  });
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

  const branchNodes = BRANCHES
    .filter(({ key }) => isBranchGloballyVisible(key))
    .map(({ key, label }) => ({
      kind: "branch",
      id: `branch-${key}`,
      branchKey: key,
      label,
      disabled: !isBranchProfileEnabled(key)
    }));

  const projectNodes = state.projects
    .filter(p => isProjectOnGraph(p))
    .filter(p => isBranchGloballyVisible(normalizeBranch(p.branch)))
    .map(project => ({
      kind: "project",
      id: `p-${project.id}`,
      project,
      branchKey: normalizeBranch(project.branch),
      label: project.title,
      category: project.category,
      disabled: !isBranchProfileEnabled(normalizeBranch(project.branch))
    }));

  const centerNode = { kind: "center", id: "center", label: "Jabnow", x: CX, y: CY };
  const nodes = [centerNode, ...branchNodes, ...projectNodes];

  branchNodes.forEach((node, i) => {
    const angle = (i / branchNodes.length) * Math.PI * 2 - Math.PI / 2;
    node.x = CX + Math.cos(angle) * 130;
    node.y = CY + Math.sin(angle) * 130;
  });

  const projectsByBranch = {};
  projectNodes.forEach(node => {
    (projectsByBranch[node.branchKey] ||= []).push(node);
  });

  Object.entries(projectsByBranch).forEach(([branchKey, group]) => {
    const branch = branchNodes.find(b => b.branchKey === branchKey) || centerNode;
    group.forEach((node, i) => {
      const spread = group.length > 1 ? (i / group.length) * Math.PI * 2 - Math.PI / 2 : -Math.PI / 2;
      const dist = 72 + (i % 4) * 14;
      node.x = branch.x + Math.cos(spread) * dist;
      node.y = branch.y + Math.sin(spread) * dist;
    });
  });

  const links = [
    ...branchNodes.map(node => ({ source: "center", target: node.id })),
    ...projectNodes.map(node => ({ source: `branch-${node.branchKey}`, target: node.id }))
  ];

  const sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id)
      .distance(link => {
        const sourceId = typeof link.source === "object" ? link.source.id : link.source;
        return sourceId === "center" ? 118 : 92;
      })
      .strength(link => {
        const sourceId = typeof link.source === "object" ? link.source.id : link.source;
        return sourceId === "center" ? 0.55 : 0.42;
      }))
    .force("charge", d3.forceManyBody().strength(d => {
      if (d.kind === "center") return -280;
      if (d.kind === "branch") return -180;
      return -90;
    }))
    .force("collision", d3.forceCollide(d => {
      if (d.kind === "center") return 30;
      if (d.kind === "branch") return 28;
      return 24;
    }))
    .alphaDecay(0.022);

  const PAD = 72;
  const linkSel = svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", d => {
      const target = typeof d.target === "object" ? d.target : nodes.find(n => n.id === d.target);
      return `link-line${target?.disabled ? " link-line--disabled" : ""}`;
    });

  const nodeG = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", d => {
      let cls = `node node-${d.kind}${d.disabled ? " node-disabled" : ""}`;
      if (d.kind === "branch" && isEditor() && state.selectedGraphBranch === d.branchKey) {
        cls += " node-branch-selected";
      }
      return cls;
    })
    .attr("cursor", d => {
      if (d.disabled) return "not-allowed";
      if (isEditor() && d.kind === "branch") return "pointer";
      if (d.kind === "project") return "pointer";
      return "grab";
    })
    .call(d3.drag()
      .filter((event, d) => !d.disabled)
      .on("start", (event, d) => {
        d.__dragStart = { x: event.x, y: event.y };
        d.__dragged = false;
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        d3.select(event.currentTarget).style("cursor", "grabbing");
      })
      .on("drag", (event, d) => {
        if (!d.__dragged) {
          const dx = event.x - d.__dragStart.x;
          const dy = event.y - d.__dragStart.y;
          if (dx * dx + dy * dy > 16) d.__dragged = true;
        }
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        d3.select(event.currentTarget).style("cursor", d.disabled ? "not-allowed" : d.kind === "project" ? "pointer" : "grab");
      }))
    .on("click", (event, d) => {
      if (d.disabled || d.__dragged) return;
      if (d.kind === "branch" && isEditor()) {
        event.stopPropagation();
        selectGraphBranch(d.branchKey);
        return;
      }
      if (d.kind === "project") {
        if (isEditor()) startEdit(d.project);
        else showProject(d.project.id, { from: "graph" });
      }
    });

  nodeG.each(function (d) {
    const g = d3.select(this);
    if (d.kind === "center") {
      g.append("circle")
        .attr("class", "graph-center-hit")
        .attr("r", 32)
        .attr("fill", "transparent");
      const spin = g.append("g").attr("class", "graph-starburst");
      spin.append("animateTransform")
        .attr("attributeName", "transform")
        .attr("type", "rotate")
        .attr("from", "0 0 0")
        .attr("to", "360 0 0")
        .attr("dur", "20s")
        .attr("repeatCount", "indefinite");
      spin.append("polygon")
        .attr("points", starPts(0, 0, 16, 8, 12))
        .attr("fill", "#2563eb");
      spin.append("circle").attr("r", 4.5).attr("fill", "white");
      spin.append("circle").attr("r", 2).attr("fill", "#2563eb");
    } else if (d.kind === "branch") {
      g.append("circle").attr("r", 18).attr("fill", "#2563eb");
      g.append("circle").attr("r", 6.5).attr("fill", "white").attr("fill-opacity", 0.45);
      if (isEditor() && state.selectedGraphBranch === d.branchKey) {
        g.append("circle")
          .attr("r", 24)
          .attr("fill", "none")
          .attr("stroke", "#2563eb")
          .attr("stroke-width", 2.5)
          .attr("stroke-dasharray", "4 3")
          .attr("class", "branch-select-ring");
      }
    } else {
      appendProjectShape(g, d, colorForCategory(d.category));
    }
  });

  nodeG.append("text")
    .attr("class", "node-label")
    .attr("y", d => (d.kind === "center" ? 28 : d.kind === "branch" ? 30 : 32))
    .attr("text-anchor", "middle")
    .text(d => d.label);

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

function appendProjectShape(g, d, fill) {
  const shape = shapeForProject(d.project);
  const shapeG = g.append("g").attr("class", "node-shape-wrap");
  const applyShapeAttrs = sel => sel
    .attr("class", "node-shape")
    .attr("fill", fill + "22")
    .attr("stroke", fill)
    .attr("stroke-width", 1.4);
  if (shape === "circle") {
    applyShapeAttrs(shapeG.append("circle")).attr("r", 18);
  } else if (shape === "square") {
    applyShapeAttrs(shapeG.append("rect")).attr("x", -16).attr("y", -16).attr("width", 32).attr("height", 32).attr("rx", 4);
  } else if (shape === "triangle") {
    applyShapeAttrs(shapeG.append("polygon")).attr("points", triPts(0, 0, 20));
  } else {
    applyShapeAttrs(shapeG.append("polygon")).attr("points", hexPts(0, 0, 18));
  }
  g.append("text")
    .attr("y", 4)
    .attr("text-anchor", "middle")
    .attr("class", "node-label")
    .attr("fill", fill)
    .style("font-weight", "500")
    .style("font-size", "11px")
    .text((d.project.title || "?").charAt(0).toUpperCase());
}

function triPts(cx, cy, r) {
  return Array.from({ length: 3 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 3 - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
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

refs.cancelEditBtn.addEventListener("click", cancelEdit);

refs.form.addEventListener("input", () => scheduleAutosave());
refs.form.addEventListener("change", () => scheduleAutosave());

refs.form.addEventListener("submit", event => {
  event.preventDefault();
  if (!requireEditor()) return;
  clearTimeout(autosaveTimer);
  saveProjectDraft();
  const project = state.projects.find(p => p.id === state.editingId);
  cancelEdit();
  showToast(project ? `Saved ${project.title}` : "Saved", "ok");
  renderFilters();
  renderList();
  renderWorkSubmenu();
  renderGraph({ rebuild: true });
  showPage(state.selectedGraphBranch ? "home" : "list");
});

refs.contactForm.addEventListener("submit", submitContactForm);

refs.loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(refs.loginForm);
  const user = String(data.get("username") || "").trim();
  const pass = String(data.get("password") || "");
  if (user === EDITOR_USER && pass === EDITOR_PASS) {
    signIn();
    refs.loginForm.reset();
    refs.loginToast.textContent = "";
    refs.loginToast.className = "toast";
    showPage("home");
    return;
  }
  refs.loginToast.textContent = "Invalid username or password";
  refs.loginToast.className = "toast error";
});

refs.loginCancel.addEventListener("click", () => {
  refs.loginForm.reset();
  refs.loginToast.textContent = "";
  refs.loginToast.className = "toast";
  showPage("home");
});

refs.profileLogout.addEventListener("click", signOut);

refs.graphProjectSearch?.addEventListener("focus", () => {
  state.graphProjectSearch = refs.graphProjectSearch.value;
  renderGraphProjectPicker();
});
refs.graphProjectSearch?.addEventListener("input", event => {
  state.graphProjectSearch = event.target.value;
  state.graphPickerProjectId = null;
  renderGraphProjectPicker();
  updateGraphActionButtons();
});
refs.graphProjectSearch?.addEventListener("blur", () => {
  setTimeout(() => {
    if (refs.graphProjectPicker) refs.graphProjectPicker.hidden = true;
  }, 150);
});
refs.graphAttachBtn?.addEventListener("click", () => {
  if (!state.selectedGraphBranch || !state.graphPickerProjectId) return;
  attachProjectToBranch(
    state.graphPickerProjectId,
    state.selectedGraphBranch,
    refs.graphShapeSelect?.value
  );
});
refs.graphNewBtn?.addEventListener("click", () => {
  if (!state.selectedGraphBranch) return;
  createProjectOnGraph(state.selectedGraphBranch);
});

refs.graphBranchSelect?.addEventListener("change", event => {
  const key = event.target.value;
  if (key) selectGraphBranch(key);
  else {
    state.selectedGraphBranch = null;
    renderGraphActionBar();
    renderGraph({ rebuild: true });
  }
});

refs.mediaType?.addEventListener("change", syncMediaInputs);
refs.mediaFile?.addEventListener("change", event => handleMediaFiles(event.target.files));
refs.mediaAddBtn?.addEventListener("click", handleMediaLink);
refs.mediaUrl?.addEventListener("keydown", event => {
  if (event.key === "Enter") { event.preventDefault(); handleMediaLink(); }
});

refs.aboutProfileSelect?.addEventListener("change", event => {
  state.viewingAboutProfile = event.target.value;
  renderAboutPage();
});

refs.aboutPreviewEdit?.addEventListener("click", () => {
  state.aboutEditPreview = false;
  renderAboutPage();
});

refs.resumeProfileSelect?.addEventListener("change", event => {
  state.viewingResumeProfile = event.target.value;
  renderResumePage();
});

refs.resumePreviewEdit?.addEventListener("click", () => {
  state.resumeEditPreview = false;
  renderResumePage();
});

refs.aboutEditorForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!requireEditor()) return;
  saveAboutEditor(state.viewingAboutProfile);
});

refs.resumeEditorForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!requireEditor()) return;
  saveResumeEditor(state.viewingResumeProfile);
});

refs.aboutAddBook?.addEventListener("click", () => {
  refs.aboutBooksList?.appendChild(makeBookEditorBlock(emptyBook()));
});

refs.aboutAddSong?.addEventListener("click", () => {
  refs.aboutSongsList?.appendChild(makeRepeatBlock(
    [
      { name: "title", label: "Title" },
      { name: "artist", label: "Artist (optional)" },
      { name: "url", label: "Link", placeholder: "https://music.youtube.com/…" }
    ],
    emptySong(),
    null
  ));
});

refs.aboutPhotoFile?.addEventListener("change", async event => {
  const file = event.target.files?.[0];
  if (!file || !refs.aboutEditorForm) return;
  try {
    const url = await readFileAsDataURL(file);
    refs.aboutEditorForm.elements.photo.value = url;
  } catch {
    showToast("Could not read photo", "warn");
  }
});

refs.contactEditorForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!requireEditor()) return;
  saveContactEditor(contactDisplayKey());
});

refs.contactAddLink?.addEventListener("click", () => {
  refs.contactLinksList?.appendChild(makeRepeatBlock(
    [{ name: "label", label: "Label" }, { name: "url", label: "URL", placeholder: "https://…" }],
    emptyAboutLink(),
    null
  ));
});

setInterval(() => {
  if (state.currentPage !== "contact") return;
  const el = document.getElementById("contact-local-time");
  const key = contactDisplayKey();
  if (el && key) {
    el.textContent = formatLocalTime(state.siteConfig.profiles[key]?.contact?.timezone);
  }
}, 30000);

const resumeFieldSets = {
  education: [
    { name: "school", label: "School" },
    { name: "location", label: "Location" },
    { name: "degree", label: "Degree" },
    { name: "date", label: "Date" },
    { name: "bullets", label: "Bullets (one per line)", type: "textarea", rows: 3 }
  ],
  experience: [
    { name: "company", label: "Company" },
    { name: "location", label: "Location" },
    { name: "role", label: "Role" },
    { name: "date", label: "Date" },
    { name: "bullets", label: "Bullets (one per line)", type: "textarea", rows: 3 }
  ],
  skill: [
    { name: "title", label: "Section title" },
    { name: "content", label: "Content", type: "textarea", rows: 2 }
  ]
};

refs.resumeAddEducation?.addEventListener("click", () => {
  refs.resumeEducationList?.appendChild(makeRepeatBlock(resumeFieldSets.education, emptyEducation(), null));
});
refs.resumeAddExperience?.addEventListener("click", () => {
  refs.resumeExperienceList?.appendChild(makeRepeatBlock(resumeFieldSets.experience, emptyExperience(), null));
});
refs.resumeAddSkill?.addEventListener("click", () => {
  refs.resumeSkillsList?.appendChild(makeRepeatBlock(resumeFieldSets.skill, emptySkillSection(), null));
});

refs.resumeExportPdf?.addEventListener("click", () => {
  exportResumePdf(state.viewingResumeProfile);
});

refs.shareLinkCopy?.addEventListener("click", async () => {
  const link = refs.shareLinkOutput?.value;
  if (!link) return;
  try {
    await navigator.clipboard.writeText(link);
    refs.shareToast.textContent = "Share link copied";
    refs.shareToast.className = "toast ok";
  } catch {
    refs.shareLinkOutput.select();
    refs.shareToast.textContent = "Copy the link manually";
    refs.shareToast.className = "toast warn";
  }
  setTimeout(() => {
    refs.shareToast.textContent = "";
    refs.shareToast.className = "toast";
  }, 2500);
});

let iconClickCount = 0;
let iconClickTimer = null;

refs.sbLogo.addEventListener("click", event => {
  const onIcon = event.target.closest(".sb-starburst");
  if (onIcon) {
    event.preventDefault();
    iconClickCount += 1;
    clearTimeout(iconClickTimer);
    if (iconClickCount >= 3) {
      iconClickCount = 0;
      refs.loginForm.reset();
      refs.loginToast.textContent = "";
      refs.loginToast.className = "toast";
      showPage("login");
      return;
    }
    iconClickTimer = setTimeout(() => {
      if (iconClickCount === 1) showPage("home");
      iconClickCount = 0;
    }, 450);
    return;
  }
  showPage("home");
});

window.addEventListener("resize", () => renderGraph({ rebuild: true }));

renderFilters();
renderWorkSubmenu();
syncMediaInputs();
renderMediaEditor();
renderAboutPage();
renderResumePage();
renderContactPage();
syncGraphBranchSelectOptions();
renderGraphActionBar();
applyProfileUI();
updatePageMeta("home");
updateStatusFooter();
renderGraph({ rebuild: true });
