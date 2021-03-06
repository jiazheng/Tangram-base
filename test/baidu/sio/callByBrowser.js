module('baidu.sio.callByBrowser');

var check1 = function() {
	equals(window.fromBrowser, '百度');
	window.fromBrowser = '';
	start();
};

test('callback is function', function() {
	stop();
	baidu.sio.callByBrowser(upath+"exist.js", check1);
});

test('charset utf-8', function() {
	stop();
	baidu.sio.callByBrowser(upath+"exist-utf.js", check1, {
		charset : "UTF-8"
	});
});

test('charset gbk', function() {
	/**
	 * opera下无法动态切换
	 */
	if(ua.browser.opera){
		ok(true, 'not work on opera');
		return;
	}
	stop();
	baidu.sio.callByBrowser(upath+"exist-gbk.js", check1, {
		charset : "GBK"
	});
});

/**
 * 由于不存在网页不会触发回调，设置半秒超时，用例可能会有问题……
 */
test('js not exist', function() {
	stop();
	var h, check1 = function() {
		clearTimeout(h);		
		ok($.browser.msie || false, 'call back will not call');
		start();
	};
	baidu.sio.callByBrowser("notexist.js", check1);
	h = setTimeout(function() {
		ok(true, 'call back not call');
		start();
	}, 500);
});
