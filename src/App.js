import React, { useEffect, Component } from 'react';

//const electron = window.require('electron');
//const { ipcRenderer } = window.require('electron');
//const remote = electron.remote;
//const { dialog } = remote;



//export default App;

export default class App extends Component {
	minimize() {
		console.log("cenas");
		//alert("Minimize!");
	}

	maximize(e) {
		//alert("Maximize!");
		console.log("cenas");
	}

	close(e) {
		//alert("Close!");
		console.log("cenas");
	}

	render() {
		return (
			<div>
				<div>
					<h2>Home</h2>
					<span style={{ display: 'block', backgroundColor:"#00ff00", width:100, height: 100}} onClick={this.minimize}>Min</span>
					<span onClick={this.maximize}>Max</span>
					<span onClick={this.close}>Close</span>
				</div>
			</div>
		);
	}
}