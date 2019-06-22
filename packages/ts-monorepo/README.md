# Operations and Errors

Everything that `mr` does could be split in few steps:

- `Read mr config`
  - Critical Errors:
    - Uncaught Error while reading nested package configs
    - Can't read mr config
      -  Can't find mr config file
      -  Can't parse mr config file
      -  mr config is invalid

- `Read root package config`
  - Critical Errors:
    - Uncaught Error while reading nested package configs
    - Can't read root package config
      - Can't find root package config file
      - Can't parse root package config file
      - Root package config is invalid

- `Read nested package configs`
  - Critical Errors:
    - Uncaught Error while reading nested package configs
  - Errors:
    - Can't read nested package config
      - Can't parse nested package config file
      - Nested package config is invalid

# Async Nature

## Overview
Since JavaScript has async nature I plan to make an infrastructure helping me to manage async operations like working with file system in sync-like way.
To achieve it I plan to store handlers to all async operations with ability to check their states, abort etc.
I want to have the whole image about what async operation my application uses at any time.

Async operations could be grouped in two groups:
- Pauseable (file reading, remote data loading etc)
- Non-Pauseable (operations providing single callback at the end of operation without possibility to continue from some middle-point)

So, when I pause some async operation, technically I cancel it with saving some state to continue from.
When I cancel some async operation, technically some of them could be still running.

## Problems
- Pauseable Async Operations
  - Need to store the state somehow
- Non-Pauseable Async Operations
  - Possibly two modes:
    - Cancel current operations (disable callbacks) and repeat them on continue
    - Don't touch them on pause
- Cancelling
  - Some operations give a single callback at the end. When I cancel it I stop processing callbacks and mark it as cancelled. But technically, they are could be still operating.

## Solutions
- Pause/Cancel Queue
  - Pausing/Canceling takes some time. So when I Pause/Cancel something I put it in Pause/Cancel Queue.

# Notes
Read files
Install packages
Link packages
Run webpack

## Server
MR is a server listening to some port. MR CLI is a tool to communicate with this server.
I plan to do it to be able manage multiple monorepo processing in a single place.

## MRClient
MRClient communicates with MRServer to perform actions and read an output. It could be run/closed at any time.

## MRServer
The host. All operations, managing webpack buildings etc perform here.
E.g. MRClient sends a signal to run new webpack instance. It could be run in a new process or added to existed one.

## ? Independent Process
Each process could be a host or a client. A host is a MR Server and a client is like a child process.
MR Client will try to connect to the host

## AsyncAction
- Status:
  - Queued
  - Running
  - Done
  - Error
  - Cancelling
    - Reason: Error, Input, ForcePause (pause a non-pauseable action)
  - Cancelled
    - Reason: Error, Input, ForcePause (pause a non-pauseable action)
  - Pausing
    - Reason: Input, System
  - Paused
    - Reason: Input, System
- Info:
  - Repeated
    - From: Status

## AsyncManager
- maxRunningActionsNumber
- runningActionsNumber
- queuedActionsNumber
- doneActionsNumber

Each async action should store some meta data to operate the action at any time.
Each async action should point to its process.

## Expensive Operations
- File reading
- Webpack running
- Package installation
- Package linking

## FileReader

