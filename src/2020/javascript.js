$(document).ready(function() {
    const url = 'https://bherekhet.github.io/cst-capstone-project-data/data/2020.json';
    // $.ajax({url: url, dataType: 'json', success: function(result) {
    //     console.log(result);
    // }})


    // traverse the students object and display corresponding data in a styled format
    $.getJSON(url, {
        format: 'json'
    }).done(function(data) {
        // console.log(data)
        $.each(data, function(i, item) {
            $.each(item, function(index, value) {
                console.log(index, value)
            })

        })
    })
});