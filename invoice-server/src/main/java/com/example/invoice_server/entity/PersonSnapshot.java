package com.example.invoice_server.entity;

import com.example.invoice_server.constant.Countries;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public class PersonSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String companyId;

    @Column(nullable = false)
    private String vatin;

    @Column(nullable = false)
    private String bankAccount;

    @Column(nullable = false)
    private String bankCode;

    @Column(nullable = false)
    private String iban;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String mail;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String zip;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Countries country;

    @Column(columnDefinition = "TEXT")
    private String note;

    @OneToMany(mappedBy = "buyerSnapshot")
    List<InvoiceEntity> purchases;

    @OneToMany(mappedBy = "sellerSnapshot")
    List<InvoiceEntity> sales;
}
