load('config.js');

function execute() {
    return Response.success([
        { title: "Hanh Dong", input: BASE_URL + "/the-loai/hanh-dong", script: "gen.js" },
        { title: "Phieu Luu", input: BASE_URL + "/the-loai/phieu-luu", script: "gen.js" },
        { title: "Khoa Hoc", input: BASE_URL + "/the-loai/khoa-hoc", script: "gen.js" },
        { title: "Hai Huoc", input: BASE_URL + "/the-loai/hai-huoc", script: "gen.js" },
        { title: "Hoat Hinh", input: BASE_URL + "/the-loai/hoat-hinh", script: "gen.js" },
        { title: "Than Thoai", input: BASE_URL + "/the-loai/than-thoai", script: "gen.js" },
        { title: "Vo Thuat", input: BASE_URL + "/the-loai/vo-thuat", script: "gen.js" },
        { title: "Kinh Di", input: BASE_URL + "/the-loai/kinh-di", script: "gen.js" },
        { title: "Tam Ly", input: BASE_URL + "/the-loai/tam-ly", script: "gen.js" },
        { title: "Tinh Cam", input: BASE_URL + "/the-loai/tinh-cam", script: "gen.js" }
    ]);
}
