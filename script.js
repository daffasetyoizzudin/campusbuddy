/* ═══════════════════════════════════════════════════════════════
   CampusBuddy — Main Script
   ⚠️  DEMO ONLY: Auth, data & access-control are frontend simulation.
       For production: replace with real backend API & server-side auth.
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   DEMO ACCOUNTS
───────────────────────────────────────────────────────────── */
const DEMO_ACCOUNTS = [
  { id:'u1', email:'baru@demo.id',   password:'demo123', role:'mentee', name:'Rina Salsabila',   nim:'20240001', prodi:'Sistem Informasi',   angkatan:2024, minat:['Desain','Teknologi','Musik'], avatar:'RS', assignedBuddyId:'b1' },
  { id:'u2', email:'buddy@demo.id',  password:'demo123', role:'buddy',  name:'Ahmad Fauzi',       nim:'20210045', prodi:'Sistem Informasi',   angkatan:2021, minat:['Teknologi','Olahraga','Programming'], avatar:'AF', capacity:5, assignedMentees:['u1','u7'] },
  { id:'u3', email:'admin@demo.id',  password:'demo123', role:'admin',  name:'Dr. Siti Rahayu',  nim:'STAFF001',  prodi:'Staff Akademik',     angkatan:0,    minat:[], avatar:'SR' },
];

/* ─────────────────────────────────────────────────────────────
   INITIAL DEMO DATA
───────────────────────────────────────────────────────────── */
const INITIAL_DATA = {
  buddies: [
    { id:'b1', userId:'u2', name:'Ahmad Fauzi',     prodi:'Sistem Informasi',  angkatan:2021, minat:['Teknologi','Olahraga','Programming'], skills:['Web Dev','Database','UI/UX'], capacity:5, currentLoad:2, bio:'Hai! Aku siap bantu kamu adaptasi di kampus. Jangan ragu tanya apapun!', avatar:'AF', rating:4.8 },
    { id:'b2', userId:'b2u', name:'Dewi Kusuma',    prodi:'Teknik Informatika', angkatan:2022, minat:['Desain','Musik','Seni'],             skills:['Figma','React','Python'],    capacity:4, currentLoad:1, bio:'Suka desain & coding. Yuk eksplorasi kampus bareng!', avatar:'DK', rating:4.6 },
    { id:'b3', userId:'b3u', name:'Rizky Pratama',  prodi:'Manajemen',          angkatan:2021, minat:['Bisnis','Organisasi','Traveling'],   skills:['Leadership','Excel','Public Speaking'], capacity:6, currentLoad:3, bio:'Aktif di BEM dan UKM Debat. Siap bantu urusan organisasi!', avatar:'RP', rating:4.7 },
    { id:'b4', userId:'b4u', name:'Sari Indah',     prodi:'Akuntansi',          angkatan:2022, minat:['Keuangan','Musik','Olahraga'],       skills:['Accounting','Excel','Finance'], capacity:4, currentLoad:0, bio:'Gabung UKM seni bareng aku, yuk!', avatar:'SI', rating:4.5 },
    { id:'b5', userId:'b5u', name:'Budi Santoso',   prodi:'Ilmu Komunikasi',    angkatan:2021, minat:['Jurnalistik','Fotografi','Film'],    skills:['Copywriting','Photography','Video'], capacity:5, currentLoad:2, bio:'Content creator kampus, bisa bantu urusan media & komunikasi.', avatar:'BS', rating:4.9 },
    { id:'b6', userId:'b6u', name:'Maya Putri',     prodi:'Psikologi',          angkatan:2022, minat:['Kesehatan Mental','Seni','Traveling'],skills:['Konseling','Research','Writing'], capacity:4, currentLoad:1, bio:'Kalau ada masalah personal, aku siap dengerin & bantu cari solusi.', avatar:'MP', rating:4.7 },
  ],

  mentees: [
    { id:'u1', name:'Rina Salsabila', prodi:'Sistem Informasi',  angkatan:2024, minat:['Desain','Teknologi','Musik'],       assignedBuddyId:'b1', nim:'20240001' },
    { id:'u7', name:'Bima Arjuna',    prodi:'Sistem Informasi',  angkatan:2024, minat:['Programming','Gaming','Teknologi'], assignedBuddyId:'b1', nim:'20240002' },
    { id:'u8', name:'Laila Nurdin',   prodi:'Teknik Informatika', angkatan:2024, minat:['Desain','Seni','Musik'],            assignedBuddyId:'b2', nim:'20240003' },
    { id:'u9', name:'Doni Wijaya',    prodi:'Manajemen',          angkatan:2024, minat:['Bisnis','Olahraga'],                assignedBuddyId:'b3', nim:'20240004' },
  ],

  matchRequests: [
    { id:'mr1', menteeId:'u1', buddyId:'b1', status:'accepted', createdAt:'2024-08-10', reason:'Sama-sama Sistem Informasi + minat Teknologi' },
    { id:'mr2', menteeId:'u7', buddyId:'b1', status:'accepted', createdAt:'2024-08-11', reason:'Sama-sama Sistem Informasi + minat Programming' },
  ],

  checklist: [
    { id:'ck1', title:'Daftar ulang & bayar UKT',       desc:'Selesaikan pembayaran Uang Kuliah Tunggal melalui bank yang ditunjuk.',              category:'Administrasi', status:'completed' },
    { id:'ck2', title:'Aktivasi email kampus',           desc:'Aktifkan akun email resmi kampus untuk keperluan akademik.',                         category:'Administrasi', status:'completed' },
    { id:'ck3', title:'Isi KRS semester pertama',        desc:'Input mata kuliah semester 1 melalui portal akademik sesuai arahan dosen wali.',     category:'Akademik',     status:'completed' },
    { id:'ck4', title:'Kenali dosen wali',               desc:'Catat nama, ruangan, dan jadwal konsultasi dosen wali Anda.',                        category:'Akademik',     status:'active' },
    { id:'ck5', title:'Kunjungi perpustakaan',           desc:'Daftarkan diri sebagai anggota perpustakaan dan kenali koleksi yang tersedia.',      category:'Fasilitas',    status:'active' },
    { id:'ck6', title:'Bergabung grup WhatsApp angkatan', desc:'Bergabung dengan grup komunikasi resmi angkatan dan program studi.',               category:'Sosial',       status:'completed' },
    { id:'ck7', title:'Ikut kegiatan ospek/PKKMB',       desc:'Ikuti semua rangkaian kegiatan pengenalan kampus (PKKMB) dengan aktif.',            category:'Sosial',       status:'completed' },
    { id:'ck8', title:'Kenali fasilitas kampus',         desc:'Kunjungi laboratorium, kantin, tempat ibadah, dan gedung-gedung utama.',            category:'Fasilitas',    status:'active' },
    { id:'ck9', title:'Daftar UKM / organisasi',         desc:'Pilih dan daftar minimal satu unit kegiatan mahasiswa (UKM) sesuai minat.',         category:'Organisasi',   status:'active' },
    { id:'ck10',title:'Pertemuan perdana dengan Buddy',  desc:'Jadwalkan dan laksanakan sesi perkenalan dengan Buddy yang telah ditugaskan.',      category:'Pendampingan', status:'completed' },
  ],

  facilities: [
    { id:'f1',  name:'Perpustakaan Pusat',       category:'Perpustakaan',   desc:'Koleksi 50.000+ buku, ruang baca AC, akses jurnal internasional.', loc:'Gedung A, Lantai 1-2', hours:'07:00–20:00',  img:'📚' },
    { id:'f2',  name:'Lab Komputer SI',           category:'Laboratorium',   desc:'60 unit PC spesifikasi tinggi untuk praktikum mahasiswa SI.',        loc:'Gedung B, Lantai 3',   hours:'08:00–17:00',  img:'🖥️' },
    { id:'f3',  name:'Masjid Al-Hikmah',          category:'Ibadah',         desc:'Masjid kampus berkapasitas 500 jamaah, dilengkapi tempat wudhu.',    loc:'Area Tengah Kampus',   hours:'24 jam',       img:'🕌' },
    { id:'f4',  name:'Kantin Mahasiswa',          category:'Kantin',         desc:'30+ tenant makanan dan minuman dengan harga terjangkau.',            loc:'Gedung C, Lantai 1',   hours:'07:00–21:00',  img:'🍽️' },
    { id:'f5',  name:'Pusat Administrasi (BAA)',  category:'Administrasi',   desc:'Layanan KRS, surat-menyurat, legalisir, dan informasi akademik.',    loc:'Gedung Rektorat, Lt 1',hours:'08:00–15:00',  img:'🏢' },
    { id:'f6',  name:'Klinik Kesehatan',          category:'Kesehatan',      desc:'Layanan kesehatan gratis untuk mahasiswa aktif.',                    loc:'Gedung D, Lantai 1',   hours:'08:00–16:00',  img:'🏥' },
    { id:'f7',  name:'Lapangan Olahraga',         category:'Olahraga',       desc:'Lapangan basket, futsal, badminton, dan area jogging.',              loc:'Area Barat Kampus',    hours:'06:00–21:00',  img:'⚽' },
    { id:'f8',  name:'Ruang Kuliah Gedung E',     category:'Ruang Kuliah',   desc:'20 ruang kelas ber-AC kapasitas 30-60 mahasiswa.',                   loc:'Gedung E, Lantai 1-4', hours:'07:00–20:00',  img:'📖' },
    { id:'f9',  name:'Aula Utama',                category:'Ruang Kuliah',   desc:'Aula serbaguna kapasitas 1000 orang untuk acara besar.',             loc:'Gedung F, Lantai 1',   hours:'07:00–22:00',  img:'🎭' },
    { id:'f10', name:'Galeri ATM & Bank',         category:'Administrasi',   desc:'ATM berbagai bank dan konter pembayaran kampus.',                    loc:'Gedung Rektorat, Lt G', hours:'06:00–22:00', img:'🏦' },
  ],

  academicGuides: [
    { id:'ag1', title:'Cara Mengisi KRS',      category:'Akademik', content:'KRS (Kartu Rencana Studi) diisi setiap awal semester melalui portal akademik. Konsultasikan pilihan mata kuliah dengan dosen wali. Batas SKS per semester umumnya 24 SKS (tergantung IPK semester sebelumnya).' },
    { id:'ag2', title:'Memahami KHS & IPK',    category:'Akademik', content:'KHS (Kartu Hasil Studi) adalah rekap nilai per semester. IPK dihitung dari total bobot nilai × SKS dibagi total SKS lulus. Pertahankan IPK minimal 2.75 untuk menghindari peringatan akademik.' },
    { id:'ag3', title:'Dosen Wali & Konseling', category:'Akademik', content:'Setiap mahasiswa memiliki dosen wali. Jadwal konsultasi tertera di portal. Gunakan bimbingan minimal 2× per semester untuk evaluasi perkembangan akademik dan perencanaan studi.' },
    { id:'ag4', title:'Kalender Akademik',      category:'Administrasi', content:'Kalender akademik diterbitkan awal tahun ajaran. Catat tanggal penting: UTS, UAS, pengisian KRS, libur nasional, dan wisuda. Tersedia di portal dan papan pengumuman BAA.' },
    { id:'ag5', title:'Administrasi Surat',     category:'Administrasi', content:'Surat aktif kuliah, dispensasi, keterangan mahasiswa dapat diajukan ke BAA dengan membawa KTM. Proses 1–3 hari kerja. Surat elektronik tersedia di portal akademik.' },
    { id:'ag6', title:'Panduan UKM & Organisasi', category:'Organisasi', content:'Terdapat 40+ UKM aktif di kampus. Pendaftaran dibuka awal semester. Aktif di organisasi meningkatkan soft skill dan jaringan. Izin kegiatan UKM perlu diajukan ke Kemahasiswaan.' },
    { id:'ag7', title:'Beasiswa & Bantuan',     category:'Keuangan',  content:'Tersedia beasiswa PPA, BBP-PPA, beasiswa prestasi, dan beasiswa yayasan. Pengumuman melalui portal dan email kampus. Siapkan KHS terbaru dan dokumen pendukung tepat waktu.' },
    { id:'ag8', title:'Sistem Nilai & Predikat', category:'Akademik', content:'A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, D=1.0, E=0. Lulus dengan predikat: Memuaskan (IPK≥2.75), Sangat Memuaskan (IPK≥3.25), Cumlaude (IPK≥3.75, lulus tepat waktu).' },
  ],

  forumPosts: [
    { id:'fp1', title:'Bagaimana cara akses jurnal internasional dari kampus?', body:'Aku mau cari referensi tugas, tapi bingung cara akses Scopus & IEEE dari luar kampus. Ada yang tahu cara VPN kampus?', category:'Akademik', authorId:'u1', authorName:'Rina Salsabila', authorAvatar:'RS', createdAt:'2024-08-15T10:30:00', answers:[
        { id:'a1', body:'Bisa pakai VPN kampus yang bisa diunduh di portal IT. Login pakai NIM dan password portal akademik.', authorId:'u2', authorName:'Ahmad Fauzi', authorAvatar:'AF', createdAt:'2024-08-15T11:00:00' },
        { id:'a2', body:'Atau langsung ke perpustakaan, mereka punya akses langsung ke database jurnal. Tanya petugasnya ya!', authorId:'b3u', authorName:'Rizky Pratama', authorAvatar:'RP', createdAt:'2024-08-15T13:00:00' },
    ]},
    { id:'fp2', title:'Kantin mana yang paling enak dan murah?', body:'Halo semuanya! Minta rekomendasi kantin atau warteg sekitar kampus yang enak dan harga mahasiswa. Terima kasih!', category:'Fasilitas', authorId:'u7', authorName:'Bima Arjuna', authorAvatar:'BA', createdAt:'2024-08-16T08:00:00', answers:[
        { id:'a3', body:'Kantin Gedung C tenant nomer 12 (Bu Sari) paling enak, nasi rames lengkap cuma 12rb!', authorId:'u1', authorName:'Rina Salsabila', authorAvatar:'RS', createdAt:'2024-08-16T09:00:00' },
    ]},
    { id:'fp3', title:'Tips manajemen waktu untuk mahasiswa baru?', body:'Semester pertama rasanya overwhelming banget. Ada tips manage waktu antara kuliah, organisasi, dan kehidupan sosial?', category:'Kehidupan Kampus', authorId:'u8', authorName:'Laila Nurdin', authorAvatar:'LN', createdAt:'2024-08-17T14:00:00', answers:[] },
  ],

  meetings: [
    { id:'m1', menteeId:'u1', buddyId:'b1', menteeName:'Rina Salsabila', buddyName:'Ahmad Fauzi', topic:'Perkenalan & Orientasi Kampus', date:'2024-08-20', time:'14:00', method:'offline', location:'Perpustakaan Pusat, Meja 5', status:'completed', notes:'Sesi perkenalan berjalan lancar.' },
    { id:'m2', menteeId:'u1', buddyId:'b1', menteeName:'Rina Salsabila', buddyName:'Ahmad Fauzi', topic:'Cara Mengisi KRS', date:'2024-09-05', time:'15:00', method:'online',  location:'https://meet.google.com/abc-def-ghi', status:'confirmed', notes:'' },
    { id:'m3', menteeId:'u7', buddyId:'b1', menteeName:'Bima Arjuna',    buddyName:'Ahmad Fauzi', topic:'Diskusi Pemilihan UKM', date:'2024-09-10', time:'13:00', method:'offline', location:'Kantin Gedung C', status:'pending', notes:'' },
  ],

  reports: [
    { id:'rp1', menteeId:'u1', menteeName:'Rina Salsabila', title:'Kesulitan Memahami Materi Algoritma', category:'Akademik', desc:'Saya kesulitan mengikuti kecepatan materi di kelas Algoritma. Dosen menjelaskan terlalu cepat dan tidak ada waktu bertanya.', priority:'medium', status:'in_progress', createdAt:'2024-08-22', adminNote:'Sudah diteruskan ke koordinator mata kuliah untuk evaluasi.', updatedAt:'2024-08-24' },
    { id:'rp2', menteeId:'u7', menteeName:'Bima Arjuna',    title:'AC Rusak di Lab Komputer',          category:'Fasilitas',  desc:'AC di Lab Komputer SI Gedung B sudah tidak berfungsi sejak 2 minggu lalu, sangat panas.', priority:'high',   status:'resolved', createdAt:'2024-08-18', adminNote:'Tim fasilitas sudah memperbaiki AC pada 25 Agustus.',   updatedAt:'2024-08-25' },
  ],

  notifications: [
    { id:'n1', userId:'u1', msg:'Buddy Anda, Ahmad Fauzi, mengkonfirmasi jadwal pertemuan.', read:false, time:'10 menit lalu' },
    { id:'n2', userId:'u1', msg:'Laporan Anda "Kesulitan Algoritma" sedang ditindaklanjuti.', read:false, time:'2 jam lalu' },
    { id:'n3', userId:'u2', msg:'Mahasiswa baru Bima Arjuna mengajukan jadwal pertemuan.', read:false, time:'30 menit lalu' },
  ],
};

