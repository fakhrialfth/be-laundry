import { forwardRef } from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineFolderOpen, AiOutlineLineChart, AiOutlineSetting } from "react-icons/ai";
import { useRouter } from 'next/router';

type Props = {
    showNav: boolean;
};

const MENU_ITEMS = [
    {
        name: 'Home',
        icon: AiOutlineHome,
        path: '/home'
    },
    {
        name: 'Products',
        icon: AiOutlineFolderOpen,
        path: '/products'
    },
    {
        name: 'Sales',
        icon: AiOutlineLineChart,
        path: '/sales'
    },
    {
        name: 'Setting',
        icon: AiOutlineSetting,
        path: '/setting'
    },
];

const ACTIVE_STYLING = 'bg-white text-sky-600';

const isActivePath = (path: string, currentPath: string) =>
    path === '/home' ? currentPath === path : currentPath.includes(path);

// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef<HTMLElement, Props>(({ showNav }, ref) => {
    const router = useRouter();

    return (
        <aside ref={ref} className={'fixed w-56 h-full bg-sky-600 shadow-xl'}>
            <div className=" text-center justify-center mx-3 p-4 mb-12 mt-4">
                    <div className=' text-xl font-bold text-white'>BeLAundry</div>
            </div>

            <ul className={'flex flex-col gap-2 px-4'}>
                <li className=' text-white text-lg font-bold'>Menu</li>
                {MENU_ITEMS.map(({ name, icon: Icon, path }) => (
                    <li key={name}>
                        <Link
                            href={path}
                            className={`pl-4 py-4 rounded-lg text-xl text-center cursor-pointer flex items-center gap-2 transition-colors ease-in-out duration-150 hover:bg-white hover:text-sky-600 ${isActivePath(path, router.pathname)
                                    ? ACTIVE_STYLING
                                    : 'text-white'
                                }`}
                        >
                            <Icon className={'h-7 w-7 mr-2'} />
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
});
