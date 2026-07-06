package io.mosip.mimoto.dto.mimoto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IdpConsentRequestDto {
    private String linkedTransactionId;
    private List<String> acceptedClaims;
    private List<String> permittedAuthorizeScopes;
}
