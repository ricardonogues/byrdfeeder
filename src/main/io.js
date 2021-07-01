const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const open = require('open');
const chokidar = require('chokidar');

const notification = require('./notification');

const appDir = path.resolve(os.homedir(), 'electron-app-files');


exports.addFiles = (files = []) => {
	fs.ensureDirSync(appDir);

	files.forEach(file => {
		const filePath = path.resolve(appDir, file.name);

		if(!fs.existsSync(filePath)) {
			fs.copyFileSync(file.path, filePath);
		}
	});
};

exports.deleteFile = (filename) => {
	const filePath = path.resolve(appDir, filename);

	if(fs.existsSync(filePath)) {
		fs.removeSync(filePath);
	}
};

exports.openFile = (filename) => {
	const filePath = path.resolve(appDir, filename);

	if(fs.existsSync(filePath)) {
		open(filePath);
	}
};

exports.watchFiles = (win) => {
	chokidar.watch(appDir).on('unlink', (filepath) => {
		win.webContents.send('app:delete-file', path.parse(filepath).base);
	});
};