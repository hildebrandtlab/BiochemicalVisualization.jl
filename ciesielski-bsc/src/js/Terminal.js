/** This file's structure is based on the node-pty Electron usage example by Microsoft: https://github.com/microsoft/node-pty/tree/main/examples/electron. */

var os = require('os');
var pty = require('node-pty');
var Terminal = require('xterm').Terminal;

// Create simulated terminal `xterm` and include it in HTML.
const xterm = new Terminal();
xterm.open(document.getElementById('xterm'));

// Use Julia as communicating shell and start a new node-pty process using it.
const shell = os.platform() === "win32" ? "julia.exe" : "julia";
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env
});

// Send data written in simulated terminal to node-pty process connected with Julia shell.
xterm.onData(data => ptyProcess.write(data));

// Send data received from Julia shell back to simulated terminal.
ptyProcess.onData(data => xterm.write(data));
