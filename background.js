chrome.runtime.onInstalled.addListener(async () => {
	const { switchOn } = await chrome.storage.sync.get(["switchOn"]);
	if (!switchOn) {
		chrome.storage.sync.set({ switchOn: false });
	}
});
