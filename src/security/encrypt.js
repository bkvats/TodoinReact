function getSum(n) {
    let sum = 0;
    for (; n > 0; sum += (n % 10), n = Math.floor(n / 10));
    return sum;
}
export default function encrypt(s) {
    let password = "";
    let sum;
    for (const i of s) {
        sum = getSum(i.charCodeAt(0));
        password += String.fromCharCode(i.charCodeAt(0) + sum) + sum;
    }
    return password;
}