document.getElementById('inputForm').addEventListener('submit', saveBookMark);


function saveBookMark(e) {
    console.log('Saving...');
    e.preventDefault();
    if (document.getElementById('siteName').value.length > 10) {
        alert("Website Name Too Long, Max Size is 10 characters");
        return 0;
    }
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;
    var disc = document.getElementById('siteDesc').value;
    var images = JSON.parse(localStorage.getItem('images'));

    var bookMark = {
        name: siteName,
        url: siteURL,
        img: images[0],
        description: disc
    } 

    if  (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        console.log("inside first if");
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        console.log("inside second if");
    }
    console.log(bookMark);
    e.preventDefault();
    location.reload(true);
}

function visitSite(URL) {
    open(URL);
}

function deleteBookMark(URL) {
    console.log("Deleting BookMark" + URL);
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == URL) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    location.reload(true);
}

function openAddPage(int) {
    if (int == 0) {
        location.replace("./addpage.html");
    } else {
        location.replace("./index.html");
    }
}

function fetchBookMarks() {
    console.log('Loading Bookmarks', bookmarks);

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var allBookMarks = document.getElementById('allBookMarks');

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var imageDataURL = bookmarks[i].img;
        var description = bookmarks[i].description;

        test = pingURL(url);

        allBookMarks.innerHTML += '<div class ="bookmarkArea">'+
                                   '<h3>'+
                                   '<label id=siteNameID>'+name+'</label>'+
                                   '<img id="inlineImage" src=\''+imageDataURL+'\'/>'+ '<label id=siteDescription>'+description+'</label>'+
                                   '<button class="v" onclick="visitSite(\''+url+'\')"><img id="searchIcon" src="/Images/search.png"></button>'+
                                   '<button class="d" onclick="deleteBookMark(\''+url+'\')"><img id="searchIcon" src="/Images/delete.png"></button>'+
                                   '</h3>'+
                                   '</div>';
    }

}


function pingURL(URL) {
    var settings = {
      cache: false,
      dataType: "jsonp",
      async: true,
      crossDomain: true,
      url: URL,
      method: "GET",
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: {
        200: function (response) {
          console.log("Status 200: Page is up!");
        },
        400: function (response) {
          console.log("Status 400: Page is down.");

        },
        0: function (response) {
          console.log("Status 0: Page is down.");
        },
      },
    };
    
    // Sends the request and observes the response
    $.ajax(settings).done(function (response) {
    });
  }


