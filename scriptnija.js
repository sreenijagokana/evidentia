/* ---------------------------------------------------------------
   Digital AI Evidence Verifier — client-side application
   All analysis in this demo is produced by a local mock module
   (see MockAnalysisEngine) and is clearly not a real forensic result.
--------------------------------------------------------------- */

const ICONS = {
  check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>',
  shield: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 5.5V11c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V5.5L12 2z"/></svg>',
  layers: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  scan: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V4a1 1 0 0 1 1-1h3M17 3h3a1 1 0 0 1 1 1v3M21 17v3a1 1 0 0 1-1 1h-3M7 21H4a1 1 0 0 1-1-1v-3"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',
  file: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  upload: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M4 17v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>',
  x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  warn: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a1.5 1.5 0 0 0 1.3 2.2h17.8a1.5 1.5 0 0 0 1.3-2.2L13.7 3.9a1.5 1.5 0 0 0-2.6 0z"/></svg>',
  lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  image: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  video: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="M17 10l5-3v10l-5-3"/></svg>',
  audio: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  doc: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>',
  download: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 20h16"/></svg>',
  printer: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="1"/><path d="M6 17v4h12v-4"/></svg>',
};

const NAV_ITEMS = [
  {href:'#/', label:'Home'},
  {href:'#/verify', label:'Verify Evidence'},
  {href:'#/how-it-works', label:'How It Works'},
  {href:'#/report', label:'Reports'},
  {href:'#/about', label:'About'},
];

function renderNav(route){
  const links = NAV_ITEMS.map(i => `<a href="${i.href}" class="nav-link ${route===i.href?'active':''}">${i.label}</a>`).join('');
  document.getElementById('navLinks').innerHTML = links;
  document.getElementById('mobileMenu').innerHTML = NAV_ITEMS.map(i=>`<a href="${i.href}">${i.label}</a>`).join('') +
    `<div class="mob-actions"><a href="#/login" class="btn btn-outline btn-block">Sign In</a><a href="#/verify" class="btn btn-primary btn-block">Verify Evidence</a></div>`;
}

document.getElementById('hamburgerBtn').addEventListener('click', ()=>{
  document.getElementById('mobileMenu').classList.toggle('open');
});

/* ---------------- Mock Analysis Engine ----------------
   Deterministic pseudo-random mock used purely for demonstration.
   This is NOT a real forensic detector — replace with an API call
   to a backend model when one is available. */
const MockAnalysisEngine = {
  verdicts: [
    {key:'authentic', label:'Likely Authentic', min:82, max:98},
    {key:'suspicious', label:'Suspicious', min:55, max:78},
    {key:'manipulated', label:'Likely Manipulated', min:70, max:96},
    {key:'ai', label:'Likely AI-Generated', min:75, max:97},
  ],
  hash(str){
    let h = 0;
    for (let i=0;i<str.length;i++){ h = (h<<5)-h+str.charCodeAt(i); h|=0; }
    return Math.abs(h);
  },
  analyze(file){
    const seed = this.hash(file.name + file.size);
    const weights = [0.42,0.22,0.18,0.18];
    let r = (seed % 1000)/1000;
    let idx=0, acc=0;
    for(let i=0;i<weights.length;i++){ acc+=weights[i]; if(r<=acc){idx=i;break;} }
    const v = this.verdicts[idx];
    const confidence = v.min + (seed % (v.max-v.min+1));
    const sub = (base, spread) => Math.max(4, Math.min(99, base + ((seed>>((spread+2)))%spread) - spread/2));
    const evidenceId = 'EVD-2026-' + String(10000 + (seed % 89999));
    const hash = 'sha256:' + (seed.toString(16).padStart(8,'0')) + (this.hash(file.name).toString(16)).padStart(8,'0');
    let integrity, metaConsistency, manipProb, aiProb;
    if(v.key==='authentic'){ integrity='High'; metaConsistency='Consistent'; manipProb=sub(8,14); aiProb=sub(6,12); }
    else if(v.key==='suspicious'){ integrity='Moderate'; metaConsistency='Partially Consistent'; manipProb=sub(48,20); aiProb=sub(30,20); }
    else if(v.key==='manipulated'){ integrity='Low'; metaConsistency='Inconsistent'; manipProb=sub(76,18); aiProb=sub(22,18); }
    else { integrity='Moderate'; metaConsistency='Inconclusive'; manipProb=sub(20,16); aiProb=sub(84,14); }
    return {
      file, verdict:v.key, verdictLabel:v.label, confidence,
      integrity, metaConsistency, manipProb, aiProb, evidenceId, hash,
      editingSoftware: v.key==='authentic' ? 'None detected' : (v.key==='ai' ? 'N/A — synthesis pipeline' : 'Adobe Photoshop 2025 (signature match)'),
      timestampConsistency: v.key==='authentic' ? 'Consistent' : 'Anomalies detected',
      compressionPattern: v.key==='manipulated' ? 'Irregular recompression artifacts' : 'Single-pass compression, consistent',
      suspiciousRegions: v.key==='manipulated' ? [{x:32,y:24,w:30,h:26}] : [],
      date: new Date(),
    };
  }
};

/* ---------------- App State & Router ---------------- */
const state = {
  route: '#/',
  selectedFile: null,
  filePreviewUrl: null,
  analysisProgress: 0,
  lastResult: null,
  resultTab: 'original',
  dashFilter: 'all',
};

