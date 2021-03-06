//indexOf的测试
module("baidu.array.indexOf")

test("2个参数，查询数组项",function(){
	expect(4);
	var arraytest = [2,5,8,19,'name','44',56,5,'name'];
    var r= baidu.array.indexOf(arraytest,'name');
    equal(r,4,"index of string");
    arraytest = [2,5,8,19,'name','44',56,5,'name'];
    var i = 5;
    r = baidu.array.indexOf(arraytest,i);
    equal(r,1,"2个参数");
    r = baidu.array.indexOf(arraytest,'lack');
    equal(r,-1,"查询不存在的数组项");
    r = baidu.array.indexOf(arraytest,0);
    equal(r,-1,"查询不存在的元素");
})

test("2个参数，查询函数",function(){
	expect(3);
	var arraytest = [2,3,5,6,7,'odd',8,9,'even',10]; 
    var fn = function (x) { 
        if (typeof(x)=='string')
              return false;
        return x%3==0; };
    var r = baidu.array.indexOf(arraytest,fn);
    equal(r,1,"检测函数多个分支");
    r = baidu.array.indexOf(arraytest, function (x) { return x=='odd'; });
    equal(r,5,"检测函数1个分支");
    r = baidu.array.indexOf (arraytest, function (x) 
        { if (typeof(x)=='string')
                return false;
            return x>15; }  );
    equal(r,-1,"没有元素使iterator为真");
    
})


test("3个参数,正常用例",function(){
	expect(3);
	var arraytest = [2,3,5,6,7,'odd',3,1,'even',6];
    var i = 6;
    var start = 5;
    r = baidu.array.indexOf( arraytest, i ,start);
    equal(r,9,"查询数组项");
    r = baidu.array.indexOf(arraytest, i, 2.5);//float
    equal(r,3,"start为小数");
    r = baidu.array.indexOf( arraytest, function (x) { return x%3==0; }, 3);
    equal(r,3,"查询函数");
})

test("3个参数，start为负数",function(){
	expect(3);
	var arraytest = [2,3,5,6,7,'odd',3,1,'even',6];
    var i = 6;
    var start = -3;
    var r= baidu.array.indexOf( arraytest, i ,start);//start为负数时自动取为0
    equal(r,3,"start 为-3");
    start = -15.8;
    r = baidu.array.indexOf( arraytest, i ,start);
    equal(r,3,"start 为-15.8");
    start = -2;
    r = baidu.array.indexOf( arraytest, function (x) { return x%3==0; }, start);
    equal(r,1,"查询函数，start 为-2")
})

test("3个参数，start大于数组长度",function(){
	expect(3);
	var arraytest = [2,3,5,6,7,'odd',3,1,'even',6];
    var i = 6;
    var start = -3;
    var r= baidu.array.indexOf( arraytest, i ,start);//start为负数时自动取为0
    equal(r,3,"start 为-3");
    start = 15;
    r = baidu.array.indexOf( arraytest, i ,start);//start为负数时自动取为数组长度
    equal(r,-1,"查询数组项：start 为15");
    arraytest = [2,3,5,6,7,3,1,6];
    start = 20;
    r= baidu.array.indexOf( arraytest, function (x) { return x%3==0; }, start);
    equal(r,-1,"查询函数：start 为20");
   
})
test("异常用例",function(){
	expect(8);
	var r = baidu.array.indexOf([], 1);
    equal(r,-1,"空数组查询数组项");
    
    r = baidu.array.indexOf([], function (x) { return x==1;});
    equal(r,-1,"空数组查询函数");
    
    r = baidu.array.indexOf( [], 1,0);
    equal(r,-1,"3个参数，start为0，空数组查询数组项");
    
    r = baidu.array.indexOf( [], 1,-1);
    equal(r,-1,"3个参数，start为-1，空数组查询数组元素");
    
    r = baidu.array.indexOf( [], 1,5);
    equal(r,-1,"空数组查询数组项，start为5,空数组查询数组元素");
    
    r = baidu.array.indexOf( [], function (x) { return x==1;},0);
    equal(r,-1,"空数组查询函数，start为0");
    
    r = baidu.array.indexOf( [], function (x) { return x==1;},-1);
    equal(r,-1,"空数组查询函数，start为-1");
    
    r = baidu.array.indexOf( [], function (x) { return x==1;},5);
    equal(r,-1,"空数组查询数组项，start为5");
})

