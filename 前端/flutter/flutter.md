# <center>Flutter</center>
---   

### 使用外部的package   
1. 寻找需要的包[地址](https://pub.flutter-io.cn/), 以english_words包为例
2. 在项目的pubspec.yaml 文件中添加对应的包和版本注意缩进    
> dependencies:   
&nbsp;&nbsp;flutter:   
&nbsp;&nbsp;&nbsp;&nbsp;sdk: flutter   
&nbsp;&nbsp;english_words: ^4.0.0   
3. 运行时控制台应该可以看到    
```
flutter pub get
Running "flutter pub get" in startup_namer...
Process finished with exit code 0
```
4. 在 lib/main.dart 中引入   
```
import 'package:english_words/english_words.dart';
```
5. 使用