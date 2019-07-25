var topics = [
    "Music Festivals", "Tomorrowland", "EDC", "DJ", "EDM",
    "Light Show", "Electronic Music Concert","Trippy", "DJ Booth",
    "Kandi","PLUR", "Totem", "Rave Girls",
    "Rave Squad", "Trance", "Dubstep", "Bass"
];



$( document ).ready(function() {
    
    function addTopicButton(){
        $("#topicBtn").empty();
        for (var x=0; x<topics.length; x++) {
        
            var newButton = $("<button>");
            newButton.addClass("gifBtn btn btn-primary");
            newButton.attr("data-topic", topics[x]);
            newButton.text(topics[x]);
            $("#topicBtn").append(newButton);
        };
    };
    
    addTopicButton();

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
  
        var newTopic = $("#topic-input").val().trim();
        topics.push(newTopic);
        $("#topic-input").val("");
        addTopicButton();
    });
    
    $("#topicBtn").on("click", ".gifBtn", function() {

        var myTopic = $(this).attr("data-topic");
        console.log(myTopic);
        $("#render-gif").empty();

        var gif = $.get("http://api.giphy.com/v1/gifs/search?q="+myTopic+"&api_key=Q161ghCBqKJHbruJ3Q1Fw5KwccIY1VaJ&limit=10");
        gif.done(function(res) { 
            console.log(res); 
            for (var x=0; x<res.data.length;x++) {
                var newGiph = $("<div>");
                newGiph.addClass("newGif");
               
                newGiph.html("<img src="+res.data[x].images.fixed_height_still.url+" class='img-fluid img-thumbnail'>");
                newGiph.attr("data-topic", myTopic);
                newGiph.attr("id", "giph-"+x);
                var myRating = $("<div>");
                myRating.addClass("rating");
                myRating.text("Rating: "+res.data[x].rating.toUpperCase());
                newGiph.append(myRating);
                $("#render-gif").append(newGiph);
                
            };
            
        });
    });

    $('#render-gif').on('click', '.newGif', function() {
        var myTopic = $(this).attr("data-topic");
        var myID = $(this).attr("id");
        
        var gif = $.get("http://api.giphy.com/v1/gifs/search?q="+myTopic+"&api_key=Q161ghCBqKJHbruJ3Q1Fw5KwccIY1VaJ&limit=10");
        gif.done(function(res) { 
            var myIDnum = myID.charAt(5);
            var myRating = $("<div>");
            myRating.addClass("rating");
            myRating.text("Rating: "+res.data[myIDnum].rating.toUpperCase());
            

            if ($("#"+myID).html().includes("_s")) {
                $("#"+myID).html("<img src="+res.data[myIDnum].images.fixed_height.url+" class='img-fluid img-thumbnail'", "alt='Responsive image'>");
                $("#"+myID).append(myRating);
            } else {
                $("#"+myID).html("<img src="+res.data[myIDnum].images.fixed_height_still.url+" class='img-fluid img-thumbnail'" , "alt='Responsive image'>");
                $("#"+myID).append(myRating);
            }
                        
        });
        
    });



    
});