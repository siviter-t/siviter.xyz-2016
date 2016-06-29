
/*global $*/ // Telling Cloud9 to accept this

$(function() {
      $('#scroll_arrow').click( function()
           {
             $("html, body").animate({ scrollTop: $(window).innerHeight() }, 1250);
           }
      );
});
