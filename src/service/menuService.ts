import { IMenuList } from "types/menuTypes";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_URL || "";

const query = `
    fragment NameParts on MenuBlock {
        title
        subtitle
        body {
            name
            description
            price
        }
    }
    query GetMenuList {
        menuList: menuListsConnection(
            orderBy: position_ASC
            where: { hide_not: true }
            first: 15
        ) {
            edges {
                node {
                    ua {
                        ...NameParts
                    }
                    ru {
                        ...NameParts
                    }
                    en {
                        ...NameParts
                    }
                    id
                    hide
                    position
                }
            }
        }
    }
`;

export const GetMenuList = async (): Promise<IMenuList> => {
    const { data } = await fetch(graphqlAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 },
    }).then((res) => res.json());

    return data;
};
