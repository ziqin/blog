// http://cweili.gitcafe.com/css3-jquery-rocket-to-top/
!function(win, doc, $) {
	$(function() {
		var $rocketTopBtn = $('#rocket-to-top'),
			$rocketTopAnim = $rocketTopBtn.find('.anim'),
			rocketAnimTime = 1000,
			fire = 'fire',
			shot = 'shot',
			inRocketAnim = false,
			clickedTop = false;

		$(win).scroll(function() { // 监听window滚动事件
			if (innerWidth < 768) return; // 手机屏幕不做处理

			if ($(doc).scrollTop() == 0) {
				if (clickedTop && !inRocketAnim) {
					inRocketAnim = true; // 点击返回按钮返回顶部后

					$rocketTopBtn.addClass(shot); // 开始发射动画

					setTimeout(function() { // 结束并移除各动画class
						$rocketTopBtn.removeClass(shot).hide();
						$rocketTopAnim.removeClass(fire);
						inRocketAnim = false;
						clickedTop = false;
					}, rocketAnimTime * 1.5);
				} else {
					$rocketTopBtn.fadeOut(rocketAnimTime);
				}
			} else {
				$rocketTopBtn.fadeIn(rocketAnimTime);
			}
		});

		$rocketTopAnim.click(function() {
			if (inRocketAnim) return;
			clickedTop = true;

			$rocketTopAnim.addClass(fire); // 开始点火动画

			var scrollTime = $(doc).scrollTop() * 0.3; // 滚动耗时
			$('html,body').animate({
				scrollTop: 0
			}, scrollTime > rocketAnimTime ? scrollTime : rocketAnimTime);
		});
	});
}(window, document, jQuery);
