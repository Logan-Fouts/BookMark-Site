/**When form is submitted call the saveBookMark function, and set the empty icon field.*/
try {
    document.getElementById('inputForm').addEventListener('submit', saveBookMark);
    localStorage.setItem('images', '["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0Q' +
        'A/wD/AP+gvaeTAAAEA0lEQVRoge3ay2tcdRQH8E/TNom2PmrUKhaMuJAG1PoAldaComJFiI9qxKobVwpC7X9RFbQqSlyICzeCCIUoPkAoK' +
        'rqQutCY1LYRUhSxUigRq2lqXPw6eHPmzsydO3cmXfQLP5jhntd3fo9zfucOZ3FmYUWFttZhK7ZgBFfjUqxBH+ZwFDOYxFfYh2Nt+nkQb2A' +
        'VnsH7FcRuADvwMRaw2OaYx6d4HP0F/I3hZEb/aKcEBrELv5QIvtH4DTulH6cIiZpOaWzDoQoJxDGDewqQOImHyhAYlNZmsyD24yVsx3XSv' +
        'lmNczGMW08HNY7DLWy9Kc1OIxJjZUisx7cNHB7HblxTwu7G06RONLD9Y5UkhnEwx8k8XsSFZYwGrMcenMrxU9lM5JGYlJZO1dgq7ZFKSQz' +
        'KX04fSLmhW3g6x2dpEuRv7LexstNIm6DVxm50NDfENvkzsZwkLsA3uKOowQEcCAYP4LzKQq7HI+pJLEhVA/+TqO3P1UWM7goG53VnY9fQa' +
        'iZWSHVZ9vnOVkYH1JcdL1QceBZFk91bQeaIVDQ2xI6gcFw1eSIP7WTsy/FnkB1tZvyTILy7qqgDypQdrwX5DxsJrlNfipcpO1qhbO10U45' +
        'O7gH0QBDcX0XUAZ0WgJNB9+7ag76M0Jag9HnJYBthDO9aukkX8ATeK2hjX/i+OU9owlK229sKszmqKsWfCjY+yhP6KQhdWyrkelR5n9ikw' +
        'PL/IwhdVMJRRKWXImwItmbzhP4JQkWaAc3Qquwog3OCvb/yhOaDUCelejdIkCqPrM2/84SOBaGrSjqrejllcXGwm9sOihXvLSUcdZMEXB9' +
        'sT9UeZPPITFAabtNJFXmiFWKlcbD2IUtkMgjd2YaDXpCA28L3qTyhhy2dtsMFjXd7OWXxffBzf57QUE5AG1sY7iWJkeBnHuc3Ev4sCI83M' +
        'dxLEqQOZtbXRDPheLE6IfW2InpNYkh6LZH191gzhQGpw51V2BNkek0CXgn+ZhWoPJ4PSqekDiDLQ+KGHJ/PFVEcxM9BcUbqAPaaxFpMB5/' +
        'T2mjU3RuU80a3SazC3uDzX9zVrqFxy0vinRy/cb8WwqCUOXtNYq36mViUOo2lrhbLtbHjnliUCtpLyhgs0lD+Uno9dlkHgdcwJB2x0WeNx' +
        'JVljBbtiteezeFV3FjC14iUsWOyyy6nrsxEP75u4HQRP+B1PCndHTZI19N+6VffhEfxsvoCMJ5Oe5TcE6MtSNSwGd81CaLTMa3EEZvFkQI' +
        'kaliJZ9Unzk7GrJSx234rFfFrQRJZ9OE+6bjM26hFkuqEVAB21LXJ/qlmVOp4L0j11t42ba2R7vm342ZcITULhqQEN4ffpX9NTOELqQU6V' +
        'z78szhz8R97QrguyjuKPgAAAABJRU5ErkJggg=="]');
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
    } if (document.getElementById('siteURL').value.length < 1) {
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
    // Add bookmark to local storage.
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

    localStorage.setItem('images', null);
    localStorage.removeItem('tempURL');
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
function redirect(int) {
    if (int == 0) {
        location.replace("./addpage.html");
    } else if (int == 1) {
        location.replace("./index.html");
    } else {
        location.replace("./sortpage.html");
    }
}
/**Converts image to dataasurl and saves it temporarily into storage.*/
function loadImage() {
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        var images = [];
        images.push(reader.result);
        localStorage.setItem('images', JSON.stringify(images));
    }, false);
    if (file) {
        reader.readAsDataURL(file);
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
                statsrc + '<button class="v" onclick="visitSite(\'' + url + '\')"><img id="searchIcon" src="/Images/search.png"></button>' +
                '<button class="d" onclick="deleteBookMark(\'' + url + '\')"><img id="searchIcon" src="/Images/delete.png"></button>' +
                '<button class="e" onclick="editbookmark(\'' + url + '\')"><img id="editIcon" src="/Images/edit.png"></button>' +
                '</h3>' + '</div>';
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

/**Opens and creates html for the page where you can sort items.*/
function loadSortPage() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var sortArea = document.getElementById('sortlist');
    sortArea.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        sortArea.innerHTML += '<div class ="simplebookmarks" draggable="true"> <center> <h3>' + name + '</h3> </center> </div>';
    }
    draggable(bookmarks);
}

