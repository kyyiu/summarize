// 最大公约数
function gcd(a,b) {
    while(b) {
        const t = b%a
        a = b
        b = t
    }
    return a
}
// 最小公倍数
function lcm(a, b) {
    return (a*b)/gcd(a, b)
}
console.log(gcd(8,4))