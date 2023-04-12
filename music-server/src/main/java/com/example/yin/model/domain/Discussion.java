package com.example.yin.model.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@TableName(value = "discussion")
@Data
public class Discussion implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;
    private Integer userId;
    private String content;
    private Timestamp createTime;

    // 省略 getter 和 setter 方法
}