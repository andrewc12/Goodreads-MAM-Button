// ==UserScript==
// @name         Goodreads Plus
// @namespace    https://greasyfork.org/en/users/78880
// @version      0.1
// @description  Add "Search MAM" button to Goodreads
// @author       Slengpung
// @include      https://www.goodreads.com/*
// @grant        none
// @downloadURL none
// ==/UserScript==

console.log("[M+] Tweaking Goodreads...");

// Grab book title (and only title)
var bookTitle = document.getElementById("bookTitle").innerHTML.trim().split('<', 1);
console.log("Book title: " + bookTitle);
var mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + bookTitle;

// Add 'Search MAM' button
var buttonBar = document.getElementById("buyButtonContainer");
if (buttonBar === null || buttonBar == "null") {
	buttonBar = document.getElementById("asyncBuyButtonContainer");
}
var buttonUl  = buttonBar.getElementsByTagName("ul");
var mamButton = document.createElement("li");
mamButton.innerHTML = '<a id="mamLink" href="' + mamSearchUrl + '" target="_blank" class="buttonBar">Search MAM</a>';
mamButton.className = "Button";
buttonUl[0].appendChild(mamButton);

console.log("[M+] 'Search MAM' button added!");