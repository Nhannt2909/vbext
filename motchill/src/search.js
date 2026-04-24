load('config.js');

function execute(key, page) {
    if (!page) page = '1';
    let response = fetch(BASE_URL + "/", {
        queries: {
            search: key
        }
    });
    if (response.ok) {
        let doc = response.html();
        let list = parseCards(doc, ".myui-vodlist__box");
        return Response.success(list, "");
    }
    return null;
}
