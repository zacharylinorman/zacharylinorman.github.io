function openInNewTab(url){
	window.open(url, '_blank');
}
function scroll(div){
	$(window).scrollTo($('#'+div), 800, {offset: -25%});
}