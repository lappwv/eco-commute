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
                description = "API REST de EcoCommute para movilidad sostenible (ODS 11.2), cálculo de emisiones de CO₂, gamificación y recomendaciones de ruta optimizadas con Google Gemini.",
                contact = @Contact(name = "Equipo EcoCommute")
        ),
        servers = {
                @Server(url = "https://ecocommute-backend-a14m.onrender.com", description = "Servidor Producción (Render)"),
                @Server(url = "http://localhost:8080", description = "Entorno local")
        }
)
public class OpenApiConfig {
}
