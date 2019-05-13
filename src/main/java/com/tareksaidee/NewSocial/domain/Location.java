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
@Table(name = "location")
public class Location {

    @Id
    @Column(name = "loc_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer locationID;
    private String name;
    private String lat;
    @Column(name = "long")
    private String lon;

    public Location() {
    }

    public Location(String name, String lat, String lon) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    public Integer getLocationID() {
        return locationID;
    }

    public String getName() {
        return name;
    }

    public String getLat() {
        return lat;
    }

    public String getLon() {
        return lon;
    }
}
