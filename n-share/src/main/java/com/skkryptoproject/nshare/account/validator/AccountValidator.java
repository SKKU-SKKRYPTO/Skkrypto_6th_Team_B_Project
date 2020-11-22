package com.skkryptoproject.nshare.account.validator;

import com.skkryptoproject.nshare.account.AccountRepository;
import com.skkryptoproject.nshare.account.form.SignUpForm;
import com.skkryptoproject.nshare.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
@RequiredArgsConstructor
public class AccountValidator implements Validator {

    private final AccountRepository accountRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.isAssignableFrom(SignUpForm.class);
    }

    @Override
    public void validate(Object object, Errors errors) {
        SignUpForm signUpForm = (SignUpForm)object;
        if (accountRepository.existsByEmail(signUpForm.getEmail())) {
            errors.rejectValue("email", "invalid.email", new Object[]{signUpForm.getEmail()}, "이미 사용중인 이메일입니다.");
        }

        if (accountRepository.existsByWallet(signUpForm.getWallet())) {
            errors.rejectValue("nickname", "invalid.nickname", new Object[]{signUpForm.getWallet()}, "이미 사용중인 지갑입니다.");
        }
    }
}