function fileTypeGroup(file){
  const ext = file.name.split('.').pop().toLowerCase();
  if(['jpg','jpeg','png','webp'].includes(ext)) return 'image';
  if(['mp4','mov','avi'].includes(ext)) return 'video';
  if(['mp3','wav'].includes(ext)) return 'audio';
  if(['pdf','docx'].includes(ext)) return 'document';
  return 'file';
}
function formatBytes(bytes){
  if(bytes < 1024) return bytes + ' B';
  if(bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
  return (bytes/(1024*1024)).toFixed(1) + ' MB';
}
function statusClass(key){
  return {authentic:'authentic', suspicious:'suspicious', manipulated:'manipulated', ai:'ai'}[key];
}
function statusColor(key){
  return {authentic:'var(--status-authentic)', suspicious:'var(--status-suspicious)', manipulated:'var(--status-manipulated)', ai:'var(--status-ai)'}[key];
}

function navigate(route){
  window.location.hash = route;
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

function render(){
  let route = window.location.hash || '#/';
  const [path] = route.split('?');
  state.route = path;
  renderNav(path);
  document.getElementById('mobileMenu').classList.remove('open');
  const app = document.getElementById('app');

  const routes = {
    '#/': pageHome,
    '#/verify': pageVerify,
    '#/how-it-works': pageHowItWorks,
    '#/about': pageAbout,
    '#/login': pageLogin,
    '#/signup': pageSignup,
    '#/dashboard': pageDashboard,
    '#/report': pageReport,
  };
  const fn = routes[path] || pageHome;
  app.innerHTML = fn();
  app.querySelector('section, div')?.classList.add('fade-in');
  window.scrollTo({top:0, behavior:'instant'});
  attachHandlers(path);
}

/* ---------------- PAGES ---------------- */

function pageHome(){
  return `
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <h1 class="h-display">Verify digital evidence.<br/>Know what you can trust.</h1>
        <p class="lead" style="margin-top:18px; max-width:460px;">Analyze digital content for signs of manipulation and AI generation with clear, evidence-based verification insights.</p>
        <div class="hero-actions">
          <a href="#/verify" class="btn btn-accent btn-lg">Start Verification</a>
          <a href="#/how-it-works" class="btn btn-outline btn-lg">How It Works</a>
        </div>
        <div class="hero-meta">
          <div class="hero-meta-item">${ICONS.shield}<span>Structured verification methodology</span></div>
          <div class="hero-meta-item">${ICONS.layers}<span>Images, video, audio &amp; documents</span></div>
        </div>
      </div>
      <div style="position:relative;">
        <div class="interface-card">
          <div class="stamp">
            <div class="stamp-inner">
              <span class="s1">DIGITAL</span>
              ${ICONS.check}
              <span class="s1">VERIFIED</span>
            </div>
          </div>
          <div class="interface-titlebar">
            <div class="interface-dots"><span></span><span></span><span></span></div>
            <span class="mono small">verification.session</span>
          </div>
          <div class="interface-body">
            <div class="if-row">
              <span class="if-label">Evidence File</span>
              <span class="if-value mono">IMG_2048.jpg</span>
            </div>
            <div class="if-row">
              <span class="if-label">Verification Status</span>
              <span class="if-value">Analysis Complete</span>
            </div>
            <hr class="divider" style="margin:16px 0;">
            <div class="if-label" style="margin-bottom:8px;">Result</div>
            <span class="status-pill authentic">${ICONS.check} Likely Authentic</span>
            <div class="confidence-block">
              <div class="if-label" style="margin-bottom:4px;">Confidence</div>
              <div class="confidence-num">94%</div>
              <div class="bar-track"><div class="bar-fill" style="width:94%;"></div></div>
            </div>
            <div class="checklist">
              <div class="checklist-item">${ICONS.check} Metadata consistency</div>
              <div class="checklist-item">${ICONS.check} Content integrity</div>
              <div class="checklist-item">${ICONS.check} No significant manipulation indicators</div>
              <div class="checklist-item">${ICONS.check} Low AI-generation indicators</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider">

  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow"><span class="dot"></span> Capabilities</span>
        <h2 class="h-section">Built for evidence you need to trust</h2>
        <p class="lead">Every submission is examined across independent layers of analysis, so a result is never a single opaque score.</p>
      </div>
      <div class="grid-4">
        <div class="feature-card">
          <div class="feature-icon">${ICONS.file}</div>
          <div class="h-card" style="margin-bottom:8px;">Metadata analysis</div>
          <p class="small">Examines embedded file metadata for consistency, editing software signatures, and timestamp anomalies.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">${ICONS.scan}</div>
          <div class="h-card" style="margin-bottom:8px;">Content analysis</div>
          <p class="small">Reviews compression patterns and structural characteristics for irregularities consistent with editing.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">${ICONS.warn}</div>
          <div class="h-card" style="margin-bottom:8px;">Manipulation detection</div>
          <p class="small">Flags regions and indicators that commonly correlate with digital alteration.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">${ICONS.shield}</div>
          <div class="h-card" style="margin-bottom:8px;">AI-generation detection</div>
          <p class="small">Assesses characteristics associated with synthetic and AI-generated media.</p>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider">

  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow"><span class="dot"></span> Process</span>
        <h2 class="h-section">Four steps to a verified result</h2>
      </div>
      <div class="process-row">
        <div class="process-step"><div class="process-num">01</div><div class="h-card" style="margin-bottom:6px;">Upload</div><p class="small">Submit your digital evidence.</p></div>
        <div class="process-step"><div class="process-num">02</div><div class="h-card" style="margin-bottom:6px;">Analyze</div><p class="small">The system examines file characteristics and available metadata.</p></div>
        <div class="process-step"><div class="process-num">03</div><div class="h-card" style="margin-bottom:6px;">Detect</div><p class="small">Potential manipulation and AI-generation indicators are identified.</p></div>
        <div class="process-step"><div class="process-num">04</div><div class="h-card" style="margin-bottom:6px;">Verify</div><p class="small">Receive a clear result with supporting analysis.</p></div>
      </div>
      <div style="margin-top:36px; text-align:center;">
        <a href="#/verify" class="btn btn-accent btn-lg">Start Verification</a>
      </div>
    </div>
  </section>
  `;
}

function pageHowItWorks(){
  return `
  <div class="page-header">
    <div class="wrap">
      <div class="breadcrumb">HOME / HOW IT WORKS</div>
      <h1>How verification works</h1>
      <p class="lead">A structured, repeatable process for assessing digital evidence.</p>
    </div>
  </div>
  <section>
    <div class="wrap">
      <div class="grid-2" style="align-items:stretch;">
        <div class="card" style="padding:28px;">
          <div class="process-num">01</div>
          <div class="h-section" style="margin:10px 0 8px;">Upload</div>
          <p class="lead">Submit your digital evidence — an image, video, audio clip, or document — through the verification interface.</p>
        </div>
        <div class="card" style="padding:28px;">
          <div class="process-num">02</div>
          <div class="h-section" style="margin:10px 0 8px;">Analyze</div>
          <p class="lead">The system examines file characteristics and any available metadata, including editing history and timestamp data.</p>
        </div>
        <div class="card" style="padding:28px;">
          <div class="process-num">03</div>
          <div class="h-section" style="margin:10px 0 8px;">Detect</div>
          <p class="lead">Potential manipulation and AI-generation indicators are identified and scored across independent categories.</p>
        </div>
        <div class="card" style="padding:28px;">
          <div class="process-num">04</div>
          <div class="h-section" style="margin:10px 0 8px;">Verify</div>
          <p class="lead">You receive a clear result — Likely Authentic, Suspicious, Likely Manipulated, or Likely AI-Generated — with supporting analysis explaining why.</p>
        </div>
      </div>
      <div style="margin-top:40px; padding:24px; border-radius:var(--radius-m); background:var(--accent-soft); border:1px solid var(--accent-soft-2); display:flex; gap:12px; align-items:flex-start;">
        <div style="flex-shrink:0; width:18px; height:18px; margin-top:2px; color:var(--ink);">${ICONS.warn}</div>
        <p class="small" style="color:var(--ink); font-weight:500; margin:0;">This demonstration uses a local mock analysis layer. Detection logic is modular and designed to be replaced by a connected forensic or AI-detection backend.</p>
      </div>
      <div style="margin-top:32px; text-align:center;">
        <a href="#/verify" class="btn btn-accent btn-lg">Start Verification</a>
      </div>
    </div>
  </section>
  `;
}

function pageAbout(){
  return `
  <div class="page-header">
    <div class="wrap">
      <div class="breadcrumb">HOME / ABOUT</div>
      <h1>About this project</h1>
    </div>
  </div>
  <section>
    <div class="wrap">
      <div style="max-width:900px;">
        <p class="lead" style="margin-bottom:20px;">Digital AI Evidence Verifier is designed to help users assess the authenticity and integrity of digital content in an environment where AI-generated and manipulated media are increasingly common.</p>
        <p class="lead" style="margin-bottom:20px;">The platform examines uploaded images, video, audio, and documents across metadata, content, manipulation, and AI-generation analysis, and presents the findings in a format that is easy to understand and act on.</p>
        <div class="card" style="padding:24px; margin:28px 0; display:flex; gap:14px; align-items:flex-start;">
          <div class="feature-icon" style="margin-bottom:0; flex-shrink:0;">${ICONS.shield}</div>
          <div>
            <div class="h-card" style="margin-bottom:6px;">A decision-support tool</div>
            <p class="small">Digital AI Evidence Verifier is a verification and decision-support tool. It is not a replacement for professional digital forensic investigation, and results should be interpreted as supporting evidence rather than definitive conclusions.</p>
          </div>
        </div>
        <p class="lead">The system is built with a modular detection layer, so that mock demonstration logic can be replaced with a connected forensic or AI-detection backend without changing the surrounding application.</p>
      </div>
    </div>
  </section>
  `;
}

function pageLogin(){
  return `
  <section style="padding-top:40px;">
    <div class="wrap">
      <div class="auth-shell">
        <h2 class="h-section" style="margin-bottom:6px;">Sign in</h2>
        <p class="small" style="margin-bottom:24px;">Access your verification dashboard.</p>
        <div class="field"><label>Email</label><input type="email" placeholder="you@company.com"></div>
        <div class="field"><label>Password</label><input type="password" placeholder="••••••••"></div>
        <a href="#/dashboard" class="btn btn-primary btn-block" style="margin-top:6px;">Sign In</a>
        <div style="text-align:center; margin-top:14px;"><a href="#/login" class="small">Forgot password?</a></div>
        <hr class="divider" style="margin:22px 0;">
        <p class="small" style="text-align:center;">Don't have an account? <a href="#/signup" style="color:var(--ink); font-weight:600;">Create Account</a></p>
      </div>
    </div>
  </section>
  `;
}

function pageSignup(){
  return `
  <section style="padding-top:40px;">
    <div class="wrap">
      <div class="auth-shell">
        <h2 class="h-section" style="margin-bottom:6px;">Create your account</h2>
        <p class="small" style="margin-bottom:24px;">Start verifying digital evidence in minutes.</p>
        <div class="field"><label>Name</label><input type="text" placeholder="Jane Doe"></div>
        <div class="field"><label>Email</label><input type="email" placeholder="you@company.com"></div>
        <div class="field"><label>Password</label><input type="password" placeholder="••••••••"></div>
        <div class="field"><label>Confirm Password</label><input type="password" placeholder="••••••••"></div>
        <a href="#/dashboard" class="btn btn-primary btn-block" style="margin-top:6px;">Create Account</a>
        <hr class="divider" style="margin:22px 0;">
        <p class="small" style="text-align:center;">Already have an account? <a href="#/login" style="color:var(--ink); font-weight:600;">Sign in</a></p>
      </div>
    </div>
  </section>
  `;
}

function pageVerify(){
  if(!state.selectedFile){
    return `
    <div class="page-header">
      <div class="wrap">
        <div class="breadcrumb">HOME / VERIFY EVIDENCE</div>
        <h1>Verify Evidence</h1>
        <p class="lead">Upload digital evidence for analysis.</p>
      </div>
    </div>
    <section>
      <div class="wrap verify-shell">
        <div class="card" style="padding:8px;">
          <div class="dropzone" id="dropzone">
            <div class="dropzone-icon">${ICONS.upload}</div>
            <div style="font-weight:600; margin-bottom:4px;">Drag &amp; drop your file</div>
            <p class="small" style="margin-bottom:16px;">or</p>
            <label class="btn btn-outline" style="cursor:pointer;">
              Browse Files
              <input type="file" id="fileInput" style="display:none;" accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.avi,.mp3,.wav,.pdf,.docx">
            </label>
            <div class="format-tags">
              <span class="format-tag">JPG</span><span class="format-tag">PNG</span><span class="format-tag">WEBP</span>
              <span class="format-tag">MP4</span><span class="format-tag">MOV</span><span class="format-tag">AVI</span>
              <span class="format-tag">MP3</span><span class="format-tag">WAV</span>
              <span class="format-tag">PDF</span><span class="format-tag">DOCX</span>
            </div>
          </div>
        </div>
        <div class="small" style="margin-top:18px; display:flex; gap:8px; align-items:flex-start;">
          <div style="flex-shrink:0; width:18px; height:18px;">${ICONS.lock}</div>
          <span>Files are processed for verification purposes only within this session.</span>
        </div>
      </div>
    </section>
    `;
  }

  if(state.analysisProgress > 0 && state.analysisProgress < 100){
    const steps = [
      {label:'File Validation', at:15},
      {label:'Metadata Analysis', at:35},
      {label:'Content Analysis', at:60},
      {label:'Manipulation Detection', at:80},
      {label:'AI-Generation Analysis', at:95},
      {label:'Final Assessment', at:100},
    ];
    const rows = steps.map(s=>{
      let cls = 'p-pending', icon = '';
      if(state.analysisProgress >= s.at) { cls='p-done'; icon = ICONS.check; }
      else if(state.analysisProgress >= s.at-20){ cls='p-active'; icon=''; }
      return `<div class="progress-item ${cls}"><span class="progress-icon">${icon}</span>${s.label}</div>`;
    }).join('');
    return `
    <div class="page-header">
      <div class="wrap"><div class="breadcrumb">HOME / VERIFY EVIDENCE</div><h1>Analyzing Evidence</h1><p class="lead">Examining ${state.selectedFile.name}</p></div>
    </div>
    <section>
      <div class="wrap verify-shell">
        <div class="scan-track"><div class="scan-fill" style="width:${state.analysisProgress}%;"></div></div>
        <div class="progress-list">${rows}</div>
      </div>
    </section>
    `;
  }

  if(state.lastResult && state.analysisProgress===100){
    return pageResult(state.lastResult);
  }

  // file selected, ready to start
  const file = state.selectedFile;
  const group = fileTypeGroup(file);
  const groupIcon = {image:ICONS.image, video:ICONS.video, audio:ICONS.audio, document:ICONS.doc, file:ICONS.file}[group];
  return `
  <div class="page-header">
    <div class="wrap"><div class="breadcrumb">HOME / VERIFY EVIDENCE</div><h1>Verify Evidence</h1><p class="lead">Review your file, then start verification.</p></div>
  </div>
  <section>
    <div class="wrap verify-shell">
      <div class="file-info-card">
        <div class="file-icon">${groupIcon}</div>
        <div class="file-meta">
          <div class="file-name">${file.name}</div>
          <div class="file-sub">${group.charAt(0).toUpperCase()+group.slice(1)} · ${formatBytes(file.size)}</div>
        </div>
        <button class="remove-file" id="removeFileBtn" aria-label="Remove file">${ICONS.x}</button>
      </div>
      <button class="btn btn-accent btn-lg btn-block" id="startVerificationBtn" style="margin-top:22px;">Start Verification</button>
    </div>
  </section>
  `;
}

function pageResult(result){
  const scKey = statusClass(result.verdict);
  const scColor = statusColor(result.verdict);
  const group = fileTypeGroup(result.file);
  const whyText = {
    authentic:'No significant indicators of digital manipulation were detected in the analyzed content.',
    suspicious:'Some indicators were detected that warrant closer review, though evidence is not conclusive.',
    manipulated:'Multiple indicators consistent with digital manipulation were identified in the analyzed content.',
    ai:'Characteristics commonly associated with AI-generated content were identified in the analyzed content.',
  }[result.verdict];

  const previewTabHtml = () => {
    if(state.resultTab==='metadata'){
      return `
      <table class="kv-table">
        <tr><td>Metadata consistency</td><td>${result.metaConsistency}</td></tr>
        <tr><td>Editing software detected</td><td>${result.editingSoftware}</td></tr>
        <tr><td>Timestamp consistency</td><td>${result.timestampConsistency}</td></tr>
        <tr><td>Metadata anomalies</td><td>${result.verdict==='authentic' ? 'None found' : 'Detected'}</td></tr>
      </table>`;
    }
    if(state.resultTab==='analysis'){
      return `
      <div class="bar-row"><div class="bar-row-top"><span>Manipulation probability</span><span>${result.manipProb}%</span></div><div class="bar-track"><div class="bar-fill" style="width:${result.manipProb}%; background:var(--status-manipulated);"></div></div></div>
      <div class="bar-row"><div class="bar-row-top"><span>AI-generation probability</span><span>${result.aiProb}%</span></div><div class="bar-track"><div class="bar-fill" style="width:${result.aiProb}%; background:var(--status-ai);"></div></div></div>
      <p class="small" style="margin-top:10px;">Compression pattern: ${result.compressionPattern}</p>
      `;
    }
    // original
    if(group==='image' && state.filePreviewUrl){
      const regions = result.suspiciousRegions.map(r=>`<div class="region-box" style="left:${r.x}%; top:${r.y}%; width:${r.w}%; height:${r.h}%;"></div>`).join('');
      return `<div class="evidence-preview" style="position:relative;"><img src="${state.filePreviewUrl}" alt="Uploaded evidence">${regions}</div>`;
    }
    if(group==='video'){
      return `<div class="evidence-preview" style="padding:60px 20px; text-align:center; color:#888;">${ICONS.video.replace('width="18" height="18"','width="40" height="40"')}<p class="small" style="margin-top:12px;">Video preview &amp; analysis timeline</p></div>`;
    }
    if(group==='audio'){
      return `<div class="evidence-preview" style="padding:40px 20px; text-align:center;">
        <svg viewBox="0 0 300 60" width="100%" height="60"><g fill="var(--accent)">${Array.from({length:48}).map((_,i)=>{const h=8+((MockAnalysisEngine.hash(result.file.name+i))%40); return `<rect x="${i*6}" y="${30-h/2}" width="3" height="${h}" rx="1"/>`}).join('')}</g></svg>
        <p class="small" style="margin-top:10px;">Waveform visualization</p>
      </div>`;
    }
    return `<div class="evidence-preview" style="padding:60px 20px; text-align:center; color:#888;">${ICONS.doc.replace('width="18" height="18"','width="40" height="40"')}<p class="small" style="margin-top:12px;">Document preview</p></div>`;
  };

  return `
  <div class="page-header">
    <div class="wrap"><div class="breadcrumb">HOME / VERIFY EVIDENCE / RESULT</div><h1>Verification Result</h1></div>
  </div>
  <section style="padding-top:44px;">
    <div class="wrap" style="max-width:920px;">
      <div class="result-hero">
        <div>
          <span class="status-pill ${scKey}">${result.verdict==='authentic'?ICONS.check:ICONS.warn} ${result.verdictLabel.toUpperCase()}</span>
          <div class="result-verdict" style="color:${scColor};">${result.verdictLabel}</div>
          <p class="lead" style="margin-top:10px; max-width:480px;">${whyText}</p>
        </div>
        <div style="text-align:center;">
          <div class="conf-ring" style="background:conic-gradient(${scColor} ${result.confidence*3.6}deg, #EEF0F1 0deg);">
            <div style="width:76px; height:76px; border-radius:50%; background:var(--surface); display:flex; align-items:center; justify-content:center; flex-direction:column;">
              <span class="conf-ring-num">${result.confidence}%</span>
            </div>
          </div>
          <div class="small" style="margin-top:8px;">Confidence</div>
        </div>
      </div>

      <div class="grid-4" style="margin-top:24px;">
        <div class="metric-card"><div class="metric-label">Evidence Integrity</div><div class="metric-value">${result.integrity}</div></div>
        <div class="metric-card"><div class="metric-label">Metadata Consistency</div><div class="metric-value">${result.metaConsistency}</div></div>
        <div class="metric-card"><div class="metric-label">Manipulation Indicators</div><div class="metric-value">${result.manipProb<30?'Low':result.manipProb<60?'Moderate':'High'}</div></div>
        <div class="metric-card"><div class="metric-label">AI-Generation Indicators</div><div class="metric-value">${result.aiProb<30?'Low':result.aiProb<60?'Moderate':'High'}</div></div>
      </div>

      <div style="margin-top:44px;" class="grid-2" style="align-items:flex-start;">
        <div>
          <div class="tab-row">
            <button class="tab-btn ${state.resultTab==='original'?'active':''}" data-tab="original">Original</button>
            <button class="tab-btn ${state.resultTab==='analysis'?'active':''}" data-tab="analysis">Analysis</button>
            <button class="tab-btn ${state.resultTab==='metadata'?'active':''}" data-tab="metadata">Metadata</button>
          </div>
          ${previewTabHtml()}
        </div>
        <div>
          <div class="h-card" style="margin-bottom:14px;">File Information</div>
          <table class="kv-table">
            <tr><td>Filename</td><td>${result.file.name}</td></tr>
            <tr><td>File Type</td><td>${result.file.type || group}</td></tr>
            <tr><td>File Size</td><td>${formatBytes(result.file.size)}</td></tr>
            <tr><td>Evidence ID</td><td>${result.evidenceId}</td></tr>
            <tr><td>Hash</td><td style="word-break:break-all;">${result.hash}</td></tr>
            <tr><td>Verification Date</td><td>${result.date.toLocaleDateString()}</td></tr>
          </table>
        </div>
      </div>

      <hr class="divider" style="margin:44px 0;">

      <div class="h-section" style="margin-bottom:20px;">Detailed Analysis</div>
      <div class="grid-2">
        <div class="card" style="padding:22px;">
          <div class="h-card" style="margin-bottom:14px;">Manipulation Analysis</div>
          <div class="bar-row"><div class="bar-row-top"><span>Manipulation probability</span><span>${result.manipProb}%</span></div><div class="bar-track"><div class="bar-fill" style="width:${result.manipProb}%; background:var(--status-manipulated);"></div></div></div>
          <table class="kv-table">
            <tr><td>Suspicious regions</td><td>${result.suspiciousRegions.length ? result.suspiciousRegions.length + ' flagged' : 'None detected'}</td></tr>
            <tr><td>Editing indicators</td><td>${result.editingSoftware}</td></tr>
          </table>
        </div>
        <div class="card" style="padding:22px;">
          <div class="h-card" style="margin-bottom:14px;">AI Detection</div>
          <div class="bar-row"><div class="bar-row-top"><span>AI-generation probability</span><span>${result.aiProb}%</span></div><div class="bar-track"><div class="bar-fill" style="width:${result.aiProb}%; background:var(--status-ai);"></div></div></div>
          <table class="kv-table">
            <tr><td>Detected characteristics</td><td>${result.aiProb>50 ? 'Synthesis artifacts present' : 'None significant'}</td></tr>
            <tr><td>Model assessment</td><td>${result.aiProb>50 ? 'Consistent with generative model output' : 'Consistent with camera-captured content'}</td></tr>
          </table>
        </div>
      </div>

      <div style="display:flex; gap:12px; margin-top:40px; flex-wrap:wrap;">
        <a href="#/report" class="btn btn-primary btn-lg">View Full Report</a>
        <button class="btn btn-outline btn-lg" id="verifyAnotherBtn">Verify Another File</button>
      </div>
    </div>
  </section>
  `;
}

function pageReport(){
  const r = state.lastResult;
  if(!r){
    return `
    <div class="page-header"><div class="wrap"><div class="breadcrumb">HOME / REPORTS</div><h1>Evidence Verification Report</h1></div></div>
    <section>
      <div class="wrap" style="max-width:640px; text-align:center;">
        <p class="lead" style="margin-bottom:24px;">No verification has been completed yet in this session.</p>
        <a href="#/verify" class="btn btn-accent btn-lg">Verify Evidence</a>
      </div>
    </section>`;
  }
  const scKey = statusClass(r.verdict);
  const scColor = statusColor(r.verdict);
  return `
  <div class="page-header"><div class="wrap"><div class="breadcrumb">HOME / REPORTS</div><h1>Evidence Verification Report</h1></div></div>
  <section>
    <div class="wrap" style="max-width:820px;">
      <div class="card" style="padding:32px;" id="reportPrintArea">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
          <div>
            <div class="mono small">${r.evidenceId}</div>
            <div class="h-section" style="margin-top:6px;">${r.file.name}</div>
          </div>
          <span class="status-pill ${scKey}">${r.verdict==='authentic'?ICONS.check:ICONS.warn} ${r.verdictLabel.toUpperCase()}</span>
        </div>
        <hr class="divider" style="margin:24px 0;">
        <table class="kv-table">
          <tr><td>File name</td><td>${r.file.name}</td></tr>
          <tr><td>File type</td><td>${fileTypeGroup(r.file)}</td></tr>
          <tr><td>Verification date</td><td>${r.date.toLocaleString()}</td></tr>
          <tr><td>File hash</td><td style="word-break:break-all;">${r.hash}</td></tr>
          <tr><td>Overall result</td><td style="color:${scColor};">${r.verdictLabel}</td></tr>
          <tr><td>Confidence score</td><td>${r.confidence}%</td></tr>
        </table>

        <div class="h-card" style="margin:28px 0 10px;">Executive Summary</div>
        <p class="small">This report summarizes the automated verification analysis performed on the submitted evidence file. The system evaluated metadata consistency, content characteristics, manipulation indicators, and AI-generation indicators, resulting in an overall assessment of "${r.verdictLabel}" at ${r.confidence}% confidence.</p>

        <div class="h-card" style="margin:24px 0 10px;">Evidence Information</div>
        <table class="kv-table">
          <tr><td>Evidence ID</td><td>${r.evidenceId}</td></tr>
          <tr><td>File size</td><td>${formatBytes(r.file.size)}</td></tr>
          <tr><td>Evidence integrity</td><td>${r.integrity}</td></tr>
        </table>

        <div class="h-card" style="margin:24px 0 10px;">Metadata Analysis</div>
        <table class="kv-table">
          <tr><td>Metadata consistency</td><td>${r.metaConsistency}</td></tr>
          <tr><td>Editing software detected</td><td>${r.editingSoftware}</td></tr>
          <tr><td>Timestamp consistency</td><td>${r.timestampConsistency}</td></tr>
        </table>

        <div class="h-card" style="margin:24px 0 10px;">Manipulation Analysis</div>
        <table class="kv-table">
          <tr><td>Manipulation probability</td><td>${r.manipProb}%</td></tr>
          <tr><td>Suspicious regions</td><td>${r.suspiciousRegions.length ? r.suspiciousRegions.length + ' flagged' : 'None detected'}</td></tr>
          <tr><td>Compression pattern</td><td>${r.compressionPattern}</td></tr>
        </table>

        <div class="h-card" style="margin:24px 0 10px;">AI Detection Analysis</div>
        <table class="kv-table">
          <tr><td>AI-generation probability</td><td>${r.aiProb}%</td></tr>
          <tr><td>Model assessment</td><td>${r.aiProb>50 ? 'Consistent with generative model output' : 'Consistent with camera-captured content'}</td></tr>
        </table>

        <div class="h-card" style="margin:24px 0 10px;">Final Assessment</div>
        <p class="small">Based on the combined analysis, this evidence is assessed as <strong>${r.verdictLabel}</strong>. This result is generated by an automated decision-support tool and does not constitute a certified forensic finding. For legal or investigative purposes, findings should be independently verified by a qualified digital forensics professional.</p>
      </div>

      <div style="display:flex; gap:12px; margin-top:24px; flex-wrap:wrap;" class="no-print">
        <button class="btn btn-primary" id="downloadReportBtn">${ICONS.download} Download Report</button>
        <button class="btn btn-outline" id="printReportBtn">${ICONS.printer} Print Report</button>
        <a href="#/verify" class="btn btn-ghost" id="verifyAnotherBtn2">Verify Another File</a>
      </div>
    </div>
  </section>
  `;
}

function pageDashboard(){
  const demo = [
    {name:'evidence_01.jpg', type:'Image', result:'authentic', label:'Likely Authentic', conf:94, date:'Today'},
    {name:'video_03.mp4', type:'Video', result:'suspicious', label:'Suspicious', conf:72, date:'Yesterday'},
    {name:'audio_02.wav', type:'Audio', result:'ai', label:'Likely AI-Generated', conf:89, date:'Yesterday'},
    {name:'contract_final.pdf', type:'Document', result:'manipulated', label:'Likely Manipulated', conf:81, date:'2 days ago'},
    {name:'photo_event.png', type:'Image', result:'authentic', label:'Likely Authentic', conf:97, date:'3 days ago'},
    {name:'clip_interview.mov', type:'Video', result:'authentic', label:'Likely Authentic', conf:91, date:'4 days ago'},
  ];
  const filters = [
    {key:'all', label:'All'}, {key:'authentic', label:'Authentic'}, {key:'suspicious', label:'Suspicious'},
    {key:'manipulated', label:'Manipulated'}, {key:'ai', label:'AI-Generated'},
  ];
  const rows = demo.filter(d=> state.dashFilter==='all' || d.result===state.dashFilter).map(d=>`
    <tr>
      <td data-label="Evidence"><strong>${d.name}</strong></td>
      <td data-label="Type">${d.type}</td>
      <td data-label="Result"><span class="status-pill ${statusClass(d.result)}">${d.label}</span></td>
      <td data-label="Confidence">${d.conf}%</td>
      <td data-label="Date">${d.date}</td>
      <td data-label="Action"><a href="#/report" class="small" style="color:var(--ink); font-weight:600;">View</a></td>
    </tr>`).join('');

  return `
  <div class="page-header"><div class="wrap"><div class="breadcrumb">HOME / DASHBOARD</div><h1>Evidence Dashboard</h1></div></div>
  <section>
    <div class="wrap">
      <div class="demo-banner">${ICONS.warn} This dashboard displays sample data for demonstration purposes only.</div>
      <div class="dash-stats">
        <div class="stat-card"><div class="small" style="margin-bottom:6px;">Total Verifications</div><div class="stat-num">6</div></div>
        <div class="stat-card"><div class="small" style="margin-bottom:6px;">Likely Authentic</div><div class="stat-num" style="color:var(--status-authentic);">3</div></div>
        <div class="stat-card"><div class="small" style="margin-bottom:6px;">Flagged for Review</div><div class="stat-num" style="color:var(--status-suspicious);">1</div></div>
        <div class="stat-card"><div class="small" style="margin-bottom:6px;">Manipulated / AI-Generated</div><div class="stat-num" style="color:var(--status-manipulated);">2</div></div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; margin-bottom:6px;">
        <div class="h-card">Recent Verifications</div>
        <a href="#/verify" class="btn btn-accent">Verify Evidence</a>
      </div>
      <div class="filter-row" style="margin-top:14px;">
        ${filters.map(f=>`<button class="filter-chip ${state.dashFilter===f.key?'active':''}" data-filter="${f.key}">${f.label}</button>`).join('')}
      </div>
      <div class="card" style="padding:8px 14px; overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Evidence</th><th>Type</th><th>Result</th><th>Confidence</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="6" style="padding:24px; text-align:center; color:var(--ink-faint);">No records match this filter.</td></tr>'}</tbody>
        </table>
      </div>
    </div>
  </section>
  `;
}

/* ---------------- Event wiring ---------------- */
function attachHandlers(path){
  if(path === '#/verify'){
    const dz = document.getElementById('dropzone');
    const fi = document.getElementById('fileInput');
    if(dz && fi){
      dz.addEventListener('click', ()=> fi.click());
      dz.addEventListener('dragover', e=>{ e.preventDefault(); dz.classList.add('drag'); });
      dz.addEventListener('dragleave', ()=> dz.classList.remove('drag'));
      dz.addEventListener('drop', e=>{
        e.preventDefault(); dz.classList.remove('drag');
        if(e.dataTransfer.files.length) selectFile(e.dataTransfer.files[0]);
      });
      fi.addEventListener('change', e=>{
        if(e.target.files.length) selectFile(e.target.files[0]);
      });
    }
    const removeBtn = document.getElementById('removeFileBtn');
    if(removeBtn) removeBtn.addEventListener('click', ()=>{
      state.selectedFile = null; state.filePreviewUrl = null; render();
    });
    const startBtn = document.getElementById('startVerificationBtn');
    if(startBtn) startBtn.addEventListener('click', startVerification);

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(b=> b.addEventListener('click', ()=>{ state.resultTab = b.dataset.tab; render(); }));

    const verifyAnother = document.getElementById('verifyAnotherBtn');
    if(verifyAnother) verifyAnother.addEventListener('click', ()=>{
      state.selectedFile=null; state.filePreviewUrl=null; state.analysisProgress=0; state.lastResult=null; render();
    });
  }
  if(path === '#/report'){
    const dl = document.getElementById('downloadReportBtn');
    if(dl) dl.addEventListener('click', downloadReport);
    const pr = document.getElementById('printReportBtn');
    if(pr) pr.addEventListener('click', ()=> window.print());
    const va2 = document.getElementById('verifyAnotherBtn2');
    if(va2) va2.addEventListener('click', ()=>{
      state.selectedFile=null; state.filePreviewUrl=null; state.analysisProgress=0; state.lastResult=null;
    });
  }
  if(path === '#/dashboard'){
    document.querySelectorAll('.filter-chip').forEach(b=> b.addEventListener('click', ()=>{
      state.dashFilter = b.dataset.filter; render();
    }));
  }
}

function selectFile(file){
  state.selectedFile = file;
  state.analysisProgress = 0;
  state.lastResult = null;
  if(state.filePreviewUrl) URL.revokeObjectURL(state.filePreviewUrl);
  state.filePreviewUrl = fileTypeGroup(file)==='image' ? URL.createObjectURL(file) : null;
  render();
}

function startVerification(){
  state.analysisProgress = 1;
  render();
  let p = 0;
  const tick = () => {
    p += 8 + Math.random()*10;
    if(p >= 100){
      p = 100;
      state.analysisProgress = 100;
      state.lastResult = MockAnalysisEngine.analyze(state.selectedFile);
      state.resultTab = 'original';
      render();
      return;
    }
    state.analysisProgress = p;
    render();
    setTimeout(tick, 420);
  };
  setTimeout(tick, 420);
}

function downloadReport(){
  const r = state.lastResult;
  if(!r) return;
  const text = `DIGITAL AI EVIDENCE VERIFIER — VERIFICATION REPORT
Evidence ID: ${r.evidenceId}
File name: ${r.file.name}
File type: ${fileTypeGroup(r.file)}
Verification date: ${r.date.toLocaleString()}
File hash: ${r.hash}
Overall result: ${r.verdictLabel}
Confidence score: ${r.confidence}%

EXECUTIVE SUMMARY
This report summarizes the automated verification analysis performed on the submitted evidence file. The system evaluated metadata consistency, content characteristics, manipulation indicators, and AI-generation indicators, resulting in an overall assessment of "${r.verdictLabel}" at ${r.confidence}% confidence.

METADATA ANALYSIS
Metadata consistency: ${r.metaConsistency}
Editing software detected: ${r.editingSoftware}
Timestamp consistency: ${r.timestampConsistency}

MANIPULATION ANALYSIS
Manipulation probability: ${r.manipProb}%
Suspicious regions: ${r.suspiciousRegions.length ? r.suspiciousRegions.length + ' flagged' : 'None detected'}
Compression pattern: ${r.compressionPattern}

AI DETECTION ANALYSIS
AI-generation probability: ${r.aiProb}%
Model assessment: ${r.aiProb>50 ? 'Consistent with generative model output' : 'Consistent with camera-captured content'}

FINAL ASSESSMENT
Based on the combined analysis, this evidence is assessed as ${r.verdictLabel}. This result is generated by an automated decision-support tool and does not constitute a certified forensic finding.
`;
  const blob = new Blob([text], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${r.evidenceId}-verification-report.txt`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
