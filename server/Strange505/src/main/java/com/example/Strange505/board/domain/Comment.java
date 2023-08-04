package com.example.Strange505.board.domain;

import com.example.Strange505.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Table(name = "Comments")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(length = 20, nullable = false)
    private String nickName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent")
    private List<Comment> children = new ArrayList<>();

    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
    // 삭제 상태 변수
    private boolean isRemoved = false;

    public void addChild(Comment child) {
        children.add(child);
    }

    public void remove() {
        this.isRemoved = true;
    }

    public List<Comment> findRemovableList() {
        List<Comment> result = new ArrayList<>();
        Optional.ofNullable(this.parent).ifPresentOrElse(
                parentComment -> {//대댓글인 경우 (부모가 존재하는 경우)
                    result.add(this);
                },
                () -> {//댓글인 경우
                    if (isAllChildRemoved()) { // 자식 댓글이 다 지워진 경우
                        result.add(this);
                    } else {
                        this.content = "삭제된 댓글입니다.";
                    }
                }
        );

        return result;
    }


    //모든 자식 댓글이 삭제되었는지 판단
    private boolean isAllChildRemoved() {
        return getChildren().stream()
                .map(Comment::isRemoved)//지워졌는지 여부로 바꾼다
                .filter(isDelete -> !isDelete)//지워졌으면 true, 안지워졌으면 false이다. 따라서 filter에 걸러지는 것은 false인 녀석들이고, 있다면 false를 없다면 orElse를 통해 true를 반환한다.
                .findAny()
                //지워지지 않은게 하나라도 있다면 false를 반환
                .orElse(true);//모두 지워졌다면 true를 반환
    }

    public void update(String content, LocalDateTime modifyTime) {
        this.content = content;
        this.modifyTime = modifyTime;
    }
}
