/* =========================================================
   script.js
   Small, beginner-friendly JavaScript for the CV page.
   Handles: mobile menu toggle, active nav link on scroll,
   subtle scroll-reveal animation, and the footer year.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Mobile navigation toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    // Toggle the open state on both the menu and the button
    navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');

    // Update aria-expanded for accessibility
    const isOpen = navLinks.classList.contains('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close the mobile menu after a link is clicked
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 2. Highlight the active nav link while scrolling ---------- */
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    // Find the section closest to the top of the viewport
    let currentSectionId = sections[0].id;
    const scrollPosition = window.scrollY + 120; // offset for sticky header

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPosition) {
        currentSectionId = section.id;
      }
    });

    allNavLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // run once on page load

  /* ---------- 3. Subtle reveal animation for each section ---------- */
  // Mark each section (except the hero) as a "reveal" element
  sections.forEach(function (section) {
    if (section.id !== 'home') {
      section.classList.add('reveal');
    }
  });

  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once revealed, so it only animates one time
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- 4. Automatically set the footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
