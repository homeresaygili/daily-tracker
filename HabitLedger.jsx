import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Pencil, Check, ArrowUp, ArrowDown, Pause, Play } from 'lucide-react';

// App icon, embedded so it travels with this file.
const APP_ICON = 'data:image/png;base64,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';

/* ───────────────────────── Schema ─────────────────────────
   schema = { version: 2, pages: [ { id, title, sections: [ { id, title, items: [item] } ] } ] }
   item   = { id, label, type: 'toggle'|'number', unit?, note?, paused?, freq? }
   freq   = { kind: 'daily' }
          | { kind: 'weekdays', days: [0..6] }        (0 = Monday … 6 = Sunday)
          | { kind: 'interval', every: N, start: 'YYYY-MM-DD' }
          | { kind: 'weekly', times: N }              (flexible: N times any day of the week)
   Items without freq are treated as daily, so older saved data keeps working.
*/

const SCHEMA_VERSION = 2;

const DAILY_PAGE = {
  id: 'daily',
  title: 'Daily',
  sections: [
    {
      id: 'habits',
      title: 'Habits',
      items: [
        { id: 'coffee', label: 'Coffee', type: 'number', unit: 'cups' },
        { id: 'cigarettes', label: 'Cigarettes', type: 'number' },
        { id: 'bass', label: 'Bass practice', type: 'toggle' },
        { id: 'assimil', label: 'Assimil', type: 'toggle' },
        { id: 'lingvist', label: 'Lingvist', type: 'toggle' },
        { id: 'reading', label: 'Reading', type: 'number', unit: 'pages' },
        { id: 'workout', label: 'Workout', type: 'toggle' },
      ],
    },
    {
      id: 'supplements',
      title: 'Supplements',
      items: [
        { id: 'probiotics', label: 'Probiotics', type: 'toggle' },
        { id: 'vitaminC', label: 'Vitamin C', type: 'toggle' },
        { id: 'vitaminD', label: 'Vitamin D', type: 'toggle' },
        { id: 'fishOil', label: 'Fish oil', type: 'toggle' },
      ],
    },
  ],
};

