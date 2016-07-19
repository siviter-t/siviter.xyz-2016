/*!
 * \file site-magic.js
 * \author Taylor Siviter
 * \date July  2016
 * \brief Enables the interaction on siviter.xyz
 * \copyright Mozilla Public License, Version 2.0.
 * This Source Code Form is subject to the terms of the MPL, v. 2.0. If a copy of the MPL was
 * not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
 
/// Wait for the document to be ready and initialise
$(document).ready(function() {
  buttonTriggers();
  scrollTriggers();
  fixHeights();
  googleAnalytics();
});

function buttonTriggers()
/// Enable all button functionality
{
  /// Scroll the page down for mobile users on down arrow click/touch
  $('#scroll-arrow').on('click touch', function ()
  {
    $('html, body').animate({ scrollTop: $(window).innerHeight() }, 1250);
  });
}

function scrollTriggers()
/// Enable all scrolling functionality
{
  // Change site-nav when scrolled past the sidebar
  $(window).on('scroll', function() {
    if ($(document).scrollTop() > 3 * $(window).innerHeight() / 4) {
      $('#site-nav').addClass('nav-fix');
    } else {
      $('#site-nav').removeClass('nav-fix');
    }
  });
}

function fixHeights()
/// Fix changing heights of the sidebar. Primarily for mobile where the viewport changes size
/// when scrolled down - i.e. the search bar collapses up, etc.
{
  $(window).resize(function () {
    var isMobile = window.matchMedia("only screen and (max-width: 600px)");
    if (isMobile.matches)
      $('#side-column').height($(window).innerHeight());
    else
      $('#side-column').height('100vh');
  });
}

function googleAnalytics()
/// Enable Google Analytics
{
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-80839244-1', 'auto');
  ga('send', 'pageview');
}

/*
 * Example usage of lampyridae.coffee
 */

(function() {
  $(document).ready(function() {
    var animate, bugs, canvas, createBugs, numOfBugs, update;
    canvas = new Lampyridae.Canvas('world', '#canvas-enclosure');
    Lampyridae.bugSpeedMax = 5;
    numOfBugs = 15;
    bugs = [];
    createBugs = function() {
      var bug, i, j, ref;
      for (i = j = 0, ref = numOfBugs; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        bug = new Lampyridae.Bug(canvas);
        bugs.push(bug);
      }
    };
    animate = function() {
      canvas.draw.clear();
      update();
      requestAnimationFrame(animate);
    };
    update = function() {
      var i, j, ref;
      for (i = j = 0, ref = numOfBugs; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        bugs[i].update();
      }
    };
    createBugs();
    animate();
  });

}).call(this);