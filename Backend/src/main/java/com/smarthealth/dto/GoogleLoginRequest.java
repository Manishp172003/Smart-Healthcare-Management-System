package com.smarthealth.dto;

public class GoogleLoginRequest {
    private String credential;
    private String role; // "PATIENT" or "DOCTOR"

    public GoogleLoginRequest() {}

    public GoogleLoginRequest(String credential, String role) {
        this.credential = credential;
        this.role = role;
    }

    public String getCredential() {
        return credential;
    }

    public void setCredential(String credential) {
        this.credential = credential;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
