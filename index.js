const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');

const io = require('./src/main/io');

function createWindow() {
	const win = new BrowserWindow({
		title: "ByrdFeeder",
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		}
	});

	win.loadURL('http://localhost:3001');

	return win;
}

app.whenReady().then(() => {
	const win = createWindow();

	io.watchFiles( win );

	app.on('activate', function() {
		if(BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', function() {
	if(process.platform !== 'darwin') {
		app.quit();
	}
});

// IO Related
ipcMain.handle('app:get-files', () => {
	return io.getFiles();
});

ipcMain.handle('app:on-file-add', (event, files = []) => {
	io.addFiles(files);
});

ipcMain.handle('app:on-fs-dialog-open', (event) => {
	const files  = dialog.showOpenDialogSync({
		title: 'Open OPML',
		message: 'Choose file',
		properties: ['openFile'],
		filters: [
			{ name: 'OPML', extensions: ['opml', 'xml'] },
		],
	});

	io.addFiles(files.map(filepath => {
		return {
			name: path.parse(filepath).base,
			path: filepath,
		};
	}));
});

ipcMain.on('app:on-file-delete', (event, file) => {
	io.deleteFile(file.filepath);
});

ipcMain.on('app:on-file-copy', (event, file) => {
	event.sender.startDrag({
		file: file.filepath,
		icon: path.resolve(__dirname, './src/resources/paper.png'),
	});
});