import mockAxios from 'axios';
import Api from './api';

// A helper function can turn that into a promise itself so you don't need to deal with the done callback.
const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const id = 1;
const profile = {
    id: id,
    username: 'zl',
    description: 'software engineer',
    link: null,
    avatar: 'http://example.com/example.jpg'
};

const credetial = {
    username: 'admin',
    password: 'admin'
};

describe('GetProfile API', () => {
    test('getProfile success', async () => {
        const callback = jest.fn();
        const response = {
            data: profile
        };
        mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
        Api.getProfile(id, callback);
    
        const url = 'http://localhost:8080/api/v1/profile/'+id;
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(url);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(undefined, response.data);
    });

    test('getProfile fail with error response', async () => {
        const callback = jest.fn();
        const error = {
            response: {
                data: {
                    error: {
                        code: 400,
                        message: 'invalid request'
                    }
                }
            }
        };
        mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
        Api.getProfile(id, callback);
    
        const url = 'http://localhost:8080/api/v1/profile/'+id;
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(url);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error(error.response.data.error.message), undefined);
    });

    test('getProfile fail with invalid error response', async () => {
        const callback = jest.fn();
        const error = {
            message: 'failed'
        };
        mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
        Api.getProfile(id, callback);
    
        const url = 'http://localhost:8080/api/v1/profile/'+id;
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(url);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error(error.message), undefined);
    });

    test('getProfile fail with invalid response', async () => {
        const callback = jest.fn();
        const response = {
        };
        mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
        Api.getProfile(id, callback);
    
        const url = 'http://localhost:8080/api/v1/profile/'+id;
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(url);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error('invalid response'), undefined);
    });

});

describe('SetProfile API', () => {

    test('setProfile success', async () => {
        const callback = jest.fn();
        const response = {
            data: profile
        };
        mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
        Api.setProfile(id, profile, callback);
    
        const url = 'http://localhost:8080/api/v1/profile/'+id;
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(url, profile);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(undefined, profile);
    });

    test('setProfile fail with error response', async () => {
        const callback = jest.fn();
        const error = {
            response: {
                data: {
                    error: {
                        code: 400,
                        message: 'invalid request'
                    }
                }
            }
        };
        mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
        Api.setProfile(id, profile, callback);
    
        const url = 'http://localhost:8080/api/v1/profile/'+id;
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(url, profile);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error(error.response.data.error.message), undefined);
    });

    test('setProfile fail with invalid error response', async () => {
        const callback = jest.fn();
        const error = {
            message: 'failed'
        };
        mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
        Api.setProfile(id, profile, callback);
    
        const url = 'http://localhost:8080/api/v1/profile/'+id;
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(url, profile);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error(error.message), undefined);
    });

    test('setProfile fail with invalid response', async () => {
        const callback = jest.fn();
        const response = {
        };
        mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
        Api.setProfile(id, profile, callback);
    
        const url = 'http://localhost:8080/api/v1/profile/'+id;
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(url, profile);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error('invalid response'), undefined);
    });
});

describe('Login API', () => {
    test('login success', async () => {
        const callback = jest.fn();
        const response = {
        };
        mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
        Api.login(credetial.username, credetial.password, callback);
    
        const url = 'http://localhost:8080/login'
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(url, credetial);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(undefined);
    });

    test('login fail with error response', async () => {
        const callback = jest.fn();
        const error = {
            response: {
                data: {
                    error: {
                        code: 400,
                        message: 'invalid token'
                    }
                }
            }
        };
        mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
        Api.login(credetial.username, credetial.password, callback);
    
        const url = 'http://localhost:8080/login'
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(url, credetial);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error(error.response.data.error.message));
    });

    test('login fail with invalid error response', async () => {
        const callback = jest.fn();
        const error = {
            response: {
                data: {

                }
            }
        };
        mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
        Api.login(credetial.username, credetial.password, callback);
    
        const url = 'http://localhost:8080/login'
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(url, credetial);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error('invalid error response'));
    });

    test('login fail with general error', async () => {
        const callback = jest.fn();
        const error = {
            message: 'failed'
        };
        mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
        Api.login(credetial.username, credetial.password, callback);
    
        const url = 'http://localhost:8080/login'
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(url, credetial);
    
        await flushPromises();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error(error.message));
    });
});
afterEach(() => {
    jest.clearAllMocks();
});