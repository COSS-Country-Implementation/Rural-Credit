package io.mosip.mimoto.dto.mimoto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IdpAuthRequestDto {
    private String requestTime;
    private IdpAuthInternalRequestDto request;
}
