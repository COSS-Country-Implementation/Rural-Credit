package io.inji.verify.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.inji.verify.services.VcParseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class VcParseServiceImpl implements VcParseService {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Boolean getIsOver18(String vcJson) {
        try {
            log.info("Parsing VC to extract dateOfBirth");
            JsonNode rootNode = objectMapper.readTree(vcJson);
            JsonNode isOver18Node = rootNode
                    .path("credentialSubject")
                    .path("isOver18");

            if (isOver18Node.isMissingNode() || isOver18Node.isNull()) {
                throw new IllegalArgumentException("dateOfBirth not found in VC");
            }

            return isOver18Node.asText().contains("true")?true:false;

        } catch (Exception e) {
            throw new RuntimeException("Failed to extract dateOfBirth from VC", e);
        }
    }
}
