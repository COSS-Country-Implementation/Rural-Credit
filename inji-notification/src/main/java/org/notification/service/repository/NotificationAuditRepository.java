package org.notification.service.repository;

import org.notification.service.entity.NotificationAudit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationAuditRepository extends JpaRepository<NotificationAudit, Long> {
}

