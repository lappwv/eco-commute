package com.ecocommute.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "EcoCommute API",
                version = "1.0.0",
                description = "API REST para registrar viajes sostenibles, calcular CO2 ahorrado, gestionar puntos y consultar estadisticas.",
                contact = @Contact(name = "Equipo EcoCommute")
        ),
        servers = {
                @Server(url = "http://localhost:8080", description = "Entorno local")
        }
)
public class OpenApiConfig {
}
