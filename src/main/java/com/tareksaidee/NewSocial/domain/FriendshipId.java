package com.tareksaidee.NewSocial.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

//@EmbeddedId
@Data
public class FriendshipId implements Serializable {

//    @Column(name = "friend_name", nullable = false)
    private String friendName;
//    @Column(name = "user_name", nullable = false)
    private String username;


//    public FriendshipId(String friendName, String username) {
//        this.friendName = friendName;
//        this.username = username;
//    }
//
//    public FriendshipId() {
//    }
//
//    public String getFriendName() {
//        return friendName;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof FriendshipId)) return false;
//        FriendshipId that = (FriendshipId) o;
//        return Objects.equals(getFriendName(), that.getFriendName()) &&
//                Objects.equals(getUsername(), that.getUsername());
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(getFriendName(), getUsername());
//    }
}