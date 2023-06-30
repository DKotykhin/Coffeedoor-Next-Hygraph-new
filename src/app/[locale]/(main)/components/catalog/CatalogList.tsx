"use client";

import React from "react";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Box } from '@mui/material';

import CardList from "./CardList";
import store from "store/store";

import { GroupList, ICatalogList, IFilter } from "types/storeTypes";
import Basket from "../basket/Basket";

export interface IGroupData {
    group: GroupList,
    title: string,
    subtitle: string,
    filterArray?: IFilter[],
}

const teaFilter: IFilter[] = [
    { button: "buttonA", value: "valueA" },
    { button: "buttonB", value: "valueB" },
    { button: "buttonC", value: "valueC" },
    { button: "buttonD", value: "valueD" },
    { button: "buttonE", value: "valueE" },
];

const GroupData: IGroupData[] = [
    {
        group: GroupList.coffee,
        title: "coffee_title",
        subtitle: "coffee_subtitle",
    },
    {
        group: GroupList.tea,
        title: "tea_title",
        subtitle: "tea_subtitle",
        filterArray: teaFilter,
    },
    {
        group: GroupList.jam,
        title: "jam_title",
        subtitle: "jam_subtitle",
    },
    {
        group: GroupList.mills,
        title: "mills_title",
        subtitle: "mills_subtitle",
    },
    {
        group: GroupList.accessories,
        title: "accessories_title",
        subtitle: "accessories_subtitle",
    },
];

const theme = createTheme({
    palette: {
        primary: {
            main: "#00a1b6",
        },
    },
});

const CatalogList: React.FC<{ data: ICatalogList }> = ({ data }) => {

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {GroupData.map(item => (
                    <Box key={item.group}>
                        <CardList
                            data={data[item.group].edges}
                            item={item}
                        />
                    </Box>
                ))}
                <Basket />
            </ThemeProvider>
        </Provider>
    );
};

export default CatalogList;