package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.BoardRequestDto;
import com.example.Strange505.board.dto.BoardResponseDto;
import com.example.Strange505.board.repository.BoardRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
//    private final ArticleRepository articleRepository;

    @Override
    @Transactional
    public BoardResponseDto createBoard(BoardRequestDto dto) {
        Board board = dto.dtoToEntity(dto);
        Board save = boardRepository.save(board);
        return new BoardResponseDto(save);
    }

    @Override
    @Transactional
    public BoardResponseDto updateBoard(Long id, BoardRequestDto dto) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        board.update(dto.getName(), LocalDateTime.now());
        Board save = boardRepository.save(board);
        return new BoardResponseDto(save);
    }

    @Override
    public List<BoardResponseDto> getAllBoards() {
        List<Board> list = boardRepository.findAll();
        list.sort((a, b) -> a.getSequence() - b.getSequence());
        List<BoardResponseDto> dtoList = new ArrayList<>();
        list.stream().forEach(findAll -> dtoList.add
                (new BoardResponseDto(findAll)));
        return dtoList;
    }

//    @Override
//    public void deleteBoardWithArticles(Long id) {
//        articleRepository.deleteByBoard();
//        boardRepository.deleteById(id);
//    }
}
