document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".portfolio__category");
    const portfolioGallery = document.getElementById("portfolio-gallery");
    const ajaxUrl = portfolioGallery.getAttribute("data-ajax-url"); 

    categoryButtons.forEach((button) => {
        button.addEventListener("click", function () {
            categoryButtons.forEach((btn) => btn.classList.remove("portfolio__category--active"));
            this.classList.add("portfolio__category--active");

            const categoryId = this.getAttribute("data-category-id");

            fetchVideosByCategory(categoryId);
        });
    });

    function fetchVideosByCategory(categoryId) {
        fetch(ajaxUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `action=fetch_videos&category_id=${categoryId}`
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                return response.json();
            })
            .then((data) => {
                if (data.success && data.data.length) {
                    renderPortfolioItems(data.data);
                } else {
                    console.warn("No videos found for this category");
                    portfolioGallery.innerHTML = "";
                }
            })
            .catch((error) => console.error("Error fetching videos:", error));
    }

    function renderPortfolioItems(portfolioItems) {
        portfolioGallery.innerHTML = "";

        portfolioItems.forEach((item) => {
            const layoutType = item[0].layout_type;
            const itemDiv = document.createElement("div");
            itemDiv.className = `portfolio__item portfolio__item--${layoutType}`;

            item.forEach((video) => {
                const videoDiv = document.createElement("div");

                videoDiv.className = `portfolio__video ${video.is_rounded ? "portfolio__video--rounded" : ""} ${
                    !video.video_url ? "portfolio__video--empty" : ""
                }`;

                if (video.video_url) {
                    const videoElement = document.createElement("video");
                    videoElement.setAttribute("src", video.video_url);
                    videoElement.muted = true;
                    videoElement.loop = true;
                    videoElement.classList.add("video-preview");

                    if (video.thumbnail) {
                        videoElement.setAttribute("poster", video.thumbnail);
                    }
                    if (video.high_quality) {
                        videoElement.setAttribute("data-high-quality", video.high_quality);
                    }

                    videoDiv.appendChild(videoElement);
                }

                itemDiv.appendChild(videoDiv);
            });

            portfolioGallery.appendChild(itemDiv);
        });
    }

    document.addEventListener("scroll", () => {
        const elements = document.querySelectorAll(".parallax__category");
        
        elements.forEach((element, index) => {
            const parentTop = element.parentElement.getBoundingClientRect().top;
    
                const relativeScroll = -parentTop; 

            if (index % 2 === 0) {
                element.style.transform = `translateY(${relativeScroll * 0.3}px)`;
            } else {
                element.style.transform = `translateY(${relativeScroll * -0.2}px)`;
            }
        });
    });
    
});
