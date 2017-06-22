title: 排序方案速度测试
date: 2014-08-19 00:30:23
categories:
- 技术
- 测评
tags:
- 排序
- OI
- C++
- 算法
- 库函数
---

看书的时候时不时会遇到对各种排序算法的介绍。有这么多排序算法，在比赛中一般用哪种会比较好？一方面想着，“快排大法好！现成不用码！”但又听说有的数据会专门卡快排。而且，快排真的有那么快吗？种种顾虑涌上心头。所以，今天晚上我决定对两三个常见的排序算法测个明白，来个感性的认识。

当然，子勤下面的探究结果对于不同的情境可能不适用，我也无法保证一下结论的正确性（就连今天下午测得的结果也与今天晚上的有相互矛盾之处）。毕竟，有不同问题、不同数据、不同平台等众多因素的差异嘛。亲爱的朋友，套用下面的结论请谨慎。

<!-- more -->

---

### 测试环境

相关项	| 取值					|
:------	| :--------------------	|
操作系统	| Linux 3.11 x86_64		|
编程语言	| C++					|
编译器	| GCC 4.8				|
编译命令	| g++ -O2				|
计时方案	| Linux 系统的 time 命令	|

---

### 测试数据生成器

先写个随机数的：

``` cpp rand.cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;
int main()
{
	int maxn = 1e6;
	srand(time(NULL));
	cout << maxn << '\n';	// 第一行是数据数量
	while (maxn--)
		cout << rand() << '\n';
	return 0;
}
```

然后来个升序：

``` cpp up.cpp
#include <iostream>
using namespace std;
int main(void)
{
	int maxn = 1e6;
	cout << maxn << '\n';	// 第一行是数据数量
	for (int i = 0; i < maxn; i++)
		cout << i << '\n';
	return 0;
}
```

再来个降序：把 `for (int i = 0; i < maxn; i++)` 改成 `for (int i = maxn; i > 0; i--)` 即可。

编译完上面的程序后，执行 `./rand > sort_test.in`，将输出重定向到文件 sort_test.in 里。

---

### 主程序

我们要完成的任务，就是对上面生成3个的文件进行升序排序。

写个读写文件的框架，方便套用（同时也是公平的体现）：

``` cpp
#include <fstream>
using namespace std;

const int maxn = 1e6 + 10;
int data[maxn];		// 存数据的

int main()
{
	ifstream fin("sort_test.in");
	ofstream fout("sort_test.out");

	int n;
	fin >> n;		// 数据数量
	for (int i = 0; i < n; i++)
		fin >> data[i];

	// Sorting here...

	for (int i = 0; i < n; i++)
		fout << data[i] << '\n';

	fin.close();	fout.close();
	return 0;
}
```

写好排序的代码后，把函数调用写在 `// Sorting here...` 那里，再加上函数声明之类的就 OK 了。

---

### 排序方案

* 冒泡排序

作为子勤第一个听说的排序算法，当然要首先登场啦：

``` cpp
	void bubble_sort(int nmemb)
	{
	    for (int i = nmemb - 1; i > 0; i--)
	        for (int j = 0; j < i; j++)
	            if (data[j] > data[j+1])
	                std::swap(data[j], data[j+1]);
	}
```

在 `main()` 里调用 `bubble_sort(n)` 便可以了。

* 归并排序

这个...老实说，是从书上抄过来的：

``` cpp
	void merge_sort(int x, int y)
	{
	    if (y-x > 1) {
	        int m = x + (y-x)/2;
	        int p = x, q = m, i = x;
	        merge_sort(x, m);
	        merge_sort(m, y);
	        while (p < m || q < y)
	            if (q >= y || (p < m && data[p] <= data[q]))
	                temp[i++] = data[p++];
	            else
	                temp[i++] = data[q++];
	        for (i = x; i < y; i++)
	            data[i] = temp[i];
	    }
	}
```

用归并排序时，需要开一个全局数组 `int temp[maxn]` 作为辅助空间，并在 `main()` 里调用 `merge_sort(0, n-1)`。

* 快速排序 - qsort

来自 C 标准库的大大大 `qsort()` 闪亮登场！
要请此大牌出场，首先要 `#include <cstdlib>`
然后编写一个比较函数给它调用，像这样：

``` cpp
	int compare(const void *a, const void *b)
	{
		return *(int*)a - *(int*)b;
	}
```

然后在 `main()` 里传递 4 个参数调用它：`qsort(data, n, sizeof(int), compare)`。

* 快速排序 - std::sort

既然好×友 `qsort()` 都来了，又怎能少了 C++ STL 里的 `std::sort()` 呢？
同样地，也得包含相应的头文件：`#include <algorithm>`。
`std::sort()` 有两个重载，这里我用两个参数在 `main()` 中调用它：`std::sort(data, data + n)`
（意思是对区间 [data, data+n) （左闭右开）中的内容进行快速排序）。

