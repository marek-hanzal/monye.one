import {Translation} from "@leight/i18n-client";
import {Divider, Group, Pagination, Paper, Table} from "@mantine/core";
import {ActionButton} from "@monye.one/ui";
import {type ComponentProps, type FC} from "react";

export interface IAccountTableProps extends ComponentProps<typeof Table> {
}

export const AccountTable: FC<IAccountTableProps> = ({...props}) => {
    return (
        <Paper shadow={"md"} radius={"md"} withBorder m={"md"} p={"md"}>
            <Table
                striped
                highlightOnHover
                withBorder
                withColumnBorders
                {...props}
            >
                <caption>
                    <Group position={"apart"}>
                        <span>
                            <Translation
                                label={"table.caption"}
                                namespace={"account"}
                            />
                        </span>
                        <ActionButton
                            withTranslation={{
                                label: "button.create",
                                namespace: "account",
                            }}
                        />
                    </Group>
                </caption>
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
            <Divider m={"md"}/>
            <Group position={"apart"}>
                <span>[[Počet záznamů 149]]</span>
                <Pagination total={20} siblings={1} initialPage={0}/>
            </Group>
        </Paper>
    );
};
