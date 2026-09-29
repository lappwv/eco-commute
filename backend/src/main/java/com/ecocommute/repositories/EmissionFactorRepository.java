package com.ecocommute.repositories;

import com.ecocommute.entities.EmissionFactor;
import com.ecocommute.entities.TransportMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmissionFactorRepository extends JpaRepository<EmissionFactor, Long> {
    Optional<EmissionFactor> findByTransportMode(TransportMode transportMode);
}
