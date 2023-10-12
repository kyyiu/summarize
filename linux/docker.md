# 理解
相当于在系统中划分一块区域执行的程序
相较于虚拟机轻量
一个镜像类似于一份源代码
一个容器类似于一个文件夹
docker就是把这份源代码在不同的文件夹中运行，并暴露访问入口

# windows安装wsl
wsl --install
按提示进行即可
结束后wsl -l -v查看是否安装成功

# 安装
省略
docker version查看是否安装成功

# 运行Docker测试
创建文件夹 hello-docker,创建index.html文件，随便写点儿什么
再创建Dockerfile文件，复制以内容：
```
 # 基于哪个镜像
FROM nginx
 # 将宿主机中的./index.html文件复制进容器里的/html/index.html
COPY ./index.html html/index.html
 # 容器对外暴露80端口
EXPOSE 80
```
然后打包镜像：
```
cd hello-docker/ // 进入刚刚的目录 以管理员身份打开PowerShell
docker image build ./ -t hello-docker:1.0.0 // 打包镜像 基于路径./（当前路径）打包一个镜像，镜像的名字是hello-docker，版本号是1.0.0。该命令会自动寻找Dockerfile来打包出一个镜像
```
查看本机已有镜像
```
docker images
docker images ls
```
删除本机已有的镜像：
```
docker rmi [imageId] // 可删除
```
运行容器：
```
docker container create -p 5000:80 hello-docker:1.0.0 // 根据镜像创建一个容器并返回容器id 端口是本机暴露5000端口
docker container start xxx // xxx 为上一条命令运行得到的结果 ## 启动一个创建好的容器
```
查看容器：
```
docker container ls//查看正在运行的容器
docker ps //查看正在运行的容器
docker ps -a // 查看所有的容器，包括停止运行的容器
```
最后访问http://localhost:5000/就可以查看到nginx的欢迎界面了