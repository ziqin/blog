---
title: C语言编程中简单的多个源文件管理方法
date: 2013-08-01
categories:
- 技术
tags:
- C语言
- Makefile
---

喜欢折腾 Linux 的朋友，都有过以编译源码来安装软件的经历吧。细心的你一定不难发现，绝大多数软件的源码包里都有由多个源文件。这么做有什么好处呢？又要如何管理它们呢？在此，子勤跟大家分享一下自己的见解。

---

### 为什么用多文件呢

* 结构清晰

多数软件包的源码都会把按照不同的功能模块，把源代码分成多个文件来管理，这样可以使源代码结构清晰，易于阅读，且便于使用版本控制软件对它们进行高效的管理。

* 节约编译时间

我们知道，C语言编译器在编译源代码的时候，一般会先将各个源代码文件（`.c`）编译成目标代码文件（`.o` 或 `.obj`），然后再将目标代码文件连接成可执行文件。如果把源代码分成多个文件进行管理，在修改了个别源代码文件后，只需重新编译修改过的文件及受它影响的文件，并再次连接即可，而不需要重新编译不受影响的文件。这样就可以节约不少编译时间。

<!-- more -->

---

### 一个简单的多文件C语言小程序实例

``` c main.c
/* 将两个整数相加，并输出结果。 */
#include <stdio.h>
#include "add.h"
int main(void)
{
	int a, b, result;
	printf("Please input two integers: ");
	scanf("%d%d", &a, &b);
	result = add_int(a, b);
	printf("%d + %d = %d\n", a, b, result);
	return 0;
}
```
``` c add.h
#ifndef ADD_H
#define ADD_H
int add_int(int x, int y);
#endif
```
``` c add.c
/* 将两个整形参数相加，并返回结果。 */
#include "add.h"
int add_int(int x, int y)
{
	return x + y;
}
```

我们暂且把这个小程序的意思放下，先来编译一下它。

``` bash
$ cc -o main main.c add.c
```

其中，`-o main` 代表生成名为 main 的文件。如果改为用下面的几行命令编译，可以更好地体现编译的过程，并使得目标文件可以重复使用，从而节约编译时间。

``` bash
$ cc -c main.c	# 编译 main.c，生成目标文件 main.o
$ cc -c add.c	# 编译 add.c，生成目标文件 add.o
$ cc -o main main.o add.o  # 连接 main.o add.o，生成可执行文件 main
```

现在，我们只需要运行可执行文件 main 即可。

从上面的三行构建命令中，我们不难看出，main.o 受到 main.c 的影响，add.o 受到 add.c 的影响。由于 main.c 和 add.c 中 `include` 了 add.h，所以 main.o 和 add.o 也会受到 add.h 的影响。而最后生成的 main 会受到 main.o 和 add.o 的影响。这是它们之间的「依赖关系」。

记得上面说到，不需要重新编译不受影响的文件，在这个例子里，如果我们修改了 add.c 文件，而其他的文件未变动，只需执行以下命令即可。

``` bash
$ cc -c add.c	# 编译 add.c，生成目标文件 add.o
$ cc -o main main.o add.o  # 连接 main.o add.o，生成可执行文件 main
```

这样就免去了编译 main.c 的时间。有的人可能会不写 add.h，而是直接在 main.c 中 `#include "add.c"`，然后直接编译 main.c，那就没有节约编译时间这个优点了。

---

### 使用自动构建工具

看了上面的几条命令，你可能会问，如果我把一个程序分成多个源文件，那么每次编译，不就得输入一大堆命令吗？这样做太麻烦了吧，用于输命令的时间甚至比用于编译的时间还要多，尤其是在源文件较多的时候。别怕，我们有自动化构建工具 make。我们只要把文件之间的依赖关系描述好，每次构建时，只需输入一条命令，make 就能自己判断出哪些文件需要重新编译，而哪些不用，并根据指定的命令把整个程序构建出来。这样就不用每次都输入一大堆的命令，又能节约编译时间。

那么，怎么做才能自动构建呢？

如果要使用 GNU make 来自动构建一个程序，需要为这个程序编写一个用于描述各个文件之间的依赖关系以及指定编译命令的名为 `Makefile` 的文件。

