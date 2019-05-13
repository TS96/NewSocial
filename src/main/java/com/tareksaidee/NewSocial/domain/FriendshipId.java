package com.tareksaidee.NewSocial.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class FriendshipId implements Serializable {

    private String friendName;
    private String username;


}