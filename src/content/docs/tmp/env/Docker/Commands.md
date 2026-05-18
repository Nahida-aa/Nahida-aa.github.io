# Docker Commands

Some of the most commonly used docker commands are

一些最常用的 docker 命令是

## commonly

### other to image (pull, build)

```sh
# Downloads an image from the configured registry.
docker pull <image_name>
# Builds image from Dockerfile.
docker build -t <image_name> -f <Dockerfile_path> .
```

### image to other (push, save, load, None)

```sh
# Pushes an image to the configured registry.
docker push <image_name>
# Saves an image to a tar file.
docker save -o <tar_file_path> <image_name>
# Loads an image from a tar file.
docker load -i <tar_file_path>
# Removes an image from the host machine.
docker rmi <image_name>
```

### image to container (run(create and start))

**[volumes](volumes.md)**

```sh
# Create a new container from an image with volume mapping.
docker run -v <host_path>:<container_path> <image_name>
```

```sh
# Create a new container from an image.(create and start)
docker run <image_name>
# Create a new container from an image with a name.
docker run --name <container_name> <image_name>
# Create a new container from an image and run in background.
docker run -d <image_name>
# Create a new container from an image with port mapping.
# 访问host_prot时就会访问container_port
docker run -p <host_port>:<container_port> <image_name>
# Create a new container from an image with interactive mode.
docker run -it <image_name> /bin/bash
# Create a new container from an image with interactive mode and run in background.
docker run -dit <image_name> /bin/bash
# Create a new container from an image with environment variables.
docker run -e <key>=<value> <image_name>
# Create a new container from an image with memory limit.
docker run -m <memory_limit> <image_name>
```

当`exit`退出容器时，容器也会停止。

use `docker run --help` to look into more arguments.

```sh
常⽤可选参数说明：
* -i 表示以《交互模式》运⾏容器。
* -t 表示容器启动后会进⼊其命令⾏。加⼊这两个参数后，容器创建就能登录进去。即分配⼀个伪终端。
* --name 为创建的容器命名。
* -v 表示⽬录映射关系，即宿主机⽬录:容器中⽬录。注意:最好做⽬录映射，在宿主机上做修改，然后共享到容器上。
* -d 会创建⼀个守护式容器在后台运⾏(这样创建容器后不会⾃动登录容器)。
* -p 表示端⼝映射，即宿主机端⼝:容器中端⼝。
* --network=host 表示将主机的⽹络环境映射到容器中，使容器的⽹络与主机相同。
```

### container

```sh
# Lists all containers on the host machine.
docker ps -a
# Lists running containers on the host machine.
docker ps
# Stops running container.
docker stop <container_id>
# Stops all running containers.
docker stop $(docker ps -a -q)
# kill a running container.
docker kill <container_id>
# Starts a stopped container.
docker start <container_id>
# Removes a stopped container.
docker rm <container_id>
```

### exec in container

```sh
# Run a command in a running container.
docker exec <container_id> <command>
# Run a command in a running container in interactive mode.
docker exec -it <container_id> /bin/bash
```

### container to image (commit)

```sh
# Create a new image from a container.
docker commit <container_id> <image_name>
```

请注意，`docker commit` 命令只会保存容器的文件系统的当前状态，它不会保存任何关于容器的元数据（如环境变量，暴露的端口，卷等）。如果你想保存这些信息，你应该使用 `Dockerfile` 和 `docker build` 命令来创建你的镜像。

### docker network

Manage Docker networks such as creating and removing networks, and connecting containers to networks.

管理 Docker 网络，例如创建和删除网络，以及将容器连接到网络。

---

```sh
docker version
docker info
docker --help
docker [command] --help
docker login
docker logout
```

## image

```sh
# Lists docker images on the host machine.
docker images
docker image ls

# Searches for an image on the configured registry.
docker search [image]
# # eg.
docker search ubuntu

# 
docker pull [image]

# 
docker push [image]
# # eg.
docker push Nahida-aa/hello-docker:latest

# 
docker save [image] -o FILE
docker save [image] > FILE
# # eg.
docker save Nahida-aa/hello-docker:latest > hello-docker.tar

docker load -i FILE
# # eg.
docker load -i hello-docker.tar

docker history [image]

docker rmi [image]
docker image rm [image]

# prune (删除不再使用的 image ?)
docker image prune

# import (从 tar 文件导入 image)
docker import [url] \ [file]

# 从容器创建 image ?
docker commit [container] [image]
```

## container

```sh
# create a container from an image (only create)
docker create [image]

# run and create a container from an image (create and start)
docker run [image]

# 
docker start [container]
docker stop [container]
docker restart [container]

# list running containers
docker ps
# list all containers
docker ps -a
# list running containers
docker container ls
# list all containers
docker container ls -a

# exec in container
docker exec [container] [command]
# 执行一个命令并进入交互模式
docker exec -it [container] [command]
# # eg.
docker exec -it 1a2b3c4d5e6f bash
# 以 root 用户身份进入容器
docker attach [container]

# export container to tar file
docker export [container] -o FILE
docker export [container] > FILE

# import container from tar file (导入容器快照)
docker import [file]

docker logs [container]

docker rm [container]
docker container rm [container]

# view container port mapping
docker port [container]
# view container process
docker top [container]
# view container stats (cpu, memory, network)
docker stats [container]

# copy file to container
docker cp [file] [container]:[path]

# view container 的变化?
docker diff [container]
```

## container run

```sh
# create and start a container from an image
docker run [options] [image] [command] [args]
docker run --name [name] [image]
# -d: run in background
docker run -d [image]
# -p: port mapping
docker run -p [host_port]:[container_port] [image]
# random mapping port
docker run -p [image]
# -e : environment variables
docker run -e [key=value] [image]
# -w : working directory
docker run -w [path] [image]
# [command] [args] : run command in container
docker run [image] [command] [args]
# -it : interactive mode (交互模式)
docker run -it [image] [command] [args]
# -v : volume mapping
docker run -v [host_path]:[container_path] [image]
```

## network

```sh
# list networks
docker network ls
# inspect network
docker network inspect [network]
# create network
docker network create [network]
# remove network
docker network rm [network]
# connect container to network
docker network connect [network] [container]
# disconnect container from network
docker network disconnect [network] [container]
```

## volume

```sh
# list volumes
docker volume ls
# inspect volume
docker volume inspect [volume]
# create volume
docker volume create [volume]
# remove volume
docker volume rm [volume]
# prune volumes
docker volume prune
```

## plugin

```sh
# list plugins  
docker plugin ls
# install plugin
docker plugin install [plugin]
# enable plugin
docker plugin enable [plugin]
# disable plugin
docker plugin disable [plugin]
# remove plugin
docker plugin rm [plugin]
```
