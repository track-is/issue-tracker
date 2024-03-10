package com.api.issuetacker.dto.ws;

import lombok.*;
import org.springframework.web.socket.WebSocketSession;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class WebsocketIdentifier implements Comparable<WebsocketIdentifier> {
    private String userId;

    private String token;

    private WebSocketSession session;

    @Override
    public int compareTo(WebsocketIdentifier otherIdentifier) {
        if ((this.hashCode() == otherIdentifier.hashCode()) && this.equals(otherIdentifier)) {
            return 0;
        }
        return 1;
    }
}