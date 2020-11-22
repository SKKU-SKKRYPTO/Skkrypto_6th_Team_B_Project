package com.skkryptoproject.nshare.account;

import com.skkryptoproject.nshare.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface AccountRepository extends JpaRepository<Account, Long> {

    boolean existsByEmail(String email);

    boolean existsByWallet(String wallet);
}
