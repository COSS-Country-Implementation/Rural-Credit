package org.notification.service.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(DeviceNotFoundException.class)
    public ResponseEntity<Object> handleDeviceNotFound(DeviceNotFoundException ex) {
        logger.warn("Device not found: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Device not found", ex.getMessage()));
    }

    @ExceptionHandler(NotificationSendException.class)
    public ResponseEntity<Object> handleNotificationSend(NotificationSendException ex) {
        logger.error("Notification send failed: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body(new ErrorResponse("Notification send failed", ex.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException ex) {
        logger.warn("Bad request: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Bad request", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneral(Exception ex) {
        logger.error("Unexpected error: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Unexpected error", ex.getMessage()));
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
}

