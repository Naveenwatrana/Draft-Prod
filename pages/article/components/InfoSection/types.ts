export type InfoSectionProps = {
    authorInfo: {
        first_name: string;
        last_name: string;
        presigned_profile_cover: string;
        logo?: string;
        name: string;
        id: string;
        followed: boolean;
    }
    authorIsCompany?: boolean;
    userIsAuthor?: boolean;
    publishInfo: string | null;
}
