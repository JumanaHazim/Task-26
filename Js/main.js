
  var nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    var nlInput = nlForm.querySelector('input[type="email"]');
    var nlMsg = document.createElement('p');
    nlMsg.className = 'nl-msg';
    nlForm.setAttribute('novalidate', '');
    nlForm.insertAdjacentElement('afterend', nlMsg);
 
    function showNl(text, type) {
      nlMsg.textContent = text;
      nlMsg.className = 'nl-msg ' + type;
    }
 
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = nlInput.value.trim();
      if (!value) {
        showNl('Please enter your email.', 'error');
      } else if (!emailRe.test(value)) {
        showNl('Please enter a valid email address.', 'error');
      } else {
        showNl('Thank you! You are now subscribed.', 'success');
        nlInput.value = '';
      }
    });
    nlInput.addEventListener('input', function () { nlMsg.textContent = ''; });
  }

     ========================================================= */
  function check(input, valid, message) {
    input.classList.toggle('is-invalid', !valid);
    input.classList.toggle('is-valid', valid);
    var holder = input.closest('.form-group');
    var fb = holder && holder.querySelector('.invalid-feedback');
    if (fb && !valid) fb.textContent = message;
    return valid;
  }
 
  // زرار العين
  document.querySelectorAll('.toggle-password').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.closest('.input-group').querySelector('input');
      var icon = btn.querySelector('i');
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      icon.classList.toggle('fa-eye', !show);
      icon.classList.toggle('fa-eye-slash', show);
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });
 
  function finish(form, modalId, text) {
    var box = form.querySelector('.form-success');
    box.textContent = text;
    box.classList.remove('d-none');
    setTimeout(function () {
      if (window.jQuery) window.jQuery('#' + modalId).modal('hide');
    }, 1200);
  }
 
  // Register
  var regForm = document.getElementById('registerForm');
  if (regForm) {
    var rName = document.getElementById('regName');
    var rEmail = document.getElementById('regEmail');
    var rPass = document.getElementById('regPassword');
    var rConf = document.getElementById('regConfirm');
 
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var results = [
        check(rName, rName.value.trim().length >= 3, 'Name must be at least 3 characters.'),
        check(rEmail, emailRe.test(rEmail.value.trim()), 'Please enter a valid email.'),
        check(rPass, /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(rPass.value), 'Use 8+ characters with letters and numbers.'),
        check(rConf, rConf.value !== '' && rConf.value === rPass.value, 'Passwords do not match.')
      ];
      if (results.every(Boolean)) finish(regForm, 'registerModal', 'Account created successfully!');
    });
  }
 
  // Login
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    var lEmail = document.getElementById('loginEmail');
    var lPass = document.getElementById('loginPassword');
 
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var results = [
        check(lEmail, emailRe.test(lEmail.value.trim()), 'Please enter a valid email.'),
        check(lPass, lPass.value.length >= 8, 'Password must be at least 8 characters.')
      ];
      if (results.every(Boolean)) finish(loginForm, 'loginModal', 'Logged in successfully!');
    });
  }
 
  // تنضيف الفورم لما الـ modal يتقفل
  if (window.jQuery) {
    window.jQuery('#registerModal, #loginModal').on('hidden.bs.modal', function () {
      var form = this.querySelector('form');
      form.reset();
      form.querySelectorAll('.is-valid, .is-invalid').forEach(function (el) {
        el.classList.remove('is-valid', 'is-invalid');
      });
      form.querySelector('.form-success').classList.add('d-none');
      form.querySelectorAll('.toggle-password').forEach(function (btn) {
        btn.closest('.input-group').querySelector('input').type = 'password';
        btn.querySelector('i').className = 'far fa-eye';
      });
    });
  }
 