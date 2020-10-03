// "https://drive.google.com/uc?export=view&id=19MMZ3d2WTVit4xNKcSvpuR6M3Ou09Fwi",

var cap_project;
$(document).ready(function () {
  var stu_id, f_name, l_name, avatar, title, desc, keywords, images, video, brochure, presentation, resume;
  var wrapper, stu_details, stu_profile, pro_title, stu_project, proj_images, keys, stu_resources;

  const url =
    "https://bherekhet.github.io/data/2020.json";

  /*------------------------------------- fetches student data from json file -------------------------------------*/
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
        avatar = data[i]["profilePicture"];
        title = data[i]["projectTitle"];
        desc = data[i]["projectDesc"];
        keywords = data[i]["keywords"];
        images = data[i]["images"];
        presentation = data[i]['presentation'];
        video = data[i]['video'];
        brochure = data[i]['brochure'];
        resume = data[i]['resume'];
      }
      createElements();
    }
  });

  /*-------------------------------------------------- creates the page -------------------------------------*/
  function createElements() {
    //a wrapper for every student
    wrapper = $("<div>", {
      id: "wrapper"
    });

    //student profile picture
    stu_profile = $('<div>', {
      class: 'avatar'
    }).append(`<img src=${avatar}>`);
    wrapper.append(stu_profile);

    //div to hold student name
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

    //Student project div
    stu_project = $("<div>", {
      class: "project"
    });

    //a div for project image, title, description and more-buttons
    pro_title = $("<div>", {
      class: 'title'
    }).append($("<span>", {
      class: "title"
    }).text(title));
    stu_project.append(pro_title);

    //project images
    proj_images = $("<div>", {
      class: "images", id: '' + stu_id,
    });
    proj_images.append($("<img>", {
      src: images[0],
      id: `proj_img_${stu_id}_0`,
    }));
    stu_project.append(proj_images);

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
    stu_project.append(buttons)

    //project description
    stu_project.append($("<p>", {
      class: "desc"
    }).text(desc));

    //keywords
    keys = $('<div>', {
      class: 'keywords'
    }).text(keywords);
    stu_project.append(keys);

    //vide, presentation, brochure, resume  => student resources
    stu_resources = $('<div>', {
      class: 'resources',
    }).append(`<span><a href=${presentation}>Presentation</a></span>`)
      .append(`<span><a href=${brochure}>Brochure</a></span>`)
      .append(`<span><a href=${resume}>Resume</a></span>`)
      .append(`<span><a href=${video}>Video</a></span>`);


    stu_project.append(stu_resources);

    wrapper.append(stu_project);

    $(".container").append(wrapper);
  }


  /*  --------------------------------------- next and previous button function --------------------------------*/
  //when previous button is clicked 
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

  //transition images function below
  $(`#${img_id}`).fadeOut(1000, function () {
    console.log('gets here')
    $(`#${img_id}`).attr('src', '');
    $(`#${img_id}`).attr('src', `${images[current_index]}`).fadeIn(1000);
    $(`#${img_id}`).attr('id', `${new_id}_${current_index}`);
  });
}