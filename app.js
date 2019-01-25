//variables
var searchItem = '';
var numOfItems = 0;
var year_Begin ="";
var year_End ="";
var queryURL;

//functions
function displaySearchInfo(data) {

    console.log(data);

    // Creates a div to hold the search post
 
    for (var i=0;i<numOfItems;i++)
    {
      var new_Post= $("<div>");
      new_Post.addClass("post");

      var newsTitle= $("<h2>");
      console.log("HeadLine : " + data.response.docs[i].headline.main)
      newsTitle.text("HeadLine : " + data.response.docs[i].headline.main);
  
      var newsSnippet= $("<h5>");
      newsSnippet.text( data.response.docs[i].snippet);

      var newsURL= $("<a>");
      newsURL.attr( "href",data.response.docs[i].web_url);
      newsURL.text(data.response.docs[i].web_url);

      new_Post.append(newsTitle);  
      new_Post.append(newsSnippet);  
      new_Post.append(newsURL);
      new_Post.append($("<hr>"));  
    
      $(".results").prepend(new_Post);
    }
}

function callAjax(){
    // Creates AJAX call for the specific emotion button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {           
        displaySearchInfo(response);
        });
    };

function setupReqURL(){
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"  + "api_key=&api-key=yYEVodyc3kMX6CfJLUDTHAAnTIUfgc9B" + '&q=';
       
    searchItem = $("#searchTerm").val().trim();
    numOfItems = $("#numOfRecords").val();
    year_Begin = $("#startYear").val();
    year_End = $("#endYear").val();
    console.log(searchItem);
    console.log(numOfItems);
    console.log(year_Begin);
    console.log(year_End);
    queryURL = queryURL + searchItem;
    if (year_Begin !="")
    {
    console.log("year_Begin not NULL" , year_Begin);
     queryURL = queryURL + "&begin_date=" + year_Begin  + "0101";
    }
    if (year_End != "")
    {
     queryURL = queryURL + "&end_date=" + year_End  + "1231";
    }
    console.log(queryURL);
}



//main process
$("#searchBtn").on("click",function(event){
    event.preventDefault();
    setupReqURL();
    callAjax();
});
$("#clearBtn").on("click",function(){
    $(".results").empty();
});
