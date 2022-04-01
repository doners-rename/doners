package com.doners.donersbackend.application.dto.response.epilogue;

import com.doners.donersbackend.application.dto.response.BaseResponseDTO;
import com.doners.donersbackend.application.dto.response.comment.CommentResponseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
@ApiModel("EpilogueResponseDTO")
@Getter
@ToString
public class EpilogueResponseDTO extends BaseResponseDTO {
    @ApiModelProperty(name = "감사 글 제목")
    private String epilogueTitle;

    @ApiModelProperty(name = "감사 글 조회수")
    private long epilogueViews;

    @ApiModelProperty(name = "감사 글 내용")
    private String epilogueDescription;

    @ApiModelProperty(name = "감사 글 작성일")
    private LocalDateTime epilogueCreateTime;

    @ApiModelProperty(name = "댓글 리스트")
    private List<CommentResponseDTO> commentResponseDTOList;

    @ApiModelProperty(name = "감사 글 작성자 이름")
    private String epilogueWriter;

    @ApiModelProperty(name = "에필로그 이미지")
    private String epilogueImage;

    @ApiModelProperty(name = "댓글 리스트")
    private List<EpilogueBudgetResponseDTO> epilogueBudgetResponseDTOList;

    @ApiModelProperty(name = "기부 ID")
    private String donationId;

    @Builder
    public EpilogueResponseDTO(String epilogueTitle, long epilogueViews, String epilogueDescription,
                               LocalDateTime epilogueCreateTime, List<CommentResponseDTO> commentResponseDTOList, String epilogueWriter,
                               String epilogueImage, List<EpilogueBudgetResponseDTO> epilogueBudgetResponseDTOList, String donationId) {
        this.epilogueTitle = epilogueTitle;
        this.epilogueViews = epilogueViews;
        this.epilogueDescription = epilogueDescription;
        this.epilogueCreateTime = epilogueCreateTime;
        this.commentResponseDTOList = commentResponseDTOList;
        this.epilogueWriter = epilogueWriter;
        this.epilogueImage = epilogueImage;
        this.epilogueBudgetResponseDTOList = epilogueBudgetResponseDTOList;
        this.donationId = donationId;
    }

    public static EpilogueResponseDTO of(String message, Integer statusCode, EpilogueResponseDTO epilogueResponseDTO) {
        EpilogueResponseDTO res = epilogueResponseDTO;
        res.setMessage(message);
        res.setStatusCode(statusCode);

        return res;
    }
}
