package org.notification.service.dto;

import java.util.Map;

public class NotifyRequest {
    private String cpfNumber;
    private Map<String, Object> request;

    public String getCpfNumber() { return cpfNumber; }
    public void setCpfNumber(String cpfNumber) { this.cpfNumber = cpfNumber; }
    public Map<String, Object> getRequest() { return request; }
    public void setRequest(Map<String, Object> request) { this.request = request; }
}

