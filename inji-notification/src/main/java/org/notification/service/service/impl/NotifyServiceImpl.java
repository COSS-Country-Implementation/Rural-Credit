package org.notification.service.service.impl;

import com.google.firebase.messaging.FirebaseMessagingException;
import org.notification.service.dto.NotifyRequest;
import org.notification.service.entity.DeviceMapping;
import org.notification.service.exception.DeviceNotFoundException;
import org.notification.service.exception.NotificationSendException;
import org.notification.service.repository.DeviceMappingRepository;
import org.notification.service.service.FirebaseClient;
import org.notification.service.service.NotifyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class NotifyServiceImpl implements NotifyService {
    private static final Logger logger = LoggerFactory.getLogger(NotifyServiceImpl.class);

    private final DeviceMappingRepository deviceMappingRepository;
    private final FirebaseClient firebaseClient;

    public NotifyServiceImpl(DeviceMappingRepository deviceMappingRepository, FirebaseClient firebaseClient) {
        this.deviceMappingRepository = deviceMappingRepository;
        this.firebaseClient = firebaseClient;
    }

    @Override
    public void notify(NotifyRequest request) {
        String cpfNumber = request.getCpfNumber();
        if (cpfNumber == null || request.getRequest() == null) {
            logger.warn("cpfNumber or request missing in NotifyRequest");
            throw new IllegalArgumentException("cpfNumber and request required");
        }
        DeviceMapping mapping = deviceMappingRepository.findById(cpfNumber)
                .orElseThrow(() -> {
                    logger.warn("No device token found for CPF: {}", cpfNumber);
                    return new DeviceNotFoundException("No device token found for CPF " + cpfNumber);
                });
        logger.info("Found device token for CPF: {}", cpfNumber);

        try {
            firebaseClient.sendNotification(mapping.getDeviceFcmToken(), request.getRequest());
        } catch (IOException e) {
            logger.error("IO error while sending notification to CPF {}: {}", cpfNumber, e.getMessage(), e);
            throw new NotificationSendException("IO error while sending notification: " + e.getMessage(), e);
        } catch (FirebaseMessagingException e) {
            logger.error("Firebase error while sending notification to CPF {}: {}", cpfNumber, e.getMessage(), e);
            throw new NotificationSendException("Firebase error while sending notification: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error while sending notification to CPF {}: {}", cpfNumber, e.getMessage(), e);
            throw new NotificationSendException("Unexpected error while sending notification: " + e.getMessage(), e);
        }
        logger.info("Notification sent to CPF: {}", cpfNumber);
    }
}
