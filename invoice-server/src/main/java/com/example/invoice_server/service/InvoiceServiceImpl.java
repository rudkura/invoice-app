package com.example.invoice_server.service;

import com.example.invoice_server.constant.InvoiceStatus;
import com.example.invoice_server.dto.InvoiceDTO;
import com.example.invoice_server.dto.InvoiceStatsDTO;
import com.example.invoice_server.dto.mapper.InvoiceMapper;
import com.example.invoice_server.entity.InvoiceEntity;
import com.example.invoice_server.entity.repository.InvoiceRepository;
import com.example.invoice_server.entity.repository.PersonRepository;
import com.example.invoice_server.exception.ForbiddenInvoiceModificationException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceMapper invoiceMapper;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PersonRepository personRepository;

    @Override
    public InvoiceDTO add(InvoiceDTO dto) {
        InvoiceEntity entity = invoiceMapper.toEntity(dto);
        mapPersonsToInvoice(entity, dto);
        return invoiceMapper.toDTO(invoiceRepository.save(entity));
    }

    @Override
    public InvoiceDTO get(UUID id) {
        return invoiceMapper.toDTO(fetchById(id));
    }

    @Override
    @Transactional
    public InvoiceDTO update(InvoiceDTO invoiceDTO, UUID id) {
        invoiceDTO.setId(id);
        InvoiceEntity entity = checkIfNew(id);
        entity = invoiceMapper.updateEntity(invoiceDTO, entity);
        mapPersonsToInvoice(entity, invoiceDTO);
        return invoiceMapper.toDTO(entity);
    }

    @Override
    @Transactional
    public InvoiceDTO issue(UUID id) {
        InvoiceEntity invoice = checkIfNew(id);
        if (invoice.getSeller() != null && invoice.getBuyer() != null) {
            invoice.setStatus(InvoiceStatus.ISSUED);
            return invoiceMapper.toDTO(invoice);
        } throw new ForbiddenInvoiceModificationException();
    }

    @Override
    public void delete(UUID id) {
        InvoiceEntity entity = checkIfNew(id);
        invoiceRepository.delete(entity);
    }

    @Override
    public List<InvoiceDTO> getAll(InvoiceStatus status) {
        return invoiceRepository.findByStatus(status).stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getSales(UUID id) {
        return invoiceRepository.findSales(id).stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getPurchases(UUID id) {
        return invoiceRepository.findPurchases(id).stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceStatsDTO getStats() {
        return invoiceRepository.getStats();
    }

    // region: Private methods

    private InvoiceEntity fetchById(UUID id) {
        return invoiceRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    private InvoiceEntity checkIfNew(UUID id) {
        InvoiceEntity entity = fetchById(id);
        if (entity.getStatus() != InvoiceStatus.NEW) throw new ForbiddenInvoiceModificationException();
        return entity;
    }

    private void mapPersonsToInvoice(InvoiceEntity entity, InvoiceDTO dto) {
        entity.setBuyer(personRepository.getReferenceById(dto.getBuyer().getId()));
        entity.setSeller(personRepository.getReferenceById(dto.getSeller().getId()));
    }

    // endregion
}
