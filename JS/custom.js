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


