# Docker Volumes

*Read this in other language: [English](volumes.md)

## Problem Statement

It is a very common requirement to persist the data in a Docker container beyond the lifetime of the container. 

在容器的生存期之外，将数据保留在 Docker 容器中是一个非常常见的要求。

However, the file system
of a Docker container is deleted/removed when the container dies.

但是，当容器死亡时，Docker 容器的文件系统将被删除/移除。

## Solution

There are 2 different ways how docker solves this problem.

docker 有 2 种不同的方法可以解决这个问题。

1. Volumes

    卷
2. Bind Directory on a host as a Mount

    将主机上的目录绑定为挂载

### Volumes

Volumes aims to solve the same problem by providing a way to store data on the host file system, separate from the container's file system, 

Volumes 通过提供一种在主机文件系统上存储数据的方法来解决相同的问题，与容器的文件系统分开，

so that the data can persist even if the container is deleted and recreated.

因此，即使删除并重新创建容器，数据也可以持久存在。

![image](https://user-images.githubusercontent.com/43399466/218018334-286d8949-d155-4d55-80bc-24827b02f9b1.png)


Volumes can be created and managed using the docker volume command. You can create a new volume using the following command:

可以使用 docker volume 命令创建和管理卷。您可以使用以下命令创建新卷：

```sh
docker volume create <volume_name>
```

Once a volume is created, you can mount it to a container using the -v or --mount option when running a docker run command. 

一旦创建了卷，您可以在运行 docker run 命令时使用 -v 或 --mount 选项将其挂载到容器。

For example:

```sh
docker run -it -v <volume_name>:/data <image_name> /bin/bash
```

This command will mount the volume <volume_name> to the /data directory in the container. Any data written to the /data directory
inside the container will be persisted in the volume on the host file system.

此命令将卷 <volume_name> 挂载到容器中的 /data 目录。在容器内部写入 /data 目录的任何数据都将持久存在于主机文件系统上。

### Bind Directory on a host as a Mount

Bind mounts also aims to solve the same problem but in a complete different way.

绑定挂载也旨在以完全不同的方式解决相同的问题。

Using this way, user can mount a directory from the host file system into a container. Bind mounts have the same behavior as volumes, but
are specified using a host path instead of a volume name. 

使用这种方式，用户可以将主机文件系统中的目录挂载到容器中。绑定挂载具有与卷相同的行为，但是使用主机路径而不是卷名称指定。

For example, 

```sh
docker run -it -v <host_path>:<container_path> <image_name> /bin/bash
```

## Key Differences between Volumes and Bind Directory on a host as a Mount

Volumes are managed, created, mounted and deleted using the Docker API. However, Volumes are more flexible than bind mounts, as 
they can be managed and backed up separately from the host file system, and can be moved between containers and hosts.

卷是使用 Docker API 管理、创建、挂载和删除的。然而，卷比绑定挂载更灵活，因为它们可以与主机文件系统分开管理和备份，并且可以在容器和主机之间移动。

In a nutshell, Bind Directory on a host as a Mount are appropriate for simple use cases where you need to mount a directory from the host file system into
a container, while volumes are better suited for more complex use cases where you need more control over the data being persisted
in the container.

简而言之，绑定主机上的目录作为挂载适用于简单的用例，您需要将主机文件系统中的目录挂载到容器中，而卷则更适用于更复杂的用例，您需要更多控制持久存在于容器中的数据。
