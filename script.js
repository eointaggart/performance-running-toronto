'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.hidden = false;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.querySelectorAll('[data-plan]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#interest').value = link.dataset.plan;
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  status.textContent = 'Sending your enquiry…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(form.action, {
      method: 'POST', body: new FormData(form),
      headers: { Accept: 'application/json' }, signal: controller.signal
    });
    if (!response.ok) throw new Error('Submission failed');
    status.textContent = 'Thanks! Your enquiry has been sent. Eoin will be in touch.';
    form.reset();
  } catch (error) {
    status.textContent = 'We couldn’t confirm that your enquiry was sent. Your details are still here. Please try again, or contact @pr_toronto on Instagram.';
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
  }
});
