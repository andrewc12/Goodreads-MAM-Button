// ==UserScript==
// @name         Goodreads Plus
// @namespace    https://greasyfork.org/en/users/78880
// @version      0.3.11
// @description  Add "Search MAM" button to Goodreads
// @author       Slengpung
// @match        https://www.goodreads.com/*
// @grant        none
// @license      MIT
// @downloadURL none
// ==/UserScript==

window.addEventListener("load", Greasemonkey_main, false);

function Greasemonkey_main() {

    console.log("[G+] Tweaking Goodreads...");

    var page = window.location.pathname.split('/')[1];
    var mamSearchUrl = "";

    if(page === 'book'){
        console.log("[G+] We got a book URL");
        //var bookTitle = document.getElementsByClassName("Text__title1")[0].innerHTML;
        var bookTitle = document.getElementById("bookTitle").innerHTML;
        console.log("[G+] Book title: " + bookTitle);
        bookTitle = bookTitle.replace('&amp;', '%26');
        bookTitle = bookTitle.replace('&', '%26');
        mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + bookTitle;

        // Add 'Search MAM' button
        var buttonBar = document.getElementsByClassName("BookActions")[0];
        var mamButton = document.getElementsByClassName("BookActions__button")[0].cloneNode(true);
        mamButton.innerHTML = '<div class="BookActions__button"><a href="' + mamSearchUrl + '">' +
            '<div class="Button__container Button__container--block">' +
            '<button type="button" class="Button Button--secondary Button--medium Button--block">' +
            '<span class="Button__labelItem" style="text-decoration=none">Search MAM</span></button></div></a></div>';

        buttonBar.appendChild(mamButton)
        console.log("[G+] 'Search MAM' button added!");
    } else if(page === 'review'){
        var bookList = document.querySelectorAll('#booksBody .title div a');
        // Loop over all the books
        for(var i=0; i<bookList.length; i++){
            bookTitle = getBookTitle(bookList[i]);
            bookTitle = bookTitle.replace('&amp;', '%26');
            bookTitle = bookTitle.replace('&', '%26');
            mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + bookTitle;
            // Add 'Search MAM' button
            var newLink = document.createElement('a');
            var linkText = document.createTextNode('[Search MAM]');
            newLink.appendChild(linkText);
            newLink.setAttribute('href',mamSearchUrl);
            newLink.setAttribute('style','color:#b3b3b3;font-style:italic');
            bookList[i].parentNode.parentNode.appendChild(newLink);
        }
        console.log("[G+] 'Search MAM' buttons added!");
    }

}

// Grab book title (and only title) from the element
function getBookTitle(el){
	var bookTitle = el.innerHTML.trim().split('<', 1)+'';
	console.log("Book title: " + bookTitle.trim());
	return bookTitle.trim();
}