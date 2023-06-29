import { useState } from "react";
import { useTranslations } from 'next-intl';

import { Box, Stack, Chip, Badge, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { IFilter } from "types/storeTypes";

interface IFilterItems {
    onSelect: (arg0: string) => void;
    quantity: number | null;
    filterArray?: IFilter[];
}

const FilterItems: React.FC<IFilterItems> = ({ onSelect, quantity, filterArray }) => {
    const [filteredItem, setFilteredItem] = useState("");
    const [showSelector, setShowSelector] = useState(false);
    const t = useTranslations("catalog");

    const filtersOpen = () => {
        setShowSelector(!showSelector);
        onSelect("");
        setFilteredItem("");
    };

    const handleSelect = (data: string) => {
        onSelect(data);
        setFilteredItem(data);
    };

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <FilterAltOutlinedIcon />
                <Typography
                    onClick={filtersOpen}
                    sx={{ cursor: "pointer", ml: 1 }}
                >
                    {t("filters")}
                </Typography>
            </Box>
            {showSelector && (
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}
                >
                    {filterArray?.map((item) => (
                        <Badge
                            key={t(item.button)}
                            badgeContent={
                                t(item.value) === filteredItem ? quantity : 0
                            }
                            color="primary"
                        >
                            <Chip
                                sx={{ mb: 2 }}
                                variant="outlined"
                                color={
                                    t(item.value) === filteredItem
                                        ? "primary"
                                        : "default"
                                }
                                label={t(item.button)}
                                onClick={() => handleSelect(t(item.value))}
                            />
                        </Badge>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default FilterItems;
