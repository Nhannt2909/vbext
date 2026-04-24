load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let genres = [];
        doc.select(".myui-media-info a[href*='/the-loai/']").forEach(e => {
            genres.push({
                title: e.text(),
                input: absoluteUrl(e.attr("href")),
                script: "gen.js"
            });
        });

        let suggests = [];
        parseCards(doc, "#type .myui-vodlist__box").forEach(e => {
            suggests.push({
                title: e.name,
                input: e.link,
                script: "detail.js"
            });
        });

        let detail = [];
        let alt = doc.select(".myui-content__detail .title2").text().trim();
        let status = doc.select(".myui-media-info .badge").text().trim();
        let info = doc.select(".myui-media-info .info-block").html();
        if (alt) detail.push("Ten khac: " + alt);
        if (status) detail.push("Moi nhat: " + status);
        if (info) detail.push(info);
        let stateText = doc.select(".myui-media-info .info-block").text().toLowerCase();

        return Response.success({
            name: doc.select(".myui-content__detail h1[itemprop=name]").text(),
            cover: absoluteUrl(doc.select(".myui-content__thumb img").attr("src")),
            author: "Motchill",
            description: doc.select(".sketch[itemprop=description]").html(),
            detail: detail.join("<br>"),
            ongoing: stateText.indexOf("hoan tat") < 0 && stateText.indexOf("hoàn tất") < 0 && stateText.indexOf("hoan thanh") < 0 && stateText.indexOf("hoàn thành") < 0,
            genres: genres,
            suggests: suggests,
            format: "series",
            host: BASE_URL
        });
    }
    return null;
}
