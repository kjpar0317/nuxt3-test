import type { H3Event, EventHandlerRequest } from 'h3';

export default defineEventHandler((event: H3Event<EventHandlerRequest>) => {
  event.context.auth = { user: 123 };
});
