import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const generateUUID = (arraySize = 1) => {
  const ids: string[] = [];

  for (let i = 0; i < arraySize; i = i + 1) {
    ids.push(uuidv4());
  }

  return useMemo(() => ids, []);
};

export default generateUUID;
