package com.fatto.todo_list.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI configureOpenApi(){
        return new OpenAPI().info(
                new Info().description("Documentação para a lista de tarefas Fatto.")
                        .version("1.0.0")
                        .title("Lista de tarefas")
        );
    }

}
