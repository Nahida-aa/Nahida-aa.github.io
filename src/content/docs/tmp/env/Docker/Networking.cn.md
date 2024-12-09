# Docker Networking

Networking allows containers to communicate with each other and with the host system. Containers run isolated from the host system
and need a way to communicate with each other and with the host system.

网络允许容器相互通信以及与主机系统通信。容器与主机系统隔离运行，需要一种相互通信以及与主机系统通信的方法。

## Docker Networking Concepts

By default, Docker provides two network drivers for you, the bridge and the overlay drivers.

默认情况下，Docker 为您提供了两种网络驱动程序，即 bridge 和 overlay 驱动程序。

```sh
docker network ls
```

```sh
NETWORK ID          NAME                DRIVER          SCOPE
xxxxxxxxxxxx        none                null            local
xxxxxxxxxxxx        host                host            local
xxxxxxxxxxxx        bridge              bridge          local
```

- bridge：这是默认的网络驱动。如果你不指定一个网络，Docker守护进程将默认使用桥接网络。所有容器都会自动连接到这个网络，除非你指定了其他网络。

- none：这个网络驱动对容器的网络堆栈不做任何配置。通常，这个网络驱动用于你想要管理容器的网络堆栈的情况。

- host：这个网络驱动会移除容器和Docker主机之间的网络隔离，并直接使用主机的网络。注意，这种模式下，端口映射就没有意义了，因为容器使用的是主机的网络。

### Bridge Networking

The default network mode in Docker.

Docker 中的默认网络模式。

It creates a private network between the host and containers, allowing containers to communicate with each other and with the host system.

它在主机和容器之间创建一个专用网络，允许容器相互通信以及与主机系统通信

![image](https://user-images.githubusercontent.com/43399466/217745543-f40e5614-ac34-4b78-85a9-91b24512388d.png)

If you want to secure your containers and isolate them from the default bridge network you can also create your own bridge network.

如果要保护容器并将其与默认网桥网络隔离，还可以创建自己的网桥网络。

```sh
docker network create -d bridge my_bridge
```

Now, if you list the docker networks, you will see a new network.

```sh
docker network ls

NETWORK ID          NAME                DRIVER
xxxxxxxxxxxx        bridge              bridge
xxxxxxxxxxxx        my_bridge           bridge
xxxxxxxxxxxx        none                null
xxxxxxxxxxxx        host                host
```

This new network can be attached to the containers, when you run these containers.

当您运行这些容器时，可以将此新网络附加到容器。

```sh
docker run -d --net=my_bridge --name db training/postgres
```

This way, you can run multiple containers on a single host platform where one container is attached to the default network and the other is attached to the my_bridge network.

这样，您可以在单个主机平台上运行多个容器，其中一个容器连接到默认网络，另一个连接到 my_bridge 网络。

These containers are completely isolated with their private networks and cannot talk to each other.

这些容器完全隔离，具有私有网络，无法相互通信。

![image](https://user-images.githubusercontent.com/43399466/217748680-8beefd0a-8181-4752-a098-a905ebed5d2a.png)

However, you can at any point of time, attach the first container to my_bridge network and enable communication

但是，您可以随时将第一个容器连接到 my_bridge 网络并启用通信

```sh
docker network connect my_bridge web
```

![image](https://user-images.githubusercontent.com/43399466/217748726-7bb347d0-3736-4f89-bdff-31d240b15150.png)

### Host Networking

This mode allows containers to share the host system's network stack, providing direct access to the host system's network.

这种模式允许容器共享主机系统的网络堆栈，从而直接访问主机系统的网络。

To attach a host network to a Docker container, you can use the --network="host" option when running a docker run command. When you use this option, the container has access to the host's network stack, and shares the host's network namespace. This means that the container will use the same IP address and network configuration as the host.

要将主机网络连接到 Docker 容器，可以在运行 docker run 命令时使用 --network="host" 选项。使用此选项时，容器可以访问主机的网络堆栈，并共享主机的网络命名空间。这意味着容器将使用与主机相同的 IP 地址和网络配置。

Here's an example of how to run a Docker container with the host network:

以下是如何使用主机网络运行 Docker 容器的示例：

```sh
docker run --network="host" <image_name> <command>
```

Keep in mind that when you use the host network, the container is less isolated from the host system, and has access to all of the host's network resources. This can be a security risk, so use the host network with caution.

请记住，当您使用主机网络时，容器与主机系统的隔离程度较低，并且可以访问主机的所有网络资源。这可能会带来安全风险，因此请谨慎使用主机网络。

Additionally, not all Docker image and command combinations are compatible with the host network, so it's important to check the image documentation or run the image with the --network="bridge" option (the default network mode) first to see if there are any compatibility issues.

此外，并非所有 Docker 镜像和命令组合都与主机网络兼容，因此重要的是首先检查镜像文档或使用 --network="bridge" 选项（默认网络模式）运行镜像，以查看是否存在任何兼容性问题。

### Overlay Networking

This mode enables communication between containers across multiple Docker host machines, allowing containers to be connected to a single network even when they are running on different hosts.

这种模式允许跨多个 Docker 主机机器的容器之间进行通信，即使这些容器在不同的主机上运行，也可以将它们连接到单个网络。

### Macvlan Networking

This mode allows a container to appear on the network as a physical host rather than as a container.

这种模式允许容器以物理主机而不是容器的形式出现在网络上。

## Docker Networking Commands

### Create a Network

To create a new network, you can use the following command:

要创建一个新网络，可以使用以下命令：

```sh
docker network create -d <driver=bridge> --subnet <subnet> --gateway <gateway> <network_name>
```

- bridge: 默认的网络驱动。如果你不指定一个驱动，那么这就是你会得到的网络驱动。桥接网络在单个主机上进行网络通信，但是不适合跨主机通信或者大规模应用。

- host: 对于不需要任何网络隔离的容器，或者需要使用主机网络的容器，可以使用host网络。

- overlay: 创建一个跨多个Docker宿主机的网络，通常在Swarm模式下使用。

- macvlan: Macvlan网络允许你将容器插入到主机的网络，容器可以获取真实的IP地址。

- none: 对于不需要或者可以自行配置网络的容器，可以使用none网络。

- network plugin: 你也可以使用Docker网络插件，如Weave，Calico等
