// "https://drive.google.com/uc?export=view&id=19MMZ3d2WTVit4xNKcSvpuR6M3Ou09Fwi",
// setTimeout(function() {location.reload();}, 2000);
//for image model when clicked => https://www.w3schools.com/css/css3_images.asp

var NOT_EXIST = 'https://bherekhet.github.io/404.html';
var year = 2019;

var image_not_found = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.thestahlman.com%2FCommon%2Fimages%2Fjquery%2Fgalleria%2Fimage-not-found.png&f=1&nofb=1";
var cap_project;
$(document).ready(function () {
  var stu_id, f_name, l_name, avatar, title, desc, keywords, images, video, brochure, presentation, resume, reso, class_photo, outstanding, presenter, ga, links;
  var wrapper, stu_details, stu_profile, pro_title, stu_project, proj_details, proj_images, keys, stu_resources;

  const url =
    "https://bherekhet.github.io/data/2019.json";

  /*------------------------------------- fetches student data from json file -------------------------------------*/
  // traverse the students object and display corresponding data in a styled format
  $.getJSON(url, {
    format: "json",
  }).done(function (data, success) {
    cap_project = data;
    console.log('this is a ' + success);

    if (success == 'success') {

      /*  This section handles Student capstone project    */
      for (i in data.studentData) {
        stu_id = data.studentData[i]["id"];
        f_name = data.studentData[i]["firstName"] + ' ';
        l_name = data.studentData[i]["lastName"];
        data.studentData[i]['profilePicture'] == ""
          ? avatar = image_not_found
          : avatar = data.studentData[i]['profilePicture']
        // avatar = data[i]["profilePicture"];
        title = data.studentData[i]["projectTitle"];
        desc = data.studentData[i]["projectDesc"];
        keywords = (data.studentData[i]["keywords"]).split(',');

        data.studentData[i]["images"][0] == "" || null
          ? images[0] = image_not_found
          : images = data.studentData[i]["images"];

        data.studentData[i]['presentation'] != ''
          ? presentation = { 'link': data.studentData[i]['presentation'], 'color': '#DDDAF9' }
          : presentation = { 'link': NOT_EXIST, 'color': '#faf3dd' }

        data.studentData[i]['video'] != ''
          ? video = { 'link': data.studentData[i]['video'], 'color': '#DDDAF9' }
          : video = { 'link': NOT_EXIST, 'color': '#faf3dd' }

        data.studentData[i]['brochure'] != ''
          ? brochure = { 'link': data.studentData[i]['brochure'], 'color': '#DDDAF9' }
          : brochure = { 'link': NOT_EXIST, 'color': '#faf3dd' }

        data.studentData[i]['resume'] != ''
          ? resume = { 'link': data.studentData[i]['resume'], 'color': '#DDDAF9' }
          : resume = { 'link': NOT_EXIST, 'color': '#faf3dd' }

        createCapstoneElements();
      }
      /* This section handles the rest of the page : other data from json  -- student class images, outstanding student ....*/
      class_photo = data.other.classPhoto;
      outstanding = data.other.outstanding;
      presenter = data.other.presenter;
      ga = data.other.ga;
      links = data.other.links;
      // console.log(class_photo, outstanding, presenter, ga, links);
      createOtherElements(class_photo, outstanding, presenter, ga, links);


    } else {
      console.log('Something went wrong, data is corrupt');
    }
  });

  /*-------------------------------------------------- creates the page -------------------------------------*/
  function createCapstoneElements() {

    /*  bigger screen left and right box*/
    var left = $("<div/>", {
      class: "left"
    });
    var right = $("<div/>", {
      class: "right"
    });


    //a wrapper for every student
    wrapper = $("<div>", {
      id: "wrapper"
    });

    //student profile 
    stu_profile = $('<div>', {
      class: 'student_profile'
    })

    stu_details = $("<div>", {
      id: "details"
    });

    //hold student profile image
    stu_details.append(`<img src=${avatar} alt="${f_name} ${l_name}'s image">`)

    //div to hold student name
    stu_details.append($("<span>", {
      class: "fname"
    }).text(f_name));
    stu_details.append($("<span>", {
      class: "lname"
    }).text('' + l_name));


    stu_profile.append(stu_details);

    //Student project div
    stu_project = $("<div>", {
      class: "project_visuals"
    });

    left.append(stu_profile);
    left.append(stu_project);

    proj_images = $("<div>", {
      class: "images", id: '' + stu_id,
    });
    proj_images.append($("<img>", {
      src: images[0],
      id: `proj_img_${stu_id}_0`,
      alt: `${title} image`
    }));
    stu_project.append(proj_images);


    //next and prev button for scrolling through project images 
    var btns = 2; // 0 = previous, 1 = next
    var value = '&#8250';
    var button = 'previous';
    buttons = $("<div>", {
      class: "buttons", id: '' + stu_id,
    });
    for (var i = 0; i < btns; i++) {
      if (i == 1) {
        value = "&#8250";
        button = 'next'
      } else {
        value = "&#8249";
        button = "previous"
      }
      buttons.append('<input type="button" id="' + button + '_button" value="' + value + '"/>');
    }
    stu_profile.append(buttons)

    //project description
    proj_details = $('<div>', {
      class: 'project_details'
    });

    //Project title
    pro_title = $("<div>", {
      class: 'title'
    }).append($("<span>", {
      class: "title"
    }).text(title));

    stu_resources = $('<div>', { class: 'keys' });
    //keywords
    keys = $('<div>', {
      class: 'keywords'
    })
    for (i in keywords) {
      keys.append(`<span class='chip'>${keywords[i]}</span>`);
    }

    stu_resources.append(pro_title);
    stu_resources.append(keys);

    proj_details.append(stu_resources);

    proj_details.append($("<p>", {
      class: "desc"
    }).text(desc));

    // wrapper.append(stu_project);
    // wrapper.append(proj_details)
    right.append(proj_details);

    //vide, presentation, brochure, resume  => student resources, all resources combined to => reso

    reso = $('<div>', {
      class: 'resources',
    }).append(`<span class='res-box' style="background-color:${presentation.color}"><a href=${presentation.link}>Presentation</a></span>`)
      .append(`<span class='res-box' style="background-color:${brochure.color}"><a href=${brochure.link}>Brochure</a></span>`)
      .append(`<span class='res-box' style="background-color:${resume.color}"><a href=${resume.link}>Resume</a></span>`)
      .append(`<span class='res-box' style="background-color:${video.color}"><a href=${video.link}>Video</a></span>`);

    right.append(reso);
    // wrapper.append(reso);
    wrapper.append(left);
    wrapper.append(right);


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


function createOtherElements(class_photo, outstanding, presenter, ga, links) {
  /* -------------------------------- under Other: class photo section ----------------------------------*/
  var other_class_photo = $("<div>", {
    id: "other_class_photo"
  });

  other_class_photo.append(`<p>${year} Capstone Class Photos</p>`)
  var img_container = $("<div/>", {
    class: "img_container"
  })

  class_photo.forEach(element => {
    img_container.append(`<div class="thumbnail"><img src="${element.url}"/> <p class="left_to_right">${element.leftToRight}</p></div>`)
  });
  other_class_photo.append(img_container)

  $(".container").append(other_class_photo);

  /* ---------------------------------- under other: outstanding section ----------------------------------*/
  var other_outstanding = $("<div/>", {
    id: "other_outstanding"
  });

  var img_container = $("<div/>", {
    class: "img_container"
  })
  
  other_outstanding.append(`<p>${outstanding.title}</p>`)
  img_container.append(`<div class="thumbnail"><img src="${outstanding.url}"/> <p class="left_to_right">${outstanding.name}</p></div>`) 
  other_outstanding.append(img_container)
  $(".container").append(other_outstanding);

  /* ---------------------------------- under other: presenter section ----------------------------------*/
  var other_presenter = $("<div/>", {
    id: "other_presenter"
  });

  var img_container = $("<div/>", {
    class: "img_container"
  })
  
  other_presenter.append(`<p>${presenter.title}</p>`)
  img_container.append(`<div class="thumbnail"><img src="${presenter.url}"/> <p class="left_to_right">${presenter.name}</p></div>`) 
  other_presenter.append(img_container)
  $(".container").append(other_presenter);

  /* ---------------------------------- under other: ga section ----------------------------------*/
  var other_ga = $("<div/>", {
    id: "other_ga"
  });

  var img_container = $("<div/>", {
    class: "img_container"
  })
  
  other_ga.append(`<p>${ga.title}</p>`)
  img_container.append(`<div class="thumbnail"><img src="${ga.url}"/> <p class="left_to_right">${ga.names}</p></div>`) 
  other_ga.append(img_container)
  $(".container").append(other_ga);

  /* ---------------------------------- under other: additional links section ----------------------------------*/
  var other_links = $("<div/>", {
    id: "other_links"
  });

  var link_container = $("<div/>", {
    class: "link_container"
  })
  
  other_links.append(`<p>${links.title}</p>`)
  link_container.append(`<div><a href="${links.capstoneTempPDF}">Link to capstone project presentation template: PDF Version</a></div>`) 
  link_container.append(`<div><a href="${links.capstoneTempPPTX}">Link to capstone project presentation template: PowerPoint Version</a></div>`) 
  other_links.append(link_container)
  $(".container").append(other_links);

}

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

  if (images[current_index] != "") {
    $(`#${img_id}`).attr('src', `${images[current_index]}`);
  } else {
    $(`#${img_id}`).attr('src', `${image_not_found}`);
  }
  $(`#${img_id}`).attr('id', `${new_id}_${current_index}`);


  // imageExists(images[parseInt(current_index)], function (exists) {
  //   if (exists == true) {
  //     console.log('checked true');
  //     $(`#${img_id}`).attr('src', `${images[current_index]}`);
  //   } else {
  //     console.log('checked false');
  //     $(`#${img_id}`).attr('src', `${image_not_found}`);
  //   }

  //   $(`#${img_id}`).attr('id', `${new_id}_${current_index}`);

  // });
  // $(`#${img_id}`).fadeOut(1000, function () {
  //   console.log('gets here')
  //   $(`#${img_id}`).attr('src', '');
  //   $(`#${img_id}`).attr('src', `${images[current_index]}`).fadeIn(1000);
  //   $(`#${img_id}`).attr('id', `${new_id}_${current_index}`);
  // });
}


/*---------------------------------------Checking if image url is valid and exists -------------------------------------*/
/*
                                                NOTE TO SELF

Image checking doesn't work yet. The problem seems to be with the 'foreach' loop. foreach loop and async function
don't work well together. I need the images links validated before the rest of the respective part of page loads and
*the problem I am having is that the loops would complete first before all links are validated.
I am adding minor checks for images, I will come back to this later.

*/
/*


function imageExists(url, callback) {
  console.log('this is the url it is getting = ' + url);
  var img = new Image();
  img.onload = function () { callback(true); };
  img.onerror = function () { callback(false); };
  img.src = url;
}

async function imageExist(url, callback) {
  return new Promise(resolve => {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  })
}

function checkImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};


function asyncTest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('I am tired');
    }, 5000);
  });
}


$(`#${img_id}`).fadeOut(1000, function () {
    // console.log('CHECKING FOR OLD ')
    //checking if image exists
    imageExists(images[parseInt(current_index)], function (exists) {
      console.log('studet id ' + new_id + 'current index' + current_index)
      console.log('RESULT: url=' + images[current_index] + ', exists=' + exists);
      $(`#${img_id}`).attr('src', '');

      if (exists == true) {
        console.log('checked true');
        $(`#${img_id}`).attr('src', `${images[current_index]}`).show();
      } else {
        console.log('checked false');
        $(`#${img_id}`).attr('src', `${image_not_found}`).show();
      }
    })

    $(`#${img_id}`).attr('id', `${new_id}_${current_index}`);
  });

*/