interface ISource {
    uri: string;
    content: string;
    modifiedTimestamp: number;
}

interface ISourceRegistry<T> {
    sources: { [uri: string]: ISource; };
}

interface ISourceRequest {
    uri: string;
}

interface ITypedSourceRequest {
    uri: string;
    type: number;
}

interface ISourceType {
    id: string;
}

interface ISourceResolution {
    uri: string;
    resolverId: string;
}

interface ISourceServiceContext {
    sourceRequests: ISourceRequest[];
    typedSourceRequests: ITypedSourceRequest[];
    sourceTypes: { [id: string]: ISourceType; };
}
