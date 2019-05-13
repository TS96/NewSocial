package com.tareksaidee.NewSocial.repositories;

import com.tareksaidee.NewSocial.domain.Friendship;
import com.tareksaidee.NewSocial.domain.FriendshipId;
import com.tareksaidee.NewSocial.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface FriendshipRepository extends PagingAndSortingRepository<Friendship, String> {

    Friendship findByfriendNameAndUsername(String friendName, String username);

}
