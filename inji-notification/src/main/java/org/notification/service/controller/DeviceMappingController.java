package org.notification.service.controller;

import org.notification.service.entity.DeviceMapping;
import org.notification.service.repository.DeviceMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/device-mapping")
public class DeviceMappingController {
    @Autowired
    private DeviceMappingRepository deviceMappingRepository;

    @PostMapping
    public ResponseEntity<?> addOrUpdateDeviceMapping(@RequestBody DeviceMapping request) {
        if (request.getCpfNumber() == null || request.getDeviceFcmToken() == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Bad request", "cpfNumber and deviceFcmToken are required"));
        }
        try {
            DeviceMapping mapping = deviceMappingRepository.findById(request.getCpfNumber())
                    .orElse(new DeviceMapping());
            mapping.setCpfNumber(request.getCpfNumber());
            mapping.setDeviceFcmToken(request.getDeviceFcmToken());
            deviceMappingRepository.save(mapping);
            return ResponseEntity.ok(new SuccessResponse("Device mapping saved"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ErrorResponse("Unexpected error", e.getMessage()));
        }
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
