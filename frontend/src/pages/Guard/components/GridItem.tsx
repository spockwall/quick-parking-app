import Grid from "@mui/material/Grid";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { CommonButton } from "../../../components/CommonButton";

interface GridItemProps {
    xs: number;
    children: React.ReactNode;
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
        <Grid item xs={props.xs} className="flex align-middle items-center justify-center">
            {props.children}
        </Grid>
    );
};

export const GridItemHeader = (props: GridItemHeaderProps) => {
    return (
        <Grid container spacing={1} className="flex justify-start align-middle text-center text-black">
            <GridItem xs={1.4}>Order</GridItem>
            <GridItem xs={6}>Space ID</GridItem>
            <GridItem xs={2.6}>{props.dataName}</GridItem>
        </Grid>
    );
};

export const GridItemList = (props: ListRowProps) => {
    return (
        <CommonButton variant="contained" onClick={props.onClick}>
            <Grid container spacing={0} className="flex justify-start align-middle text-center text-black">
                <GridItem xs={1}>{props.index}</GridItem>
                <GridItem xs={7}>{props.parkingSpaceId}</GridItem>
                <GridItem xs={2}>{props.data}</GridItem>
                <GridItem xs={1}>
                    <NavigateNextOutlinedIcon className="text-blue-dark" style={{ fontSize: "2rem" }} />
                </GridItem>
            </Grid>
        </CommonButton>
    );
};
