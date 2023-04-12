package com.example.yin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.yin.common.R;
import com.example.yin.mapper.DiscussionMapper;
import com.example.yin.model.domain.Discussion;
import com.example.yin.service.DiscussionService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @version 1.0
 * Create by 2023/4/9 17:23
 * @Author 94447
 */


@Service
public class DiscussionServiceImpl extends ServiceImpl<DiscussionMapper, Discussion> implements DiscussionService {
    @Override
    public R getAllDiscussions() {
        List<Discussion> discussions = list(new QueryWrapper<Discussion>().orderByDesc("create_time"));
        return R.success("Discussions fetched successfully", discussions);
    }

    @Override
    public R addDiscussion(Discussion discussion) {
        boolean result = save(discussion);
        if (result) {
            return R.success("Discussion added successfully");
        } else {
            return R.error("Failed to add discussion");
        }
    }

    @Override
    public R deleteDiscussionById(Integer id) {
        boolean result = removeById(id);
        if (result) {
            return R.success("Discussion deleted successfully");
        } else {
            return R.error("Failed to delete discussion");
        }
    }
    }