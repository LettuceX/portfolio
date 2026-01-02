// Add a second parameter 'type' with a default value of 'content'
function openProject(fileUrl, type = 'content') {
    const modal = document.getElementById("projectModal");
    const contentContainer = document.getElementById("modal-body-content");

    modal.style.display = "block";

    if (type === 'iframe') {
        // SOLUTION: Use an iframe for WebGL/Interactive projects
        // This forces the browser to load the file as a separate document, 
        // ensuring all scripts and WebGL contexts load correctly.
        contentContainer.innerHTML = `
            <iframe 
                src="${fileUrl}" 
                class="project-iframe" 
                frameborder="0" 
                scrolling="no"
                onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + 0 + 'px';"
                allowfullscreen>
            </iframe>`;
    } else {
        // EXISTING LOGIC: Keep this for your text/image based project pages
        contentContainer.innerHTML = "<p style='text-align:center; padding:20px;'>Loading...</p>";
        
        fetch(fileUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                contentContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Error:', error);
                contentContainer.innerHTML = "<p>Error loading project.</p>";
            });
    }
}

// Keep your existing closeModal and window.onclick functions as they are
function closeModal() {
    document.getElementById("projectModal").style.display = "none";
    document.getElementById("modal-body-content").innerHTML = "";
}

window.onclick = function(event) {
    const modal = document.getElementById("projectModal");
    if (event.target == modal) {
        closeModal();
    }
}