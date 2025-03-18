package com.example.invoice_server.entity;

import com.example.invoice_server.constant.InvoiceStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "invoice")
@Getter
@Setter
public class InvoiceEntity {

    // TODO: big decimal

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String invoiceNumber;

    @Column(nullable = false)
    private LocalDate issued;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private String product;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer vat;

    @Column(columnDefinition = "TEXT")
    private String note;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = true)
    private PersonEntity seller;

    @ManyToOne
    private PersonSnapshot sellerSnapshot;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = true)
    private PersonEntity buyer;

    @ManyToOne
    private PersonSnapshot buyerSnapshot;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private InvoiceStatus status = InvoiceStatus.NEW;
}
