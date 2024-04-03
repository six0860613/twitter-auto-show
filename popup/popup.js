const $switch = document.querySelector("#switch");

$switch.addEventListener("change", (e) => {
	chrome.storage.sync.set({ switchOn: e.currentTarget.checked });
	setTimeout(() => {
		chrome.tabs.reload();
	}, 1000);
});

async function initialize() {
	let { switchOn } = await chrome.storage.sync.get(["switchOn"]);
	document.querySelector("#switch").checked = switchOn;
}

window.onload = () => {
	initialize();
};
