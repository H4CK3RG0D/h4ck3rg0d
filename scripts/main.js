const wait = e => new Promise((t => setTimeout(t, e))),
    config = JSON.parse(document.getElementById("config").dataset.value),
    DELAY = 100,
    clearBuffer = async () => {
        const e = document.querySelectorAll(".title--container");
        for (const t of e) t.classList.add("deleted"), await wait(100);
        for (const t of e) t.remove()
    }, bufferElem = document.querySelectorAll("[data-target='buffer']")[0], textTemplate = e => `\n<div class="title--container">\n  <h1 class="title--text title--text__secondary">${e}</h1>\n</div>`, titleTemplate = e => `\n<div class="title--container">\n  <h1 class="title--text">${e}</h1>\n</div>`, subtitleTemplate = e => `\n<div class="title--container">\n  <h1 class="title--text title--subtext">${e}</h1>\n</div>`, linkTemplate = e => {
        let t = '<div class="title--container title--link-container">';
        for (const a of e) t += `<a class="title--link" href="${a.url}">${a.text}</a>`;
        return t += "</div>", t
    }, appendBuffer = async ({
        text: e,
        title: t,
        subtitle: a,
        links: s
    }) => {
        let n = e,
            i = textTemplate;
        t && (i = titleTemplate), a && (i = subtitleTemplate), s && (i = linkTemplate, n = s), bufferElem.insertAdjacentHTML("beforeend", i(n)), await wait(100)
    };
let processing = !1;
const checkProcessing = () => !!processing || (processing = !0, !1),
    wrapper = e => async () => {
        !processing && (processing = !0, 1) && (await clearBuffer(), await e(), processing = !1)
    }, setAboutBuffer = wrapper((async () => {
        await appendBuffer({
            text: "About",
            title: !0
        });
        const e = [...config.about.split("\n")];
        for (const t of e) await appendBuffer({
            text: t
        });
        await appendBuffer({
            text: ""
        }), await appendBuffer({
            text: "",
            subtitle: !0
        }), await appendBuffer({
            text: ""
        }), await appendBuffer({
            text: ""
        }), await appendBuffer({
            text: ""
        }), await appendBuffer({
            text: ""
        }), await appendBuffer({
            text: "",
            subtitle: !0
        }), await appendBuffer({
            text: ""
        }), await appendBuffer({
            text: ""
        }), await appendBuffer({
            text: ""
        })
    })), setIndexBuffer = wrapper((async () => {
        await appendBuffer({
            text: "Robert Chen",
            title: !0
        });
        const e = ["WHS CLASS OF 2024", "software development", "Meme Lord :omegalul:"];
        for (const t of e) await appendBuffer({
            text: t
        });
        await appendBuffer({
            links: [{
                url: "",
                text: ""
            }, {
                url: "",
                text: ""
            }]
        })
    })), setBlog = wrapper((async () => {
        await appendBuffer({
            text: "Blog",
            title: !0
        })
    }));
let isIndex = !0;
const setAbout = () => {
        const e = isIndex;
        abtElem.classList.remove("not-deleted"), abtElem.classList.add("deleted"), setTimeout((() => {
            abtElem.innerText = e ? "Index" : "About", abtElem.href = e ? "#" : "#about", abtElem.classList.remove("deleted"), abtElem.style.opacity = "0", setTimeout((() => {
                abtElem.style.opacity = 1, abtElem.classList.add("not-deleted"), setTimeout((() => abtElem.classList.remove("not-deleted")), 1e3)
            }), 100)
        }), 900), isIndex ? setAboutBuffer() : setIndexBuffer(), isIndex = !isIndex
    },
    abtElem = document.querySelectorAll("a[data-action='about']")[0];
abtElem.onclick = setAbout, document.body.onload = () => {
    setTimeout((() => {
        "#about" === location.hash && setAbout()
    }), 2500)
};
console.log("e")