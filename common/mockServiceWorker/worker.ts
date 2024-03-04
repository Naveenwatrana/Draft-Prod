import { setupWorker } from 'msw';
import { handlers } from 'common/mockServiceWorker/handlers';

export const worker = setupWorker(...handlers);
