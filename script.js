const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰'});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='☰'}));const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();document.getElementById('enquiryForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const form=e.currentTarget;
  if(!form.reportValidity()) return;
  const f=new FormData(form);
  const subject=encodeURIComponent('DUCES Website Enquiry - '+f.get('product'));
  const body=encodeURIComponent('New enquiry from DUCES website\\n\\nFirst Name: '+f.get('firstName')+'\\nLast Name: '+f.get('lastName')+'\\nMobile: '+f.get('mobile')+'\\nEmail: '+f.get('email')+'\\nProduct: '+f.get('product')+'\\nDescription: '+(f.get('description')||'Not provided'));
  const mailto='mailto:chetanpatil.2798@gmail.com?subject='+subject+'&body='+body;
  const note=document.getElementById('formNote');
  note.textContent='Your email application should open. The enquiry is not sent until you press Send in that application. If it does not open, use this link: ';
  const fallback=document.createElement('a');
  fallback.href=mailto;
  fallback.textContent='Open prepared email';
  note.append(fallback);
  window.location.href=mailto;
});