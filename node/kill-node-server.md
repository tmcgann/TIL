Sometimes while working with Node (e.g. Gulp) I'll get into a bind where a server errors out and I think I've terminated the server, but come to find out when I start a new instance of the server 

Sometimes when working with Node, I run into the scenario where I need to kill a server or process that is occupying a port I want to use (e.g. maybe a previous instance crashed and I thought I terminated it but nope, it's still running).

There are a number of was to approach this problem. One of the most common is to use `ps` to look up the process ID and `kill` to kill the process. In this case I could use something like `ps -ax | grep node` to look up my Node process. I've found that this isn't always the most effective for my particular scenario and have come to prefer `lsof -i tcp:<port>`. This command yields output like this:

```bash
$ lsof -i tcp:9000
COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    85288 taylor   19u  IPv6 0x51cbdafd526a28ef      0t0  TCP *:cslistener (LISTEN)
```

Then to kill the identified process, it's always good to send a `SIGTERM` before a `SIGKILL` to give the process a chance to clean up after itself:

```bash
$ kill -15 85288
```

That didn't seem to do much.

```bash
$ kill -9 85288
[1]-  Killed: 9               gulp server
```

That did it! Now I can run my Gulp server without adjusting the port and no rogue processes are running.
