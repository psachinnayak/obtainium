// Focus the first input field in a modal, if it exists.

$("body").delegate(".modal", "shown.bs.modal", function(evt) {
	$("input[type!='hidden']", evt.currentTarget).get(0).focus();
});

$("body").delegate("form", "submit", function(evt) {
	var form = $(evt.currentTarget);

	$.ajax({
		url: form.attr("action"),
		type: form.attr("method"),
		data: form.serialize(),
		dataType: "json",
		success: function(data) {
			form.parents(".modal").modal("hide");
			console.log("Done", data);
		}
	});

	evt.preventDefault();
});
