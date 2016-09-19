/* @file site-magic.js
 * @brief Enables the interaction on siviter.xyz
 * @Copyright (c) 2016 Taylor Siviter
 * This source code is licensed under the MIT License.
 * For full information, see the LICENSE file in the project root.
 */
 
/// Wait for the document to be ready and initialise
$(document).ready(function() {
  fixMobileHeights();
  buttonTriggers();
  windowTriggers();
  enableGoogleAnalytics();
});

function buttonTriggers()
/// Enable all button functionality
{
  /// Activate the current menu tab if we are on its page
  $('#menu').find('a[href="/' + getTopLevelPathname() + '/"]').addClass('active')
  
  /// Scroll the page down for mobile users on down arrow click/touch
  $('#scroll-mobile').on('click touch', function ()
  {
    $('html, body').animate({ scrollTop: $(window).innerHeight() }, 1250);
  });
}

function windowTriggers()
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

function fixMobileHeights()
/// Fixes varying heights of the side-column on mobile where the viewport changes size
/// when scrolled down - i.e. the search bar collapses up, etc.
{
  var isMobile = window.matchMedia("only screen and (max-width: 600px)").matches;
  if (isMobile) {
    $('#side-column').css('height', $(window).height() + "px");
    $('#side-column').css('min-height', $(window).height() + "px");
  }
  return;
}

/*
 * Utility functions
 */

function enableGoogleAnalytics()
/// Enable Google Analytics
{
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-80839244-1', 'auto');
  ga('send', 'pageview');
}
 
function getTopLevelPathname()
/// Finds the top level directory of the current path or url.
/// Credit @see http://stackoverflow.com/a/10290657
{
  var path = top.location.pathname;
  path = path.replace(/#[^#]+$/, "").replace(/\?[^\?]+$/, "").replace(/\/$/, "");
  return path.substr(path.lastIndexOf("/") + 1);
}

/// Fireflies with lampyridae.coffee in the side-column
$(document).ready(function() {
  var canvas, createFireflies, fireflies, total, updateFireflies;
  var isMobile = window.matchMedia("only screen and (max-width: 600px)").matches;
  
  require('particle/firefly');
  
  canvas = new Lampyridae.Canvas('world', 'firefly-canvas');

  Lampyridae.Firefly.prototype.speedMax = (isMobile) ? 3 : 5;
  Lampyridae.Firefly.prototype.enableGlow = true;
  Lampyridae.Firefly.prototype.glowFactor = 4;

  total = (isMobile) ? 8 : 15;
  fireflies = [];

  (createFireflies = function() {
    var firefly, i, j, ref, results;
    results = [];
    for (i = j = 0, ref = total; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      firefly = new Lampyridae.Firefly(canvas, {bound: "periodic"});
      results.push(fireflies.push(firefly));
    }
    return results;
  })();

  updateFireflies = function() {
    var i, j, ref, results;
    results = [];
    for (i = j = 0, ref = total; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      results.push(fireflies[i].update());
    }
    return results;
  };

  canvas.addUpdate(canvas.draw.clear);
  canvas.addUpdate(updateFireflies);
  canvas.animate();
  
  /// Allow the animation pause state to be toggled by the user 
  $('#firefly-pause').on('click touch', function () { canvas.pause(); });
});