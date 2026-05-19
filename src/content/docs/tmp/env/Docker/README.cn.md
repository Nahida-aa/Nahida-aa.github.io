---
title: 'Repo to learn Docker with examples. Contributions are most welcome.'
---

# Repo to learn Docker with examples. Contributions are most welcome.

# 通过示例学习 Docker 的 Repo。我们非常欢迎投稿

*Read this in other language: [English](README.md)

## If you found this repo useful, give it a STAR 🌠

## 如果您发现此 Repo 有用，请给它一个 STAR 🌠

You can watch the video version of this repo on my youtube playlist. -> https://www.youtube.com/watch?v=7JZP345yVjw&list=PLdpzxOOAlwvLjb0vTD9BXLOwwLD_GWCmC

您可以在我的 youtube 播放列表中观看此存储库的视频版本。 -> https://www.youtube.com/watch?v=7JZP345yVjw&list=PLdpzxOOAlwvLjb0vTD9BXLOwwLD_GWCmC

## What is a container ?

## 什么是容器？

A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another. A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

容器是软件的标准单元，用于打包代码及其所有依赖项，以便应用程序从一个计算环境快速可靠地运行到另一个计算环境。Docker 容器映像是一个轻量级、独立、可执行的软件包，其中包括运行应用程序所需的一切：代码、运行时、系统工具、系统库和设置。

Ok, let me make it easy !!!

好的，让我简单一点!!!

A container is a bundle of Application, Application libraries required to run your application and the minimum system dependencies.

容器是运行应用程序所需的应用程序、应用程序库和最小系统依赖项的捆绑包。

