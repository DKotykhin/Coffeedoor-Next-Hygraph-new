import { ICatalogList } from "types/storeTypes";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_URL || "";

const query = `
    fragment NameParts on Body {
        title
        name
        description
        tm
        country
    }
    fragment DescribeParts on Body {
        sort {
            key
            value
        }
        textA
        textList
        textB
        link {
            title
            value
        }
    }
    query GetAllList {
        coffeeList: coffeeListsConnection(
            orderBy: position_ASC
            where: { hide_not: true }
            first: 20
        ) {
            edges {
                node {
                    bodyUa {
                        ...NameParts
                    }
                    bodyRu {
                        ...NameParts
                    }
                    bodyEn {
                        ...NameParts
                    }
                    id
                    weight
                    price
                    order
                    hide
                    position
                    cardImg {
                        url
                    }
                    listImg {
                        url
                    }
                }
            }
        }
        teaList: teaListsConnection(
            orderBy: position_ASC
            where: { hide_not: true }
            first: 25
        ) {
            edges {
                node {
                    bodyUa {
                        ...NameParts
                        sort {
                            key
                            value
                        }
                    }
                    bodyRu {
                        ...NameParts
                        sort {
                            key
                            value
                        }
                    }
                    bodyEn {
                        ...NameParts
                        sort {
                            key
                            value
                        }
                    }
                    id
                    weight
                    price
                    order
                    hide
                    position
                    cardImg {
                        url
                    }
                    listImg {
                        url
                    }
                }
            }
        }
        jamList: jamListsConnection(
            orderBy: position_ASC
            where: { hide_not: true }
        ) {
            edges {
                node {
                    bodyUa {
                        ...NameParts
                    }
                    bodyRu {
                        ...NameParts
                    }
                    bodyEn {
                        ...NameParts
                    }
                    id
                    weight
                    price
                    order
                    hide
                    position
                    cardImg {
                        url
                    }
                    listImg {
                        url
                    }
                }
            }
        }
        millsList: millsListsConnection(
            orderBy: position_ASC
            where: { hide_not: true }
        ) {
            edges {
                node {
                    bodyUa {
                        ...NameParts
                        ...DescribeParts
                    }
                    bodyRu {
                        ...NameParts
                        ...DescribeParts
                    }
                    bodyEn {
                        ...NameParts
                        ...DescribeParts
                    }
                    id
                    weight
                    price
                    order
                    hide
                    position
                    cardImg {
                        url
                    }
                    listImg {
                        url
                    }
                }
            }
        }
        accessoriesList: accessoriesListsConnection(
            orderBy: position_ASC
            where: { hide_not: true }
        ) {
            edges {
                node {
                    bodyUa {
                        ...NameParts
                        ...DescribeParts
                    }
                    bodyRu {
                        ...NameParts
                        ...DescribeParts
                    }
                    bodyEn {
                        ...NameParts
                        ...DescribeParts
                    }
                    id
                    weight
                    price
                    order
                    hide
                    position
                    cardImg {
                        url
                    }
                    listImg {
                        url
                    }
                }
            }
        }
    }
`;

export const GetStoreList = async (): Promise<ICatalogList> => {
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
