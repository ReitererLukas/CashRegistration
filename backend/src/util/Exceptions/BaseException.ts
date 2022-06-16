
export abstract class BaseException extends Error  {
  abstract responseCode(): number;
}

