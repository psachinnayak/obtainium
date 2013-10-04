// Focus the first input field in a modal, if it exists.
var body = $("body");
body.delegate(".modal", "shown.bs.modal", function(evt) {
	$("input[type!='hidden']", evt.currentTarget).get(0).focus();
});

// Handle form uploads using XHR
body.delegate("form", "submit", function(evt) {
	var form = $(evt.currentTarget);

	$.ajax({
		url: form.attr("action"),
		type: form.attr("method"),
		data: form.serialize(),
		dataType: "json",
		success: function() {
			form.parents(".modal").modal("hide");
			$("body").trigger(form.attr("data-success"), arguments)
		}
	});

	evt.preventDefault();
});

// Reset the form when the modal is hidden
body.delegate(".modal", "hidden.bs.modal", function(evt) {
	$("form").each(function() { this.reset() });
});
