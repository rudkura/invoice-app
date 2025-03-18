package com.example.invoice_server.dto;

import com.example.invoice_server.constant.InvoiceStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {

    @JsonProperty("_id")
    private UUID id;

    @NotBlank(message = "Cannot be blank")
    private String invoiceNumber;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Cannot be null")
    private LocalDate issued;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Cannot be null")
    private LocalDate dueDate;

    @NotBlank(message = "Cannot be blank")
    private String product;

    @Positive(message = "Must be a positive number")
    private Double price;

    @Positive(message = "Must be a positive number")
    private Integer vat;

    private String note;

    private PersonDTO seller;
    private PersonDTO buyer;
    private InvoiceStatus status;
}
