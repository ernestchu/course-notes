# Design of Client Software
## Identify A Server
For a client, the first thing is to identify where the server is. It has to know the **IP address** and the **port number** of the server's application program. There're typically three ways to identify a server

1. Specify the server's address (IP & port) in client's program at the compile time.
    - Hard coded, when the server changes, the program needs to be recompiled
1. Require user to supply an argument to identify server
    - Blocking I/O
1. Use procedures to look up the information of server. DNS.

### Look up domain names
Socket API provides two procedures to find a domain name

- `inet_addr()`: Take a string taht contains a dotted decimal address and return the equivalent numerical IP address in binary
- `gethostbyname()`: Take a string that contains the domain name for a machine and return a `hostent` (host entity) structure

```c
#include <netdb.h>
struct hostent {
    char *h_name;       /* official host name */ 
    char **h_aliases;   /* other aliases */ 
    int  h_addrtype;    /* address type */ 
    int  h_length;      /* address length */ 
    char **h_addr_list; /* list of addresses */ 
    /* multiple addr if there're multiple inet interface on the host */
}
#define h_addr h_addr_list[0]; /*backward compatible*/
```
**Example**

Find the IP address of CSE webpage
```c
struct hostent *hptr;
char *name = "www.cse.nsysu.edu.tw";

if (hptr = gethostbyname(name)) {
    /* IP address is now in hptr->h_addr */
} else {
    /* error in name */
}
```
#### Move from IPv4 to IPv6
However, `gethostbyname()` and `gethostbyaddr()` only support IPv4. In IPv6 we use

- `getaddrinfo()`: convert strings which represent hostname or IP addresses into a **linked list** of addrinfo structure.
- `freeaddrinfo()`: gracefully clear the linked list of addrinfo.

```c
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>

struct addrinfo {
    int             ai_flags;
    int             ai_family;
    int             ai_socktype;
    int             ai_protocol;
    size_t          ai_addrlen;
    struct sockaddr *ai_addr;
    char            *ai_canonname;  /* canonical name */
    struct addrinfo *ai_next;       /* this forms a linked list */
};

int getaddrinfo(
    const char *node,
    const char *service,
    const struct addrinfo *hints,
    struct addrinfo **res
);

void freeaddrinfo(struct addrinfo *res);
```
#### Get domain name
**getnameinfo procedure**

`getnameinfo()` converts binary IP addres (`struct sockaddr`) into test strings consisting of a hostname and service (judging from well-kown ports)

```c
#include <sys/socket.h>
#include <netdb.h>

int getnameinfo(
    const struct sockaddr   *sa,
    socklen_t               salen,
    char*                   host,
    size_t                  hostlen,
    char*                   serv,
    size_t                  size_t servlen,
    int                     flags
);
```

**Get all domain names on a host**

```c
#include <stdio.h>
#include <stdlib.h>
#include <netdb.h>
#include <netinet/in.h>
#include <sys/socket.h>
#define NI_MAXHOST 1025

int main(void) {
    struct addrinfo *result;
    struct addrinfo *res;
    int error;

    /* resolve the domain name into a list of addresses */
    error = getaddrinfo("www.cse.nsysu.edu.tw", NULL, NULL, &result);
    if (error != 0) {
        fprintf(stderr, "error: %s\n", gai_strerror(error));
        return -1;
    }

    /* loop over all the results in the linked list and do inverse lookup */
    for (res = result; res != NULL; res = res->ai_next) {
        char hostname[NI_MAXHOST] = "";

        error = getnameinfo(res->ai_addr, res->ai_addrlen, hostname, NI_MAXHOST, NULL, 0, 0);
        if (error != 0) {
            fprintf(stderr, "error: %s\n", gai_strerror(error));
            continue; /* look for the next item */
        }
        if (*hostname != '\0')
            printf("hostname: %s\n", hostname);
    }
    
    freeaddrinfo(result);
    return 0;
}
```
### Look up ports
Socket API provides a procedure to lookup a **well-known** port based on service and protocol

- `getservbyname()`: require two string arguments (service and protocol) and return a `servent` (service entity) structure.

```c
#include <netdb.h>

struct servent {
    char *s_name;       /* official service name */
    char **s_aliases;   /* other aliases */
    int  s_port;        /* port for this service */
    char *s_proto;      /* protocol to use */
}
```
::: warning Remarks
Q. Why do we have to lookup for the port number if it is **well-know**?

A. The port number depends on the configuration on the remote host, e.g. https on the destination computer need not on port 443
:::

**Example**
If the argument `protocol` is set to NULL, then any protocol will be matched
```c
struct servent *sptr;

if (sptr = getservbyname("http", "tcp")) {
    /* port number is now in sptr->s_port */
} else {
    /* error occurred */
}
```

