package com.example.invoice_server.entity.repository;

import com.example.invoice_server.entity.PersonSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PersonSnapshotRepository extends JpaRepository<PersonSnapshot, UUID> {
}
