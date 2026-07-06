package io.inji.verify.dto.ageverification;

import io.inji.verify.enums.VerificationStatus;
import lombok.Data;

@Data
public class AgeVerificationResultDto {
    VerificationStatus verificationStatus;
    Boolean isAdult;
}
