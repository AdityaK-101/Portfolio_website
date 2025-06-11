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

// Modal functionality
const modal = document.getElementById('project-modal');
const closeButton = document.querySelector('.close-button');
const openModalButtons = document.querySelectorAll('.open-modal-button');

// Project data
const projectData = {
    'post1': {
        title: 'Calculator in Python',
        description: 'A sophisticated calculator application built with Python, featuring a clean and intuitive user interface. The calculator supports basic arithmetic operations, scientific calculations, and includes error handling for invalid inputs.',
        image: 'Images/calculator-dash.png',
        video: 'Images/calculator-vid.mp4',
        technologies: ['Python', 'Tkinter', 'Object-Oriented Programming']
    },
    'post2': {
        title: 'Rock-Paper-Scissors',
        description: 'An interactive implementation of the classic Rock-Paper-Scissors game. Features include score tracking, animated results, and a user-friendly interface. The game implements computer AI for challenging gameplay.',
        image: 'Images/rock-paper-s-top.png',
        video: 'Images/rock-paper-s-vid.mov',
        technologies: ['Python', 'Random Module', 'Game Logic']
    },
    'post3': {
        title: 'New Project Title 3',
        description: 'This is a placeholder for Project 3. Describe your project here.',
        image: 'Images/calculator-dash.png',
        technologies: ['Tech A', 'Tech B']
    },
    'post4': {
        title: 'New Project Title 4',
        description: 'This is a placeholder for Project 4. Describe your project here.',
        image: 'Images/rock-paper-s-top.png',
        technologies: ['Tech C', 'Tech D']
    }
};

function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Update modal content
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-image').src = project.image;
    
    // Update technologies list
    const techList = document.getElementById('modal-technologies');
    techList.innerHTML = '';
    project.technologies.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        techList.appendChild(li);
    });

    // Handle video content
    const videoContainer = document.getElementById('modal-video-container');
    videoContainer.innerHTML = ''; // Clear previous video
    
    if (project.video) {
        const video = document.createElement('video');
        video.src = project.video;
        video.controls = true;
        video.autoplay = false;
        video.loop = false;
        video.muted = false;
        video.playsInline = true;
        videoContainer.appendChild(video);
    }

    // Show modal
    modal.classList.add('modal-open');
}

function closeModal() {
    // Stop any playing video
    const video = document.querySelector('#modal-video-container video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    modal.classList.remove('modal-open');
}

// Event Listeners
openModalButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const projectId = this.dataset.project;
        openModal(projectId);
    });
});

closeButton.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('modal-open')) {
        closeModal();
    }
});