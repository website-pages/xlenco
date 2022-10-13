"use strict";

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(e, r) {
    var t;
    if (e) return "string" == typeof e ? _arrayLikeToArray(e, r) : "Map" === (t = "Object" === (t = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : t) || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(e, r) : void 0
}

function _iterableToArray(e) {
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) return _arrayLikeToArray(e)
}

function _arrayLikeToArray(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var t = 0, a = new Array(r); t < r; t++) a[t] = e[t];
    return a
}

function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
        var a = r[t];
        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
    }
}

function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), e
}
var config = {
        src: "https://image.anzhiy.cn/adminuploads/1/2022/10/05/633d3fb19fee4.png",
        rows: 15,
        cols: 7
    },
    randomRange = function(e, r) {
        return e + Math.random() * (r - e)
    },
    randomIndex = function(e) {
        return 0 | randomRange(0, e.length)
    },
    removeFromArray = function(e, r) {
        return e.splice(r, 1)[0]
    },
    removeItemFromArray = function(e, r) {
        return removeFromArray(e, e.indexOf(r))
    },
    removeRandomFromArray = function(e) {
        return removeFromArray(e, randomIndex(e))
    },
    getRandomFromArray = function(e) {
        return e[0 | randomIndex(e)]
    },
    resetPeep = function(e) {
        var r, t, a = e.stage,
            e = e.peep,
            n = .5 < Math.random() ? 1 : -1,
            o = 100 - 250 * gsap.parseEase("power2.in")(Math.random()),
            o = a.height - e.height + o;
        return 1 == n ? (r = -e.width, t = a.width, e.scaleX = 1) : (r = a.width + e.width, t = 0, e.scaleX = -1), e.x = r, e.y = o, {
            startX: r,
            startY: e.anchorY = o,
            endX: t
        }
    },
    normalWalk = function(e) {
        var r = e.peep,
            e = e.props,
            t = (e.startX, e.startY),
            e = e.endX,
            a = gsap.timeline();
        return a.timeScale(randomRange(.5, 1.5)), a.to(r, {
            duration: 10,
            x: e,
            ease: "none"
        }, 0), a.to(r, {
            duration: .25,
            repeat: 40,
            yoyo: !0,
            y: t - 10
        }, 0), a
    },
    walks = [normalWalk],
    Peep = function() {
        function t(e) {
            var r = e.image,
                e = e.rect;
            _classCallCheck(this, t), this.image = r, this.setRect(e), this.x = 0, this.y = 0, this.anchorY = 0, this.scaleX = 1, this.walk = null
        }
        return _createClass(t, [{
            key: "setRect",
            value: function(e) {
                this.rect = e, this.width = e[2], this.height = e[3], this.drawArgs = [this.image].concat(_toConsumableArray(e), [0, 0, this.width, this.height])
            }
        }, {
            key: "render",
            value: function(e) {
                e.save(), e.translate(this.x, this.y), e.scale(this.scaleX, 1), e.drawImage.apply(e, _toConsumableArray(this.drawArgs)), e.restore()
            }
        }]), t
    }(),
    img = document.createElement("img"),
    canvas = (img.onload = init, img.src = config.src, document.querySelector("#peoplecanvas")),
    ctx = canvas ? canvas.getContext("2d") : void 0,
    stage = {
        width: 0,
        height: 0
    },
    allPeeps = [],
    availablePeeps = [],
    crowd = [];

function init() {
    canvas && (createPeeps(), resize(), gsap.ticker.add(render), window.addEventListener("resize", resize))
}

function createPeeps() {
    for (var e = config.rows, r = config.cols, t = e * r, a = img.naturalWidth / e, n = img.naturalHeight / r, o = 0; o < t; o++) allPeeps.push(new Peep({
        image: img,
        rect: [o % e * a, (o / e | 0) * n, a, n]
    }))
}

function resize() {
    canvas && 0 != canvas.clientWidth && (stage.width = canvas.clientWidth, stage.height = canvas.clientHeight, canvas.width = stage.width * devicePixelRatio, canvas.height = stage.height * devicePixelRatio, crowd.forEach(function(e) {
        e.walk.kill()
    }), crowd.length = 0, availablePeeps.length = 0, availablePeeps.push.apply(availablePeeps, allPeeps), initCrowd())
}

function initCrowd() {
    for (; availablePeeps.length;) addPeepToCrowd().walk.progress(Math.random())
}

function addPeepToCrowd() {
    var e = removeRandomFromArray(availablePeeps),
        r = getRandomFromArray(walks)({
            peep: e,
            props: resetPeep({
                peep: e,
                stage: stage
            })
        }).eventCallback("onComplete", function() {
            removePeepFromCrowd(e), addPeepToCrowd()
        });
    return e.walk = r, crowd.push(e), crowd.sort(function(e, r) {
        return e.anchorY - r.anchorY
    }), e
}

function removePeepFromCrowd(e) {
    removeItemFromArray(crowd, e), availablePeeps.push(e)
}

function render() {
    canvas && (canvas.width = canvas.width, ctx.save(), ctx.scale(devicePixelRatio, devicePixelRatio), crowd.forEach(function(e) {
        e.render(ctx)
    }), ctx.restore())
}
document.addEventListener("pjax:success", function(e) {
    canvas = document.querySelector("#peoplecanvas"), ctx = canvas ? canvas.getContext("2d") : void 0, window.removeEventListener("resize", resize), gsap.ticker.remove(render), setTimeout(function() {
        init()
    }, 300)
});