我们先来为上面的小程序写个简单的 Makefile：

``` makefile
main: main.o add.o
	cc -o main main.o add.o
main.o: main.c add.h
	cc -c main.c
add.o: add.c add.h
	cc -c add.c
```

在源代码目录下执行 make 时，make 会自动查找目录中名为 Makefile 的文件，然后进行编译。

细心的朋友应该可以发现，Makefile 其实是文件依赖关系和编译命令的结合。比如第一行 `main: main.o add.o` 表示的是，main 是要构建的目标，main 会受到 main.o 和 add.o 的影响（main 依赖于 main.o 和 add.o），如果 main 不存在，或是 main.o 或 add.o 比 main 新（make 会根据文件的最近修改时间来判断文件之间相对的新旧），就要执行下面（行要以 Tab 开头）的命令 `cc -o main main.o add.o` 来构建 main。

简单点说，就是用一行来描述依赖关系，用接着的行来指定编译用的命令。

不过，朋友们可能还会注意到，Makefile 中命令的顺序和上面的原始编译命令的不太一样。但如果执行 make，则屏幕显示的命令却又和原始的一样。显然，程序执行的顺序跟原始的是相同的。Makefile 中的第一个目标代表最终目标，而最终目标往往是最后才连接的，所以就有了顺序上的不同。make 执行的时候，它先看到 main，main 依赖 main.o，然后 make 就会到目录中找 main.o。如果 main.o 过期了，或者没找到 main.o，就往下看 Makefile，根据后面的规则来构建 main.o，再回过头来构建 main。make 就是这样一层一层地往下找，直到最后把 main 构建出来。

在写 Makefile 的时候，还可以用变量，这给我们带来了很大的方便。举个例子吧：

``` makefile
CC = gcc
main: main.o add.o
	$(CC) -o main main.o add.o
main.o: main.c add.h
	$(CC) -c main.c
add.o: add.c add.h
	$(CC) -c add.c
```

第一行里定义了一个名字叫 `CC` 的变量，并在后面以 `$(CC)` 的形式引用它。在这里，用 `$(CC)` 表示编译器，如果要使用其他的编译器，只需更改第一行即可，例如 `CC = tcc`，很方便吧。

事实上，make 并不关心所执行的是否为编译命令。因此，我们还可以利用这一特点来实现安装、清理等功能。比如，我们可以在上面那个 Makefile 的后面加上两行代码来实现编译清理功能：

``` makefile
clean:
	rm main main.o add.o
```

make 允许只构建某个目标，因此我们可以执行 `make clean`，来“欺骗” make，让它清理编译生成的文件。

我们还可以把 Makefile 写成这个样子：

``` makefile
CC = gcc
OBJECTS = main.o add.o
main: $(OBJECTS)
	$(CC) -o main $(OBJECTS)
main.o: add.h
add.o: add.h
.PHONY: clean
clean:
	-rm main $(OBJECTS)
```

