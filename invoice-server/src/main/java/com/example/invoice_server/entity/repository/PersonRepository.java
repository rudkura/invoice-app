package com.example.invoice_server.entity.repository;

import com.example.invoice_server.dto.PersonStatsDTO;
import com.example.invoice_server.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface PersonRepository extends JpaRepository<PersonEntity, UUID> {

    List<PersonEntity> findByHidden(boolean hidden);

    @Query("SELECT new com.example.invoice_server.dto.PersonStatsDTO(p.companyId, p.name, COALESCE((SELECT SUM(i.price) FROM invoice i WHERE i.seller = p AND i.status = 'ISSUED'), 0)) FROM person p")
    List<PersonStatsDTO> getStats();
}
