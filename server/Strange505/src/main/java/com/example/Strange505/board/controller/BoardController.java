package com.example.Strange505.board.controller;

import com.example.Strange505.board.dto.BoardRequestDto;
import com.example.Strange505.board.dto.BoardResponseDto;
import com.example.Strange505.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<BoardResponseDto> createBoard(@RequestBody BoardRequestDto boardRequestDto) {
        BoardResponseDto boardResponseDto = boardService.createBoard(boardRequestDto);
        return new ResponseEntity(boardResponseDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardResponseDto> modifyBoard(@PathVariable Long id, @RequestBody BoardRequestDto boardRequestDto) {
        BoardResponseDto boardResponseDto = boardService.updateBoard(id, boardRequestDto);
        return new ResponseEntity(boardResponseDto, HttpStatus.OK);
    }
}
