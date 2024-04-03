const langMatch = {
	"zh-Hant": "顯示",
	zh: "显示",
	en: "Show",
	"en-BG": "Show",
	ja: "表示",
	ko: "표시",
	de: "Anzeigen",
};

async function getShowButton() {
	const { switchOn } = await chrome.storage.sync.get(["switchOn"]);
	if (switchOn) {
		const lang = document.documentElement.lang;
		const show = langMatch[lang] || "Show";
		$(
			`div[role="button"][tabindex="0"]:has(span[style="text-overflow: unset;"]:contains("${show}"))`
		).trigger("click");
	}
}

const observer = new MutationObserver((mutations) => {
	const isChildListChanged = mutations.some(
		(mutation) =>
			mutation.type === "childList" && mutation.addedNodes.length > 0
	);

	if (isChildListChanged) {
		observer.disconnect();

		getShowButton();

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
});

getShowButton();

observer.observe(document.body, {
	childList: true,
	subtree: true,
});
