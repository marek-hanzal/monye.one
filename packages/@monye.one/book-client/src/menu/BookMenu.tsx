import {
    type IMainMenuLinks,
    type IMainMenuProps,
    MainMenu
}                        from "@leight/mantine";
import {IconBank}        from "@monye.one/bank-client";
import {IconTransaction} from "@monye.one/transaction-client";
import {type FC}         from "react";
import {
    IconCalendar,
    IconFilter
}                        from "../icon";

const links: IMainMenuLinks = {
    "/book/calendar/days":    {
        href:  "/book/calendar/days",
        label: "link.calendar",
        icon:  <IconCalendar/>
    },
    "/book/transaction/list": {
        href:  "/book/transaction/list",
        label: "link.transactions",
        icon:  <IconTransaction/>,
    },
    "/book/filters":          {
        href:  "/book/filters",
        label: "link.filters",
        icon: <IconFilter/>,
    },
    "/book/banks":            {
        href:  "/book/banks",
        label: "link.banks",
        icon:  <IconBank/>,
    },
} as const;

export interface IBookMenuProps extends Omit<IMainMenuProps<typeof links>, "links"> {
}

export const BookMenu: FC<IBookMenuProps> = props => {
    return <MainMenu
        withTranslation={{
            namespace: "book",
        }}
        links={links}
        {...props}
    />;
};
