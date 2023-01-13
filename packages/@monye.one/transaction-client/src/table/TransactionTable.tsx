import {
    Center,
    Divider,
    Pagination,
    Paper,
    Table
} from "@mantine/core";
import {
    type ComponentProps,
    type FC
} from "react";

export interface ITransactionTableProps extends ComponentProps<typeof Table> {
}

export const TransactionTable: FC<ITransactionTableProps> = ({...props}) => {
    return <Paper
        shadow={"md"}
        radius={"md"}
        withBorder
        m={"md"}
        p={"md"}
    >
        <Table
            striped
            highlightOnHover
            withBorder
            withColumnBorders
            {...props}
        >
            <caption>Some elements from periodic table</caption>
            <thead>
                <tr>
                    <th>Element position</th>
                    <th>Element name</th>
                    <th>Symbol</th>
                    <th>Atomic mass</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>aaa</td>
                    <td>bbb</td>
                    <td>ccc</td>
                    <td>dddd</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>bbb</td>
                    <td>ccc</td>
                    <td>dddd</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>bbb</td>
                    <td>ccc</td>
                    <td>dddd</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>bbb</td>
                    <td>ccc</td>
                    <td>dddd</td>
                </tr>
            </tbody>
        </Table>
        <Divider
            m={"md"}
        />
        <Center>
            <Pagination
                total={20}
                siblings={1}
                initialPage={0}
            />
        </Center>
    </Paper>;
};