/* ─────────────────────────────────────────────────────────────
   STATE MANAGEMENT
   All runtime state lives here; never mutate INITIAL_DATA directly.
───────────────────────────────────────────────────────────── */
let state = {
  currentUser: null,
  currentPage: 'dashboard',
  data: null,          // loaded from localStorage or INITIAL_DATA
};

/* ─────────────────────────────────────────────────────────────
   LOCAL STORAGE HELPERS
───────────────────────────────────────────────────────────── */
const LS_KEY = 'campusbuddy_data';

function loadData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) { state.data = JSON.parse(raw); return; }
  } catch(e) { /* corrupt data — fall through */ }
  state.data = JSON.parse(JSON.stringify(INITIAL_DATA)); // deep clone
  saveData();
}

function saveData() {
  localStorage.setItem(LS_KEY, JSON.stringify(state.data));
}

function resetData() {
  showConfirm('Reset Data Demo?', 'Semua perubahan akan dikembalikan ke data awal.', () => {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem('campusbuddy_session');
    location.reload();
  }, 'Reset', 'bg-accent-500 hover:bg-accent-600');
}

/* ─────────────────────────────────────────────────────────────
   AUTH HELPERS
───────────────────────────────────────────────────────────── */
function fillDemo(role) {
  const map = { mentee:'baru@demo.id', buddy:'buddy@demo.id', admin:'admin@demo.id' };
  document.getElementById('login-email').value = map[role];
  document.getElementById('login-password').value = 'demo123';
}

function togglePassword(id) {
  const el = document.getElementById(id);
  el.type = el.type === 'password' ? 'text' : 'password';
}

function showRegister() {
  document.getElementById('login-form-container').classList.add('hidden');
  document.getElementById('register-form-container').classList.remove('hidden');
}
function showLogin() {
  document.getElementById('register-form-container').classList.add('hidden');
  document.getElementById('login-form-container').classList.remove('hidden');
}

function logout() {
  state.currentUser = null;
  localStorage.removeItem('campusbuddy_session');
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('hidden');
  showToast('Anda telah keluar.', 'info');
}

function initSession() {
  const saved = localStorage.getItem('campusbuddy_session');
  if (saved) {
    try {
      const user = JSON.parse(saved);
      // re-verify user still exists in DEMO_ACCOUNTS
      const found = DEMO_ACCOUNTS.find(a => a.id === user.id);
      if (found) { state.currentUser = found; bootApp(); return; }
    } catch(e) {}
  }
  // show auth
  document.getElementById('auth-screen').classList.remove('hidden');
}

/* ─────────────────────────────────────────────────────────────
   BOOT APP
───────────────────────────────────────────────────────────── */
function bootApp() {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');
  buildSidebar();
  updateHeaderUser();
  navigate('dashboard');
}

/* ─────────────────────────────────────────────────────────────
   NAVIGATION MENU CONFIG
───────────────────────────────────────────────────────────── */
const NAV_CONFIG = {
  mentee: [
    { id:'dashboard',  label:'Dashboard',            icon:'home' },
    { id:'buddy',      label:'Find a Buddy',          icon:'users' },
    { id:'campus',     label:'Campus Guide',          icon:'map' },
    { id:'academic',   label:'Academic Guide',        icon:'book' },
    { id:'forum',      label:'Q&A Forum',             icon:'chat' },
    { id:'schedule',   label:'Meeting Schedule',      icon:'calendar' },
    { id:'support',    label:'Adaptation Support',    icon:'flag' },
    { id:'profile',    label:'Profile',               icon:'user' },
  ],
  buddy: [
    { id:'dashboard',  label:'Dashboard',            icon:'home' },
    { id:'mentees',    label:'My Mentees',            icon:'users' },
    { id:'campus',     label:'Campus Guide',          icon:'map' },
    { id:'forum',      label:'Q&A Forum',             icon:'chat' },
    { id:'schedule',   label:'Meeting Schedule',      icon:'calendar' },
    { id:'profile',    label:'Profile',               icon:'user' },
  ],
  admin: [
    { id:'dashboard',  label:'Dashboard',            icon:'home' },
    { id:'admin_users',label:'Kelola Pengguna',       icon:'users' },
    { id:'admin_buddy',label:'Buddy Assignment',      icon:'link' },
    { id:'admin_facility',label:'Fasilitas',          icon:'map' },
    { id:'admin_reports',label:'Laporan Kendala',     icon:'flag' },
    { id:'profile',    label:'Profile',               icon:'user' },
  ],
};

const ICON_SVG = {
  home:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  users:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  map:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  book:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
  chat:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  flag:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  user:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  link:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>',
};

function buildSidebar() {
  const role = state.currentUser.role;
  const items = NAV_CONFIG[role] || [];
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = items.map(item => `
    <button class="nav-item w-full text-left" data-page="${item.id}" onclick="navigate('${item.id}')">
      ${ICON_SVG[item.icon] || ''}
      <span>${item.label}</span>
    </button>`).join('');
}

function updateHeaderUser() {
  const u = state.currentUser;
  document.getElementById('sidebar-avatar').textContent = u.avatar;
  document.getElementById('sidebar-name').textContent = u.name;
  document.getElementById('header-avatar').textContent = u.avatar;
  const roleLabel = { mentee:'Mahasiswa Baru', buddy:'Buddy', admin:'Admin' };
  const roleColor = { mentee:'text-primary-300', buddy:'text-green-300', admin:'text-accent-300' };
  document.getElementById('sidebar-role-badge').innerHTML = `<span class="${roleColor[u.role]||'text-primary-300'}">${roleLabel[u.role]||u.role}</span>`;
  // notification badge
  const unread = state.data.notifications.filter(n => n.userId === u.id && !n.read).length;
  const badge = document.getElementById('notif-badge');
  badge.classList.toggle('hidden', unread === 0);
}

function setActiveNav(page) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
}

function navigate(page) {
  state.currentPage = page;
  setActiveNav(page);
  closeSidebar();
  const titles = {
    dashboard:'Dashboard', buddy:'Find a Buddy', campus:'Campus Guide',
    academic:'Academic Guide', forum:'Q&A Forum', schedule:'Meeting Schedule',
    support:'Adaptation Support', profile:'Profile', mentees:'My Mentees',
    admin_users:'Kelola Pengguna', admin_buddy:'Buddy Assignment',
    admin_facility:'Kelola Fasilitas', admin_reports:'Laporan Kendala',
    notifications:'Notifikasi',
  };
  document.getElementById('page-title').textContent = titles[page] || page;
  renderPage(page);
}

function openSidebar()  { document.getElementById('sidebar').classList.remove('-translate-x-full'); document.getElementById('sidebar-overlay').classList.remove('hidden'); }
function closeSidebar() { document.getElementById('sidebar').classList.add('-translate-x-full');    document.getElementById('sidebar-overlay').classList.add('hidden'); }

/* ─────────────────────────────────────────────────────────────
   PAGE ROUTER
───────────────────────────────────────────────────────────── */
function renderPage(page) {
  const main = document.getElementById('main-content');
  main.innerHTML = `<div class="page-enter">${getPageHTML(page)}</div>`;
  attachPageListeners(page);
}

function getPageHTML(page) {
  const role = state.currentUser.role;
  const pages = {
    dashboard: role === 'admin' ? adminDashboardHTML() : role === 'buddy' ? buddyDashboardHTML() : menteeDashboardHTML(),
    buddy: buddyFinderHTML(),
    campus: campusGuideHTML(),
    academic: academicGuideHTML(),
    forum: forumHTML(),
    schedule: scheduleHTML(),
    support: supportHTML(),
    profile: profileHTML(),
    mentees: buddyMenteesHTML(),
    admin_users: adminUsersHTML(),
    admin_buddy: adminBuddyHTML(),
    admin_facility: adminFacilityHTML(),
    admin_reports: adminReportsHTML(),
    notifications: notificationsHTML(),
  };
  return pages[page] || `<div class="empty-state"><p>Halaman tidak ditemukan.</p></div>`;
}

/* ─────────────────────────────────────────────────────────────
   ── HELPER: Avatar circle
───────────────────────────────────────────────────────────── */
function avatarCircle(initials, color='bg-primary-600', size='w-12 h-12', textSize='text-sm') {
  return `<div class="${size} ${color} rounded-full flex items-center justify-center text-white font-bold ${textSize} flex-shrink-0">${initials}</div>`;
}

