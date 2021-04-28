var age = 18;
var height = 180.5;
console.log(age, height);
var str = 'str';
console.log(str);
var b = true;
var c = false;
// enum类型 枚举
var REN;
(function (REN) {
    REN[REN["nan"] = 0] = "nan";
    REN[REN["nv"] = 1] = "nv";
    REN[REN["y"] = 2] = "y";
})(REN || (REN = {}));
console.log(REN.nan); // 打印的是下标
var RN;
(function (RN) {
    RN["nan"] = "m";
    RN["nv"] = "w";
    RN["y"] = "x";
})(RN || (RN = {}));
console.log(RN.nan); // 打印的是值
//any类型 声明之后类型可以随意转换
var t = 100;
t = 'str';
t = true;
