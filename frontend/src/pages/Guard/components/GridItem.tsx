import Grid from "@mui/material/Grid";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { CommonButton } from "../../../components/CommonButton";


interface GridItemProps {
    xs: number;
    children: React.ReactNode;
    className?: string;  
}

interface ListRowProps {
    onClick: () => void;
    index: number;
    data: string;
    parkingSpaceId: string;
}
interface GridItemHeaderProps {
    dataName: string;
}

export const GridItem = (props: GridItemProps) => {
    return (
        <Grid item xs={props.xs} className={`flex align-middle items-center justify-center ${props.className}`}>
            {props.children}
        </Grid>
    );
};

export const GridItemHeader = (props: GridItemHeaderProps) => {
    return (
        <Grid container spacing={1} className="flex justify-start align-middle text-center text-black">
            <GridItem xs={1}>Order</GridItem>
            <GridItem xs={4.5}>Space ID</GridItem>
            <GridItem xs={4.5}>{props.dataName}</GridItem>
        </Grid>
    );
};

export const GridItemList = (props: ListRowProps) => {
    return (
        <CommonButton variant="contained" onClick={props.onClick}>
            <Grid container spacing={0} className="flex justify-start align-middle text-center">
                <GridItem xs={1} className="text-red">{props.index}</GridItem>
                <GridItem xs={3.5} className="text-black">{props.parkingSpaceId}</GridItem>
                <GridItem xs={6.5} className="text-black">{props.data}</GridItem>
                <GridItem xs={1}>
                    <NavigateNextOutlinedIcon className="text-blue-dark" style={{ fontSize: "2rem" }} />
                </GridItem>
            </Grid>
        </CommonButton>
    );
};
