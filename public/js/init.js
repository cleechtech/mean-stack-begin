window.bootstrap = function(){
	angular.bootstrap(document, ['mean-stack-begin']);
};

window.init = function(){
	window.bootstrap();
};

$(function(){
	if (window.location.hash == "#_=_") window.location.hash = "";
	
	window.init();
});
