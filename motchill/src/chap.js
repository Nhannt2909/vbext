load('config.js');

function getEpisodeTitle(doc, episodeTitle) {
    let movieTitle = doc.select("h1[itemprop=name]").text().trim();
    episodeTitle = (episodeTitle || "").trim();
    if (movieTitle && episodeTitle) {
        return movieTitle + " - " + episodeTitle;
    }
    return episodeTitle || movieTitle || "";
}

function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let servers = doc.select(".streaming-server");
        if (servers.size() === 0) {
            return Response.error("Khong tim thay thong tin episode");
        }

        let tracks = [];
        servers.forEach(item => {
            let link = item.attr("data-link");
            if (!link) return;
            tracks.push({
                title: item.text().trim(),
                data: absoluteUrl(link),
            });
        });

        if (tracks.length === 0) {
            tracks.push({
                title: "",
                data: url,
            });
        }

        return Response.success(tracks);
    }
    return null;
}
