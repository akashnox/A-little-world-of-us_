
const musicButton=document.querySelector('[data-music]');
let audio=null, musicOn=false;
function startMusic(){
  if(!audio){
    audio=new Audio('assets/music/soft-memory-loop.wav');
    audio.loop=true; audio.volume=.28;
  }
  audio.play().then(()=>{musicOn=true;updateMusic()}).catch(()=>{});
}
function updateMusic(){if(musicButton)musicButton.textContent=musicOn?'♫ Music on':'♫ Play music'}
if(musicButton){
  updateMusic();
  // Try autoplay. Most mobile browsers require one tap before audible playback.
  const autoStart=()=>{ if(!musicOn) startMusic(); };
  window.addEventListener('pointerdown',autoStart,{once:true});
  window.addEventListener('keydown',autoStart,{once:true});
  startMusic();
  musicButton.addEventListener('click',()=>{
    if(!audio){startMusic();return}
    if(musicOn){audio.pause();musicOn=false;updateMusic()}else startMusic();
  });
}
document.querySelectorAll('[data-reveal]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const target=document.querySelector(btn.dataset.reveal);
    if(target){target.hidden=false;btn.hidden=true;target.scrollIntoView({behavior:'smooth',block:'center'})}
  });
});
document.querySelectorAll('video[data-memory-video]').forEach(video=>{
  const placeholder=video.parentElement.querySelector('.video-placeholder');
  video.addEventListener('loadeddata',()=>{if(placeholder)placeholder.hidden=true});
  video.addEventListener('canplay',()=>{if(placeholder)placeholder.hidden=true});
  video.addEventListener('error',()=>{
    if(placeholder){
      placeholder.hidden=false;
      const message=placeholder.querySelector('span');
      if(message) message.innerHTML='This video could not be loaded. Check that the MP4 is inside <b>assets/videos/</b> and reopen the website.';
    }
  });
  video.load();
});
