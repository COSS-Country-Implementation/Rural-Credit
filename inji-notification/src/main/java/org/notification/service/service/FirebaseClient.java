package org.notification.service.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

@Component
public class FirebaseClient {

    private static final Logger log = LoggerFactory.getLogger(FirebaseClient.class);

    @Value("${firebase.service.account.path}")
    private String serviceAccountPath;

    private static String staticServiceAccountPath;

    @PostConstruct
    public void init() {
        staticServiceAccountPath = serviceAccountPath;
    }

    public void sendNotification(String deviceToken, Map<String, Object> notificationBody) throws IOException, FirebaseMessagingException {
        initFirebase();

        Map<String, String> notificationMap = (Map<String, String>) notificationBody.get("notification");

        Message message = Message.builder()
                .setToken(deviceToken)
                .setNotification(Notification.builder()
                        .setTitle(notificationMap.get("title"))
                        .setBody(notificationMap.get("body"))
                        .build())
                .putAllData((Map<String, String>) notificationBody.get("data"))
                .build();
        String response = FirebaseMessaging.getInstance().send(message);
        log.info("Successfully sent message: " + response);
    }

    public static void initFirebase() throws IOException {
        File serviceAccountFile = new File(staticServiceAccountPath);
        if (!serviceAccountFile.exists()) {
            throw new RuntimeException("Missing service account file: " + serviceAccountFile.getAbsolutePath());
        }
        FileInputStream serviceAccount = new FileInputStream(serviceAccountFile);

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}
