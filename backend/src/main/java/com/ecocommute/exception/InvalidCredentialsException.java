package com.ecocommute.exception;

/**
 * Credenciales invalidas o cuenta inexistente en el inicio de sesion (HU02).
 * Se mapea a HTTP 401 Unauthorized sin exponer si el correo existe o no.
 */
public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException(String message) {
        super(message);
    }
}
