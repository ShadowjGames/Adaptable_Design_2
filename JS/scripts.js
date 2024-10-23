// Generate or retrieve a unique page key to differentiate between different tabs/pages
const pageKey = getPageKey();  // Generates or retrieves a unique key for the current page/tab

// Function to generate a unique key for each tab/page
function getPageKey() {
    // This can be manually set based on the page or dynamically generated
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "");  // Example: "Blog", "Games"
    return `page_${currentPage}`;
}

// Load saved blog items specific to the current page/tab
window.onload = function() {
    loadSavedBlogItems();
};

function toggleBlogForm() {
    const formSection = document.getElementById('addBlogFormSection');
    if (formSection.style.display === 'none' || formSection.style.display === '') {
        formSection.style.display = 'block';
    } else {
        formSection.style.display = 'none';
    }
}

function addNewBlogItem() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const videoLink = document.getElementById('videoLink').value;
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;  // Día, mes y año

    // Crear archivo HTML único para el elemento del blog
    const fileName = `SubGamesBase_${Date.now()}.html`;  // Crear un nombre de archivo único basado en la marca de tiempo
    createBlogHTMLFile(fileName);

    const container = document.getElementById('blog-container');
    const newItemId = Date.now();  // ID único para el nuevo elemento del blog
    const newItem = `
        <div class="portfolio-item" id="item-${newItemId}" onclick="window.location.href='${fileName}'">
            <button class="delete-btn" onclick="deleteBlogItem(${newItemId}, event)">
                <img src="Assets/Juanes/[CITYPNG.COM]Download Cross False X Red Round Icon PNG - 700x700.png" alt="Delete">
            </button>
            <img src="Assets/Eliham/elementor-placeholder-image.webp" alt="Project Image">
            <div class="description">
                <h5>${title}</h5>  <!-- Título al inicio -->
                <p><strong>Published on:</strong> ${formattedDate}</p>  <!-- Mostrar día, mes, año -->
                <p>${description}</p>  <!-- Descripción -->
                <a href="${videoLink}" target="_blank">Watch Video</a>  <!-- Enlace del video -->
            </div>
        </div>
    `;

    container.innerHTML += newItem;
    saveBlogItem(newItemId, title, description, videoLink, formattedDate, fileName);  // Guardar con la nueva fecha completa
    toggleBlogForm();  // Ocultar el formulario después de añadir
}

function saveBlogItem(id, title, description, videoLink, formattedDate, fileName) {
    let blogItems = JSON.parse(localStorage.getItem(pageKey)) || [];  // Cargar los elementos específicos de la página
    blogItems.push({ id, title, description, videoLink, formattedDate, fileName });
    localStorage.setItem(pageKey, JSON.stringify(blogItems));  // Guardar los elementos bajo la clave específica de la página
}

function loadSavedBlogItems() {
    let blogItems = JSON.parse(localStorage.getItem(pageKey)) || [];  // Cargar los elementos específicos de la página
    const container = document.getElementById('blog-container');
    blogItems.forEach(item => {
        const newItem = `
            <div class="portfolio-item" id="item-${item.id}" onclick="window.location.href='${item.fileName}'">
                <button class="delete-btn" onclick="deleteBlogItem(${item.id}, event)">
                    <img src="Assets/Juanes/[CITYPNG.COM]Download Cross False X Red Round Icon PNG - 700x700.png" alt="Delete">
                </button>
                <img src="Assets/Eliham/elementor-placeholder-image.webp" alt="Project Image">
                <div class="description">
                    <h5>${item.title}</h5>  <!-- Título al inicio -->
                    <p><strong>Published on:</strong> ${item.formattedDate}</p>  <!-- Mostrar fecha completa -->
                    <p>${item.description}</p>  <!-- Descripción -->
                    <a href="${item.videoLink}" target="_blank">Watch Video</a>  <!-- Enlace del video -->
                </div>
            </div>
        `;
        container.innerHTML += newItem;
    });
}

// Modified delete function that prevents event propagation and only deletes the specific item
function deleteBlogItem(id, event) {
    event.stopPropagation();  // Prevent the click event from triggering the redirection

    let blogItems = JSON.parse(localStorage.getItem(pageKey)) || [];  // Load items specific to the current page
    blogItems = blogItems.filter(item => item.id !== id);  // Remove the specific item
    localStorage.setItem(pageKey, JSON.stringify(blogItems));  // Save the updated list under the page-specific key
    
    // Remove the item from the DOM
    const itemElement = document.getElementById(`item-${id}`);
    itemElement.remove();
}

// Function to create a new HTML file for each blog item
function createBlogHTMLFile(fileName) {
    const blogTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${fileName} - Blog Item</title>
            <link rel="stylesheet" href="CSS/Styles.css">
        </head>
        <body>
            <h1>Welcome to ${fileName}</h1>
            <p>This is a dynamic blog item page based on SubGamesBase.html</p>
        </body>
        </html>
    `;
    
    // Store the file in localStorage (simulating file creation)
    localStorage.setItem(fileName, blogTemplate);
}
