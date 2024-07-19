package com.fornerds.domain.solution.service;

import com.fornerds.domain.solution.dto.SolutionFileDto;
import com.fornerds.domain.solution.entity.Solution;
import com.fornerds.domain.solution.entity.SolutionFile;
import com.fornerds.domain.solution.repository.SolutionFileRepository;
import com.fornerds.global.util.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // 생성자 자동 생성
@Transactional
public class SolutionFileService {

    private final SolutionFileRepository solutionFileRepository;

    private final String FILE_UPLOAD_PATH = "uploads/solutions";

    // 생성자 제거

    public List<SolutionFileDto> saveSolutionFiles(Solution solution, List<MultipartFile> files) {
        return files.stream().map(file -> {
            try {
                String originalFilename = file.getOriginalFilename();
                String filePath = FILE_UPLOAD_PATH + "/" + solution.getId() + "/" + originalFilename;
                FileUtils.saveFile(file, filePath);
                SolutionFileDto solutionFileDto = new SolutionFileDto();
                solutionFileDto.setFileName(originalFilename);
                solutionFileDto.setPath(filePath);
                solutionFileDto.setFileSize(file.getSize());
                SolutionFile savedFile = solutionFileRepository.save(solutionFileDto.toEntity(solution));
                return SolutionFileDto.fromEntity(savedFile);
            } catch (IOException e) {
                // 예외 처리
                return null;
            }
        }).collect(Collectors.toList());
    }


    public List<SolutionFileDto> getSolutionFilesBySolution(Solution solution) {
        return solutionFileRepository.findBySolution(solution).stream()
                .map(SolutionFileDto::fromEntity)
                .collect(Collectors.toList());
    }
}