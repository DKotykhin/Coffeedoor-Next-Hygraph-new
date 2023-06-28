"use client";

import React from "react";
import Image from "next/image";

import { Box } from "@mui/system";

const Spinner: React.FC = () => {
    return (
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Image
                src={"/svg/spinner.svg"}
                alt="spinner"
                width={200}
                height={200}
                priority
            />
        </Box>
    );
};

export default Spinner;