/**When form is submitted call the saveBookMark function.*/
try {
    document.getElementById('inputForm').addEventListener('submit', saveBookMark);
} catch {
    console.log(Error);
}

/**Takes the input fields and saves them into an array of bookmarks*/
function saveBookMark(e) {
    console.log('Saving...');
    e.preventDefault();
    if (document.getElementById('siteName').value.length > 10) {
        alert("Website Name Too Long, Max Size is 10 characters");
        return 0;
    } if (document.getElementById('siteURL').value.length < 2) {
        alert("URL field empty.")
        return 0;
    } if (document.getElementById('siteDesc').value.length > 30) {
        alert("Description Too Long, Max Size is 25 characters");
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

    if (localStorage.getItem('bookmarks') === null) {
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

/**Redirects user to desired webpage.*/
function visitSite(URL) {
    open(URL);
}

/**Removes a bookmark from the array of bookmarks.*/
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

/**Takes user to the page to add bookmarks.*/
function openAddPage(int) {
    if (int == 0) {
        location.replace("./addpage.html");
    } else {
        location.replace("./index.html");
    }
}

/**On load checks all sites availibilty and loads all bookmarks.*/
async function fetchBookMarks() {
    console.log('Loading Bookmarks & Checking Avalibility', bookmarks);

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var allBookMarks = document.getElementById('allBookMarks');
    const map = new Map();

    // First gets the status of every website.
    for (var i = 0; i < bookmarks.length; i++) {
        pingURL(bookmarks[i].url, map, i);
    }
    setTimeout(() => {
        var allBookMarks = document.getElementById('allBookMarks');
        for (var i = 0; i < bookmarks.length; i++) {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
            var imageDataURL = bookmarks[i].img;
            var description = bookmarks[i].description;
            var statsrc;
            if (map.get(i) == "up") {
                statsrc = '<img id="up" src="/Images/ncarrow.gif"><br></br>';
            } else {
                statsrc = '<img id="down" src="/Images/rncarrow.gif"><br></br>';
            }
            allBookMarks.innerHTML += '<div class ="bookmarkArea">' +
                '<h3>' + '<label id=siteNameID>' + name + '</label>' +
                '<img id="inlineImage" src=\'' + imageDataURL + '\'/>' + '<label id=siteDescription>' + description + '</label>' +
                statsrc +
                '<button class="v" onclick="visitSite(\'' + url + '\')"><img id="searchIcon" src="/Images/search.png"></button>' +
                '<button class="d" onclick="deleteBookMark(\'' + url + '\')"><img id="searchIcon" src="/Images/delete.png"></button>' +
                '</h3>' +
                '</div>';
        }
    }, 1500)

    // Reload Page every 60 seconds to check availibility.
    setTimeout(() => {
        location.reload(true);
    }, 60000)
}

/**Pings the given url and adds the response to a hashmap based on item index.*/
function pingURL(URL, map, i) {
    //Settings for ping.
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
                map.set(i, 'up');

            },
            400: function (response) {
                responses.push("down");
            },
            0: function (response) {
                responses.push("down");
            },
        },
    };

    /**Sends the request and observes the response*/
    $.ajax(settings).done(function (response) {
        responses.push("down");
    });
}

function openSortPage() {
    location.replace("./sortpage.html");
}

function loadSortPage() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var sortArea = document.getElementById('allBookMarks');
    const map = new Map();

    // First gets the status of every website.
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        sortArea.innerHTML += '<div class ="simplebookmarks">' +
            '<label id=siteNameID> <center>' + i + ' ' + name + '</center> </label>' +
            '</div>' + '<br></br>';
    }
}

function sort() {
    var item1 = document.getElementById('item1').value;
    var item2 = document.getElementById('item2').value;
    console.log(item1);
    if (item1.length == 0 || item2.length == 0) {
        alert('You Must Fill Out Both Fields');
        return 0;
    }
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    console.log('sorting items ' + item1 +' and '+ item2);
    var temp = bookmarks[item1];
    bookmarks[item1] = bookmarks[item2]; 
    bookmarks[item2] = temp; 

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    location.reload(true);

}
