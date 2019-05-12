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
@Table(name = "diary_entry")
public class DiaryEntry {

    @Id
    @Column(name = "entry_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer entryId;
    private String user_name;
    private String title;
    private String body;

    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;
    private String visibility;
    private Integer loc_id;
    @Column(columnDefinition = "blob")
    private Blob media;

    public DiaryEntry() {
    }


    public DiaryEntry(String user_name, String title, String body, Date time_stamp, String visibility, Integer loc_id, Blob media) {
        this.user_name = user_name;
        this.title = title;
        this.body = body;
        this.time_stamp = time_stamp;
        this.visibility = visibility;
        this.loc_id = loc_id;
        this.media = media;
    }

    public Integer getEntryId() {
        return entryId;
    }

    public String getUser_name() {
        return user_name;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
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

    @JsonIgnore
    public Blob getMedia() {
        return media;
    }

    @JsonProperty("media")
    public String getPhotoBase64() throws Exception {
        if (media == null)
            return null;
        // just assuming it is a jpeg. you would need to cater for different media types
        return "data:image/jpeg;base64," + new String(Base64.getEncoder().encode(media.getBytes(1, (int) media.length())));
    }

}
