package com.ssf.member.global.signin.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SignInConstants {

    DEFAULT_SIGN_IN_REQUEST_URL("/api/user/sign-in"),
    HTTP_METHOD("POST"),
    CONTENT_TYPE("application/json"),
    USERNAME_KEY("email"),
    PASSWORD_KEY("password");

    private final String value;
}
