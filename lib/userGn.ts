
import { SessionPayload } from './session';

export const getOrCreateUserId = (user:SessionPayload): string => {

      const refinedId = `${user?.userId}-${user?.name.split(' ')[0]}`

      console.log("user id", refinedId)
  
    return refinedId
  };

