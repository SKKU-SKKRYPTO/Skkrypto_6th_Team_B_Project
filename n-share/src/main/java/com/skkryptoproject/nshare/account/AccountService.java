package com.skkryptoproject.nshare.account;

import com.skkryptoproject.nshare.account.form.SignUpForm;
import com.skkryptoproject.nshare.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.Valid;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public Account processNewAccount(SignUpForm signUpForm) {
        //Account newAccount = saveNewAccount(signUpForm);
        //sendSignUpConfirmEmail(newAccount);
        return saveNewAccount(signUpForm);
    }

    private Account saveNewAccount(@Valid SignUpForm signUpForm) {
        //signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
        //Account account = modelMapper.map(signUpForm, Account.class);
        //account.generateEmailCheckToken();
        Account account = Account.builder()
                .email(signUpForm.getEmail())
                .wallet(signUpForm.getWallet())
                .password(signUpForm.getPassword()) //TODO encoding 해야함
                .build();
        return accountRepository.save(account);
    }
}
