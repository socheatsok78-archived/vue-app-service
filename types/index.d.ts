import { VueConstructor } from "vue/types";
import { AxiosStatic, AxiosRequestConfig } from "axios/index";

export type ServiceRegistryOptions = {
    name: string,
    description: string,
    config: AxiosRequestConfig,
    methods: ServiceMethods
}

export type ServiceMethods = {
    [key: string]: ServiceMethod
}

export type ServiceMethodOptions = {
    $axios: AxiosStatic,
    $config: AxiosRequestConfig
}

export type ServiceMethod = <T>(options: ServiceMethodOptions, payload: <T>() => T) => T;

export default class Application {
    /**
     * Application name
     */
    name: string;

    /**
     * Application description
     */
    description: string;

    /**
     * Create new Application instance
     * @param {AxiosRequestConfig} config
     */
    constructor(config: AxiosRequestConfig);

    /**
     * @returns {ServiceContainer} ServiceContainer
     */
    get $service(): ServiceContainer;
}

export class ServiceContainer {
    /**
     * Create new ServiceContainer instance
     * @param {Application} app
     */
    constructor(app: Application);

    /**
     * Register a new service
     * @param {ServiceRegistry} service Service Registry Instance
     */
    register(service: ServiceRegistry): void;

    /**
     * Unregister a service
     * @param {string} name Service name
     */
    unregister(name: string): void;
}

export class ServiceRegistry {
    /**
     * Service name
     */
    name: string;

    /**
     * Service description
     */
    description: string;

    /**
     * Service methods
     */
    methods: ServiceMethods;

    /**
     * Create a new ServiceRegistry instance
     * @param {ServiceRegistryOptions} service
     */
    constructor(service: ServiceRegistryOptions);

    /**
     * @returns {AxiosStatic} Request instance
     */
    get $http(): AxiosStatic;

    /**
     * @returns {AxiosRequestConfig} Request config
     */
    get $config(): AxiosRequestConfig;
}

export class VueAppServicePlugin {
    /**
     * Install Vue App Service Plugin
     * @param {VueConstructor} Vue
     */
    static install(Vue: VueConstructor): void;
}
