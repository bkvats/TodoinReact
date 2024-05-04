export default function decrypt(s) {
    let password = "";
    let i = 0;
    let j;
    let temp = "";
    let k;
    while (i < s.length) {
        j = i + 1;
        temp = Number(s[j]);
        k = 0;
        while (j < s.length && !isNaN(temp)) {
            k = k * 10 + temp;
            j++;
            temp = Number(s[j]);4
        }
        password += String.fromCharCode(s[i].charCodeAt(0) - k);
        i = j;
    }
    return password;
}