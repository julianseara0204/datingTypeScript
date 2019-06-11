// TODO: Split models

export type ActivityItem = {
    title: string,
    location: string,
    inPeriod: string,
    beginHour: string,
    image: any
}

export type Route = {
    title: string, 
    type: number 
}

export type MessageItem = {
    _id: number,
    text: string,
    createdAt: Date,
    user: {
        _id: number,
        name: string,
        avatar: any
    }
}

export type Category = {
    id: number,
    label: string,
    img: any
}

export type TabbarMenuItem = {
    id: number,
    label: string,
    img: any,
}