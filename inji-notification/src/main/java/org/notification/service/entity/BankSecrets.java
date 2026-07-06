package org.notification.service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bank_secrets")
public class BankSecrets {
    @Id
    private String bankId;
    private String bankSecret;

    public String getBankId() { return bankId; }
    public void setBankId(String bankId) { this.bankId = bankId; }
    public String getBankSecret() { return bankSecret; }
    public void setBankSecret(String bankSecret) { this.bankSecret = bankSecret; }
}

