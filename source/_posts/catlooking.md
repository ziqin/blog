title: Catlooking 一个专心写作的环境
date: 2013-08-21
categories:
- 应用
- 桌面
tags: 
- Qt
- 编译
description: 专心写作应用 Catlooking 的简介，以及它的编译安装方法。
keywords: Catlooking, Qt
---

前一段时间，子勤发现了一个叫做 Catlooking 的有趣应用。

Catlooking 是一个简易的纯文本编辑器，不能为文字设置各种样式，也没有代码高亮之类的功能。但它可以为我们提供一个舒服的、全屏幕的写作环境，让我们能够把注意力集中到写作上。

让我们通过下面这段视频来了解下它吧。

<div><iframe width="100%" height="560px" src="http://player.youku.com/embed/XNTYxNTgxMTU2" frameborder=0 allowfullscreen></iframe></div>

<!-- more -->

你是否也喜欢上这个应用了呢？我们赶紧把它装上吧。

Catlooking 的官方网站是 [Catlooking.com](http://catlooking.com/)，它是一个以 GPL-2+ 协议发布的开源软件，源代码托管在 [GitHub](https://github.com/sychev/catlooking) 上。.

如果你使用的是 Windows 操作系统，或是使用 Deb 系列的 Linux 发行版，你可以从 Catlooking.com 上直接下载到安装包。至于 rpm 包，软件作者并没有提供。子勤昨天本想给 Catlooking 打一个 rpm 包的，不过还未学会 rpm 打包。加油啊！

如果你使用的是其他 Linux 发行版（比如 rpm 系列的），或者你喜欢从源代码安装的话，可以按照以下方式编译 Catlooking：

1、检出源代码。我们可以到上面所说的 GitHub 下载源代码包（点击 GitHub 页面上的 Download ZIP 按钮），然后解压到一个文件夹里。或者用 Git 克隆代码仓库：

``` bash
$ git clone https://github.com/sychev/catlooking.git
```

2、Catlooking 是用 Qt4 写的，所以我们要安装 Qt4 开发包来编译它。这个包的名称一般叫 `libqt4-dev` 或 `libqt4-devel`。我们可以用系统的软件包管理器来安装它。

然后我们进入源代码目录中，执行 qmake，来生成 Makefile：

``` bash
$ qmake catlooking.pro
```

3、接着，执行 make 来编译它：

``` bash
$ make -j2
```

编译完之后，我们就可以在 build 文件夹中找到名为 catlooking 的可执行文件了。直接运行它就可以啦。是不是很简单呢？

遗憾的是，Catlooking 的作者停止更新它了。不过，它是个开源项目，欢迎你继续开发它。