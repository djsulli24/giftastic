// Giftastic - This application loads 10 gifs on the page on button click. The user is
// also able to add new buttons via a text input button. These new buttons also render 
// gifs on the page.

$(document).ready(function() {

    // --------------APPLICATION OBJECT---------------
    var giftastic =  {
        // This function makes the API call to Giphy and loads 10 gifs related to the search term on the page
        giphyAPI: function(searchTerm) {
            var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=zJ4WnHswLS4shydUPsDoUOqYFXlN1IaB&limit=10&rating=g&rating=pg&rating=pg-13&q=" + searchTerm;      
            $.get(giphyURL).done(function(response) {
                    // Empty out the gifs already on the page before adding new ones
                    $("#gifcontainer").empty();
                    // For each of the 10 gifs returned, append to the gif container dif
                    response.data.map(function(value) {
                        $("#gifcontainer").append(
                            `<p>Rating: ` + value.rating.toUpperCase() + `</p>
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
        // This function toggles the clicked image between still and animated
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
        // These are the values of the initial/default gif buttons
        topics: ["Angry", "Sad", "Happy", "Conflicted", "Nervous laughter"],
        renderButtons: function() {
            this.topics.map(function(value) {
                $("#buttoncontainer").append(`
                    <button search-term='` + value + `' 
                    class='btn btn-default gifbutton'>` + value + `</button>
                `);
            });
        },
        // This writes the topics array above to session storage
        buttonStorage: function() {
            sessionStorage.setItem("buttons", JSON.stringify(this.topics));
        },
        // This function adds the user entered value to the topics array,
        // updates session storage, and adds the new button to the page
        addButton: function(value) {
            this.topics.push(value);
            this.buttonStorage();
            $("#buttoncontainer").append(`
                <button search-term='` + value + `' 
                class='btn btn-default gifbutton'>` + value + `</button>
            `);
        }
    };

    // ------------PAGELOAD-------------------------

    // If user has loaded page before and added buttons, the button
    // array is updated with the buttons in storage. Else, the application's 
    // default buttons are written to session storage
    if (sessionStorage.getItem("buttons")) {
        giftastic.topics = JSON.parse(sessionStorage.getItem("buttons"));
    }
    else {
        giftastic.buttonStorage();
    }
    
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

    // Click the submit button to add a new gif button to the page
    $("#gifsubmit").click(function(event) {
        event.preventDefault();
        giftastic.addButton($("#gifinput").val());
        $("#gifinput").val("");
    });

});