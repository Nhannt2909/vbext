load('config.js');

function execute() {
    return Response.success([
        { title: "Moi cap nhat", input: BASE_URL, script: "update.js" },
        { title: "Phim moi", input: BASE_URL + "/danh-sach/phim-moi", script: "gen.js" },
        { title: "Phim bo", input: BASE_URL + "/danh-sach/phim-bo", script: "gen.js" },
        { title: "Phim le", input: BASE_URL + "/danh-sach/phim-le", script: "gen.js" },
        { title: "Thuyet minh", input: BASE_URL + "/danh-sach/phim-thuyet-minh", script: "gen.js" },
        { title: "Chieu rap", input: BASE_URL + "/danh-sach/phim-chieu-rap", script: "gen.js" }
    ]);
}
