"use strict";

function categoriesBarActive() {
    var e, t = window.location.pathname,
        t = decodeURIComponent(t);
    console.log(t), "/" == t ? document.querySelector("#category-bar") && document.getElementById("首页").classList.add("select") : (e = /\/categories\/.*?\//.test(t), console.log(e), e && (e = t.split("/"), console.log(e[2]), t = e[2], document.querySelector("#category-bar") && document.getElementById(t).classList.add("select")))
}

function topCategoriesBarScroll() {
    var o;
    document.getElementById("category-bar-items") && (o = document.getElementById("category-bar-items")).addEventListener("mousewheel", function(e) {
        var t = -e.wheelDelta / 2;
        o.scrollLeft += t, e.preventDefault()
    }, !1)
}
categoriesBarActive(), topCategoriesBarScroll();