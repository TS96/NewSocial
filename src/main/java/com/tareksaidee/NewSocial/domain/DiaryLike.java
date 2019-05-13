package com.tareksaidee.NewSocial.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "diary_like")
@IdClass(DiaryLike.LikeId.class)
public class DiaryLike {

    @Id
    @Column(name = "entry_id", nullable = false)
    private Integer entryId;
    @Id
    @Column(name = "user_name", nullable = false)
    private String username;


    public DiaryLike() {
    }

    public DiaryLike(Integer entryId, String username) {
        this.entryId = entryId;
        this.username = username;
    }

    public Integer getEntryId() {
        return entryId;
    }

    public String getUsername() {
        return username;
    }

    @Data
    static class LikeId implements Serializable {
        private Integer entryId;
        private String username;
    }
}