![Screenshot 2023-02-07 at 7 18 10 PM](https://user-images.githubusercontent.com/43399466/217262726-7cabcb5b-074d-45cc-950e-84f7119e7162.png)

## Containers vs Virtual Machine

## 容器与虚拟机

Containers and virtual machines are both technologies used to isolate applications and their dependencies, but they have some key differences:

容器和虚拟机都是用于隔离应用程序及其依赖项的技术，但它们有一些关键区别：

1. Resource Utilization: Containers share the host operating system kernel, making them lighter and faster than VMs. VMs have a full-fledged OS and hypervisor, making them more resource-intensive.

    资源利用：容器共享主机操作系统内核，使其比 VM 更轻量和更快。VM 有一个完整的操作系统和虚拟机监视程序，使其更占用资源。

2. Portability: Containers are designed to be portable and can run on any system with a compatible host operating system. VMs are less portable as they need a compatible hypervisor to run.

    可移植性：容器设计为可移植，可以在具有兼容主机操作系统的任何系统上运行。VM 的可移植性较差，因为它们需要兼容的虚拟机监视程序才能运行。

3. Security: VMs provide a higher level of security as each VM has its own operating system and can be isolated from the host and other VMs. Containers provide less isolation, as they share the host operating system.

    安全性：VM 提供更高级别的安全性，因为每个 VM 都有自己的操作系统，并且可以与主机和其他 VM 隔离。容器提供较少的隔离，因为它们共享主机操作系统。

4. Management: Managing containers is typically easier than managing VMs, as containers are designed to be lightweight and fast-moving.

    管理：管理容器通常比管理 VM 更容易，因为容器设计为轻量级且快速移动。

## Why are containers light weight ?

## 为什么容器是轻量级的？

Containers are lightweight because they use a technology called containerization, which allows them to share the host operating system's kernel and libraries, while still providing isolation for the application and its dependencies. This results in a smaller footprint compared to traditional virtual machines, as the containers do not need to include a full operating system. Additionally, Docker containers are designed to be minimal, only including what is necessary for the application to run, further reducing their size.

容器是轻量级的，因为它们使用一种称为容器化的技术，允许它们共享主机操作系统的内核和库，同时为应用程序及其依赖项提供隔离。与传统虚拟机相比，这导致了更小的占用空间，因为容器不需要包含完整的操作系统。此外，Docker 容器被设计为最小化，只包括应用程序运行所需的内容，进一步减小了它们的大小。

Let's try to understand this with an example:

让我们通过一个例子来理解这个问题：

Below is the screenshot of official ubuntu base image which you can use for your container. It's just ~ 22 MB, isn't it very small ? on a contrary if you look at official ubuntu VM image it will be close to ~ 2.3 GB. So the container base image is almost 100 times less than VM image.

下面是官方 ubuntu 基础映像的截图，您可以将其用于容器。它只有 ~ 22 MB，是不是非常小？相反，如果您查看官方 ubuntu VM 映像，它将接近 ~ 2.3 GB。因此，容器基础映像几乎比 VM 映像小 100 倍。

![Screenshot 2023-02-08 at 3 12 38 PM](https://user-images.githubusercontent.com/43399466/217493284-85411ae0-b283-4475-9729-6b082e35fc7d.png)

To provide a better picture of files and folders that containers base images have and files and folders that containers use from host operating system (not 100 percent accurate -> varies from base image to base image). Refer below.

为了更好地了解容器基础映像中的文件和文件夹以及容器从主机操作系统使用的文件和文件夹（不是 100% 准确的 -> 根据基础映像的不同而有所不同）。请参考以下内容。

### Files and Folders in containers base images

### 容器基础映像中的文件和文件夹

```sh
/bin: contains binary executable files, such as the ls, cp, and ps commands.

包含二进制可执行文件的 /bin，例如 ls、cp 和 ps 命令。

/sbin: contains system binary executable files, such as the init and shutdown commands.

包含系统二进制可执行文件的 /sbin，例如 init 和 shutdown 命令。

/etc: contains configuration files for various system services.

包含各种系统服务的配置文件的 /etc。

/lib: contains library files that are used by the binary executables.

包含二进制可执行文件使用的库文件的 /lib。

/usr: contains user-related files and utilities, such as applications, libraries, and documentation.

包含用户相关文件和实用程序的 /usr，例如应用程序、库和文档。

/var: contains variable data, such as log files, spool files, and temporary files.

包含变量数据的 /var，例如日志文件、 spool 文件和临时文件。

/root: is the home directory of the root user.

/root 是 root 用户的主目录。
```

### Files and Folders that containers use from host operating system

### 容器从主机操作系统使用的文件和文件夹

```c
The host's file system: Docker containers can access the host file system using bind mounts, which allow the container to read and write files in the host file system.

主机的文件系统：Docker 容器可以使用绑定挂载访问主机文件系统，这允许容器在主机文件系统中读写文件。

Networking stack: The host's networking stack is used to provide network connectivity to the container. Docker containers can be connected to the host's network directly or through a virtual network.

网络堆栈：主机的网络堆栈用于为容器提供网络连接。Docker 容器可以直接连接到主机的网络或通过虚拟网络连接。

System calls: The host's kernel handles system calls from the container, which is how the container accesses the host's resources, such as CPU, memory, and I/O.

系统调用：主机的内核处理容器的系统调用，这是容器访问主机资源（如 CPU、内存和 I/O）的方式。

Namespaces: Docker containers use Linux namespaces to create isolated environments for the container's processes. Namespaces provide isolation for resources such as the file system, process ID, and network.

命名空间：Docker 容器使用 Linux 命名空间为容器的进程创建隔离的环境。命名空间为文件系统、进程 ID 和网络等资源提供隔离。

Control groups (cgroups): Docker containers use cgroups to limit and control the amount of resources, such as CPU, memory, and I/O, that a container can access.

控制组（cgroups）：Docker 容器使用 cgroups 限制和控制容器可以访问的资源量，如 CPU、内存和 I/O。
```

It's important to note that while a container uses resources from the host operating system, it is still isolated from the host and other containers, so changes to the container do not affect the host or other containers.

需要注意的是，虽然容器使用主机操作系统的资源，但它仍然与主机和其他容器隔离，因此对容器的更改不会影响主机或其他容器。

**Note:** There are multiple ways to reduce your VM image size as well, but I am just talking about the default for easy comparision and understanding.

**注意：** 也有多种方法可以减小 VM 映像的大小，但我只是谈论默认值，以便更容易比较和理解。

so, in a nutshell, container base images are typically smaller compared to VM images because they are designed to be minimalist and only contain the necessary components for running a specific application or service. VMs, on the other hand, emulate an entire operating system, including all its libraries, utilities, and system files, resulting in a much larger size. 

因此，简而言之，与 VM 映像相比，容器基础映像通常更小，因为它们被设计为最小化，并且只包含运行特定应用程序或服务所需的组件。另一方面，VM 模拟整个操作系统，包括所有库、实用程序和系统文件，导致其大小更大。

I hope it is now very clear why containers are light weight in nature.

我希望现在非常清楚为什么容器是轻量级的。

## Docker

### What is Docker ?

Docker is a containerization platform that provides easy way to containerize your applications, which means, using Docker you can build container images, run the images to create containers and also push these containers to container regestries such as DockerHub, Quay.io and so on.

Docker 是一个容器化平台，提供了一种容器化应用程序的简单方法，这意味着使用 Docker，您可以构建容器images，运行images以创建容器，并将这些容器推送到容器注册表，如 DockerHub、Quay.io 等。

In simple words, you can understand as `containerization is a concept or technology` and `Docker Implements Containerization`.

简单来说，您可以将其理解为 `容器化是一个概念或技术`，`Docker 实现了容器化`。

### Docker Architecture ?

### Docker 架构？

![image](https://user-images.githubusercontent.com/43399466/217507877-212d3a60-143a-4a1d-ab79-4bb615cb4622.png)

The above picture, clearly indicates that Docker Deamon is brain of Docker. If Docker Deamon is killed, stops working for some reasons, Docker is brain dead :p (sarcasm intended).

上图清楚地表明 Docker Deamon 是 Docker 的大脑。如果 Docker Deamon 被杀死，由于某些原因停止工作，Docker 就会脑死亡 :p（讽刺意味）。

### Docker LifeCycle

### Docker 生命周期

We can use the above Image as reference to understand the lifecycle of Docker.

我们可以使用上面的图像作为参考来理解 Docker 的生命周期。

There are three important things,

有三件重要的事情，

1. docker build -> builds docker images from Dockerfile

   docker build -> 从 Dockerfile 构建 docker 映像
2. docker run   -> runs container from docker images

    docker run   -> 从 docker 映像运行容器
3. docker push  -> push the container image to public/private regestries to share the docker images.

    docker push  -> 将容器映像推送到公共/私有注册表以共享 docker 映像。

![Screenshot 2023-02-08 at 4 32 13 PM](https://user-images.githubusercontent.com/43399466/217511949-81f897b2-70ee-41d1-b229-38d0572c54c7.png)

### Understanding the terminology (Inspired from Docker Docs)

### 理解术语（灵感来自 Docker 文档）

#### Docker daemon

The Docker daemon (dockerd) listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes. A daemon can also communicate with other daemons to manage Docker services.

Docker 守护程序（dockerd）侦听 Docker API 请求，并管理 Docker 对象，如映像、容器、网络和卷。守护程序还可以与其他守护程序通信，以管理 Docker 服务。

#### Docker client

The Docker client (docker) is the primary way that many Docker users interact with Docker. When you use commands such as docker run, the client sends these commands to dockerd, which carries them out. The docker command uses the Docker API. The Docker client can communicate with more than one daemon.

Docker 客户端（docker）是许多 Docker 用户与 Docker 交互的主要方式。当您使用 docker run 等命令时，客户端将这些命令发送到 dockerd，dockerd 将执行这些命令。docker 命令使用 Docker API。Docker 客户端可以与多个守护程序通信。

#### Docker Desktop

Docker Desktop is an easy-to-install application for your Mac, Windows or Linux environment that enables you to build and share containerized applications and microservices. Docker Desktop includes the Docker daemon (dockerd), the Docker client (docker), Docker Compose, Docker Content Trust, Kubernetes, and Credential Helper. For more information, see Docker Desktop.

Docker Desktop 是一个易于安装的应用程序，适用于您的 Mac、Windows 或 Linux 环境，使您能够构建和共享容器化应用程序和微服务。Docker Desktop 包括 Docker 守护程序（dockerd）、Docker 客户端（docker）、Docker Compose、Docker Content Trust、Kubernetes 和凭据助手。有关更多信息，请参见 Docker Desktop。

#### Docker registries

A Docker registry stores Docker images. Docker Hub is a public registry that anyone can use, and Docker is configured to look for images on Docker Hub by default. You can even run your own private registry.

Docker 注册表存储 Docker 映像。Docker Hub 是一个任何人都可以使用的公共注册表，Docker 默认配置为在 Docker Hub 上查找映像。您甚至可以运行自己的私有注册表。

When you use the docker pull or docker run commands, the required images are pulled from your configured registry. When you use the docker push command, your image is pushed to your configured registry.
Docker objects

使用 docker pull 或 docker run 命令时，将从您配置的注册表中拉取所需的映像。使用 docker push 命令时，将映像推送到您配置的注册表。

When you use Docker, you are creating and using images, containers, networks, volumes, plugins, and other objects. This section is a brief overview of some of those objects.

使用 Docker 时，您正在创建和使用映像、容器、网络、卷、插件和其他对象。本节是对其中一些对象的简要概述。

#### Dockerfile

Dockerfile is a file where you provide the steps to build your Docker Image.

Dockerfile 是一个文件，您可以在其中提供构建 Docker 映像的步骤。

#### Images

An image is a read-only template with instructions for creating a Docker container. Often, an image is based on another image, with some additional customization. For example, you may build an image which is based on the ubuntu image, but installs the Apache web server and your application, as well as the configuration details needed to make your application run.

映像是一个只读模板，其中包含创建 Docker 容器的说明。通常，映像基于另一个映像，并进行一些额外的定制。例如，您可以构建一个基于 ubuntu 映像的映像，但安装了 Apache Web 服务器和您的应用程序，以及运行应用程序所需的配置详细信息。

You might create your own images or you might only use those created by others and published in a registry. To build your own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

您可能会创建自己的映像，也可能只使用其他人创建并发布在注册表中的映像。要构建自己的映像，您需要创建一个 Dockerfile，其中包含定义创建映像和运行映像所需步骤的简单语法。Dockerfile 中的每个指令都会在映像中创建一个层。当您更改 Dockerfile 并重新构建映像时，只会重新构建那些已更改的层。与其他虚拟化技术相比，这是使映像如此轻量、小巧和快速的部分原因。

## INSTALL DOCKER

A very detailed instructions to install Docker are provide in the below link

提供了非常详细的安装 Docker 指南

https://docs.docker.com/get-docker/

For Demo,

演示

You can create an Ubuntu EC2 Instance on AWS and run the below commands to install docker.

您可以在 AWS 上创建一个 Ubuntu EC2 实例，并运行以下命令来安装 docker。

```sh
sudo apt update
sudo apt install docker.io -y
```

### Start Docker and Grant Access

### 启动 Docker 并授予访问权限

A very common mistake that many beginners do is, After they install docker using the sudo access, they miss the step to Start the Docker daemon and grant acess to the user they want to use to interact with docker and run docker commands.

许多初学者经常犯的一个常见错误是，在使用 sudo 访问安装 docker 后，他们忽略了启动 Docker 守护程序并授予他们想要与 docker 交互并运行 docker 命令的用户访问权限的步骤。

Always ensure the docker daemon is up and running.

始终确保 Docker 守护程序正在运行。

A easy way to verify your Docker installation is by running the below command

验证 Docker 安装的简单方法是运行以下命令

```sh
docker run hello-world
```

If the output says:

如果输出为：

```sh
docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/create": dial unix /var/run/docker.sock: connect: permission denied.
See 'docker run --help'.
```

This can mean two things,

这可能意味着两件事，

1. Docker deamon is not running.
2. Your user does not have access to run docker commands.

### Start Docker daemon

You use the below command to verify if the docker daemon is actually started and Active

您可以使用以下命令验证 Docker 守护程序是否实际启动并处于活动状态

```sh
sudo systemctl status docker
```

If you notice that the docker daemon is not running, you can start the daemon using the below command

如果您注意到 docker 守护程序没有运行，您可以使用以下命令启动守护程序

```sh
sudo systemctl start docker
```

### Grant Access to your user to run docker commands

### 授予您的用户运行 docker 命令的访问权限

To grant access to your user to run the docker command, you should add the user to the Docker Linux group. Docker group is create by default when docker is installed.

要授予您的用户运行 docker 命令的访问权限，您应该将用户添加到 Docker Linux 组。Docker 组在安装 docker 时默认创建。

```sh
sudo usermod -aG docker youer_username
```

In the above command `youer_username` is the name of the user, you can change the username appropriately.

在上面的命令中，`youer_username` 是用户名，您可以适当更改用户名。

**NOTE:** : You need to logout and login back for the changes to be reflected.

**注意：** 您需要注销并重新登录以反映更改。

### Docker is Installed, up and running 🥳🥳

Use the same command again, to verify that docker is up and running.

再次使用相同的命令，验证 docker 是否正在运行。

```sh
docker run hello-world
```

Output should look like:

```sh
....
....
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
...
```

## Great Job, Now start with the examples folder to write your first Dockerfile and move to the next examples. Happy Learning :)

## 做得好，现在从 examples 文件夹开始编写您的第一个 Dockerfile，并继续下一个示例。祝您学习愉快 :)

### Clone this repository and move to example folder

```sh
git clone https://github.com/iam-veeramalla/Docker-Zero-to-Hero
cd  examples
```

### Login to Docker [Create an account with https://hub.docker.com/]

```sh
docker login
```

```
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one
使用你的 Docker ID 登录，可以从 Docker Hub 推送和拉取图像。如果你没有 Docker ID，去 https://hub.Docker.com 创建一个。

Username: abhishekf5
Password:
WARNING! Your password will be stored unencrypted in /home/ubuntu/.docker/config.json.
警告! 您的密码将未加密地存储在/home/ubuntu/. docker/config.json 中。

Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store
配置凭据帮助器以删除此警告。请参见

Https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

### Build your first Docker Image

### 构建您的第一个 Docker 映像

```sh
mkdir first-docker-file
cd first-docker-file
touch Dockerfile
touch app.py
echo "print('Hello World')" > app.py
```

```Dockerfile
FROM ubuntu:latest

# Set the working directory in the image
WORKDIR /app

# Copy the files from the host file system to the image file system
COPY . /app

# Install the necessary packages
RUN apt-get update && apt-get install -y python3 python3-pip

# Set environment variables
ENV NAME World

# Run a command to start the application
CMD ["python3", "app.py"]
```

You need to change the username accoringly in the below command

您需要在以下命令中相应地更改用户名

```sh
# -t is used to tag the image
# . is used to specify the current directory
docker build -t nahidaaa/my-first-docker-image:latest .
# if不在当前目录中，可以使用以下命令
# -f is used to specify the Dockerfile path
docker build -t nahidaaa/my-first-docker-image:latest -f /path/to/Dockerfile ./first-docker-file
```

Output of the above command

```
    Sending build context to Docker daemon  992.8kB
    Step 1/6 : FROM ubuntu:latest
    latest: Pulling from library/ubuntu
    677076032cca: Pull complete
    Digest: sha256:9a0bdde4188b896a372804be2384015e90e3f84906b750c1a53539b585fbbe7f
    Status: Downloaded newer image for ubuntu:latest
     ---> 58db3edaf2be
    Step 2/6 : WORKDIR /app
     ---> Running in 630f5e4db7d3
    Removing intermediate container 630f5e4db7d3
     ---> 6b1d9f654263
    Step 3/6 : COPY . /app
     ---> 984edffabc23
    Step 4/6 : RUN apt-get update && apt-get install -y python3 python3-pip
     ---> Running in a558acdc9b03
    Step 5/6 : ENV NAME World
     ---> Running in 733207001f2e
    Removing intermediate container 733207001f2e
     ---> 94128cf6be21
    Step 6/6 : CMD ["python3", "app.py"]
     ---> Running in 5d60ad3a59ff
    Removing intermediate container 5d60ad3a59ff
     ---> 960d37536dcd
    Successfully built 960d37536dcd
    Successfully tagged abhishekf5/my-first-docker-image:latest
```

### Verify Docker Image is created

```sh
docker images
```

Output 

```
REPOSITORY                         TAG       IMAGE ID       CREATED          SIZE
abhishekf5/my-first-docker-image   latest    960d37536dcd   26 seconds ago   467MB
ubuntu                             latest    58db3edaf2be   13 days ago      77.8MB
hello-world                        latest    feb5d9fea6a5   16 months ago    13.3kB
```

### Run your First Docker Container

```sh
docker run -it nahidaaa/my-first-docker-image
```

Output

```
Hello World
```

### Push the Image to DockerHub and share it with the world

```sh
docker push nahidaaa/my-first-docker-image
```

Output

```
Using default tag: latest
The push refers to repository [docker.io/abhishekf5/my-first-docker-image]
896818320e80: Pushed
b8088c305a52: Pushed
69dd4ccec1a0: Pushed
c5ff2d88f679: Mounted from library/ubuntu
latest: digest: sha256:6e49841ad9e720a7baedcd41f9b666fcd7b583151d0763fe78101bb8221b1d88 size: 1157
```

### You must be feeling like a champ already 
