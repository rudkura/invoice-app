package com.example.invoice_server.controller;

import com.example.invoice_server.dto.PersonDTO;
import com.example.invoice_server.dto.PersonStatsDTO;
import com.example.invoice_server.service.PersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public PersonDTO add(@Valid @RequestBody PersonDTO personDTO) {
        return personService.add(personDTO);
    }

    @GetMapping("/{id}")
    public PersonDTO get(@PathVariable UUID id) {
        return personService.get(id);
    }

    @PutMapping("/{id}")
    public PersonDTO update(@Valid @RequestBody PersonDTO personDTO, @PathVariable UUID id) {
        return personService.update(personDTO, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        personService.delete(id);
    }

    @GetMapping("")
    public List<PersonDTO> getAll() {
        return personService.getAll();
    }

    @GetMapping("/test-hidden")
    public List<PersonDTO> getAllHiddenIncluded() {
        return personService.getAllIncludeHidden();
    }

    @GetMapping("/stats")
    public List<PersonStatsDTO> getStats() {
        return personService.getStats();
    }
}
