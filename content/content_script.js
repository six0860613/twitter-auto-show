const langMatch = {
	en: "Show",
	"en-BG": "Show",
	"zh-Hant": "顯示",
	zh: "显示",
	ja: "表示",
	ko: "표시",
	ro: "Afișează",
	de: "Anzeigen",
	pt: "Mostrar",
	it: "Mostra",
	sv: "Visa",
	sr: "Прикажи",
	vi: "Hiện",
	fil: "Ipakita",
	sk: "Zobraziť",
	nl: "Weergeven",
	cs: "Zobrazit",
	mr: "दाखवा",
	ms: "Tunjukkan",
	uk: "Показати",
	th: "แสดง",
	nb: "Vis",
	bg: "Показване",
	ru: "Показать",
	ar: "إظهار",
	"ar-x-fm": "إظهار",
	fi: "Näytä",
};

async function getShowButton() {
	const lang = document.documentElement.lang;
	console.log(lang);
	const show = langMatch[lang] || "Show";
	const { nudityOn } = await chrome.storage.sync.get(["nudityOn"]);
	const { violenceOn } = await chrome.storage.sync.get(["violenceOn"]);
	const { sensitiveOn } = await chrome.storage.sync.get(["sensitiveOn"]);
	const { mediaOn } = await chrome.storage.sync.get(["mediaOn"]);
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
	if (mediaOn) {
		const path = $(location).attr("pathname");
		if (path.split("/").pop() === "media") $(btn).trigger("click");
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
