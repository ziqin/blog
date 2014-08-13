title: 《算法竞赛入门经典》第2章习题
date: 2014-07-26 11:42:40
categories:
- OI
- 解题报告
- 算法竞赛入门经典
tags:
- OI
- 算法竞赛入门经典
description: 子勤做的《算法竞赛入门经典》第2章习题。
keywords: OI, 算法竞赛入门经典第2章习题, 算法竞赛入门经典, 信息学奥赛, 解题报告
---

最近在看刘汝佳大大的《算法竞赛入门经典》v1。为了鼓励自己，子勤决定把自己做的几道习题放到博客上来，和大家分享一下。由于子勤是弱菜，所以难免会有错误的地方，恳请指出，谢谢！

以下代码均不考虑输入错误、文件无法打开等情况。

---

### 2-1 位数 (digit)

##### 题目：

输入一个不超过 $10^9$ 的正整数，输出它的位数。例如 12735 的位数是 5。请不要使用任何数学函数，只用四则运算和循环语句实现。

##### 思路：

不断除以10，直到为零，看看除了多少次。不超过 $10^9$ 的正整数，用 32 位的 `int` 就可以存得下了。

<!-- more -->

##### 解答：

``` c digit.c
/* ziqin 2014 */
#include <stdio.h>
int main(void)
{
    int n, bit;
    FILE * fp = fopen("digit.in", "r");
    fscanf(fp, "%d", &n);
    for (bit = 0; n != 0; n /= 10, bit++);
    fclose(fp);
    fopen("digit.out", "w");
    fprintf(fp, "%d\n", bit);
    fclose(fp);
    return 0;
}
```

---

### 2-2 水仙花数 (daffodil)

##### 题目：

输出 100～999 中的所有水仙花数。若 3 位数 ABC 满足 $ABC=A^3+B^3+C^3$，则称其为水仙花数。例如 $153=1^3+5^3+3^3$，所以 153 是水仙花数。

##### 解答：

``` c daffodil.c
/* ziqin 2014 */
#include <stdio.h>
#define POW3(n) (n) * (n) * (n)
int main(void)
{
    int i, a, b, c;
    FILE * fp = fopen("daffodil.out", "w");
    for (i = 100; i <= 999; i++) {
        a = i / 100;
        b = (i / 10) % 10;
        c = i % 10;
        if (i == (POW3(a) + POW3(b) + POW3(c)))
            fprintf(fp, "%d\n", i);
    }
    fclose(fp);
    return 0;
}
```

---

### 2-3 韩信点兵 (hanxin)

##### 题目：

相传韩信才智过人，从不直接清点自己军队的人数，只要让士兵先后以三人一排、五人一排、七人一排地变换队形，而他每次只掠一眼队伍的排尾就知道总人数了。输入 3 个非负整数 a,b,c，表示每种队形排尾的人数 (a<3, b<5, c<7)，输出总人数的最小值（或报告无解）。已知总人数不小于 10，不超过 100。

样例输入：2 1 6
样例输出：41
样例输入：2 1 3
样例输出：No answer

##### 思路：

从 10 到 100 穷举，看看是否有满足输入的即可。

##### 解答：

``` c hanxin.c
/* ziqin 2014 */
#include <stdio.h>
int main(void)
{
    int i, a, b, c, flag = 0;
    FILE *fp = fopen("hanxin.in", "r");
    fscanf(fp, "%d%d%d", &a, &b, &c);
    for (i=10; i<=100; i++)
        if(i%3==a && i%5==b && i%7==c) {
            flag = 1;
            break;
        }
    fclose(fp);
    fp = fopen("hanxin.out", "w");
    if (flag == 1)
        fprintf(fp, "%d\n", i);
    else
        fprintf(fp, "No answer\n");
    fclose(fp);
    return 0;
}
```

---

### 2-4 倒三角形 (triangle)

##### 题目：

输入正整数 n ≤ 20，输出一个 n 层的倒三角形。例如 n = 5 时输出如下：

```
#########
 #######
  #####
   ###
    #
```

##### 思路：

一个个字符地输出，用循环分开处理空格和 # 号。

不难看出，每一行的的 # 号数量构成了一个等差数列。如果以最后一行的 # 号数量为首项、第一行的为末项，那么这就是一个首项为 1、公差为 2 的等差数列，其通项公式为 $a_n=1+(n−1)×2=2n−1$，就能求得第一行有多少个 # 了。

