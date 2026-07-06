package org.notification.service.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "device_mapping")
public class DeviceMapping {
    @Id
    private String cpfNumber;
    private String deviceFcmToken;
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public String getCpfNumber() { return cpfNumber; }
    public void setCpfNumber(String cpfNumber) { this.cpfNumber = cpfNumber; }
    public String getDeviceFcmToken() { return deviceFcmToken; }
    public void setDeviceFcmToken(String deviceFcmToken) { this.deviceFcmToken = deviceFcmToken; }
}