function buildSkinPage() {
  const start = dateKey(new Date());
  return {
    id: 'skin',
    title: 'Skin',
    sections: [
      {
        id: 'skin_face_am',
        title: 'Face · Morning',
        items: [
          { id: 'skin_am_cleanse', label: 'Cleanse', note: 'CeraVe Foaming Cleanser', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_am_comedomed', label: 'Comedomed+', note: 'Inflamed spots only', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_am_cicalfate', label: 'Cicalfate', note: 'Healing spots only', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_am_spf', label: 'Sunscreen', note: 'Heliocare · reapply on long rides', type: 'toggle', freq: { kind: 'daily' } },
        ],
      },
      {
        id: 'skin_face_pm',
        title: 'Face · Evening',
        items: [
          { id: 'skin_pm_cleanse', label: 'Cleanse', note: 'CeraVe Foaming Cleanser', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_pm_az', label: 'Effaclar A.Z.', note: 'Full face incl. jaw · skip on tretinoin nights', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_pm_cica', label: 'Cica Gel', note: 'After the active', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_pm_vaseline', label: 'Vaseline', note: 'Thin seal, last step', type: 'toggle', freq: { kind: 'daily' } },
          {
            id: 'skin_pm_tret', label: 'Tretinoin 0.025%',
            note: 'Sandwich: Vaseline → tret → Cica. Unpause when jaw spots are flat',
            type: 'toggle', freq: { kind: 'interval', every: 3, start }, paused: true,
          },
        ],
      },
      {
        id: 'skin_body',
        title: 'Body',
        items: [
          { id: 'skin_body_cleanse', label: 'Shower cleanse', note: 'CeraVe Foaming Cleanser', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_body_clindoxyl', label: 'Clindoxyl', note: 'Thin layer, active spots only · not on dark marks · leave on · no shower? wipe, dry, apply', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_body_moist', label: 'Moisturize', note: 'Once Clindoxyl has dried, ~15 min · light, fragrance-free', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_body_cica', label: 'Cica Gel', note: 'Healing spots', type: 'toggle', freq: { kind: 'daily' } },
        ],
      },
      {
        id: 'skin_hair',
        title: 'Hair',
        items: [
          { id: 'skin_hair_minox', label: 'Minoxidil', note: 'Dry scalp, ~4 h before bed', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_hair_peptide', label: 'Peptide serum', note: '20–30 min after minoxidil', type: 'toggle', freq: { kind: 'daily' } },
          { id: 'skin_hair_dut', label: 'Dutasteride', type: 'toggle', freq: { kind: 'weekly', times: 3 } },
          { id: 'skin_hair_keto', label: 'Ketoconazole shampoo', note: 'Evening, before minoxidil', type: 'toggle', freq: { kind: 'weekly', times: 3 } },
        ],
      },
      {
        id: 'skin_weekly',
        title: 'Weekly check',
        items: [
          { id: 'skin_wk_lesions', label: 'Active body spots', type: 'number', unit: 'spots', freq: { kind: 'weekdays', days: [6] } },
          { id: 'skin_wk_new', label: 'New this week', type: 'number', unit: 'spots', freq: { kind: 'weekdays', days: [6] } },
          { id: 'skin_wk_photo', label: 'Progress photo', note: 'Same light, same angle', type: 'toggle', freq: { kind: 'weekdays', days: [6] } },
        ],
      },
    ],
  };
}

function migrateSchema(saved) {
  if (saved && Array.isArray(saved.pages) && saved.pages.length) return saved;
  const dailySections = saved && Array.isArray(saved.sections) ? saved.sections : DAILY_PAGE.sections;
  return { version: SCHEMA_VERSION, pages: [{ ...DAILY_PAGE, sections: dailySections }, buildSkinPage()] };
}

/* ───────────────────────── Style ───────────────────────── */

const COLORS = {
  bg: '#111E19',
  bgCard: '#192823',
  hairline: 'rgba(201,166,105,0.16)',
  hairlineStrong: 'rgba(201,166,105,0.32)',
  amber: '#C68B3E',
  amberBright: '#E0A94F',
  parchment: '#EDE6D6',
  muted: '#8FA093',
  mutedDark: '#5E6E63',
  rust: '#B0614B',
};

const FONT_DISPLAY = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";
const FONT_UI = "'Inter', -apple-system, system-ui, 'Segoe UI', sans-serif";

const navBtnStyle = {
  width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(143,160,147,0.1)', border: `1px solid ${COLORS.hairline}`, cursor: 'pointer',
};

const stepBtnStyle = {
  width: 26, height: 26, borderRadius: '50%', border: `1px solid ${COLORS.hairline}`,
  background: 'rgba(143,160,147,0.1)', color: COLORS.parchment, fontSize: 16, lineHeight: 1,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const inputStyle = {
  flex: 1, minWidth: 0, background: 'rgba(0,0,0,0.2)', border: `1px solid ${COLORS.hairline}`, borderRadius: 8,
  padding: '8px 10px', color: COLORS.parchment, fontSize: 13, fontFamily: FONT_UI, outline: 'none',
};

const addBtnStyle = {
  width: 34, height: 34, borderRadius: 8, background: COLORS.amber, border: 'none',
  color: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
};

const iconBtnStyle = {
  background: 'none', border: 'none', color: COLORS.muted, cursor: 'pointer', padding: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const badgeStyle = {
  fontFamily: FONT_MONO, fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase',
  color: COLORS.amber, border: `1px solid ${COLORS.hairlineStrong}`, borderRadius: 999, padding: '1px 7px',
  whiteSpace: 'nowrap',
};

const textBtnStyle = {
  background: 'transparent', border: `1px solid ${COLORS.hairline}`, color: COLORS.muted, borderRadius: 8,
  padding: '7px 12px', fontSize: 12.5, fontFamily: FONT_UI, cursor: 'pointer',
};

/* ───────────────────────── Dates ───────────────────────── */

const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKDAY_NARROW = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseKey(k) {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function displayDate(d, today) {
  const isToday = dateKey(d) === dateKey(today);
  const isYesterday = dateKey(d) === dateKey(new Date(today.getTime() - 86400000));
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
  const md = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (isToday) return `Today · ${md}`;
  if (isYesterday) return `Yesterday · ${md}`;
  return `${weekday} · ${md}`;
}

function addDays(d, n) {
  const date = new Date(d);
  date.setDate(date.getDate() + n);
  return date;
}

function addMonths(d, n) {
  const date = new Date(d);
  date.setMonth(date.getMonth() + n);
  return date;
}

function startOfWeek(d) {
  const date = new Date(d);
  const diff = (date.getDay() + 6) % 7; // days since Monday
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function mondayIndex(d) {
  return (d.getDay() + 6) % 7;
}

function diffDays(a, b) {
  const A = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const B = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((B - A) / 86400000);
}

function isSameDay(a, b) {
  return dateKey(a) === dateKey(b);
}

function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function monthMatrix(d) {
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  let cur = startOfWeek(first);
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(cur);
      cur = addDays(cur, 1);
    }
    weeks.push(week);
  }
  while (weeks.length > 4 && weeks[weeks.length - 1].every((day) => !isSameMonth(day, d))) weeks.pop();
  return weeks;
}

function slug(s) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'item';
}

/* ───────────────────────── Scheduling ───────────────────────── */

function freqOf(item) {
  return item.freq || { kind: 'daily' };
}

function isFlexible(item) {
  return freqOf(item).kind === 'weekly';
}

function isScheduled(item, d) {
  if (item.paused) return false;
  const f = freqOf(item);
  if (f.kind === 'weekdays') return (f.days || []).includes(mondayIndex(d));
  if (f.kind === 'interval') {
    const every = Math.max(1, f.every || 1);
    const n = diffDays(f.start ? parseKey(f.start) : d, d);
    return n >= 0 && n % every === 0;
  }
  return true; // daily, and flexible weekly items are allowed any day
}

function isFilled(item, v) {
  if (item.type === 'toggle') return !!v;
  return v !== undefined && v !== null && v !== '';
}

function weekCount(item, d, entries) {
  const ws = startOfWeek(d);
  let c = 0;
  for (let i = 0; i < 7; i++) {
    if (isFilled(item, entries[dateKey(addDays(ws, i))]?.[item.id])) c += 1;
  }
  return c;
}

function freqLabel(f) {
  if (f.kind === 'weekdays') {
    const days = f.days || [];
    if (days.length === 7) return 'Every day';
    return days.map((i) => WEEKDAY_SHORT[i]).join(' · ');
  }
  if (f.kind === 'interval') return f.every === 1 ? 'Every day' : `Every ${f.every} days`;
  if (f.kind === 'weekly') return `${f.times}× a week`;
  return 'Every day';
}

/* ───────────────────────── Item editor ───────────────────────── */

function ItemEditor({ initial, onSave, onCancel }) {
  const f0 = (initial && initial.freq) || { kind: 'daily' };
  const [label, setLabel] = useState(initial?.label || '');
  const [note, setNote] = useState(initial?.note || '');
  const [type, setType] = useState(initial?.type || 'toggle');
  const [unit, setUnit] = useState(initial?.unit || '');
  const [kind, setKind] = useState(f0.kind);
  const [days, setDays] = useState(f0.days || [0, 2, 4]);
  const [every, setEvery] = useState(String(f0.every || 2));
  const [times, setTimes] = useState(String(f0.times || 3));
  const [paused, setPaused] = useState(!!initial?.paused);
  const [err, setErr] = useState('');

  function toggleDay(i) {
    setDays((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
  }

  function save() {
    if (!label.trim()) { setErr('Give it a name.'); return; }
    if (kind === 'weekdays' && days.length === 0) { setErr('Pick at least one day.'); return; }
    let freq;
    if (kind === 'weekdays') {
      freq = { kind, days: [...days].sort((a, b) => a - b) };
    } else if (kind === 'interval') {
      const n = Math.max(1, Math.min(60, parseInt(every, 10) || 1));
      const resuming = !!initial?.paused && !paused;
      const keepStart = f0.kind === 'interval' && f0.start && !resuming;
      freq = { kind, every: n, start: keepStart ? f0.start : dateKey(new Date()) };
    } else if (kind === 'weekly') {
      freq = { kind, times: Math.max(1, Math.min(7, parseInt(times, 10) || 1)) };
    } else {
      freq = { kind: 'daily' };
    }
    const item = {
      id: initial?.id || `${slug(label)}_${Date.now().toString(36)}`,
      label: label.trim(),
      type,
      freq,
    };
    if (note.trim()) item.note = note.trim();
    if (type === 'number' && unit.trim()) item.unit = unit.trim();
    if (paused) item.paused = true;
    onSave(item);
  }

  const chip = (active) => ({
    width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontFamily: FONT_MONO, fontSize: 11.5,
    border: `1px solid ${active ? COLORS.amber : COLORS.hairline}`,
    background: active ? COLORS.amber : 'transparent',
    color: active ? COLORS.bg : COLORS.muted,
  });

  return (
    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 9, background: 'rgba(0,0,0,0.14)' }}>
      <input id={`ed-label-${initial?.id || 'new'}`} placeholder="Name" value={label} onChange={(e) => setLabel(e.target.value)} style={inputStyle} />
      <input id={`ed-note-${initial?.id || 'new'}`} placeholder="Note (optional), e.g. spot only" value={note} onChange={(e) => setNote(e.target.value)} style={inputStyle} />

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <select id={`ed-type-${initial?.id || 'new'}`} value={type} onChange={(e) => setType(e.target.value)} style={{ ...inputStyle, flex: '0 0 116px' }}>
          <option value="toggle">Yes / no</option>
          <option value="number">Number</option>
        </select>
        {type === 'number' && (
          <input id={`ed-unit-${initial?.id || 'new'}`} placeholder="unit (cups, spots…)" value={unit} onChange={(e) => setUnit(e.target.value)} style={inputStyle} />
        )}
      </div>

      <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: '0.12em', color: COLORS.muted, textTransform: 'uppercase', marginTop: 2 }}>
        How often
      </div>
      <select id={`ed-kind-${initial?.id || 'new'}`} value={kind} onChange={(e) => setKind(e.target.value)} style={inputStyle}>
        <option value="daily">Every day</option>
        <option value="weekdays">Specific days</option>
        <option value="interval">Every few days</option>
        <option value="weekly">A number of times per week</option>
      </select>

      {kind === 'weekdays' && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {WEEKDAY_NARROW.map((l, i) => (
            <button key={i} type="button" aria-pressed={days.includes(i)} aria-label={WEEKDAY_SHORT[i]} onClick={() => toggleDay(i)} style={chip(days.includes(i))}>
              {l}
            </button>
          ))}
        </div>
      )}

      {kind === 'interval' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT_UI, fontSize: 13, color: COLORS.muted }}>
          <span>Every</span>
          <input id={`ed-every-${initial?.id || 'new'}`} type="number" min="1" max="60" value={every} onChange={(e) => setEvery(e.target.value)} style={{ ...inputStyle, flex: '0 0 64px' }} />
          <span>days, counting from {f0.kind === 'interval' && f0.start && !(initial?.paused && !paused) ? f0.start : 'today'}</span>
        </div>
      )}

      {kind === 'weekly' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT_UI, fontSize: 13, color: COLORS.muted }}>
          <input id={`ed-times-${initial?.id || 'new'}`} type="number" min="1" max="7" value={times} onChange={(e) => setTimes(e.target.value)} style={{ ...inputStyle, flex: '0 0 64px' }} />
          <span>times a week, any days</span>
        </div>
      )}

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT_UI, fontSize: 13, color: COLORS.parchment, cursor: 'pointer', marginTop: 2 }}>
        <input id={`ed-paused-${initial?.id || 'new'}`} type="checkbox" checked={paused} onChange={(e) => setPaused(e.target.checked)} style={{ accentColor: COLORS.amber, width: 16, height: 16 }} />
        Paused (keeps it on the list, not counted)
      </label>

      {err && <div style={{ fontFamily: FONT_UI, fontSize: 12, color: COLORS.rust }}>{err}</div>}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 2 }}>
        <button type="button" onClick={onCancel} style={textBtnStyle}>Cancel</button>
        <button type="button" onClick={save} style={{ ...textBtnStyle, background: COLORS.amber, color: COLORS.bg, border: `1px solid ${COLORS.amber}`, fontWeight: 600 }}>
          {initial ? 'Save' : 'Add'}
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── App ───────────────────────── */

