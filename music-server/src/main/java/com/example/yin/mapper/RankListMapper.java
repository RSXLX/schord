package com.example.yin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.yin.model.domain.RankList;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RankListMapper extends BaseMapper<RankList> {
    int selectScoreSum(Long songListId);
    Integer selectUserRank(@Param("consumer_id") Long consumerId, @Param("song_list_id")  Long songListId);
}
