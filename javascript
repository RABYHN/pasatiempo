// JavaScript.js
document.addEventListener('DOMContentLoaded', () => {

    // === 1. CONTADOR DE VISITANTES ===
    const visitCountElem = document.getElementById('visit-count');
    
    // Obtener visitas previas del LocalStorage
    let visits = localStorage.getItem('page_visits');
    
    if (!visits) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    
    // Guardar nuevo conteo y mostrar
    localStorage.setItem('page_visits', visits);
    visitCountElem.textContent = visits;

    // === 2. GESTIÓN DE COMENTARIOS ===
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    // Cargar comentarios guardados
    const loadComments = () => {
        const savedComments = JSON.parse(localStorage.getItem('user_comments')) || [];
        commentsContainer.innerHTML = '';
        
        if (savedComments.length === 0) {
            commentsContainer.innerHTML = '<p style="color: var(--text-muted);">Sé el primero en dejar un comentario.</p>';
            return;
        }

        savedComments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            commentDiv.innerHTML = `
                <div class="comment-author">${escapeHTML(comment.author)}</div>
                <div class="comment-text">${escapeHTML(comment.text)}</div>
            `;
            commentsContainer.appendChild(commentDiv);
        });
    };

    // Función de seguridad básica
    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    };

    // Agregar nuevo comentario
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const usernameInput = document.getElementById('username');
        const commentTextInput = document.getElementById('comment-text');

        const newComment = {
            author: usernameInput.value.trim(),
            text: commentTextInput.value.trim()
        };

        if (newComment.author && newComment.text) {
            const savedComments = JSON.parse(localStorage.getItem('user_comments')) || [];
            savedComments.unshift(newComment); // Añadir al inicio
            localStorage.setItem('user_comments', JSON.stringify(savedComments));

            usernameInput.value = '';
            commentTextInput.value = '';
            
            loadComments();
        }
    });

    // Carga inicial
    loadComments();
});