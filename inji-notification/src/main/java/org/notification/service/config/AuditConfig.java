package org.notification.service.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuditConfig {

    @Value("${audit.enabled:true}")
    private boolean auditEnabled;

    public boolean isAuditEnabled() {
        return auditEnabled;
    }
}