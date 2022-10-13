"use strict";

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(e, r) {
    var a;
    if (e) return "string" == typeof e ? _arrayLikeToArray(e, r) : "Map" === (a = "Object" === (a = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : a) || "Set" === a ? Array.from(e) : "Arguments" === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? _arrayLikeToArray(e, r) : void 0
}

function _iterableToArray(e) {
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) return _arrayLikeToArray(e)
}

function _arrayLikeToArray(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var a = 0, n = new Array(r); a < r; a++) n[a] = e[a];
    return n
}

function isChildOf(e, r) {
    if (e && r)
        for (var a = e.parentNode; a;) {
            if (console.log("myParentNode=" + a + "-" + a.nodeName), a === r) return !0;
            a = a.parentNode
        }
    return !1
}
var commentBarrageConfig = {
        maxBarrage: 1,
        barrageTime: 4e3,
        twikooUrl: "https://twikoo.anzhiy.cn/",
        accessToken: "2d3491da257a46b78951ffcdbde89f2e",
        pageUrl: window.location.pathname,
        barrageTimer: [],
        barrageList: [],
        barrageIndex: 0,
        dom: document.querySelector(".comment-barrage")
    },
    commentInterval = null,
    hoverOnCommentBarrage = !1;

function initCommentBarrage() {
    var e = JSON.stringify({
            event: "COMMENT_GET",
            "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
            url: commentBarrageConfig.pageUrl
        }),
        r = new XMLHttpRequest;
    r.withCredentials = !0, r.addEventListener("readystatechange", function() {
        4 === this.readyState && commentBarrageConfig.dom && (commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data), commentBarrageConfig.dom.innerHTML = "")
    }), r.open("POST", commentBarrageConfig.twikooUrl), r.setRequestHeader("Content-Type", "application/json"), r.send(e), clearInterval(commentInterval), commentInterval = null, commentInterval = setInterval(function() {
        commentBarrageConfig.barrageList.length && !hoverOnCommentBarrage && (popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]), commentBarrageConfig.barrageIndex += 1, commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length), commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length) && !hoverOnCommentBarrage && removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
    }, commentBarrageConfig.barrageTime)
}

function commentLinkFilter(e) {
    e.sort(function(e, r) {
        return e.created - r.created
    });
    var r = [];
    return e.forEach(function(e) {
        r.push.apply(r, _toConsumableArray(getCommentReplies(e)))
    }), r
}

function getCommentReplies(e) {
    var r;
    return e.replies ? (r = [e], e.replies.forEach(function(e) {
        r.push.apply(r, _toConsumableArray(getCommentReplies(e)))
    }), r) : []
}

function popCommentBarrage(e) {
    var r = document.createElement("div");
    commentBarrageConfig.dom && e && (commentBarrageConfig.dom.clientWidth, commentBarrageConfig.dom.clientHeight, r.className = "comment-barrage-item", r.innerHTML = '\n\t\t<div class="barrageHead">\n      <div class="barrageTitle">热评</div>\n\t\t\t<div class="barrageNick">'.concat(e.nick, '</div>\n\t\t\t<img class="barrageAvatar" src="https://cravatar.cn/avatar/').concat(e.mailMd5, '"/>\n\t\t\t<a class="comment-barrage-close" href="javascript:anzhiyu.switchCommentBarrage()"><i class="fa-solid fa-xmark"></i></a>\n\t\t</div>\n\t\t<div class="barrageContent">').concat(e.comment, "</div>\n\t"), commentBarrageConfig.barrageTimer.push(r), commentBarrageConfig.dom.append(r))
}

function removeCommentBarrage(e) {
    e.className = "comment-barrage-item out", setTimeout(function() {
        isChildOf(e, commentBarrageConfig.dom) && commentBarrageConfig.dom.removeChild(e)
    })
}

function isInViewPortOfOne(e) {
    var r;
    if (e) return r = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, e.offsetTop - document.documentElement.scrollTop <= r
}
$(".comment-barrage").hover(function() {
    hoverOnCommentBarrage = !0
}, function() {
    hoverOnCommentBarrage = !1
}), document.addEventListener("scroll", btf.throttle(function() {
    window.scrollY;
    var e = document.querySelector(".comment-barrage"),
        r = document.getElementById("post-comment");
    r && e && 768 < document.body.clientWidth && (e.style.bottom = isInViewPortOfOne(r) ? "-200px" : "0")
}, 200)), initCommentBarrage(), "false" !== localStorage.getItem("commentBarrageSwitch") ? ($(".comment-barrage").show(), $(".menu-commentBarrage-text").text("关闭热评")) : ($(".comment-barrage").hide(), $(".menu-commentBarrage-text").text("显示热评")), document.addEventListener("pjax:send", function() {
    commentInterval && clearInterval(commentInterval)
}), document.addEventListener("pjax:success", function(e) {
    commentBarrageConfig.dom = document.querySelector(".comment-barrage"), commentBarrageConfig.pageUrl = window.location.pathname, initCommentBarrage(), $(".comment-barrage").hover(function() {
        clearInterval(commentInterval)
    }, function() {
        commentInterval = setInterval(function() {
            commentBarrageConfig.barrageList.length && !hoverOnCommentBarrage && (popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]), commentBarrageConfig.barrageIndex += 1, commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length), commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length) && !hoverOnCommentBarrage && removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
        }, commentBarrageConfig.barrageTime)
    })
});