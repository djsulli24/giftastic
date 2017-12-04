// Giftastic - This application loads 10 gifs on the page on button click. The user is
// also able to add new buttons via a text input button.

$(document).ready(function() {

    // --------------APPLICATION OBJECT---------------
    var giftastic =  {
        // This function makes the API call to Giphy and loads 10 gifs related to the search term on the page
        giphyAPI: function(searchTerm) {
            var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=zJ4WnHswLS4shydUPsDoUOqYFXlN1IaB&limit=10&rating=g&rating=pg&rating=pg-13&q=" + searchTerm;      
            $.ajax({
                url: giphyURL,
                method: "GET",
                }).done(function(response) {
                    // Empty out the gifs already on the page before adding new ones
                    $("#gifcontainer").empty();
                    response.data.map(function(value) {
                        $("#gifcontainer").append(
                            `<p>Rating: ` + value.rating + `</p>
                            <img
                            class='img-responsive gifinsert'
                            data-animate='` + value.images.fixed_width.url + `'
                            data-still='` + value.images.fixed_width_still.url + `'
                            status='still' 
                            src='` + value.images.fixed_width_still.url + `'/>`
                        );
                    });
                }
            );
        },
        toggle: function(image) {
            if (image.attr("status") === "still") {
                image.attr("src", image.attr("data-animate"));
                image.attr("status", "animated");
            }
            else {
                image.attr("src", image.attr("data-still"));
                image.attr("status", "still");
            }
        },
        buttonArray: ["Angry", "Sad", "Happy", "Conflicted", "Nervous laughter"],
        renderButtons: function() {
            this.buttonArray.map(function(value) {
                $("#buttoncontainer").append(`
                    <button search-term='` + value + `' class='gifbutton'>` + value + `</button>
                `);
            });
        },
    };

    // ------------PAGELOAD-------------------------

    // Render the buttons on the page
    giftastic.renderButtons();

    // ------------BUTTON CLICK EVENTS--------------

    // Click a button to add gifs to the page
    $("#buttoncontainer").on("click", ".gifbutton", function(event) {
        event.preventDefault();
        giftastic.giphyAPI($(this).attr("search-term"));
    });

    // Click a gif to toggle between animated and still
    $("#gifcontainer").on("click", ".gifinsert", function() {
        giftastic.toggle($(this));
    });

});