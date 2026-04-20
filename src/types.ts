export interface IMessage {
    author: string,
    message: string,
    likes?: number
}

export interface IMessageFull extends IMessage {
    id: message
}

export interface ApiMessage {
    [key: string]: IMessage
}