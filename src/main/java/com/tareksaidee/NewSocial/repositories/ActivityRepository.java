package com.tareksaidee.NewSocial.repositories;

import com.tareksaidee.NewSocial.domain.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query("SELECT a FROM Activity a WHERE a.user_name = :currentuser OR a.user_name IN (SELECT f.friendshipId.username FROM Friendship f WHERE a.user_name = f.friendshipId.username AND f.request_status = \'approved\' AND f.friendshipId.friendName = :currentuser) ")
    List<Activity> getAllActivities(@Param("currentuser") String currentuser);

}
