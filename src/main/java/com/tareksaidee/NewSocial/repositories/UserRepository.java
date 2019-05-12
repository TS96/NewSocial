package com.tareksaidee.NewSocial.repositories;

import com.tareksaidee.NewSocial.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<User, String> {

    User findByUsername(String username);

}
