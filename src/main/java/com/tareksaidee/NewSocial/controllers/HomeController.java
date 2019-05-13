package com.tareksaidee.NewSocial.controllers;

import com.tareksaidee.NewSocial.domain.DiaryComment;
import com.tareksaidee.NewSocial.domain.DiaryEntry;
import com.tareksaidee.NewSocial.domain.User;
import com.tareksaidee.NewSocial.repositories.DiaryCommentRepository;
import com.tareksaidee.NewSocial.repositories.DiaryEntryRepository;
import com.tareksaidee.NewSocial.repositories.DiaryLikeRepository;
import com.tareksaidee.NewSocial.services.SpringDataJpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@Controller
public class HomeController {

    @Autowired
    SpringDataJpaUserDetailsService springDataJpaUserDetailsService;

    @Autowired
    DiaryEntryRepository diaryEntryRepository;

    @Autowired
    DiaryCommentRepository diaryCommentRepository;

    @Autowired
    DiaryLikeRepository diaryLikeRepository;

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

    @RequestMapping(value = "/getAllDiaryEntries", method = RequestMethod.GET)
    @ResponseBody
    public List<DiaryEntry> getAllDiaryEntries(Principal principal) {
        return diaryEntryRepository.getAllDiaryEntries(principal.getName());
    }

    @RequestMapping(value = "/getDiaryComments", method = RequestMethod.GET)
    @ResponseBody
    public List<DiaryComment> getDiaryComments(@RequestParam String entryID) {
        return diaryCommentRepository.getDiaryComments(Integer.parseInt(entryID));
    }

    @RequestMapping(value = "/getDiaryLikes", method = RequestMethod.GET)
    @ResponseBody
    public Long getDiaryLikes(@RequestParam String entryID) {
        return diaryLikeRepository.getDiaryLikes(Integer.parseInt(entryID));
    }

    @PostMapping(value = "/newDiaryComment")
    public ResponseEntity newDiaryComment(@RequestBody DiaryComment diaryComment) {
        diaryCommentRepository.save(diaryComment);
        return ResponseEntity.accepted().build();
    }

    @PostMapping(value = "/newDiaryEntry")
    public ResponseEntity newDiaryEntry(@ModelAttribute DiaryEntry diaryEntry) {
        System.out.println(diaryEntry);
        diaryEntryRepository.save(diaryEntry);
        return ResponseEntity.accepted().build();
    }

}
