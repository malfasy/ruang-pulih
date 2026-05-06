// ============================================================
// RuangPulih — Onboarding Logic (Supabase)
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    const session = await requireAuth();
    if (!session) return;
    const user = await getUser();

    let currentStep = 1;
    const totalSteps = 5;
    let allProfiles = [];
    let isEditMode = new URLSearchParams(window.location.search).has('edit');
    let editProfileId = sessionStorage.getItem('active_profile_id');

    const el = {
        navButtons: document.getElementById('nav-buttons'),
        btnNext: document.getElementById('btn-next'),
        btnPrev: document.getElementById('btn-prev'),
        btnSubmit: document.getElementById('btn-submit'),
        progressText: document.getElementById('current-step-text'),
        progressBar: document.getElementById('progress-bar'),
        surgeryDate: document.getElementById('surgeryDate'),
        dayCounter: document.getElementById('day-counter'),
        painSlider: document.getElementById('pain-slider'),
        painVal: document.getElementById('pain-val'),
        profileList: document.getElementById('profile-list'),
    };

    // Load existing profiles
    const { data: profiles } = await _supabase
        .from('user_onboarding')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: false });

    allProfiles = profiles || [];

    if (allProfiles.length > 0 && !isEditMode) {
        // Show profile selection (step 0)
        document.getElementById('step-0').style.display = 'block';
        document.getElementById('step-0').classList.add('active');
        document.getElementById('step-1').classList.remove('active');
        document.getElementById('step-1').style.display = 'none';
        el.navButtons.classList.add('hidden');
        currentStep = 0;

        let html = '';
        allProfiles.forEach(p => {
            html += `<div onclick="selectProfile(${p.id})" class="p-8 rounded-[16px] border-2 border-[#DAE3EC] hover:border-[#728BA9] hover:shadow-lg transition-all bg-white cursor-pointer relative group flex flex-col items-center text-center">
                <div class="w-20 h-20 bg-[#ECF2E6] text-[#728BA9] rounded-full flex items-center justify-center mb-4 text-3xl font-extrabold group-hover:scale-110 transition-transform">${(p.full_name||'?')[0].toUpperCase()}</div>
                <h3 class="text-2xl font-bold text-[#5A6C7A] mb-1">${p.full_name||''}</h3>
                <p class="text-sm font-bold text-[#A3ACA0] uppercase tracking-wider mb-2">${p.role==='pasien'?'Pasien':'Caregiver'} - ${(p.operation_type||'').toUpperCase()}</p>
                <span class="px-5 py-2 inline-block bg-[#F8FCFF] text-[#728BA9] rounded-full text-xs font-bold mt-4 group-hover:bg-[#728BA9] group-hover:text-white transition-colors shadow-sm">Lanjutkan &rarr;</span>
            </div>`;
        });
        html += `<div onclick="startCreateNewProfile()" class="p-8 rounded-[16px] border-2 border-dashed border-[#DAE3EC] hover:border-[#728BA9] hover:bg-[#F8FCFF] transition-all bg-white cursor-pointer group flex flex-col items-center justify-center text-center min-h-[250px]">
            <div class="w-16 h-16 bg-[#F8FCFF] text-[#B8C9DD] group-hover:text-[#728BA9] group-hover:bg-[#ECF2E6] shadow-sm rounded-full flex items-center justify-center mb-4 text-4xl transition-all">+</div>
            <h3 class="text-xl font-bold text-[#728BA9]">Buat Profil Baru</h3>
        </div>`;
        el.profileList.innerHTML = html;
    }

    // Edit mode prefill
    if (isEditMode && editProfileId) {
        const found = allProfiles.find(p => String(p.id) === editProfileId);
        if (found) prefillForm(found);
    }

    window.selectProfile = (id) => {
        sessionStorage.setItem('active_profile_id', id);
        window.location.href = '/dashboard.html';
    };

    window.startCreateNewProfile = () => {
        document.getElementById('step-0').classList.remove('active');
        document.getElementById('step-0').style.display = 'none';
        document.getElementById('step-1').classList.add('active', 'step-enter');
        document.getElementById('step-1').style.display = 'block';
        el.navButtons.classList.remove('hidden');
        currentStep = 1;
        el.progressText.textContent = 1;
        el.progressBar.style.width = '20%';
    };

    // Pain slider
    el.painSlider.addEventListener('input', (e) => { el.painVal.textContent = e.target.value; });

    // Role toggle
    document.querySelectorAll('input[name="role"]').forEach(r => {
        r.addEventListener('change', () => {
            document.getElementById('patient-name-field').classList.toggle('hidden', r.value !== 'caregiver' || !r.checked);
        });
    });

    // Surgery date
    el.surgeryDate.addEventListener('change', (e) => {
        if (!e.target.value) { el.dayCounter.textContent = "Silakan pilih tanggal untuk melihat status hari pemulihan."; return; }
        const sel = new Date(e.target.value); const today = new Date();
        today.setHours(0,0,0,0); sel.setHours(0,0,0,0);
        const diff = Math.ceil(Math.abs(today - sel) / 864e5);
        if (sel > today) {
            el.dayCounter.innerHTML = '<span class="text-red-500 font-bold">Tanggal tidak valid.</span> Mohon pilih tanggal masa lalu atau hari ini.';
            el.surgeryDate.setCustomValidity('Tanggal operasi tidak boleh di masa depan.');
        } else {
            el.surgeryDate.setCustomValidity('');
            el.dayCounter.innerHTML = diff === 0
                ? 'Hari ini adalah <strong class="text-[#728BA9] text-lg">Hari H Operasi</strong>.'
                : `Kamu akan memulai <strong class="text-[#728BA9] text-lg">Hari ke-${diff+1} Pemulihan.</strong>`;
        }
    });

    // Validation
    function validateStep(step) {
        const container = document.getElementById(`step-${step}`);
        const inputs = container.querySelectorAll('input[required]');
        let valid = true;
        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (!document.querySelector(`input[name="${input.name}"]:checked`)) valid = false;
            } else if (!input.value.trim()) valid = false;
        });
        if (!valid) {
            const first = Array.from(inputs).find(i => i.type==='radio' ? !document.querySelector(`input[name="${i.name}"]:checked`) : !i.value.trim());
            if (first) first.reportValidity();
        }
        if (step === 4 && !el.surgeryDate.checkValidity()) { el.surgeryDate.reportValidity(); return false; }
        return valid;
    }

    function updateUI(from, to) {
        document.getElementById(`step-${from}`).classList.remove('active','step-enter');
        document.getElementById(`step-${from}`).style.display = 'none';
        document.getElementById(`step-${to}`).classList.add('active','step-enter');
        document.getElementById(`step-${to}`).style.display = 'block';
        el.progressText.textContent = to;
        el.progressBar.style.width = `${(to/totalSteps)*100}%`;
        el.btnPrev.classList.toggle('hidden', to === 1);
        el.btnNext.classList.toggle('hidden', to === totalSteps);
        el.btnSubmit.classList.toggle('hidden', to !== totalSteps);
    }

    el.btnNext.addEventListener('click', () => { if (validateStep(currentStep) && currentStep < totalSteps) { updateUI(currentStep, currentStep+1); currentStep++; } });
    el.btnPrev.addEventListener('click', () => { if (currentStep > 1) { updateUI(currentStep, currentStep-1); currentStep--; } });

    // Submit
    el.btnSubmit.addEventListener('click', async () => {
        if (!validateStep(currentStep)) return;
        el.btnSubmit.disabled = true;
        el.btnSubmit.textContent = 'Menyimpan...';

        const form = document.getElementById('onboarding-form');
        const fd = new FormData(form);
        const data = {
            user_id: user.id,
            role: fd.get('role'),
            full_name: fd.get('fullName'),
            patient_name: fd.get('patientName') || null,
            operation_type: fd.get('operationType'),
            surgery_date: fd.get('surgeryDate'),
            pain_level: parseInt(fd.get('painLevel')) || 0,
            mobility: fd.get('mobility'),
            symptoms: fd.get('symptoms') || '',
        };

        try {
            if (isEditMode && editProfileId) {
                const { error: updateErr } = await _supabase.from('user_onboarding').update(data).eq('id', editProfileId);
                if (updateErr) throw updateErr;
            } else {
                const { data: inserted, error: insertErr } = await _supabase.from('user_onboarding').insert(data).select().single();
                console.log('[Onboarding] insert result:', inserted, 'error:', insertErr);
                if (insertErr) throw insertErr;
                if (inserted) {
                    sessionStorage.setItem('active_profile_id', String(inserted.id));
                    console.log('[Onboarding] saved profile_id:', inserted.id);
                }
            }
            window.location.href = '/dashboard.html';
        } catch (err) {
            console.error('[Onboarding] save error:', err);
            alert('Error: ' + (err.message || JSON.stringify(err)));
            el.btnSubmit.disabled = false;
            el.btnSubmit.textContent = 'Mulai Pemulihan';
        }
    });

    // Enter key
    document.getElementById('onboarding-form').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            currentStep < totalSteps ? el.btnNext.click() : el.btnSubmit.click();
        }
    });

    function prefillForm(d) {
        if (d.role) { const r = document.querySelector(`input[name="role"][value="${d.role}"]`); if(r) r.checked=true; }
        const fn = document.querySelector('input[name="fullName"]'); if(fn) fn.value = d.full_name||'';
        const pn = document.querySelector('input[name="patientName"]'); if(pn) pn.value = d.patient_name||'';
        if (d.operation_type) { const o = document.querySelector(`input[name="operationType"][value="${d.operation_type}"]`); if(o) o.checked=true; }
        if (d.surgery_date) el.surgeryDate.value = d.surgery_date;
        if (d.pain_level != null) { el.painSlider.value = d.pain_level; el.painVal.textContent = d.pain_level; }
        if (d.mobility) { const m = document.querySelector(`input[name="mobility"][value="${d.mobility}"]`); if(m) m.checked=true; }
        const sy = document.querySelector('textarea[name="symptoms"]'); if(sy) sy.value = d.symptoms||'';
        setTimeout(() => {
            const cr = document.querySelector('input[name="role"]:checked'); if(cr) cr.dispatchEvent(new Event('change'));
            if (el.surgeryDate.value) el.surgeryDate.dispatchEvent(new Event('change'));
            if (isEditMode) { el.btnSubmit.textContent = 'Simpan Perubahan'; document.querySelector('#step-1 h2').textContent = 'Edit Data Pemulihan'; }
        }, 100);
    }
});
