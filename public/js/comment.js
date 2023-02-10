const commentFormHandler = event => {
    event.preventDefault();
    
    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
    
    if (!body) return;
    
    fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ postId, body }),
    headers: { 'Content-Type': 'application/json' }
    })
    .then(() => location.reload());
    };
    
    document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);

    