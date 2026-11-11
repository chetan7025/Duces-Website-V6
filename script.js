const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? '×' : '☰';
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) toggle.textContent = '☰';
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const enquiryForm = document.getElementById('enquiryForm');
enquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const note = document.getElementById('formNote');
  const submitButton = form.querySelector('button[type="submit"]');
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  formData.append('_subject', 'DUCES Website Enquiry - ' + formData.get('product'));
  formData.append('_template', 'table');

  submitButton.disabled = true;
  submitButton.textContent = 'Sending enquiry…';
  note.textContent = 'Sending your enquiry. Please wait.';

  try {
    const response = await fetch('https://formsubmit.co/ajax/chetanpatil.2798@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });
    const result = await response.json();
    if (!response.ok || result.success !== 'true') {
      throw new Error(result.message || 'The form service could not confirm receipt.');
    }
    form.reset();
    note.textContent = 'Thank you. Your enquiry has been submitted. DUCES will review it and respond using the contact details you provided.';
    note.classList.add('form-success');
  } catch (error) {
    note.textContent = 'We could not confirm that your enquiry was sent. Please try again, or email chetanpatil.2798@gmail.com directly.';
    note.classList.remove('form-success');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send enquiry <span>→</span>';
  }
});
