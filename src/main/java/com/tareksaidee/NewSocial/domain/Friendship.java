package com.tareksaidee.NewSocial.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;
import java.util.Objects;

@Data
@Entity
@Table(name = "friendships")
@IdClass(FriendshipId.class)
public class Friendship {

    @Id
    @Column(name = "friend_name", nullable = false)
    private String friendName;
    @Id
    @Column(name = "user_name", nullable = false)
    private String username;
    private String request_status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;

    private String visibility;


    public Friendship() {
    }


    public Friendship(String friendName, String username, String request_status, Date time_stamp, String visibility) {
        this.friendName = friendName;
        this.username = username;
        this.request_status = request_status;
        this.time_stamp = time_stamp;
        this.visibility = visibility;
    }

    public String getFriendName() {
        return friendName;
    }

    public String getUsername() {
        return username;
    }

    public String getRequest_status() {
        return request_status;
    }

    public Date getTime_stamp() {
        return time_stamp;
    }

    public String getVisibility() {
        return visibility;
    }
}
