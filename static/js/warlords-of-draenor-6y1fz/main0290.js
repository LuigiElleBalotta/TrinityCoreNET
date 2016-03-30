(function($) {
  "use strict";

  // Object create shim/polyfill
  if (typeof Object.create !== "function") {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
  }

})(jQuery);
