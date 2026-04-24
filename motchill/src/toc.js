load('config.js');

function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let watch = doc.select(".myui-content__thumb a").attr("href");
        if (watch) {
            let watchResponse = fetch(absoluteUrl(watch));
            if (watchResponse.ok) {
                doc = watchResponse.html();
            }
        }

        let list = [];
        let servers = doc.select("#servers-container .tab-pane");
        let hasMultipleServers = servers.size() > 1;

        servers.forEach(server => {
            let serverName = "";
            let id = server.attr("id");
            if (id) {
                serverName = doc.select("a[href='#" + id + "']").text();
            }
            let eps = server.select(".myui-content__list a");
            if (hasMultipleServers && serverName) {
                list.push({
                    name: serverName,
                    type: "section"
                });
            }

            for (let i = eps.size() - 1; i >= 0; i--) {
                let e = eps.get(i);
                list.push({
                    name: e.text().trim() || e.attr("title"),
                    url: absoluteUrl(e.attr("href")),
                    host: BASE_URL
                });
            }
        });

        return Response.success(list);
    }
    return null;
}
