// Dashboard Render Part 2: Roadmap, Monitoring, WoundLog

function renderRoadmap(opName){
const phases=PHASES[D.opType]||PHASES.cabg;
let ci=0;phases.forEach((p,i)=>{if(D.dayPostOp>=p.days[0]&&D.dayPostOp<=p.days[1])ci=i;});
const pct=Math.round((ci/Math.max(1,phases.length-1))*100);
const stepperDots=phases.map((p,i)=>{
const done=D.dayPostOp>p.days[1],cur=i===ci;
const bg=done?'#5A6C7A':cur?'#728BA9':'#DAE3EC';
const clr=(done||cur)?'#fff':'#A3ACA0';
const glow=cur?'box-shadow:0 0 0 4px rgba(114,139,169,0.25);':'';
return `<div class="flex flex-col items-center flex-1"><button onclick="openPhaseModal(${i})" class="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm transition-all hover:scale-110 shadow-md mb-2" style="background:${bg};color:${clr};${glow}">${done?'&#10003;':i+1}</button><p class="text-xs font-extrabold text-center leading-tight" style="color:${cur?'#728BA9':done?'#5A6C7A':'#A3ACA0'};max-width:72px;">${p.name}</p><p class="text-[10px] text-center font-medium mt-0.5 opacity-60" style="color:#A3ACA0;">${p.range}</p></div>`;
}).join('');
const cards=phases.map((p,i)=>{
const done=D.dayPostOp>p.days[1],cur=i===ci;
const barC=done?'#B8C9DD':cur?'#728BA9':'#DAE3EC';
const dotC=done?'#5A6C7A':cur?'#728BA9':'#A3ACA0';
const cBorder=cur?'box-shadow:0 0 0 2px #728BA9,0 8px 32px rgba(114,139,169,0.15);':'';
const statusLbl=done?'&#10003; Selesai':cur?'&#9654; Anda Di Sini':'&#8635; Akan Datang';
return `<button onclick="openPhaseModal(${i})" class="text-left glass-card overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer" style="${cBorder}">
<div class="h-1.5" style="background:${barC};"></div><div class="p-6">
<div class="flex items-start justify-between mb-3"><div><div class="flex items-center gap-2 mb-2"><div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white" style="background:${dotC};">${i+1}</div><span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full" style="background:${cur?'#ECF2E6':'#F0F3F7'};color:${cur?'#728BA9':'#A3ACA0'};">${p.badge}</span></div>
<h3 class="font-extrabold text-lg" style="color:#5A6C7A;">${p.name}</h3><p class="text-xs font-bold mt-0.5" style="color:#A3ACA0;">${p.range}</p></div></div>
<p class="text-xs font-medium leading-relaxed mb-4" style="color:#7F8A83;">${p.desc}</p>
<div class="space-y-1.5 mb-4">${p.goals.slice(0,2).map(g=>`<div class="flex items-center gap-2 text-xs font-medium" style="color:#5A6C7A;"><div class="w-1.5 h-1.5 rounded-full" style="background:${dotC};"></div>${esc(g)}</div>`).join('')}${p.goals.length>2?`<p class="text-xs font-medium mt-1" style="color:#A3ACA0;">+${p.goals.length-2} target lainnya...</p>`:''}</div>
<div class="flex items-center justify-between pt-3" style="border-top:1px solid rgba(218,227,236,0.6);"><span class="text-xs font-bold" style="color:${dotC};">${statusLbl}</span><span class="text-xs font-bold" style="color:#728BA9;">Lihat Detail &rsaquo;</span></div>
</div></button>`;
}).join('');
const curPhase=phases[ci];
const acts=curPhase.activities.slice(0,4).map((a,idx)=>`<div class="flex items-center gap-2.5 rounded-xl px-3 py-2.5" style="background:rgba(255,255,255,0.85);"><div class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-extrabold text-xs text-white" style="background:#728BA9;">${idx+1}</div><div><p class="text-xs font-extrabold leading-snug" style="color:#5A6C7A;">${esc(a[0])}</p><p class="text-[10px] font-medium" style="color:#A3ACA0;">${esc(a[1])}</p></div></div>`).join('');
return `<div id="phase-modal" class="hidden fixed inset-0 z-[95] items-center justify-center p-4" style="background:rgba(90,108,122,0.6);backdrop-filter:blur(6px);"><div class="rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative" style="background:#F8FCFF;" id="phase-modal-content"></div></div>
<div class="w-full"><div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"><div><p class="text-xs font-bold uppercase tracking-widest mb-1" style="color:#A3ACA0;">Protokol: ${opName}</p><h2 class="text-3xl font-extrabold" style="color:#728BA9;">Roadmap Pemulihan</h2><p class="font-medium mt-1" style="color:#7F8A83;">Anda berada di <strong style="color:#728BA9;">Hari ke-${D.dayPostOp}</strong> &mdash; ${curPhase.name}</p></div></div>
<div class="glass-card p-6 mb-6"><div class="flex items-center justify-between mb-3"><p class="text-xs font-extrabold uppercase tracking-wider" style="color:#A3ACA0;">Progress Pemulihan</p><span class="text-sm font-extrabold" style="color:#728BA9;">${pct}% fase selesai</span></div><div class="w-full rounded-full h-2 mb-7" style="background:#DAE3EC;"><div class="h-2 rounded-full" style="width:${pct}%;background:linear-gradient(90deg,#728BA9,#B8C9DD);"></div></div><div class="relative"><div class="absolute top-5 left-0 right-0 h-px mx-10" style="background:#DAE3EC;"></div><div class="flex justify-between relative z-10">${stepperDots}</div></div></div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">${cards}</div>
<div class="glass-card p-6"><div class="rounded-2xl p-4" style="background:rgba(114,139,169,0.07);border:1px solid #DAE3EC;"><p class="text-xs font-extrabold uppercase tracking-wider mb-3" style="color:#728BA9;">Prioritas Hari ke-${D.dayPostOp} &mdash; ${curPhase.name}</p><div class="grid grid-cols-1 md:grid-cols-2 gap-2">${acts}</div><button onclick="openPhaseModal(${ci})" class="mt-3 w-full py-2 rounded-xl text-xs font-extrabold text-white" style="background:#728BA9;">Lihat Semua Aktivitas &rarr;</button></div></div></div>`;
}

