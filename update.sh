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
