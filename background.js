chrome.runtime.onInstalled.addListener(async () => {
	const { nudityOn } = await chrome.storage.sync.get(["nudityOn"]);
	const { violenceOn } = await chrome.storage.sync.get(["violenceOn"]);
	const { sensitiveOn } = await chrome.storage.sync.get(["sensitiveOn"]);
	if (!nudityOn) chrome.storage.sync.set({ nudityOn: false });
	if (!violenceOn) chrome.storage.sync.set({ violenceOn: false });
	if (!sensitiveOn) chrome.storage.sync.set({ sensitiveOn: false });
});