window.openPhaseModal=function(idx){
const phases=PHASES[D.opType]||PHASES.cabg;const p=phases[idx];if(!p)return;
const modal=document.getElementById('phase-modal');
const content=document.getElementById('phase-modal-content');
content.innerHTML=`<div class="px-8 pt-7 pb-5 sticky top-0 rounded-t-3xl z-10" style="background:#F8FCFF;border-bottom:1px solid #DAE3EC;">
<button onclick="document.getElementById('phase-modal').classList.add('hidden');document.getElementById('phase-modal').classList.remove('flex');" class="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style="background:#DAE3EC;color:#5A6C7A;">&times;</button>
<span class="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full" style="background:#ECF2E6;color:#728BA9;">${p.badge}</span>
<h3 class="text-2xl font-extrabold mt-2" style="color:#5A6C7A;">${p.name}</h3>
<p class="text-sm font-bold mt-0.5" style="color:#A3ACA0;">${p.range}</p>
<p class="text-sm font-medium mt-2 leading-relaxed" style="color:#7F8A83;">${p.desc}</p></div>
<div class="px-8 py-6 space-y-6">
<div><p class="text-xs font-extrabold uppercase tracking-wider mb-3" style="color:#728BA9;">Target Fase Ini</p><ul class="space-y-2">${p.goals.map(g=>`<li class="flex items-center gap-2 text-sm font-medium" style="color:#5A6C7A;"><div class="w-2 h-2 rounded-full shrink-0" style="background:#728BA9;"></div>${esc(g)}</li>`).join('')}</ul></div>
<div><p class="text-xs font-extrabold uppercase tracking-wider mb-3" style="color:#728BA9;">Aktivitas Wajib</p><div class="space-y-2">${p.activities.map(a=>`<div class="flex items-center justify-between rounded-xl px-4 py-3" style="background:rgba(255,255,255,0.8);"><span class="text-sm font-medium" style="color:#5A6C7A;">${esc(a[0])}</span><span class="text-xs font-bold" style="color:#A3ACA0;">${esc(a[1])}</span></div>`).join('')}</div></div>
<div><p class="text-xs font-extrabold uppercase tracking-wider mb-3" style="color:#5A6C7A;">Larangan</p><ul class="space-y-2">${p.restrictions.map(r=>`<li class="flex items-center gap-2 text-sm font-medium" style="color:#5A6C7A;"><span style="color:#D46A6A;">&#10005;</span>${esc(r)}</li>`).join('')}</ul></div>
<div class="rounded-2xl p-5" style="background:rgba(114,139,169,0.08);border:1.5px solid #B8C9DD;"><p class="text-xs font-extrabold uppercase tracking-wider mb-3" style="color:#5A6C7A;">Tanda Bahaya</p><ul class="space-y-2">${p.warning.map(w=>`<li class="flex items-center gap-2 text-sm font-medium" style="color:#5A6C7A;"><svg class="w-4 h-4 shrink-0" fill="none" stroke="#728BA9" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>${esc(w)}</li>`).join('')}</ul></div>
${p.vid?`<button onclick="openVideoModal('${p.vid}','${esc(p.vtitle)}')" class="w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 text-white" style="background:#728BA9;"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></svg>${esc(p.vtitle)}</button>`:''}
</div>`;
modal.classList.remove('hidden');modal.classList.add('flex');
};

function renderMonitoring(opName){
const tm=D.todayMon;
if(tm)return `<div class="w-full max-w-2xl"><h2 class="text-3xl font-extrabold mb-2" style="color:#728BA9;">Monitoring Harian</h2><p class="font-medium mb-6" style="color:#7F8A83;">Data hari ini sudah tercatat.</p>
<div class="glass-card p-8 mb-6"><div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-full flex items-center justify-center" style="background:#D1D9CA;"><svg class="w-5 h-5" fill="none" stroke="#728BA9" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg></div><p class="font-extrabold" style="color:#5A6C7A;">Log hari ini tercatat</p></div>
<pre class="text-xs" style="color:#5A6C7A;white-space:pre-wrap;">${JSON.stringify(tm,null,2)}</pre></div>
<a href="?page=home" class="inline-block px-6 py-3 rounded-2xl font-bold text-white text-sm" style="background:#728BA9;">&larr; Kembali ke Home</a></div>`;
let fields='';
if(D.opType==='cabg')fields=`
<div class="space-y-5">
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">SpO2 (%)</label><input type="number" name="spo2" min="0" max="100" placeholder="contoh: 97" class="w-full px-4 py-3 rounded-xl border-2 border-[#DAE3EC] focus:border-[#728BA9] focus:outline-none text-[#5A6C7A]"></div>
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Detak Jantung (bpm)</label><input type="number" name="heart_rate" min="0" max="250" placeholder="contoh: 78" class="w-full px-4 py-3 rounded-xl border-2 border-[#DAE3EC] focus:border-[#728BA9] focus:outline-none text-[#5A6C7A]"></div>
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Nyeri Dada (0-10)</label><input type="number" name="pain_level" min="0" max="10" placeholder="0" class="w-full px-4 py-3 rounded-xl border-2 border-[#DAE3EC] focus:border-[#728BA9] focus:outline-none text-[#5A6C7A]"></div></div>`;
else if(D.opType==='sc')fields=`
<div class="space-y-5">
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Suhu Tubuh (°C)</label><input type="number" name="temp" step="0.1" min="35" max="42" placeholder="36.5" class="w-full px-4 py-3 rounded-xl border-2 border-[#DAE3EC] focus:border-[#728BA9] focus:outline-none text-[#5A6C7A]"></div>
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Volume Perdarahan</label><div class="grid grid-cols-3 gap-2 radio-card">${['Sedikit','Sedang','Banyak'].map(v=>`<div><input type="radio" name="blood_volume" value="${v}" id="bv_${v}"><label for="bv_${v}">${v}</label></div>`).join('')}</div></div>
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Nyeri (0-10)</label><input type="number" name="pain_level" min="0" max="10" placeholder="0" class="w-full px-4 py-3 rounded-xl border-2 border-[#DAE3EC] focus:border-[#728BA9] focus:outline-none text-[#5A6C7A]"></div></div>`;
else fields=`
<div class="space-y-5">
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Nyeri Area Operasi (0-10)</label><input type="number" name="stump_pain" min="0" max="10" placeholder="0" class="w-full px-4 py-3 rounded-xl border-2 border-[#DAE3EC] focus:border-[#728BA9] focus:outline-none text-[#5A6C7A]"></div>
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Nyeri Sendi (0-10)</label><input type="number" name="phantom_pain" min="0" max="10" placeholder="0" class="w-full px-4 py-3 rounded-xl border-2 border-[#DAE3EC] focus:border-[#728BA9] focus:outline-none text-[#5A6C7A]"></div>
<div><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Kondisi Luka</label><div class="grid grid-cols-3 gap-2 radio-card">${['Merah muda','Pucat','Gelap'].map(v=>`<div><input type="radio" name="wound_color" value="${v}" id="wc_${v.replace(/\s/g,'')}"><label for="wc_${v.replace(/\s/g,'')}">${v}</label></div>`).join('')}</div></div></div>`;
return `<div class="w-full max-w-2xl"><h2 class="text-3xl font-extrabold mb-2" style="color:#728BA9;">Monitoring Harian</h2><p class="font-medium mb-6" style="color:#7F8A83;">Catat kondisi kesehatan Anda hari ini.</p>
<form id="monitoring-form" class="glass-card p-8">${fields}
<button type="submit" class="mt-8 w-full py-3.5 rounded-2xl font-extrabold text-white text-lg" style="background:#728BA9;">Simpan Monitoring</button></form></div>`;
}

function renderWoundLog(){
const history=D.woundHistory.map(w=>`<div class="glass-card p-5 mb-3"><div class="flex items-center justify-between mb-2"><span class="text-sm font-bold" style="color:#728BA9;">${w.record_date}</span><span class="text-xs font-bold px-2.5 py-1 rounded-full" style="background:#ECF2E6;color:#5A6C7A;">${w.status||'Normal'}</span></div>
${w.image_url?`<img src="${w.image_url}" class="w-full h-40 object-cover rounded-xl mb-3" alt="wound">`:''}
<div class="text-xs space-y-1" style="color:#5A6C7A;">${w.note?`<p>${esc(w.note)}</p>`:''}</div></div>`).join('')||'<p class="text-sm" style="color:#A3ACA0;">Belum ada data wound log.</p>';
return `<div class="w-full max-w-2xl"><h2 class="text-3xl font-extrabold mb-2" style="color:#728BA9;">Wound Log</h2><p class="font-medium mb-6" style="color:#7F8A83;">Dokumentasi kondisi luka Anda.</p>
<div class="glass-card p-8 mb-6"><h3 class="font-extrabold mb-4" style="color:#5A6C7A;">Upload Foto Luka</h3>
<form id="wound-form"><div class="mb-4"><input type="file" id="wound-photo" accept="image/*" capture="environment" class="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#ECF2E6] file:text-[#728BA9] hover:file:bg-[#DAE3EC]"></div>
<div id="wound-preview" class="hidden mb-4"><img id="wound-img" class="w-full h-48 object-cover rounded-xl" alt="preview"></div>
<div class="mb-4"><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Catatan</label><textarea name="note" rows="2" placeholder="Catatan tentang kondisi luka..." class="w-full px-4 py-3 rounded-xl border-2 border-[#DAE3EC] focus:border-[#728BA9] focus:outline-none text-[#5A6C7A] resize-none"></textarea></div>
<div class="mb-4"><label class="block text-sm font-bold mb-2" style="color:#728BA9;">Status</label><div class="grid grid-cols-3 gap-2 radio-card">${['Normal','Perhatian','Darurat'].map(v=>`<div><input type="radio" name="status" value="${v}" id="ws_${v}" ${v==='Normal'?'checked':''}><label for="ws_${v}">${v}</label></div>`).join('')}</div></div>
<button type="submit" class="w-full py-3.5 rounded-2xl font-extrabold text-white text-lg" style="background:#728BA9;">Simpan Wound Log</button></form></div>
<h3 class="font-extrabold mb-4" style="color:#5A6C7A;">Riwayat</h3>${history}</div>`;
}
