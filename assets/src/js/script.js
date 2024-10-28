document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.portfolio__category');
    const portfolioGallery = document.getElementById('portfolio-gallery');
    const ajaxUrl = portfolioGallery.getAttribute('data-ajax-url'); // Fetch the ajax URL from the data attribute

    // Handle category button clicks
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('portfolio__category--active'));
            // Add active class to the clicked button
            this.classList.add('portfolio__category--active');

            const categoryId = this.getAttribute('data-category-id');

            // AJAX request to fetch videos for the selected category
            fetchVideosByCategory(categoryId);
        });
    });

    // Function to fetch videos by category via AJAX
    function fetchVideosByCategory(categoryId) {
        fetch(ajaxUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `action=fetch_videos&category_id=${categoryId}`
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.data.length) {
                renderPortfolioItems(data.data);
            } else {
                console.warn('No videos found for this category');
                portfolioGallery.innerHTML = ''; // Clear gallery if no videos found
            }
        })
        .catch(error => console.error('Error fetching videos:', error));
    }

    // Function to render portfolio items in the gallery
    function renderPortfolioItems(portfolioItems) {
        // Clear the current gallery
        portfolioGallery.innerHTML = '';
    
        // Loop through each portfolio item
        portfolioItems.forEach(item => {
            const layoutType = item[0].layout_type;
            const itemDiv = document.createElement('div');
            itemDiv.className = `portfolio__item portfolio__item--${layoutType}`;
    
            // Loop through each video in the item
            item.forEach(video => {
                const videoDiv = document.createElement('div');
                
                // Add classes based on 'is_rounded' and if the video is empty
                videoDiv.className = `portfolio__video ${video.is_rounded ? 'portfolio__video--rounded' : ''} ${!video.video_url ? 'portfolio__video--empty' : ''}`;
    
                // Add video content if URL exists
                if (video.video_url) {
                    const videoElement = document.createElement('video');
                    videoElement.setAttribute('src', video.video_url);
                    videoElement.muted = true;
                    videoElement.loop = true;
                    videoElement.classList.add('video-preview');
    
                    // Set the poster attribute if available
                    if (video.thumbnail) {
                        videoElement.setAttribute('poster', video.thumbnail);
                    }
                    // Set the high-quality video as a data attribute
                    if (video.high_quality) {
                        videoElement.setAttribute('data-high-quality', video.high_quality);
                    }
    
                    videoDiv.appendChild(videoElement);
                }
    
                // Append the videoDiv to the itemDiv
                itemDiv.appendChild(videoDiv);
            });
    
            // Append the itemDiv to the portfolioGallery
            portfolioGallery.appendChild(itemDiv);
        });
    }
    
});
