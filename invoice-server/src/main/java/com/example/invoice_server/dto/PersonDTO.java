package com.example.invoice_server.dto;

import com.example.invoice_server.constant.Countries;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonDTO {

    @JsonProperty("_id")
    private UUID id;

    @NotBlank(message = "Cannot be blank")
    private String name;

    @NotBlank(message = "Cannot be blank")
    private String companyId;

    @NotBlank(message = "Cannot be blank")
    private String vatin;

    @NotBlank(message = "Cannot be blank")
    private String bankAccount;

    @NotBlank(message = "Cannot be blank")
    private String bankCode;

    @NotBlank(message = "Cannot be blank")
    private String iban;

    @NotBlank(message = "Cannot be blank")
    private String phone;

    @NotBlank(message = "Cannot be blank")
    @Email(message = "Must be an email")
    private String mail;

    @NotBlank(message = "Cannot be blank")
    private String street;

    @NotBlank(message = "Cannot be blank")
    private String zip;

    @NotBlank(message = "Cannot be blank")
    private String city;

    @NotNull(message = "Cannot be null")
    private Countries country;
    private String note;
}
