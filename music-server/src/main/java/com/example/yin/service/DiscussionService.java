package com.example.yin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.yin.common.R;
import com.example.yin.model.domain.Discussion;

/**
 * @version 1.0
 * Create by 2023/4/9 17:22
 * @Author 94447
 */

public interface DiscussionService extends IService<Discussion> {
    R getAllDiscussions();
    R addDiscussion(Discussion discussion);
    R deleteDiscussionById(Integer id);
}