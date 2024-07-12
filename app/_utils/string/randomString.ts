export const generateRandomString = async (length: number = 12) => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*";
    const allChars = lowercase + uppercase + numbers + specialChars;

    let string = "";

    string += lowercase[Math.floor(Math.random() * lowercase.length)];
    string += uppercase[Math.floor(Math.random() * uppercase.length)];
    string += numbers[Math.floor(Math.random() * numbers.length)];
    string += specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = 4; i < length; i++) {
        string += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return string.split('').sort(() => Math.random() - 0.5).join('');
}