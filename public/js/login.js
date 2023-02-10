const handleLogin = async event => {
  event.preventDefault();
  
  const username = document.querySelector('#username-input-login').value;
  const password = document.querySelector('#password-input-login').value;

  try {
    const res = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    document.location.replace('/dashboard');
  } catch (error) {
    console.error(error);
    alert('Failed to login');
  }
};

document.querySelector('#login-form').addEventListener('submit', handleLogin);