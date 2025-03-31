import CryptoJS from "crypto-js";
// Decryption function (same as backend)
export const decryptData = (
  encryptedData: string,
  password: string
): string => {
  try {
    const [salt, ivHex, encrypted] = encryptedData.split("|");
    if (!salt || !ivHex || !encrypted) {
      throw new Error("Invalid encrypted data");
    }
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 192 / 32,
      iterations: 1,
    });
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return encryptedData; // Return the original data if decryption fails
  }
};

export const password = "Password is used to generate key";
