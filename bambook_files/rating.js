(function(a){a.fn.webwidget_rating_simple=function(p){var p=p||{};

	var b=p&&p.rating_star_length?p.rating_star_length:"5";

	var c=p&&p.rating_function_name?p.rating_function_name:"";

	var e=p&&p.rating_initial_value?p.rating_initial_value:"";

	var d=p&&p.directory?p.directory:"image";

	var f="";

	var g=a(this);

	b=parseInt(b);

	init();

	g.next("ul").children("li").hover(function(){



	jQuery(this).parent().children("li").css('background-image','url(/'+d+'/nst3.png)');

	jQuery(this).parent().children("li").last().css('background-image','url(/'+d+'/nst4.png)');



	var a=jQuery(this).parent().children("li").index(jQuery(this));

	jQuery(this).parent().children("li").slice(0,a+1).css('background-image','url(/'+d+'/sth3.png)')
	if(a==4) {
	jQuery(this).parent().children("li").last().slice(0,a+1).css('background-image','url(/'+d+'/sth4.png)')
	}
	// console.log(a+1);
	},

	function(){});

	g.next("ul").children("li").click(function(){var a=jQuery(this).parent().children("li").index(jQuery(this));

	f=a+1;

	g.val(f).change();



	if(c!=""){eval(c+"("+g.val()+")")}});g.next("ul").hover(function(){},function(){

		if(f==""){

		jQuery(this).children("li").css('background-image','url(/'+d+'/nst3.png)');

		jQuery(this).children("li:last").css('background-image','url(/'+d+'/nst4.png)');

	}

	else{

		jQuery(this).children("li").css('background-image','url(/'+d+'/nst3.png)');

		jQuery(this).children("li").last().css('background-image','url(/'+d+'/nst4.png)');

	jQuery(this).children("li").slice(0,f).css('background-image','url(/'+d+'/sth3.png)')

	if(f==5) {
		jQuery(this).children("li:last").slice(0,f).css('background-image','url(/'+d+'/sth4.png)')
	}


}});



	function init(){jQuery('<div style="clear:both;"></div>').insertAfter(g);g.css("float","left");

	var a=jQuery("<ul>");a.attr("class","webwidget_rating_simple");

	for(var i=1;i<=b;i++){

		a.append('<li style="background-image:url(/'+d+'/nst3.png)"><span>'+i+'</span></li>');

		// a.find('li').last().append('<li style="background-image:url(/'+d+'/nst3.png)"><span>'+i+'</span></li>');



	}a.insertAfter(g);

	if(e!=""){

		f=e;

		g.val(e);

		g.next("ul").children("li").slice(0,f).css('background-image','url(/'+d+'/sth3.png)');

		// g.next("ul").children("li").last().slice(0,f).css('background-image','url(/'+d+'/sth4.png)');

	}}}})(jQuery);