export default function HabitLedger() {
  const [schema, setSchema] = useState(null);
  const [entries, setEntries] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [pageId, setPageId] = useState('daily');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week' | 'month'
  const [editMode, setEditMode] = useState(false);
  const [editing, setEditing] = useState(null); // { sectionId, itemId } — itemId null means a new item
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [addingPage, setAddingPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [confirmRemovePage, setConfirmRemovePage] = useState(false);
  const [error, setError] = useState(null);
  const [showBackup, setShowBackup] = useState(false);
  const [backupText, setBackupText] = useState('');
  const [restoreText, setRestoreText] = useState('');
  const [restoreArmed, setRestoreArmed] = useState(false);
  const [backupMsg, setBackupMsg] = useState('');

  const today = new Date();

  useEffect(() => {
    try {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = APP_ICON;
    } catch (e) { /* favicon is cosmetic */ }
  }, []);

  useEffect(() => {
    (async () => {
      let saved = null;
      try {
        const r = await window.storage.get('schema', false);
        if (r && r.value) saved = JSON.parse(r.value);
      } catch (e) { /* no schema saved yet */ }
      let e = {};
      try {
        const r2 = await window.storage.get('entries', false);
        if (r2 && r2.value) e = JSON.parse(r2.value);
      } catch (err) { /* no entries saved yet */ }
      const s = migrateSchema(saved);
      setSchema(s);
      setEntries(e);
      setLoaded(true);
      if (!saved || !Array.isArray(saved.pages)) {
        try { await window.storage.set('schema', JSON.stringify(s), false); } catch (err) { /* retried on next change */ }
      }
    })();
  }, []);

  const persistSchema = useCallback(async (next) => {
    setSchema(next);
    try {
      await window.storage.set('schema', JSON.stringify(next), false);
    } catch (e) { setError('Could not save that change.'); }
  }, []);

  const persistEntries = useCallback(async (next) => {
    setEntries(next);
    try {
      await window.storage.set('entries', JSON.stringify(next), false);
    } catch (e) { setError('Could not save that change.'); }
  }, []);

  if (!loaded || !schema) {
    return (
      <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: FONT_MONO, color: COLORS.muted, fontSize: 13, letterSpacing: '0.05em' }}>loading ledger…</p>
      </div>
    );
  }

  const page = schema.pages.find((p) => p.id === pageId) || schema.pages[0];
  // Days before the first logged day never count as missed.
  const loggedKeys = Object.keys(entries).filter((k) => Object.values(entries[k] || {}).some((v) => v !== false && v !== undefined && v !== null && v !== '')).sort();
  const firstLogged = loggedKeys.length ? parseKey(loggedKeys[0]) : null;
  const isBeforeTracking = (d) => !firstLogged || diffDays(firstLogged, d) < 0;
  const pageItems = page.sections.flatMap((s) => s.items);
  const dayKey = dateKey(currentDate);
  const dayEntry = entries[dayKey] || {};

  /* ── schema edits ── */

  function updatePage(fn) {
    persistSchema({ ...schema, pages: schema.pages.map((p) => (p.id === page.id ? fn(p) : p)) });
  }

  function updateSection(sectionId, fn) {
    updatePage((p) => ({ ...p, sections: p.sections.map((s) => (s.id === sectionId ? fn(s) : s)) }));
  }

  function saveItem(sectionId, item, isNew) {
    updateSection(sectionId, (s) => ({
      ...s,
      items: isNew ? [...s.items, item] : s.items.map((i) => (i.id === item.id ? item : i)),
    }));
    setEditing(null);
  }

  function moveItem(sectionId, idx, dir) {
    updateSection(sectionId, (s) => {
      const to = idx + dir;
      if (to < 0 || to >= s.items.length) return s;
      const items = [...s.items];
      [items[idx], items[to]] = [items[to], items[idx]];
      return { ...s, items };
    });
  }

  function togglePause(sectionId, item) {
    const next = { ...item };
    if (item.paused) {
      delete next.paused;
      if (freqOf(item).kind === 'interval') next.freq = { ...freqOf(item), start: dateKey(new Date()) };
    } else {
      next.paused = true;
    }
    saveItem(sectionId, next, false);
  }

  function removeItem(sectionId, itemId) {
    updateSection(sectionId, (s) => ({ ...s, items: s.items.filter((i) => i.id !== itemId) }));
  }

  function moveSection(idx, dir) {
    updatePage((p) => {
      const to = idx + dir;
      if (to < 0 || to >= p.sections.length) return p;
      const sections = [...p.sections];
      [sections[idx], sections[to]] = [sections[to], sections[idx]];
      return { ...p, sections };
    });
  }

  function removeSection(sectionId) {
    updatePage((p) => ({ ...p, sections: p.sections.filter((s) => s.id !== sectionId) }));
  }

  function addSection() {
    if (!newSectionTitle.trim()) return;
    const id = `${slug(newSectionTitle)}_${Date.now().toString(36)}`;
    updatePage((p) => ({ ...p, sections: [...p.sections, { id, title: newSectionTitle.trim(), items: [] }] }));
    setNewSectionTitle('');
    setAddingSection(false);
  }

  function addPage() {
    if (!newPageTitle.trim()) return;
    const id = `${slug(newPageTitle)}_${Date.now().toString(36)}`;
    persistSchema({ ...schema, pages: [...schema.pages, { id, title: newPageTitle.trim(), sections: [] }] });
    setNewPageTitle('');
    setAddingPage(false);
    setPageId(id);
  }

  function removePage() {
    if (schema.pages.length <= 1) return;
    const remaining = schema.pages.filter((p) => p.id !== page.id);
    persistSchema({ ...schema, pages: remaining });
    setPageId(remaining[0].id);
    setConfirmRemovePage(false);
  }

  /* ── backup & restore ── */

  async function copyBackup() {
    const text = JSON.stringify({ app: 'habit-ledger', version: SCHEMA_VERSION, exportedAt: new Date().toISOString(), schema, entries });
    setBackupText(text);
    try {
      await navigator.clipboard.writeText(text);
      setBackupMsg('Backup copied. Paste it into the Restore box on your other device or version.');
    } catch (e) {
      setBackupMsg('Copying was blocked here. Select all the text in the box below and copy it yourself.');
    }
  }

  function restoreBackup() {
    let data;
    try {
      data = JSON.parse(restoreText);
    } catch (e) {
      setBackupMsg('That text is not a complete backup. Paste everything you copied, from the first { to the last }.');
      setRestoreArmed(false);
      return;
    }
    if (!data || !data.schema || typeof data.entries !== 'object' || data.entries === null) {
      setBackupMsg('That text does not look like a Habit Ledger backup.');
      setRestoreArmed(false);
      return;
    }
    if (!restoreArmed) {
      setRestoreArmed(true);
      setBackupMsg('This replaces everything saved on this device. Tap Restore again to confirm.');
      return;
    }
    const nextSchema = migrateSchema(data.schema);
    persistSchema(nextSchema);
    persistEntries(data.entries);
    setPageId(nextSchema.pages[0].id);
    setRestoreArmed(false);
    setRestoreText('');
    setBackupMsg(`Restored ${Object.keys(data.entries).length} days of history.`);
  }

  /* ── entry edits ── */

  function updateValue(itemId, value) {
    persistEntries({ ...entries, [dayKey]: { ...dayEntry, [itemId]: value } });
  }

  function toggleItem(itemId) {
    updateValue(itemId, !dayEntry[itemId]);
  }

  function stepNumber(itemId, delta) {
    const raw = dayEntry[itemId];
    const logged = raw !== undefined && raw !== null && raw !== '';
    const next = logged ? Math.max(0, (Number(raw) || 0) + delta) : Math.max(0, delta);
    updateValue(itemId, next);
  }

  /* ── derived ── */

  function completionRatio(d) {
    const e = entries[dateKey(d)] || {};
    let due = 0;
    let done = 0;
    pageItems.forEach((it) => {
      if (it.paused) return;
      const filled = isFilled(it, e[it.id]);
      if (isFlexible(it)) {
        if (filled) { due += 1; done += 1; }
        return;
      }
      if (isScheduled(it, d)) {
        due += 1;
        if (filled) done += 1;
      }
    });
    return due ? done / due : 0;
  }

  function badgeFor(item, d) {
    if (item.paused) return 'Paused';
    const f = freqOf(item);
    if (f.kind === 'weekly') return `${weekCount(item, d, entries)}/${f.times} this week`;
    if (!isScheduled(item, d)) return 'Off day';
    if (f.kind === 'daily') return null;
    return freqLabel(f);
  }

  const isTodaySelected = isSameDay(currentDate, today);
  const isCurrentWeek = isSameDay(startOfWeek(currentDate), startOfWeek(today));
  const isCurrentMonth = isSameMonth(currentDate, today);

  function goPrev() {
    if (viewMode === 'day') setCurrentDate(addDays(currentDate, -1));
    else if (viewMode === 'week') setCurrentDate(addDays(currentDate, -7));
    else setCurrentDate(addMonths(currentDate, -1));
  }
  function goNext() {
    if (viewMode === 'day') { if (!isTodaySelected) setCurrentDate(addDays(currentDate, 1)); }
    else if (viewMode === 'week') { if (!isCurrentWeek) setCurrentDate(addDays(currentDate, 7)); }
    else if (!isCurrentMonth) setCurrentDate(addMonths(currentDate, 1));
  }
  const nextDisabled = viewMode === 'day' ? isTodaySelected : viewMode === 'week' ? isCurrentWeek : isCurrentMonth;
  const showJumpToday = viewMode === 'day' ? !isTodaySelected : viewMode === 'week' ? !isCurrentWeek : !isCurrentMonth;

  let eyebrow = `${page.title} · Daily`;
  let title = displayDate(currentDate, today);
  if (viewMode === 'week') {
    const ws = startOfWeek(currentDate);
    const we = addDays(ws, 6);
    eyebrow = `${page.title} · Weekly`;
    title = ws.getMonth() === we.getMonth()
      ? `${ws.toLocaleDateString('en-US', { month: 'short' })} ${ws.getDate()}–${we.getDate()}`
      : `${ws.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${we.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  } else if (viewMode === 'month') {
    eyebrow = `${page.title} · Monthly`;
    title = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  const strip = Array.from({ length: 14 }, (_, i) => addDays(today, -(13 - i)));
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(currentDate), i));
  const monthWeeks = monthMatrix(currentDate);

  function sectionWeekStats(section) {
    let due = 0;
    let done = 0;
    section.items.forEach((it) => {
      if (it.paused) return;
      const f = freqOf(it);
      if (f.kind === 'weekly') {
        due += f.times;
        done += Math.min(f.times, weekCount(it, currentDate, entries));
        return;
      }
      weekDays.forEach((d) => {
        if (d > today || isBeforeTracking(d)) return;
        if (isScheduled(it, d)) {
          due += 1;
          if (isFilled(it, entries[dateKey(d)]?.[it.id])) done += 1;
        }
      });
    });
    return { due, done };
  }

  /* ── render pieces ── */

  function renderControl(item) {
    const v = dayEntry[item.id];
    const disabled = !!item.paused;
    if (item.type === 'toggle') {
      return (
        <button
          onClick={() => !disabled && toggleItem(item.id)}
          disabled={disabled}
          aria-pressed={!!v}
          aria-label={`${item.label} done`}
          style={{
            width: 46, height: 26, borderRadius: 999, position: 'relative',
            background: v ? COLORS.amber : 'rgba(143,160,147,0.18)',
            border: `1px solid ${v ? COLORS.amberBright : COLORS.hairline}`,
            cursor: disabled ? 'default' : 'pointer', transition: 'background 0.15s ease', flexShrink: 0,
          }}
        >
          <div style={{
            width: 18, height: 18, borderRadius: '50%',
            background: v ? COLORS.bg : COLORS.parchment,
            position: 'absolute', top: 3, left: v ? 24 : 3, transition: 'left 0.15s ease',
          }} />
        </button>
      );
    }
    const logged = isFilled(item, v);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button onClick={() => !disabled && stepNumber(item.id, -1)} disabled={disabled} style={stepBtnStyle} aria-label={`Decrease ${item.label}`}>–</button>
        <div style={{ fontFamily: FONT_MONO, fontSize: 15, minWidth: 40, textAlign: 'center', color: logged ? COLORS.parchment : COLORS.mutedDark }}>
          {logged ? Number(v) : '–'}
          {item.unit && <span style={{ fontSize: 10, color: COLORS.muted, marginLeft: 3 }}>{item.unit}</span>}
        </div>
        <button onClick={() => !disabled && stepNumber(item.id, 1)} disabled={disabled} style={stepBtnStyle} aria-label={`Increase ${item.label}`}>+</button>
      </div>
    );
  }

  function renderEditActions(section, item, idx) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        <button onClick={() => moveItem(section.id, idx, -1)} style={iconBtnStyle} aria-label={`Move ${item.label} up`} disabled={idx === 0}>
          <ArrowUp size={14} color={idx === 0 ? COLORS.mutedDark : COLORS.muted} />
        </button>
        <button onClick={() => moveItem(section.id, idx, 1)} style={iconBtnStyle} aria-label={`Move ${item.label} down`} disabled={idx === section.items.length - 1}>
          <ArrowDown size={14} color={idx === section.items.length - 1 ? COLORS.mutedDark : COLORS.muted} />
        </button>
        <button onClick={() => togglePause(section.id, item)} style={iconBtnStyle} aria-label={item.paused ? `Resume ${item.label}` : `Pause ${item.label}`}>
          {item.paused ? <Play size={14} color={COLORS.amber} /> : <Pause size={14} />}
        </button>
        <button onClick={() => setEditing({ sectionId: section.id, itemId: item.id })} style={iconBtnStyle} aria-label={`Edit ${item.label}`}>
          <Pencil size={14} />
        </button>
        <button onClick={() => removeItem(section.id, item.id)} style={{ ...iconBtnStyle, color: COLORS.rust }} aria-label={`Remove ${item.label}`}>
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.parchment }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        button, input, select { font-family: inherit; }
        select option { background: ${COLORS.bgCard}; color: ${COLORS.parchment}; }
        input:focus, select:focus, button:focus-visible { outline: 2px solid ${COLORS.amber}; outline-offset: 2px; }
        ::selection { background: ${COLORS.amber}; color: ${COLORS.bg}; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: 'calc(22px + env(safe-area-inset-top, 0px)) 20px calc(80px + env(safe-area-inset-bottom, 0px))' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <img src={APP_ICON} alt="" width={30} height={30} style={{ borderRadius: 8, border: `1px solid ${COLORS.hairline}`, display: 'block' }} />
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', color: COLORS.muted, textTransform: 'uppercase' }}>
            Habit Ledger
          </span>
        </div>

        {/* Tracker tabs */}
        <div role="tablist" aria-label="Trackers" style={{ display: 'flex', alignItems: 'flex-end', gap: 20, borderBottom: `1px solid ${COLORS.hairline}`, marginBottom: 20, flexWrap: 'wrap' }}>
          {schema.pages.map((p) => {
            const active = p.id === page.id;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={active}
                onClick={() => { setPageId(p.id); setEditing(null); setConfirmRemovePage(false); }}
                style={{
                  background: 'none', border: 'none', padding: '0 0 10px', marginBottom: -1, cursor: 'pointer',
                  fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 600,
                  color: active ? COLORS.parchment : COLORS.mutedDark,
                  borderBottom: `2px solid ${active ? COLORS.amber : 'transparent'}`,
                }}
              >
                {p.title}
              </button>
            );
          })}
          {editMode && viewMode === 'day' && (
            addingPage ? (
              <div style={{ display: 'flex', gap: 6, paddingBottom: 8, flex: '1 1 180px' }}>
                <input id="new-page-title" autoFocus placeholder="Tracker name" value={newPageTitle} onChange={(e) => setNewPageTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addPage()} style={inputStyle} />
                <button onClick={addPage} style={addBtnStyle} aria-label="Add tracker"><Plus size={14} /></button>
              </div>
            ) : (
              <button onClick={() => setAddingPage(true)} style={{ background: 'none', border: 'none', color: COLORS.muted, fontFamily: FONT_UI, fontSize: 12.5, padding: '0 0 11px', cursor: 'pointer' }}>
                + Tracker
              </button>
            )
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4, gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.18em', color: COLORS.amber, textTransform: 'uppercase', marginBottom: 6 }}>
              {eyebrow}
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 27, fontWeight: 600, lineHeight: 1.1 }}>
              {title}
            </div>
          </div>
          {viewMode === 'day' && (
            <button
              onClick={() => { setEditMode((v) => !v); setEditing(null); setAddingSection(false); setAddingPage(false); setConfirmRemovePage(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                background: editMode ? COLORS.amber : 'transparent',
                color: editMode ? COLORS.bg : COLORS.muted,
                border: `1px solid ${editMode ? COLORS.amber : COLORS.hairline}`,
                borderRadius: 999, padding: '7px 12px', fontSize: 12,
                fontFamily: FONT_UI, fontWeight: 500, cursor: 'pointer', marginTop: 4,
                transition: 'all 0.15s ease',
              }}
            >
              {editMode ? <Check size={13} /> : <Pencil size={13} />}
              {editMode ? 'Done' : 'Customize'}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 4, marginTop: 18, marginBottom: 16, background: 'rgba(143,160,147,0.08)', padding: 3, borderRadius: 12, width: 'fit-content' }}>
          {['day', 'week', 'month'].map((mode) => (
            <button
              key={mode}
              onClick={() => { setViewMode(mode); setEditMode(false); setEditing(null); }}
              style={{
                padding: '6px 14px', borderRadius: 9, border: 'none', cursor: 'pointer',
                background: viewMode === mode ? COLORS.amber : 'transparent',
                color: viewMode === mode ? COLORS.bg : COLORS.muted,
                fontFamily: FONT_UI, fontSize: 12.5, fontWeight: 500, textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <button onClick={goPrev} style={navBtnStyle} aria-label="Previous">
            <ChevronLeft size={16} color={COLORS.parchment} />
          </button>
          <button onClick={goNext} style={navBtnStyle} disabled={nextDisabled} aria-label="Next">
            <ChevronRight size={16} color={nextDisabled ? COLORS.mutedDark : COLORS.parchment} />
          </button>
          {showJumpToday && (
            <button onClick={() => setCurrentDate(new Date())} style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.amber, background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>
              JUMP TO TODAY
            </button>
          )}
        </div>

        {viewMode === 'day' && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40, marginBottom: 28, borderBottom: `1px solid ${COLORS.hairline}`, paddingBottom: 10 }}>
            {strip.map((d, i) => {
              const ratio = completionRatio(d);
              const isSelected = dateKey(d) === dayKey;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentDate(d)}
                  title={displayDate(d, today)}
                  aria-label={`${displayDate(d, today)}, ${Math.round(ratio * 100)}% done`}
                  style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div style={{
                    width: '100%',
                    height: `${Math.max(ratio * 100, 8)}%`,
                    background: isSelected ? COLORS.amberBright : ratio > 0 ? 'rgba(198,139,62,0.45)' : 'rgba(143,160,147,0.18)',
                    borderRadius: 2,
                    border: isSelected ? `1px solid ${COLORS.amberBright}` : 'none',
                    transition: 'all 0.2s ease',
                  }} />
                </button>
              );
            })}
          </div>
        )}

        {error && (
          <div style={{ fontFamily: FONT_UI, fontSize: 12, color: COLORS.rust, marginBottom: 16 }}>{error}</div>
        )}

        {/* ───────── Day view ───────── */}

        {viewMode === 'day' && page.sections.length === 0 && !editMode && (
          <p style={{ fontFamily: FONT_UI, fontSize: 13.5, color: COLORS.muted, lineHeight: 1.5 }}>
            Nothing here yet. Tap Customize to add a section and your first item.
          </p>
        )}

        {viewMode === 'day' && page.sections.map((section, sIdx) => {
          const due = section.items.filter((it) => !it.paused && !isFlexible(it) && isScheduled(it, currentDate));
          const doneCount = due.filter((it) => isFilled(it, dayEntry[it.id])).length;
          return (
            <div key={section.id} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, paddingLeft: 2 }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', color: COLORS.muted, textTransform: 'uppercase' }}>
                  {section.title}
                </div>
                {editMode ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <button onClick={() => moveSection(sIdx, -1)} disabled={sIdx === 0} style={iconBtnStyle} aria-label={`Move ${section.title} section up`}>
                      <ArrowUp size={13} color={sIdx === 0 ? COLORS.mutedDark : COLORS.muted} />
                    </button>
                    <button onClick={() => moveSection(sIdx, 1)} disabled={sIdx === page.sections.length - 1} style={iconBtnStyle} aria-label={`Move ${section.title} section down`}>
                      <ArrowDown size={13} color={sIdx === page.sections.length - 1 ? COLORS.mutedDark : COLORS.muted} />
                    </button>
                    <button onClick={() => removeSection(section.id)} style={{ ...iconBtnStyle, color: COLORS.rust }} aria-label={`Remove ${section.title} section`}>
                      <X size={13} />
                    </button>
                  </div>
                ) : due.length > 0 && (
                  <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: doneCount === due.length ? COLORS.amber : COLORS.mutedDark, fontVariantNumeric: 'tabular-nums' }}>
                    {doneCount}/{due.length}
                  </div>
                )}
              </div>

              <div style={{ background: COLORS.bgCard, borderRadius: 16, border: `1px solid ${COLORS.hairline}`, overflow: 'hidden' }}>
                {section.items.map((item, idx) => {
                  const isEditingThis = editing && editing.sectionId === section.id && editing.itemId === item.id;
                  const divider = idx < section.items.length - 1 || editMode ? `1px solid ${COLORS.hairline}` : 'none';
                  if (isEditingThis) {
                    return (
                      <div key={item.id} style={{ borderBottom: divider }}>
                        <ItemEditor initial={item} onSave={(it) => saveItem(section.id, it, false)} onCancel={() => setEditing(null)} />
                      </div>
                    );
                  }
                  const badge = badgeFor(item, currentDate);
                  const offDay = !item.paused && !isFlexible(item) && !isScheduled(item, currentDate);
                  const dim = item.paused ? 0.42 : offDay ? 0.55 : 1;
                  return (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '13px 16px', borderBottom: divider }}>
                      <div style={{ minWidth: 0, opacity: editMode ? 1 : dim }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: FONT_UI, fontSize: 14.5, fontWeight: 500 }}>{item.label}</span>
                          {badge && <span style={badgeStyle}>{badge}</span>}
                        </div>
                        {item.note && (
                          <div style={{ fontFamily: FONT_UI, fontSize: 12, color: COLORS.muted, marginTop: 3, lineHeight: 1.35 }}>{item.note}</div>
                        )}
                        {editMode && (
                          <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: COLORS.mutedDark, marginTop: 3 }}>{freqLabel(freqOf(item))}</div>
                        )}
                      </div>
                      <div style={{ opacity: editMode ? 1 : dim }}>
                        {editMode ? renderEditActions(section, item, idx) : renderControl(item)}
                      </div>
                    </div>
                  );
                })}

                {editMode && (
                  editing && editing.sectionId === section.id && editing.itemId === null ? (
                    <ItemEditor initial={null} onSave={(it) => saveItem(section.id, it, true)} onCancel={() => setEditing(null)} />
                  ) : (
                    <button
                      onClick={() => setEditing({ sectionId: section.id, itemId: null })}
                      style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', color: COLORS.amber, fontFamily: FONT_UI, fontSize: 13, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <Plus size={14} /> Add item
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}

        {viewMode === 'day' && editMode && (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {addingSection ? (
              <div style={{ display: 'flex', gap: 6 }}>
                <input id="new-section-title" autoFocus placeholder="Section name" value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSection()} style={inputStyle} />
                <button onClick={addSection} style={addBtnStyle} aria-label="Add section"><Plus size={14} /></button>
              </div>
            ) : (
              <button
                onClick={() => setAddingSection(true)}
                style={{ width: '100%', padding: '12px', borderRadius: 14, border: `1px dashed ${COLORS.hairlineStrong}`, background: 'transparent', color: COLORS.muted, fontFamily: FONT_UI, fontSize: 13, cursor: 'pointer' }}
              >
                + Add section
              </button>
            )}
            {schema.pages.length > 1 && (
              <button
                onClick={() => (confirmRemovePage ? removePage() : setConfirmRemovePage(true))}
                style={{ alignSelf: 'center', background: 'none', border: 'none', color: COLORS.rust, fontFamily: FONT_UI, fontSize: 12, cursor: 'pointer', textDecoration: 'underline', marginTop: 6 }}
              >
                {confirmRemovePage ? `Tap again to delete the ${page.title} tracker` : `Delete the ${page.title} tracker`}
              </button>
            )}
          </div>
        )}

        {/* ───────── Week view ───────── */}

        {viewMode === 'week' && (
          <>
            <div style={{ background: COLORS.bgCard, borderRadius: 16, border: `1px solid ${COLORS.hairline}`, padding: '12px 16px', marginBottom: 22, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {page.sections.map((section) => {
                const { due, done } = sectionWeekStats(section);
                if (!due) return null;
                const pct = Math.round((done / due) * 100);
                return (
                  <div key={section.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 92px 44px', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontFamily: FONT_UI, fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{section.title}</div>
                    <div style={{ height: 5, borderRadius: 3, background: 'rgba(143,160,147,0.16)', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: COLORS.amber, borderRadius: 3 }} />
                    </div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.amber, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{pct}%</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '78px repeat(7,1fr) 36px', gap: 4, marginBottom: 10, paddingLeft: 12, paddingRight: 12 }}>
              <div />
              {weekDays.map((d, i) => {
                const isToday = isSameDay(d, today);
                return (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: isToday ? COLORS.amber : COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {WEEKDAY_NARROW[i]}
                    </div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: isToday ? COLORS.amberBright : COLORS.parchment, fontWeight: isToday ? 600 : 400 }}>
                      {d.getDate()}
                    </div>
                  </div>
                );
              })}
              <div style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 9, color: COLORS.muted, alignSelf: 'end' }}>Σ</div>
            </div>

            {page.sections.map((section) => (
              <div key={section.id} style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.14em', color: COLORS.muted, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 2 }}>
                  {section.title}
                </div>
                <div style={{ background: COLORS.bgCard, borderRadius: 16, border: `1px solid ${COLORS.hairline}`, overflow: 'hidden' }}>
                  {section.items.map((item, idx) => {
                    const f = freqOf(item);
                    const values = weekDays.map((d) => entries[dateKey(d)]?.[item.id]);
                    let sigma;
                    if (item.type === 'number') {
                      const logged = values.filter((v) => isFilled(item, v));
                      sigma = logged.length ? logged.reduce((s, v) => s + (Number(v) || 0), 0) : '–';
                    } else if (f.kind === 'weekly') {
                      sigma = `${values.filter(Boolean).length}/${f.times}`;
                    } else {
                      const scheduled = weekDays.filter((d) => isScheduled(item, d)).length;
                      sigma = item.paused ? '–' : `${values.filter(Boolean).length}/${scheduled}`;
                    }
                    return (
                      <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '78px repeat(7,1fr) 36px', alignItems: 'center', gap: 4, padding: '10px 12px', borderBottom: idx < section.items.length - 1 ? `1px solid ${COLORS.hairline}` : 'none', opacity: item.paused ? 0.45 : 1 }}>
                        <div style={{ fontFamily: FONT_UI, fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.label}>{item.label}</div>
                        {weekDays.map((d, di) => {
                          const v = values[di];
                          const isFuture = d > today;
                          const filled = isFilled(item, v);
                          const scheduled = isScheduled(item, d) && !isFlexible(item);
                          const missed = scheduled && !filled && !isFuture && !isSameDay(d, today) && !isBeforeTracking(d);
                          let mark;
                          if (item.type === 'number') {
                            mark = <span style={{ fontFamily: FONT_MONO, fontSize: 11.5, color: filled ? COLORS.parchment : scheduled ? COLORS.muted : COLORS.mutedDark }}>{filled ? v : scheduled ? '○' : '·'}</span>;
                          } else if (filled) {
                            mark = <div style={{ width: 9, height: 9, borderRadius: '50%', background: COLORS.amber, border: `1.4px solid ${COLORS.amber}` }} />;
                          } else if (scheduled) {
                            mark = <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'transparent', border: `1.4px solid ${missed ? COLORS.rust : COLORS.hairlineStrong}` }} />;
                          } else {
                            mark = <div style={{ width: 3, height: 3, borderRadius: '50%', background: COLORS.mutedDark }} />;
                          }
                          return (
                            <button
                              key={di}
                              onClick={() => { if (!isFuture) { setCurrentDate(d); setViewMode('day'); } }}
                              disabled={isFuture}
                              aria-label={`${item.label}, ${displayDate(d, today)}`}
                              style={{ background: 'transparent', border: 'none', cursor: isFuture ? 'default' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, height: 22, opacity: isFuture ? 0.5 : 1 }}
                            >
                              {mark}
                            </button>
                          );
                        })}
                        <div style={{ fontFamily: FONT_MONO, fontSize: 11, textAlign: 'center', color: COLORS.amber, fontVariantNumeric: 'tabular-nums' }}>{sigma}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontFamily: FONT_UI, fontSize: 11.5, color: COLORS.muted, paddingLeft: 2 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: COLORS.amber }} /> done</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: '50%', border: `1.4px solid ${COLORS.hairlineStrong}` }} /> scheduled</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: '50%', border: `1.4px solid ${COLORS.rust}` }} /> missed</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 3, height: 3, borderRadius: '50%', background: COLORS.mutedDark }} /> off day</span>
            </div>
          </>
        )}

        {/* ───────── Month view ───────── */}

        {viewMode === 'month' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 6 }}>
              {WEEKDAY_NARROW.map((l, i) => (
                <div key={i} style={{ textAlign: 'center', fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: '0.05em' }}>{l}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
              {monthWeeks.flatMap((week, wi) => week.map((d, di) => {
                const ratio = completionRatio(d);
                const inMonth = isSameMonth(d, currentDate);
                const isToday = isSameDay(d, today);
                const isFuture = d > today;
                return (
                  <button
                    key={`${wi}-${di}`}
                    onClick={() => { if (!isFuture) { setCurrentDate(d); setViewMode('day'); } }}
                    disabled={isFuture}
                    aria-label={`${displayDate(d, today)}, ${Math.round(ratio * 100)}% done`}
                    style={{
                      aspectRatio: '1', borderRadius: 9,
                      border: isToday ? `1.5px solid ${COLORS.amberBright}` : `1px solid ${COLORS.hairline}`,
                      background: ratio > 0 ? `rgba(198,139,62,${0.12 + ratio * 0.55})` : 'transparent',
                      opacity: inMonth ? 1 : 0.35,
                      cursor: isFuture ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 5,
                    }}
                  >
                    <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: inMonth ? COLORS.parchment : COLORS.mutedDark }}>{d.getDate()}</span>
                  </button>
                );
              }))}
            </div>
          </div>
        )}

        {/* ───────── Backup & restore ───────── */}

        <div style={{ marginTop: 36, borderTop: `1px solid ${COLORS.hairline}`, paddingTop: 16 }}>
          <button
            onClick={() => { setShowBackup((v) => !v); setBackupMsg(''); setRestoreArmed(false); }}
            aria-expanded={showBackup}
            style={{ background: 'none', border: 'none', color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', padding: 0 }}
          >
            {showBackup ? '− Backup & restore' : '+ Backup & restore'}
          </button>

          {showBackup && (
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontFamily: FONT_UI, fontSize: 12.5, color: COLORS.muted, lineHeight: 1.5 }}>
                Your data is saved only where you use the app. To move it, copy a backup here and paste it into Restore on the other side.
              </p>

              <button onClick={copyBackup} style={{ ...textBtnStyle, alignSelf: 'flex-start', background: COLORS.amber, color: COLORS.bg, border: `1px solid ${COLORS.amber}`, fontWeight: 600 }}>
                Copy backup
              </button>
              {backupText && (
                <textarea
                  id="backup-out"
                  readOnly
                  value={backupText}
                  onFocus={(e) => e.target.select()}
                  rows={3}
                  style={{ ...inputStyle, fontFamily: FONT_MONO, fontSize: 11, resize: 'vertical' }}
                />
              )}

              <textarea
                id="backup-in"
                placeholder="Paste a backup here to restore it"
                value={restoreText}
                onChange={(e) => { setRestoreText(e.target.value); setRestoreArmed(false); }}
                rows={3}
                style={{ ...inputStyle, fontFamily: FONT_MONO, fontSize: 11, resize: 'vertical' }}
              />
              <button
                onClick={restoreBackup}
                disabled={!restoreText.trim()}
                style={{ ...textBtnStyle, alignSelf: 'flex-start', color: restoreArmed ? COLORS.bg : COLORS.parchment, background: restoreArmed ? COLORS.rust : 'transparent', border: `1px solid ${restoreArmed ? COLORS.rust : COLORS.hairlineStrong}`, opacity: restoreText.trim() ? 1 : 0.5 }}
              >
                {restoreArmed ? 'Tap again to replace data' : 'Restore'}
              </button>

              {backupMsg && (
                <div role="status" style={{ fontFamily: FONT_UI, fontSize: 12.5, color: restoreArmed ? COLORS.rust : COLORS.amber, lineHeight: 1.45 }}>{backupMsg}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
