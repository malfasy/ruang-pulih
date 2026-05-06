const PHASES = {
cabg: [
{id:'p1',name:'Fase Akut',range:'Hari 1 s/d 7',days:[1,7],badge:'Kritis - Rawat Ketat',
desc:'Fase paling krusial. Tubuh belum stabil - fokus pada pemulihan luka, stabilitas pernapasan, dan pencegahan komplikasi.',
goals:['SpO2 stabil >= 95%','Nyeri dada terkontrol < 5/10','Tidak ada tanda infeksi luka','Mobilisasi bertahap dimulai'],
activities:[['Latihan pernapasan dalam 5-10 rep/jam','Pagi & Siang'],['Batuk efektif 2-3x (tahan dada bantal)','Pagi & Siang'],['Duduk di tepi tempat tidur 15 menit','Siang'],['Cek SpO2 dan catat di Monitoring','Pagi & Malam'],['Minum obat sesuai jadwal dokter','Pagi, Siang, Malam'],['Tidur posisi semi-fowler (30-45)','Malam']],
restrictions:['Tidak angkat beban > 1 kg','Tidak mengemudi','Tidak aktivitas fisik berat','Tidak menekan area luka dada'],
warning:['SpO2 < 92% segera hubungi dokter','Demam > 38C lebih dari 2 hari','Luka kemerahan, bengkak, atau mengeluarkan cairan','Nyeri dada seperti tertindih batu'],
vid:'hz4bgO-Smk0',vtitle:'Latihan Pernapasan Pasca CABG'},
{id:'p2',name:'Fase Mobilisasi',range:'Hari 8 s/d 21',days:[8,21],badge:'Progresif - Gerak Bertahap',
desc:'Mulai meningkatkan aktivitas secara bertahap. Luka mulai menutup, tubuh beradaptasi.',
goals:['Jalan kaki 5-10 menit tanpa henti','Naik 1 lantai tangga (hari ke-14+)','Luka dada mulai kering dan menutup','Tidur nyenyak minimal 7 jam'],
activities:[['Jalan kaki 5 menit pagi dan sore','Pagi & Sore'],['Latihan pernapasan dalam 3-5x/hari','Pagi & Sore'],['Mandi sendiri dengan bantuan minimal','Pagi'],['Duduk makan di meja (bukan di kasur)','Siang'],['Pantau detak jantung setelah jalan kaki','Siang'],['Kurangi obat nyeri jika sudah tolerable','Konsultasi dokter']],
restrictions:['Tidak angkat beban > 2-3 kg','Tidak mengemudi kendaraan','Tidak berenang atau olahraga berat','Tidak push-up atau gerakan dada ekstrem'],
warning:['Sesak napas setelah jalan kaki pendek','Detak jantung > 120 bpm saat istirahat','Pembengkakan di kaki atau pergelangan','Nyeri di betis (tanda trombosis)'],
vid:'sAx8_UXak1Q',vtitle:'Olahraga Pasca Operasi Jantung'},
{id:'p3',name:'Fase Rehabilitasi',range:'Hari 22 s/d 56',days:[22,56],badge:'Pemulihan Aktif',
desc:'Program rehabilitasi jantung terstruktur. Aktivitas harian meningkat signifikan.',
goals:['Jalan kaki 20-30 menit per hari','Kembali aktivitas ringan di rumah','Kontrol ekokardiografi (EKG)','Mandiri penuh tanpa bantuan'],
activities:[['Jalan kaki 20-30 menit 5x/minggu','Pagi'],['Latihan aerobik ringan (sepeda statis)','Siang (hari ke-35+)'],['Kontrol ke poliklinik jantung','Sesuai jadwal'],['EKG dan lab darah rutin','Jadwal dokter'],['Pola makan jantung sehat','Setiap hari'],['Berhenti merokok sepenuhnya','Permanen']],
restrictions:['Tidak mengangkat beban > 5 kg','Tidak olahraga kontak fisik','Tidak alkohol','Konsultasi dokter untuk hubungan seksual'],
warning:['Nyeri dada tiba-tiba saat aktivitas','Pusing atau pingsan','Irama jantung tidak teratur','Sesak napas saat berbaring'],
vid:'ZibrJpra3FA',vtitle:'Rehabilitasi Jantung Fase I'},
{id:'p4',name:'Pemulihan Penuh',range:'Hari 57+',days:[57,999],badge:'Kembali Normal',
desc:'Mayoritas pasien dapat kembali ke aktivitas normal termasuk kerja ringan.',
goals:['Kembali bekerja (ringan)','Olahraga teratur 150 menit/minggu','Berat badan ideal','Kolesterol dan tekanan darah terkontrol'],
activities:[['Olahraga 30 menit/hari','Pagi'],['Diet jantung sehat seumur hidup','Setiap hari'],['Kontrol dokter berkala (3-6 bulan)','Rutin'],['Cek tekanan darah dan gula darah','Bulanan'],['Kelola stres (meditasi)','Setiap hari'],['Patuh obat jangka panjang','Seumur hidup']],
restrictions:['Hindari merokok selamanya','Batasi garam dan lemak jenuh','Kontrol stres berlebihan','Konsultasi sebelum aktivitas intens baru'],
warning:['Nyeri dada atau sesak tanpa sebab','Tekanan darah tidak terkontrol','Kadar gula darah melonjak','Berhenti minum obat tanpa izin dokter'],
vid:null,vtitle:''}
],
sc: [
{id:'p1',name:'Fase Pasca Operasi',range:'Hari 1 s/d 3',days:[1,3],badge:'Masa Kritis',
desc:'Periode paling awal setelah operasi SC. Fokus pada manajemen nyeri, pemantauan perdarahan, dan mobilisasi dini.',
goals:['Bisa duduk sendiri dari kasur','Perdarahan terkontrol','Nyeri < 5/10 dengan obat','Mulai menyusui / pompa ASI'],
activities:[['Mobilisasi dini: duduk perlahan','Pagi hari ke-2'],['Menyusui / pompa ASI setiap 2-3 jam','Sepanjang hari'],['Pantau volume dan warna perdarahan','Setiap ganti pembalut'],['Minum air putih 8 gelas/hari','Sepanjang hari'],['Minum obat analgesik sesuai resep','Pagi, Siang, Malam'],['Periksa luka SC di cermin','Pagi & Malam']],
restrictions:['Tidak berdiri terlalu lama (> 10 mnt)','Tidak angkat beban > 2 kg','Tidak membasahi luka operasi','Tidak hubungan seksual'],
warning:['Perdarahan sangat banyak','Demam > 38.5C','Luka SC terbuka atau bernanah','Nyeri tidak berkurang dengan obat'],
vid:'KG_SsDOfwpI',vtitle:'Perawatan Luka Caesar'},
{id:'p2',name:'Fase Penyembuhan Luka',range:'Hari 4 s/d 14',days:[4,14],badge:'Pemulihan Awal',
desc:'Luka jahitan mulai menutup. Perdarahan berkurang menjadi flek coklat.',
goals:['Bisa berdiri dan berjalan mandiri','Perdarahan berubah coklat/kuning','Luka SC kering','ASI mulai lancar'],
activities:[['Berjalan mandiri di dalam rumah','Pagi & Sore'],['Mandi dengan hati-hati','Pagi'],['Lanjutkan menyusui/pompa ASI','Setiap 2-3 jam'],['Makanan bergizi tinggi protein','Setiap makan'],['Senam kegel','Pagi & Malam'],['Konsultasi dokter kandungan','Hari ke-7 s/d 10']],
restrictions:['Tidak angkat beban > 3 kg','Tidak naik tangga berulang','Tidak berendam','Tidak olahraga berat'],
warning:['Luka SC kemerahan atau bengkak','Suhu > 38C lebih dari 2 hari','Bau tidak sedap dari luka','Perdarahan merah segar kembali'],
vid:'P7hrkSlr3vo',vtitle:'4 Tips Cepat Pulih Pasca SC'},
{id:'p3',name:'Fase Pemulihan',range:'Hari 15 s/d 42',days:[15,42],badge:'Kembali Aktif',
desc:'Luka sudah menutup sempurna. Aktivitas fisik meningkat secara progresif.',
goals:['Luka SC menutup sempurna','Bisa merawat bayi mandiri','Mulai olahraga ringan','Kembali ke rutinitas ringan'],
activities:[['Jalan kaki 10-20 menit','Pagi'],['Senam nifas / yoga','Siang'],['Pola makan bergizi','Setiap hari'],['Konsultasi laktasi','Jika diperlukan'],['Kontrol kandungan','Hari ke-28 s/d 42'],['Kelola stres dan baby blues','Setiap hari']],
restrictions:['Tidak sit-up atau plank','Tidak berlari/melompat','Tidak berjemur luka','Tidak berhubungan seksual (< 6 minggu)'],
warning:['Demam tinggi mendadak','Nyeri panggul tidak normal','Perdarahan berat setelah bercak ringan','Tanda depresi pasca melahirkan'],
vid:'c3NRSqZooyk',vtitle:'Tips Cepat Pulih Pasca Sesar'},
{id:'p4',name:'Pemulihan Penuh',range:'Hari 43+',days:[43,999],badge:'Pulih Sepenuhnya',
desc:'Tubuh sudah pulih. Bekas luka semakin memudar.',
goals:['Bekas luka memudar dan rata','Kembali bekerja','Olahraga reguler 3-4x/minggu','Konsultasi KB'],
activities:[['Olahraga aerobik moderat','Bebas'],['Latihan kekuatan core','Pagi'],['Gunakan krim bekas luka','Pagi & Malam'],['Kontrol kandungan 3 bulanan','Rutin'],['Diskusi rencana kehamilan','Dengan dokter'],['Pertahankan pola makan sehat','Setiap hari']],
restrictions:['Jarak kehamilan min 18-24 bulan','Konsultasi sebelum olahraga intens','Pantau tekanan darah','Perhatikan bekas luka'],
warning:['Nyeri hebat di area bekas SC','Perdarahan tidak normal','Tanda infeksi terlambat','Tekanan darah tidak stabil'],
vid:null,vtitle:''}
],
orthopedic: [
{id:'p1',name:'Fase Imobilisasi',range:'Hari 1 s/d 7',days:[1,7],badge:'Istirahat Total',
desc:'Area operasi harus diistirahatkan. Fokus pada manajemen nyeri dan pencegahan infeksi.',
goals:['Nyeri < 5/10 dengan obat','Luka tidak infeksi','Posisi tubuh benar','Mobilisasi ke kamar mandi dengan alat bantu'],
activities:[['Periksa luka/perban','Pagi & Malam'],['Latihan isometrik ringan','Setiap 2 jam'],['Posisi rebahan sesuai instruksi','Sepanjang hari'],['Minum obat analgesik','Pagi, Siang, Malam'],['Kompres dingin di area bengkak','3x/hari'],['Pantau sirkulasi','Setiap 4 jam']],
restrictions:['Tidak menumpu berat badan penuh','Tidak putar sendi operasi','Tidak basahi gips/luka','Tidak duduk kursi rendah'],
warning:['Jari bengkak atau biru/pucat','Nyeri tidak berkurang dengan obat','Demam > 38.5C','Luka mengeluarkan cairan berwarna/berbau'],
vid:'wch7bNy0EWE',vtitle:'Panduan Pasca Operasi Ortopedi'},
{id:'p2',name:'Rehabilitasi Awal',range:'Hari 8 s/d 21',days:[8,21],badge:'Mulai Bergerak',
desc:'Fisioterapi dimulai. Latihan gerak sendi (ROM) bertahap.',
goals:['Bisa berjalan dengan walker 5-10 mnt','ROM meningkat 20-30 derajat','Jahitan dilepas (hari ke-10-14)','Nyeri saat latihan < 4/10'],
activities:[['Latihan jalan dengan walker','Pagi & Sore'],['Gerak sendi ROM','Pagi & Sore'],['Kontrol poliklinik','Hari ke-10-14'],['Latihan penguatan otot','Setiap hari'],['Elevasi kaki','Saat istirahat'],['Ganti balutan luka','Sesuai instruksi']],
restrictions:['Tidak menumpu berat badan tanpa izin','Tidak memutar sendi berlebihan','Tidak berenang','Tidak naik tangga tanpa pegangan'],
warning:['Demam > 38C setelah jahitan dilepas','Sendi bengkak tiba-tiba','Nyeri hebat saat ROM','Mati rasa permanen'],
vid:'hWK3xL9WfQk',vtitle:'Cara Menggunakan Walker'},
{id:'p3',name:'Rehabilitasi Progresif',range:'Hari 22 s/d 56',days:[22,56],badge:'Kekuatan Meningkat',
desc:'Transisi dari walker ke tongkat atau jalan mandiri.',
goals:['Berjalan mandiri / dengan tongkat','ROM mendekati normal (>90)','Naik tangga dengan pegangan','Mandi dan berpakaian mandiri'],
activities:[['Latihan jalan 15-30 menit','Pagi & Sore'],['Latihan keseimbangan','Fisioterapi'],['Naik tangga (supervised)','Di bawah pengawasan'],['Penguatan otot resistance band','Fisioterapi'],['Kontrol ortopedi X-ray','Hari ke-28-42'],['Sepeda statis','Hari ke-35+']],
restrictions:['Tidak berlari','Tidak duduk bersila','Tidak mendaki tanpa bantuan','Tidak memaksakan ROM'],
warning:['Krepitasi baru pada sendi','Nyeri kembali parah','Sendi keluar posisi','Bengkak membesar setelah aktivitas'],
vid:'ZwjCz8gj82A',vtitle:'Cara Mandi Aman dengan Perban'},
{id:'p4',name:'Pemulihan Fungsional',range:'Hari 57+',days:[57,999],badge:'Kembali Normal',
desc:'Aktivitas normal hampir penuh. Pencegahan cedera ulang.',
goals:['Jalan normal tanpa alat bantu','ROM normal','Kembali bekerja','Olahraga ringan'],
activities:[['Olahraga renang/bersepeda 30 mnt','Pagi'],['Latihan fungsional','Fisioterapi'],['Kontrol ortopedi X-ray final','Hari ke-84-90'],['Kembali ke aktivitas kerja','Minggu ke-8+'],['Pertahankan berat badan ideal','Setiap hari'],['Gunakan alas kaki ergonomis','Setiap hari']],
restrictions:['Hindari olahraga kontak fisik','Hindari lompatan tinggi','Tidak duduk > 1 jam tanpa peregangan','Konsultasi sebelum olahraga kompetitif'],
warning:['Nyeri sendi kembali','Keterbatasan gerak tidak membaik','Tanda artritis awal','Sendi tidak stabil saat berjalan'],
vid:null,vtitle:''}
]
};

