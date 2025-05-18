
import { SessionPayload } from './session';

export const getOrCreateUserId = (user:SessionPayload): string => {

      const refinedId = `${user?.userId}-${user?.name}`
  
    return refinedId
  };

