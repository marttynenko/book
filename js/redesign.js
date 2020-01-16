document.addEventListener("DOMContentLoaded",function(){
	let d = document;


	d.querySelector('.ht-cities-toggler')
	.addEventListener('click',function(){
		this.classList.toggle('opened')
		this.nextElementSibling.classList.toggle('opened')
	});

	$(".mask-phone").mask("+375 (999)-999-99-99");


});