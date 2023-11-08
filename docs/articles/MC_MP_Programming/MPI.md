## What is MPI?

- MPI: Message Passing Interface
- Doc: https://www.mpi-forum.org/

### Vocabulary

- Process - Each instance of the code is an MPI process, typically 1 per physical core or node
- Rank - Each process has a rank, that is basically just an ID, it's an integer
- Communicator - A group of processes that we assign some name to, so this might be a group that includes every process you have, or maybe just a few working on a specific task

### Basic API

| Function               | Introduction                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| MPI_Init               | Initialise the MPI environment, it can be passed two variables but for now just leave these as NULL |
| MPI_Comm_rank          | This tells you what your current rank is for a communicator group                                   |
| MPI_COMM_WORLD         | This is the default communicator group, has all of the instances currently initialised              |
| MPI_Finalize           | Ignore the horrible American spelling here, this ends the MPI environment                           |
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

## Cost of MPI messages

### Message size

There are two major factors that affect the time to send a message

The first is message size, it works kind of like the length of a train

There is a limit of how many tracks there are, the more carriages, the longer it takes to completely arrive

### Physical connection

For latency we measure it in microseconds (μs), which is one millionth of a second

### Equation

Packet size = Number of elements X variable size

Time cost = Number of messages \* ((Latency + Packet size) / Bandwidth)

### Summary

This is just an estimate, lots of factors can affect the actual time cost

- The number of switches in the path
- The physical distance of the interconnection
- The method of packaging the message for transmission

## Collective communication

Collective communication - All of the processes within a specific group receive a copy of the communication

### MPI_Bcast

> This is used to transmit a message from one process to others in a communicator

| paramaters   | description                                          |
| ------------ | ---------------------------------------------------- |
| void\*       | What variable is the data you are sending?           |
| int          | How many elements of data is this?                   |
| MPI_Datatype | What MPI_Datatype is the data?                       |
| int          | What is the rank of the process sending the message? |
| MPI_Comm     | What communicator are you sending to?                |

Example:

```c

int value = 12345;
MPI_Bcast(&value, 1, MPI_INT, broadcast_process, MPI_COMM_WORLD)

```

## MPI_Scatter

MPI_Scatter - A method for splitting and sending an array across a set of processes

Total data

| parameters   | description                                     |
| ------------ | ----------------------------------------------- |
| void\*       | What variable is the full data you are sending? |
| int          | How many elements is the full data?             |
| MPI_Datatype | What MPI_Datatype is the full data?             |

Received data

| parameters   | description                                     |
| ------------ | ----------------------------------------------- |
| void\*       | What variable is the full data you are sending? |
| int          | How many elements is the full data?             |
| MPI_Datatype | What MPI_Datatype is the full data?             |

Sender data

| parameters | description                                          |
| ---------- | ---------------------------------------------------- |
| int        | What is the rank of the process sending the message? |
| MPI_Comm   | What communicator is this using?                     |

Example:

```c
#include <stdio.h>
int rank;
int broadcast_root = 0;
int values[] = {1,2,3,4,5,6,7,8,9};
int local_values[2];

// The rank variable is assigned to 0
MPI_Comm_rank(MPI_COMM_WORLD, &rank);

MPI_Scatter(values, 8, MPI_INT, local_values, MPI_INT, 2, broadcast_root, MPI_COMM_WORLD);

printf("[Process: %d]", rank);

for(int i = 0; i < 2; i++) {
  printf("local values are %d", local_value[i]);
}

/**
 * Process 0 local values are x x
 * .....
 */

```

## MPI_Scatterv

MPI*Scatterv - An extension of MPI_Scatter that allows you to `specify` how many \_elements* each process receives

Total data

| parameters   | description                                     |
| ------------ | ----------------------------------------------- |
| void\*       | What variable is the full data you are sending? |
| int          | How many elements is the full data?             |
| int          | Where will this portion of work start?          |
| MPI_Datatype | What MPI_Datatype is the full data?             |

Received data

| parameters   | description                                     |
| ------------ | ----------------------------------------------- |
| void\*       | What variable is the full data you are sending? |
| int          | How many elements is the full data?             |
| MPI_Datatype | What MPI_Datatype is the full data?             |

Sender data

| parameters | description                                          |
| ---------- | ---------------------------------------------------- |
| int        | What is the rank of the process sending the message? |
| MPI_Comm   | What communicator is this using?                     |

Example:

```c

int displacement = {0, 3, 6, 9};
int elements_per_process = {3, 3, 3, 2};

int rank;
int values[] = {1,2,3,4,5,6,7,8,9,10,11};
int local_value[2];

MPI_Comm_rank(MPI_COMM_WORLD, &rank);

MPI_Scatterv(values, elements_per_process, displacement, MPI_INT, local_values, MPI_INT, elements_per_process[rank], broadcast_root, MPI_COMM_WORLD);

printf("[Process: %d]", rank);

for(int i = 0; i < 2; i++) {
  printf("local values are %d", local_value[i]);
}

// [Process: x], loca

```

## MPI_Gather

MPI_Gather - A method for combining data to a single array from a set of smaller arrays in each processes

MPI_Gatherv - An extension of MPI_Gather that allows you to receive different sized
messages from each process

Sent data

| parameters   | description                                     |
| ------------ | ----------------------------------------------- |
| void\*       | What variable is the full data you are sending? |
| int          | How many elements is the full data?             |
| MPI_Datatype | What MPI_Datatype is the full data?             |

Gathered data

| parameters   | description                                     |
| ------------ | ----------------------------------------------- |
| void\*       | What variable is the full data you are sending? |
| int          | How many elements is the full data?             |
| MPI_Datatype | What MPI_Datatype is the full data?             |

Receviver data

| parameters | description                                          |
| ---------- | ---------------------------------------------------- |
| int        | What is the rank of the process sending the message? |
| MPI_Comm   | What communicator is this using?                     |

Example:

```c



```

### MPI_Allgather

MPI_Allgather - An extension of MPI_Gather that gives each process a copy of the complete array

Sent data

| parameter    | description                                      |
| ------------ | ------------------------------------------------ |
| void\*       | What variable is the local data you are sending? |
| int          | How many elements is the local data?             |
| MPI_Datatype | What MPI_Datatype is the full data?              |

Gathered data

| parameter    | description                                 |
| ------------ | ------------------------------------------- |
| void\*       | Where is the data you receive stored?       |
| int          | How many elements of data will you receive? |
| MPI_Datatype | What datatype will that data be?            |

Receiver data

| parameter | description                                            |
| --------- | ------------------------------------------------------ |
| int       | What is the rank of the process receiving the message? |
| MPI_Comm  | What communicator is this using?                       |

MPI_Allgatherv - An extension of MPI_Allgather that allows you to receive different sized messages from each process

Sent data

| parameter    | description                                      |
| ------------ | ------------------------------------------------ |
| void\*       | What variable is the local data you are sending? |
| int          | How many elements is the local data?             |
| MPI_Datatype | What MPI_Datatype is the full data?              |

Gathered data

| parameter    | description                               |
| ------------ | ----------------------------------------- |
| void\*       | Where is the data you receive stored?     |
| int          | How many elements does each process have? |
| int          | Where does each portion of work start?    |
| MPI_Datatype | What datatype will that data be?          |

Receiver data

| parameter | description                                            |
| --------- | ------------------------------------------------------ |
| int       | What is the rank of the process receiving the message? |
| MPI_Comm  | What communicator is this using?                       |

## MPI_Reduce

MPI_Reduce - A method that performs an operation on array that applies to all elements at the same iteration

| parameter    | description                                            |
| ------------ | ------------------------------------------------------ |
| void\*       | What variable is the local data you are sending?       |
| void\*       | Where is the data you receive stored?                  |
| int          | How many elements is the local data?                   |
| MPI_Datatype | What MPI_Datatype is the full data?                    |
| MPI_Op       | What type of operation will be applied?                |
| int          | What is the rank of the process receiving the message? |
| MPI_Comm     | What communicator is this using?                       |

| Operation  | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| MPI_MIN    | The minimum element for each iteration                        |
| MPI_MAX    | The maximum element for each iteration                        |
| MPI_MINLOC | The minimum element for each iteration and the process's rank |
| MPI_MAXLOC | The maximum element for each iteration and the process's rank |
| MPI_SUM    | The sum for each iteration                                    |
| MPI_PROD   | The product for each iteration                                |
| MPI_LAND   | The logical AND for each iteration                            |
| MPI_LOR    | The logical OR for each iteration                             |
| MPI_BAND   | The bitwise AND for each iteration                            |
| MPI_BOR    | The bitwise OR for each iteration                             |

Example

```c

MPI_Reduce(&local_valyes, &values, 2, MPI_INT, MPI_SUM, root_Rank, MPI_COMM_WORLD);

```

MPI_Allreduce - It is quite obvious how this works, it just sends out distributes that final array

## MPI_Sendrecv

MPI_Sendrecv - This method functions as a combination of MPI_Send and MPI_Recv, both processes call the same line of code.

Sender parameters

| parameter    | description                                |
| ------------ | ------------------------------------------ |
| void\*       | What variable is the data you are sending? |
| int          | How many elements is the sent data?        |
| MPI_Datatype | What MPI_Datatype is the sent data?        |
| int          | Which process will receive the data?       |
| int          | What tag is used for the sent data?        |