/* ─────────────────────────────────────────────────────────────
   ── STATUS BADGE HELPER
───────────────────────────────────────────────────────────── */
function statusBadge(status) {
  const map = {
    pending:     ['badge-yellow',  'Pending'],
    accepted:    ['badge-green',   'Accepted'],
    rejected:    ['badge-red',     'Rejected'],
    confirmed:   ['badge-green',   'Confirmed'],
    completed:   ['badge-gray',    'Completed'],
    cancelled:   ['badge-red',     'Cancelled'],
    submitted:   ['badge-blue',    'Submitted'],
    in_progress: ['badge-orange',  'In Progress'],
    resolved:    ['badge-green',   'Resolved'],
    closed:      ['badge-gray',    'Closed'],
    active:      ['badge-blue',    'Active'],
    online:      ['badge-green',   'Online'],
    offline:     ['badge-purple',  'Offline'],
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return `<span class="badge ${cls}">${label}</span>`;
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: MENTEE DASHBOARD
───────────────────────────────────────────────────────────── */
function menteeDashboardHTML() {
  const u = state.currentUser;
  const buddy = state.data.buddies.find(b => b.id === u.assignedBuddyId);
  const totalCk = state.data.checklist.length;
  const doneCk  = state.data.checklist.filter(c => c.status === 'completed').length;
  const pct     = Math.round(doneCk / totalCk * 100);
  const nextMtg = state.data.meetings.find(m => m.menteeId === u.id && (m.status === 'confirmed' || m.status === 'pending'));

  return `
  <div class="space-y-6">
    <!-- Welcome -->
    <div class="cb-card p-6 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex-1">
          <p class="text-primary-200 text-sm">Selamat datang kembali 👋</p>
          <h2 class="text-2xl font-bold mt-1">${u.name}</h2>
          <p class="text-primary-200 text-sm mt-1">${u.prodi} · NIM ${u.nim}</p>
        </div>
        <div class="flex gap-3 flex-wrap">
          <button onclick="navigate('buddy')" class="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition">🔍 Cari Buddy</button>
          <button onclick="navigate('academic')" class="bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition">📋 Checklist</button>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      ${statCardHTML('Progres Adaptasi', pct+'%', 'bg-primary-600', '📊')}
      ${statCardHTML('Checklist Selesai', `${doneCk}/${totalCk}`, 'bg-green-600', '✅')}
      ${statCardHTML('Pertemuan', state.data.meetings.filter(m=>m.menteeId===u.id).length, 'bg-accent-500', '📅')}
      ${statCardHTML('Laporan', state.data.reports.filter(r=>r.menteeId===u.id).length, 'bg-purple-600', '🚩')}
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Buddy info -->
      <div class="lg:col-span-1 cb-card p-5">
        <div class="section-header"><span class="section-title">Buddy Saya</span></div>
        ${buddy ? `
          <div class="flex items-start gap-4">
            ${avatarCircle(buddy.avatar,'bg-primary-600','w-14 h-14','text-base')}
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-gray-900">${buddy.name}</div>
              <div class="text-xs text-gray-500">${buddy.prodi} · Angkatan ${buddy.angkatan}</div>
              <div class="flex flex-wrap gap-1 mt-2">${buddy.minat.slice(0,3).map(m=>`<span class="badge badge-blue text-xs">${m}</span>`).join('')}</div>
              <p class="text-xs text-gray-500 mt-2 truncate-2">${buddy.bio}</p>
              <div class="flex gap-2 mt-3">
                <button onclick="showBuddyDetail('${buddy.id}')" class="bg-primary-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-primary-700 transition">Lihat Profil</button>
                <button onclick="navigate('schedule')" class="border border-gray-300 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">Jadwal</button>
              </div>
            </div>
          </div>
        ` : `
          <div class="empty-state py-8">
            ${avatarCircle('?','bg-gray-200 text-gray-400','w-12 h-12','text-xl')}
            <p class="mt-3 text-sm">Belum ada buddy yang ditugaskan.</p>
            <button onclick="navigate('buddy')" class="mt-3 bg-primary-600 text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-primary-700 transition">Cari Buddy Sekarang</button>
          </div>`}
      </div>

      <!-- Progress + next meeting -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Adaptation progress -->
        <div class="cb-card p-5">
          <div class="section-header"><span class="section-title">Progress Adaptasi</span><button onclick="navigate('academic')" class="text-xs text-primary-600 font-medium hover:underline">Lihat semua</button></div>
          <div class="flex items-center gap-4 mb-3">
            <div class="flex-1">
              <div class="progress-bar"><div class="progress-fill bg-primary-600" style="width:${pct}%"></div></div>
            </div>
            <span class="text-sm font-bold text-primary-600">${pct}%</span>
          </div>
          <div class="space-y-2">
            ${state.data.checklist.slice(0,5).map(c=>`
              <div class="flex items-center gap-3 py-1">
                <button onclick="toggleChecklist('${c.id}')" class="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition ${c.status==='completed'?'bg-green-500 border-green-500':'border-gray-300 hover:border-primary-400'}">
                  ${c.status==='completed'?'<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}
                </button>
                <span class="text-sm ${c.status==='completed'?'line-through text-gray-400':'text-gray-700'}">${c.title}</span>
                <span class="badge badge-gray ml-auto text-xs">${c.category}</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- Next meeting -->
        <div class="cb-card p-5">
          <div class="section-header"><span class="section-title">Jadwal Terdekat</span><button onclick="navigate('schedule')" class="text-xs text-primary-600 font-medium hover:underline">Semua jadwal</button></div>
          ${nextMtg ? `
            <div class="flex items-center gap-4 p-3 bg-primary-50 rounded-xl border border-primary-200">
              <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 text-sm truncate">${nextMtg.topic}</p>
                <p class="text-xs text-gray-500">${formatDate(nextMtg.date)} · ${nextMtg.time} · ${nextMtg.method==='online'?'Online':'Offline'}</p>
              </div>
              ${statusBadge(nextMtg.status)}
            </div>` : `
            <div class="empty-state py-6">
              <p class="text-sm">Belum ada jadwal mendatang.</p>
              <button onclick="navigate('schedule')" class="mt-2 text-primary-600 text-xs font-medium hover:underline">Buat jadwal pertemuan</button>
            </div>`}
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="cb-card p-5">
      <p class="section-title mb-4">Akses Cepat</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${quickActionHTML('🔍','Cari Buddy','buddy')}
        ${quickActionHTML('🗺️','Peta Kampus','campus')}
        ${quickActionHTML('💬','Forum Q&A','forum')}
        ${quickActionHTML('🚩','Laporkan Kendala','support')}
      </div>
    </div>
  </div>`;
}

function statCardHTML(label, value, color, icon) {
  return `<div class="cb-card stat-card p-5 ${color} text-white">
    <div class="text-2xl mb-1">${icon}</div>
    <div class="text-2xl font-bold">${value}</div>
    <div class="text-sm opacity-80 mt-1">${label}</div>
  </div>`;
}

function quickActionHTML(icon, label, page) {
  return `<button onclick="navigate('${page}')" class="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl transition group">
    <span class="text-2xl">${icon}</span>
    <span class="text-xs font-medium text-gray-600 group-hover:text-primary-700">${label}</span>
  </button>`;
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: BUDDY DASHBOARD
───────────────────────────────────────────────────────────── */
function buddyDashboardHTML() {
  const u = state.currentUser;
  const buddyProfile = state.data.buddies.find(b => b.userId === u.id);
  const myMentees = state.data.mentees.filter(m => m.assignedBuddyId === (buddyProfile ? buddyProfile.id : ''));
  const myMeetings = state.data.meetings.filter(m => m.buddyId === (buddyProfile ? buddyProfile.id : ''));
  const upcoming = myMeetings.filter(m => m.status === 'confirmed' || m.status === 'pending');

  return `
  <div class="space-y-6">
    <div class="cb-card p-6 bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex-1">
          <p class="text-green-200 text-sm">Halo, Buddy! 🎓</p>
          <h2 class="text-2xl font-bold mt-1">${u.name}</h2>
          <p class="text-green-200 text-sm mt-1">${u.prodi} · Angkatan ${u.angkatan}</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold">${myMentees.length}</div>
          <div class="text-green-200 text-sm">Mentee Aktif</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      ${statCardHTML('Total Mentee', myMentees.length, 'bg-green-600','👥')}
      ${statCardHTML('Kapasitas Sisa', (buddyProfile ? buddyProfile.capacity - buddyProfile.currentLoad : 0), 'bg-primary-600','📊')}
      ${statCardHTML('Total Pertemuan', myMeetings.length, 'bg-accent-500','📅')}
      ${statCardHTML('Jadwal Mendatang', upcoming.length, 'bg-purple-600','⏰')}
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <div class="cb-card p-5">
        <div class="section-header"><span class="section-title">Mentee Saya</span><button onclick="navigate('mentees')" class="text-xs text-primary-600 font-medium hover:underline">Kelola</button></div>
        ${myMentees.length ? myMentees.map(m=>`
          <div class="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
            ${avatarCircle(m.name.split(' ').map(x=>x[0]).join('').slice(0,2),'bg-primary-200 text-primary-800','w-9 h-9','text-xs')}
            <div class="flex-1 min-w-0"><p class="text-sm font-medium truncate">${m.name}</p><p class="text-xs text-gray-500">${m.prodi}</p></div>
            <button onclick="navigate('schedule')" class="text-xs text-primary-600 hover:underline">Jadwal</button>
          </div>`).join('') : `<div class="empty-state py-6"><p class="text-sm">Belum ada mentee.</p></div>`}
      </div>
      <div class="cb-card p-5">
        <div class="section-header"><span class="section-title">Jadwal Mendatang</span><button onclick="navigate('schedule')" class="text-xs text-primary-600 font-medium hover:underline">Semua</button></div>
        ${upcoming.length ? upcoming.map(m=>`
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2">
            <div class="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">${new Date(m.date).getDate()}</div>
            <div class="flex-1 min-w-0"><p class="text-sm font-medium truncate">${m.topic}</p><p class="text-xs text-gray-500">${m.menteeName} · ${formatDate(m.date)}</p></div>
            ${statusBadge(m.status)}
          </div>`).join('') : `<div class="empty-state py-6"><p class="text-sm">Tidak ada jadwal mendatang.</p></div>`}
      </div>
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: ADMIN DASHBOARD
───────────────────────────────────────────────────────────── */
function adminDashboardHTML() {
  const d = state.data;
  const totalMentees = d.mentees.length;
  const totalBuddies = d.buddies.length;
  const matched = d.mentees.filter(m=>m.assignedBuddyId).length;
  const pendingReq = d.matchRequests.filter(r=>r.status==='pending').length;
  const totalMtg = d.meetings.length;
  const doneCk = d.checklist.filter(c=>c.status==='completed').length;
  const reports = d.reports;

  const reportStats = {
    submitted:  reports.filter(r=>r.status==='submitted').length,
    in_progress:reports.filter(r=>r.status==='in_progress').length,
    resolved:   reports.filter(r=>r.status==='resolved').length,
    closed:     reports.filter(r=>r.status==='closed').length,
  };

  return `
  <div class="space-y-6">
    <div class="cb-card p-6 bg-gradient-to-r from-accent-500 to-accent-700 text-white">
      <h2 class="text-xl font-bold">Admin Dashboard</h2>
      <p class="text-accent-100 text-sm mt-1">Pantau pelaksanaan program CampusBuddy</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
      ${statCardHTML('Mahasiswa Baru', totalMentees, 'bg-primary-600','👤')}
      ${statCardHTML('Buddy Aktif', totalBuddies, 'bg-green-600','🎓')}
      ${statCardHTML('Sudah Punya Buddy', matched, 'bg-teal-600','🤝')}
      ${statCardHTML('Pending Matching', pendingReq, 'bg-yellow-500','⏳')}
      ${statCardHTML('Total Pertemuan', totalMtg, 'bg-accent-500','📅')}
      ${statCardHTML('Checklist Selesai', doneCk, 'bg-purple-600','✅')}
    </div>

    <!-- Charts -->
    <div class="grid lg:grid-cols-2 gap-6">
      <div class="cb-card p-5">
        <p class="section-title mb-4">Status Laporan Kendala</p>
        <div class="space-y-3">
          ${Object.entries(reportStats).map(([k,v]) => `
            <div>
              <div class="flex justify-between text-xs text-gray-600 mb-1"><span>${statusBadge(k)}</span><span class="font-medium">${v}</span></div>
              <div class="progress-bar"><div class="progress-fill ${k==='resolved'?'bg-green-500':k==='in_progress'?'bg-accent-500':k==='submitted'?'bg-primary-500':'bg-gray-400'}" style="width:${reports.length?Math.round(v/reports.length*100):0}%"></div></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="cb-card p-5">
        <p class="section-title mb-4">Buddy Capacity Usage</p>
        <div class="space-y-2">
          ${d.buddies.map(b=>`
            <div>
              <div class="flex justify-between text-xs text-gray-600 mb-1"><span class="font-medium">${b.name}</span><span>${b.currentLoad}/${b.capacity}</span></div>
              <div class="progress-bar"><div class="progress-fill bg-primary-500" style="width:${Math.round(b.currentLoad/b.capacity*100)}%"></div></div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Quick admin actions -->
    <div class="cb-card p-5">
      <p class="section-title mb-4">Akses Cepat Admin</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${quickActionHTML('👥','Kelola Pengguna','admin_users')}
        ${quickActionHTML('🤝','Buddy Assignment','admin_buddy')}
        ${quickActionHTML('🏢','Kelola Fasilitas','admin_facility')}
        ${quickActionHTML('🚩','Laporan Kendala','admin_reports')}
      </div>
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: BUDDY FINDER (Mentee only)
───────────────────────────────────────────────────────────── */
function buddyFinderHTML() {
  const u = state.currentUser;
  const myReq = state.data.matchRequests.find(r => r.menteeId === u.id && r.status === 'accepted');
  const assignedBuddyId = u.assignedBuddyId || (myReq ? myReq.buddyId : null);

  return `
  <div class="space-y-5">
    ${assignedBuddyId ? (() => {
      const b = state.data.buddies.find(x=>x.id===assignedBuddyId);
      return b ? `<div class="cb-card p-4 border-2 border-green-400 bg-green-50 flex items-center gap-4">
        ${avatarCircle(b.avatar,'bg-green-600','w-12 h-12','text-sm')}
        <div class="flex-1"><p class="font-semibold text-green-800">Buddy Anda: ${b.name}</p><p class="text-xs text-green-600">${b.prodi} · Angkatan ${b.angkatan}</p></div>
        <button onclick="showBuddyDetail('${b.id}')" class="bg-green-600 text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-green-700 transition">Lihat Profil</button>
      </div>` : '';
    })() : ''}

    <!-- Search & Filter -->
    <div class="cb-card p-4 flex flex-col sm:flex-row gap-3">
      <input id="buddy-search" type="text" placeholder="🔍 Cari buddy berdasarkan nama..." class="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" oninput="filterBuddies()" />
      <select id="buddy-filter-prodi" class="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 bg-white" onchange="filterBuddies()">
        <option value="">Semua Prodi</option>
        ${[...new Set(state.data.buddies.map(b=>b.prodi))].map(p=>`<option>${p}</option>`).join('')}
      </select>
      <select id="buddy-filter-minat" class="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 bg-white" onchange="filterBuddies()">
        <option value="">Semua Minat</option>
        ${[...new Set(state.data.buddies.flatMap(b=>b.minat))].map(m=>`<option>${m}</option>`).join('')}
      </select>
    </div>

    <div id="buddy-list" class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">${renderBuddyCards(state.data.buddies)}</div>
  </div>`;
}

function computeMatchScore(buddy, mentee) {
  let score = 0; const reasons = [];
  if (buddy.prodi === mentee.prodi) { score += 50; reasons.push('Sama-sama ' + mentee.prodi); }
  const sharedMinat = buddy.minat.filter(m => mentee.minat.includes(m));
  score += sharedMinat.length * 15;
  if (sharedMinat.length) reasons.push('Minat: ' + sharedMinat.join(', '));
  const remaining = buddy.capacity - buddy.currentLoad;
  if (remaining > 0) { score += 10; reasons.push(`Kapasitas tersedia (${remaining} slot)`); }
  return { score: Math.min(score, 100), reasons };
}

function renderBuddyCards(buddies) {
  const u = state.currentUser;
  const menteeProfile = state.data.mentees.find(m => m.id === u.id) || u;
  if (!buddies.length) return `<div class="col-span-full empty-state"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg><p class="mt-2">Tidak ada buddy ditemukan.</p></div>`;

  const sortedBuddies = [...buddies].map(b => ({ ...b, match: computeMatchScore(b, menteeProfile) })).sort((a,b) => b.match.score - a.match.score);

  return sortedBuddies.map(b => {
    const req = state.data.matchRequests.find(r => r.menteeId === u.id && r.buddyId === b.id);
    const isAssigned = u.assignedBuddyId === b.id;
    const full = b.capacity - b.currentLoad <= 0;
    return `
    <div class="cb-card p-5 flex flex-col gap-3">
      <div class="flex items-start gap-3">
        ${avatarCircle(b.avatar, 'bg-primary-600', 'w-12 h-12', 'text-sm')}
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-gray-900 text-sm">${b.name}</span>
            ${b.match.score >= 60 ? '<span class="badge badge-orange text-xs">⭐ Best Match</span>' : ''}
          </div>
          <p class="text-xs text-gray-500">${b.prodi} · Angkatan ${b.angkatan}</p>
          <div class="flex items-center gap-1 mt-1">
            <span class="text-yellow-400 text-xs">★</span>
            <span class="text-xs text-gray-600">${b.rating}</span>
          </div>
        </div>
        <!-- Match score ring -->
        <div class="text-center flex-shrink-0">
          <div class="text-lg font-bold text-primary-600">${b.match.score}%</div>
          <div class="text-xs text-gray-400">match</div>
        </div>
      </div>

      <p class="text-xs text-gray-500 truncate-2">${b.bio}</p>

      <div class="flex flex-wrap gap-1">
        ${b.minat.slice(0,3).map(m=>`<span class="badge badge-blue text-xs">${m}</span>`).join('')}
      </div>

      ${b.match.reasons.length ? `<div class="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-green-700">💡 ${b.match.reasons[0]}</div>` : ''}

      <div class="flex items-center justify-between text-xs text-gray-500">
        <span>Kapasitas: ${b.currentLoad}/${b.capacity}</span>
        ${full ? '<span class="badge badge-red">Penuh</span>' : `<span class="text-green-600 font-medium">${b.capacity - b.currentLoad} slot tersedia</span>`}
      </div>

      <div class="flex gap-2 mt-auto pt-2 border-t border-gray-100">
        <button onclick="showBuddyDetail('${b.id}')" class="flex-1 border border-gray-300 text-gray-600 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 transition">Detail</button>
        ${isAssigned ? `<span class="flex-1 text-center bg-green-100 text-green-700 text-xs font-medium py-2 rounded-lg">✓ Buddy Saya</span>`
          : req ? `<span class="flex-1 text-center text-xs font-medium py-2 rounded-lg ${req.status==='pending'?'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}">${req.status==='pending'?'⏳ Pending':'✗ Ditolak'}</span>`
          : full ? `<span class="flex-1 text-center bg-gray-100 text-gray-400 text-xs font-medium py-2 rounded-lg">Kapasitas Penuh</span>`
          : `<button onclick="requestBuddy('${b.id}')" class="flex-1 bg-primary-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-primary-700 transition">Ajukan Pendampingan</button>`}
      </div>
    </div>`;
  }).join('');
}

function filterBuddies() {
  const q     = (document.getElementById('buddy-search')?.value || '').toLowerCase();
  const prodi = document.getElementById('buddy-filter-prodi')?.value || '';
  const minat = document.getElementById('buddy-filter-minat')?.value || '';
  const filtered = state.data.buddies.filter(b =>
    (!q || b.name.toLowerCase().includes(q) || b.prodi.toLowerCase().includes(q) || b.skills.some(s=>s.toLowerCase().includes(q))) &&
    (!prodi || b.prodi === prodi) &&
    (!minat || b.minat.includes(minat))
  );
  const list = document.getElementById('buddy-list');
  if (list) list.innerHTML = renderBuddyCards(filtered);
}

function showBuddyDetail(buddyId) {
  const b = state.data.buddies.find(x => x.id === buddyId);
  if (!b) return;
  const u = state.currentUser;
  const menteeProfile = state.data.mentees.find(m=>m.id===u.id)||u;
  const { score, reasons } = computeMatchScore(b, menteeProfile);
  const req = state.data.matchRequests.find(r=>r.menteeId===u.id && r.buddyId===b.id);
  const isAssigned = u.assignedBuddyId === b.id;
  const full = b.capacity - b.currentLoad <= 0;

  openModal(`
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        ${avatarCircle(b.avatar,'bg-primary-600','w-16 h-16','text-lg')}
        <div>
          <h3 class="text-xl font-bold">${b.name}</h3>
          <p class="text-gray-500 text-sm">${b.prodi} · Angkatan ${b.angkatan}</p>
          <div class="flex items-center gap-1 mt-1"><span class="text-yellow-400">★</span><span class="text-sm font-medium">${b.rating}</span></div>
        </div>
        <div class="ml-auto text-center"><div class="text-2xl font-bold text-primary-600">${score}%</div><div class="text-xs text-gray-400">kecocokan</div></div>
      </div>
      <p class="text-gray-600 text-sm">${b.bio}</p>
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Minat</p>
        <div class="flex flex-wrap gap-2">${b.minat.map(m=>`<span class="badge badge-blue">${m}</span>`).join('')}</div>
      </div>
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Keahlian</p>
        <div class="flex flex-wrap gap-2">${b.skills.map(s=>`<span class="badge badge-purple">${s}</span>`).join('')}</div>
      </div>
      ${reasons.length ? `<div class="bg-green-50 border border-green-200 rounded-xl p-3"><p class="text-xs font-semibold text-green-700 mb-1">Alasan Kecocokan</p><ul class="text-xs text-green-700 space-y-1">${reasons.map(r=>`<li>• ${r}</li>`).join('')}</ul></div>` : ''}
      <div class="flex items-center justify-between text-sm bg-gray-50 rounded-xl p-3">
        <span class="text-gray-600">Kapasitas Pendampingan</span>
        <span class="font-semibold">${b.currentLoad}/${b.capacity} mentee</span>
      </div>
      ${u.role === 'mentee' ? `<div class="pt-2">
        ${isAssigned ? `<div class="w-full text-center bg-green-100 text-green-700 font-medium py-3 rounded-xl">✓ Ini adalah Buddy Anda</div>`
          : req ? `<div class="w-full text-center py-3 rounded-xl ${req.status==='pending'?'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}">${req.status==='pending'?'Permintaan Pending…':'Permintaan Ditolak'}</div>`
          : full ? `<div class="w-full text-center bg-gray-100 text-gray-400 py-3 rounded-xl">Kapasitas Penuh</div>`
          : `<button onclick="requestBuddy('${b.id}'); closeModal()" class="w-full bg-primary-600 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition">Ajukan Pendampingan</button>`}
      </div>` : ''}
    </div>`);
}

function requestBuddy(buddyId) {
  const u = state.currentUser;
  const existing = state.data.matchRequests.find(r=>r.menteeId===u.id && r.status==='pending');
  if (existing) { showToast('Anda sudah memiliki permintaan pending.', 'warning'); return; }
  const buddy = state.data.buddies.find(b=>b.id===buddyId);
  if (!buddy || buddy.capacity - buddy.currentLoad <= 0) { showToast('Buddy tidak tersedia.', 'error'); return; }
  const { reasons } = computeMatchScore(buddy, u);
  const req = { id:'mr'+Date.now(), menteeId:u.id, buddyId, status:'pending', createdAt:new Date().toISOString().split('T')[0], reason: reasons.join(', ') || '-' };
  state.data.matchRequests.push(req);
  // Admin auto-accepts for demo purposes after 1 second
  setTimeout(() => {
    const r = state.data.matchRequests.find(x=>x.id===req.id);
    if (r) {
      r.status = 'accepted';
      // update buddy load
      const b = state.data.buddies.find(x=>x.id===buddyId);
      if (b) b.currentLoad++;
      // update mentee assigned buddy
      const m = state.data.mentees.find(x=>x.id===u.id);
      if (m) m.assignedBuddyId = buddyId;
      // update demo account session
      const acc = DEMO_ACCOUNTS.find(a=>a.id===u.id);
      if (acc) { acc.assignedBuddyId = buddyId; state.currentUser.assignedBuddyId = buddyId; }
      saveData();
      showToast(`Selamat! ${buddy.name} menjadi Buddy Anda.`, 'success');
      if (state.currentPage === 'buddy') renderPage('buddy');
    }
  }, 1000);
  saveData();
  showToast('Permintaan pendampingan terkirim! Menunggu konfirmasi...', 'info');
  if (state.currentPage === 'buddy') renderPage('buddy');
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: CAMPUS GUIDE
───────────────────────────────────────────────────────────── */
function campusGuideHTML() {
  return `
  <div class="space-y-5">
    <div class="cb-card p-4 bg-primary-50 border border-primary-200">
      <p class="text-xs text-primary-700">⚠️ Data fasilitas di bawah ini adalah <strong>data contoh demonstrasi</strong> dan tidak merepresentasikan lokasi kampus resmi manapun.</p>
    </div>
    <div class="cb-card p-4 flex flex-col sm:flex-row gap-3">
      <input id="facility-search" type="text" placeholder="🔍 Cari fasilitas..." class="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" oninput="filterFacilities()" />
      <select id="facility-filter" class="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 bg-white" onchange="filterFacilities()">
        <option value="">Semua Kategori</option>
        ${[...new Set(state.data.facilities.map(f=>f.category))].map(c=>`<option>${c}</option>`).join('')}
      </select>
    </div>
    <div id="facility-list" class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">${renderFacilityCards(state.data.facilities)}</div>
  </div>`;
}

function renderFacilityCards(facilities) {
  if (!facilities.length) return `<div class="col-span-full empty-state"><p>Fasilitas tidak ditemukan.</p></div>`;
  return facilities.map(f=>`
    <div class="cb-card p-5 flex flex-col gap-2">
      <div class="flex items-start gap-3">
        <div class="text-3xl flex-shrink-0">${f.img}</div>
        <div class="flex-1 min-w-0">
          <span class="font-semibold text-sm text-gray-900">${f.name}</span>
          <span class="badge badge-blue ml-2 text-xs">${f.category}</span>
        </div>
      </div>
      <p class="text-xs text-gray-600 truncate-2">${f.desc}</p>
      <div class="text-xs text-gray-500 space-y-1 pt-1 border-t border-gray-100">
        <div class="flex items-center gap-1.5">📍 <span>${f.loc}</span></div>
        <div class="flex items-center gap-1.5">🕐 <span>${f.hours}</span></div>
      </div>
      <button onclick="showFacilityDetail('${f.id}')" class="mt-auto pt-2 text-primary-600 text-xs font-medium hover:underline text-left">Lihat detail →</button>
    </div>`).join('');
}

function filterFacilities() {
  const q = (document.getElementById('facility-search')?.value||'').toLowerCase();
  const cat = document.getElementById('facility-filter')?.value||'';
  const filtered = state.data.facilities.filter(f=>
    (!q || f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)) &&
    (!cat || f.category === cat)
  );
  const el = document.getElementById('facility-list');
  if (el) el.innerHTML = renderFacilityCards(filtered);
}

function showFacilityDetail(id) {
  const f = state.data.facilities.find(x=>x.id===id);
  if (!f) return;
  openModal(`
    <div class="space-y-4">
      <div class="flex items-start gap-4">
        <div class="text-4xl">${f.img}</div>
        <div><h3 class="text-xl font-bold">${f.name}</h3><span class="badge badge-blue mt-1">${f.category}</span></div>
      </div>
      <p class="text-gray-600">${f.desc}</p>
      <div class="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
        <div class="flex gap-3"><span class="text-gray-400 w-20 flex-shrink-0">Lokasi</span><span class="font-medium">${f.loc}</span></div>
        <div class="flex gap-3"><span class="text-gray-400 w-20 flex-shrink-0">Jam Buka</span><span class="font-medium">${f.hours}</span></div>
      </div>
    </div>`);
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: ACADEMIC GUIDE + CHECKLIST
───────────────────────────────────────────────────────────── */
function academicGuideHTML() {
  const totalCk = state.data.checklist.length;
  const doneCk = state.data.checklist.filter(c=>c.status==='completed').length;
  const pct = Math.round(doneCk/totalCk*100);

  return `
  <div class="space-y-5">
    <!-- Tab pills -->
    <div class="flex gap-2 flex-wrap">
      <button class="tab-pill active" onclick="switchTab('tab-checklist','tab-guides',this)">📋 Checklist Adaptasi</button>
      <button class="tab-pill" onclick="switchTab('tab-guides','tab-checklist',this)">📚 Panduan Akademik</button>
    </div>

    <!-- Checklist tab -->
    <div id="tab-checklist">
      <div class="cb-card p-5 mb-4">
        <div class="flex items-center justify-between mb-3">
          <span class="font-semibold text-gray-900">Progress Adaptasi</span>
          <span class="text-primary-600 font-bold">${doneCk}/${totalCk} selesai</span>
        </div>
        <div class="progress-bar"><div class="progress-fill bg-primary-600" id="ck-progress-bar" style="width:${pct}%"></div></div>
        <p class="text-xs text-gray-400 mt-2">Data disimpan di browser (localStorage)</p>
      </div>

      <div class="cb-card p-4 flex gap-3 mb-4">
        <input id="ck-search" type="text" placeholder="🔍 Cari checklist..." class="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500" oninput="renderChecklist()" />
        <select id="ck-filter" class="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 bg-white" onchange="renderChecklist()">
          <option value="">Semua Kategori</option>
          ${[...new Set(state.data.checklist.map(c=>c.category))].map(c=>`<option>${c}</option>`).join('')}
        </select>
        <select id="ck-status" class="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 bg-white" onchange="renderChecklist()">
          <option value="">Semua Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div id="checklist-container" class="space-y-2">${renderChecklistItems()}</div>
    </div>

    <!-- Guides tab -->
    <div id="tab-guides" class="hidden">
      <div class="cb-card p-4 mb-4">
        <input id="guide-search" type="text" placeholder="🔍 Cari panduan..." class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500" oninput="renderGuides()" />
      </div>
      <div id="guide-container" class="grid sm:grid-cols-2 gap-4">${renderGuideCards(state.data.academicGuides)}</div>
    </div>
  </div>`;
}

function switchTab(showId, hideId, btn) {
  document.getElementById(showId).classList.remove('hidden');
  document.getElementById(hideId).classList.add('hidden');
  document.querySelectorAll('.tab-pill').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function renderChecklistItems() {
  const q   = (document.getElementById('ck-search')?.value||'').toLowerCase();
  const cat = document.getElementById('ck-filter')?.value||'';
  const st  = document.getElementById('ck-status')?.value||'';
  const filtered = state.data.checklist.filter(c =>
    (!q || c.title.toLowerCase().includes(q)) && (!cat || c.category===cat) && (!st || c.status===st));
  if (!filtered.length) return `<div class="empty-state"><p>Tidak ada item yang sesuai.</p></div>`;
  return filtered.map(c=>`
    <div class="checklist-item ${c.status==='completed'?'completed':''}" id="ck-item-${c.id}">
      <div class="flex items-start gap-3">
        <button onclick="toggleChecklist('${c.id}')" class="mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition ${c.status==='completed'?'bg-green-500 border-green-500':'border-gray-400 hover:border-primary-400'}">
          ${c.status==='completed'?'<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}
        </button>
        <div class="flex-1 min-w-0">
          <p class="item-title font-medium text-sm text-gray-900">${c.title}</p>
          <p class="text-xs text-gray-500 mt-0.5">${c.desc}</p>
        </div>
        <span class="badge badge-gray text-xs flex-shrink-0">${c.category}</span>
      </div>
    </div>`).join('');
}

function renderChecklist() {
  const el = document.getElementById('checklist-container');
  if (el) el.innerHTML = renderChecklistItems();
}

function toggleChecklist(id) {
  const item = state.data.checklist.find(c=>c.id===id);
  if (!item) return;
  item.status = item.status === 'completed' ? 'active' : 'completed';
  saveData();
  // update progress bar
  const total = state.data.checklist.length;
  const done  = state.data.checklist.filter(c=>c.status==='completed').length;
  const pct   = Math.round(done/total*100);
  const bar = document.getElementById('ck-progress-bar');
  if (bar) bar.style.width = pct+'%';
  renderChecklist();
}

function renderGuideCards(guides) {
  if (!guides.length) return `<div class="col-span-full empty-state"><p>Panduan tidak ditemukan.</p></div>`;
  return guides.map(g=>`
    <div class="cb-card p-5 cursor-pointer hover:border-primary-300" onclick="showGuideDetail('${g.id}')">
      <div class="flex items-start justify-between gap-2">
        <h4 class="font-semibold text-sm text-gray-900">${g.title}</h4>
        <span class="badge badge-purple text-xs flex-shrink-0">${g.category}</span>
      </div>
      <p class="text-xs text-gray-500 mt-2 truncate-2">${g.content}</p>
      <p class="text-primary-600 text-xs font-medium mt-3 hover:underline">Baca selengkapnya →</p>
    </div>`).join('');
}

function renderGuides() {
  const q = (document.getElementById('guide-search')?.value||'').toLowerCase();
  const filtered = state.data.academicGuides.filter(g=>!q || g.title.toLowerCase().includes(q) || g.content.toLowerCase().includes(q));
  const el = document.getElementById('guide-container');
  if (el) el.innerHTML = renderGuideCards(filtered);
}

function showGuideDetail(id) {
  const g = state.data.academicGuides.find(x=>x.id===id);
  if (!g) return;
  openModal(`<div class="space-y-3"><div class="flex items-center gap-2"><h3 class="text-lg font-bold flex-1">${g.title}</h3><span class="badge badge-purple">${g.category}</span></div><p class="text-gray-600 text-sm leading-relaxed">${g.content}</p></div>`);
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: FORUM
───────────────────────────────────────────────────────────── */
function forumHTML() {
  return `
  <div class="space-y-5">
    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div class="flex gap-2 flex-wrap">
        <input id="forum-search" type="text" placeholder="🔍 Cari pertanyaan..." class="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500" oninput="renderForumList()" />
        <select id="forum-filter" class="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 bg-white" onchange="renderForumList()">
          <option value="">Semua Kategori</option>
          ${['Akademik','Organisasi','Fasilitas','Kehidupan Kampus'].map(c=>`<option>${c}</option>`).join('')}
        </select>
      </div>
      <button onclick="openNewPostModal()" class="bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition flex items-center gap-2 flex-shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Buat Pertanyaan
      </button>
    </div>
    <div id="forum-list" class="space-y-3">${renderForumListHTML()}</div>
  </div>`;
}

function categoryBadgeClass(cat) {
  const map = { Akademik:'badge-blue', Organisasi:'badge-purple', Fasilitas:'badge-orange', 'Kehidupan Kampus':'badge-green' };
  return map[cat] || 'badge-gray';
}

function renderForumListHTML() {
  const q   = (document.getElementById('forum-search')?.value||'').toLowerCase();
  const cat = document.getElementById('forum-filter')?.value||'';
  const filtered = state.data.forumPosts.filter(p=>
    (!q || p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)) &&
    (!cat || p.category===cat)
  ).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  if (!filtered.length) return `<div class="empty-state"><p>Belum ada pertanyaan.</p></div>`;
  const u = state.currentUser;
  return filtered.map(p=>`
    <div class="forum-post cursor-pointer" onclick="showPostDetail('${p.id}')">
      <div class="flex items-start gap-3">
        ${avatarCircle(p.authorAvatar,'bg-primary-200 text-primary-800','w-9 h-9','text-xs')}
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <span class="font-semibold text-sm text-gray-900">${p.title}</span>
            <span class="badge ${categoryBadgeClass(p.category)} text-xs">${p.category}</span>
          </div>
          <p class="text-xs text-gray-500 truncate-2">${p.body}</p>
          <div class="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span>${p.authorName}</span>
            <span>·</span>
            <span>${formatRelativeTime(p.createdAt)}</span>
            <span>·</span>
            <span>💬 ${p.answers.length} jawaban</span>
            ${p.authorId === u.id ? `<button onclick="event.stopPropagation();deletePost('${p.id}')" class="ml-auto text-red-400 hover:text-red-600">Hapus</button>` : ''}
          </div>
        </div>
      </div>
    </div>`).join('');
}

function renderForumList() {
  const el = document.getElementById('forum-list');
  if (el) el.innerHTML = renderForumListHTML();
}

function openNewPostModal() {
  openModal(`
    <h3 class="text-lg font-bold mb-4">Buat Pertanyaan Baru</h3>
    <form id="new-post-form" novalidate class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Judul Pertanyaan</label>
        <input id="post-title" type="text" placeholder="Tulis judul pertanyaan yang jelas..." class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
        <p class="text-red-500 text-xs mt-1 hidden" id="post-title-err"></p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
        <select id="post-cat" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 bg-white">
          <option value="">Pilih kategori</option>
          ${['Akademik','Organisasi','Fasilitas','Kehidupan Kampus'].map(c=>`<option>${c}</option>`).join('')}
        </select>
        <p class="text-red-500 text-xs mt-1 hidden" id="post-cat-err"></p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
        <textarea id="post-body" rows="4" placeholder="Jelaskan pertanyaan Anda secara detail..." class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 resize-none"></textarea>
        <p class="text-red-500 text-xs mt-1 hidden" id="post-body-err"></p>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="button" onclick="closeModal()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition">Batal</button>
        <button type="submit" class="flex-1 bg-primary-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-700 transition">Kirim Pertanyaan</button>
      </div>
    </form>`);
  document.getElementById('new-post-form').addEventListener('submit', submitNewPost);
}

function submitNewPost(e) {
  e.preventDefault();
  const title = document.getElementById('post-title').value.trim();
  const cat   = document.getElementById('post-cat').value;
  const body  = document.getElementById('post-body').value.trim();
  let valid = true;
  setFieldError('post-title-err', !title ? 'Judul wajib diisi.' : '');
  setFieldError('post-cat-err',   !cat   ? 'Pilih kategori.' : '');
  setFieldError('post-body-err',  !body  ? 'Deskripsi wajib diisi.' : '');
  if (!title||!cat||!body) return;
  const u = state.currentUser;
  const post = { id:'fp'+Date.now(), title, category:cat, body, authorId:u.id, authorName:u.name, authorAvatar:u.avatar, createdAt:new Date().toISOString(), answers:[] };
  state.data.forumPosts.unshift(post);
  saveData(); closeModal();
  showToast('Pertanyaan berhasil diposting!', 'success');
  if (state.currentPage==='forum') renderPage('forum');
}

function showPostDetail(postId) {
  const p = state.data.forumPosts.find(x=>x.id===postId);
  if (!p) return;
  const u = state.currentUser;
  openModal(`
    <div class="space-y-4">
      <div class="flex items-start gap-2">
        <h3 class="flex-1 text-base font-bold text-gray-900">${p.title}</h3>
        <span class="badge ${categoryBadgeClass(p.category)}">${p.category}</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500">
        ${avatarCircle(p.authorAvatar,'bg-primary-200 text-primary-800','w-7 h-7','text-xs')}
        <span>${p.authorName}</span><span>·</span><span>${formatRelativeTime(p.createdAt)}</span>
      </div>
      <p class="text-gray-700 text-sm">${p.body}</p>
      <div class="border-t border-gray-100 pt-3">
        <p class="font-semibold text-sm mb-3">💬 ${p.answers.length} Jawaban</p>
        <div class="space-y-3" id="answers-container">
          ${p.answers.length ? p.answers.map(a=>`
            <div class="bg-gray-50 rounded-xl p-3">
              <div class="flex items-center gap-2 mb-2 text-xs text-gray-500">
                ${avatarCircle(a.authorAvatar,'bg-green-200 text-green-800','w-6 h-6','text-xs')}
                <span class="font-medium">${a.authorName}</span><span>·</span><span>${formatRelativeTime(a.createdAt)}</span>
                ${a.authorId===u.id?`<button onclick="deleteAnswer('${p.id}','${a.id}')" class="ml-auto text-red-400 hover:text-red-600 text-xs">Hapus</button>`:''}
              </div>
              <p class="text-sm text-gray-700">${a.body}</p>
            </div>`).join('') : '<p class="text-xs text-gray-400">Belum ada jawaban. Jadilah yang pertama!</p>'}
        </div>
        <form id="answer-form" class="mt-3 flex gap-2" onsubmit="submitAnswer(event,'${p.id}')">
          <input type="text" id="answer-input" placeholder="Tulis jawaban Anda..." class="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500" />
          <button type="submit" class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition">Kirim</button>
        </form>
      </div>
    </div>`);
}

function submitAnswer(e, postId) {
  e.preventDefault();
  const input = document.getElementById('answer-input');
  const body = input.value.trim();
  if (!body) { showToast('Jawaban tidak boleh kosong.', 'warning'); return; }
  const u = state.currentUser;
  const post = state.data.forumPosts.find(x=>x.id===postId);
  if (!post) return;
  const answer = { id:'a'+Date.now(), body, authorId:u.id, authorName:u.name, authorAvatar:u.avatar, createdAt:new Date().toISOString() };
  post.answers.push(answer);
  saveData();
  input.value = '';
  // Re-render answers in modal
  const container = document.getElementById('answers-container');
  if (container) container.innerHTML = post.answers.map(a=>`
    <div class="bg-gray-50 rounded-xl p-3">
      <div class="flex items-center gap-2 mb-2 text-xs text-gray-500">
        ${avatarCircle(a.authorAvatar,'bg-green-200 text-green-800','w-6 h-6','text-xs')}
        <span class="font-medium">${a.authorName}</span><span>·</span><span>${formatRelativeTime(a.createdAt)}</span>
      </div>
      <p class="text-sm text-gray-700">${a.body}</p>
    </div>`).join('');
  showToast('Jawaban dikirim!', 'success');
}

function deleteAnswer(postId, answerId) {
  const post = state.data.forumPosts.find(x=>x.id===postId);
  if (!post) return;
  post.answers = post.answers.filter(a=>a.id!==answerId);
  saveData();
  showPostDetail(postId);
}

function deletePost(postId) {
  showConfirm('Hapus Pertanyaan?', 'Pertanyaan ini beserta semua jawabannya akan dihapus permanen.', () => {
    state.data.forumPosts = state.data.forumPosts.filter(p=>p.id!==postId);
    saveData(); showToast('Pertanyaan dihapus.', 'success');
    if (state.currentPage==='forum') renderPage('forum');
  });
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: MEETING SCHEDULE
───────────────────────────────────────────────────────────── */
function scheduleHTML() {
  const u = state.currentUser;
  const meetings = u.role === 'admin'
    ? state.data.meetings
    : u.role === 'buddy'
    ? state.data.meetings.filter(m => state.data.buddies.find(b=>b.userId===u.id)?.id === m.buddyId)
    : state.data.meetings.filter(m => m.menteeId === u.id);

  const upcoming  = meetings.filter(m => m.status !== 'completed' && m.status !== 'cancelled');
  const history   = meetings.filter(m => m.status === 'completed' || m.status === 'cancelled');

  return `
  <div class="space-y-5">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <button class="tab-pill active" onclick="switchTab('tab-upcoming','tab-history',this)">📅 Mendatang (${upcoming.length})</button>
        <button class="tab-pill" onclick="switchTab('tab-history','tab-upcoming',this)">🕐 Riwayat (${history.length})</button>
      </div>
      ${u.role !== 'admin' ? `<button onclick="openNewMeetingModal()" class="bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition">+ Jadwalkan</button>` : ''}
    </div>

    <div id="tab-upcoming">
      ${upcoming.length ? upcoming.map(m=>meetingCardHTML(m)).join('') : `<div class="empty-state cb-card p-8"><p>Tidak ada jadwal mendatang.</p></div>`}
    </div>
    <div id="tab-history" class="hidden">
      ${history.length ? history.map(m=>meetingCardHTML(m,true)).join('') : `<div class="empty-state cb-card p-8"><p>Belum ada riwayat pertemuan.</p></div>`}
    </div>
  </div>`;
}

function meetingCardHTML(m, isHistory=false) {
  const u = state.currentUser;
  const canEdit = !isHistory && (m.menteeId===u.id || state.data.buddies.find(b=>b.userId===u.id)?.id===m.buddyId || u.role==='admin');
  return `
  <div class="cb-card p-5 mb-3">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 bg-primary-100 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-primary-700">
        <div class="text-xs font-medium">${new Date(m.date+'T00:00').toLocaleString('id',{month:'short'})}</div>
        <div class="text-lg font-bold leading-none">${new Date(m.date+'T00:00').getDate()}</div>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-semibold text-gray-900">${m.topic}</span>
          ${statusBadge(m.status)}
          <span class="badge ${m.method==='online'?'badge-blue':'badge-purple'}">${m.method==='online'?'🌐 Online':'📍 Offline'}</span>
        </div>
        <div class="text-xs text-gray-500 mt-1 space-y-0.5">
          <div>👤 Mentee: <strong>${m.menteeName}</strong> · Buddy: <strong>${m.buddyName}</strong></div>
          <div>🕐 ${formatDate(m.date)} pukul ${m.time}</div>
          <div>${m.method==='online'?'🔗':'📍'} ${m.location || '-'}</div>
          ${m.notes ? `<div class="text-gray-400">📝 ${m.notes}</div>` : ''}
        </div>
      </div>
      ${canEdit ? `
      <div class="flex flex-col gap-1">
        <button onclick="editMeeting('${m.id}')" class="text-xs text-primary-600 hover:underline">Edit</button>
        ${m.status==='pending'&&state.data.buddies.find(b=>b.userId===u.id)?.id===m.buddyId ? `<button onclick="updateMeetingStatus('${m.id}','confirmed')" class="text-xs text-green-600 hover:underline">Konfirmasi</button>` : ''}
        ${m.status!=='cancelled' ? `<button onclick="updateMeetingStatus('${m.id}','cancelled')" class="text-xs text-red-500 hover:underline">Batal</button>` : ''}
        ${m.status==='confirmed' ? `<button onclick="updateMeetingStatus('${m.id}','completed')" class="text-xs text-gray-500 hover:underline">Selesai</button>` : ''}
      </div>` : ''}
    </div>
  </div>`;
}

function openNewMeetingModal() {
  const u = state.currentUser;
  const buddyProfile = state.data.buddies.find(b=>b.userId===u.id);
  const buddyId = u.assignedBuddyId || (buddyProfile ? buddyProfile.id : null);
  const buddy = state.data.buddies.find(b=>b.id===buddyId);
  const today = new Date().toISOString().split('T')[0];

  openModal(`
    <h3 class="text-lg font-bold mb-4">Jadwalkan Pertemuan</h3>
    <form id="meeting-form" novalidate class="space-y-4">
      <div class="bg-gray-50 rounded-xl p-3 text-sm">
        ${buddy ? `<span class="text-gray-600">Dengan Buddy: </span><strong>${buddy.name}</strong>` : '<span class="text-gray-400">Buddy belum ditugaskan.</span>'}
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Topik Diskusi</label>
        <input id="mtg-topic" type="text" placeholder="cth: Cara mengisi KRS" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
        <p class="text-red-500 text-xs mt-1 hidden" id="mtg-topic-err"></p>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Tanggal</label>
          <input id="mtg-date" type="date" min="${today}" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
          <p class="text-red-500 text-xs mt-1 hidden" id="mtg-date-err"></p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Waktu</label>
          <input id="mtg-time" type="time" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
          <p class="text-red-500 text-xs mt-1 hidden" id="mtg-time-err"></p>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Metode</label>
        <div class="flex gap-3">
          <label class="flex items-center gap-2 cursor-pointer flex-1 border border-gray-300 rounded-xl p-3 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50">
            <input type="radio" name="mtg-method" value="online" checked class="accent-primary-600" />
            <span class="text-sm">🌐 Online</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer flex-1 border border-gray-300 rounded-xl p-3 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50">
            <input type="radio" name="mtg-method" value="offline" class="accent-primary-600" />
            <span class="text-sm">📍 Offline</span>
          </label>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5" id="mtg-loc-label">Link Meeting</label>
        <input id="mtg-loc" type="text" placeholder="https://meet.google.com/..." class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
        <p class="text-red-500 text-xs mt-1 hidden" id="mtg-loc-err"></p>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="button" onclick="closeModal()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm hover:bg-gray-50 transition">Batal</button>
        <button type="submit" class="flex-1 bg-primary-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-700 transition">Buat Jadwal</button>
      </div>
    </form>`);

  // Update label on method change
  document.querySelectorAll('input[name="mtg-method"]').forEach(r => r.addEventListener('change', e => {
    document.getElementById('mtg-loc-label').textContent = e.target.value === 'online' ? 'Link Meeting' : 'Lokasi Pertemuan';
    document.getElementById('mtg-loc').placeholder = e.target.value === 'online' ? 'https://meet.google.com/...' : 'cth: Perpustakaan Lantai 2';
  }));
  document.getElementById('meeting-form').addEventListener('submit', submitNewMeeting);
}

function submitNewMeeting(e) {
  e.preventDefault();
  const topic  = document.getElementById('mtg-topic').value.trim();
  const date   = document.getElementById('mtg-date').value;
  const time   = document.getElementById('mtg-time').value;
  const method = document.querySelector('input[name="mtg-method"]:checked')?.value;
  const loc    = document.getElementById('mtg-loc').value.trim();
  const today  = new Date().toISOString().split('T')[0];

  setFieldError('mtg-topic-err', !topic ? 'Topik wajib diisi.' : '');
  setFieldError('mtg-date-err',  !date ? 'Tanggal wajib dipilih.' : date < today ? 'Tanggal tidak boleh di masa lalu.' : '');
  setFieldError('mtg-time-err',  !time ? 'Waktu wajib diisi.' : '');
  setFieldError('mtg-loc-err',   !loc  ? 'Lokasi/link wajib diisi.' : '');
  if (!topic || !date || date < today || !time || !loc) return;

  const u = state.currentUser;
  const buddyId = u.assignedBuddyId;
  const buddy   = state.data.buddies.find(b=>b.id===buddyId);
  const mtg = {
    id: 'm'+Date.now(), menteeId:u.id, buddyId: buddyId||'', menteeName:u.name,
    buddyName: buddy ? buddy.name : '-', topic, date, time, method, location:loc, status:'pending', notes:''
  };
  state.data.meetings.push(mtg);
  saveData(); closeModal();
  showToast('Jadwal berhasil dibuat!', 'success');
  if (state.currentPage==='schedule') renderPage('schedule');
}

function editMeeting(id) {
  const m = state.data.meetings.find(x=>x.id===id);
  if (!m) return;
  openModal(`
    <h3 class="text-lg font-bold mb-4">Edit Jadwal</h3>
    <form id="edit-meeting-form" novalidate class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Topik</label>
        <input id="emtg-topic" type="text" value="${m.topic}" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-sm font-medium text-gray-700 mb-1.5">Tanggal</label>
          <input id="emtg-date" type="date" value="${m.date}" min="${new Date().toISOString().split('T')[0]}" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" /></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1.5">Waktu</label>
          <input id="emtg-time" type="time" value="${m.time}" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" /></div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Lokasi / Link</label>
        <input id="emtg-loc" type="text" value="${m.location}" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Catatan</label>
        <textarea id="emtg-notes" rows="2" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 resize-none">${m.notes||''}</textarea>
      </div>
      <div class="flex gap-3">
        <button type="button" onclick="closeModal()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm hover:bg-gray-50 transition">Batal</button>
        <button type="submit" class="flex-1 bg-primary-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-700 transition">Simpan</button>
      </div>
    </form>`);
  document.getElementById('edit-meeting-form').addEventListener('submit', e => {
    e.preventDefault();
    const date = document.getElementById('emtg-date').value;
    const today = new Date().toISOString().split('T')[0];
    if (date < today) { showToast('Tanggal tidak boleh di masa lalu.', 'error'); return; }
    m.topic    = document.getElementById('emtg-topic').value.trim() || m.topic;
    m.date     = date || m.date;
    m.time     = document.getElementById('emtg-time').value || m.time;
    m.location = document.getElementById('emtg-loc').value.trim() || m.location;
    m.notes    = document.getElementById('emtg-notes').value.trim();
    saveData(); closeModal();
    showToast('Jadwal diperbarui!', 'success');
    if (state.currentPage==='schedule') renderPage('schedule');
  });
}

function updateMeetingStatus(id, newStatus) {
  const m = state.data.meetings.find(x=>x.id===id);
  if (!m) return;
  m.status = newStatus;
  saveData();
  showToast(`Status diperbarui: ${newStatus}.`, 'success');
  if (state.currentPage==='schedule') renderPage('schedule');
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: ADAPTATION SUPPORT / REPORTING
───────────────────────────────────────────────────────────── */
function supportHTML() {
  const u = state.currentUser;
  const myReports = state.data.reports.filter(r=>r.menteeId===u.id);
  return `
  <div class="space-y-5">
    <div class="cb-card p-4 bg-yellow-50 border border-yellow-200 text-xs text-yellow-800">
      ⚠️ Laporan ini bersifat <strong>demo frontend</strong>. Pembatasan akses sesungguhnya membutuhkan autentikasi backend.
    </div>
    <div class="flex justify-between items-center">
      <h3 class="font-semibold text-gray-900">Laporan Kendala Saya</h3>
      <button onclick="openNewReportModal()" class="bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition">+ Buat Laporan</button>
    </div>
    <div id="report-list" class="space-y-3">
      ${myReports.length ? myReports.map(r=>reportCardHTML(r)).join('') : `<div class="empty-state cb-card p-8"><p>Belum ada laporan.</p></div>`}
    </div>
  </div>`;
}

function reportCardHTML(r) {
  const priorityMap = { low:'badge-gray', medium:'badge-yellow', high:'badge-red', urgent:'badge-red' };
  return `
  <div class="cb-card p-5">
    <div class="flex items-start gap-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center flex-wrap gap-2 mb-1">
          <span class="font-semibold text-sm text-gray-900">${r.title}</span>
          ${statusBadge(r.status)}
          <span class="badge ${priorityMap[r.priority]||'badge-gray'} text-xs">Prioritas: ${r.priority}</span>
        </div>
        <div class="text-xs text-gray-500 mb-2">📁 ${r.category} · ${formatDate(r.createdAt)}</div>
        <p class="text-xs text-gray-600 truncate-2">${r.desc}</p>
        ${r.adminNote ? `<div class="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-700">📋 Admin: ${r.adminNote}</div>` : ''}
      </div>
      <button onclick="deleteReport('${r.id}')" class="text-xs text-red-400 hover:text-red-600 flex-shrink-0">Hapus</button>
    </div>
  </div>`;
}

function openNewReportModal() {
  openModal(`
    <h3 class="text-lg font-bold mb-4">Laporkan Kendala</h3>
    <form id="report-form" novalidate class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Judul Kendala</label>
        <input id="rpt-title" type="text" placeholder="Ringkasan singkat masalah Anda" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
        <p class="text-red-500 text-xs mt-1 hidden" id="rpt-title-err"></p>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
          <select id="rpt-cat" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="">Pilih...</option>
            ${['Akademik','Sosial','Administrasi','Fasilitas','Lainnya'].map(c=>`<option>${c}</option>`).join('')}
          </select>
          <p class="text-red-500 text-xs mt-1 hidden" id="rpt-cat-err"></p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Prioritas</label>
          <select id="rpt-priority" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 bg-white">
            <option value="low">Rendah</option>
            <option value="medium" selected>Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Detail</label>
        <textarea id="rpt-desc" rows="4" placeholder="Jelaskan kendala Anda secara detail..." class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 resize-none"></textarea>
        <p class="text-red-500 text-xs mt-1 hidden" id="rpt-desc-err"></p>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="button" onclick="closeModal()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm hover:bg-gray-50 transition">Batal</button>
        <button type="submit" class="flex-1 bg-primary-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-700 transition">Kirim Laporan</button>
      </div>
    </form>`);
  document.getElementById('report-form').addEventListener('submit', submitReport);
}

function submitReport(e) {
  e.preventDefault();
  const title = document.getElementById('rpt-title').value.trim();
  const cat   = document.getElementById('rpt-cat').value;
  const desc  = document.getElementById('rpt-desc').value.trim();
  const priority = document.getElementById('rpt-priority').value;
  setFieldError('rpt-title-err', !title ? 'Judul wajib diisi.' : '');
  setFieldError('rpt-cat-err',   !cat   ? 'Pilih kategori.' : '');
  setFieldError('rpt-desc-err',  !desc  ? 'Deskripsi wajib diisi.' : '');
  if (!title||!cat||!desc) return;
  const u = state.currentUser;
  const report = { id:'rp'+Date.now(), menteeId:u.id, menteeName:u.name, title, category:cat, desc, priority, status:'submitted', createdAt:new Date().toISOString().split('T')[0], adminNote:'', updatedAt:new Date().toISOString().split('T')[0] };
  state.data.reports.push(report);
  saveData(); closeModal();
  showToast('Laporan berhasil dikirim!', 'success');
  if (state.currentPage==='support') renderPage('support');
}

function deleteReport(id) {
  showConfirm('Hapus Laporan?', 'Laporan ini akan dihapus permanen.', () => {
    state.data.reports = state.data.reports.filter(r=>r.id!==id);
    saveData(); showToast('Laporan dihapus.', 'success');
    if (state.currentPage==='support') renderPage('support');
  });
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: PROFILE
───────────────────────────────────────────────────────────── */
function profileHTML() {
  const u = state.currentUser;
  const roleLabel = { mentee:'Mahasiswa Baru', buddy:'Buddy / Kakak Tingkat', admin:'Administrator' };
  const roleColor = { mentee:'badge-blue', buddy:'badge-green', admin:'badge-orange' };
  return `
  <div class="max-w-2xl mx-auto space-y-6">
    <div class="cb-card p-6 text-center">
      ${avatarCircle(u.avatar,'bg-primary-600','w-20 h-20 mx-auto','text-2xl')}
      <h2 class="text-xl font-bold mt-4">${u.name}</h2>
      <p class="text-gray-500 text-sm">${u.prodi}</p>
      <span class="badge ${roleColor[u.role]||'badge-gray'} mt-2">${roleLabel[u.role]||u.role}</span>
      ${u.nim ? `<p class="text-xs text-gray-400 mt-2">NIM: ${u.nim}</p>` : ''}
    </div>
    <div class="cb-card p-5">
      <h3 class="font-semibold text-gray-900 mb-4">Informasi Akun</h3>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Nama Lengkap</span><span class="font-medium">${u.name}</span></div>
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Email</span><span class="font-medium">${u.email}</span></div>
        ${u.nim ? `<div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">NIM</span><span class="font-medium">${u.nim}</span></div>` : ''}
        <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Program Studi</span><span class="font-medium">${u.prodi}</span></div>
        ${u.angkatan ? `<div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Angkatan</span><span class="font-medium">${u.angkatan}</span></div>` : ''}
        <div class="flex justify-between py-2"><span class="text-gray-500">Peran</span><span class="badge ${roleColor[u.role]||'badge-gray'}">${roleLabel[u.role]||u.role}</span></div>
      </div>
    </div>
    ${u.minat && u.minat.length ? `
    <div class="cb-card p-5">
      <h3 class="font-semibold text-gray-900 mb-3">Minat</h3>
      <div class="flex flex-wrap gap-2">${u.minat.map(m=>`<span class="badge badge-blue">${m}</span>`).join('')}</div>
    </div>` : ''}
    <div class="cb-card p-5">
      <h3 class="font-semibold text-gray-900 mb-3">Pengaturan Demo</h3>
      <p class="text-xs text-gray-500 mb-4">Reset semua data ke kondisi awal untuk demonstrasi ulang.</p>
      <button onclick="resetData()" class="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-red-100 transition">🔄 Reset Data Demo</button>
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: BUDDY — MY MENTEES
───────────────────────────────────────────────────────────── */
function buddyMenteesHTML() {
  const u = state.currentUser;
  const buddyProfile = state.data.buddies.find(b=>b.userId===u.id);
  const myMentees = buddyProfile ? state.data.mentees.filter(m=>m.assignedBuddyId===buddyProfile.id) : [];
  return `
  <div class="space-y-4">
    ${myMentees.length ? myMentees.map(m=>`
      <div class="cb-card p-5 flex items-center gap-4">
        ${avatarCircle(m.name.split(' ').map(x=>x[0]).join('').slice(0,2),'bg-primary-600','w-12 h-12','text-sm')}
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-gray-900">${m.name}</p>
          <p class="text-xs text-gray-500">${m.prodi} · NIM ${m.nim}</p>
          <div class="flex flex-wrap gap-1 mt-1">${m.minat.slice(0,3).map(x=>`<span class="badge badge-blue text-xs">${x}</span>`).join('')}</div>
        </div>
        <button onclick="navigate('schedule')" class="border border-gray-300 text-gray-600 text-xs font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition">Jadwal</button>
      </div>`).join('') : `<div class="empty-state cb-card p-12"><p>Belum ada mentee yang ditugaskan.</p></div>`}
  </div>`;
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: ADMIN — USERS
───────────────────────────────────────────────────────────── */
function adminUsersHTML() {
  const all = [
    ...state.data.mentees.map(m=>({...m, role:'mentee'})),
    ...state.data.buddies.map(b=>({...b, role:'buddy', id:b.userId||b.id})),
  ];
  return `
  <div class="space-y-4">
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr><th>Nama</th><th>Program Studi</th><th>Peran</th><th>Status</th></tr></thead>
        <tbody>
          ${all.map(u=>`<tr>
            <td><div class="flex items-center gap-2">${avatarCircle((u.avatar||u.name.slice(0,2).toUpperCase()),'bg-primary-200 text-primary-800','w-8 h-8','text-xs')}<span class="font-medium">${u.name}</span></div></td>
            <td>${u.prodi}</td>
            <td>${statusBadge(u.role==='mentor'?'buddy':u.role)}</td>
            <td><span class="badge badge-green">Aktif</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: ADMIN — BUDDY ASSIGNMENT
───────────────────────────────────────────────────────────── */
function adminBuddyHTML() {
  return `
  <div class="space-y-4">
    <p class="text-sm text-gray-500">Kelola penugasan buddy untuk mahasiswa baru.</p>
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr><th>Mahasiswa Baru</th><th>Prodi</th><th>Buddy Ditugaskan</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody id="assignment-tbody">
          ${state.data.mentees.map(m=>{
            const b = state.data.buddies.find(x=>x.id===m.assignedBuddyId);
            return `<tr>
              <td class="font-medium">${m.name}</td>
              <td>${m.prodi}</td>
              <td>${b ? b.name : '<span class="text-gray-400">Belum ditugaskan</span>'}</td>
              <td>${b ? '<span class="badge badge-green">Assigned</span>' : '<span class="badge badge-yellow">Unassigned</span>'}</td>
              <td><button onclick="adminAssignBuddy('${m.id}')" class="text-xs text-primary-600 hover:underline font-medium">Ubah</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function adminAssignBuddy(menteeId) {
  const mentee = state.data.mentees.find(m=>m.id===menteeId);
  if (!mentee) return;
  openModal(`
    <h3 class="text-lg font-bold mb-4">Tugaskan Buddy untuk ${mentee.name}</h3>
    <div class="space-y-2">
      ${state.data.buddies.map(b=>`
        <button onclick="doAssignBuddy('${menteeId}','${b.id}')" class="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition text-left ${mentee.assignedBuddyId===b.id?'border-primary-500 bg-primary-50':''}">
          ${avatarCircle(b.avatar,'bg-primary-600','w-10 h-10','text-xs')}
          <div class="flex-1 min-w-0"><p class="font-medium text-sm">${b.name}</p><p class="text-xs text-gray-500">${b.prodi} · ${b.currentLoad}/${b.capacity} mentee</p></div>
          ${mentee.assignedBuddyId===b.id?'<span class="badge badge-green text-xs">✓ Aktif</span>':''}
          ${b.currentLoad>=b.capacity?'<span class="badge badge-red text-xs">Penuh</span>':''}
        </button>`).join('')}
    </div>`);
}

function doAssignBuddy(menteeId, buddyId) {
  const mentee = state.data.mentees.find(m=>m.id===menteeId);
  if (!mentee) return;
  // Decrease old buddy load
  if (mentee.assignedBuddyId) {
    const old = state.data.buddies.find(b=>b.id===mentee.assignedBuddyId);
    if (old && old.currentLoad > 0) old.currentLoad--;
  }
  // Assign new buddy
  const newBuddy = state.data.buddies.find(b=>b.id===buddyId);
  if (newBuddy) { if (newBuddy.currentLoad < newBuddy.capacity) newBuddy.currentLoad++; }
  mentee.assignedBuddyId = buddyId;
  saveData(); closeModal();
  showToast(`${mentee.name} berhasil ditugaskan ke ${newBuddy?.name||'Buddy'}.`, 'success');
  if (state.currentPage==='admin_buddy') renderPage('admin_buddy');
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: ADMIN — FACILITY
───────────────────────────────────────────────────────────── */
function adminFacilityHTML() {
  return `
  <div class="space-y-4">
    <div class="flex justify-end">
      <button onclick="openAddFacilityModal()" class="bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition">+ Tambah Fasilitas</button>
    </div>
    <div class="table-wrap">
      <table class="data-table" id="facility-admin-table">
        <thead><tr><th>Nama</th><th>Kategori</th><th>Lokasi</th><th>Jam Buka</th><th>Aksi</th></tr></thead>
        <tbody>${state.data.facilities.map(f=>`<tr>
          <td><span class="text-lg mr-2">${f.img}</span><span class="font-medium">${f.name}</span></td>
          <td><span class="badge badge-blue">${f.category}</span></td>
          <td class="text-xs">${f.loc}</td>
          <td class="text-xs">${f.hours}</td>
          <td class="flex gap-2">
            <button onclick="openEditFacilityModal('${f.id}')" class="text-xs text-primary-600 hover:underline font-medium">Edit</button>
            <button onclick="deleteFacility('${f.id}')" class="text-xs text-red-500 hover:underline font-medium">Hapus</button>
          </td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
  </div>`;
}

function openAddFacilityModal() {
  openModal(`
    <h3 class="text-lg font-bold mb-4">Tambah Fasilitas</h3>
    <form id="facility-form" novalidate class="space-y-4">
      ${facilityFormFields()}
      <div class="flex gap-3 pt-2">
        <button type="button" onclick="closeModal()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm hover:bg-gray-50 transition">Batal</button>
        <button type="submit" class="flex-1 bg-primary-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-700 transition">Tambah</button>
      </div>
    </form>`);
  document.getElementById('facility-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fc-name').value.trim();
    const cat  = document.getElementById('fc-cat').value;
    const desc = document.getElementById('fc-desc').value.trim();
    const loc  = document.getElementById('fc-loc').value.trim();
    const hrs  = document.getElementById('fc-hours').value.trim();
    if (!name||!cat||!desc||!loc) { showToast('Semua field wajib diisi.', 'warning'); return; }
    state.data.facilities.push({ id:'f'+Date.now(), name, category:cat, desc, loc, hours:hrs||'-', img:'🏛️' });
    saveData(); closeModal(); showToast('Fasilitas ditambahkan!', 'success');
    if (state.currentPage==='admin_facility') renderPage('admin_facility');
  });
}

function openEditFacilityModal(id) {
  const f = state.data.facilities.find(x=>x.id===id);
  if (!f) return;
  openModal(`
    <h3 class="text-lg font-bold mb-4">Edit Fasilitas</h3>
    <form id="facility-form" novalidate class="space-y-4">
      ${facilityFormFields(f)}
      <div class="flex gap-3 pt-2">
        <button type="button" onclick="closeModal()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm hover:bg-gray-50 transition">Batal</button>
        <button type="submit" class="flex-1 bg-primary-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-700 transition">Simpan</button>
      </div>
    </form>`);
  document.getElementById('facility-form').addEventListener('submit', e => {
    e.preventDefault();
    f.name     = document.getElementById('fc-name').value.trim() || f.name;
    f.category = document.getElementById('fc-cat').value || f.category;
    f.desc     = document.getElementById('fc-desc').value.trim() || f.desc;
    f.loc      = document.getElementById('fc-loc').value.trim() || f.loc;
    f.hours    = document.getElementById('fc-hours').value.trim() || f.hours;
    saveData(); closeModal(); showToast('Fasilitas diperbarui!', 'success');
    if (state.currentPage==='admin_facility') renderPage('admin_facility');
  });
}

function facilityFormFields(f={}) {
  return `
    <div><label class="block text-sm font-medium text-gray-700 mb-1.5">Nama Fasilitas</label>
      <input id="fc-name" type="text" value="${f.name||''}" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" /></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
      <select id="fc-cat" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 bg-white">
        ${['Perpustakaan','Laboratorium','Ibadah','Kantin','Administrasi','Kesehatan','Olahraga','Ruang Kuliah','Lainnya'].map(c=>`<option ${f.category===c?'selected':''}>${c}</option>`).join('')}
      </select></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
      <textarea id="fc-desc" rows="2" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 resize-none">${f.desc||''}</textarea></div>
    <div class="grid grid-cols-2 gap-3">
      <div><label class="block text-sm font-medium text-gray-700 mb-1.5">Lokasi</label>
        <input id="fc-loc" type="text" value="${f.loc||''}" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" /></div>
      <div><label class="block text-sm font-medium text-gray-700 mb-1.5">Jam Buka</label>
        <input id="fc-hours" type="text" value="${f.hours||''}" placeholder="08:00–17:00" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500" /></div>
    </div>`;
}

function deleteFacility(id) {
  showConfirm('Hapus Fasilitas?', 'Data fasilitas ini akan dihapus permanen.', () => {
    state.data.facilities = state.data.facilities.filter(f=>f.id!==id);
    saveData(); showToast('Fasilitas dihapus.', 'success');
    if (state.currentPage==='admin_facility') renderPage('admin_facility');
  });
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: ADMIN — REPORTS
───────────────────────────────────────────────────────────── */
function adminReportsHTML() {
  return `
  <div class="space-y-4">
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr><th>Pelapor</th><th>Judul</th><th>Kategori</th><th>Prioritas</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${state.data.reports.map(r=>`<tr>
            <td class="text-xs font-medium">${r.menteeName}</td>
            <td class="font-medium text-sm">${r.title}</td>
            <td><span class="badge badge-blue text-xs">${r.category}</span></td>
            <td><span class="badge ${r.priority==='high'||r.priority==='urgent'?'badge-red':r.priority==='medium'?'badge-yellow':'badge-gray'} text-xs">${r.priority}</span></td>
            <td>${statusBadge(r.status)}</td>
            <td><button onclick="adminEditReport('${r.id}')" class="text-xs text-primary-600 hover:underline font-medium">Tinjau</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function adminEditReport(id) {
  const r = state.data.reports.find(x=>x.id===id);
  if (!r) return;
  openModal(`
    <h3 class="text-lg font-bold mb-4">Tinjau Laporan</h3>
    <div class="space-y-3 mb-5">
      <div class="flex gap-2 flex-wrap">${statusBadge(r.status)}<span class="badge badge-blue">${r.category}</span></div>
      <h4 class="font-semibold">${r.title}</h4>
      <p class="text-sm text-gray-600">${r.desc}</p>
      <p class="text-xs text-gray-400">Dilaporkan oleh: ${r.menteeName} · ${formatDate(r.createdAt)}</p>
    </div>
    <form id="admin-report-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Perbarui Status</label>
        <select id="ar-status" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 bg-white">
          ${['submitted','in_progress','resolved','closed'].map(s=>`<option value="${s}" ${r.status===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Catatan Tindak Lanjut</label>
        <textarea id="ar-note" rows="3" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 resize-none">${r.adminNote||''}</textarea>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="button" onclick="closeModal()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm hover:bg-gray-50 transition">Batal</button>
        <button type="submit" class="flex-1 bg-primary-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-700 transition">Simpan</button>
      </div>
    </form>`);
  document.getElementById('admin-report-form').addEventListener('submit', e => {
    e.preventDefault();
    r.status    = document.getElementById('ar-status').value;
    r.adminNote = document.getElementById('ar-note').value.trim();
    r.updatedAt = new Date().toISOString().split('T')[0];
    saveData(); closeModal(); showToast('Laporan diperbarui!', 'success');
    if (state.currentPage==='admin_reports') renderPage('admin_reports');
  });
}

/* ─────────────────────────────────────────────────────────────
   ── PAGE: NOTIFICATIONS
───────────────────────────────────────────────────────────── */
function notificationsHTML() {
  const u = state.currentUser;
  const myNotifs = state.data.notifications.filter(n=>n.userId===u.id);
  // Mark all as read
  myNotifs.forEach(n=>n.read=true);
  saveData();
  document.getElementById('notif-badge').classList.add('hidden');

  return `
  <div class="max-w-lg mx-auto space-y-3">
    ${myNotifs.length ? myNotifs.map(n=>`
      <div class="cb-card p-4 flex gap-3 items-start">
        <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600 text-sm">🔔</div>
        <div class="flex-1"><p class="text-sm text-gray-800">${n.msg}</p><p class="text-xs text-gray-400 mt-1">${n.time}</p></div>
      </div>`).join('') : `<div class="empty-state cb-card p-12"><p>Tidak ada notifikasi.</p></div>`}
  </div>`;
}

/* ─────────────────────────────────────────────────────────────
   MODAL HELPERS
───────────────────────────────────────────────────────────── */
function openModal(html) {
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('global-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('global-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────────────────────
   CONFIRM DIALOG
───────────────────────────────────────────────────────────── */
let confirmCallback = null;
function showConfirm(title, message, callback, btnLabel='Hapus', btnClass='bg-red-600 hover:bg-red-700') {
  document.getElementById('confirm-title').textContent   = title;
  document.getElementById('confirm-message').textContent = message;
  const btn = document.getElementById('confirm-ok-btn');
  btn.textContent  = btnLabel;
  btn.className    = `flex-1 ${btnClass} text-white py-2.5 rounded-xl text-sm font-medium transition`;
  confirmCallback  = callback;
  document.getElementById('confirm-dialog').classList.remove('hidden');
}
function cancelConfirm() {
  confirmCallback = null;
  document.getElementById('confirm-dialog').classList.add('hidden');
}
document.getElementById('confirm-ok-btn').addEventListener('click', () => {
  if (confirmCallback) confirmCallback();
  cancelConfirm();
});

/* ─────────────────────────────────────────────────────────────
   TOAST NOTIFICATIONS
───────────────────────────────────────────────────────────── */
function showToast(message, type='info') {
  const colors = {
    success: 'bg-green-600',
    error:   'bg-red-600',
    warning: 'bg-yellow-500',
    info:    'bg-primary-600',
  };
  const icons = { success:'✓', error:'✗', warning:'⚠', info:'ℹ' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `${colors[type]||colors.info} text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 pointer-events-auto toast-slide max-w-xs`;
  toast.innerHTML = `<span class="text-base">${icons[type]||icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3500);
}

/* ─────────────────────────────────────────────────────────────
   FORM VALIDATION HELPERS
───────────────────────────────────────────────────────────── */
function setFieldError(errId, msg) {
  const el = document.getElementById(errId);
  if (!el) return;
  if (msg) { el.textContent = msg; el.classList.remove('hidden'); }
  else { el.textContent = ''; el.classList.add('hidden'); }
}

/* ─────────────────────────────────────────────────────────────
   DATE / TIME HELPERS
───────────────────────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr+'T00:00').toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
}
function formatRelativeTime(iso) {
  if (!iso) return '-';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff/60000);
  if (mins < 1)  return 'baru saja';
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins/60);
  if (hrs < 24)  return `${hrs} jam lalu`;
  const days = Math.floor(hrs/24);
  if (days < 7)  return `${days} hari lalu`;
  return formatDate(iso.split('T')[0]);
}

/* ─────────────────────────────────────────────────────────────
   PAGE LISTENER ATTACHMENTS
   (event delegation where possible)
───────────────────────────────────────────────────────────── */
function attachPageListeners(page) {
  // Most handlers are inlined as onclick for simplicity and
  // easy readability for students. This function exists as a
  // hook for future refactoring to pure event delegation.
}

/* ─────────────────────────────────────────────────────────────
   LOGIN FORM SUBMIT
───────────────────────────────────────────────────────────── */
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  let valid = true;
  if (!email) { setFieldError('login-email-err','Email wajib diisi.'); valid=false; } else setFieldError('login-email-err','');
  if (!pass)  { setFieldError('login-password-err','Password wajib diisi.'); valid=false; } else setFieldError('login-password-err','');
  if (!valid) return;

  const user = DEMO_ACCOUNTS.find(a => a.email === email && a.password === pass);
  if (!user) {
    setFieldError('login-password-err','Email atau password salah. Gunakan akun demo yang tersedia.');
    return;
  }
  state.currentUser = user;
  localStorage.setItem('campusbuddy_session', JSON.stringify({ id:user.id }));
  bootApp();
});

/* ─────────────────────────────────────────────────────────────
   REGISTER FORM SUBMIT
───────────────────────────────────────────────────────────── */
document.getElementById('register-form').addEventListener('submit', e => {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const nim      = document.getElementById('reg-nim').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const prodi    = document.getElementById('reg-prodi').value;
  const password = document.getElementById('reg-password').value;
  let valid = true;
  if (!name)               { setFieldError('reg-name-err','Nama wajib diisi.'); valid=false; } else setFieldError('reg-name-err','');
  if (!nim)                { setFieldError('reg-nim-err','NIM wajib diisi.');   valid=false; } else setFieldError('reg-nim-err','');
  if (!email||!email.includes('@')) { setFieldError('reg-email-err','Email tidak valid.'); valid=false; } else setFieldError('reg-email-err','');
  if (!prodi)              { setFieldError('reg-prodi-err','Pilih program studi.'); valid=false; } else setFieldError('reg-prodi-err','');
  if (password.length < 6) { setFieldError('reg-password-err','Password min. 6 karakter.'); valid=false; } else setFieldError('reg-password-err','');
  if (!valid) return;

  // In a real app this would call an API. For demo: create a temp account.
  const newUser = {
    id: 'u'+Date.now(), email, password, role:'mentee', name, nim, prodi, angkatan:2024,
    minat:[], avatar: name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(),
    assignedBuddyId: null,
  };
  DEMO_ACCOUNTS.push(newUser);
  state.currentUser = newUser;
  localStorage.setItem('campusbuddy_session', JSON.stringify({ id:newUser.id }));
  showToast('Pendaftaran berhasil! Selamat datang di CampusBuddy.', 'success');
  bootApp();
});

/* ─────────────────────────────────────────────────────────────
   KEYBOARD ACCESSIBILITY
───────────────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    cancelConfirm();
  }
});

/* ─────────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initSession();
});
