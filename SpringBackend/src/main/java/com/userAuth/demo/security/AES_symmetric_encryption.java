//package com.userAuth.demo.security;
//
//import java.io.UnsupportedEncodingException;
//import java.security.InvalidKeyException;
//import java.security.Key;
//import java.security.NoSuchAlgorithmException;
//import javax.crypto.BadPaddingException;
//import javax.crypto.Cipher;
//import javax.crypto.IllegalBlockSizeException;
//import javax.crypto.NoSuchPaddingException;
//import javax.crypto.spec.SecretKeySpec;
//
//public class AES_symmetric_encryption {
//
//    static byte[] keyBytes = "ThisIsACustomKey".getBytes();
//    static Key key = new SecretKeySpec(keyBytes, "AES");
//
//    static String encrypt(String messaged) throws NoSuchPaddingException, UnsupportedEncodingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException {
//        byte[] message = messaged.getBytes();
//
//        Cipher cipher = Cipher.getInstance("AES");
//
//        // Step 4: Initialize the Cipher object
//        cipher.init(Cipher.ENCRYPT_MODE, key);
//
//        // Step 5: Encrypt the message
//        byte[] ciphertext = cipher.doFinal(message);
//
//        // Step 6: Print the ciphertext
//        System.out.println("message: " + new String(message, "UTF8"));
//        System.out.println("ciphertext: " + new String(ciphertext, "UTF8"));
//        return new String(ciphertext, "UTF8");
//    }
//
//    static String decrypt(String messaged) throws NoSuchPaddingException, UnsupportedEncodingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException {
//        byte[] message = messaged.getBytes("UTF8");
//
//        Cipher cipher = Cipher.getInstance("AES");
//
//        cipher.init(Cipher.DECRYPT_MODE, key);
//
//        // Step 9: Decrypt the ciphertext
//        byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(message));
//        System.out.println("decrypted: " + new String(decrypted, "UTF8"));
//        return new String(decrypted, "UTF8");
//    }
//
//    public static void main(String[] args) throws NoSuchPaddingException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, NoSuchAlgorithmException {
////        System.out.println(encrypt("hello there"));
//        String plaintext = "hello there";
//        String ciphertext = encrypt(plaintext);
//        System.out.println("Encrypted: " + ciphertext);
//
//        String decryptedText = decrypt(ciphertext);
//        System.out.println("Decrypted: " + decryptedText);
//
//    }
//
//
//}
