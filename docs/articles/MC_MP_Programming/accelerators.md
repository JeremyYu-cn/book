## What is an accelerator?

Accelerators - Any non-CPU piece of hardware that can carry out work

There are two major examples of this:

- Graphics Processing Unit (GPU) - A specialised processor designed to accelerate graphics processing
- Field Programmable Gate Array (FPGA) - A piece of silicone with programmable logic gates

### How do we use an accelerator?

Kernel - The name for a portion of code is sent to an accelerator
Offloading - The term for sending work intended for the CPU to an accelerator

## What frameworks will we cover?

### Types of framework

- OpenMP
- OpenCL
- OpenACC
- CUDA

Programmatic

- Uses specific function calls to give a high amount of control over the behaviour
- This is typically non-portable
- Prescriptive - User explicitly specifies actions to be taken by the compiler

Directive

- Uses compiler flags to describe how the parallelism should be done
- Portable
- Descriptive - User 'describes', guides, the compiler but the compiler itself makes the final decision
