var images;
var img_index;
$(document).ready(function () {
  var stu_id, f_name, l_name, title, desc, keywords;
  var wrapper, stu_details, pro_title, stu_projec, proj_images, buttons;

  const url =
    "https://bherekhet.github.io/data/2020.json";

  // traverse the students object and display corresponding data in a styled format
  $.getJSON(url, {
    format: "json",
  }).done(function (data) {
    for (i in data) {
      for (j in data[i]) {
        stu_id = data[i]["id"];
        f_name = data[i]["firstName"];
        l_name = data[i]["lastName"];
        title = data[i]["projectTitle"];
        desc = data[i]["projectDesc"];
        keywords = data[i]["keywords"];
        images = data[i]["images"];
      }
      createElements(stu_id);
    }
  });

  function createElements() {
    // console.log('here is student id'+stu_id)
    //a wrapper for every student
    wrapper = $("<div>", {
      id: "wrapper"
    });

    //a div for project image, title, desc
    pro_title = $("<div>", {
      class: 'title'
    }).append($("<span>", {
      class: "title"
    }).text(title));
    stu_projec = $("<div>", {
      class: "project"
    });
    stu_projec.append(pro_title);

    //project images
    proj_images = $("<div>", {
      class: "images"
    });
    img_index = 0;
    // for (i in images) {
    //   projImages.append($("<img>", {
    //     src: images[i]
    //   }));
    // };
    proj_images.append($("<img>", {
      src: images[img_index],
      id: `proj_img_${stu_id}`,
    }));
    stu_projec.append(proj_images);

    //next and prev button for scrolling through project images 
    var btns = 2; // 0 = previous, 1 = next
    var value = 'previous';
    buttons = $("<div>", {
      class: "buttons",
      id: ''+stu_id,
    });
    for (var i = 0; i < btns; i++) {
      if (i == 1) {
        value = "next";
      } else {
        value = "previous";
      }
      buttons.append('<input type="button" id="' + value + '_button" value="' + value + '"/>');
    }
    stu_projec.append(buttons)

    //project description
    stu_projec.append($("<p>", {
      class: "desc"
    }).text(desc));

    wrapper.append(stu_projec);

    //div to hold student name, project title, desc and more buttons => combined
    stu_details = $("<div>", {
      id: "details"
    });
    stu_details.append($("<span>", {
      class: "fname"
    }).text(f_name));
    stu_details.append($("<span>", {
      class: "lname"
    }).text(l_name));
    wrapper.append(stu_details);

    $(".container").append(wrapper);
  }


  //when prev button is clicked
  $(document).on("click", "#previous_button", function () {
    var id = $(this).parent().attr('id');
    var img_id = $(`#proj_img_${id}`).attr('id');
    prev(img_id);
  });

  //when next button is clicked 
  $(document).on("click", "#next_button", function () {
    var id = $(this).parent().attr('id');
    var img_id = $(`#proj_img_${id}`).attr('id');
    next(img_id);
  });

  // //when image is clicked
  // $(document).on("click", ".images", function () {
  //   $("body").css("background-image", "url('"+images[img_index]+"')");

  // })
});


function prev(id) {
  var img_len = images.length
  console.log('current index' + img_index);
  if (img_index > 0) {
    img_index = img_index - 1;
  } else {
    img_index = img_len - 1;
  }
  console.log('passed id '+id)
  $(`#${id}`).attr("src", images[img_index]);

  console.log('after ' + img_index)
}

function next(id) {
  var img_len = images.length
  console.log(img_len + ' = length , index before "next" cliked ' + img_index)

  if (img_index > img_len - 2) {
    img_index = 0;
  } else {
    img_index = img_index + 1;
  }
  $(`#${id}`).attr("src", images[img_index]);

  console.log("after " + img_index)
}