##### 解答：

``` c triangle.cpp
/* ziqin 2014 */
#include <fstream>
using namespace std;
ifstream fin("triangle.in");
ofstream fout("triangle.out");
int main()
{
    int n, blank = 0, star, i;
    fin >> n;
    star = 2 * n - 1;
    for (; n>0; n--) {
        for (i = blank; i > 0; i--)
            fout << " ";
        for (i = star; i > 0; i--)
            fout << "#";
        fout << endl;
        blank++; star -= 2; // 空格每次多一个，#号每次少两个
    }
    return 0;
}
```

---

### 2-5 统计 (stat)

##### 题目：

输入一个正整数 n，然后读取 n 个正整数 $a_1,a_2,\cdots,a_n$，最后再读入一个正整数 m。统计 $a_1,a_2,\cdots,a_2$ 中有多少个整数的值小于 m。提示：如果重定向和 `fopen` 都可以使用，哪个比较方便？

##### 思路：

一种想法是读入 n 后用 `malloc` 动态申请内存，将后面读入的 n 个正整数存起来，待全部读入完之后再比较和 m 比较。不过这已经超出了《算法竞赛入门经典》这本书在前面两章介绍的内容。我想，作为第二章的习题，这道题应该能用讲过的方法来做的，但思考了挺长一段时间还是没想出来。我只好去看看作者的方法。没想到这个方法还真巧妙：

> 第一次打开文件只是为了读取 m，第二次打开文件完成统计。

##### 解答：

``` c stat.c
#include <stdio.h>
int main(void)
{
    int n, m, a, count = 0, i;
    // 第一次打开文件只是为了读取 m
    FILE * fp = fopen("stat.in", "r");
    fscanf(fp, "%d", &n);
    for (i = 1; i <= n; i++)
        fscanf(fp, "%d", &a);
    fscanf(fp, "%d", &m);
    fclose(fp);
    // 第二次打开文件完成统计
    fp = fopen("stat.in", "r");
    fscanf(fp, "%d", &n);
    for (i = 1; i <= n; i++) {
        fscanf(fp, "%d", &a);
        if(a < m)
            count++;
    }
    fclose(fp);
    fp = fopen("stat.out", "w");
    fprintf(fp, "%d\n", count);
    fclose(fp);
    return 0;
}
```

---

### 2-6 调和级数 (harmony)

##### 题目：

输入正整数 n，输出 $H(n)=1+\frac{1}{2}+\frac{1}{3}+\cdots+\frac{1}{n}$ 的值，保留 3 位小数。例如 n = 3 时答案为 1.833。

##### 解答：

``` c harmony.c
/* ziqin 2014 */
#include <stdio.h>
int main(void)
{
    FILE * fp = fopen("harmony.in", "r");
    int n, i;
    double h = 0;
    fscanf(fp, "%d", &n);
    for (i = 1; i <= n; i++)
        h += 1.0 / i;
    fclose(fp);
    fp = fopen("harmony.out", "w");
    fprintf(fp, "%.3f\n", h);
    fclose(fp);
    return 0;
}
```

---

### 2-7 近似计算 (approximation)

##### 题目：

计算 $\frac{\pi}{4}=1−\frac{1}{3}+\frac{1}{5}−\frac{1}{7}+\cdots$，直到最后一项小于 $10^{−6}$。

##### 思路：

用一个绝对值为 -1 的变量表示符号，每次用完后乘上 -1 就可以修改符号了。

##### 解答：

``` c approximation.c
/* ziqin 2014 */
#include <stdio.h>
int main(void)
{
    double pi;
    int i, one;
    FILE * fp = fopen("approximation.out", "w");
    for (i = 1, one = 1; i <= 1e6; i += 2) {
        pi += (1.0 / i) * one;
        one *= -1;
    }
    pi *= 4;
    fprintf(fp, "%f\n", pi);
    fclose(fp);
    return 0;
}
```

---

### 2-8 子序列的和 (subsequence)

##### 题目：

输入两个正整数 $n<m<10^6$，输出 $\frac{1}{n^2}+\frac{1}{(n+1)^2}+\cdots+\frac{1}{m^2}$，保留 5 位小数。例如 n=2, m=4 时答案是 0.42361；n=65536, m=655360 时答案为 0.00001。注意：本题有陷阱。

##### 思路：

