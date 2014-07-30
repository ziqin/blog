title: 《算法竞赛入门经典》第3章习题
date: 2014-07-30 20:55:40
categories:
- OI
- 题解
tags:
- OI
- 算法竞赛入门经典
- 题解
description: 子勤做的《算法竞赛入门经典》第3章习题。
keywords: OI, 算法竞赛入门经典第3章习题, 算法竞赛入门经典, 信息学奥赛, NOIP
---

第3章的题子勤做得不太好，有些实现可能思路不够清晰，请原谅。

---

### 3-1 分数统计 (stat)

##### 题目：

输入一些学生的分数，哪个分数出现的次数最多？如果有多个并列，从小到大输出。
**任务 1：**分数均为不超过 100 的非负整数。
**任务 2：**分数均为不超过 100 的非负实数，但最多保留两位小数。

##### 分析：

由于不知道人数的范围，但分数的范围是确定的，因此我们可以以分数为数组下标、次数为数组元素值，全部读入后进行比较，找出最大的。要做到并列的从小到大输出，只需要从小到大遍历一边就好了，反正数组不太大。对于任务2而言，因为“最多保留两位小数”，所以可以扩大 100 倍，变实数为整数存进数组里，输出时再变回实数。

<!-- more -->

##### 解答：

``` c stat-1.c
/* ziqin 2014 */
#include <stdio.h>
#include <string.h>
int score[101]; // 0-100
int main(void)
{
    int n = 0, max, i;
    memset(score, 0, sizeof(score));
    while (scanf("%d", &n) == 1) // 以EOF结束输入，未考虑输入错误的情况
        score[n]++;
    max = score[0];
    for (i = 1; i < 101; i++) // 查找最多次的
        if (score[i] > max)
            max = score[i];
    for (i = 0; i < 101; i++) // 输出所有最多次的
        if (score[i] == max)
            printf("%d\n", i);
    return 0;
}
```
``` c stat-2.c
/* ziqin 2014 */
#include <stdio.h>
#include <string.h>
#include <math.h>
int score[10001]; // 0.00-100.00
int main(void)
{
    int max, i;
    double n;
    memset(score, 0, sizeof(score));
    while (scanf("%lf", &n) == 1)
        score[(int)floor(n * 100 + 1e-6)]++; // +1e-6防浮点误差
    max = score[0];
    for (i = 1; i < 10001; i++) // 查找最多次的
        if (score[i] > max)
            max = score[i];
    for (i = 0; i < 10001; i++) // 输出所有最多次的
        if (score[i] == max)
            printf("%.2f\n", i/100.0);
    return 0;
}
```

---

### 3-2 单词的长度 (word)

##### 题目：

输入若干个单词，输出它们的平均长度。单词只包含大写字母和小写字母，用一个或多个空格隔开。

##### 解答：

``` cpp word.cpp
// ziqin 2014
#include <iostream>
#include <string>
using namespace std;
int main()
{
    string s;
    int sum = 0, count = 0; // 总长度、单词个数
    while (cin >> s) {
        count++;
        sum += s.length();
    }
    cout << ((double)sum) / count << endl;
    return 0;
}
```

---

### 3-3 乘积的末3位 (product)

##### 题目：

输入若干个整数（可以是正数、负数或者零），输出它们的乘积的末 3 位。这些整数中会混入一些由大写字母组成的字符串，你的程序应当忽略它们。提示：试试看，在执行 `scanf("%d")` 时输入一个字符串会怎样？

##### 分析：

子勤不是很理解这道题目的意思，所以下面的程序是把输入当成只有一行、输出不要求有正负之分来对待的。由于不用管正负，我们就可以一个个字符地判断，如果是数字就读入，然后跳过这个数字占的空间，继续查找；不是数字的话，就继续往下找，知道找到数字。

##### 解答：

``` c product.c
/* ziqin 2014 */
#include <stdio.h>
#include <ctype.h>
#include <string.h>
#define MAXN 100000
char buf[MAXN];
int main()
{
    int n, i, times = 1, slen, nlen;
    fgets(buf, MAXN, stdin);
    slen = strlen(buf);
    for (i = 0; i < slen;) {
        // 由于输出中不要求区分正负，所以这里视正负号为无关字符，只关注数字
        if (isdigit(buf[i])) {
            sscanf(buf + i, "%d", &n);
            times = ((n % 1000) * times) % 1000;
            for (nlen = 0; n > 0; n /= 10, nlen++); // 求数字的宽度
            i += nlen; // 根据数字的宽度定位到非数字处，继续往下找
        } else
            i++; // 继续寻找数字
    }
    printf("%03d\n", times);
    return 0;
}
```

---

### 3-4 计算器 (calculator)

##### 题目：

编写程序，读入一行恰好包含一个加号、减号或乘号的表达式，输出它的值。这个运算符保证是二元运算符，且两个运算数均为不超过 100 的非负整数。运算数和运算符可以紧挨着，也可以用一个或多个空格、TAB 隔开。行首末尾均可以有空格。提示：选择合适的输入方法可以将问题简化。

样例输入：1+1
样例输出：2
样例输入：2-     5
样例输出：-3
样例输入：0    *1982
样例输出：0

