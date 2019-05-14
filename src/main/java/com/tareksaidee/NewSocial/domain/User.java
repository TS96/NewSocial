package com.tareksaidee.NewSocial.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@ToString(exclude = "password")
@Table(name = "users")
public class User {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();


    @Id
    @Column(name = "user_name", nullable = false)
    private String username;
    private String email;
    private String first_name;
    private String last_name;
    private
    String password;

    @Temporal(TemporalType.DATE)
    private Date dob;
    private String city;
    private String country;

    public User() {
    }

    public User(String username, String email, String first_name, String last_name, Date dob, String city, String country, String password) {
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.dob = dob;
        this.city = city;
        this.country = country;
        this.setPassword(password);
    }

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getPassword() {
        return password;
    }

    public Date getDob() {
        return dob;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }
}
