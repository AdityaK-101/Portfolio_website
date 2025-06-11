console.log('Its working')

document.getElementById('theme-style').href = 'dark.css';

// Modal functionality
const modal = document.getElementById('project-modal');
const closeButton = document.querySelector('.close-button');
const openModalButtons = document.querySelectorAll('.open-modal-button');

// Project data
const projectData = {
    'post1': {
        title: 'AI Coding Tutor application',
        description: '<ul><li>Built an interactive coding tutor using Python, Streamlit, and OpenRouter Mistral API (all free resources)</li><li>Features modules for chat-based code help, quizzes, and learning resources</li><li>Designed for real-time assistance and personalized programming roadmaps</li><li>Enhances coding education through interactive learning</li></ul>',
        image: 'Images/AItutor1.png',
        video: 'Images/calculator-vid.mp4',
        technologies: ['Python', 'Streamlit', 'MongoDB', 'OpenRouter Mistral API', 'SQL']
    },
    'post2': {
        title: 'GPS Outlier detection',
        description: '<ul><li>Developed a GPS anomaly detection system using Z-Score, Isolation Forest, DBSCAN, and Random Forest, improving vehicle trajectory accuracy by 84% .</li><li>Built modules for data preprocessing, path smoothing, and map visualization using pandas, scikit-learn, geopandas, and Dash/Folium.</li></ul>',
        image: 'Images/rock-paper-s-top.png',
        video: 'Images/rock-paper-s-vid.mov',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'Geopandas', 'Dash/Folium']
    },
    'post3': {
        title: 'Excel Automation',
        description: '<ul><li>Built an Excel automation tool using Python, significantly reducing manual report generation time by 90% through pivot table creation, fetching required information for summary and formatting with pandas and openpyxl.</li></ul>',
        image: 'Images/Excelauto.png',
        technologies: ['Python', 'Pandas', 'Openpyxl']
    },
    'post4': {
        title: 'Portfolio Website',
        description: '<ul><li>Designed and developed a personal portfolio website using HTML, CSS, and JavaScript to showcase projects, skills, and achievements.</li></ul><ul><li>Emphasized a clean layout, responsive design, and intuitive navigation to enhance user experience.</li></ul>',
        image: 'Images/Portfolioweb.png',
        technologies: ['HTML', 'CSS', 'JavaScript']
    }
};

function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Update modal content
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').innerHTML = project.description;
    
    // Handle image
    const imageElement = document.getElementById('modal-image');
    const imageContainer = document.getElementById('modal-image-container');
    if (project.image) {
        imageElement.src = project.image;
        imageContainer.style.display = 'block';
        imageElement.onerror = function() {
            imageContainer.style.display = 'none';
        };
    } else {
        imageContainer.style.display = 'none';
    }
    
    // Update technologies list
    const techList = document.getElementById('modal-technologies');
    techList.innerHTML = '';
    project.technologies.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        techList.appendChild(li);
    });

    // Handle video content
    const videoOuterContainer = document.getElementById('modal-video-outer-container');
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
        video.onerror = function() {
            videoOuterContainer.style.display = 'none';
        };
        videoContainer.appendChild(video);
        videoOuterContainer.style.display = 'block';
    } else {
        videoOuterContainer.style.display = 'none';
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