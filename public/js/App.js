document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const mainNav = document.getElementById('main-nav');
    const backNav = document.getElementById('back-nav');
    const backButton = document.getElementById('back-button');

    function showSection(sectionId) {
        // Remove active class from all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Toggle navigation visibility
        if (sectionId === 'home') {
            mainNav.style.display = 'block';
            backNav.style.display = 'none';
        } else {
            mainNav.style.display = 'none';
            backNav.style.display = 'block';
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Back button functionality
    backButton.addEventListener('click', function() {
        showSection('home');
    });

    // API health check
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            console.log('API Status:', data);
        })
        .catch(error => {
            console.error('API Error:', error);
        });

    // Initialize with home section active
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
    }

    // Circuit markers interactivity
    const circuitMarkers = document.querySelectorAll('.circuit-marker');
    const tooltip = document.getElementById('circuit-tooltip');
    const tooltipFlag = document.querySelector('.tooltip-flag');
    const tooltipName = document.querySelector('.tooltip-name');
    const tooltipTrack = document.querySelector('.tooltip-track');

    circuitMarkers.forEach(marker => {
        // Click event to show circuit info
        marker.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all markers
            circuitMarkers.forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked marker
            this.classList.add('active');
            
            // Get circuit data
            const flag = this.getAttribute('data-flag');
            const name = this.getAttribute('data-name');
            const track = this.getAttribute('data-track');
            
            // Get marker position
            const markerRect = this.getBoundingClientRect();
            const mapContainer = document.querySelector('.world-map');
            const containerRect = mapContainer.getBoundingClientRect();
            
            // Calculate relative position
            const relativeX = markerRect.left - containerRect.left;
            const relativeY = markerRect.top - containerRect.top;
            
            // Update tooltip content
            tooltipFlag.textContent = flag;
            tooltipName.textContent = name;
            tooltipTrack.textContent = track;
            
            // Position tooltip next to marker
            tooltip.style.left = (relativeX + 20) + 'px';
            tooltip.style.top = (relativeY - 10) + 'px';
            
            // Show tooltip
            tooltip.classList.add('show');
            
            // Hide tooltip after 4 seconds
            setTimeout(() => {
                tooltip.classList.remove('show');
                this.classList.remove('active');
            }, 4000);
        });

        // Hover effects
        marker.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.filter = 'drop-shadow(0 0 15px #8a2be2)';
            }
        });

        marker.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.filter = 'drop-shadow(0 0 8px #8a2be2)';
            }
        });
    });

    // Team cards functionality
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const driversInfo = this.querySelector('.drivers-info');
            const isExpanded = this.classList.contains('expanded');
            
            // Close all other team cards
            teamCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('expanded');
                    otherCard.querySelector('.drivers-info').style.display = 'none';
                }
            });
            
            // Toggle current card
            if (isExpanded) {
                this.classList.remove('expanded');
                driversInfo.style.display = 'none';
            } else {
                this.classList.add('expanded');
                driversInfo.style.display = 'block';
            }
        });
    });
});

// News toggle functionality
function toggleNews(newsItem) {
    const preview = newsItem.querySelector('.news-preview');
    const fullContent = newsItem.querySelector('.news-full');
    
    if (fullContent.style.display === 'none') {
        // Expand news
        preview.style.display = 'none';
        fullContent.style.display = 'block';
        newsItem.classList.add('expanded');
    } else {
        // Collapse news
        preview.style.display = 'block';
        fullContent.style.display = 'none';
        newsItem.classList.remove('expanded');
    }
}
