package org.notification.service.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification_audit")
public class NotificationAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "issued_by")
    private String issuedBy;

    @Column(name = "is_notification_sent")
    private Boolean isNotificationSent;

    @Column(name = "correlation_id")
    private String correlationId;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "issued_time")
    private LocalDateTime issuedTime;

    @Column(name = "request_id")
    private String requestId;

    @Column(name = "vcs")
    private String vcs;

    // Getters and setters
    // ...


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIssuedBy() {
        return issuedBy;
    }

    public void setIssuedBy(String issuedBy) {
        this.issuedBy = issuedBy;
    }

    public Boolean getNotificationSent() {
        return isNotificationSent;
    }

    public void setNotificationSent(Boolean notificationSent) {
        isNotificationSent = notificationSent;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getIssuedTime() {
        return issuedTime;
    }

    public void setIssuedTime(LocalDateTime issuedTime) {
        this.issuedTime = issuedTime;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getVcs() {
        return vcs;
    }

    public void setVcs(String vcs) {
        this.vcs = vcs;
    }
}

