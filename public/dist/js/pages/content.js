var elem = document.querySelector(".js-switch");
var switchery = new Switchery(elem);

var arrContent = [];

var contentId = ""; // using to edit. if edit then `idContent` will avalibale else `idContent` = ""

defaults = {
  color: "#64bd63",
  secondaryColor: "#dfdfdf",
  jackColor: "#fff",
  jackSecondaryColor: null,
  className: "switchery",
  disabled: false,
  disabledOpacity: 0.5,
  speed: "0.1s",
  size: "default"
};

$(document).ready(function () {
  getListContent();
  // switchery
  elem.addEventListener("click", function () {
    if (!elem.checked) {
      swal({
        title: "Are you sure?",
        text: "You won't disable anwers of bot!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        allowOutsideClick: false
      })
        .then(result => {
          console.log(result);
          $("#btn_answer_1").attr("disabled", "disabled");

          var arrInput = $("#form_answers .input-group");

          for (let i = 1; i < arrInput.length; i++) {
            arrInput[i].remove();
            $("#form_answers br").remove();
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      $("#btn_answer_1").removeAttr("disabled");
    }
  });

  $("#tags_1").tagsInput({ width: "auto" });
});

// when save button clicked
function saveContent() {
  var answer = [];
  var user_say = $("#tags_1").tagsInput()[0].value;
  var element = $("");
  var arrIsAnswer = $(".form-control");
  var arrIsActive = $(".is_active");
  for (let i = 0; i < arrIsActive.length; i++) {
    if (arrIsActive[i].checked && arrIsAnswer[i].value) {
      console.log(i);
      answer.push(arrIsAnswer[i].value);
    }
  }
  content = { user_say, answer, topic: "topic", lang: "vi" };
  console.log("value : ", content);
  if (!contentId) {
    $.ajax({
      url: "/content/create",
      method: "post",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(content)
    })
      .success(function (result) {
        getListContent();
        resetContent();
      })
      .error(function (error) {
        console.log(error);
      });
  } else {
    // edit
    $.ajax({
      url: `/content/update?contentId=${contentId}`,
      method: "put",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(content)
    })
      .success(function (result) {
        getListContent();
        contentId = ""; // reset
        resetContent();
      })
      .error(function (error) {
        console.log(error);
      });
  }
}

// when reset button clicked
function resetContent() {
  $("#tags_1").importTags("bạn tên gì, tên của bạn là gì");

  $("#btn_answer_1").removeAttr("disabled");

  $("#switchStatus").prop('checked', true);

  elem.checked = true;
  onChange(elem);

  // reset first input
  $(".form-control")[0].value = "";
  $(".is_active")[0].checked = true;

  var arrInput = $("#form_answers .input-group");
  for (let i = 1; i < arrInput.length; i++) {
    arrInput[i].remove();
    $("#form_answers br").remove();
  }

}

function addNewAnswerTextbox() {
  str =
    "<br> " +
    '<div class="input-group bot-replies"> ' +
    '<span class="input-group-addon">' +
    '  <input id="is_active[]" name="is_active[]" type="checkbox" checked  class="is_active">' +
    "</span>" +
    '<input id="is_answer[]" name="is_answer[]" type="text" class="form-control" >' +
    "</div>";
  $("#form_answers").append(str);
}

// edit button clicked
function editContent(id) {
  contentId = arrContent[id]._id; // using for update

  let content = arrContent[id];
  console.log("content.user_say : ", content.user_say);
  $("#tags_1").importTags(content.user_say);

  // remove old input-group element if existed
  $("#form_answers .input-group").remove();
  $("#form_answers .enter-line").remove();
  let str = "";
  if (content.answer && content.answer.length > 0) {
    content.answer.forEach(el => {
      str += `
			<div class="input-group">
				<span class="input-group-addon">
					<input id="is_active[]" name="is_active[]" type="checkbox" checked  class="is_active">
				</span>
				<input id="is_answer[]" name="is_answer[]" type="text" class="form-control" value = "${el}">
			</div>
			<div class="enter-line">
				<br>
			</div>
		`;
    });
    $("#form_answers").append(str);
  }
}

function confirmDeleteContent(id) {
  swal({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  })
    .then(result => {
      //Add delete code here ====== QV
      let idContent = arrContent[i]._id;
      $.ajax({
        url: `/content/delete?id=${idContent}`,
        method: "delete"
      })
        .success(function (result) {
          getListContent();
        })
        .error(function (error) {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
}

function getListContent() {
  $.get("/content/list", function (data, status) {
    if (status == "success") {
      // set data
      arrContent = data;
      $("#content_table tbody").remove();
      str = "<tbody>";
      if (data && data.length > 0) {
        data.forEach((el, i) => {
          str += `
					<tr>
						<td>${el._id}</td>
						<td>${el.user_say}</td>
						<td>${el.answer.toString()}</td>
						<td>
							<a href="javascript:void(0)" onclick="editContent(${i})">
							<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>
						</td>
						<td>
						  <a href="javascript:void(0)" title="Nhấn vào đây để xóa" style="color: #dd4b39;" onclick="confirmDeleteContent(${i})">
							<i class="fa fa-times-circle" aria-hidden="true"></i> Xóa</a>
						</td>
					</tr>
				`;
        });
      }
      str += "</tbody>";
      console.log(str);
      $("#content_table").append(str);
    } else {
      console.log("error");
    }
  });
}

// chang checkbox
function onChange(el) {
  if (typeof Event === 'function' || !document.fireEvent) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, true);
      el.dispatchEvent(event);
  } else {
      el.fireEvent('onchange');
  }
}