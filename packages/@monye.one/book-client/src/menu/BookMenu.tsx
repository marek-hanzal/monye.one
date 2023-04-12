import {
    type IMainMenuLinks,
    type IMainMenuProps,
    MainMenu
}                from "@leight/mantine";
import {type FC} from "react";

const links: IMainMenuLinks = {
    "/book/calendar/days":         {
        href:  "/book/calendar/days",
        label: "link.calendar",
    },
    "/book/transaction/list": {
        href:  "/book/transaction/list",
        label: "link.transactions",
    },
    "/book/filters":          {
        href:  "/book/filters",
        label: "link.filters",
    },
    "/book/banks":            {
        href:  "/book/banks",
        label: "link.banks",
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
