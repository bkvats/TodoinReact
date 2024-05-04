function getSum(n) {
    let sum = 0;
    for (; n > 0; sum += (n % 10), n = Math.floor(n / 10));
    return sum;
}
export default function encrypt(s) {
    let password = "";
    let sum;
    let i = 0;
    let temp;
    while (i < s.length) {
        temp = s[i];
        sum = getSum(temp.charCodeAt(0)) % 10;
        password += String.fromCharCode(temp.charCodeAt(0) + sum) + sum;
        i++;
    }
    return password;
}