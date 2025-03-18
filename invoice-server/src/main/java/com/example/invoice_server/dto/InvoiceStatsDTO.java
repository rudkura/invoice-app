package com.example.invoice_server.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceStatsDTO {
    private Double currentYearSum;
    private Double allTimeSum;
    private Long invoicesCount;
}