上面的 Makefile 看上去挺有趣吧，不过子勤不解释它的意思哦。如果想了解更多关于 Makefile 的知识，可以看看陈皓的[《跟我一起写 Makefile》](http://wiki.ubuntu.org.cn/%E8%B7%9F%E6%88%91%E4%B8%80%E8%B5%B7%E5%86%99Makefile)，那里有很详细的讲解。

---

### 头文件的写法

说实话，子勤对怎么写也不太懂，还在学习中。不过，也把自己的想法记下来吧。

在编写程序的时候，我们应按照模块化的思路，把一个程序按照其功能模块分成多个源文件（这里特指 .c 文件）来编写。说说上面那个将两个数相加的例子吧，在 main.c 中负责数据的输入和输出，在 add.c 中负责加法计算。那 add.h 是用来干什么的？其实，这个头文件是用来向编译器说明的。对于 main.c 来说，用到了 `add_int()`，而 `add_int()` 在其他文件里，如果编译 main.c 时不知道它是啥，编译器就会报错。于是，我们写一个 add.h，在编译 main.c 时告诉编译器，`add_int()` 是个返回值为整型、参数为两个整型变量的函数，即告诉了编译器 `add_int()` 是什么，它就能正常编译了。所以，我们要把函数定义写在 .c 文件里，把函数声明写在头文件里，然后在要调用该函数的源文件里 `include` 对应的头文件。

然而，add.h 里除了函数声明，还有如下几行东东：

``` c add.h
#ifndef ADD_H
#define ADD_H
....
#endif
```

它们分别位于文件的开头和结尾，把文件内容框起来了。它们有什么作用呢？

原来，它们的大名叫条件编译指令。其实，它们的意思不难理解，顾名思义即可。第一行，检查，如果没有定义（if no define）名为 `ADD_H` 的宏，则要编译以下的部分，直到相对应的条件编译结束（end if）。也就是说，在这个例子里，`#ifndef` 和 `#endif` 是一对的。这么写的理由，其实不难理解，就是为了防止重复包含相同的内容。第一遍的时候，检查有没有定义 `ADD_H` 宏，判断结果是没有定义，即成立，接着会定义 `ADD_H` 宏，然后进行声明。如果第二次还想包含同样的内容时，会先检查有没有定义 `ADD_H` 宏，由于已经包含一次了，所以定义了该宏，则不成立，就会跳过 `#ifndef` 到 `#endif` 间的内容。这样就避免了重复包含相同的内容。如果我们翻看 C 库，会发现头文件也是这么包装的，不过代表文件名的宏名常常以下划线 `_` 开头。其实，上面的小程序非常简单，并没有存在重复包含的情况，也没有人会在相邻的地方重复 `include` 两个相同文件。但在文件较多或者与他人协同开发等情况下，就不容易避免了，例如下面这个例子：

``` c head1.h
....
```
``` c head2.h
#include "head1.h"
....
```
``` c main.c
#include "head1.h"
#include "head2.h"
....
```

预处理的时候，如果没有上述的条件编译指令，就会把 head1.h 的内容两次包含到 main.c 里，导致重复包含。不过，函数声明是允许重复的。既然如此，那么，为什么要防止重复包含呢？因为，头文件中也可能会有定义嘛。慢着，不是说函数定义要写在 `.c` 文件里吗？这里指的是像下面这样的“定义”：

``` c
// 结构体类型定义，有时也被称作结构体类型声明
struct struct_name { .... };
struct struct_name { .... };
```
```
// 宏定义
#define NUM 2
#define NUM 3
```

如果代码里重复定义了结构体类型，编译器会报错；如果代码里重复定义了宏，且值不同，编译器会给出警告。所以，我们往往用前面提到的条件编译包装法来避免重复定义。

此外，还要注意全局变量（外部变量），比如把那个加法运算的例子改成这样：

``` c main.h
#ifndef MAIN_H
#define MAIN_H
extern int a, b, result;
#endif /* End main.h */
```
``` c main.c
/* 调用 add_int() 将两个整数相加，并输出结果。 */
#include <stdio.h>
#include "main.h"
#include "add.h"
int a, b, result;
int main(void)
{
	printf("Please input two integers: ");
	scanf("%d%d", &a, &b);
	add_int();
	printf("%d + %d = %d\n", a, b, result);
	return 0;
}
```
``` c add.h
#ifndef ADD_H
#define ADD_H
void add_int(void);
#endif /* End add.h */
```
``` c add.c
#include "main.h"
#include "add.h"
void add_int(void)
{
	result = a + b;
}
```
``` makefile
CC = gcc
OBJECTS = main.o add.o
main: $(OBJECTS)
	$(CC) -o main $(OBJECTS)
main.o: main.h add.h
add.o: main.h add.h
.PHONY: clean
clean:
	-rm main $(OBJECTS)
```

修改后的代码，使用了全局变量，从而免去了函数传递参数时的拷贝工作。不过，为了在编译 add.c 的时候编译器能够认识这些全局变量，我们需要写一个 main.h，用 `extern` 修饰符来告诉编译器：变量 x、y、result 是外来的。（不过据子勤测试，即使没有加上 `extern` 修饰符，GCC(v4.7.2) 也不会报错，但 tcc 会报错。所以还是写上 `extern`。）

---

子勤是 C 编程新手，所以这篇博文难免有错漏之处，希望朋友们能够在下面的评论框中指出，谢谢。