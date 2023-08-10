package com.example.Strange505.board.controller;

import com.example.Strange505.board.dto.BoardRequestDto;
import com.example.Strange505.board.dto.BoardResponseDto;
import com.example.Strange505.board.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@Tag(name = "Board", description = "게시판 API")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    @Operation(summary = "게시판 등록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시판 등록에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "관리자가 아니므로 등록할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시판 등록 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<BoardResponseDto> registerBoard(@RequestBody BoardRequestDto boardRequestDto) {
        BoardResponseDto boardResponseDto = boardService.createBoard(boardRequestDto);
        return new ResponseEntity(boardResponseDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(summary = "게시판 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시판 수정에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "관리자가 아니므로 수정할 수 없습니다."),
            @ApiResponse(responseCode = "500", description = "게시판 수정 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<BoardResponseDto> modifyBoard(@PathVariable Long id, @RequestBody BoardRequestDto boardRequestDto) {
        BoardResponseDto boardResponseDto = boardService.updateBoard(id, boardRequestDto);
        return new ResponseEntity(boardResponseDto, HttpStatus.OK);
    }

    @GetMapping
    @Operation(summary = "게시판 모두 불러오기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시판 조회에 성공했습니다."),
            @ApiResponse(responseCode = "500", description = "게시판 조회 과정에서 서버 오류가 발생했습니다."),
    })
    public ResponseEntity<List<BoardResponseDto>> getAllBoards() {
        List<BoardResponseDto> dtoList = boardService.getAllBoards();
        return new ResponseEntity(dtoList, HttpStatus.OK);
    }
}
