$(function() {

	var form = $("#ajax-contact");
	var form_msg = $("#form-messages");

	$(form).submit(function(event) {

		event.preventDefault();

		var form_data = $(form).serialize();

		$.ajax({

			type: "POST",
			url: $(form).attr("action"),
			data: form_data
		})

		.done(function(response) {

			$(form_msg).removeClass("error");
			$(form_msg).addClass("success");

			$(form_msg).text(response);

			$("#name").val("");
			$("#email").val("");
			$("#message").val("");
		})

		.fail(function(data) {

			$(form_msg).removeClass("success");
			$(form_msg).addClass("error");

			if (data.responseText !== "") {

				$(form_msg).text(data.responseText);

			} else {

				$(form_msg).text("Sorry! An error has occured with the inters of nets, your messaged couldnt be sent");
			}
		});
	});
});