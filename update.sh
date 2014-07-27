#!/bin/bash
echo 'Updating...'
hexo clean
git add --all
git commit -m 'update'
hexo g
rm db.json
mv public ../public # 请确保上级目录中没有名为public的文件夹
git checkout gitcafe-pages
rm -r `ls` # ls不会列出.git，因此版本库不会被删除
mv ../public/* .
git add --all
git commit -m 'update'
git checkout master
git push origin master gitcafe-pages
echo 'Updated!'
