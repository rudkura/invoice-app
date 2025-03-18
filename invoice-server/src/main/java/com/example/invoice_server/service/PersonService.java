package com.example.invoice_server.service;

import com.example.invoice_server.dto.PersonDTO;
import com.example.invoice_server.dto.PersonStatsDTO;

import java.util.List;
import java.util.UUID;


public interface PersonService {
    PersonDTO add(PersonDTO personDTO);
    PersonDTO get(UUID id);
    PersonDTO update(PersonDTO personDTO, UUID id);
    void delete(UUID id);

    List<PersonDTO> getAll();
    List<PersonDTO> getAllIncludeHidden();

    List<PersonStatsDTO> getStats();
}
