package com.tareksaidee.NewSocial.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Data
@Entity
@Table(name = "diary_like")
public class DiaryLike {

    @EmbeddedId
    private LikeId likeId;


    public LikeId getLikeId() {
        return likeId;
    }

    public DiaryLike() {
    }

    public DiaryLike(LikeId likeId) {
        this.likeId = likeId;
    }

    @Embeddable
    private class LikeId implements Serializable {
        @Column(name = "entry_id", nullable = false)
        private Integer entryId;
        @Column(name = "user_name", nullable = false)
        private String username;

        public LikeId(Integer friendName, String username) {
            this.entryId = friendName;
            this.username = username;
        }

        public LikeId() {
        }

        public Integer getEntryId() {
            return entryId;
        }

        public String getUsername() {
            return username;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof LikeId)) return false;
            LikeId that = (LikeId) o;
            return Objects.equals(getEntryId(), that.getEntryId()) &&
                    Objects.equals(getUsername(), that.getUsername());
        }

        @Override
        public int hashCode() {
            return Objects.hash(getEntryId(), getUsername());
        }
    }
}
