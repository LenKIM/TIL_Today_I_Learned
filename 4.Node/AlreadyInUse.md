## error: Port 3000 is already in use

This error occurs when a process you are running is already using port 3000. It is possible that another program is using this port or more likely that you have tried to run your perk server twice from two different windows.

`To fix`

Find the process running on port 3000 by using the following command on the command line:

`lsof -i :3000`

The output will be something like this:
```
COMMAND   PID    USER   FD   TYPE             DEVI...
ruby    28967 alarner   11u  IPv6 0xa4a1be00af79d0...
node    41613 alarner   13u  IPv6 0xa4a1be00a46ada...
```

If you need those processes then switch to a different port by switching your configuration ports to a different number.

Use the kill command to kill any processes (process number listed in the PID column) that are using the port.

`kill 28967 41613`
