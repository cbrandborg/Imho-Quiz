const crypter = {

    // A js object which contains the function for encrypting and decrypting data
    encryptAndDecrypt: (input) => {
        if (input !== undefined && input.length !== 0) {
            //Encrypt key
            const key = ['L', 'Y', 'N'];
            let output = "";
            for (let i = 0; i < input.length; i++) {
                output += (String.fromCharCode((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
            }
            return output;
        } else {
            return input;
        }
    }
};