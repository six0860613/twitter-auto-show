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
	const lang = document.documentElement.lang;
	const show = langMatch[lang] || "Show";
	const { nudityOn } = await chrome.storage.sync.get(["nudityOn"]);
	const { violenceOn } = await chrome.storage.sync.get(["violenceOn"]);
	const { sensitiveOn } = await chrome.storage.sync.get(["sensitiveOn"]);
	const btn = $(
		`div[role="button"][tabindex="0"]:has(span[style="text-overflow: unset;"]:contains("${show}"))`
	);
	const triggerBtn = (text) => {
		if ($(btn).prev().text().includes(text)) {
			$(btn).trigger("click");
		}
	};
	if (nudityOn) triggerBtn("Nudity");
	if (violenceOn) triggerBtn("Violence");
	if (sensitiveOn) triggerBtn("Sensitive");
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
