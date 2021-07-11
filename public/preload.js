
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	notificationApi: {
		sendNotification(message) {
			ipcRenderer.send('notify', message);
		}
	},
	toggle: () => ipcRenderer.invoke('dark-mode:toggle')
})
