// "https://drive.google.com/uc?export=view&id=19MMZ3d2WTVit4xNKcSvpuR6M3Ou09Fwi",
// setTimeout(function() {location.reload();}, 2000);
//for image model when clicked => https://www.w3schools.com/css/css3_images.asp

var NOT_EXIST = 'https://bherekhet.github.io/404.html';
var year = 2020;
var link_generator = `https://bherekhet.github.io/capstoneProjects/${year}/index.html#`

var image_not_found = "https://drive.google.com/uc?export=view&id=1dhIHvR-6e-6unG23D7tiW4dwcoWkUaIq";
var cap_project;
$(document).ready(function () {
  var stu_id, f_name, l_name, avatar, title, desc, keywords, images = [],
    video, brochure, presentation, contact, certificate, reso, class_photo, outstanding, presenter, ga;
  var wrapper, stu_details, stu_profile, pro_title, stu_project, proj_details, proj_images, keys, stu_resources, certificates;

  const url = `https://bherekhet.github.io/data/${year}.json`;

  // const url = "http://localhost/bherekhet.github.io/data/2020.json"

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
        f_name = data.studentData[i]["firstName"];
        l_name = data.studentData[i]["lastName"];
        data.studentData[i]['profilePicture'] == "" ?
          avatar = image_not_found :
          avatar = data.studentData[i]['profilePicture']
        // avatar = data[i]["profilePicture"];
        title = data.studentData[i]["projectTitle"];
        desc = data.studentData[i]["projectDesc"];
        keywords = (data.studentData[i]["keywords"]).split(',');
        // certificate = (data.studentData[i]["certificates"]).split(',')
        (data.studentData[i]["certificates"]) != null ?
          certificate = (data.studentData[i]["certificates"]) :
          certificate = null

        //checking for null valued images
        for (j in data.studentData[i]["images"]) {
          if (data.studentData[i]["images"][j] != null) {
            images.push(data.studentData[i]["images"][j])
          }
        }

        data.studentData[i]['presentation'] != null ?
          presentation = {
            'link': data.studentData[i]['presentation'],
            'color': '#0000ff'
          } :
          presentation = {
            'link': NOT_EXIST,
            'color': '#D3D3D3'
          }

        data.studentData[i]['video'].filter(x => {
            return x
          }).length > 0 ?
          video = {
            'link': data.studentData[i]['video'],
            'color': '#0000ff'
          } :
          video = null
        // console.log(data.studentData[i]['video'].filter(x => {return x}).length)

        data.studentData[i]['brochure'] != null ?
          brochure = {
            'link': data.studentData[i]['brochure'],
            'color': '#0000ff'
          } :
          brochure = {
            'link': NOT_EXIST,
            'color': '#D3D3D3'
          }

        data.studentData[i]['contact'] != null ?
          contact = data.studentData[i]['contact'] :
          contact = NOT_EXIST

        createCapstoneElements();
      }
      /* This section handles the rest of the page : other data from json  -- student class images, outstanding student ....*/
      class_photo = data.other.classPhoto;
      outstanding = data.other.outstanding;
      presenter = data.other.presenter;
      ga = data.other.ga;
      createOtherElements(class_photo, outstanding, presenter, ga);


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
      class: 'student_profile',
      id: `${f_name}${l_name}`
    })

    stu_details = $("<div>", {
      id: "details"
    });

    //hold student profile image
    stu_details.append(`<img src=${avatar} alt="${f_name} ${l_name}'s image">`)

    // div to hold student name
    stu_details.append($("<a>", {
      // href: `#${f_name + l_name}`
    }).text(f_name + ' ' + l_name))
    // stu_details.append($("<a>").text(f_name + ' ' + l_name))

    stu_profile.append(stu_details);

    //Student project div
    stu_project = $("<div>", {
      class: "project_visuals"
    });

    left.append(stu_profile);

    proj_images = $("<div>", {
      class: "images",
      id: '' + stu_id,
    });
    proj_images.append($("<img>", {
      src: images[0],
      id: `proj_img_${stu_id}_0`,
      alt: `${title} image`
    }));
    stu_project.append(proj_images);
    // console.log('this is image length' + images.length)


    //next and prev button for scrolling through project images 
    var btns = 2; // 0 = previous, 1 = next
    var value = '&#8250';
    var button = 'previous';
    buttons = $("<div>", {
      class: "buttons",
      id: '' + stu_id,
    });
    for (var i = 0; i < btns; i++) {
      if (i == 1) {
        value = "&#8250";
        button = 'next'
      } else {
        value = "&#8249";
        button = "previous"
      }
      if (images.length > 1)
        buttons.append('<input type="button" id="' + button + '_button" value="' + value + '"/>');

    }
    // stu_profile.append(buttons) -- adding to project visual for testing overlaying on an image
    if (images.length > 1) stu_project.append(buttons)

    /* test data for generating link and certificates */
    certificates = $("<div/>", {
      class: 'certificates'
    });
    if (certificate != null) {
      for (var key in certificate) {
        certificates.append(`<a href='${certificate[key]}'>${key}</a>`)
      }
      stu_project.append(certificates);
    }

    //------------- currently not implemented----------- for generating student link that is sharable
    var project_link = $("<div>", {
      class: 'project_link',
      id: stu_id
    });
    project_link.append(`Web link to ${f_name}'s project`)
    // project_link.append(`<a><button class="link_button">Link</button></a>`)
    // project_link.append(`<a href='http://localhost/bherekhet.github.io/capstoneProjects/2020/index.html#${f_name}${l_name}'><button value=${f_name}${l_name} class="link_button">Link</button></a>`)
    // stu_project.append(project_link)

    //contact info for students 
    var contact_info = $("<div>", {
      class: 'contact_me',
    });

    var address = contact
    if (contact.includes('@')) {
      address = 'mailto:' + contact;
    }
    contact_info.append(`<span><a href=${address}>Contact Me</a></span>`)
    stu_project.append(contact_info)


    left.append(stu_project);

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

    stu_resources = $('<div>', {
      class: 'keys'
    });
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
      }).append(`<span class='res-box'"><a style="color: ${brochure.color}" href=${brochure.link}>Brochure</a></span>`)
      .append(`<span class='res-box'"><a style="color: ${presentation.color}" href=${presentation.link}>Presentation</a></span>`)

    //show only 1 video button is there is less than 2 video link available
    // console.log(video.link)
    if (video == null) {
      reso.append(`<span class='res-box'"><a style="color: #d3d3d3" href=${NOT_EXIST}>Video</a></span>`);
    } else if (video.link.filter(x => {
        return x
      }).length > 1) {
      reso.append(`<span class='res-box'"><a style="color: ${video.color}" href=${video.link[0]}>Video 1</a></span>`);
      reso.append(`<span class='res-box'"><a style="color: ${video.color}" href=${video.link[1]}>Video 2</a></span>`);
    } else {
      reso.append(`<span class='res-box'"><a style="color: ${video.color}" href=${video.link[0]}>Video</a></span>`);
    }

    right.append(reso);
    wrapper.append(left);
    wrapper.append(right);


    $(".container").append(wrapper);

    images = [] //reset image list after it is not needed for that student
  }

  /*  --------------------------------------- next and previous button function --------------------------------*/
  //when previous button is clicked 
  $(document).on("click", "#previous_button", function () {
    var id = $(this).parent().attr('id');
    console.log('old id ' + id)
    nextORprev('prev', id);
  });

  //when next button is clicked 
  $(document).on("click", "#next_button", function () {
    var id = $(this).parent().attr('id');
    nextORprev('next', id);
  });

  $(document).on('click', '.link_button', function () {
    var id = $(this).parent().attr('id');
    generateLink(id);
  })


});

function createOtherElements(class_photo, outstanding, presenter, ga) {
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

  // $(".container").append(other_class_photo);

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
  // $(".container").append(other_presenter);

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
  // $(".container").append(other_ga);

}

//when either next or prev button clicked
//id = when prev button is clicked, 
//images = find the id which represents which student => get all images using the id from array(contains every student data)
//img_id = find current image id so it can be updated when looping to another image
function nextORprev(button, id) {
  var images = cap_project.studentData.find(stu => stu.id == id)['images'];
  var img_id = $(`#${id}.images`).find('img').attr('id');
  var img_index = img_id.substring(img_id.lastIndexOf('_') + 1);

  //find valid images from the length, most were just placeholders with 'null'
  var img_len = images.filter(Boolean).length;

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
}


//Generate link button is clicked
function generateLink(id) {
  var link = `https://bherekhet.github.io/capstoneProjects/${year}/index.html`;
  var studentName = '';
  var link_generated = '';
  // var id = $(this).parent().attr('id');
  console.log(id)
  console.log($(`#${id}.project_link`).children().val())
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