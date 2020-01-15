jQuery(document).ready(function($) {
	
    //$('input[type="radio"], select, input[type="checkbox"]').styler();
    $('input[type="radio"]:not(.nostyle), select:not(.nostyle), input[type="checkbox"]:not(.nostyle), input[type="file"]:not(.nostyle)').styler();
    if($(window).width()<960) {
	$(document).on('click', '.footer_menu .col', function(event) {
		if($(this).hasClass('active')) {
		$(this).removeClass('active');
    	$(this).find('ul').slideUp(300);
		} else {
		$(this).addClass('active');
      	$(this).find('ul').slideDown(300);
		}
		
	});
	}

	$(document).on('click', '.sidebar_menu_hidden:not(.sidebar_menu_hidden_2)', function(event) {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.category_filter').animate({'left': '-300px'}, 300);
			$(this).text('Показать меню');
		} else {
			$(this).addClass('active');
			$('.category_filter').animate({'left': '0px'}, 300)
			$(this).text('Скрыть меню');
		}
		
	});

	$(document).on('click', '.sidebar_menu_hidden_2', function(event) {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.category_filter_right').animate({'right': '-300px'}, 300);
			$(this).text('Показать меню');
		} else {
			$(this).addClass('active');
			$('.category_filter_right').animate({'right': '0px'}, 300)
			$(this).text('Скрыть меню');
		}
		
	});

	// $('input[type="radio"], select, input[type="checkbox"]').styler();
	$('.content table').wrap('<div class="wrap_table"></div>')
	bgimage($('.service_news .image'));
	bgimage2($('.item_card .image .wrap_bg_img'));
	item_card($('.block_search .item_card .spacer'));
});
$(window).load(function() {
  $(document).mouseup(function (e) {
    var container = $(".header .categoryes");
    if (container.has(e.target).length === 0 && $('.btn_drop').has(e.target).length === 0) {
      $('.btn_drop').removeClass('active');
      container.slideUp();
    }

    var container2 = $(".header .btn_drop_action ul");
    if (container2.has(e.target).length === 0 && $('.btn_drop_action').has(e.target).length === 0) {
      $('.btn_drop_action').removeClass('active');
      container2.slideUp();
    }

    var container3 = $(".wrap_city ul");
    if (container3.has(e.target).length === 0 && $('.wrap_city a').has(e.target).length === 0){
        $('.wrap_city a').removeClass('active');
        container3.slideUp();
    }
  });


	if($(window).width()<960) {
	$(document).on('click', '.footer_menu .col', function(event) {
		if($(this).hasClass('active')) {
		$(this).removeClass('active');
    	$(this).find('ul').slideUp(300);
		} else {
		$(this).addClass('active');
      	$(this).find('ul').slideDown(300);
		}
		
	});

	$(".footer_menu").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      	switch(direction) {
      		case "up":
      			$(this).find('.col ul').slideUp(300);
      			$(this).find('.col').removeClass('active');
      			break;
      	} 
    }
  });
	$(".header .categoryes").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      	switch(direction) {
      		case "up":
      			$(this).slideUp(300);
      			$('.btn_drop').removeClass('active');
      			break;
      	} 
    }
  });
  

	$(".btn_drop, .wrap_city").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      	switch(direction) {
      		case "up":
      			$(this).find('ul').slideUp(300);
      			$(this).removeClass('active');
      			break;
      	} 
    }
  });
	// $("body").swipe( {
 //    //Generic swipe handler for all directions
 //    allowPageScroll:"vertical",
 //    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
 //      	switch(direction) {
 //      		case "left":
 //      			$('.category_filter').animate({'left': '-300px'}, 300);
 //      			$('.sidebar_menu_hidden:not(.sidebar_menu_hidden_2').removeClass('active');

 //      			$('.category_filter_right').animate({'right': '0'}, 300);
 //      			$('.sidebar_menu_hidden_2').addClass('active');
 //      			break;
 //      		case "right":
 //      			$('.category_filter').animate({'left': '0'}, 300);
 //      			$('.sidebar_menu_hidden:not(.sidebar_menu_hidden_2').addClass('active');

 //      			$('.category_filter_right').animate({'right': '-300px'}, 300);
 //      			$('.sidebar_menu_hidden_2').removeClass('active');
 //      			break;

 //      	} 
 //    }
 //  });


}
});
function bgimage(selector) {
      selector.each(function(index, el) {
        $(this).find('img').css('display', 'none').closest($(this)).css({
        "background": "url('" + $(this).find('img').attr('src') + "') 50% 50% no-repeat",
        "backgroundSize": "cover"
        });
      }); 
    } 
function bgimage2(selector) {
      selector.each(function() {
        $(this).find('img').css('opacity', '0.01').closest('.wrap_bg_img').css({
        "background": "url('" + $(this).find('img').attr('src') + "') 50% 50% no-repeat",
        "backgroundSize": "cover"
        });
      }); 
    } 
function item_card(selector) {
    var Hmax = 0;
    selector.removeAttr('style');

    selector.each(function() {
        if ($(this).outerHeight() > Hmax) {
            Hmax = $(this).outerHeight();
        }
    });
    selector.height(Hmax);
  }