这道题的陷阱在于，分母里的乘法运算可能会因为数过大而溢出。一种方法是，将整数的乘法变为浮点数的乘法，在输入的时候就把 n 和 m 存到浮点型变量里；另一种方法是，把式子化一下，绕过大整数相乘：
$\frac{1}{m^2}=\frac{1}{m}\times\frac{1}{m}=1\div m\div m$

这里放上第二种方法的代码。

##### 解答：

``` c subsequence.c
/* ziqin 2014 */
#include <stdio.h>
int main(void)
{
    int n, m;
    double sum = 0;
    FILE * fp = fopen("subsequence.in", "r");
    fscanf(fp, "%d%d", &n, &m);
    for (; n <= m; n++)
        sum += (1.0 / n) / n;
    fclose(fp);
    fp = fopen("subsequence.out", "w");
    fprintf(fp, "%.5f\n", sum);
    fclose(fp);
    return 0;
}
```

---

### 2-9 分数化小数 (decimal)

##### 题目：

输入正整数 a,b,c，输出 a/b 的小数形式，精确到小数点后 c 位。$a,b\leq 10^6,c\leq 100$。例如 a=1, b=6, c=4 时应输出 0.1667。

##### 分析：

第一眼看到这道题的时候，我想到的是用 `printf()` 来指定输出小数的位数：`printf("%.*d", c, a/b)` 可以做到输出 c 位小数。但仔细想想，这样做并不行。因为本题中规定的 c 的范围为 c ≤ 100，而浮点数的精度没有这么高。因此，需要模拟人列竖式计算的方法。同时，样例输出中的 0.1667 提醒着我们，小数的最后要四舍五入。

##### 解答：

``` cpp decimal.cpp
/* ziqin 2014 */
#include <fstream>
using namespace std;
ifstream fin("decimal.in");
ofstream fout("decimal.out");
int main()
{
    int a, b, c;
    fin >> a >> b >> c;
    fout << a/b << ".";
    for (; c > 1; c--) { // 输出小数点后c-1位
        a = (a%b) * 10;
        fout << a/b;
    }
    a = (a%b) * 10;
    if ((a%b) * 10 / b >= 5) // 第c位由第c+1位四舍五入决定
        fout << a/b + 1 << endl;
    else
        fout << a/b << endl;
    return 0;
}
```

---

### 2-10 排列 (permutation)

##### 题目：

用 1,2,3,⋯,9 组成 3 个三位数 abc, def 和 ghi，每个数字恰好使用一次，要求 abc:def:ghi=1:2:3。输出所有解。提示：不必太动脑筋。

##### 分析：

范围不大，可以枚举来判断。“每个数字恰好使用一次”意味着每个数字只能出现一次并且必须出现一次。由此，我们可以把 abc 的枚举范围限制在 123 和 329 内 (329 = 987 / 3)。于是问题落到了如何判断“每个数字恰好使用一次”。对于这一点，子勤没有想出方法来，看了看汝佳大大的答案，才发现，可以从“每个数字必须出现一次”出发，在 abcdefghi 查找 1～9，看看每个数字是否都能找到。如果都找到了，也就意味着不会有重复的，因为 abcdefghi 只有九位。

##### 解答：

``` cpp permutation.cpp
/* ziqin 2014 */
#include <fstream>
using namespace std;
ofstream fout("permutation.out");
int main()
{
    for (int abc = 123; abc <= 329; abc++) {
        int def = 2 * abc, ghi = 3 * abc;
        int abcdefghi = abc*1e6 + def*1e3 + ghi; // 串成 abcdefghi
        bool yes = true;
        for (int i = 1; i <= 9; i++) {
            bool notfind = true;
            for (int j = abcdefghi; j > 0; j /= 10)
                if (j%10 == i) { notfind = false; break; } // 对每一位进行查找
            if (notfind) { yes = false; break; }
        }
        if(yes)
            fout << abc << ' ' << def << ' ' << ghi << endl;
    }
    return 0;
}
```

---

[![本文以 CC BY-SA 3.0 CN 协议发布](/img/cc-by-sa.png "左侧图案的原来源由 Wikimedia 用户 Sting 创作并以 CC BY 2.5 协议授权；右侧图案的原来源由 Creative Commons 创作并以 CC BY 2.0 协议授权。")](https://creativecommons.org/licenses/by-sa/3.0/cn/)