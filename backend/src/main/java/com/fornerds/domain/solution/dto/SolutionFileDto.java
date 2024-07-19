package com.fornerds.domain.solution.dto;

import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.entity.SolutionFile;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionFileDto {
    private Long id;
    private String path;
    private String fileName;
    private Long fileSize;

    public SolutionFile toEntity(Solution solution) {
        return SolutionFile.builder()
                .path(path)
                .fileName(fileName)
                .fileSize(fileSize)
                .solution(solution)
                .build();
    }

    public static SolutionFileDto fromEntity(SolutionFile solutionFile) {
        return SolutionFileDto.builder()
                .id(solutionFile.getId())
                .path(solutionFile.getPath())
                .fileName(solutionFile.getFileName())
                .fileSize(solutionFile.getFileSize())
                .build();
    }
}