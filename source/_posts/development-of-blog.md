---
title: 小天地改版了——博客演变记
date: 2014-07-26
tags:
- Blog
- Hexo
description: 讲述子勤的小天地的演变历程。
---

先感慨一下：

> 好久没写博客啦！

自从上了高中，子勤的小天地就有很长时间没更新过了。一方面，是因为高中紧张的全日制住宿生活让我没什么时间更新博客；另一方面，就是更新博客太麻烦了。

[子勤的小天地 v1.0](http://localhost:4000/2013/07/2013/birth-of-blog/) 是通过直接书写 HTML 完成的。在这基础上，我用 [Google Code Prettify](https://code.google.com/p/google-code-prettify/) 实现了代码高亮，用[友言](http://www.uyan.cc/)做评论框，还用 [audio.js](http://kolber.github.io/audiojs/) 实现了播放音乐的功能。这些以外的部分，都是我一点一点地打出来的。每一种颜色的选取，每一处阴影的设计，都凝聚着付出的汗水。

直接编写 HTML 的博客，在更新文章时的工作量可想而知。首先要拷贝模板进行修改，用 HTML 把新博文写好；然后，要把更新同步到首页和文章列表里；为了让搜索引擎知道更新，还要去修改 Sitemap。一次流程下来，大部分的时间都花在各种同步设置上了，因而压榨了书写内容的时间，也影响了更新的积极性。

<!-- more -->

高一的第二个学期里，我们灵动计算机社决定建设一个独立博客，由作为副社长的我负责初步建设。我寻思着，社团博客可不能用手写 HTML 的方法来做，那样的话，以后就没人更新了。得给它找一个自动化程序。我觉得，WordPress 还是挺不错的一个博客程序，但一时间没能找到个好空间，只能先做个静态的，像我的个人博客那样放到 GitCafe 上。于是，我开始了新的一轮博客程序寻找。想过 Jekyll，但觉得架设略麻烦；也试了 Pelican，但很难找到一个好看的主题。直到我在知乎上发现了 [Hexo]()，我才发现，原来还有这么优雅的静态博客程序。简洁的目录结构、易读的配置文件、清新的默认主题、风一样的生成速度，这些特点都是我喜爱的。于是，在周末放假的时间，我用 Hexo 架起了我们的社团博客——“灵动” [ld.mmyz.net](http://ld.mmyz.net)，记录下我们的活动，并在后来的时间里对主题的一些细节进行了修改。在这个过程中，我对 Hexo 的使用也渐渐地熟悉了起来。

终于，又到了暑假这个大好时机。我想起了我的个人博客，决定把它迁移到 hexo 上。有计社那份修改过的主题做基础，这个迁移工作便轻松了许多，只需依葫芦画瓢就可以了。改完之后，就是这个样子啦。

![子勤的小天地 v2.0](/img/2014/development-of-blog/ziqin-blog-v2.0.png)

---

2016年3月12日更新：

鉴于 GitCafe 即将停止服务，现将博客迁移到了 GitHub。