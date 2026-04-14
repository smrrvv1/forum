export interface IMessage {
    author: string,
    message: string
}

export interface IMessageFull extends IMessage {
    id: message
}

export interface ApiMessage {
    [key: string]: IMessage
}