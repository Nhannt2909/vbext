const BASE_URL = "https://motchillk.you";

function normalizeUrl(url) {
    url = url || BASE_URL;
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function absoluteUrl(url) {
    if (!url) return "";
    if (url.indexOf("//") === 0) return "https:" + url;
    if (url.indexOf("http://") === 0) return url.replace(/^http:\/\//i, "https://");
    if (url.indexOf("https://") === 0) return url;
    if (url.charAt(0) === "/") return BASE_URL + url;
    return BASE_URL + "/" + url;
}

function textOf(e, selector) {
    return e.select(selector).text().trim();
}

function coverFromStyle(style) {
    let match = (style || "").match(/url\((['"]?)(.*?)\1\)/i);
    return match ? absoluteUrl(match[2]) : "";
}

function parseCards(doc, selector) {
    let list = [];
    doc.select(selector).forEach(e => {
        let thumb = e.select("a.myui-vodlist__thumb").first();
        let img = e.select("img").first();
        let title = textOf(e, ".myui-vodlist__detail .title");
        let description = textOf(e, ".myui-vodlist__detail .text");
        let tag = textOf(e, ".pic-tag");
        let cover = "";
        if (img) {
            cover = img.attr("data-src") || img.attr("src");
        }
        if (!cover && thumb) {
            cover = coverFromStyle(thumb.attr("style"));
        }

        list.push({
            name: title || (thumb ? thumb.attr("title") : ""),
            link: thumb ? absoluteUrl(thumb.attr("href")) : "",
            description: description,
            cover: absoluteUrl(cover),
            tag: tag,
            host: BASE_URL,
        });
    });
    return list;
}

function getNextPage(doc, page) {
    let next = "";
    let nextPage = (parseInt(page, 10) || 1) + 1;
    doc.select("#pagination a.page-link").forEach(e => {
        let href = e.attr("href");
        let text = e.text();
        if (!next && (e.attr("rel") === "next" || text === nextPage.toString() || href.indexOf("page=" + nextPage) >= 0)) {
            next = nextPage.toString();
        }
    });
    return next;
}
