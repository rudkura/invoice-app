package com.example.invoice_server.dto.mapper;

import com.example.invoice_server.dto.InvoiceDTO;
import com.example.invoice_server.dto.PersonDTO;
import com.example.invoice_server.entity.InvoiceEntity;
import com.example.invoice_server.entity.PersonEntity;
import com.example.invoice_server.entity.PersonSnapshot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = PersonMapper.class)
public interface InvoiceMapper {

    @Mapping(target = "buyer", expression = "java(source.getBuyerSnapshot() != null ? personMapper.toDto(source.getBuyerSnapshot()) : personMapper.toDto(source.getBuyer()))")
    @Mapping(target = "seller", expression = "java(source.getSellerSnapshot() != null ? personMapper.toDto(source.getSellerSnapshot()) : personMapper.toDto(source.getSeller()))")
    InvoiceDTO toDTO(InvoiceEntity source);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    InvoiceEntity toEntity(InvoiceDTO source);

    @Mapping(target = "seller", ignore = true)
    @Mapping(target = "buyer", ignore = true)
    @Mapping(target = "sellerSnapshot", ignore = true)
    @Mapping(target = "buyerSnapshot", ignore = true)
    @Mapping(target = "status", ignore = true)
    InvoiceEntity updateEntity(InvoiceDTO source, @MappingTarget InvoiceEntity target);

}
