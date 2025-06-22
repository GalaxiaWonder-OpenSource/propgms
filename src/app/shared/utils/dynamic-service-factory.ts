import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';
import {EndpointConfig} from '../model/endpoint-config';
import {HttpMethod} from '../model/endpoint-config';
import {AppContextService} from '../services/app-context-service';

/**
 * Dynamically generates a service with HTTP methods based on endpoint configurations.
 *
 * Each method in the resulting service corresponds to an `EndpointConfig`,
 * automatically handling:
 * - Serialization of value objects (e.g., extracting `.value`, `.toString()`, etc.)
 * - Path parameter replacement (`/users/{id}` → `/users/abc123`)
 * - Optional injection of Authorization headers (if `requiresAuth` is true)
 *
 * Supports standard HTTP methods: GET, POST, PUT, PATCH, DELETE.
 *
 * @template T - The expected output type of the endpoint methods
 *
 * @param configs - Array of `EndpointConfig` objects defining each method's name, URL, HTTP verb, and options
 * @returns A dictionary-like object with methods matching each config's `name`, returning an Observable
 *
 * @example
 * const userService = createDynamicService<User>([
 *   {
 *     name: 'getById',
 *     method: HttpMethod.GET,
 *     url: 'https://api.example.com/users/{id}',
 *     requiresAuth: true
 *   }
 * ]);
 *
 * userService.getById({}, { id: 'abc123' }).subscribe(user => console.log(user));
 */
export function dynamicServiceFactory<T>(configs: EndpointConfig[]): Record<string, Function> {
  const http = inject(HttpClient);
  const appContextService = inject(AppContextService);

  const service: Record<string, Function> = {};

  for (const cfg of configs) {
    service[cfg.name] = (data: any = {}, params: any = {}): Observable<T> => {
      normalizeIdParam(params);
      const url = buildUrlWithParams(cfg.url, params);
      const body = serializeData(data);
      const headers = getAuthHeaders(appContextService);
      const options = { headers };

      switch (cfg.method) {
        case HttpMethod.GET:
          return http.get<T>(appendQueryParams(url, cfg.url, params), options);
        case HttpMethod.POST:
          return http.post<T>(url, body, options);
        case HttpMethod.PUT:
          return http.put<T>(url, body, options);
        case HttpMethod.PATCH:
          return http.patch<T>(url, body, options);
        case HttpMethod.DELETE:
          return http.delete<T>(url, options);
        default:
          throw new Error(`Unsupported HTTP method: ${cfg.method}`);
      }
    };
  }
  return service;
}

// --- Helpers ---

function normalizeIdParam(params: any): void {
  if (params?.id && typeof params.id === 'object') {
    params.id = extractParamValue(params.id);
  }
}

function buildUrlWithParams(url: string, params: Record<string, any>): string {
  return url.replace(/{([a-zA-Z0-9_]+)}/g, (_, key) => {
    const val = extractParamValue(params[key]);
    return val != null ? encodeURIComponent(String(val)) : `{${key}}`;
  });
}

function getAuthHeaders(appContextService: AppContextService): any {
  let token = appContextService.token;
  if (token?.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

function appendQueryParams(url: string, templateUrl: string, params: Record<string, any>): string {
  const usedKeys = [...templateUrl.matchAll(/{([a-zA-Z0-9_]+)}/g)].map(match => match[1]);
  const remainingParams = { ...params };
  usedKeys.forEach(key => delete remainingParams[key]);

  const queryString = new URLSearchParams(serializeData(remainingParams)).toString();
  return queryString ? `${url}?${queryString}` : url;
}

function extractParamValue(val: any): any {
  if (val == null) return val;
  if (typeof val === 'object') {
    if ('value' in val) return val.value;
    if (typeof val.toJSON === 'function') return val.toJSON();
  }
  return val;
}

function serializeData(data: any): any {
  if (typeof data !== 'object' || data === null) return data;
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, extractParamValue(v)])
  );
}

