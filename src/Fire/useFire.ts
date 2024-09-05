import { BaseOptions, FireOptions, SubmitOptions } from "./Fire";
import { useState } from "react";
import Fire from "./Fire";

// local ip
// export const baseURL = "http://192.168.18.194:8001/api";

// server ip
export const baseURL = "http://64.23.166.88:4000/api";

const useFire = <T extends Record<string, any> = {}>(initialState: T = {} as T, initialProcessing?: boolean) => {
    type StateKeyType = keyof typeof initialState;

    const [data, setData] = useState<typeof initialState>(initialState);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(initialProcessing ?? false);

    const handleData = (key: keyof typeof initialState | object, value?: string) => {
        setData({
            ...data,
            ...(value ? { [key as StateKeyType]: value } : key as object)
        });
    }

    const reset = (...fields: StateKeyType[]) => {
        if (fields.length === 0) {
            setData(initialState)
        } else {
            setData(
                Object.keys(initialState)
                    .filter((key) => fields.includes(key))
                    .reduce((carry, key) => {
                        const newkey: StateKeyType = key;
                        carry[newkey] = initialState[newkey]
                        return carry
                    }, { ...data }),
            )
        }
    }

    const handleErrors = (key: StateKeyType, value: string) => {
        setErrors(
            errors => ({
                ...errors,
                ...(value ? { [key]: value } : key as any),
            })
        )
    }

    const clearError = (...fields: StateKeyType[]) => {
        setErrors((errors: any) => (
            Object.keys(errors).reduce(
                (carry, field) => ({
                    ...carry,
                    ...(fields.length > 0 && !fields.includes(field) ? { [field]: errors[field] } : {}),
                }),
                {}
            )
        ))
    }

    const submit = (options: SubmitOptions) => Fire.submit({
        ...options,
        onStart: () => {
            !processing && setProcessing(true);
            typeof options.onStart === 'function' && options.onStart();


        },
        onSuccess: (res) => {
            setProcessing(false);
            typeof options.onSuccess === 'function' && options.onSuccess(res)
        },
        onError: (err, res) => {
            setProcessing(false);
            setErrors(err)
            typeof options.onError === 'function' && options.onError(err, res)
        },
        onFinish: () => options.onFinish && options.onFinish()
    })

    const get = (options: BaseOptions) => submit({ ...options, method: 'get', data: {} });

    const post = (options: FireOptions) => submit({ ...options, method: 'post', data });

    const put = (options: FireOptions) => submit({ ...options, method: 'put', data });

    const patch = (options: FireOptions) => submit({ ...options, method: 'patch', data });

    const destroy = (options: FireOptions) => submit({ ...options, method: 'delete', data });

    return {
        get,
        post,
        put,
        patch,
        delete: destroy,
        data,
        setData: handleData,
        setProcessing,
        processing,
        reset,
        errors,
        setErrors: handleErrors,
        clearError
    }
}

export default useFire