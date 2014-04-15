/*
	KeepAsFixed Plugin for jQuery
	
	Programmed by S.Daron
	
	This plugin is offered under the MIT license:
	
	(c) 2014 by S.Daron
	
	Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:
    
    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.
   
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function($){

    $.KeepAsFixed = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el; 
        base.clone = base.$el.clone().css({'visibility':'hidden'}).hide();
        base.clone.find("*").removeAttr("id");
        base.clone.insertAfter(base.$el);
        base.topPosition = 0;
		// Merge the defaultOptions with any options passed in
        base.options = options;
        base.init = function(){

	        if(base.$el.offset()){
		        base.topPosition = base.$el.offset().top + base.options.offset + (base.options.bottom?base.$el.height():0);
		        $(window).bind('scroll resize',function (event) {
				        var y = $(this).scrollTop();
				        if (base.topPosition !== 0 && y >= base.topPosition) {
					        base.$el.css('position','fixed').addClass(base.options.classFixed).fadeIn();
                            base.clone.show();
                            base.options.onFix();
				        } else if (base.$el.css('position') == 'fixed') {
					        base.$el.css('position','static').removeClass(base.options.classFixed);
                            base.clone.hide();
                            base.options.onUnFix();
				        }
			        //}
		        });
	        }
            return base;
        };
        return base.init();
    };
	
	
    $.fn.keepAsFixed = function(options){
        var opts = $.extend({}, $.fn.keepAsFixed.defaults, options);
        return this.each(function(){
            var fixed = new $.KeepAsFixed($(this), opts);
        });
    };

    $.fn.keepAsFixed.defaults = {
		    bottom: false,
		    offset: 0,
		    classFixed: "fixed",
		    onFix: function(){},
		    onUnFix: function(){},
            depth: 3
    };
	
})(jQuery);
