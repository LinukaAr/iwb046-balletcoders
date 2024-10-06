/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {

  "use strict";

  /* Preloader
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  setTimeout(function () {
    $('.loader_bg').fadeToggle();
  }, 1500);

  /* Tooltip
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });


  /* Mouseover
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $(".main-menu ul li.megamenu").mouseover(function () {
      if (!$(this).parent().hasClass("#wrapper")) {
        $("#wrapper").addClass('overlay');
      }
    });
    $(".main-menu ul li.megamenu").mouseleave(function () {
      $("#wrapper").removeClass('overlay');
    });
  });


  /* Toggle sidebar
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    });
  });

  /* Product slider 
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  // optional
  $('#blogCarousel').carousel({
    interval: 5000
  });

  /* Search
 -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  const searchIcon = document.getElementById('search-icon'),
    searchClose = document.getElementById('search-close'),
    searchContent = document.getElementById('search-content');

  /* Search show */
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchContent.classList.add('show-search');
    });
  }

  /* Search hidden */
  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchContent.classList.remove('show-search');
    });
  }

  /*navbar*/
  let navbar = document.querySelector('.site-navbar ul');
  let menuIcon = document.querySelector('#menu-icon');

  menuIcon.onclick = () => {
    navbar.classList.toggle('open');
  }

  window.onscroll = () => {
    navbar.classList.remove('open');
  }

  let header = document.querySelector('.email');

  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
  });

});


//-------------------------------------------fetchNewsData--------------------------------------
function fetchNewsData() {
  $.ajax({
    url: "http://localhost:8081/AgriNews", 
    method: "GET",
    success: (data) => {
      // Check if data.articles exists and is an array
      if (!data.articles || !Array.isArray(data.articles)) {
        console.error("Invalid news data:", data);
        alert("Invalid news data received.");
        return;
      }

      // Loop through the first 3 articles and update the UI
      data.articles.forEach((article, index) => {
        if (index < 3) { // Assuming you're displaying the top 3 articles
          // Update the image
          $(`#imgN${index + 1}`).attr("src", article.urlToImage);

          // Update the article link
          $(`#a${index + 1}`).attr("href", article.url);

          // Update the title
          $(`#title${index + 1}`).text(article.title);

          // Update the description
          $(`#p${index + 1}`).text(article.description);

          // Update the published time
          const publishedDate = new Date(article.publishedAt);
          const formattedDate = publishedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          $(`#ptime${index + 1}`).text(`Last updated on ${formattedDate}`);
        }
      });
    },
    error: (xhr, status, error) => {
      console.error("Error fetching news:", error);
      alert("Failed to fetch news data.");
    }
  });
}

// Call the function when the document is ready
$(document).ready(function() {
  fetchNewsData();
});
