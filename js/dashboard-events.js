function afterRender(){
  document.querySelectorAll('.task-checkbox').forEach(cb=>{
    cb.addEventListener('change',()=>{
      const all=document.querySelectorAll('.task-checkbox');
      const checked=document.querySelectorAll('.task-checkbox:checked');
      const pct=Math.round((checked.length/all.length)*100);
      document.querySelectorAll('.task-progress-text').forEach(e=>e.textContent=pct+'%');
      document.querySelectorAll('.task-progress-bar').forEach(e=>e.style.width=pct+'%');
    });
  });

  const monForm=document.getElementById('monitoring-form');
  if(monForm){
    monForm.addEventListener('submit',async e=>{
      e.preventDefault();
      const fd=new FormData(monForm);
      const data={
        user_id:D.user.id,
        profile_id:D.profileId,
        record_date:today(),
        spo2:fd.get('spo2')?parseInt(fd.get('spo2')):null,
        heart_rate:fd.get('heart_rate')?parseInt(fd.get('heart_rate')):null,
        pain_level:fd.get('pain_level')?parseInt(fd.get('pain_level')):null,
        temp:fd.get('temp')?parseFloat(fd.get('temp')):null,
        blood_volume:fd.get('blood_volume')||null,
        blood_color:fd.get('blood_color')||null,
        blood_clots:fd.get('blood_clots')||null,
        stump_pain:fd.get('stump_pain')?parseInt(fd.get('stump_pain')):null,
        phantom_pain:fd.get('phantom_pain')?parseInt(fd.get('phantom_pain')):null,
        wound_color:fd.get('wound_color')||null,
        wound_swelling:fd.get('wound_swelling')||null,
        wound_fluid:fd.get('wound_fluid')||null,
        wound_odor:fd.get('wound_odor')||null,
      };
      const{error}=await _supabase.from('user_daily_monitoring').upsert(data,{onConflict:'user_id,profile_id,record_date'});
      if(error){alert('Error: '+error.message);return;}
      window.location.href='?page=home';
    });
  }

  const woundForm=document.getElementById('wound-form');
  const woundPhoto=document.getElementById('wound-photo');
  if(woundPhoto){
    woundPhoto.addEventListener('change',e=>{
      const file=e.target.files[0];if(!file)return;
      const reader=new FileReader();
      reader.onload=ev=>{
        document.getElementById('wound-img').src=ev.target.result;
        document.getElementById('wound-preview').classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    });
  }
  if(woundForm){
    woundForm.addEventListener('submit',async e=>{
      e.preventDefault();
      const fd=new FormData(woundForm);
      const file=woundPhoto?.files[0];
      let imageUrl=null;

      if(file){
        const ext=file.name.split('.').pop();
        const path=`${D.user.id}/${today()}_${Date.now()}.${ext}`;
        const{data:upData,error:upErr}=await _supabase.storage.from('wound-photos').upload(path,file);
        if(upErr){alert('Upload error: '+upErr.message);return;}
        const{data:urlData}=_supabase.storage.from('wound-photos').getPublicUrl(path);
        imageUrl=urlData?.publicUrl||null;
      }

      const data={
        user_id:D.user.id,
        profile_id:D.profileId,
        record_date:today(),
        image_url:imageUrl,
        status:fd.get('status')||'Normal',
        note:fd.get('note')||'',
      };
      const{error}=await _supabase.from('user_wound_logs').upsert(data,{onConflict:'user_id,profile_id,record_date'});
      if(error){alert('Error: '+error.message);return;}
      window.location.href='?page=woundlog';
    });
  }
}
