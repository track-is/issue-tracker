package com.api.issuetacker.config;

import com.api.issuetacker.service.websocket.WebSocketInterceptor;
import com.api.issuetacker.service.websocket.WebsocketChannelHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebsocketConfig implements WebSocketConfigurer {
    private final WebsocketChannelHandler websocketChannelHandler;

    private final WebSocketInterceptor webSocketInterceptor;

    /**
     * Register websocket handlers.
     * @param registry WebSocketHandlerRegistry
     */
    @Override
    public void registerWebSocketHandlers(final WebSocketHandlerRegistry registry) {
        registry
                .addHandler(websocketChannelHandler, "/ws/{token}")
                .addInterceptors(webSocketInterceptor)
                .setAllowedOrigins("*");
    }
}