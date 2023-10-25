## What is MPI?

- MPI: Message Passing Interface
- Doc: https://www.mpi-forum.org/

### Vocabulary

- Process - Each instance of the code is an MPI process, typically 1 per physical core or node
- Rank - Each process has a rank, that is basically just an ID, it's an integer
- Communicator - A group of processes that we assign some name to, so this might be a group that includes every process you have, or maybe just a few working on a specific task

### Basic API

| Function               | Introduction                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| MPI_Init               | Initialise the MPI environment, it can be passed two variables but for now just leave these as NULL |
| MPI_Comm_rank          | This tells you what your current rank is for a communicator group                                   |
| MPI_COMM_WORLD         | This is the default communicator group, has all of the instances currently initialised              |
| MPI_Finalize           | Ignore the horrible American spelling here, this ends the MPI                                       | environment |
| MPI_Comm_size          | This returns the number of processes in a specific communicator                                     |
| MPI_get_processor_name | Returns the name of the actual piece of hardware that is currently running the process              |

### Communication

- Collective communication - All of the processes within a specific group receive a copy of the communication

- Point-to-point communication - There is a single sender, and a single receiver

```c++
#include <mpi.h>

/*
MPI_Send(const void *buf, int count, MPI Datatype datatype, int dest, int tag, MPI_Comm comm)
*/

/**
MPI_Recv(void *buf, int count, MPI Datatype datatype, int source, int tag, MPI_Comm comm, MPI_Status *status)
 */

```

### Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <mpi.h>
const int MAX_STRING = 100;
int main(void) {
  int comm_size;
  int rank;
  char greeting[MAX_STRING];
  MPI_Init(NULL, NULL);
  MPI_Comm_size(MPI_COMM_WORLD, &comm_size);
  MPI_Comm_rank(MPI_COMM_WORLD, &rank);
  char processor_name[MPI_MAX_PROCESSOR_NAME];
  int name_len;
  MPI_get_processor_name(processor_name, &name_len);
  if(rank != 0){
sprintf(greeting, "Greetings from processor %s, process %d of %d!", processor_name, rank, comm_size);
    MPI_Send(greeting, strlen(greeting)+1, MPI_CHAR, 0, 0, MPI_COMM_WORLD);
  }
  else{
    int i;
      for(i = 1; i < comm_size; i++){
          MPI_Recv(greeting, MAX_STRING, MPI_CHAR, i, 0, MPI_COMM_WORLD,
MPI_STATUS_IGNORE);
          printf("%s\n", greeting);
      }
  }
}

```

### Blocking

> if a MPI_recv call is made the process will continue to wait until it receives that message

### Non-blocking

> Code can continue execution after calling a particular MPI function

| Function  | Description                                                                              |
| --------- | ---------------------------------------------------------------------------------------- |
| MPI_Ssend | A guaranteed blocking version of MPI_Send It takes the exact same parameters as MPI_Send |
| MPI_Send  | Sends a message to another process, will block only if that message is large             |
| MPI_Isend | Same as MPI_Send but is guaranteed not to block                                          |
| MPI_Recv  | Receives a message from another process, guaranteed to block                             |
| MPI_Irecv | Same as MPI_Recv but does not block                                                      |

### Status

- MPI_Status_Ignore - You are not providing any information on the data You could use the MPI_Status struct

- MPI_Source - Which process sent this message?
- MPI_Tag - What was the tag for this message?
- MPI_Error - Was there a detectable error with this message? Wrong type etc

### Sending

- MPI_Test - A non-blocking check, assigns the second parameter to true (1) if the MPI_Request is equal to the third parameter

### Receiving

MPI_Waitall - If you have multiple requests as an array, it can provide a non-blocking wait until they are all finished
