package com.example.invoice_server.service;

import com.example.invoice_server.dto.InvoiceDTO;
import com.example.invoice_server.dto.InvoiceStatsDTO;

import java.util.List;
import java.util.UUID;

public interface InvoiceService {

    InvoiceDTO add(InvoiceDTO invoiceDTO);
    InvoiceDTO get(UUID id);
    InvoiceDTO update(InvoiceDTO invoiceDTO, UUID id);
    InvoiceDTO issue(UUID id);
    void delete(UUID id);

    List<InvoiceDTO> getAll();
    List<InvoiceDTO> getSales(UUID id);
    List<InvoiceDTO> getPurchases(UUID id);

    InvoiceStatsDTO getStats();
}
