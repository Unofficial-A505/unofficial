package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Board;
import com.example.Strange505.board.dto.BoardDTO;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final ArticleRepository articleRepository;

    @Override
    public Board createBoard(BoardDTO boardDTO) {
        Board board = Board.builder()
                .name(boardDTO.getName())
                .createTime(boardDTO.getCreateTime())
                .modifyTime(boardDTO.getModifyTime())
                .build();
        Board save = boardRepository.save(board);
        return save;
    }

    @Override
    public void updateBoard(Long id, BoardDTO boardDTO) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        board.update(boardDTO.getName(), boardDTO.getModifyTime());
        boardRepository.save(board);
    }

    @Override
    public void deleteBoardWithArticles(Long id) {
//        articleRepository.deleteByBoard();
        boardRepository.deleteById(id);
    }
}
