title: 《算法竞赛入门经典》3.4.4 重新实现库函数
date: 2014-07-27 10:55:14
categories:
- OI
- 解题报告
- 算法竞赛入门经典
tags:
- OI
- 库函数
- 算法竞赛入门经典
description: 子勤做的《算法竞赛入门经典》3.4.4 “重新实现库函数” 练习。
keywords: OI, 重新实现库函数, 算法竞赛入门经典3.4.4, 算法竞赛入门经典, 解题报告
---

### 练习 1：

只用 `getchar` 函数读入一个整数。假设它占据单独的一行，读到行末为止，包括换行符。输入保证读入的整数可以保存在 `int` 中。

<!-- more -->

``` c
/* ziqin 2014 */
#include <stdio.h>
int input_int(void);
int main(void)
{
	int n;
	n = input_int();
	printf("%d\n", n);
	return 0;
}
int input_int(void)
{
	int n = 0, c;
	for (c = getchar(); c!='\n' && c!=EOF; c=getchar()) {
		n *= 10;
		n += c - '0';
	}
	return n;
}
```

---

### 练习 2：

只用 `fgets` 函数读入一个整数。假设它占据单独的一行，读到行末为止，包括换行符。输入保证读入的整数可以保存在 `int` 中。

``` c
/* ziqin 2014 */
#include <stdio.h>
int input_int(FILE * fp);
int main(void)
{
    int n;
    n = input_int(stdin);
    printf("%d\n", n);
    return 0;
}
int input_int(FILE * fp)
{
    char buf[20];
    int n = 0, i;
    fgets(buf, 20, fp);
    for (i = 0; buf[i] != '\n'; i++) {
        n *= 10;
        n += buf[i] - '0';
    }
    return n;
}
```

---

### 练习 3：

只用 `getchar` 实现 `fgets` 的功能，即用每次一个字符的方式读取整行。

注：未实现 `fgets` 的第 3 个参数，直接从标准输入读入。

``` c
/* ziqin 2014 */
#include <stdio.h>
void my_fgets(char * buf, int maxn);
int main(void)
{
	char s[100];
	my_fgets(s, 100);
	printf("%s", s);
	return 0;
}
void my_fgets(char * buf, int maxn)
{
	int i = 0, c;
	for (c=getchar(); c!='\n' && c!=EOF && i<(maxn-2); c=getchar())
		buf[i++] = (char) c;
	buf[i++] = '\n'; buf[i] = '\0'; // 字符串末尾
}
```

---

### 练习 4：

实现 `strchr` 的功能，即在一个字符串中查找一个字符。

``` c
#include <stdio.h>
char * my_strchr(char * s, char c);
int main(void)
{
	char string[] = "this is a string.\0";
	char * cp = my_strchr(string, 'a');
	if (cp == NULL)
		printf("Not found!\n");
	else
		printf("%s\n", cp);
	return 0;
}
char * my_strchr(char * s, char c)
{
	char * cp = NULL;
	int i;
	// 视'\0'为字符串结束标志
	for(i = 0; s[i] != '\0'; i++) if (s[i] == c) {
		cp = &s[i];
		break;
	}
	return cp;
}
```

---

### 练习 5：

实现 `isalpha` 和 `isdigit` 的功能，即判断字符是否为字母/数字。

``` c
#include <stdio.h>
int my_isalpha(char c);
int my_isdigit(char c);
int main(void)
{
	char c = 'w';
	my_isalpha(c) ?
		printf("%c is alpha.\n", c) :
		printf("%c is not alpha.\n", c);
	my_isdigit(c) ?
		printf("%c is digit.\n", c) :
		printf("%c is not digit.\n", c);
	return 0;
}
int my_isalpha(char c)
{
	return ('A'<=c && c<='Z')||('a'<=c && c<='z');
}
int my_isdigit(char c)
{
	return '0'<=c && c<='9';
}
```

---

[![本文以 CC BY-SA 3.0 CN 协议发布](/img/cc-by-sa.png "左侧图案的原来源由 Wikimedia 用户 Sting 创作并以 CC BY 2.5 协议授权；右侧图案的原来源由 Creative Commons 创作并以 CC BY 2.0 协议授权。")](https://creativecommons.org/licenses/by-sa/3.0/cn/)
