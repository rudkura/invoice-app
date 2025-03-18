package com.example.invoice_server.service;

import com.example.invoice_server.constant.InvoiceStatus;
import com.example.invoice_server.dto.PersonDTO;
import com.example.invoice_server.dto.PersonStatsDTO;
import com.example.invoice_server.dto.mapper.PersonMapper;
import com.example.invoice_server.entity.InvoiceEntity;
import com.example.invoice_server.entity.PersonEntity;
import com.example.invoice_server.entity.PersonSnapshot;
import com.example.invoice_server.entity.repository.InvoiceRepository;
import com.example.invoice_server.entity.repository.PersonRepository;
import com.example.invoice_server.entity.repository.PersonSnapshotRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PersonServiceImpl implements PersonService {
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PersonSnapshotRepository personSnapshotRepository;
    @Autowired
    private PersonMapper personMapper;

    @Override
    public PersonDTO add(PersonDTO personDTO) {
        PersonEntity entity = personMapper.toEntity(personDTO);
        personRepository.save(entity);
        return personMapper.toDto(entity);
    }

    @Override
    public PersonDTO get(UUID id) {
        return personMapper.toDto(fetchPersonById(id));
    }

    @Override
    @Transactional
    public PersonDTO update(PersonDTO personDTO, UUID id) {
        personDTO.setId(id);
        PersonEntity entity = fetchPersonById(id);
        snapshotForIssuedInvoices(entity);
        entity = personMapper.updateEntity(personDTO, entity);
        personRepository.save(entity);
        return personMapper.toDto(entity);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        // TODO: rework - person should get deleted if only NEW invoices attached
        // TODO: custom query solution
        PersonEntity entity = fetchPersonById(id);
        if (entity.getSales().isEmpty() && entity.getPurchases().isEmpty()) {
            personRepository.delete(entity);
        } else {
            for (InvoiceEntity p : entity.getPurchases()) {
                if (p.getStatus() == InvoiceStatus.NEW) {
                    p.setBuyer(null);
                }
            }
            for (InvoiceEntity s : entity.getSales()) {
                if (s.getStatus() == InvoiceStatus.NEW) {
                    s.setSeller(null);
                }
            }
            entity.setHidden(true);
        }
    }

    @Override
    public List<PersonDTO> getAll() {
        //TODO: getAll PageRequest, filtration
        return getAllIncludeHidden(false);
    }

    @Override
    public List<PersonDTO> getAllIncludeHidden() {
        //TODO: getAll PageRequest, filtration
        return getAllIncludeHidden(true);
    }

    @Override
    public List<PersonStatsDTO> getStats() {
        return personRepository.getStats();
    }

    // region: Private methods

    private List<PersonDTO> getAllIncludeHidden(boolean include) {
        List<PersonEntity> entities = include ? personRepository.findAll() : personRepository.findByHidden(false);
        return entities.stream()
                .map(personMapper::toDto)
                .collect(Collectors.toList());
    }

    private PersonEntity fetchPersonById(UUID id) {
        return personRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }


    private void snapshotForIssuedInvoices(PersonEntity entity) {
        List<InvoiceEntity> purchases = invoiceRepository.findByBuyerAndBuyerSnapshotNullAndStatusNot(entity, InvoiceStatus.NEW);
        List<InvoiceEntity> sales = invoiceRepository.findBySellerAndSellerSnapshotNullAndStatusNot(entity, InvoiceStatus.NEW);

        // TODO: mapper
        if (!purchases.isEmpty() || !sales.isEmpty()) {
            PersonSnapshot snapshot = new PersonSnapshot();
            snapshot.setName(entity.getName());
            snapshot.setCompanyId(entity.getCompanyId());
            snapshot.setVatin(entity.getVatin());
            snapshot.setBankAccount(entity.getBankAccount());
            snapshot.setBankCode(entity.getBankCode());
            snapshot.setIban(entity.getIban());
            snapshot.setPhone(entity.getPhone());
            snapshot.setMail(entity.getMail());
            snapshot.setStreet(entity.getStreet());
            snapshot.setZip(entity.getZip());
            snapshot.setCity(entity.getCity());
            snapshot.setCountry(entity.getCountry());
            snapshot.setNote(entity.getNote());
            personSnapshotRepository.save(snapshot);

            if (!purchases.isEmpty()) {
                for (InvoiceEntity p : purchases) {
                    p.setBuyerSnapshot(snapshot);
                }
            }
            if (!sales.isEmpty()) {
                for (InvoiceEntity s : sales) {
                    s.setSellerSnapshot(snapshot);
                }
            }
        }
    }
    // endregion
}
