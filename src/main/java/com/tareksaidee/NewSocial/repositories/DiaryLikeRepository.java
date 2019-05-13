package com.tareksaidee.NewSocial.repositories;

import com.tareksaidee.NewSocial.domain.DiaryComment;
import com.tareksaidee.NewSocial.domain.DiaryLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryLikeRepository extends JpaRepository<DiaryLike, Long> {

    @Query("SELECT count(d) as likecount FROM DiaryLike d WHERE d.entryId = :entryID GROUP BY d.entryId")
    Long getDiaryLikes(@Param("entryID") Integer entryID);

}
