package com.tareksaidee.NewSocial.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "activity_like")
@IdClass(ActivityLike.LikeId.class)
public class ActivityLike {

    @Id
    @Column(name = "ac_id", nullable = false)
    private Integer acID;
    @Id
    @Column(name = "user_name", nullable = false)
    private String username;


    public ActivityLike() {
    }

    public ActivityLike(Integer acID, String username) {
        this.acID = acID;
        this.username = username;
    }

    public Integer getEntryId() {
        return acID;
    }

    public String getUsername() {
        return username;
    }

    @Data
    static class LikeId implements Serializable {
        private Integer acID;
        private String username;
    }
}
