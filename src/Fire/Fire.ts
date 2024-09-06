import axios, { AxiosHeaders, AxiosResponse, AxiosProgressEvent } from "axios";

type MethodsType = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface FetchEvents {
    onStart?: () => void;
    onSuccess?: (res: AxiosResponse) => void;
    onError?: (err: any, res: AxiosResponse) => void;
    onFinish?: () => void;
    signal?: AbortSignal
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export interface BaseOptions extends FetchEvents {
    url: string;
    headers?: AxiosHeaders;
}

export interface FireOptions extends BaseOptions {
    data?: any;
}

interface FetchOptions extends FireOptions {
    method: MethodsType;
}

export interface SubmitOptions extends FireOptions {
    method: MethodsType;
}

const Fetch = (options: FetchOptions) => {
    const apiKeyName = 'user-visited-dashboard'
    const token = localStorage.getItem(apiKeyName);

    const headers: AxiosHeaders = new AxiosHeaders();

    token && headers.set('Authorization', `Bearer ${token}`)
    headers.set('Accept', 'application/json');
    options.method !== 'get' && headers.set('Content-Type', 'application/json');

    typeof options.onStart === 'function' && options.onStart();
    axios({
        url: options.url,
        headers: {
            ...headers,
            ...options.headers
        },
        method: options.method,
        data: JSON.stringify(options.data),
        signal: options.signal,
        onUploadProgress: (e) => options.onUploadProgress && options.onUploadProgress(e),
        onDownloadProgress: (e) => options.onDownloadProgress && options.onDownloadProgress(e)
    })
        .then((res) => options.onSuccess && options.onSuccess(res))
        .catch((err) => {
            if (err.hasOwnProperty('response')) {
                err.response.status === 401 && localStorage.removeItem(apiKeyName);
                options.onError && options.onError(err.response.data.error, err.response);
            }
        })
        .finally(() => options.onFinish && options.onFinish())
}

const submit = (options: SubmitOptions) => {
    Fetch({ ...options });
}

const get = (options: BaseOptions) => submit({ method: 'get', ...options, data: {} });
const post = (options: FireOptions) => submit({ method: 'post', ...options });
const put = (options: FireOptions) => submit({ method: 'put', ...options });
const patch = (options: FireOptions) => submit({ method: 'patch', ...options });
const destroy = (options: FireOptions) => submit({ method: 'delete', ...options });

export default {
    submit,
    get,
    post,
    put,
    patch,
    delete: destroy
};