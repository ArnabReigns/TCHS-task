import { Box, Divider } from "@mui/material";
import React from "react";

const Section = ({ title, children }) => {
	return (
		<Box
			bgcolor={"#fff"}
			width={"min(40rem,100%)"}
			borderRadius={2}
			boxShadow={"0 4px 10px -6px #28282870"}
		>
			<Box p={2} fontWeight={600} fontSize={'1.1rem'}>{title}</Box>
			<Divider />
			<Box p={2}>{children}</Box>
		</Box>
	);
};

export default Section;
