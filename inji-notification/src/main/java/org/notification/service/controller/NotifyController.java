package org.notification.service.controller;

import org.notification.service.dto.NotifyRequest;
import org.notification.service.service.NotifyService;
import org.notification.service.repository.BankSecretsRepository;
import org.notification.service.entity.BankSecrets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notify")
public class NotifyController {
    private static final Logger logger = LoggerFactory.getLogger(NotifyController.class);
    private final NotifyService notifyService;

    @Autowired
    private BankSecretsRepository bankSecretsRepository;

    public NotifyController(NotifyService notifyService) {
        this.notifyService = notifyService;
    }

    @PostMapping
    public ResponseEntity<?> notify(@RequestHeader("x-bank-id") String bankId,
                                    @RequestHeader("x-bank-secret") String bankSecret,
                                    @RequestBody NotifyRequest request) {
        BankSecrets secret = bankSecretsRepository.findById(bankId).orElse(null);
        if (secret == null || !bankSecret.equals(secret.getBankSecret())) {
            logger.warn("Unauthorized: Invalid bankId or bankSecret");
            return ResponseEntity.status(401).body(new ErrorResponse("Unauthorized", "Invalid bankId or bankSecret"));
        }
        notifyService.notify(request);
        return ResponseEntity.ok().body(new SuccessResponse("Notification Sent"));
    }

    static class ErrorResponse {
        private String error;
        private String cause;
        public ErrorResponse(String error, String cause) {
            this.error = error;
            this.cause = cause;
        }
        public String getError() { return error; }
        public String getCause() { return cause; }
    }

    static class SuccessResponse {
        private String message;
        public SuccessResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
    }
}
