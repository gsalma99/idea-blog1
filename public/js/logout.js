const logoutHandler = async function() {
    const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
    document.location.replace('/');
    }
    };
    
    document.querySelector('#logout-link').addEventListener('click', logoutHandler);