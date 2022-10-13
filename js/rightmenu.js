"use strict";

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}

function insertAtCursor(e, t) {
    var n, o, i;
    document.selection ? (e.focus(), (sel = document.selection.createRange()).text = t, sel.select()) : e.selectionStart || "0" == e.selectionStart ? (n = e.selectionStart, o = e.selectionEnd, i = e.scrollTop, e.value = e.value.substring(0, n) + t + e.value.substring(o, e.value.length), 0 < i && (e.scrollTop = i), e.focus(), e.selectionStart = n + t.length, e.selectionEnd = n + t.length) : (e.value += t, e.focus())
}
var rmf = {},
    box = document.documentElement;

function stopMaskScroll() {
    document.getElementById("rightmenu-mask") && document.getElementById("rightmenu-mask").addEventListener("mousewheel", function(e) {
        rm.hideRightMenu()
    }, !1), document.getElementById("rightMenu") && document.getElementById("rightMenu").addEventListener("mousewheel", function(e) {
        rm.hideRightMenu()
    }, !1)
}

function popupMenu() {
    window.oncontextmenu = function(e) {
        console.log(e.keyCode), $(".rightMenu-group.hide").hide(), document.getSelection().toString() && $("#menu-text").show(), (document.getElementById("post") || document.getElementById("page")) && $("#menu-post").show();
        var n = window.document.body,
            n = e.target,
            t = (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(window.getSelection().toString()) && $("#menu-too").show(), "A" == n.tagName && ($("#menu-to").show(), rmf.open = function() {
                location.href = n.href
            }, rmf.openWithNewTab = function() {
                window.open(n.href)
            }, rmf.copyLink = function() {
                var e = n.href,
                    t = document.createElement("textarea");
                t.value = e, document.body.appendChild(t), t.select(), document.execCommand("Copy"), document.body.removeChild(t)
            }), "IMG" == n.tagName ? ($("#menu-img").show(), rmf.openWithNewTab = function() {
                window.open(n.src)
            }, rmf.click = function() {
                n.click()
            }, rmf.copyLink = function() {
                var e = n.src,
                    t = document.createElement("textarea");
                t.value = e, document.body.appendChild(t), t.select(), document.execCommand("Copy"), document.body.removeChild(t)
            }) : "TEXTAREA" != n.tagName && "INPUT" != n.tagName || ($("#menu-paste").show(), rmf.paste = function() {
                navigator.permissions.query({
                    name: "clipboard-read"
                }).then(function(e) {
                    "granted" == e.state || "prompt" == e.state ? navigator.clipboard.readText().then(function(e) {
                        console.log(e), insertAtCursor(n, e)
                    }) : alert("请允许读取剪贴板！")
                })
            }), e.clientX + 10),
            e = e.clientY,
            o = $("#rightMenu").width(),
            i = $("#rightMenu").height();
        return t + o > window.innerWidth && (t -= o + 10), e + i > window.innerHeight && (e -= e + i - window.innerHeight), rmf.showRightMenu(!0, e, t), !1
    }, window.addEventListener("click", function() {
        rmf.showRightMenu(!1)
    }), $("#rightmenu-mask").on("click", rmf.hideRightMenu), $("#rightmenu-mask").contextmenu(function() {
        return rmf.hideRightMenu(), !1
    }), addLongtabListener(box, popupMenu)
}

function addLongtabListener(e, t) {
    var n = 0;
    e.ontouchstart = function() {
        n = 0, n = setTimeout(function() {
            t(), n = 0
        }, 380)
    }, e.ontouchmove = function() {
        clearTimeout(n), n = 0
    }, e.ontouchend = function() {
        n && clearTimeout(n)
    }
}
rmf.showRightMenu = function(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
        n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
        o = $("#rightMenu");
    o.css("top", t + "px").css("left", n + "px"), e ? (o.show(), stopMaskScroll(), $("#rightmenu-mask").attr("style", "display: flex")) : (o.hide(), $("#rightmenu-mask").attr("style", "display: none"))
}, rmf.switchDarkMode = function() {
    "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? (activateDarkMode(), saveToLocal.set("theme", "dark", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)) : (activateLightMode(), saveToLocal.set("theme", "light", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)), "function" == typeof utterancesTheme && utterancesTheme(), "object" === ("undefined" == typeof FB ? "undefined" : _typeof(FB)) && window.loadFBComment(), window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout(function() {
        return window.disqusReset()
    }, 200)
}, rmf.copyWordsLink = function() {
    var e = window.location.href,
        t = document.createElement("textarea");
    t.value = e, document.body.appendChild(t), t.select(), document.execCommand("Copy"), document.body.removeChild(t), btf.snackbarShow("复制成功！")
}, rmf.switchReadMode = function() {
    var t = document.body,
        n = (t.classList.add("read-mode"), document.createElement("button"));
    n.type = "button", n.className = "fas fa-sign-out-alt exit-readmode", t.appendChild(n), n.addEventListener("click", function e() {
        t.classList.remove("read-mode"), n.remove(), n.removeEventListener("click", e)
    })
}, rmf.copySelect = function() {
    document.execCommand("Copy", !1, null), btf.snackbarShow("✨我宣布你的剪切板已经被我填满了")
}, rmf.scrollToTop = function() {
    btf.scrollToDest(0, 500)
}, rmf.translate = function() {
    document.getElementById("translateLink").click()
}, document.onkeydown = function(e) {
    17 == (e = e || window.event).keyCode && console.log("你知道的太多了")
}, navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || popupMenu();