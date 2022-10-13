"use strict";
var posts = ["posts/bd4e.html", "posts/b1d7.html", "posts/xoan.html", "posts/fe76.html", "posts/8645.html", "posts/aa28.html", "posts/443e.html", "posts/aa50.html", "posts/fc18.html", "posts/ddae.html", "posts/ce6a.html", "posts/292d.html", "posts/asdx.html", "posts/cf4f.html", "posts/52d8.html", "posts/72ea.html", "posts/e8da.html", "posts/571d.html", "posts/b8cf1317.html", "posts/7e87.html", "posts/eadb39c4.html", "posts/fe37.html", "posts/9ffb.html", "posts/521a.html", "posts/ff46.html", "posts/8e53.html", "posts/3444.html", "posts/222.html", "posts/e173abca.html", "posts/8b43.html", "posts/3830.html", "posts/7d58.html", "posts/9520.html", "posts/sdxhu.html"];

function toRandomPost() {
    pjax.loadUrl("/" + posts[Math.floor(Math.random() * posts.length)])
}