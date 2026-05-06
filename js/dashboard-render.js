function renderHome(opName){
const nm=D.userName.split(' ')[0];
const isC=D.role==='caregiver';
const pn=D.onboarding?.patient_name||'Pasien';
const tm=D.todayMon;
let stats='';
if(D.opType==='cabg'){
stats=`<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#728BA9">SpO2</p><p class="text-4xl font-extrabold" style="color:#728BA9">${tm?.spo2??'--'}<span class="text-lg">%</span></p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Normal >= 95%</p></div>
<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#A3ACA0">Detak Jantung</p><p class="text-4xl font-extrabold" style="color:#5A6C7A">${tm?.heart_rate??'--'}<span class="text-lg" style="color:#A3ACA0"> bpm</span></p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Normal 60-100 bpm</p></div>
<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#A3ACA0">Nyeri Dada</p><p class="text-4xl font-extrabold" style="color:#5A6C7A">${tm?.pain_level??'--'}<span class="text-lg" style="color:#A3ACA0">/10</span></p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Ringan &lt; 3</p></div>`;
}else if(D.opType==='sc'){
stats=`<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#728BA9">Suhu Tubuh</p><p class="text-4xl font-extrabold" style="color:#728BA9">${tm?.temp??'--'}<span class="text-lg">°C</span></p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Normal 36-37.5°C</p></div>
<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#A3ACA0">Volume Perdarahan</p><p class="text-2xl font-extrabold mt-2" style="color:#5A6C7A">${tm?.blood_volume||'--'}</p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Ganti pembalut 4-6 jam</p></div>
<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#A3ACA0">Nyeri</p><p class="text-4xl font-extrabold" style="color:#5A6C7A">${tm?.pain_level??'--'}<span class="text-lg" style="color:#A3ACA0">/10</span></p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Ringan &lt; 3</p></div>`;
}else{
stats=`<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#728BA9">Nyeri Area Operasi</p><p class="text-4xl font-extrabold" style="color:#728BA9">${tm?.stump_pain??'--'}<span class="text-lg">/10</span></p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Catat setiap perubahan</p></div>
<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#A3ACA0">Nyeri Sendi</p><p class="text-4xl font-extrabold" style="color:#5A6C7A">${tm?.phantom_pain??'--'}<span class="text-lg" style="color:#A3ACA0">/10</span></p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Ideal &lt; 3</p></div>
<div class="glass-card p-6"><p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:#A3ACA0">Kondisi Luka</p><p class="text-xl font-extrabold mt-2" style="color:#5A6C7A">${tm?.wound_color||'--'}</p><p class="text-xs font-medium mt-1" style="color:#A3ACA0">Periksa pagi & malam</p></div>`;
}
const roleBadge=isC?`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border tracking-wider" style="background:#ECF2E6;color:#5A6C7A;border-color:#D1D9CA;">Caregiver</span>`:`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border tracking-wider" style="background:#F8FCFF;color:#728BA9;border-color:#DAE3EC;">Pasien</span>`;
const banner=!tm?`<a href="?page=monitoring" class="flex items-center gap-4 p-5 mb-6 rounded-2xl border transition-all group" style="background:rgba(114,139,169,0.07);border-color:#DAE3EC;"><div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background:#ECF2E6;"><svg class="w-6 h-6" fill="none" stroke="#728BA9" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div><div class="flex-1"><p class="font-extrabold" style="color:#5A6C7A;">Anda belum mengisi log pemantauan hari ini!</p><p class="text-sm font-medium mt-0.5" style="color:#7F8A83;">Data kesehatan belum tercatat.</p></div><span class="px-4 py-2 rounded-full text-white font-bold text-sm shrink-0" style="background:#728BA9;">Isi Sekarang &rarr;</span></a>`
:`<div class="flex items-center gap-4 p-5 mb-6 rounded-2xl border" style="background:#ECF2E6;border-color:#D1D9CA;"><div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background:#D1D9CA;"><svg class="w-6 h-6" fill="none" stroke="#728BA9" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg></div><div><p class="font-extrabold" style="color:#5A6C7A;">Log pemantauan hari ini sudah terisi!</p><p class="text-sm font-medium mt-0.5" style="color:#A3ACA0;">Data Anda sudah tercatat.</p></div></div>`;
const cl=CHECKLIST[D.opType]?.[D.role]||CHECKLIST.cabg.pasien;
const checklistHtml=cl.map(c=>`<li class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/50 transition-all"><input type="checkbox" class="w-5 h-5 task-checkbox shrink-0"><span class="text-sm font-medium" style="color:#5A6C7A;">${esc(c)}</span></li>`).join('');
const painToday=tm?.pain_level??tm?.stump_pain??null;
const trendData=[7,5,4,painToday??3];const trendLabels=['3h lalu','2h lalu','Kemarin','Hari ini'];
const trendBars=trendData.map((v,i)=>`<div class="flex-1 flex flex-col items-center gap-2"><span class="text-xs font-extrabold" style="color:#5A6C7A;">${v}</span><div class="w-full rounded-t-lg" style="height:${Math.max(16,(v/10)*90)}px;background:${i===3?'#728BA9':'#DAE3EC'};"></div><span class="text-[10px] font-bold text-center leading-tight" style="color:#A3ACA0;">${trendLabels[i]}</span></div>`).join('');
let painMsg='Belum ada data hari ini';
if(painToday!==null&&painToday<=3)painMsg='<span style="color:#728BA9;font-weight:700;">Nyeri ringan</span> — batas normal';
else if(painToday!==null&&painToday<=6)painMsg='<span style="color:#A3ACA0;font-weight:700;">Nyeri sedang</span> — pantau lebih ketat';
else if(painToday!==null)painMsg='<span style="color:#5A6C7A;font-weight:700;">Nyeri berat</span> — hubungi dokter';
return `<div class="w-full">
<div class="mb-8"><div class="flex items-center gap-3 mb-2"><p class="text-xs font-bold uppercase tracking-widest" style="color:#A3ACA0;">${new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>${roleBadge}</div>
<h2 class="text-3xl font-extrabold" style="color:#728BA9;">Halo, ${esc(nm)}</h2>
<p class="font-medium mt-1" style="color:#7F7F7F;">${isC?'Memantau <strong style="color:#728BA9;">'+esc(pn)+'</strong> — ':''}Hari ke-<strong style="color:#728BA9;">${D.dayPostOp}</strong> pasca operasi ${opName}</p></div>
${banner}
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">${stats}</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div class="lg:col-span-2 glass-card p-8"><div class="flex items-center justify-between mb-4"><h3 class="font-extrabold text-lg" style="color:#5A6C7A;">${isC?'Checklist Pasien Hari Ini':'Recovery Hari Ini'}</h3><span class="text-sm font-bold task-progress-text" style="color:#728BA9;">0%</span></div><div class="w-full rounded-full h-2.5 mb-6" style="background:rgba(218,227,236,0.6);"><div class="task-progress-bar h-2.5 rounded-full transition-all duration-500" style="width:0%;background:#728BA9;"></div></div><ul class="space-y-2">${checklistHtml}</ul></div>
<div class="glass-card p-8 flex flex-col"><h3 class="font-extrabold text-lg mb-1" style="color:#5A6C7A;">Tren Nyeri</h3><p class="text-xs font-medium mb-6" style="color:#A3ACA0;">Riwayat 3 hari terakhir</p><div class="flex-1 flex items-end gap-3">${trendBars}</div><p class="text-xs font-medium mt-4 pt-3" style="border-top:1px solid rgba(218,227,236,0.5);color:#A3ACA0;">${painMsg}</p><a href="?page=monitoring" class="mt-4 block text-center py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5" style="background:#728BA9;">+ Catat Sekarang</a></div>
</div></div>`;
}