/**Allows items to be drug to be sorted.*/
function draggable(bookmarks) {
    var items = document.querySelectorAll("#sortlist div"),
        dragged = null;

    for (let i of items) {
        i.addEventListener("dragstart", function () {
            dragged = this;
        });

        i.addEventListener("dragenter", function () {

        });

        i.addEventListener("dragleave", function () {

        });

        i.addEventListener("dragend", function () {

        });

        i.addEventListener("dragover", function (evt) {
            evt.preventDefault();
        });
        i.addEventListener("drop", function (evt) {
            evt.preventDefault();
            if (this != dragged) {
                let all = document.querySelectorAll("#sortlist div"),
                    draggedpos = 0, droppedpos = 0;
                for (let it = 0; it < all.length; it++) {
                    if (dragged == all[it]) { draggedpos = it; }
                    if (this == all[it]) { droppedpos = it; }
                }
                if (draggedpos < droppedpos) {
                    this.parentNode.insertBefore(dragged, this.nextSibling);
                    var temp = bookmarks[draggedpos];
                    bookmarks[draggedpos] = bookmarks[droppedpos]
                    bookmarks[droppedpos] = temp;
                    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                    loadSortPage();
                } else {
                    this.parentNode.insertBefore(dragged, this);
                    var temp = bookmarks[draggedpos];
                    bookmarks[draggedpos] = bookmarks[droppedpos]
                    bookmarks[droppedpos] = temp;
                    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                    loadSortPage();
                }
            }
        });
    }

}

/**Temporarily stores the URL and opens the edit page.*/
function editbookmark(URL) {
    localStorage.setItem('tempURL', URL);
    location.replace("./editpage.html");
}

/**Assigns the new values to the bookmark.*/
function submitEdit() {
    if (document.getElementById('newsiteName').value.length > 10) {
        alert("Website Name Too Long, Max Size is 10 characters");
        return 0;
    } if (document.getElementById('newsiteURL').value.length < 1) {
        alert("URL field empty.")
        return 0;
    } if (document.getElementById('newsiteDesc').value.length > 30) {
        alert("Description Too Long, Max Size is 25 characters");
        return 0;
    }

    var URL = localStorage.getItem('tempURL');
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == URL) {
            bookmarks[i].url = document.getElementById('newsiteURL').value;
            bookmarks[i].name = document.getElementById('newsiteName').value;
            bookmarks[i].description = document.getElementById('newsiteDesc').value;
            var images = JSON.parse(localStorage.getItem('images'));
            bookmarks[i].img = images;
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
