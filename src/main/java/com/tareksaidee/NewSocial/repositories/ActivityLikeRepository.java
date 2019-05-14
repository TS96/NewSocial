package com.tareksaidee.NewSocial.repositories;

import com.tareksaidee.NewSocial.domain.ActivityLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLikeRepository extends JpaRepository<ActivityLike, Long> {

    @Query("SELECT count(al) as likecount FROM ActivityLike al WHERE al.acID = :acID GROUP BY al.acID")
    Long getActivityLikes(@Param("acID") Integer acID);

}
