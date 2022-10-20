import axios, {Method} from "axios";

export const executeRequest = async (endpoint: string, method: Method, body?: any) => {
    const headers = { 'Content-Type': 'application/json' } as any;
    //const token = localStorage.getItem('token');

    // verificar se tem token salvo no storage e se tiver add no headers

    const baseAddress = 'http://localhost:3000/api/';
    const URL = `${baseAddress}${endpoint}`;

    console.log(`executando:" ${URL}, metodo: ${method}, e body: ${body}`);

    return axios.request({
        url: URL,
        method,
        data: body? body : '',
        headers,
        timeout: 30000
    });
}