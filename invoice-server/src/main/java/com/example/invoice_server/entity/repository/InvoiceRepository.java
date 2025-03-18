package com.example.invoice_server.entity.repository;

import com.example.invoice_server.constant.InvoiceStatus;
import com.example.invoice_server.dto.InvoiceStatsDTO;
import com.example.invoice_server.entity.InvoiceEntity;
import com.example.invoice_server.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, UUID> {
    List<InvoiceEntity> findBySellerAndSellerSnapshotNullAndStatusNot(PersonEntity seller, InvoiceStatus status);
    List<InvoiceEntity> findByBuyerAndBuyerSnapshotNullAndStatusNot(PersonEntity buyer, InvoiceStatus status);

    @Query("SELECT i FROM invoice i JOIN i.seller p WHERE i.status = 'ISSUED' AND p.id = :id")
    List<InvoiceEntity> findSales(@Param("id") UUID id);

    @Query("SELECT i FROM invoice i JOIN i.buyer p WHERE i.status = 'ISSUED' AND p.id = :id")
    List<InvoiceEntity> findPurchases(@Param("id") UUID id);

    @Query("SELECT new com.example.invoice_server.dto.InvoiceStatsDTO(COALESCE(SUM(CASE WHEN YEAR(i.issued) = YEAR(CURRENT_DATE) THEN i.price ELSE 0 END), 0), COALESCE(SUM(i.price), 0), COUNT(i)) FROM invoice i WHERE i.status = 'ISSUED'")
    InvoiceStatsDTO getStats();
}
