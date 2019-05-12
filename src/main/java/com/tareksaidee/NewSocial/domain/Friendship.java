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
public class Friendship {

    @EmbeddedId
    private FriendshipId friendshipId;

    private String request_status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;

    private String visibility;

    public FriendshipId getFriendshipId() {
        return friendshipId;
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

    public Friendship() {
    }

    @Embeddable
    private class FriendshipId implements Serializable {
        @Column(name = "friend_name", nullable = false)
        private String friendName;
        @Column(name = "user_name", nullable = false)
        private String username;

        public FriendshipId(String friendName, String username) {
            this.friendName = friendName;
            this.username = username;
        }

        public FriendshipId() {
        }

        public String getFriendName() {
            return friendName;
        }

        public String getUsername() {
            return username;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof FriendshipId)) return false;
            FriendshipId that = (FriendshipId) o;
            return Objects.equals(getFriendName(), that.getFriendName()) &&
                    Objects.equals(getUsername(), that.getUsername());
        }

        @Override
        public int hashCode() {
            return Objects.hash(getFriendName(), getUsername());
        }
    }
}
