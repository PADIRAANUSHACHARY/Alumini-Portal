
// it fetches input from login from and then using email it fetches the db.json. It checks whether given email present or not if not direct not found. if found it stores the user name and password in local storage which is then used for profile settings
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  //fetching details from index.html
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  //triming the inputs
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  try {
    const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
    const users = await response.json();

    console.log('Users fetched:', users);

    const matchedUser = users.find(user => user.password === password);
    //if a user is matched i am storing that details in the localStorage to use it later for profile settings
    if (matchedUser) {
      localStorage.setItem('userEmail', matchedUser.email);
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid email or password.');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('Error occurred during login. Please try again.');
  }
});

//show and hide password according to requirement
document.getElementById('show-password').addEventListener('change', function () {
  const pwdInput = document.getElementById('login-password');
  if (this.checked) {
    pwdInput.type = 'text';
  } else {
    pwdInput.type = 'password';
  }
});


