$(document).ready(function() {
	$('.phone').each(function() {
		$(this).wrapInner('<a href="tel:' + $(this).text() + '"></a>');
	});
	$('form *[placeholder], .profile-page *[placeholder]').each(function() {
		var text = $(this).attr('placeholder');
	});
	if ($('.block_info').height() < 300) {
		$('.block_info').height(300);
	}
	$(document).on('click', '.check_city', function(event) {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		} else {
			$(this).addClass('active');
			$(this).next().slideDown(300);
		}
	});
	$(document).on('click', '.btn_drop', function(event) {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).find('>ul').slideUp(300);
			$(this).find('.categoryes').slideUp(300);
		} else {
			$('.btn_drop').each(function(index, el) {
				$(this).removeClass('active');
				$(this).find('>ul').slideUp(300);
				$(this).find('.categoryes').slideUp(300);
			});
			$(this).addClass('active');
			$(this).find('>ul').slideDown(300);
			$(this).find('.categoryes').slideDown(300);
		}
	});
	$(document).on('click', '.visible_link', function(event) {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).closest('.main_cat').find('.visible').addClass('hidden').removeClass('visible');
		} else {
			$(this).addClass('active');
			$(this).closest('.main_cat').find('.hidden').addClass('visible').removeClass('hidden');
		}
	});
	jQuery('.link_map').magnificPopup({
		items: {
			src: '/map.html'
		},
		type: 'ajax',
		overflowY: 'scroll',
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
	});
        
        //добавляем попап для карты бамбук
        $(".add_card").attr('data-href', '/site/card');
        $(".add_card_active").attr('href', '/site/activatecard');
        $(".add_card_active").removeClass('a-ajax-data');
		
	
		$(".float-promo").hide();
		if (!getCookie(privacyStatementAccepted)) {
				$(".float-promo").show();
		}		
		
        
});
$(window).load(function() {
	item_card($('.category_products .item_card .spacer'));
	item_card($('.block_similar_action .item_card .spacer'));
	item_card($('.main_category_products .item_card .spacer'));
	addLink($('.block_categoryes .main_cat'));
	bgimage($('.block_all_news .image'));
	linkSearch();
});

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

function addLink(ul) {
	var thisEl = ul;
	thisEl.each(function(index, el) {
		if ($(this).find('li').length > 3) {
			$(this).find('li').each(function(index, el) {
				if ($(this).index() > 2) {
					$(this).addClass('hidden');
				}
			});
			var count = $(this).find('.hidden').length;
			$(this).append('<a href="javascript:void(0)" class="visible_link">Еще ' + count + '</a>');
		}
	});
}
$(document).on('click', '.a-ajax-data', function() {
	var a = $(this);
	$.magnificPopup.open({
		items: {
			src: a.attr('data-href')
		},
		type: 'ajax',
		overflowY: 'scroll',
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
		callbacks: {
			open: function() {}
		},
	});
	return false;
});

function checkSignup() {
	$(".signup-error").html('');
	$(".form-control").removeClass('error');
	error = 0;
	if (!$("#user-username").val()) {
		$(".signup-name-error").html('Введите Имя');
		$("#user-username").addClass('error');
		error = 1;
	}
	if (!$("#user-email").val()) {
		$(".signup-email-error").html('Введите Email');
		$("#user-email").addClass('error');
		error = 1;
	} else if (!isValidEmail($("#user-email").val())) {
		$(".signup-email-error").html('Введите корректный Email');
		$("#user-email").addClass('error');
		error = 1;
	}
	if (!$("#user-phone").val()) {
		$(".signup-phone-error").html('Введите Телефон');
		$("#user-phone").addClass('error');
		error = 1;
	}
	if (!$("#user-enter_password").val()) {
		$(".signup-password-error").html('Введите пароль');
		$("#user-enter_password").addClass('error');
		error = 1;
	}
	if (!error) {
		$.post("/site/ajax", {
			action: 'checkEmail',
			email: $("#user-email").val(),
			_csrf: yii.getCsrfToken()
		}, function(res) {
			if (res == 1) {
				$(".signup-email-error").html('Данный Email уже используется <a href="/site/request-password-reset">Забыли пароль?</a>');
				error = 1;
			} else {
				$.post("/site/ajax", {
					action: 'checkPhone',
					phone: $("#user-phone").val(),
					_csrf: yii.getCsrfToken()
				}, function(res) {
					if (res == 1) {
						$(".signup-phone-error").html('Данный Телефон уже используется <a href="/site/request-password-reset">Забыли пароль?</a>');
						$("#user-phone").addClass('error');
						error = 1;
					} else {
						$.post("/site/signup", $("#form-signup").serialize(), function(data) {
							if (data == 1) {
								location.reload();
							} else {
								$(".signup-password-error").html('Ошибка при регистрации');
								$("#user-enter_password").addClass('error');
							}
						});
					}
				});
			}
		});
	}
}

