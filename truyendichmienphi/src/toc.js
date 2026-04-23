load("config.js");
load("util.js");

function execute(url) {
	const apiURL = getAPIURL(url);
	const data = fetch(`${apiURL}/chapters`, {
		queries: {
			limit: 99999,
			sortBy: "chapter_number:asc",
		},
	}).json();

	const list = [];

	data.results.forEach((toc) => {
		const title = toc.title.replace(/^Chương\s*\d+\s*:\s*/i, "");

		list.push({
			name: `Chap ${toc.chapter_number}: ${title}`,
			url: `${apiURL}/chapter/${toc.chapter_number}`,
			host: BASE_URL,
		});

	});

	return Response.success(list);
}
