export default function decrypt(s) {
    let password = "";
    let i = 0;
    let temp;
    let k;
    while (i < s.length) {
        temp = s.slice(i, i + 2);
        password += String.fromCharCode(temp.charCodeAt(0) - Number(temp[1]))
        i += 2;
    }
    return password;
}