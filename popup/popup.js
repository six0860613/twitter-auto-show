const switches = document.querySelectorAll(".switch");

const switchHandler = (e) => {
	const key = e.target.id.replace("Switch", "On");
	const value = e.target.checked;
	chrome.storage.sync.set({ [key]: value }, () => {
		setTimeout(() => chrome.tabs.reload(), 1000);
	});
};

switches.forEach((el) => el.addEventListener("change", switchHandler));

async function initialize() {
	const storage = await chrome.storage.sync.get([
		"nudityOn",
		"violenceOn",
		"sensitiveOn",
		"mediaOn",
	]);
	Object.keys(storage).forEach((key) => {
		document.querySelector(`#${key.replace("On", "Switch")}`).checked =
			storage[key];
	});
}

window.onload = () => {
	initialize();
};
