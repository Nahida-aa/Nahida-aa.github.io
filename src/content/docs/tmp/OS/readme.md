# Operating System

MIT 6.828/6.S081 Operating System Engineering -- xv6-c

Introduction and Examples

OS Organization and System Calls

Page Tables

RISC-V Calling Convention and Stack Frames

Isolation & System Call Entry_Exit

Page Faults

Interrupts

Multiprocessors and Locks

Thread Switching

Sleep & Wakeup

File System

Crash Recovery

File System Performance and Fast Crash Recovery

Virtual Memory for Applications

OS Organization

Virtual Machines

Kernels and High-Level Languages(HLL)

Networking

Meltdown

RCU

- 探索操作系统的基本概念，包括进程管理、内存管理、文件系统、输入/输出系统等。
- 理解操作系统如何提供用户与硬件之间的接口。
- 学习并发、同步、死锁等概念及其管理策略

1. 操作系统概述：

    - 操作系统的定义、功能和目标。
    - 操作系统的历史发展概况。
    - 操作系统的类型（批处理系统、分时系统、实时系统等）。
2. 进程管理：

    - 进程和线程的概念、状态以及转换。
    - 进程调度算法（如先来先服务、短作业优先、轮转调度等）。
    - 进程同步和互斥，死锁的概念、条件、预防和解决策略。
    - 并发控制和多线程编程。
3. 内存管理：

    - 内存分配和回收。
    - 虚拟内存、分页和分段管理技术。
    - 页面置换算法（如最佳置换算法、最近最少使用算法等）。
4. [文件系统](./Notes/file_system/README.md)：

    - 文件的定义、属性和操作。
    - 文件存储空间的管理。
    - 目录结构和文件系统的实现。
    - 文件系统的安全性和保护。
5. 输入/输出系统：

    - I/O硬件和软件的基本概念。
    - I/O缓冲区管理。
    - 设备驱动程序和中断处理。
6. 存储管理：

    - 磁盘管理和调度算法。
    - RAID技术。
    - 备份和恢复。
7. 安全与保护：

    - 操作系统的安全问题。
    - 访问控制、用户认证和安全策略。
    - 病毒和恶意软件的防护。
8. 分布式系统和云计算（选学）：

    - 分布式操作系统的基本概念。
    - 云计算的基础知识。
    - 虚拟化技术。
9. 操作系统实验：

    - 操作系统设计和实现的实践，如进程调度、内存管理、文件系统的模拟实现等。
    - 使用操作系统提供的编程接口（如POSIX API）进行系统编程。
