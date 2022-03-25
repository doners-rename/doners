package com.doners.donersbackend.application.dto.response.epilogue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("EpilogueBudgetResponseDTO")
@Getter
@ToString
public class EpilogueBudgetResponseDTO {

    @ApiModelProperty(name = "활용 계획")
    private String epilogueBudgetPlan;

    @ApiModelProperty(name = "활용 금액")
    private long epilogueBudgetAmount;

    @Builder
    public EpilogueBudgetResponseDTO(String epilogueBudgetPlan, long epilogueBudgetAmount) {
        this.epilogueBudgetPlan = epilogueBudgetPlan;
        this.epilogueBudgetAmount = epilogueBudgetAmount;
    }
}
