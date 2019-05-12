package com.tareksaidee.NewSocial.repositories;

import com.tareksaidee.NewSocial.domain.DiaryComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryCommentRepository extends JpaRepository<DiaryComment, Long> {

    @Query("SELECT d FROM DiaryComment d WHERE d.entry_id = :entryID")
    List<DiaryComment> getDiaryComments(@Param("entryID") Integer entryID);

}
