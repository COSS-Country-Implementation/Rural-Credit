package org.notification.service.repository;

import org.notification.service.entity.BankSecrets;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankSecretsRepository extends JpaRepository<BankSecrets, String> {
}

