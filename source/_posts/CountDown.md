title: 高考倒计时
date: 2016-01-31 20:35:28
categories:
- 应用
- 桌面
tags:
- Qt
- C++
---

总像是忽然间才意识到自己已经成为一名高三汪了～还有128天就要高考了，有些害怕。。。

之前计社的杰南同学写了个高考倒计时程序送给我。它会获取系统当前时间，计算出距离高考还有多少天，然后显示在桌面上。作为电教委员，我把它装在了班里的电脑上，于是我们班就不用像其他班那样每天手动擦一次昨天的倒计时了。

有天，感觉“离高考还有N天”这几个字看起来太可怕了，我想把它改成“离暑假还有N+2天”，但手头上又没有源码。正巧杰南没有空帮我改。所以，我决定开坑，自己用 Qt5 写一个。然后就有了这个高考倒计时程序——

**项目主页：** <https://github.com/ziqin/CountDown>
**下载页面：** <https://github.com/ziqin/CountDown/releases>

后来陆陆续续地加了一些功能，改善了一些用户体验的细节，又陆陆续续地修了几个 Bug（当初真的没想到这么一个小程序也能写出 Bug 来）。这下子估计应该没什么 Bug 了。赶上放寒假，终于有机会在 GitHub 上创个 Release 了。至于曾经有过什么 Bug、最后怎么修的，在 GitHub [Issues](https://github.com/ziqin/CountDown/issues?q=is%3Aissue+is%3Aclosed) 和 [Commits](https://github.com/ziqin/CountDown/commits/master) 都有记录，这里就不再赘述了。

欢迎下载使用:-) 也欢迎报 Bug（不过可能没有时间及时修复）。。。

<!-- more -->

如果你喜欢自己编译的话，也是很容易的。默认是 Qt5 的，用 Qt Creator 打开工程文件 `CountDown.pro`，再点一下编译按钮就可以了。也有功能相同的 [Qt4 分支](https://github.com/ziqin/CountDown/tree/qt4)。不过，目前都是仅支持 Windows 系统（Linux 上应该也可以编译通过，但设不了开机启动）。

附一张截图吧：

![高考倒计时 “设置”对话框 截图](/img/2016/CountDown/setting-dialog.png)