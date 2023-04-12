package com.example.yin.controller;

import com.example.yin.common.R;
import com.example.yin.model.domain.Discussion;
import com.example.yin.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @version 1.0
 * Create by 2023/4/9 17:24
 * @Author 94447
 */

@RestController
public class DiscussionController {

    @Autowired
    private DiscussionService discussionService;

    @GetMapping("/discussion")
    public R allDiscussions() {
        return discussionService.getAllDiscussions();
    }

    @PostMapping("/discussion/add")
    public R addDiscussion(@RequestBody Discussion discussion) {
        return discussionService.addDiscussion(discussion);
    }

    @DeleteMapping("/discussion/{id}")
    public R deleteDiscussion(@PathVariable("id") Integer id) {
        return discussionService.deleteDiscussionById(id);
    }

}