package com.tareksaidee.NewSocial.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.sql.Blob;
import java.util.Base64;
import java.util.Date;

@Data
@Entity
@Table(name = "activity")
public class Activity {

    @Id
    @Column(name = "ac_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer activityID;
    private String user_name;
    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;
    private String visibility;
    private Integer loc_id;


    public Activity() {
    }

    public Activity(String user_name, String title, Date time_stamp, String visibility, Integer loc_id) {
        this.user_name = user_name;
        this.title = title;
        this.time_stamp = time_stamp;
        this.visibility = visibility;
        this.loc_id = loc_id;
    }

    public Integer getActivityID() {
        return activityID;
    }

    public String getUser_name() {
        return user_name;
    }

    public String getTitle() {
        return title;
    }

    public Date getTime_stamp() {
        return time_stamp;
    }

    public String getVisibility() {
        return visibility;
    }

    public Integer getLoc_id() {
        return loc_id;
    }
}
