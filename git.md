# <center> Git </center>
---     
###  git 命令
```git
git [--version] [--help] [-C <path>] [-c <name>=<value>]
    [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
    [-p|--paginate|-P|--no-pager] [--no-replace-objects] [--bare]
    [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
    [--super-prefix=<path>]
    <command> [<args>]
```


### git --version
---   
打印git版本   

### git --help [-a or --all]
---  
打印概要和最常用命令的列表,添加后续选项可以打印全部命令列表   

### git --exec-path[=&lt;path&gt;] 
---   
安装核心Git程序的路径。这也可以通过设置GIT_EXEC_PATH环境变量来控制。如果没有给出路径， git 将打印当前设置然后退出