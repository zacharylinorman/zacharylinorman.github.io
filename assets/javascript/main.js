$(document).ready(function(){

    $(window).scroll(function(){
		$("#scrollBar").css({opacity:$(window).scrollTop()/(window.innerHeight*0.925)});
		if($(window).scrollTop()==0){
			$("#scrollBar").css({display:"none"});
		}else{
			$("#scrollBar").css({display:"block"});
		}
    });

});
function srl(div){
	$(window).scrollTo($('#'+div), 800, {offset: -window.innerHeight*0.0749});
}
function openInNewTab(url){
	window.open(url, '_blank');
}