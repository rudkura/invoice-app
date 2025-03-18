package com.example.invoice_server.dto.mapper;

import com.example.invoice_server.dto.PersonDTO;
import com.example.invoice_server.entity.PersonEntity;
import com.example.invoice_server.entity.PersonSnapshot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PersonMapper {

    PersonEntity toEntity(PersonDTO source);

    PersonDTO toDto(PersonEntity source);
    PersonDTO toDto(PersonSnapshot source);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "companyId", ignore = true)
    PersonEntity updateEntity(PersonDTO source, @MappingTarget PersonEntity target);
}