##### 解答：

题目挺长，不过做起了还算是比较好做，因为用 `scanf()` 很方便。

``` c calculator.c
/* ziqin 2014 */
#include <stdio.h>
int main(void)
{
    int a, b;
    char c;
    scanf("%d %c%d", &a, &c, &b); // %c前面有个空格
    switch (c) {
    case '+':
        printf("%d\n", a + b);
        break;
    case '-':
        printf("%d\n", a - b);
        break;
    case '*':
        printf("%d\n", a * b);
        break;
    default:
        printf("Input Error!\n");
    }
    return 0;
}
```

---

### 3-5 旋转 (rotate)

##### 题目：

输入一个 n*n 字符矩阵，把它左转 $90^\circ$ 后输出。

##### 分析：

我做这道题时假定 n<1000 且不提前输入 n。所以，先读入第一行来判断 n 的大小。左转 $90^\circ$ 当然是通过变换下标来完成啦。具体怎么变嘛，画个图自己转一下就不难看出了。

##### 解答：

``` c rotate.c
#include <stdio.h>
#include <string.h>
#define MAXN 1000
char c[MAXN][MAXN]; // 矩阵
int main(void)
{
    int i, j, n;
    memset(c, '\0', sizeof(c));
    fgets(c[0], MAXN, stdin); // 读入第1行
    n = strlen(c[0]) - 1; // -1是因为fgets读入时包含了换行符
    for (i = 1; i <= n-1; i++) // 读入接下来的n-1行
        fgets(c[i], MAXN, stdin);
    for (i = n-1; i >= 0; i--) { // 输出n行
        for (j = 0; j < n; j++)
            putchar(c[j][i]);
        printf("\n");
    }
    return 0;
}
```

### 3-6 进制转换1 (base1)

##### 题目：

输入基数 b $(2\leq b \leq 10)$ 和正整数 n (十进制)，输出 n 的 b 进制表示。

##### 分析：

模拟手动进制换算的过程，不断除以 b 求余，再逆序输出余数。为了实现余数逆序输出，可以在求出来的时候把它们存入数组里。

##### 解答：

``` c base1.c
#include <stdio.h>
#include <string.h>
#define MAXN 32
int bn[MAXN];
int main(void)
{
    int b, n, i;
    memset(bn, 0, sizeof(bn));
    scanf("%d%d", &b, &n);
    for (i = 0; n > 0; i++) {
        bn[i] = n % b;
        n /= b;
    }
    for (i = MAXN-1; i >= 0; i--) // 忽略多余的0
        if(bn[i] != 0)
            break;
    for (; i>= 0; i--) // 逆序输出
        putchar(bn[i] + '0');
    putchar('\n');
    return 0;
}
```

---

### 3-7 进制转换2 (base2)

##### 题目：

输入基数 b $(2\leq b \leq 10)$ 和正整数 n (b 进制)，输出 n 的十进制表示。

##### 分析：

这题 3-6 稍微更容易一些，因为不用考虑逆序输出。同样，也是模拟手算，只需手写一个例子，就可以搞清楚规则了，如：
$(31024)_5=3\times5^4+1\times5^3+0\times5^2+2\times5^1+4\times5^0=2014$

##### 题目：

``` c base2.c
/* ziqin 2014 */
#include <stdio.h>
int main(void)
{
    int b, n, i, j, mi, sum = 0;
    scanf("%d%d", &b, &n);
    for (i = 0; n > 0; i++) {
        for (j = 1, mi = 1; j <= i; j++) mi *= b;
        sum += (n % 10) * mi;
        n /= 10;
    }
    printf("%d\n", sum);
    return 0;
}
```

---

### 3-8 手机键盘 (keyboard)

##### 题目：

输入一个由小写字母组成的英文单词，输出用手机的默认英文输入法的敲键序列。例如要打出 pig 这个单词，需要按 1 次 p，3 次 i，（稍作停顿后）1次 i，记为 p1i3i1。

##### 分析：

我觉得题目的描述不太清楚，所以我理解的是：若输入 pig，则输出 p1i3g1。这样的话，就只需先输出一个字母然后输出它的对应数字即可。为了方便，我用常量表来做：

##### 解答：

``` c keyboard.c
#include <stdio.h>
#include <string.h>
int keyboard[] = {
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3, 4,
    1, 2, 3,
    1, 2, 3, 4
};
#define MAXN 100
char word[MAXN];
int main(void)
{
    int n, i;
    fgets(word, MAXN, stdin);
    n = strlen(word) - 1;
    for (i = 0; i < n; i++)
        printf("%c%d", word[i], keyboard[word[i]-'a']); // 利用下标映射
    putchar('\n');
    return 0;
}
```

---

[![本文以 CC BY-SA 3.0 CN 协议发布](/img/cc-by-sa.png "左侧图案的原来源由 Wikimedia 用户 Sting 创作并以 CC BY 2.5 协议授权；右侧图案的原来源由 Creative Commons 创作并以 CC BY 2.0 协议授权。")](https://creativecommons.org/licenses/by-sa/3.0/cn/)