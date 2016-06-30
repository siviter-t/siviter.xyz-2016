/*!
 * \file site-magic.js
 * \author Taylor Siviter
 * \version 0.1.0
 * \date June 2016
 * \brief Enables the interaction on siviter.xyz
 * \copyright Mozilla Public License, Version 2.0.
 * This Source Code Form is subject to the terms of the MPL, v. 2.0. If a copy of the MPL was
 * not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
 
/*global $*/ // Telling Cloud9 to accept this

/// Wait for the document to be ready and initialise
$(document).ready(function() {
   button_triggers();
});

function button_triggers()
/// Enable all button functionality
{
   /// Scroll the page down for mobile users on down arrow click/touch
   $('#scroll_arrow').click( function()
   {
      $("html, body").animate({ scrollTop: $(window).innerHeight() }, 1250);
   });
}