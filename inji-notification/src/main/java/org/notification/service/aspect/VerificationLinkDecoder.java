package org.notification.service.aspect;

import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;
import java.util.Base64;

public class VerificationLinkDecoder {
    public static VerificationLinkInfo decode(String base64Link) {
        String decoded = new String(Base64.getDecoder().decode(base64Link), StandardCharsets.UTF_8);
        String requestId = extractState(decoded);
        String vcs = extractVcs(decoded);
        return new VerificationLinkInfo(requestId, vcs);
    }

    private static String extractState(String url) {
        Pattern pattern = Pattern.compile("state=([^&]+)");
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    private static String extractVcs(String url) {
        List<String> vcsList = new ArrayList<>();
        Pattern pattern = Pattern.compile("pattern%22%3A%22([A-Za-z]+)" );
        Matcher matcher = pattern.matcher(url);
        while (matcher.find()) {
            vcsList.add(matcher.group(1));
        }
        return String.join(",", vcsList);
    }
}

class VerificationLinkInfo {
    private String requestId;
    private String vcs;

    public VerificationLinkInfo(String requestId, String vcs) {
        this.requestId = requestId;
        this.vcs = vcs;
    }
    public String getRequestId() { return requestId; }
    public String getVcs() { return vcs; }
}

