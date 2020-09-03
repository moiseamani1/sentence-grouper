



$('.ui.sticky').sticky({
	offset  :0,
	context: '#secondarySegment'
});

$('#messageTip').on('click', function() {
    $(this).closest('.message').transition('fade');
});



//Sizing functions--Implemented for different screen sizes
$(window).resize(function () {
	
if (window.innerWidth < 1330){
	$("#fbButtonText").hide();
	$("#twitterButtonText").hide();
	$("#linkedinButtonText").hide();
	if(window.innerWidth < 1095){
		$("#smallScreenShareSC").show();
		$("#fbButton").hide();
		$("#twitterButton").hide();
		$("#linkedinButton").hide();
		if(window.innerWidth < 700) { //Some arbitrary mobile width
      		$(".sidebar").addClass('top').removeClass('vertical');
	 		$(".ui.rail").hide();
   		}
	}
}	

if (window.innerWidth > 700) {
	//Internet explorer margin adjustments
	$("#secondarySegment").css({"display": "table", "margin": "auto"});
	
	$(".sidebar").removeClass('top').addClass('vertical');
	$(".ui.rail").show();
	if(window.innerWidth > 1095){
		$("#smallScreenShareSC").hide();
		$("#fbButton").show();
		$("#twitterButton").show();
		$("#linkedinButton").show();
		if(window.innerWidth > 1330){
			$("#fbButtonText").show();
			$("#twitterButtonText").show();
			$("#linkedinButtonText").show();	
		}	
	}
}
});

$(document).ready(function() {

if (window.innerWidth < 1330){
	$("#fbButtonText").hide();
	$("#twitterButtonText").hide();
	$("#linkedinButtonText").hide();
	if(window.innerWidth < 1095){
		$("#smallScreenShareSC").show();
		$("#fbButton").hide();
		$("#twitterButton").hide();
		$("#linkedinButton").hide();
		if(window.innerWidth < 700) { //Some arbitrary mobile width
      		$(".sidebar").addClass('top').removeClass('vertical');
	 		$(".ui.rail").hide();
   		}
	}
}	

if (window.innerWidth > 700) {
	//Internet explorer margin adjustments
	$("#secondarySegment").css({"display": "table", "margin": "auto"});
	
	$(".sidebar").removeClass('top').addClass('vertical');
	$(".ui.rail").show();
	if(window.innerWidth > 1095){
		$("#smallScreenShareSC").hide();
		$("#fbButton").show();
		$("#twitterButton").show();
		$("#linkedinButton").show();
		if(window.innerWidth > 1330){
			$("#fbButtonText").show();
			$("#twitterButtonText").show();
			$("#linkedinButtonText").show();	
		}	
	}
}

});




