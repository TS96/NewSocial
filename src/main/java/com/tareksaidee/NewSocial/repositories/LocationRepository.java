package com.tareksaidee.NewSocial.repositories;

import com.tareksaidee.NewSocial.domain.Location;
import com.tareksaidee.NewSocial.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LocationRepository extends PagingAndSortingRepository<Location, Long> {

    Location findBylocationID(Integer locationID);

    Location findLocationByName(String name);

}
