/* eslint-disable @typescript-eslint/naming-convention */
export type NotificationBoxProps = {
    list: Array<IFormattedNotification>;
    closeNotifications: () => void;
};
export type IFormattedNotification = {
    id: string;
    time: string;
    type: {
        link: string;
        text: string;
    },
    userName: string;
    entityId?: string;
    readStatus: boolean;
    user?: {
        name?: string;
        mantra?: string;
        profile?: string;
    }
    notificationType: string;
};
export type INotification = {
    id: string;
    title: string;
    time: string;
    data: {
        user: {
            first_name: string;
        },
        upvoter: {
            first_name: string;
        },
        entity_id: string;
        upvotable_id?: string;
    };
    read_at: string | null;
    type: string;
    created_at: string;
};
export type NotificationListItemProps = {
    data: IFormattedNotification;
    isList?: boolean;
    onClose?: () => void;
};
export type NotificationContainerProps = {
    list: Array<INotification>
};
