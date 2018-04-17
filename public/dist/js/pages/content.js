function addNewAnswerTextbox() {
	str = '<br> ' +
		     '<div class="input-group"> ' +
                          '<span class="input-group-addon">' +
                          '  <input id="is_active[]" name="is_active[]" type="checkbox" checked>' +
                          '</span>' +
                          '<input id="is_answer[]" name="is_answer[]" type="text" class="form-control">' +
                        '</div>';
    $("#form_answers").append(str);
}

function editContent(id) {
	alert(id);
}

function confirmDeleteContent(id) {
	swal({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			  //Add delete code here ====== QV
		})
}