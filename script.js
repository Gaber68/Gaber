const sentences = [
    "maj ma malega ",
    "ziga ma malega ",
    "azbe ma malega ",
];

let currentSentence = 0;
let currentChar = 0;
let isDeleting = false; // Track whether we're deleting or typing
const speed = 100; // Typing speed (in ms)
const deleteSpeed = 50; // Deleting speed (in ms)
const pauseTime = 1000; // Pause time after deleting before typing the next sentence
const typewriterElement = document.getElementById("typewriter");

function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}



// Run this function on page load
window.addEventListener('DOMContentLoaded', highlightActiveLink);

function typeAndDelete() {
    // Create the cursor if it doesn't already exist
    let cursor = document.querySelector('.cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        typewriterElement.appendChild(cursor);
    }

    if (currentSentence >= sentences.length) {
        currentSentence = 0; // ✅ Reset to loop again
    }

    if (!isDeleting) {
        // Type the current sentence
        typewriterElement.textContent = sentences[currentSentence].slice(0, currentChar);
        currentChar++;

        // Move cursor
        cursor.style.left = typewriterElement.offsetWidth + "px";

        if (currentChar === sentences[currentSentence].length) {
            setTimeout(() => {
                isDeleting = true;
                typeAndDelete();
            }, pauseTime);
        } else {
            setTimeout(typeAndDelete, speed);
        }
    } else {
        // Delete the current sentence
        typewriterElement.textContent = sentences[currentSentence].slice(0, currentChar - 1);
        currentChar--;

        // Move cursor
        cursor.style.left = typewriterElement.offsetWidth + "px";

        if (currentChar === 0) {
            isDeleting = false;
            currentSentence++; // ✅ Move to the next sentence
            setTimeout(typeAndDelete, pauseTime);
        } else {
            setTimeout(typeAndDelete, deleteSpeed);
        }
    }
}

// Start the typewriter effect
typeAndDelete();
