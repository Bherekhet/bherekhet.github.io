var images;
var current_img_index;
$(document).ready(function () {
  var fname, lname, title, desc, keywords;
  var wrapper, stuDetails, proTitle, stuProject, projImages, buttons;

  const url =
    "https://bherekhet.github.io/data/2020.json";

  // traverse the students object and display corresponding data in a styled format
  $.getJSON(url, {
    format: "json",
  }).done(function (data) {
    for (i in data) {
      for (j in data[i]) {
        fname = data[i]["firstName"];
        lname = data[i]["lastName"];
        title = data[i]["projectTitle"];
        desc = data[i]["projectDesc"];
        keywords = data[i]["keywords"];
        images = data[i]["images"];
      }
      createElements();
    }
  });

  function createElements() {
    //a wrapper for every student
    wrapper = $("<div>", {
      id: "wrapper"
    });

    //a div for project image, title, desc
    proTitle = $("<div>", {
      class: 'title'
    }).append($("<span>", {
      class: "title"
    }).text(title));
    stuProject = $("<div>", {
      class: "project"
    });
    stuProject.append(proTitle);

    //project images
    projImages = $("<div>", {
      class: "images"
    });
    current_img_index = 0;
    for (i in images) {
      projImages.append($("<img>", {
        src: images[i]
      }));
    };
    stuProject.append(projImages);

    //next and prev button for scrolling through project images 
    var btns = 2; // 0 = previous, 1 = next
    var value = 'previous';
    buttons = $("<div>", {
      class: "buttons"
    });
    for (var i = 0; i < btns; i++) {
      if (i == 1) {
        value = "next";
      } else {
        value = "previous";
      }
      buttons.append('<input type="button" id="' + value + '_button" value="' + value + '"/>');
    }
    stuProject.append(buttons)

    //project description
    stuProject.append($("<p>", {
      class: "desc"
    }).text(desc));

    wrapper.append(stuProject);

    //div to hold student name, project title, desc and more buttons => combined
    stuDetails = $("<div>", {
      id: "details"
    });
    stuDetails.append($("<span>", {
      class: "fname"
    }).text(fname));
    stuDetails.append($("<span>", {
      class: "lname"
    }).text(lname));
    wrapper.append(stuDetails);

    $(".container").append(wrapper);
  }





  //when prev button is clicked
  $(document).on("click", "#previous_button", function () {
    // console.log(current_img_index);
    prev(current_img_index);
  });

  //when next button is clicked 
  $(document).on("click", "#next_button", function () {
    next(current_img_index);
  });
});


function prev(index) {
  var imgLength = images.length
  console.log('current index'+index);
  // console.log(index)
  // console.log(images.length);

  // index < length && > 0 => index--
  // else => index = length - 1
  if (index < length && index > 0) {
    index = index - 1;
    console.log(index);
  } else {
    index = index + 1;
    console.log(index);
  }


  //   $(".images").fadeOut(300, function () {
  //     // console.log(index)
  //   });
  // }

  function next(index) {
    console.log(index)
    $("#next_button").fadeOut(300, function () {
      console.log(index)
    });
  }
}