/**
 * Enumeration of supported HTTP methods for endpoint configurations.
 *
 * This enum is used to specify the HTTP verb to be used when generating
 * dynamic service methods.
 */
export enum HttpMethod {
  /** HTTP GET method - used for data retrieval */
  GET = 'GET',

  /** HTTP POST method - used for creating new resources */
  POST = 'POST',

  /** HTTP PUT method - used for replacing existing resources */
  PUT = 'PUT',

  /** HTTP PATCH method - used for partial updates to a resource */
  PATCH = 'PATCH',

  /** HTTP DELETE method - used for deleting a resource */
  DELETE = 'DELETE'
}

/**
 * Defines the structure for a dynamic API endpoint configuration.
 *
 * @template TInput - The expected input (request body) type.
 * @template TOutput - The expected output (response) type.
 */
export interface EndpointConfig<TInput = any, TOutput = any> {
  /**
   * Name under which the HTTP request method will be registered in the generated service.
   * This becomes the key for the function.
   *
   * @example 'getUserById'
   */
  name: string;

  /**
   * HTTP method to be used for the request, assigned using the {@link HttpMethod} enum.
   *
   * @example HttpMethod.GET
   */
  method: HttpMethod;

  /**
   * Full URL for the endpoint, including any dynamic path params.
   *
   * @example 'url: 'https://api.example.com/users/{id}''
   */
  url: string;

  /**
   * Indicates whether the endpoint requires a Bearer token in the Authorization header.
   * If true, the token will be retrieved from the session service.
   *
   * @default false
   * @example true
   */
  requiresAuth?: boolean;
}