### Look up protocol
Socket API provides a procedure that allows a client (or server) to map a protocol name to the integer constant.

- `getprotobyname()`: Take a string argument of protocol name and return a protoent (protocol entity) structure

```c
#include <netdb.h>

struct protoent {
    char *p_name;       /* official protocol name */
    char **p_aliases;   /* list of aliases allowed */
    int  p_proto;       /* official protocol number */
};
```
**Example**
Get the protocol information
```c
struct protoent *pptr;

if (pptr = getprotobyname("udp")) {
    /* official protocol number is now in pptr->p_proto */
} else {
    /* error occurred */
}
```

## TCP Client Programming

1. Find IP address and port number of the server
1. Allocate a socket
1. Specify that the connection needs an unused protocol port and allow TCP to choose automatically
1. Connect the socket to the server
1. Communicate with the server
    - Send requests and await replies
1. Close the connection

### Make a connection
**Allocate a socket**

Recall [chapter 3](./chapter-3.md#socket-procedure)

```c
#include <sys/types.h>
#include <sys/socket.h>

int fd;

fd = socket(PF_INET, SOCK_STREAM, 0);
/* PF_INET == AF_INET */
```
**Select a local port**

A TCP client can arbitrarily select a local port as long as

- This port isn't used by another process
- This port hasn't been assigned to a well-known service

**Connect to a server**

Recall [chapter 3](./chapter-3.md#connect-procedure)

For a TCP client, `connect()` forces initial TCP [**three-way handshaking**](./chapter-2.md#connection-management). It has four major tasks

1. Ensure the specified socket has not already been connected
    - If so, gracefully close the previous connection first then proceed
1. Set the remote endpoint (IP & port) with passed arguments
1. Set the local endpoint (IP & port) automatically
1. Initiate a TCP three-way handshaking and return a value indicating the connection established or not

### Communication

Recall [chapter 3](./chapter-3.md#write-procedure)

```c
#define BLEN 120    /* buffer length */
char *req = "request for some port";
char buf[BLEN];     /* buffer for result */
char *bptr;         /* pointer to buffer */
int  n;             /* number of bytes read */
int  buflen;        /* space left in buffer */

bptr    = buf;
buflen  = BLEN

/* send request */
/* write() == send() with the last argument equals 0 */
send(fd, req, strlen(req), 0);

/* read() == recv() with the last argument equals 0 */
while ((n = recv(fd, bptr, buflen, 0)) > 0) {
    bptr += n;
    bufflen -= n;
}
```
Since TCP is stream-oriented, it may choose to **break a block** of data into pieces and transmit each piece in a separate segment. So the receiver must be prepared to accept data a few bytes at a time.

### Close connection
Recall [chapter 2](./chapter-2.md#connection-management).

**shutdown procedure**

Socket API provides a procedure `shutdown()` to shut down a TCP connection in **one or both** direction, i.e., partial close.
```c
errcode = shutdown(int fd, int direction);
```

- `direction=0`: No futher receptions (input) is allowed
- `direction=1`: No futher transmissions (output) is allowed
- `direction=2`: Connection is shutdown in both directions
    - Same as `close(fd)`, the remote host would receive an EOF hence close the connection remotely.

## UDP Client Programming
### UDP sockets
UDP socket has two modes

1. connected
    - Call `connect()` to specify a remote endpoint only once
        - `connect()` only records the endpoint's info for later use
        - The success of `connect()` does not mean the endpoint is valid or reachable
    - No need to specify a remote host later
    - However, the endpoint is unawared of that at all
1. unconnected
    - Specify the destination each time when sending messages
    - This is flexible when you want to communicate with multiple servers with a single port


### Communication
Unlike TCP, UDP provides message transfer, by which it transfer the entire message at once but do not guarantee the integrity of the data. So there's no need to make repeated calls to `recv()`. Of course, you need to have a buffer with sufficient space, otherwise UDP **discards bytes** that do not fit in the buffer.

### Close a UDP socket
UDP client can call `close()` to close a socket file descriptor and release resource associated with it. But this call does not inform the server that the socket is closed.

## Examples of Network Services
### connnectTCP & connectUDP
Create some procedures that we can reuse to make TCP or UDP connection.
```c
socket = connectTCP(machine, service);
socket = connectUDP(machine, service);
```
#### connectTCP procedure
```c
int connectsock(
    const char *host,
    const char *service,
    const char *transport
);

/*
 * connectTCP: Connect to a TCP service on a host
 * [Arguments]
 *  host:    Name of host to which connection is desired
 *  service: Service associated with the desired port
 */

int connectTCP(const char *host, const char *service) {
    return connectsock(host, service, "tcp");
}
```

#### connectUDP procedure
```c
int connectsock(
    const char *host,
    const char *service,
    const char *transport
);

/*
 * connectUDP: Connect to a UDP service on a host
 * [Arguments]
 *  host:    Name of host to which connection is desired
 *  service: Service associated with the desired port
 */

int connectUDP(const char *host, const char *service) {
    return connectsock(host, service, "udp");
}
```

#### connectsock procedure
```c
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <string.h>
#include <stdlib.h>

#ifndef INADDR_NONE
#define INADDR_NONE 0xffffffff
#endif /* INADDR_NONE */

extern int errno;
void errexit(const char*, ...);

/*
 * connetsock: Allocate & connect a socket using TCP or UDP
 * [Arguments]
 *  host:       Name of host to which connection is desired
 *  service:    Service associated with the desired port
 *  transport:  Name of transport protocol to use ("tcp" or "udp")
 */

int connectsock(
    const char *host,
    const char *service,
    const char *transport
) {
    struct hostent      *phe;
    struct servent      *pse;
    struct protoent     *ppe;
    struct sockaddr_in  sin;    /* an Internet endpoint address */
    int s, type;

    memset(&sin, 0, sizeof(sin)) /* clear sin */
    sin.sin_family = AF_INET;

    /* Map service name to port number, allowing for number directly */
    if (pse = getservbyname(service, transport))
        sin.sin_port = pse->s_port;
    else if ((sin.sinport = htons((u_short)atoi(service))) == 0)
        errexit("can't get \"%s\" service entry\n", service);

    /* Map host name to IP address, allowing for dotted decimal */
    if (phe = gethostbyname(host))
        memcpy(&sin.sin_addr, phe->h_addr, phe->h_length);
    else if ((sin.sin_addr.s_addr = inet_addr(host)) == INADDR_NONE)
        errexit("can't get \"%s\" host entry\n", host);

    /* Map protocol name to protocol number */
    if ((ppe = getprotobyname(transport)) == 0)
        errexit("can't get \"%s\" protocol entry\n", transport);

    /* Use protocol to choose a socket type */
    if (strcmp(transport, "udp") == 0)
        type = SOCK_DGRAM;
    else
        type = SOCK_STREAM;

    /* Allocate a socket */
    s = socket(PF_INET, type, ppe->p_proto);
    if (s < 0)
        errexit("can't create socket: %s\n", strerror(errno));

    /* Connect the socket */
    if (connect(s, (struct sockaddr*)&sin, sizeof(sin)) < 0)
        errexit("can't connect to %s:%s: %s\n", host, service, strerror(errno));
        
    return s;
}
```
#### errexit procedure
```c
#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>

/*
 * errexit: Print an error message and exit
 */

int errexit(const char *format, ...) {
    va_list args;
    va_start(args, format);
    vfprintf(stderr, format, args);
    va_end(args);
    exit(1);
}
```
### DAYTIME srevice

- It allows users to obtain the date and time in a format fit for human consumption
    - E.g. "Tue Apr 20 21:19:39 CST 2021"
- DAYTIME supports both TCP and UDP connections, and operates at **port 13**

#### Two types of connections

1. TCP connection
    - TCP client does not need to send any request
    - Once a new connection arrives, the server
        1. Form a string containing the current data and time
        1. Send the string
        1. Close the connection
1. UDP connection
    - UDP client needs to send a request, which can be any UDP datagram
    - Once receiving a datagramn the server
        1. Do the first two things same as TCP server
        1. Once it has sent a reply, the server discards the datagram received

#### DATTIME TCP-client
```c
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

void TCPdaytime(const char *host, const char *service);
int connectTCP(const char *host, const char *service);

#define LINELEN 128

/* DAYTIME client's main function */
int main(int argc, char **argv) {
    char *host = "localhost";   /* host to use if none supplied */
    char *service = "daytime";  /* default service port */
    switch (argc) {
        case 1:
            break;
        case 3:
            service = argv[2];
        case 2:
            host = argb[1];
            break;
        default:
            fprintf(stderr, "usage: TCPdaytime [host [port]]\n");
            exit(1);
    }
    TCPdaytime(host, service);
    return 0;
}

/*
 * TCPdaytime: Invoke Daytime on specified host and print results
 */
void TCPdaytime(const char *host, const char *srevice) {
    char buf[LINELEN+1];    /* buffer for one line of text */
    int s, n;               /* socket, read count */

    s = connectTCP(host, service);
    
    while ((n = read(s, buf, LINELEN)) > 0) {
        buf[n] = '\0';      /* ensure null-terminated */
        fputs(bif, stdout);
    }
}
```

### TIME service
It specifies time in a 32-bit integer which represents the number of seconds since midnight, January 1, 1970, UCT

TIME protocol supports both TCP and UDP connections, and operates at protocol port 37. The mechanism is similar to that of DAYTIME service.


### ECHO service


