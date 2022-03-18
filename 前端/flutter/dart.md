# 入口   
在main方法中
```dart
main() {}
或者
void main() {}
```     

# 常量    
const： 一开始就要赋值    
final 可以开始不赋值，但是只能赋值一次     

# 数据类型    
1. 字符串定义的几种方式      
var str = 'str';
var str = "str";
String str = 'str';
String str = "str";
String str = ''' str
next
next
''';

2. 数值类型         
int
double

3. bool

4. List数组
指定类型方式
var arr = <String>[];

add方法增加数据类比js的push
remove输出某个元素
removeAt输出某个位置的元素
fillRange(start, end, ele)把[start, end)范围的元素修改为ele
insert(idx, ele)在idx处插入ele
insertAll(dix, [ele, ele2])在idx处插入多个元素
join
split
addAll方法拼接数组 arr.addAll([11]);
indexOf类比js
where类似filter
any类似some

创建固定长度的数组
List.filled(length，填充值)      

属性
List.length: 数组长度
List.isEmpty
List.isNotEmpty
List.reversed  // 对数组倒序排序是一个集合，可以使用toList转换为数组
print(List.reversed.toList());

map方法之后会变成元组，需要使用toList变回list

5. Maps      
var p = {
    "name": "a"
};

var p = new Map();

p.keys.toList()；键名的数组
p.values.toList();
p.addAll({
    'el': 'app'
})
p.containsValue('name') // true

6. 判断类型     
is关键字
str is String    


# isEmpty    
判断字符串是否为空
str.isEmpty

# isNaN
num.isNaN

# Set是没有顺序且不能重复的集合，所以不能用下标访问      
s.addAll([1,1,2]).toList()       


# 函数     
1. 可选参数和带默认值的可选参数   
String foo(String a, [int b, int c = 1]) { // b是可选的
    return ''
}
使用
foo('')
或者
foo('',1)       


2. 泛型方法      
T foo<T>(T a) {
    return a;
}
使用
foo<String>('a');

# 类    
class G {
    String a；
    int b;
    int? c;
    int d;
    //默认构造函数
    // 这里是在构造函数运行之前初始化实例变量b
    G（Stirng x）: b=1 {
        this.a = x;
    }
    // 上面的简写
    // 有命名参数的话
    // 命名参数必传，必须用required修饰或者加上默认值，或者变量为可空类型
    G(this.a, {this.c, this.d = 0});

    // 命名构造函数
    G.e() {
        print('我是命名构造函数')
    }

    static foo() {
        静态方法不能访问非静态变量和非静态方法
    }
}

// 使用默认构造函数创建G
new G('a');
// 使用命名构造函数
new G.e();


连缀操作符
p1.a = 'a';
p1.b = 2;
p1.foo();
等同于
p1..a='a'
  ..b=2
  ..foo();      


2. 泛型类
class C<T> {
    int a;
    List arr = <T>[];
    void foo(T v) {};
}
// 不传入类型,会自己判断
C c = new C();
// 传入会把T都替换为对应的类型
C c = new C<int>();


# 可空类型    
使用？来让一个已经断言的变量可以赋值为null
int? a = 1;
a = null
使用！类型断言表示不为null
[]!.length