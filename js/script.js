var mytimeout;
function loadData() {

    var $body = $('body');
    var $wiki = $('.wikipedia-container');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    $greeting.addClass("text-primary");
    // load streetview
    var $street=$('#street').val();
    var $city= $('#city').val();
    var address= $street + ','+$city;
    // YOUR CODE GOES HERE!
    $greeting.text("Here Are Relevant Results.")
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address +'';
    
    $body.attr('background',streetviewUrl);
    clearTimeout(mytimeout);
    

    var nyturl='https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+address+'&sort=newest&api-key=a03ee841781e4146b43dd2c68a9ee3f8';
    $.getJSON(nyturl,function(data){
        $nytHeaderElem.text('New York Times Articles about'+' '+address+'.');
        var articles=data.response.docs;
        for(var i=0;i<articles.length;i++)
        {
            $nytElem.append('<li="article"><a href="'+articles[i].web_url+'">'+articles[i].headline.main+'</a>'
                +'<p>'+articles[i].snippet+'</p'+'</li>');
        }
        }).error(function(){
            $nytHeaderElem.text("Sorry NYT articles could not be Loaded.");
        });

    var wikiurl='https://en.wikipedia.org/w/api.php?action=opensearch&search='+address+'&format=json&callback=wikif';

    $.ajax({
        url:wikiurl,
        dataType:'jsonp',
        // jsonp: "callback",
        success:function(data){
            console.log(data);
            $wikiElem.append('<li class="article"><a href='+data[3][0] +' '+'target="_blank" >'+data[1][0]+'</a></li>');
           }
    });

    return false;
};

$('#form-container').submit(loadData);
 
$(document).ready(function(){
changeimage(3);
});

var imageID=0;
function changeimage(every_seconds){
    //change the image
    if(!imageID){
        $("body").attr("background","https://assets.entrepreneur.com/slideshow/10-best-cities-start-business-atl.jpg");
        imageID++;
    }
    else if (imageID==1)
    {
        $("body").css("background","http://www.roughguides.com/wp-content/uploads/2014/07/8.-Overs-Vancouver-E1W1BG.jpg");
        imageID++;
    }
    else if (imageID==2)
    {
        $("body").attr("background","http://blogs-images.forbes.com/meghancasserly/files/2012/10/nyc_dalyife.jpg");
        imageID=0;
    }
    //call same function again for x of seconds
    mytimeout=setTimeout("changeimage("+every_seconds+")",((every_seconds)*1000));
}
