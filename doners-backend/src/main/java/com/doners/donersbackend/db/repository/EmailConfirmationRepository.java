package com.doners.donersbackend.db.repository;

import com.doners.donersbackend.db.entity.EmailConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailConfirmationRepository extends JpaRepository<EmailConfirmation, String> {

    Optional<EmailConfirmation> findByIdAndEmailConfirmationIsExpired(String id, boolean isExpired);
    Optional<EmailConfirmation> findByEmailAddressAndEmailConfirmationIsConfirmed(String emailAddress, boolean isConfirmed);
    Optional<EmailConfirmation> findByEmailAddress(String emailAddress);
}
