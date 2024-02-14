// ==UserScript==
// @name         Goodreads Plus DEV
// @namespace    https://greasyfork.org/en/users/78880
// @version      0.3.8
// @description  Add "Search MAM" button to Goodreads
// @author       Slengpung
// @include      https://www.goodreads.com/*
// @grant        none
// @license      MIT
// @downloadURL none
// ==/UserScript==

console.log("[G+] Tweaking Goodreads...");

var page = window.location.pathname.split('/')[1];

if(page === 'book'){
    console.log("[G+] We got a book URL");
	var bookTitle = document.getElementsByClassName("Text__title1")[0].innerHTML;
	console.log("[G+] Book title: " + bookTitle);
	var mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + bookTitle;

	// Add 'Search MAM' button
	var buttonBar = document.getElementsByClassName("BookActions")[0];
	var mamButton  = document.getElementsByClassName("BookActions__button")[0].cloneNode(true);
	mamButton.innerHTML = '<div class="BookActions__button"><a href="' + mamSearchUrl + '">' + 
	    '<div class="Button__container Button__container--block">' + 
	    '<button type="button" class="Button Button--secondary Button--medium Button--block">' + 
	    '<span class="Button__labelItem">Search MAM</span></button></div></a></div>';
	
	buttonBar.appendChild(mamButton)
	console.log("[G+] 'Search MAM' button added!");
}else if(page === 'review'){
	var bookList = document.querySelectorAll('#booksBody .title div a');
	// Loop over all the books
	for(var i=0; i<bookList.length; i++){
		var mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + getBookTitle(bookList[i]);
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
