package com.example.invoice_server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonStatsDTO {
    private String companyId;
    private String personName;
    private Double revenue;
}