function checkLogin() {
	$(".login-error").html('');
	$(".form-control").removeClass('error');
	error = 0;
	if (!$("#loginform-username").val()) {
		$(".login-name-error").html('Введите email или телефон');
		$("#loginform-username").addClass('error');
		error = 1;
	}
	if (!$("#loginform-password").val()) {
		$(".login-password-error").html('Введите пароль');
		$("#loginform-password").addClass('error');
		error = 1;
		return false;
	}
	if (!error) {
		$.post("/site/login", $("#login-form").serialize(), function(data) {
			if (data == 1) {
				location.reload();
			} else {
				$(".login-password-error").html('Вы ввели неверные данные');
				$("#loginform-password").addClass('error');
			}
		});
	}
}

function checkContact() {
	$(".contact-error").html('');
	$(".form-control").removeClass('error');
	error = 0;
	if (!$("#contactform-name").val()) {
		$(".contact-name-error").html('Введите Имя');
		$("#contactform-name").addClass('error');
		error = 1;
	}
	if (!$("#contactform-email").val()) {
		$(".contact-email-error").html('Введите Телефон');
		$("#contactform-email").addClass('error');
		error = 1;
	}
	if (!$("#contactform-subject").val()) {
		$(".contact-subject-error").html('Введите заголовок');
		$("#contactform-subject").addClass('error');
		error = 1;
	}
	if (!$("#contactform-body").val()) {
		$(".contact-body-error").html('Введите сообщение');
		$("#contactform-body").addClass('error');
		error = 1;
	}
	if (!error) {
		$.post("/site/contact", $("#contact-form").serialize(), function(data) {
			if (data) {
				$(".contact-error").html('');
				$(".form-control").removeClass('error');
				$(".contact-body-error").html('Ваше сообщение было отправлено');
				$(".form-control").val('');
			} else {
				$(".contact-body-error").html('Не удалось отправить сообщение');
				$("#contactform-body").addClass('error');
			}
		});
	}
}

function logout() {
	$.post('/site/logout', {
		_csrf: yii.getCsrfToken()
	});
}

function isValidEmail(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}

function bgimage(selector) {
	selector.each(function(index, el) {
		$(this).find('img').css('display', '').closest($(this)).css({
			"background": "url(" + $(this).find('img').attr('src') + ") 50% 50% no-repeat",
			"backgroundSize": "cover"
		});
	});
}

function linkSearch() {
	$(document).on('click', '.variable a', function(event) {
		var val = $(this).text();
		$(this).closest('.right').find('input[type="text"]').val(val);
	});
}
$(document).on('click', '.btn_arrow', function(event) {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).closest('.block_product_descr').find('.text_wrapper_profile').slideDown(300);
		$(this).find('span').text('Свернуть');
	} else {
		$(this).addClass('active');
		$(this).closest('.block_product_descr').find('.text_wrapper_profile').slideUp(300);
		$(this).find('span').text('Развернуть');
	}
});
$(document).on('click', '.footer_menu .col', function(event) {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).find('>ul').slideUp(300);
	} else {
		$(this).addClass('active');
		$(this).find('>ul').slideDown(300);
	}
});

function setProductRating() {
	$.post("/site/ajax", {
		action: 'setProductRating',
		product_id: $("#product_id").val(),
		rating: $("#input_rating").val(),
		_csrf: yii.getCsrfToken()
	}, function(data) {
		if (data == 1) {
			$(".wrap_rating.active .hint2").show();
			$(".wrap_rating.active .hint2").delay(3000).slideUp(1).fadeOut(1);
		} else {
			location.reload();
		}
	});
}

function addToWishlist(product_id) {
	$.post("/site/ajax", {
		action: 'addToWishlist',
		product_id: product_id,
		_csrf: yii.getCsrfToken()
	}, function(data) {
		if (data == 1) {
			$(".wishlist_text_" + product_id).html('Удалить из избранное');
			$(".wishlist_text_" + product_id).closest("div").find("a").addClass("active");
			$.magnificPopup.open({
				items: {
					src: "/addToWishlist.html"
				},
				type: 'ajax',
				overflowY: 'scroll',
				removalDelay: 300,
				mainClass: 'my-mfp-zoom-in',
				callbacks: {
					open: function() {}
				},
			});
		} else if (data == 2) {
			$(".wishlist_text_" + product_id).html('Добавить в избранное');
			$(".wishlist_text_" + product_id).closest("div").find("a").removeClass("active");
			$.magnificPopup.open({
				items: {
					src: "/deleteFromWishlist.html"
				},
				type: 'ajax',
				overflowY: 'scroll',
				removalDelay: 300,
				mainClass: 'my-mfp-zoom-in',
				callbacks: {
					open: function() {}
				},
			});
		}
	});
}

function getProduct(product_id, prefix) {}

