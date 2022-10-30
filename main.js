document.getElementById('inputForm').addEventListener('submit', saveBookMark);


function saveBookMark(e) {
    console.log('Saving...');
    e.preventDefault();
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookMark = {
        name: siteName,
        url: siteURL,
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
    var allImages = localStorage.getItem("images");

    allBookMarks.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var imageDataURL = localStorage.getItem("images");

        allBookMarks.innerHTML += '<div class ="bookmarkArea">'+
                                   '<h3>'+name+
                                   '<img id="inlineImage" src=\''+imageDataURL+'\'/>'+
                                   ' <button class="vord" onclick="visitSite(\''+url+'\')">Visit</button>'+
                                   ' <button class="vord" onclick="deleteBookMark(\''+url+'\')">Delete</button>'+
                                   '</h3>'+
                                   '</div>';
    }

}