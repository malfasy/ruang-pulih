// RuangPulih Dashboard
let D={user:null,onboarding:null,opType:'cabg',role:'pasien',userName:'',surgeryDate:'',dayPostOp:1,page:'home',profileId:null,todayMon:null,monHistory:[],woundHistory:[]};
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML;}
function today(){return new Date().toISOString().split('T')[0];}
function openVideoModal(vid,title){document.getElementById('vmod-title').textContent=title;document.getElementById('vmod-frame').src='https://www.youtube.com/embed/'+vid+'?autoplay=1';document.getElementById('video-modal').classList.add('open');}
function closeVideoModal(){document.getElementById('video-modal').classList.remove('open');document.getElementById('vmod-frame').src='';}
window.openVideoModal=openVideoModal;window.closeVideoModal=closeVideoModal;

document.addEventListener('DOMContentLoaded',async()=>{
const session=await requireAuth();if(!session)return;
D.user=await getUser();
D.page=new URLSearchParams(location.search).get('page')||'home';
D.profileId=sessionStorage.getItem('active_profile_id');
if(D.profileId)D.profileId=parseInt(D.profileId,10);
console.log('[Dashboard] profileId from session:', D.profileId);

// Highlight active nav
document.querySelectorAll('[data-page]').forEach(a=>{
  a.classList.remove('nav-active','nav-inactive');
  a.classList.add(a.dataset.page===D.page?'nav-active':'nav-inactive');
});
document.getElementById('logout-btn').addEventListener('click',async e=>{e.preventDefault();await signOut();});

// Load onboarding
let q=_supabase.from('user_onboarding').select('*').eq('user_id',D.user.id);
if(D.profileId)q=q.eq('id',D.profileId);
else q=q.order('id',{ascending:false}).limit(1);
const{data:ob,error:obErr}=await q;
console.log('[Dashboard] onboarding query result:', ob, 'error:', obErr);
if(ob&&ob.length){D.onboarding=ob[0];D.opType=ob[0].operation_type||'cabg';D.role=ob[0].role||'pasien';D.userName=ob[0].full_name||D.user.name;D.surgeryDate=ob[0].surgery_date||'';D.profileId=ob[0].id;sessionStorage.setItem('active_profile_id',String(ob[0].id));}
else{D.opType='cabg';D.role='pasien';D.userName=D.user.name;D.surgeryDate=new Date(Date.now()-864e5).toISOString().split('T')[0];}

if(D.surgeryDate){const s=new Date(D.surgeryDate),n=new Date();s.setHours(0,0,0,0);n.setHours(0,0,0,0);const diff=Math.round((n-s)/864e5);D.dayPostOp=Math.max(1,diff+1);}

// Red flags
const rf=RED_FLAGS[D.opType]||RED_FLAGS.cabg;
document.getElementById('rf-list').innerHTML=rf.map(f=>`<li class="flex gap-2 items-start"><svg class="w-4 h-4 text-[#728BA9] shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>${esc(f)}</li>`).join('');

// Load monitoring
const pid=D.profileId||0;
const{data:monH}=await _supabase.from('user_daily_monitoring').select('*').eq('user_id',D.user.id).eq('profile_id',pid).order('record_date',{ascending:false}).limit(30);
D.monHistory=monH||[];D.todayMon=D.monHistory.find(m=>m.record_date===today())||null;

const{data:wH}=await _supabase.from('user_wound_logs').select('*').eq('user_id',D.user.id).eq('profile_id',pid).order('record_date',{ascending:false}).limit(30);
D.woundHistory=wH||[];


// Mobile Hamburger Menu Logic
const menuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.querySelector('.dashboard-sidebar');
const backdrop = document.getElementById('sidebar-backdrop');
if(menuBtn && sidebar && backdrop) {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('open');
    });
    backdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
            backdrop.classList.remove('open');
        });
    });
}

renderPage();
});

function renderPage(){
const C=document.getElementById('page-content');
const opName=OP_DISPLAY[D.opType]||'Operasi';
if(D.page==='home')C.innerHTML=renderHome(opName);
else if(D.page==='roadmap')C.innerHTML=renderRoadmap(opName);
else if(D.page==='monitoring')C.innerHTML=renderMonitoring(opName);
else if(D.page==='woundlog')C.innerHTML=renderWoundLog();
else if(D.page==='content')C.innerHTML=renderContent(opName);
else if(D.page==='profile')C.innerHTML=renderProfile(opName);
else C.innerHTML=renderHome(opName);
afterRender();
}
