console.log('Its working')

let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		console.log('Option clicked:', mode)
		setTheme(mode)
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'dark'){
		document.getElementById('theme-style').href = 'dark.css'
	}

	localStorage.setItem('theme', mode)
}

// Modal Get Elements
const projectModal = document.getElementById('project-modal');
const closeModalButton = document.querySelector('.close-button');
const openModalButtons = document.querySelectorAll('.open-modal-button');

// Modal Content Elements
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalTechnologies = document.getElementById('modal-technologies');
const modalVideoContainer = document.getElementById('modal-video-container');

// Dummy project data (simulating fetching from postX.html or a data structure)
const projectData = {
    'post1': {
        title: 'Calculator in Python',
        image: 'Images/calculator-dash.png',
        description: 'This was a project I made in 2020 when I first learned python. The calculator program is a simple command-line application that allows users to perform basic arithmetic operations. The program is built using Python and has a simple user interface, with prompts for the user to enter numbers and operations. The program supports both positive and negative numbers and includes error handling for invalid inputs. The calculator program is a useful and practical tool for performing quick calculations.',
        technologies: ['Python'],
        video: '<video src="Images/calculator-vid.mp4" id="calculator-video" style="width:100%;" autoplay loop muted playsinline></video>'
    },
    'post2': {
        title: 'Rock-Paper-Scissors',
        image: 'Images/rock-paper-s-top.png',
        description: 'This Python code implements a simple game of rock-paper-scissors. It prompts the user to input their choice among "rock," "paper," or "scissors" and randomly selects a choice for the computer. The program then compares the user\'s choice with the computer\'s choice and determines the winner based on the classic rules of the game. If both choices are the same, it declares a tie. Otherwise, it declares the winner as either the user or the computer, depending on the combinations of choices made. Finally, the game continues until the user decides to exit.',
        technologies: ['Python'],
        video: '<video src="Images/rock-paper-s-vid.mov" id="rock-paper-scissors-video" style="width:100%;" autoplay loop muted playsinline></video>' // Note: .mov might have limited browser support
    },
    'post3': {
        title: 'New Project Title 3 (Placeholder)',
        image: 'Images/calculator-dash.png', // Placeholder image
        description: 'This is a placeholder for Project 3. Detailed description will go here. This project showcases skills in X, Y, and Z.',
        technologies: ['Tech A', 'Tech B'],
        video: '' // No video for this placeholder
    },
    'post4': {
        title: 'New Project Title 4 (Placeholder)',
        image: 'Images/rock-paper-s-top.png', // Placeholder image
        description: 'This is a placeholder for Project 4. Detailed description will go here. It involved innovative approaches to problem-solving.',
        technologies: ['Tech C', 'Tech D'],
        video: '' // No video for this placeholder
    }
};

// Function to open the modal and populate content
function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) {
        console.error('Project data not found for:', projectId);
        return;
    }

    modalTitle.textContent = data.title;
    modalImage.src = data.image;
    modalImage.alt = data.title; // Set alt text for accessibility
    modalDescription.textContent = data.description;

    modalTechnologies.innerHTML = ''; // Clear previous technologies
    data.technologies.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        modalTechnologies.appendChild(li);
    });

    modalVideoContainer.innerHTML = data.video || ''; // Add video if present

    // If video content was added, try to set playbackRate
    if (data.video) {
        const videoElement = modalVideoContainer.querySelector('video');
        if (videoElement) {
            videoElement.playbackRate = 2.0; // Set desired playback rate e.g. 2.0 for double speed
            videoElement.play().catch(error => console.log("Video play interrupted or failed:", error)); // Autoplay might be blocked
        }
    }

    projectModal.classList.add('modal-open');
}

// Function to close the modal
function closeModal() {
    projectModal.classList.remove('modal-open');
    // Stop video if any was playing (important for actual video elements)
    // Add a slight delay to allow the modal-out animation to start before clearing content
    setTimeout(() => {
        modalVideoContainer.innerHTML = '';
    }, 300); // Match this delay to CSS transition duration for opacity/visibility
}

// Event Listeners
openModalButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const projectId = this.dataset.project;
        openModal(projectId);
    });
});

if(closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

// Close modal if user clicks outside of the modal content
window.addEventListener('click', function(event) {
    if (event.target === projectModal) {
        closeModal();
    }
});

// Optional: Close modal with Escape key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && projectModal.classList.contains('modal-open')) {
        closeModal();
    }
});