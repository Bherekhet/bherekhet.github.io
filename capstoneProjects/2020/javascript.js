// "https://drive.google.com/uc?export=view&id=19MMZ3d2WTVit4xNKcSvpuR6M3Ou09Fwi",
// setTimeout(function() {location.reload();}, 2000);
//for image model when clicked => https://www.w3schools.com/css/css3_images.asp

var NOT_EXIST = 'https://bherekhet.github.io/404.html';

var image_not_found = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.thestahlman.com%2FCommon%2Fimages%2Fjquery%2Fgalleria%2Fimage-not-found.png&f=1&nofb=1";
var cap_project;
$(document).ready(function () {
  var stu_id, f_name, l_name, avatar, title, desc, keywords, images, video, brochure, presentation, resume, reso;
  var wrapper, stu_details, stu_profile, pro_title, stu_project, proj_details, proj_images, keys, stu_resources;

  const url =
    "https://bherekhet.github.io/data/2020.json";

  /*------------------------------------- fetches student data from json file -------------------------------------*/
  // traverse the students object and display corresponding data in a styled format
  $.getJSON(url, {
    format: "json",
  }).done(function (data, success) {
    cap_project = data;
    if (success == 'success') {
      console.log(cap_project.studentData);
      for (i in data.studentData) {
        console.log('okay before ' + i)
        stu_id = data[i]["id"];
        f_name = data[i]["firstName"] + ' ';
        l_name = data[i]["lastName"];
        data[i]['profilePicture'] == ""
          ? avatar = image_not_found
          : avatar = data[i]['profilePicture']
        // avatar = data[i]["profilePicture"];
        title = data[i]["projectTitle"];
        desc = data[i]["projectDesc"];
        keywords = (data[i]["keywords"]).split(',');

        /*                         ---------------------- Test below case for images                           */
        
        images = data[i]["images"][0] == "" || null
          ? images = image_not_found
          : images = data[i]["images"];

        data[i]['presentation'] != ''
          ? presentation = { 'link': data[i]['presentation'], 'color': '#DDDAF9' }
          : presentation = { 'link': NOT_EXIST, 'color': '#faf3dd' }

        data[i]['video'] != ''
          ? video = { 'link': data[i]['video'], 'color': '#DDDAF9' }
          : video = { 'link': NOT_EXIST, 'color': '#faf3dd' }

        data[i]['brochure'] != ''
          ? brochure = { 'link': data[i]['brochure'], 'color': '#DDDAF9' }
          : brochure = { 'link': NOT_EXIST, 'color': '#faf3dd' }

        data[i]['resume'] != ''
          ? resume = { 'link': data[i]['resume'], 'color': '#DDDAF9' }
          : resume = { 'link': NOT_EXIST, 'color': '#faf3dd' }

        createElements();
      }

    } else {
      console.log('Something went wrong, data is corrupt');
    }
  });

  /*-------------------------------------------------- creates the page -------------------------------------*/
  function createElements() {

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
    // wrapper.append(stu_profile);

    //Student project div
    stu_project = $("<div>", {
      class: "project_visuals"
    });

    left.append(stu_profile);
    left.append(stu_project);

    //a div for project image, title, description and more-buttons
    // pro_title = $("<div>", {
    //   class: 'title'
    // }).append($("<span>", {
    //   class: "title"
    // }).text(title));
    // stu_project.append(pro_title);
    //project images
    proj_images = $("<div>", {
      class: "images", id: '' + stu_id,
    });
    proj_images.append($("<img>", {
      src: images[0],
      id: `proj_img_${stu_id}_0`,
      alt: `${title} image`
    }));
    stu_project.append(proj_images);


    console.log('-----------------')
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
      buttons.append('<input type="button" id="' + button + '_button" value="'+value+'"/>');
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
      console.log('test me ' + keywords[i])
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
    console.log('this is valid ' + images[current_index])
    $(`#${img_id}`).attr('src', `${images[current_index]}`);
  } else {
    console.log('image not found ' + images[current_index]);
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