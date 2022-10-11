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


# .gitignore     
---     
.gitignore 的格式规范如下：

所有空行或者以 # 开头的行都会被 Git 忽略。

可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。

匹配模式可以以（/）开头防止递归。

匹配模式可以以（/）结尾指定目录。

要忽略指定模式以外的文件或目录，可以在模式前加上叹号（!）取反。

``` 
# 忽略所有和name同名的文件夹和文件
name

# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf

```     

# git add     
---     
git add 命令。 这是个多功能命令：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等。 将这个命令理解为“精确地将内容添加到下一次提交中”而不是“将一个文件添加到项目中”要更加合适.     


## git commit -a -m 'xxx'    
直接提交，跳过add步骤    

## git commit --amend     
对上一次commit的备注修改或者覆盖当前修改了的文件到上一次commit的同一个文件        


# 遇到冲突时的分支合并       
---       
git status 查看哪些文件需要解决冲突
解决后跳过git add命令标记已解决后commit        


# 跟踪分支      
---      
git checkout -b <branch> <remote>/<branch>
这个命令会新建branch跟踪 <remote>/<branch>上的分支
git checkout --track origin/serverfix
这个命令会让当前分支跟踪origin/serverfix

拉取时就会从<remote>/<branch>拉取      


# 拉取     
---     
当 git fetch 命令从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容。 它只会获取数据然后让你自己合并。 然而，有一个命令叫作 git pull 在大多数情况下它的含义是一个 git fetch 紧接着一个 git merge 命令。 如果有一个像之前章节中演示的设置好的跟踪分支，不管它是显式地设置还是通过 clone 或 checkout 命令为你创建的，git pull 都会查找当前分支所跟踪的服务器与分支， 从服务器上抓取数据然后尝试合并入那个远程分支。

由于 git pull 的魔法经常令人困惑所以通常单独显式地使用 fetch 与 merge 命令会更好一些。


# 删除远程分支     
---      
假设你已经通过远程分支做完所有的工作了——也就是说你和你的协作者已经完成了一个特性， 并且将其合并到了远程仓库的 master 分支（或任何其他稳定代码分支）。 可以运行带有 --delete 选项的 git push 命令来删除一个远程分支。 如果想要从服务器上删除 serverfix 分支，运行下面的命令：

```
$ git push origin --delete serverfix      
```


# 变基(rebase)     
---    
可以使用 rebase 命令将提交到某一分支上的所有修改都移至另一分支上

```
例子： 可以检出 experiment 分支，然后将它变基到 master 分支上
$ git checkout experiment
$ git rebase master

原理是首先找到这两个分支（即当前分支 experiment、变基操作的目标基底分支 master） 的最近共同祖先 C2，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件， 然后将当前分支指向目标基底 C3, 最后以此将之前另存为临时文件的修改依序应用。
```    



# 变基的风险
```
如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行变基。
变基操作的实质是丢弃一些现有的提交，然后相应地新建一些内容一样但实际上不同的提交。 如果你已经将提交推送至某个仓库，而其他人也已经从该仓库拉取提交并进行了后续工作，此时，如果你用 git rebase 命令重新整理了提交并再次推送，你的同伴因此将不得不再次将他们手头的工作与你的提交进行整合，如果接下来你还要拉取并整合他们修改过的提交，事情就会变得一团糟。
```

