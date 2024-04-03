const $nuditySwitch = document.querySelector("#nuditySwitch");
const $violenceSwitch = document.querySelector("#violenceSwitch");
const $sensitiveSwitch = document.querySelector("#sensitiveSwitch");

$nuditySwitch.addEventListener("change", (e) => {
	chrome.storage.sync.set({ nudityOn: e.currentTarget.checked });
	setTimeout(() => {
		chrome.tabs.reload();
	}, 1000);
});
$violenceSwitch.addEventListener("change", (e) => {
	chrome.storage.sync.set({ violenceOn: e.currentTarget.checked });
	setTimeout(() => {
		chrome.tabs.reload();
	}, 1000);
});
$sensitiveSwitch.addEventListener("change", (e) => {
	chrome.storage.sync.set({ sensitiveOn: e.currentTarget.checked });
	setTimeout(() => {
		chrome.tabs.reload();
	}, 1000);
});

async function initialize() {
	const { nudityOn } = await chrome.storage.sync.get(["nudityOn"]);
	const { violenceOn } = await chrome.storage.sync.get(["violenceOn"]);
	const { sensitiveOn } = await chrome.storage.sync.get(["sensitiveOn"]);
	document.querySelector("#nuditySwitch").checked = nudityOn;
	document.querySelector("#violenceSwitch").checked = violenceOn;
	document.querySelector("#sensitiveSwitch").checked = sensitiveOn;
}

window.onload = () => {
	initialize();
};
