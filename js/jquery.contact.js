jQuery(document).ready(function(){
	/* Submitting contact form */
	$('#contactform').submit(function(){

		if($("input.agreeTerms:checked").length==0){
			$(".message").html("Please agree to the terms and conditions!");
			$(".message").addClass("text-danger").fadeIn();
			return false;
		}
		if (grecaptcha.getResponse() == ""){
		    $(".message").html("You must verify yourself as a human!");
			$(".message").addClass("text-danger").fadeIn();
		    return false;
		}
		var action = $(this).attr('action');
		$('.message').hide();
		$('.sendBtn').attr('disabled','disabled');

		$.post(action, {
			firstName: $('#firstName').val(),
			lastName: $('#lastName').val(),
			city: $('#city').val(),
			email: $('#email').val(),
			subject: $('#subject').val(),
			comment: $('#comment').val(),
			fblink: $('#fblink').val(),			
			insta: $('#insta').val(),
			twitter: $('#twitter').val(),
			linkedin: $('#linkedin').val(),
			website: $('#website').val(),
			hear: ($("input[name='optHear']:checked").length==0) ? "" : $("input[name='optHear']:checked").val()
		},
			function(data){
				$(".message").html(data);
				$(".message").fadeIn();
				$(".message").addClass("text-danger");
				$('.sendBtn').removeAttr('disabled');
				if(data.match('success') != null){ 
					$(".message").removeClass("text-danger").addClass("text-success");			
				}

			}
		);

		return false;

	});


	/* Submitting video form */
	/*$('#videoform').submit(function(){
		if($("input.agreeTerms:checked").length==0){
			$(".message").html("Please agree to the terms and conditions!");
			$(".message").addClass("text-danger").fadeIn();
			return false;
		}
		var action = $(this).attr('action');
		$('.message').hide();
		$('.sendBtn').attr('disabled','disabled');

		$.post(action, {
			name: $('#name').val(),
			stageName: $('#nickName').val(),
			email: $('#email').val(),
			subcribed: ($("input.subscribe:checked").length==0) ? "No" : "Yes",
			contVideo: $('#contVideo').val(),
			ytLink: $('#ytLink').val()
		},
			function(data){
				$(".message").html(data);
				$(".message").fadeIn();
				$(".message").addClass("text-danger");
				$('.sendBtn').removeAttr('disabled');
				if(data.match('success') != null){ 
					$(".message").removeClass("text-danger").addClass("text-success");			
				}

			}
		);

		return false;

	});*/

});