package com.tareksaidee.NewSocial.repositories;

import com.tareksaidee.NewSocial.domain.DiaryEntry;
import com.tareksaidee.NewSocial.domain.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, Long> {

    @Query("SELECT d FROM DiaryEntry d WHERE d.user_name = :currentuser OR d.user_name IN (SELECT f.username FROM Friendship f WHERE d.user_name = f.username AND f.request_status = \'approved\' AND f.friendName = :currentuser) ")
    List<DiaryEntry> getAllDiaryEntries(@Param("currentuser") String currentuser);

}
