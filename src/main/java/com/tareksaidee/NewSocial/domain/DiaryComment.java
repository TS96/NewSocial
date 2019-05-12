package com.tareksaidee.NewSocial.domain;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "diary_comment")
public class DiaryComment {

    @Id
    @Column(name = "comment_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    private Integer entry_id;
    private String user_name;
    private String body;

    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;

    public DiaryComment() {
    }

    public DiaryComment(Integer entry_id, String user_name, String body, Date time_stamp) {
        this.entry_id = entry_id;
        this.user_name = user_name;
        this.body = body;
        this.time_stamp = time_stamp;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public Integer getEntry_id() {
        return entry_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public String getBody() {
        return body;
    }

    public Date getTime_stamp() {
        return time_stamp;
    }
}