Receiver parameters

| parameter    | description                                          |
| ------------ | ---------------------------------------------------- |
| void\*       | Where is the data you receive stored?                |
| int          | How many elements of data will you receive?          |
| MPI_Datatype | What datatype will that data be?                     |
| int          | What is the rank of the process sending the message? |
| int          | What tag is expected for the sent message?           |

Shared parameters

| parameter  | description                                     |
| ---------- | ----------------------------------------------- |
| MPI_Comm   | What communicator is this using?                |
| MPI_Status | What status is reported to the sending process? |

Example:

```c


MPI_Sendrecv(&result, 1, MPI_INT, 1, 0, &result, 1, MPI_INT, 0, 0, MPI_COMM_WORLD_ MPI_STATUS_IGNORE);

// equals

if(rank == 0){
    MPI_Send(&result, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
}else{
    MPI_Recv(&result, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
}

```

### MPI_Sendrecv_replace

MPI_Sendrecv_replace - This method uses a single send and receive variable. This is good for just passing a value between two processes

Example

```c

MPI_Sendrecv_replace(&result, 1, MPI_INT, 1, 0, 0, 0, MPI_COMM_WORLD_ MPI_STATUS_IGNORE);

```

## MPI Communicators

### MPI_Comm_split

| parameter | description                                                       |
| --------- | ----------------------------------------------------------------- |
| MPI_Comm  | What is the communicator you are splitting?                       |
| int       | What is the 'color' of your group? Which is the tag for the group |
| int       | What is the rank the process will get in the new communicator?    |
| MPI_Comm  | What is the new communicator?                                     |

Example

```c
#include<mpi.h>

int global_rank, sub_rank, local_key;
MPI_Comm sub_communicator;

if(global_rank % 2 == 0){
  color = 1;
  local_key = global_rank;
} else {
  color = 2;
  local_key = global_rank - (MPI_comm_size / 2);
}

MPI_Comm_split(MPI_COMM_WORLD, color, local_key, &sub_communicator);
MPI_Comm_rank(MPI_COMM_WORLD, global_rank);
MPI_Comm_rank(sub_communicator, sub_rank);

printf("My MPI_COMM_WORLD rank is %d, but in comm %d my rank is %d\n", global_rank, color, sub_rank);

```

### MPI_Comm_free

MPI_Comm_free - A method to remove a communicator from memory

```c

MPI_Comm_free(&sub_communicator);

```

### OpemMP and MPI

```c

#include <stdio.h>
#include <stdlib.h>
#include <mpi.h>

// There are file loading and calculation functions
int main(void){
  MPI_Init(NULL, NULL);
  int rank;
  int i = 0;
  int global_values[8];
  int local_values[2];
  int global_calculationed[8]; int local_calculationed[2];

  MPI_Comm_rank(MPI_COMM_WORLD, &rank);
  if(rank == 0){
    global_values = load_global_values("Filename.txt");
    printf("[Process %d] The global values are loaded.\n", rank);
  }

  MPI_Scatter(global_values, 8, MPI_INT, local_values, MPI_INT, 2, 0, MPI_COMM_WORLD);

  #pragma omp parallel for shared(local_values, local_calculationed) firstprivate(i)
    for(i = 0; i < 2; i++){
      local_calculationed[i] = calculation(local_values[i]);
      printf("[Process %d] %d results in %d\n", rank, local_values[i], local_calculationed[i]);
    }

  MPI_Gather(local_calculationed, 2, MPI_INT, global_calculationed, 2, MPI_INT, 0, MPI_COMM_WORLD);

  if(rank == 0){
    printf("[Process %d] Calculated values are ", rank);
    for (int i = 0; i < 8; i++)
      printf("%d ", global_calculationed[i]);
    printf("\n");
  }

  MPI_Finalize();

}

```

## MPI_Wtime

MPI_Wtime - This method returns the amount of time taken by the process that calls that function

```c

double start, end, time_taken;
double start = MPI_Wtime();

// Do something here

double end = MPI_Wtime();
time_taken = end - start;

printf("[Process %d] The time taken is %.2fs.\n", rank, time_taken);

```

## MPI_Probe

Stored locally

| parameter    | description                                     |
| ------------ | ----------------------------------------------- |
| void\*       | What variable is the data you are sending?      |
| int          | How many elements is the sent data?             |
| MPI_Datatype | What MPI_Datatype is the sent data?             |
| int          | Which process is sending the data?              |
| int          | What tag is used for the sent data?             |
| MPI_Comm     | What communicator is this using?                |
| MPI_Status   | What status is reported to the sending process? |