function renderProfile(opName){
const o=D.onboarding;if(!o)return '<p>No profile data.</p>';
return `<div class="w-full max-w-2xl"><h2 class="text-3xl font-extrabold mb-6" style="color:#728BA9;">Profil Pemulihan</h2>
<div class="glass-card p-8 mb-6"><div class="flex items-center gap-5 mb-6"><div class="w-20 h-20 bg-[#ECF2E6] text-[#728BA9] rounded-full flex items-center justify-center text-3xl font-extrabold">${(o.full_name||'?')[0].toUpperCase()}</div><div><h3 class="text-2xl font-bold" style="color:#5A6C7A;">${esc(o.full_name||'')}</h3><p class="text-sm font-bold uppercase tracking-wider" style="color:#A3ACA0;">${o.role==='pasien'?'Pasien':'Caregiver'} — ${opName}</p></div></div>
<div class="space-y-4 text-sm">
<div class="flex justify-between py-2 border-b border-[#DAE3EC]"><span class="font-bold" style="color:#728BA9;">Tanggal Operasi</span><span style="color:#5A6C7A;">${o.surgery_date||'-'}</span></div>
<div class="flex justify-between py-2 border-b border-[#DAE3EC]"><span class="font-bold" style="color:#728BA9;">Hari Pemulihan</span><span style="color:#5A6C7A;">Hari ke-${D.dayPostOp}</span></div>
<div class="flex justify-between py-2 border-b border-[#DAE3EC]"><span class="font-bold" style="color:#728BA9;">Mobilitas Awal</span><span style="color:#5A6C7A;">${o.mobility||'-'}</span></div>
${o.role==='caregiver'?`<div class="flex justify-between py-2 border-b border-[#DAE3EC]"><span class="font-bold" style="color:#728BA9;">Nama Pasien</span><span style="color:#5A6C7A;">${esc(o.patient_name||'-')}</span></div>`:''}
</div></div>
<div class="flex gap-3">
<a href="/onboarding.html?edit=1" class="flex-1 py-3 text-center rounded-2xl font-bold text-white text-sm" style="background:#728BA9;">Edit Profil</a>
<button onclick="deleteProfile()" class="flex-1 py-3 text-center rounded-2xl font-bold text-sm border-2" style="color:#D46A6A;border-color:#D46A6A;">Hapus Profil</button>
<a href="/onboarding.html" class="flex-1 py-3 text-center rounded-2xl font-bold text-sm border-2" style="color:#728BA9;border-color:#DAE3EC;">Ganti Profil</a>
</div></div>`;
}