* 快速排序 - 手打的

好吧...我承认这基本又是从书上抄来的，在 `main()` 中以 `my_qsort(0, n-1)` 的形式调用。

``` cpp
	void my_qsort(int x, int y)
	{
		int i = x, j = y;
		int mid = data[x];
		for (;;) {
			while (data[i] < mid)	i++;
			while (data[j] > mid)	j--;
			if (i <= j) {
				std::swap(data[i], data[j]);
				i++; j--;
			}
			if (i > j)	break;
		}
		if (x < j)	my_qsort(x, j);
		if (i < y)	my_qsort(i, y);
	}
```

快排完了吧？还没有呢！
不多不多，“回”字都有四种写法呢。多乎哉？不多也。

据说在数据基本有序时，按上面的写法，快排会退化为 $O(n^2)$，因为上面关键字 mid 的取值总是范围内最左边的那个。

据说，在许多情况下，取中点作为关键字可以一定程度地改善这个问题，所以上面第 4 行可以改成：

``` cpp
	int mid = data[(x+y) / 2];
```
但是，万一出题者猜到我这么想，设计了数据故意坑我怎么办？那咱就用猜不到的方法——随机化。
每次要计算关键字时，先在下标范围内以随机数的形式确定一个下标，以它对应的元素值作为关键字就可以了，如下：

``` cpp
	int mid = data[(int)(rand()*1.0/RAND_MAX*(y-x) + x + 0.5)];
```

其中，`(int)(rand()*1.0/RAND_MAX*(y-x) + x + 0.5)` 表示的是 [x, y] 范围内的随机整数。`rand()*1.0/RAND_MAX` 表示 [0, 1] 内的实数，将它扩大 (y-x) 倍并加上 x，就是 [x, y] 范围内的随机数了。加上 0.5 并强制转换为 int 型是对它进行四舍五入。当然，要用到随机数，也要像随机数生成器那样 include `<cstdlib>` 和 `<ctime>`，并在 `main()`函数里执行 `srand(time(NULL))` 来初始化随机数种子。晕乎哉？不晕也 :-)

---

### 测试结果

打完了码，就该开始做测试了。用命令 `time ./sort` 运行程序，即可记录时间。结果如下：

排序方案（随机数据）	| 时间 (s)
:------------------	| :------
冒泡排序				| \
归并排序				| 0.393
qsort()				| 0.403
std::sort()			| 0.323
手打快排（最左）		| 0.342
手打快排（中点）		| 0.346
手打快排（随机）		| 0.371

排序方案（升序数据）	| 时间 (s)
:------------------	| :------
冒泡排序				| \
归并排序				| 0.264
qsort()				| 0.243
std::sort()			| 0.214
手打快排（最左）		| \
手打快排（中点）		| 0.213
手打快排（随机）		| 0.243

排序方案（降序数据）	| 时间 (s)
:------------------	| :------
冒泡排序				| \
归并排序				| 0.266
qsort()				| 0.241
std::sort()			| 0.212
手打快排（最左）		| \
手打快排（中点）		| 0.213
手打快排（随机）		| 0.245

上面给出数字的结果都是进行 10 次测试后去掉一个最长时间和一个最短时间后求出的平均值（四舍五入），测试数据的数量均为 $10^6$。以“\”表示的项，运行时间太长，子勤没有足够的耐心等它们运行完就结束进程了...

下面，让我们把上面“\"的项的数据范围缩小，看看结果如何。（由于这些程序速度太慢，我就只测试一次啦）

排序方案（随机数据）	| 数据类型（范围：$10^5$)	| 时间 (s)
:------------------	| :-------------------	| :-----
冒泡排序				| 随机数据				| 17.328
冒泡排序				| 升序数据				| 3.631
手打快排（最左）		| 升序数据				| 1.901
冒泡排序				| 降序数据				| 9.141
手打快排（最左）		| 降序数据				| 3.007

---

### 总结

总结一下上面的测试结果：

1. 在多数情况下，`std::sort()` 表现较好（不过好像跟编译参数有关），我想，没啥特殊情况就用它吧；
2. 当数据基本有序时，手打快排（最左）会退化；对快速排序而言，采用一定的策略选择标准关键字（即上面代码中变量 mid 的取值）是很有必要的；
3. 归并排序结果真的很稳定，它达不到最快，但也不慢，可以考虑使用；且它与快速排序之间的差距也比我想象中的小；
4. 同为快速排序者，只要没退化，相差都不是特别大，使用时就不要太纠结啦；C 标准库和 C++ 标准模板库里的快排也不是轻易就会退化的。

从晚饭前搞到现在（凌晨），终于写完了……