const RED_FLAGS = {
cabg: ['SpO2 di bawah 92% - hentikan semua aktivitas','Sesak napas tiba-tiba atau nyeri dada sangat berat','Detak jantung tidak teratur (>120 bpm)'],
sc: ['Perdarahan sangat banyak atau gumpalan darah besar','Demam tinggi di atas 38.5C','Luka terbuka atau mengeluarkan nanah berbau'],
orthopedic: ['Perdarahan aktif dari area operasi','Area luka merah, panas, membengkak luas','Nyeri tidak terkontrol meski sudah minum obat']
};

const OP_DISPLAY = {cabg:'Jantung (CABG)',sc:'Sectio Caesarea',orthopedic:'Ortopedi'};

const CHECKLIST = {
cabg:{pasien:['Latihan pernapasan dalam 5-10 repetisi per jam','Jalan kaki 5 menit dengan pendamping','Minum obat sesuai jadwal dokter','Batuk efektif 2-3x (tahan dada dengan bantal)','Catat tanda vital di menu Monitoring'],caregiver:['Pastikan pasien latihan pernapasan dalam (5-10 rep/jam)','Dampingi pasien jalan kaki 5 menit','Ingatkan pasien minum obat sesuai jadwal','Bantu pasien batuk efektif (tahan dada)','Catat tanda vital di menu Monitoring']},
sc:{pasien:['Mobilisasi ringan: duduk perlahan dari tempat tidur','Menyusui atau pompa ASI sesuai jadwal','Periksa luka SC di cermin','Minum obat pereda nyeri sesuai resep','Isi log monitoring harian'],caregiver:['Bantu pasien mobilisasi ringan','Ingatkan pasien menyusui / pompa ASI','Periksa luka SC pasien secara visual','Pastikan pasien minum obat pereda nyeri','Isi log monitoring harian']},
orthopedic:{pasien:['Posisi rebahan sesuai anjuran dokter','Latihan jalan dengan walker','Periksa kondisi luka/perban','Minum obat pereda nyeri','Isi log monitoring & foto luka'],caregiver:['Bantu pasien posisi rebahan sesuai anjuran','Dampingi latihan jalan dengan alat bantu','Periksa balutan luka','Ingatkan pasien minum obat','Isi log monitoring & foto luka']}
};