function renderContent(opName){
const vids=CONTENT_LIBRARY[D.opType]||CONTENT_LIBRARY.cabg;
return `<div class="w-full"><div class="mb-8"><p class="text-xs font-bold uppercase tracking-widest mb-1" style="color:#A3ACA0;">Protokol: ${opName}</p><h2 class="text-3xl font-extrabold" style="color:#728BA9;">Perpustakaan Konten</h2><p class="font-medium mt-1" style="color:#7F8A83;">Video edukasi dan panduan untuk pemulihan Anda.</p></div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-5">${vids.map(v=>`<div class="glass-card overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all" onclick="openVideoModal('${v.vid}','${esc(v.title)}')">
<div class="aspect-video bg-[#DAE3EC] relative flex items-center justify-center"><img src="https://img.youtube.com/vi/${v.vid}/mqdefault.jpg" class="w-full h-full object-cover" alt="${esc(v.title)}"><div class="absolute inset-0 bg-black/20 flex items-center justify-center"><div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><svg class="w-6 h-6 ml-1" fill="#728BA9" viewBox="0 0 24 24"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></svg></div></div></div>
<div class="p-5"><span class="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full" style="background:#ECF2E6;color:#728BA9;">${v.cat}</span><h3 class="font-extrabold mt-2 text-base" style="color:#5A6C7A;">${esc(v.title)}</h3><p class="text-xs font-medium mt-1 leading-relaxed" style="color:#7F8A83;">${esc(v.desc)}</p></div></div>`).join('')}</div></div>`;
}

window.deleteProfile=async()=>{if(!confirm('Hapus profil ini?'))return;await _supabase.from('user_onboarding').delete().eq('id',D.profileId);sessionStorage.removeItem('active_profile_id');window.location.href='/onboarding.html';};
