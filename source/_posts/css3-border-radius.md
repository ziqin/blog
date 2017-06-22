title: 利用 CSS3 特性轻松实现图片圆角
date: 2013-11-30
categories:
- 技术
- 前端
tags:
- CSS
- 网页
---

<img src="/img/2013/css3-border-radius/cptsct.png" alt="I love Computer Society!" class="rounded" style="border: 0; border-radius: 48px; height: 256px; width: 256px; box-shadow: 0 0 20px #999; display: block;">

---

### 好用的 CSS3 特性：border-radius（圆角边框）属性

我们常常想在网页中做出像上面这种圆角图片的效果。在过去，我们不得不先把每张图片先改成圆角的，再插入到网页中；或者使用一些复杂的脚本。这样做非常不方便。现在，我们只需利用 CSS3 的一个特性——`border-radius` 属性，就可以简单地把图片做成圆角的样子了。以下便是上面这张图片的 CSS 样式：

<!-- more -->

``` css
.rounded {
	/* 图片大小 */
	height: 256px;
	width: 256px;
	/* 圆角边框 */
	border: 0;
	border-radius: 48px;
	/* 阴影 */
	box-shadow: 0 0 20px #999;
}
```

有趣的是，如果把一张正方形图片的 `border-radius` 值设置为边长的一半，就可以做出圆形图片的效果，像这样：

<img src="/img/2013/css3-border-radius/cptsct.png" alt="I love Computer Society!" class="rounded" style="border: 0; border-radius: 128px; height: 256px; width: 256px; box-shadow: 0 0 20px #999; display: block;">

---

CSS3 的 `border-radius` 属性不仅可以用于 `<img>` 标签，还可以用于 `<div>` 标签等。我们可以用这种方法简单地画出圆角矩形：

``` html
<div id="rounded_rectangle"></div>
<style>
	#rounded_rectangle {
		border: 10px gray double;
		border-radius:	60px 30px 20px 10px;
			    /*	左上  右上  右下  左下 */
		height: 100px; width: 400px;
	}
</style>
```

效果如下：

<div id="rounded_rectangle"></div>
<style>
	#rounded_rectangle {
		border: 10px gray double;
		border-radius:	60px 30px 20px 10px;
			    /*	左上　右上　右下　左下 */
		height: 100px; width: 400px;
		margin: auto
	}
</style>

不过，Internet Explorer < 9 不支持 `border-radius` 属性哦。如果你的网页需要兼容低版本的IE，可能要去寻找其他的解决方法。不过，子勤的博客就不考虑如何兼容低版本的 IE了，所以有不少地方都用到了这个 CSS 属性，既方便又不失美观。