const CONTENT_LIBRARY = {
cabg:[
{title:'Latihan Pernapasan Dalam Pasca CABG',desc:'Teknik pernapasan diafragma untuk memperkuat kapasitas paru setelah operasi bypass jantung.',vid:'hz4bgO-Smk0',cat:'Latihan'},
{title:'Olahraga Ringan Pasca Operasi Jantung',desc:'Panduan aktivitas fisik aman untuk pasien jantung di fase mobilisasi.',vid:'sAx8_UXak1Q',cat:'Latihan'},
{title:'Rehabilitasi Jantung Fase I',desc:'Program rehabilitasi terstruktur untuk pemulihan fungsi jantung optimal.',vid:'ZibrJpra3FA',cat:'Edukasi'},
{title:'Pola Makan Sehat untuk Jantung',desc:'Nutrisi yang mendukung pemulihan dan kesehatan jantung jangka panjang.',vid:'URJP8R06w5Y',cat:'Nutrisi'}
],
sc:[
{title:'Perawatan Luka Caesar yang Benar',desc:'Cara merawat luka SC agar cepat kering dan terhindar dari infeksi.',vid:'KG_SsDOfwpI',cat:'Perawatan'},
{title:'4 Tips Cepat Pulih Pasca SC',desc:'Langkah praktis untuk mempercepat pemulihan setelah operasi sesar.',vid:'P7hrkSlr3vo',cat:'Tips'},
{title:'Tips Cepat Pulih Pasca Sesar',desc:'Panduan lengkap pemulihan pasca sesar dari ahli kebidanan.',vid:'c3NRSqZooyk',cat:'Edukasi'},
{title:'Senam Nifas Pasca Melahirkan',desc:'Gerakan aman untuk mengembalikan kekuatan otot dasar panggul.',vid:'JHRhz4sMx5c',cat:'Latihan'}
],
orthopedic:[
{title:'Panduan Pasca Operasi Ortopedi',desc:'Hal-hal yang harus diperhatikan setelah menjalani tindakan ortopedi.',vid:'wch7bNy0EWE',cat:'Edukasi'},
{title:'Cara Menggunakan Walker dengan Benar',desc:'Teknik berjalan aman menggunakan walker untuk pasien pasca operasi.',vid:'hWK3xL9WfQk',cat:'Latihan'},
{title:'Cara Mandi Aman dengan Perban/Gips',desc:'Tips menjaga kebersihan tubuh tanpa membasahi area operasi.',vid:'ZwjCz8gj82A',cat:'Tips'},
{title:'Latihan ROM Pasca Operasi',desc:'Latihan Range of Motion untuk mengembalikan fungsi sendi.',vid:'HNrzGVNL-Sw',cat:'Latihan'}
]
};
