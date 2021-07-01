const { Notification } = require('electron');

exports.filesAdded = (size) => {
	const notif = new Notification({
		title: 'Files added',
		body: `${size} file(s) has been successfully added.`
	});

	notif.show();
}