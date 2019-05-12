package com.tareksaidee.NewSocial.controllers;

import com.tareksaidee.NewSocial.domain.User;
import com.tareksaidee.NewSocial.services.SpringDataJpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Controller
public class HomeController {

    @Autowired
    SpringDataJpaUserDetailsService springDataJpaUserDetailsService;

    @RequestMapping(value = {"/", "/user-*", "home"})
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/getUser", method = RequestMethod.GET)
    @ResponseBody
    public User getUser(@RequestParam String username) {
        return springDataJpaUserDetailsService.getRepository().findByUsername(username);
    }

    @PostMapping(value = "/register")
    public ResponseEntity register(@ModelAttribute User user) {
        System.out.println(user);
        springDataJpaUserDetailsService.getRepository().save(user);
        return ResponseEntity.accepted().build();
    }

    @RequestMapping(value = "/username", method = RequestMethod.GET)
    @ResponseBody
    public String currentUserName(Principal principal) {
        return principal.getName();
    }

}
