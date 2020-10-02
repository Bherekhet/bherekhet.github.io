
var cap_project;
$(document).ready(function () {
  var stu_id, f_name, l_name, title, desc, keywords, images;
  var wrapper, stu_details, pro_title, stu_projec, proj_images, buttons;

  const url =
    "https://bherekhet.github.io/data/2020.json";

  // traverse the students object and display corresponding data in a styled format
  $.getJSON(url, {
    format: "json",
  }).done(function (data) {
    cap_project = data;
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
      createElements();
    }
  });

  function createElements() {
    // console.log('cap project data', cap_project);
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
      class: "images", id: '' + stu_id,
    });
    // for (i in images) {
    //   projImages.append($("<img>", {
    //     src: images[i]
    //   }));
    // };
    proj_images.append($("<img>", {
      src: images[0],
      id: `proj_img_${stu_id}_0`,
    }));
    stu_projec.append(proj_images);

    //next and prev button for scrolling through project images 
    var btns = 2; // 0 = previous, 1 = next
    var value = 'previous';
    buttons = $("<div>", {
      class: "buttons", id: '' + stu_id,
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

  $(document).on("click", "#previous_button", function () {
    var id = $(this).parent().attr('id');
    nextORprev('prev', id);
  });

  //when next button is clicked 
  $(document).on("click", "#next_button", function () {
    var id = $(this).parent().attr('id');
    nextORprev('next', id);
  });
});

//when either next or prev button clicked
//id = when prev button is clicked, 
//images = find the id which represents which student => get all images using the id from array(contains every student data)
//img_id = find current image id so it can be updated when looping to another image
function nextORprev(button, id) {
  var images = cap_project.find(stu => stu.id == id)['images'];
  var img_id = $(`#${id}.images`).find('img').attr('id');
  var img_index = img_id.substring(img_id.lastIndexOf('_') + 1);

  var img_len = images.length
  var current_index = parseInt(img_index);

  if (button == ('prev')) {
    if (current_index > 0) {
      current_index = current_index - 1;
    } else {
      current_index = img_len - 1;
    }
  } else {
    if (current_index > img_len - 2) {
      current_index = 0;
    } else {
      current_index = current_index + 1;
    }
  }
  var new_id = img_id.substring(0, img_id.lastIndexOf('_'));
  $(`#${id}.images`).find('img').replaceWith(`<img id=${new_id}_${current_index} src="${images[current_index]}"/>`);

  //transition 
  transition();
}

//image trasition function
function transition() {

}