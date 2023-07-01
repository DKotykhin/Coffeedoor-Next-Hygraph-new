import { IMenuList } from "types/menuTypes";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_URL || "";

const query = `
    fragment Languages on Lang {
        uk
        ru
        en
    }
    query newMenu {
        menuList: menusConnection(where: {hidden: false}) {
            edges {
                node {
                    title { ...Languages }
                    subtitle { ...Languages }
                    hidden
                    position
                    items {
                        name { ...Languages }
                        description { ...Languages }
                        price
                        hidden
                    }
                }
            }
        }
    }
`;

export const GetMenu = async (): Promise<IMenuList> => {
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
