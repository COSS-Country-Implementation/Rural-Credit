package io.mosip.mimoto.dto.mimoto;

import lombok.Data;

import java.util.List;

@Data
public class IdpAuthenticateRequestDto {
    private String requesttime;
    private String linkTransactionId;
    private String individualId;
    private List<IdpChallangeDto> challengeList;
}
