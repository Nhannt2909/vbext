load('config.js');

function execute(url) {
    return Response.success({
        data: absoluteUrl(url),
        type: "auto",
        headers: {
            Referer: BASE_URL + "/"
        },
        host: BASE_URL,
        timeSkip: []
    });
}
