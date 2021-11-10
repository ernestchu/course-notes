# Design of Server Software
## Introduction
Conceptually, a as server follows a simple algorithm

1. Create and bind a socket to a well-known port
1. Enter an infinite loop
    - Accept the next request from a client
    - Process the request and reply the result to client

Types of servers

|                     | Iterative                                           | Concurrent                             |
|---------------------|-----------------------------------------------------|----------------------------------------|
| Connectionless      | Iterative connectionless servers                    | Iterative connection-oriented servers  |
| Connection-oriented | Concurrent connectionless servers **(rarely used)** | Concurrent connection-oriented servers |

## Iterative Servers
### Connectionless server

1. Create and bind a socket to a well-known port
1. Enter an infinite loop
    - Accept the next request from a client
    - Process the request and reply the result to client

The server only procides one single socket. Server can use `sendto()` and `recvfrom()` to get the address information of clients.

### Connection-oriented

1. Create and bind a socket to a well-known port
1. Place the socket in passive mode by calling `listen()`
1. Accept the next connection and obtain a new socket for the connection
1. Enter an infinite loop
    - Accept the next request from a client
    - Process the request and reply the result to client
1. When finishing with a client, close the connection and reutrn to step 3 to accept a new connection

## Concurrent Servers
Concurrency reduces response time for multiple clients under serveral conditions

- Siginificant I/O exists
- Processing time varies dramatically among requests
    - Small processes don't have to wait for big processes to finish
- Computer with multiple processors

Most concurrent server use multiple processes (or threads) tp achieve concurrency

- A single process (called mastser) begins execution initially
- The master process then
    1. Open a socekt at the well-know port
    1. Wait for the next request
    1. Create a slave to handle each request
- Each slave process handles communication with one client. Once the client disconnectm the slave process exits

### Connectionless server

**Master algorithm**

1. Create and bind the socket to a well-known port
1. Reapeatedly call `recvfrom()` to receive the next request from a client and create a new slave processs (or thread) to handle that response

**Slave algorithm**

1. Access to the corresponding socket
1. Form a reply and send it to the client using `sendto()`
1. Exit when finish

::: warning Cost of Concurrency
The cost of concurrency could be greater than the gain in speed in connectionless server. So very few connectionless server enforce a concurrent algorithm
:::

### Connection-oriented server

**Master algorithm**

1. Create and bind a socket to a well-known port
1. Place the socket in passive mode
1. Repeatedly call `accept()` to receive the next request and create a new slave process to handle the response

**Slave algorithm**

1. Begin with a connection passed from the master
1. Interact with client
1. Close the connection and exit

## Advanced Issues
### Create a new process
### Use only one thread to achieve concurrency
### Guidelines to select different types of servers
### Deadlock
## Example of Iterative Servers

