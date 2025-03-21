package com.example.invoice_server.controller;

import com.example.invoice_server.constant.InvoiceStatus;
import com.example.invoice_server.dto.InvoiceDTO;
import com.example.invoice_server.dto.InvoiceStatsDTO;
import com.example.invoice_server.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public InvoiceDTO add(@Valid @RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.add(invoiceDTO);
    }

    @GetMapping("/{id}")
    public InvoiceDTO get(@PathVariable UUID id) {
        return invoiceService.get(id);
    }

    @PutMapping("/{id}")
    public InvoiceDTO update(@Valid @RequestBody InvoiceDTO invoiceDTO, @PathVariable UUID id) {
        return invoiceService.update(invoiceDTO, id);
    }

    @PutMapping("/{id}/issue")
    public InvoiceDTO issue(@PathVariable UUID id) {
        return invoiceService.issue(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        invoiceService.delete(id);
    }

    @GetMapping("")
    public List<InvoiceDTO> getIssued() {
        return invoiceService.getAll(InvoiceStatus.ISSUED);
    }

    @GetMapping("/saved")
    public List<InvoiceDTO> getSaved() {
        return invoiceService.getAll(InvoiceStatus.NEW);
    }

    @GetMapping("/{id}/sales")
    public List<InvoiceDTO> getSales(@PathVariable UUID id) {
        return invoiceService.getSales(id);
    }

    @GetMapping("/{id}/purchases")
    public List<InvoiceDTO> getPurchases(@PathVariable UUID id) {
        return invoiceService.getPurchases(id);
    }

    @GetMapping("/stats")
    public InvoiceStatsDTO getStats() {
        return invoiceService.getStats();
    }
}
