// Load saved blog items from localStorage
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
    const year = new Date().getFullYear();  // Get current year

    // Create unique HTML file for the blog item
    const fileName = `SubGamesBase_${Date.now()}.html`;  // Create a unique filename based on timestamp
    createBlogHTMLFile(fileName);

    const container = document.getElementById('blog-container');
    const newItemId = Date.now();  // Unique ID for the new blog item
    const newItem = `
        <div class="portfolio-item" id="item-${newItemId}" onclick="window.location.href='${fileName}'">
            <button class="delete-btn" onclick="deleteBlogItem(${newItemId}, event)">
                <img src="Assets/Juanes/[CITYPNG.COM]Download Cross False X Red Round Icon PNG - 700x700.png" alt="Delete">
            </button>
            <img src="Assets/Eliham/elementor-placeholder-image.webp" alt="Project Image">
            <div class="description">
                <h5>${title}</h5>
                <p>Year: ${year}</p>
                <p>${description}</p>
                <a href="${videoLink}" target="_blank">Watch Video</a>
            </div>
        </div>
    `;

    container.innerHTML += newItem;
    saveBlogItem(newItemId, title, description, videoLink, year, fileName);
    toggleBlogForm();  // Hide the form after adding
}

function saveBlogItem(id, title, description, videoLink, year, fileName) {
    let blogItems = JSON.parse(localStorage.getItem('blogItems')) || [];
    blogItems.push({ id, title, description, videoLink, year, fileName });
    localStorage.setItem('blogItems', JSON.stringify(blogItems));
}

function loadSavedBlogItems() {
    let blogItems = JSON.parse(localStorage.getItem('blogItems')) || [];
    const container = document.getElementById('blog-container');
    blogItems.forEach(item => {
        const newItem = `
            <div class="portfolio-item" id="item-${item.id}" onclick="window.location.href='${item.fileName}'">
                <button class="delete-btn" onclick="deleteBlogItem(${item.id}, event)">
                    <img src="Assets/Juanes/[CITYPNG.COM]Download Cross False X Red Round Icon PNG - 700x700.png" alt="Delete">
                </button>
                <img src="Assets/Eliham/elementor-placeholder-image.webp" alt="Project Image">
                <div class="description">
                    <h5>${item.title}</h5>
                    <p>Year: ${item.year}</p>
                    <p>${item.description}</p>
                    <a href="${item.videoLink}" target="_blank">Watch Video</a>
                </div>
            </div>
        `;
        container.innerHTML += newItem;
    });
}

// Modified delete function that prevents event propagation and only deletes the specific item
function deleteBlogItem(id, event) {
    event.stopPropagation();  // Prevent the click event from triggering the redirection

    let blogItems = JSON.parse(localStorage.getItem('blogItems')) || [];
    blogItems = blogItems.filter(item => item.id !== id);  // Remove the specific item
    localStorage.setItem('blogItems', JSON.stringify(blogItems));
    
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