function getProductFree(product_id, prefix) {
	$.post("/site/ajax", {
		action: 'getProduct',
		product_id: product_id,
		prefix: prefix,
		_csrf: yii.getCsrfToken()
	}, function(data) {
		if (data) {
			if (data == 1) {
				$.magnificPopup.open({
					items: {
						src: "/outOfStockProduct.html"
					},
					type: 'ajax',
					overflowY: 'scroll',
					removalDelay: 300,
					mainClass: 'my-mfp-zoom-in',
					callbacks: {
						open: function() {}
					},
				});
			} else {
				$("#product_code").html(data);
				$(".code_generate").show();
                                $(".code_saved").show();
				$("#wrap_btns").hide();
				$("#hidden_wrap_btns").show();
			}
		} else {
			location.reload();
		}
	});
}
/**********************************************************************back-top*****************************************************************************/
jQuery(function () {
 jQuery(window).scroll(function () {
  if (jQuery(this).scrollTop() > 100) {
   jQuery('#back-top').fadeIn();
  } else {
   jQuery('#back-top').fadeOut();
  }
 });

 // scroll body to 0px on click
 jQuery('#back-top a').click(function () {
  jQuery('body,html').stop(false, false).animate({
   scrollTop: 0
  }, 800);
  return false;
 });
});

	//валидация форм
  function validate(form){
		var noerror = true;
		var patern_email = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		var patern_phone = /[^0-9\-\+\s\(\)]/;
		form.find('.error').removeClass('error');
		$('.wrap-error').remove();
		form.find('.required').each(function(){
			if ($(this).val() == ''){
				$(this).addClass('error');
				show_error($(this),'Поле не может быть пустым!');
				noerror = false;
			}
		});

		form.find('.email').each(function(){
			if ($(this).val() != '' && $(this).val().search(patern_email) != 0 && !$(this).hasClass('error')){
				$(this).addClass('error');
				show_error($(this),'Неверный e-mail!');
				noerror = false;
			}
		});

		form.find('.phone').each(function(){
			if ($(this).val() != '' && patern_phone.test($(this).val()) && !$(this).hasClass('error')){
				$(this).addClass('error');
				show_error($(this),'Неверный формат телефона!');
				noerror = false;
			}
		});

		form.find('.password').each(function(){
			if ($(this).val().length < 6 && !$(this).hasClass('error')){
				$(this).addClass('error');
				show_error($(this),'Длина пароля не меньше 6 символов!');
				noerror = false;
			}   
		});
                
		form.find('.msg_l').each(function(){
			if ($(this).val().length > 1000 && !$(this).hasClass('error')){
				$(this).addClass('error');
				show_error($(this),'Сообщение должно быть от 1 до 1000 символов!');
				noerror = false;
			}   
		});                

		form.find('.password2').each(function(){
			if ($(this).val() != $('.password').val() && !$('.password').hasClass('error')){
				$(this).addClass('error');
				show_error($(this),'Пароли не совпадают!');
				noerror = false;
			}
		});

		form.find('input.inputagree').each(function(){
			if (!$(this).is(':checked')){
				$(this).closest('label').addClass('error');
				noerror = false;
			}
		});
                
                form.find('.required_lenth').each(function(){
                        if ($(this).val().length < 3){
                            $(this).addClass('error');
                            show_error($(this),'Поле не может быть меньше 3-х символов');
                            noerror = false;
                        }                       
                });                 

		form.find('.captcha').each(function(){
		el_form = $(this);
			if ($(this).val() != ''){
				$.ajax({
					url:'/include/captcha_check.php?captcha_word=' + form.find('input[name="captcha_word"]').val() + '&captcha_sid=' + form.find('input[name="captcha_sid"]').val(),
					async:false,
					complete: function(data) {
					  if (data.responseText == 'N'){
							el_form.addClass('error');
							show_error(el_form,'Ошибка! неверный защитный код');
							noerror = false;
						}
					  else{
					  	$('.wrap-captcha').remove();
					  }
					}
				});
			}   
		});
     
    return noerror;
  }


  //отображаем сообщения об ошибках валидации форм
  function show_error(el,text){
		var id = 'error' + Math.floor(Math.random()*1000)*Math.floor(Math.random()*1000);
		//$error = $('<div class="wrap-error" style="opacity:0.01" id="' + id + '"><div class="text-error">' + text + '</div></div>');
		//el.after($error);      
		$('#' + id).css('bottom',- $('#' + id).height() + 2);
		el.attr('data-error',id).addClass('error');
		$('#' + id).fadeTo(200,1);
  }
  
///Отображение сообщения об ошибке c заливкой
function show_message(el,text,color){   
    $error = $('<div class="tool-message tool-message-' + color + '">' + text + '</div>');
    el.prepend($error);      
}


	var privacyStatementAccepted = '.samplesociety.privacyStatementAccepted';
    function setCookie(name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape(value) +
            ((expires) ? ("; expires=" + expires) : "") +
            ((path) ? ("; path=" + path) : "") +
            ((domain) ? ("; domain=" + domain) : "") +
            ((secure) ? "; secure" : "");
    }
    function getCookie(name) {
        var cookie = " " + document.cookie;
        var search = " " + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;
				
        if (cookie.length > 0) {
            offset = cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = cookie.indexOf(";", offset)
                if (end == -1) {
                    end = cookie.length;
                }
                setStr = unescape(cookie.substring(offset, end));
            }
        }
        return (setStr);
    }
    function closePrivacyStatementAccept() {
		setCookie(privacyStatementAccepted, 1, false, '/'); $(".float-promo").hide();
	}
