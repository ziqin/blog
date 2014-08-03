title: 写了个发布博客更新的小脚本
date: 2014-07-27 13:57:14
tags:
- Bash
- Blog
- Git
- Hexo
keywords: Hexo, Bash
---

博客换成 Hexo 之后，觉得写新博文方便了许多。不过，回想一下，现在发一篇新的博文还是有些事情要做的：

1. 用 Markdown 写好博文，然后向 master 分支提交更新
2. 用 Hexo 生成网页
3. 把生成的网页拷贝到其他文件夹里，然后切换到 gitcafe-pages 分支
4. 删除旧的网页，然后把刚刚拷出去的新网页拷回来，再向 gitcafe-pages 提交一次更新
5. 向 GitCafe 推送更新
6. 切换回 master 分支，方便下一次操作

这前前后后的操作加起来，折算成命令行操作的话，就有十几行了。看来工作量还是有不少的。我想，反正这些操作都是相同的，不如写成脚本吧。这样，写好文章后，执行一下这个脚本就可以了。（这也太懒了吧 ←_←）

所以子勤写一个这样的文件：

<!-- more -->

``` bash update.sh https://gitcafe.com/ziqin/ziqin/raw/master/update.sh Download
#!/bin/bash
echo "Commit message:"
read cmtmsg
if [ ! -n "${cmtmsg}" ]; then
	cmtmsg="update" # 缺省
fi
echo "Updating..."
hexo clean
git add --all
git commit -m "${cmtmsg}"
hexo g
rm db.json
mv public ../public # 请确保上级目录中没有名为public的文件夹
git checkout gitcafe-pages
rm -r `ls` # ls不会列出.git，因此版本库不会被删除
mv ../public/* .
rm -r ../public/
git add --all
git commit -m "${cmtmsg}"
git checkout master
git push origin master gitcafe-pages
echo 'Updated!'
```

然后给它加上执行权限：

``` bash
chmod +x update.sh
```

以后，写完博文后，就不用一步步地操作了，只需 `./update.sh` 运行一下脚本，就能够完成更新的发布。从此，用 Hexo 写博文的方便程度又向 WordPress 靠近了一步。

> Hexo + Git + GitCafe，一样可以很简单！ —— Ziqin

---

### 7月30日更新：

* 可自由填写 commit message
* 自动清理残余的 `public` 文件夹

**Tips:** 这个脚本包含了删除自身这一操作，在 Linux 中这是被允许的，不过在 Windows 中可能会提示错误。子勤尚未测试它在 Windows 中的适用性。