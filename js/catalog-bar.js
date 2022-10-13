"use strict";

function catalogActive() {
    var e, t = document.getElementById("catalog-list");
    t && (t.addEventListener("mousewheel", function(e) {
        t.scrollLeft -= e.wheelDelta / 2, e.preventDefault()
    }, !1), (e = document.getElementById(decodeURIComponent(window.location.pathname))) && (e.classList.add("selected"), t.scrollLeft = e.offsetLeft - t.offsetLeft - (t.offsetWidth - e.offsetWidth) / 2))
}

function tagsPageActive() {
    var e, t = document.getElementById("tag-page-tags");
    t && (t.addEventListener("mousewheel", function(e) {
        t.scrollLeft -= e.wheelDelta / 2, e.preventDefault()
    }, !1), (e = document.getElementById(decodeURIComponent(window.location.pathname))) && (e.classList.add("selected"), t.scrollLeft = e.offsetLeft - t.offsetLeft - (t.offsetWidth - e.offsetWidth) / 2))
}
catalogActive(), tagsPageActive();